import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/Components/ui/breadcrumb';
import { HeaderBreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { ClassNameValue } from 'tailwind-merge';

interface Props {
    items?: HeaderBreadcrumbItem[]
    className?: ClassNameValue
}

export default function HeaderBreadcrumbNav({ items = [], className }: Props) {

    if (items.length === 0) return
    return (
        <div className="bg-card h-8">
            <Breadcrumb className="flex">
                <BreadcrumbList>
                    {items.map((item, index) => (
                        <div key={index} className='contents last:hidden'>
                            <BreadcrumbItem className='last:hidden'>
                                <BreadcrumbLink asChild>
                                    <Link href={route(item.route, item.param)}>{item.label}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </div>
                    ))}
                </BreadcrumbList>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage className='underline underline-offset-2'>{items[items.length - 1].label}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
