import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { H2 } from '@/Components/ui/typography';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            breadcrumbNav={
                [
                    { label: 'Dashboard', route: 'dashboard' },
                    { label: 'Dashboard2', route: 'dashboard' }
                ]
            }
        >
            <Head title="Dashboard" />
            <Card className='max-w-screen-sm w-full mx-auto'>
                <CardHeader>
                    <CardTitle>Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <H2>Bem vindo de volta, {user.name}!</H2>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
