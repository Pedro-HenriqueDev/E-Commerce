import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class JwtMiddlewarePatients implements NestMiddleware {
    constructor(
        private readonly patientsService: PatientsService,
        private readonly jwtService: JwtService
        ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const {authorization} = req.headers

        const token = authorization.split(" ")[1]

        try {
            const user: UserPayload = await this.jwtService.verify(token, {secret: process.env.JWT_SECRET})
            
        if(!user) {
            throw new UnauthorizedException()
        }

        if(!user.isVerificate) {
            throw new UnauthorizedException()
        }
        
        req.user = await this.patientsService.findByEmail(user.email)

        next()
        
        } catch (err) {
            throw new  UnauthorizedException()
        }
  }
}