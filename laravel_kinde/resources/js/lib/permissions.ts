import { User } from '@/types'
import { UserLevelEnum } from '@/types/enums/user-level'


export const isAdmin = (user: User): boolean => {
    return user.level === UserLevelEnum.ADMIN
}

export const isTechnician = (user: User) => {
    return user.level === UserLevelEnum.TECHNICIAN || user.level === UserLevelEnum.ADMIN
}
