import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserPayload } from "src/auth/models/UserPayload";
import { JwtService } from "@nestjs/jwt"
import { PatientsService } from "src/patients/patients.service";
import { DoctorsService } from "src/doctors/doctors.service";

@Injectable()
export class VerificationJwt implements NestMiddleware {
    constructor(
        private readonly doctorsService: DoctorsService,
        private readonly patientsService: PatientsService,
        private readonly jwtService: JwtService
    ){}

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.params.token
        const userType = req.query.userType

        if(!token) throw new UnauthorizedException()
        try {

            const user: UserPayload = await this.jwtService.verify(token, {secret: process.env.JWT_SECRET})

            if(!user) throw new UnauthorizedException()

            if(userType == "patients") {
                req.user = await this.patientsService.verification(user.email)

                return next()
            } else if(userType == "doctors") {
                req.user = await this.doctorsService.verification(user.email)

                return next()
            }
            
            throw new UnauthorizedException()

        } catch(err) {
            console.log(err)
        }
        
    }
}