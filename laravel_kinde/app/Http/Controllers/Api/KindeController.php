<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

class KindeController extends Controller
{
    public function login(Request $request)
    {
        return Inertia::render('Auth/Login');
    }

    public function register(Request $request)
    {
        return Inertia::render('Auth/Register');
    }

    public function signIn(Request $request)
    {
        $credentials = $request->only('email', 'provider', 'prompt');

        $kindeConfig = [
            'issuerBaseUrl' => env('KINDE_ISSUER_BASE_URL'),
            'clientId' => env('KINDE_CLIENT_ID'),
            'redirectUrl' => env("APP_URL") . env("KINDE_REDIRECT_ENDPOINT"),
            'language' => env('KINDE_LANGUAGE'),
            'googleConnectionId' => env('KINDE_GOOGLE_CONNECTION_ID'),
            'githubConnectionId' => env('KINDE_GITHUB_CONNECTION_ID'),
            'emailConnectionId' => env('KINDE_EMAIL_CONNECTION_ID')
        ];

        $state = 'some_random_state';

        $baseUrl = "{$kindeConfig['issuerBaseUrl']}/oauth2/auth?response_type=code&client_id={$kindeConfig['clientId']}&redirect_uri={$kindeConfig['redirectUrl']}&scope=openid%20profile%20email&state={$state}&lang={$kindeConfig['language']}";

        if ($credentials['prompt'] === 'create') {
            $baseUrl .= "&prompt={$credentials['prompt']}";
        }

        switch ($credentials['provider']) {
            case 'google':
                return Inertia::location("{$baseUrl}&connection_id={$kindeConfig['googleConnectionId']}");
            case 'github':
                return Inertia::location("{$baseUrl}&connection_id={$kindeConfig['githubConnectionId']}");
            case 'email':
                if (!$credentials['email']) {
                    return response()->json(['message' => 'Email not provided'], 400);
                } else {
                    return Inertia::location("{$baseUrl}&connection_id={$kindeConfig['emailConnectionId']}&login_hint={$credentials['email']}");
                }
            default:
                return Inertia::location($baseUrl);
        }
    }

    public function kindeCallback(Request $request)
    {
        $code = $request->query('code');
        $reqState = $request->query('state');

        $state = 'some_random_state';

        // Verifica se o código foi enviado
        if (!$code) {
            return response()->json(['message' => 'Code not provided'], 400);
        }

        // Verifica o estado
        if ($reqState !== $state) { // Substitua 'expected_state_value' pela sua lógica para verificar o estado
            return response()->json(['message' => 'Invalid state'], 400);
        }

        // Configurações do Kinde
        $kindeConfig = [
            'issuerBaseUrl' => env('KINDE_ISSUER_BASE_URL'),
            'clientId' => env('KINDE_CLIENT_ID'),
            'secret' => env('KINDE_CLIENT_SECRET'),
            'redirectUrl' => env("APP_URL") . env("KINDE_REDIRECT_ENDPOINT"),
        ];

        try {
            $response = Http::asForm()->post("{$kindeConfig['issuerBaseUrl']}/oauth2/token", [
                'grant_type' => 'authorization_code',
                'client_id' => $kindeConfig['clientId'],
                'client_secret' => $kindeConfig['secret'],
                'code' => $code,
                'redirect_uri' => $kindeConfig['redirectUrl'],
            ]);

            if ($response->failed()) {
                return response()->json(['message' => 'Error retrieving token'], 500);
            }

            // Extraindo tokens da resposta
            $accessToken = $response['access_token'];
            $idToken = $response['id_token'];

            // Requisição para buscar o perfil do usuário
            $kindeUserData = Http::withToken($accessToken)->get("{$kindeConfig['issuerBaseUrl']}/oauth2/v2/user_profile");

            if ($kindeUserData->failed()) {
                return response()->json(['message' => 'Error retrieving user profile'], 500);
            }

            // Aqui você pode salvar/atualizar o usuário no banco de dados se necessário
            $kindeUserData = $kindeUserData->json();
            $user = User::where(('email'), $kindeUserData['email'])->first();
            $kinde_password = 'login_with_kinde';

            if (!$user) {
                $user = User::create([
                    'name' => $kindeUserData['name'],
                    'email' => $kindeUserData['email'],
                    'email_verified_at' => now(),
                    'password' => bcrypt($kinde_password),
                    'kinde_id' => $kindeUserData['id'],
                    'given_name' => $kindeUserData['given_name'],
                    'family_name' => $kindeUserData['family_name'],
                    'picture' => $kindeUserData['picture'],
                ]);
            } else {
                $user->update([
                    'password' => bcrypt($kinde_password),
                    'kinde_id' => $kindeUserData['id'],
                    'given_name' => $kindeUserData['given_name'],
                    'family_name' => $kindeUserData['family_name'],
                    'picture' => $kindeUserData['picture'],
                ]);
            }

            $user->save();

            Auth::login($user, true);
            $request->session()->regenerate();

            // return to_route('auth.callback', ['id' => $user->id]);
            return to_route('dashboard');

            // return back()->withErrors([
            //     'email' => 'The provided credentials do not match our records.',
            // ])->onlyInput('email');

            // Retorna o token de acesso para o cliente se for Api
            // return response()->json(['token' => $accessToken]);
        } catch (\Exception $e) {
            // Tratar erros de exceção
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Inertia::location(env('KINDE_ISSUER_BASE_URL') . '/logout' . '?redirect_to=' . env('APP_URL'));
    }
}
