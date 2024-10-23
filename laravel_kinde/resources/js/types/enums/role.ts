export enum RoleEnum {
    ADMIN = 'admin',
    USER = 'user'
}

export function getUserLevelEnumLabel(level: RoleEnum): string {
    switch (level) {
        case RoleEnum.ADMIN:
            return 'Administrador';
        case RoleEnum.USER:
            return 'Usuário'
    }
}

export const userLevelOptions = Object.keys(RoleEnum).map((option, index) => {
    return {
        value: Object.values(RoleEnum)[index],
        key: Object.keys(RoleEnum)[index]
    }
});
