import { Controller, HttpCode, HttpStatus, Post, Get, Req,} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AccessToken } from '../models/access-token';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Req() req: Request): Promise<AccessToken> {
        return this.authService.login(req.user)
    }

    @Get("oi")
    oi() {
        return "OIII"
    }
}
