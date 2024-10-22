import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { Button } from '@/Components/ui/button'
import { HeaderDropdown } from '@/config'
import { router, usePage } from '@inertiajs/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'

interface Props {
    items?: HeaderDropdown[]
}

export default function HeaderDropDown({ items = [] }: Props) {
    const user = usePage().props.auth.user;

    const handleItemClick = (path: string, method: string) => {
        switch (method) {
            case 'GET':
                return router.get(route(path))
            case 'POST':
                return router.post(route(path))
            case 'PUT':
                return router.put(route(path))
            case 'DELETE':
                return router.delete(route(path))
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <Avatar>
                        <AvatarFallback>{user.name.substring(0,2) ?? 'Us'}</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {items.map((item, index) => (
                    <div key={index}>
                        {item.label && <DropdownMenuLabel>{item.label}</DropdownMenuLabel>}
                        <DropdownMenuSeparator />
                        {item.items.map((subItem, subIndex) => (
                            <DropdownMenuItem
                                onClick={() => handleItemClick(subItem.route, subItem.method)}
                                key={subIndex}
                            >{subItem.label}</DropdownMenuItem>
                        ))}
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
