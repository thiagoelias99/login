import ApplicationLogo from '@/Components/ApplicationLogo'
import { HeaderLink } from '@/config'
import { cn } from '@/lib/utils'
import { Link, usePage } from '@inertiajs/react'
import { Sheet, SheetContent, SheetTrigger } from '@/Components/ui/sheet'
import { Button } from '@/Components/ui/button'
import { MenuIcon } from 'lucide-react'
import { DialogTitle } from '@radix-ui/react-dialog'

interface Props {
    currentUrl?: string
    links?: HeaderLink[]
}

export default function AuthNav({ currentUrl: url, links = [] }: Props) {
    const user = usePage().props.auth.user;

    return (
        <>
            <nav className={cn("hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6")}>
                <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <ApplicationLogo className='h-9 w-auto fill-primary' />
                    <span className="sr-only">{import.meta.env.VITE_APP_NAME}</span>
                </Link>
                {links.map((link, index) => {

                    if (link.validation && link.validation(user) === false) {
                        return null
                    }
                    return (
                        <Link
                            key={index}
                            href={route(link.route)}
                            className={`transition-colors hover:text-foreground ${url?.startsWith(link.mainUrl) ? 'text-foreground' : 'text-muted-foreground'} active:text-foreground`}
                        >
                            {link.label}
                        </Link>
                    )
                }
                )}
            </nav>

            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <MenuIcon className="h-5 w-5" />
                        <span className="sr-only">Fechar menu de navegação</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" aria-describedby='menu'>
                    <DialogTitle className='sr-only'>Menu</DialogTitle>
                    <nav className="grid text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center justify-center gap-2 text-lg font-semibold"
                        >
                            <ApplicationLogo className='h-16 w-auto fill-primary' />
                            <span className="sr-only">{import.meta.env.VITE_APP_NAME}</span>
                        </Link>
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={route(link.route)}
                                className={`transition-colors hover:text-foreground ${url?.startsWith(link.mainUrl) ? 'text-foreground' : 'text-muted-foreground'} active:text-foreground hover:bg-muted px-2 py-3 rounded`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    )
}
