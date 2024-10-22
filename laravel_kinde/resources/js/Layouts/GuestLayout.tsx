import ApplicationLogo from '@/Components/ApplicationLogo';
import { Card } from '@/Components/ui/card';
import useTheme from '@/hooks/useTheme';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    const {} = useTheme();

    return (
        <div className="flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-primary text-primary" />
                </Link>
            </div>

            <Card className='mt-4 w-full max-w-sm'>
                {children}
            </Card>
        </div>
    );
}
