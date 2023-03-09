import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserPayload } from "src/models/UserPayload";
import { JwtService } from "@nestjs/jwt"
import { UsersService } from "src/users/users.service";
import { AdminsService } from "src/admins/admins.service";

@Injectable()
export class VerificationJwt implements NestMiddleware {
    constructor(
        private readonly adminsService: AdminsService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.params.token
        const userType = req.query.userType

        if(!token) throw new UnauthorizedException()
        try {

            const user: UserPayload = await this.jwtService.verify(token, {secret: process.env.JWT_SECRET})

            if(!user) throw new UnauthorizedException()

            if(userType == "users") {
                req.user = await this.usersService.verification(user.email)

                return next()
            } else if(userType == "admins") {
                req.user = await this.adminsService.verification(user.email)

                return next()
            }
            
            throw new UnauthorizedException()

        } catch(err) {
            console.log(err)
        }
        
    }
}