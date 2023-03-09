import { Role } from "@prisma/client";

export interface UserPayload {
    sub: string;
    email: string;
    name: string;
    role: Role
    isVerificate: boolean
    iat?: number;
    exp?: number;
}
