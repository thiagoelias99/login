import { headerDropdown, headerLinks } from '@/config'
import { usePage } from '@inertiajs/react'
import { useMemo } from 'react'
import AuthNav from './AuthNav'
import HeaderSearch from './HeaderSearch'
import HeaderDropDown from './HeaderDropDown'
import HeaderBreadcrumbNav from './HeaderBreadcrumbNav'
import { HeaderBreadcrumbItem } from '@/types'

interface Props {
    breadcrumbNav?: HeaderBreadcrumbItem[]
}

export default function AuthHeader({ breadcrumbNav }: Props) {
    const { url } = usePage()

    const links = useMemo(() => {
        return headerLinks
    }, [])

    const dropDownOptions = useMemo(() => {
        return headerDropdown
    }, [])

    return (
        <header className="sticky top-0 flex flex-col border-b bg-card px-4 md:px-6 z-30">
            <div className='flex items-center gap-4 w-full h-16'>
                <AuthNav
                    currentUrl={url}
                    links={links}
                />

                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <HeaderSearch />
                    <HeaderDropDown items={dropDownOptions} />
                </div>
            </div>
            <HeaderBreadcrumbNav items={breadcrumbNav} />
        </header>
    )
}
