import { cn } from '@/lib/utils';
import { ClassNameValue } from 'tailwind-merge';
import { ScrollArea } from './scroll-area';

interface Props {
    children?: React.ReactNode;
    className?: ClassNameValue;
}

export function Line({ children, className }: Props) {
    return (
        <div className={cn('flex flex-row justify-start items-baseline gap-2', className)}>{children}</div>
    )
}

export function Column({ children, className }: Props) {
    return (
        <div className={cn('flex flex-col justify-start items-start gap-4', className)}>{children}</div>
    )
}

export function ScrollColumn({ children, className }: Props) {
    return (
        <ScrollArea className={cn('flex flex-col justify-start items-start max-h-64', className)}>
            {children}
        </ScrollArea>
    )
}
