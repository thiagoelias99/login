import { Input } from '@/Components/ui/input';
import { SearchIcon } from 'lucide-react';

export default function HeaderSearch() {
    return (
        <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Buscar..."
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
            </div>
        </form>
    )
}
