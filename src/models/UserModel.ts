import { Role } from "@prisma/client";

export class UserModel {
    id: string 
    name: string
    email: string
    password: string
    role: Role
    isVerificate: boolean
}
