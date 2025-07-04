export type TAccount = {
    email: string;
    password: string;
    lastPasswordChange?: Date;
    isDeleted?: boolean;
    status?: "ACTIVE" | "BLOCK";
    role?: "USER" | "ADMIN",
    isVerified?: boolean,
}


export interface TRegisterPayload extends TAccount {
    name: string
}

export type TLoginPayload = {
    email: string;
    password: string
}

export type TJwtUser = {
    email: string,
    role?: "USER" | "ADMIN",
}