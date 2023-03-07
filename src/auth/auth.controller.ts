import { Body, Controller, HttpCode, HttpStatus, Post, Query, Get, Req, Headers } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AccessToken } from './models/access-token';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Req() req: Request): Promise<AccessToken> {
        return await this.authService.login(req.user)
    }

    @Get("oi")
    oi() {
        return "OIII"
    }
}
