import { Injectable } from "@nestjs/common";
import { User } from "src/auth/models/UserModel";
import { UserPayload } from "src/auth/models/UserPayload";


@Injectable()
export class HelpersService {

    defineStructure(user: User): UserPayload {
        const JwtPayload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            isVerificate: user.isVerificate
        }
        return JwtPayload
    }
}