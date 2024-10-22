import { buttonVariants } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';

export default function GitHubButton() {
    return (
        <Link
            href={route('signIn', {
                provider: 'google',
                prompt: 'login',
            })}
            method='post'
            type="button"
            className={buttonVariants({
                variant: "default",
                className: "gap-2"
            })}
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
        </Link>
    )
}
