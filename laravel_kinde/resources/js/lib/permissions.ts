import { User } from '@/types'
import { RoleEnum } from '@/types/enums/role'


export const isAdmin = (user: User): boolean => {
    return user.role === RoleEnum.ADMIN
}
