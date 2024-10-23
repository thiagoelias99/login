export interface User {
    id: number;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified_at?: string;
    role: RoleEnum;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

type HeaderBreadcrumbItem = {
    label: string
    route: string
    param?: Record<string, string | number>
}

export interface Paginated<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string | null;
    links: Link[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
