import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { UserPayload } from '../models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../models/UserModel';
import { AdminsService } from 'src/admins/admins.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly adminsService : AdminsService,
        private readonly usersService : UsersService,
        private readonly jwtService : JwtService
    ) {}

    login(user: UserModel) {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            isVerificate: user.isVerificate,
            name: user.name
        };

        const jwtToken = this.jwtService.sign(payload)

        return {
            access_token: jwtToken
        }
    }

    async validate(email: string, password: string, userType: string) {

        if(userType == "users")  {
            const user = await this.usersService.findByEmail(email)
            await this.exeptions(user, password)
            return {...user, password: undefined}

        } if(userType == "admins") {
            const admin = await this.adminsService.findByEmail(email)
            await this.exeptions(admin, password)
            return {...admin,password: undefined}

        }
        throw new UnauthorizedException()
    }

    async exeptions(user: UserModel, password: string) {

        if(!user) {
            throw new UnauthorizedException("Email address or password provided is incorrect.")
        }
        
        if(!user.isVerificate) {
            throw new UnauthorizedException("Email address or password provided is incorrect.")
        }
        
        const passwordStatus = await bcrypt.compare(password, user.password)

        if(!passwordStatus) {
            throw new UnauthorizedException("Email address or password provided is incorrect.")
        }

    }
}
