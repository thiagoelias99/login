export function laravelMessageMapper(message?: string): string | undefined {
    if (!message) {
        return undefined;
    }
    if (message.includes('The email must be a valid email address.')) {
        return 'O campo email deve ser um email válido.';
    }
    if (message.includes('The password must be at least 8 characters.')) {
        return 'A senha deve ter no mínimo 8 caracteres.';
    }
    if (message.includes('The password confirmation does not match.')) {
        return 'A confirmação da senha não corresponde.';
    }
    if (message.includes('The email has already been taken.')) {
        return 'O email já está em uso.';
    }
    if (message.includes('The password must be at least 8 characters.')) {
        return 'A senha deve ter no mínimo 8 caracteres.';
    }
    if (message.includes('The password confirmation does not match.')) {
        return 'A confirmação da senha não corresponde.';
    }
    if (message.includes('The password confirmation must match the password.')) {
        return 'A confirmação da senha deve corresponder à senha.';
    }
    if (message.includes('The current password is incorrect.')) {
        return 'A senha atual está incorreta.';
    }
    if (message.includes('The current password field is required.')) {
        return 'O campo senha atual é obrigatório.';
    }
    if (message.includes('The new password must be at least 8 characters.')) {
        return 'A nova senha deve ter no mínimo 8 caracteres.';
    }
    if (message.includes('The new password confirmation does not match.')) {
        return 'A confirmação da nova senha não corresponde.';
    }
    if (message.includes('The new password confirmation must match the new password.')) {
        return 'A confirmação da nova senha deve corresponder à nova senha.';
    }
    if (message.includes('The password must be at least 8 characters.')) {
        return 'A senha deve ter no mínimo 8 caracteres.';
    }
    if (message.includes('The password confirmation does not match.')) {
        return 'A confirmação da senha não corresponde.';
    }
    if (message.includes('The password confirmation must match the password.')) {
        return 'A confirmação da senha deve corresponder à senha.';
    }
    if (message.includes('The current password is incorrect.')) {
        return 'A senha atual está incorreta.';
    }
    if (message.includes('The current password field is required.')) {
        return 'O campo senha atual é obrigatório.';
    }
    if (message.includes('The new password must be at least 8 characters.')) {
        return 'A nova senha deve ter no mínimo 8 caracteres.';
    }
    if (message.includes('The new password confirmation does not match.')) {
        return 'A confirmação da nova senha não corresponde.';
    }
    if (message.includes('The new password confirmation must match the new password.')) {
        return 'A confirmação da nova senha deve corresponder à nova senha.';
    }
    if (message.includes('These credentials do not match our records.')) {
        return 'Credenciais inválidas.';
    }
    if (message.includes('is required')) {
        return 'Campo é obrigatório';
    }
    if (message.includes('The password field confirmation does not match.')) {
        return 'A confirmação da senha não corresponde.';
    }
    if (message.includes('The password field must be at least 8 characters.')) {
        return 'A senha deve ter no mínimo 8 caracteres.';
    }
    if (message.includes('We have emailed your password reset link.')) {
        return 'Enviamos um link para redefinir sua senha. Verifique seu email.';
    }
    if (message.includes('The password is incorrect.')) {
        return 'A senha está incorreta.';
    }
    return message;
}
