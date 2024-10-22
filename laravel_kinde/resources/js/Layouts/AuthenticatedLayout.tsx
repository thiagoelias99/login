import { PropsWithChildren } from 'react';
import AuthHeader from './Partials/AuthHeader';
import { HeaderBreadcrumbItem } from '@/types';
import { Toaster } from '@/Components/ui/toaster';
import useTheme from '@/hooks/useTheme';

interface Props extends PropsWithChildren {
    breadcrumbNav?: HeaderBreadcrumbItem[]
}

export default function AuthenticatedLayout({ breadcrumbNav, children }: Props) {
    const {} = useTheme();

    return (
        <div className="min-h-screen bg-background">
            <AuthHeader breadcrumbNav={breadcrumbNav} />

            <main className="flex flex-1 flex-col p-1 sm:p-4">
                {children}
            </main>
            <Toaster />
        </div>
    );
}
