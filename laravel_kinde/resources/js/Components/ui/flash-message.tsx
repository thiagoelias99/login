import { ClassNameValue } from 'tailwind-merge'
import { P } from './typography'

interface Props {
    children: React.ReactNode
    className?: ClassNameValue
}

export default function FlashMessage({ children, className }: Props) {
    return (
        <div className='w-full px-4 pt-4'>
            <P className="text-success bg-success-foreground rounded p-4">
                {children}
            </P>
        </div>
    )
}
