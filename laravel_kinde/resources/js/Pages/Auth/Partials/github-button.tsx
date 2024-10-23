import { Button, buttonVariants } from '@/Components/ui/button';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function GitHubButton() {
    const [isLoading, setIsLoading] = useState(false);

    function handleButtonClick() {
        setIsLoading(true);
        router.post(route('signIn', {
            provider: 'github',
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
                src="/images/icons/github.svg"
                width={24}
                height={24}
                alt="github logo"
                className='fill-purple-500'
            />
            <span>GitHub</span>
        </Button>
    )
}
