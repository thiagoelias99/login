import { User } from './types';

export interface HeaderLink {
    label: string;
    route: string;
    mainUrl: string;
    validation?: (user: User) => boolean;
}

export const headerLinks: HeaderLink[] = [
    { label: 'Dashboard', route: 'dashboard', mainUrl: '/dashboard' },
    // { label: 'Usuários', route: 'users.index', mainUrl: '/users', validation: isAdmin },
];

export interface HeaderDropdown {
    label: string | null;
    items: {
        label: string;
        route: string;
        method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    }[];
}

export const headerDropdown: HeaderDropdown[] = [
    {
        label: 'Minha Conta',
        items: [
            { label: 'Configurações', route: 'profile.edit', method: 'GET' },
            { label: 'Suporte', route: 'profile.edit', method: 'GET' },
        ]
    },
    {
        label: null,
        items: [
            { label: 'Sair', route: 'logout', method: 'POST' },
        ]
    }

]


