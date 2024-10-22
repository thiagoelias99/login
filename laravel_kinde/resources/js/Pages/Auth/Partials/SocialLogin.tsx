import GitHubButton from './github-button';
import GoogleButton from './google-button';

export default function SocialLogin() {
    return (
        <div className='mt-6'>
            <div className='w-full flex justify-center items-center'>
                <div className='w-full h-[1px] bg-muted-foreground rounded-full'></div>
                <p className='w-64 text-center text-foreground text-sm'>Ou entre com</p>
                <div className='w-full h-[1px] bg-muted-foreground rounded-full'></div>
            </div>
            <div className='w-full flex flex-col gap-4 mt-4'>
                <GoogleButton />
                <GitHubButton />
            </div>
        </div>
    )
}
