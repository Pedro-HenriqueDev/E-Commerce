import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { DoctorsService } from 'src/doctors/doctors.service';

@Injectable()
export class JwtMiddlewareDoctors implements NestMiddleware {
    constructor(
        private readonly doctorsService: DoctorsService,
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
        req.user = await this.doctorsService.findByEmail(user.email)

        next()
        
        } catch (err) {
            throw new  UnauthorizedException()
        }
  }
}