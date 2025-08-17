export enum ROLE {
    ADMIN = 'ADMIN',
    DONOR = 'DONOR',
}

export interface IUser {
    name: string;
    role: ROLE;
    phone: string;
    email?: string;
    password: string;
    street?: string;
    city?: string;
    district?: string;
}
