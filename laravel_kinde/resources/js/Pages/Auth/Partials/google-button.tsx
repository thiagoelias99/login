import { buttonVariants } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';

export default function GoogleButton() {
    return (
        <Link
            href={route('signIn', {
                provider: 'google',
                prompt: 'login'
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
                src="/images/icons/google.svg"
                width={24}
                height={24}
                alt="google logo"
            />
            <span className='text-[#313957]'>Google</span>
        </Link>
    )
}
