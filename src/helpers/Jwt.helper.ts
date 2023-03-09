import { UserModel } from "src/models/UserModel"
import { UserPayload } from "src/models/UserPayload"


export function defineStructure (user: UserModel): UserPayload {
    const JwtPayload: UserPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerificate: user.isVerificate
    }
    return JwtPayload
}