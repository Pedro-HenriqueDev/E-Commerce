import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreate } from './dtos/UserCreate.dto';
import { User } from './entities/User';
import * as bcrypt from "bcrypt"
import { defineStructure } from 'src/helpers/Jwt.helper';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/emails/email.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService
    ){}

    async create(user: UserCreate) {
        const userExist = await this.findByEmail(user.email)

            if(userExist) {
                throw new BadRequestException("E-mail already registered")
            }

            const data: Prisma.UsersCreateInput = {
                ...user,
                isVerificate: false,
                password: await bcrypt.hash(user.password, 10)
            }

            const userCreated: User = await this.prisma.users.create({data});

            const jwtToken = this.jwtService.sign(defineStructure(userCreated))

            const emailStatus = await this.emailService.sendEmailVerification(userCreated.email, jwtToken, "users")

            if(emailStatus) {
                return "A verification email has been sent to your Email!"
            }
            throw new InternalServerErrorException()
    }

    async getAll(): Promise<User[]> {
        return await this.prisma.users.findMany()
    }
    async findByEmail(email: string): Promise<User> {
        return await this.prisma.users.findUnique({where: {email}})
    }

    async verification(email: string): Promise<User> {
        if(!await this.findByEmail(email)) throw new NotFoundException("account not found")

        return await this.prisma.users.update({where: {email},data: {isVerificate: true}})
    }

    async deleteAccounted(email:string) {
        return await this.prisma.users.delete({where: {email}})
    }
}
