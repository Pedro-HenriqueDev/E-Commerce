import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth.service';
  
  @Injectable()
  export class LoginValidationMiddleware implements NestMiddleware {
    constructor(
        private readonly authService: AuthService
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
      const body = req.body;
      const userType = req.query.userType

      if(!userType) throw new UnauthorizedException("wrong route")
        
      if(userType == "patients") {
        const patient = await this.authService.validate(body.email, body.password, userType)
        req.user = patient
        return next();
      } if(userType == "doctors") {
        const doctor = await this.authService.validate(body.email, body.password, userType)
        req.user = doctor
        return next();
      }
      throw new UnauthorizedException("router wrong")
    }
  }