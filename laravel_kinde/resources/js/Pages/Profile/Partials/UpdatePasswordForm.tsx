import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { CaptionError } from '@/Components/ui/typography';
import { laravelMessageMapper } from '@/lib/error.mapper';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

export default function UpdatePasswordForm({
    className = '',
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle>Atualizar senha</CardTitle>
                    <CardDescription>
                        Certifique-se de que sua conta está usando uma senha longa e variada para manter a segurança.
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <form onSubmit={updatePassword} className="space-y-4">
                        <div>
                            <Label
                                htmlFor="current_password"
                            >
                                Senha Atual
                            </Label>

                            <Input
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) =>
                                    setData('current_password', e.target.value)
                                }
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                            />

                            <CaptionError>{laravelMessageMapper(errors.current_password)}</CaptionError>
                        </div>

                        <div>
                            <Label htmlFor="password">Nova Senha</Label>

                            <Input
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />

                            <CaptionError>{laravelMessageMapper(errors.password)}</CaptionError>
                        </div>

                        <div>
                            <Label
                                htmlFor="password_confirmation"
                                >
                                Confirme a Nova Senha
                                </Label>

                            <Input
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />

                            <CaptionError>{laravelMessageMapper(errors.password_confirmation)}</CaptionError>
                        </div>

                        <Button isLoading={processing}>Salvar</Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
