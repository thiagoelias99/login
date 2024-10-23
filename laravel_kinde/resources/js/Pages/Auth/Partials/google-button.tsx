import { Button } from '@/Components/ui/button';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function GoogleButton() {
    const [isLoading, setIsLoading] = useState(false);

    function handleButtonClick() {
        setIsLoading(true);
        router.post(route('signIn', {
            provider: 'google',
            prompt: 'login',
        }));
    }

    return (
        <Button
            isLoading={isLoading}
            onClick={() => handleButtonClick()}
        >
            <img
                aria-hidden={true}
                src="/images/icons/google.svg"
                width={24}
                height={24}
                alt="google logo"
            />
            <span>Google</span>
        </Button>
    )
}
