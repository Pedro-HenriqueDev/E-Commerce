export interface UserPayload {
    sub: string;
    email: string;
    name: string;
    role: number
    isVerificate: boolean
    iat?: number;
    exp?: number;
}
