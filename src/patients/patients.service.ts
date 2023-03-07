import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto } from './dtos/patient.dto';
import * as bcrypt from "bcrypt"
import { Patients, Prisma } from '@prisma/client';
import { EmailService } from 'src/emails/email.service';
import { JwtService } from '@nestjs/jwt';
import { HelpersService } from 'src/helpers/helpers.service';

@Injectable()
export class PatientsService {
    constructor(
        private readonly helper: HelpersService,
        private readonly prisma: PrismaService,
        private readonly emailService: EmailService,
        private readonly jwtService : JwtService   
    ) {}

    async create(user: Patients) {

            const patientExist = await this.findByEmail(user.email)

            if(patientExist) {
                throw new BadRequestException("E-mail already registered")
            }

            const data: Prisma.PatientsCreateInput = {
                ...user,
                role: 1,
                isVerificate: false,
                password: await bcrypt.hash(user.password, 10)
            }
            

            const patientCreated: Patients = await this.prisma.patients.create({data});

            const jwtToken = this.jwtService.sign(this.helper.defineStructure(patientCreated))

            const emailStatus = await this.emailService.sendEmailSistem(patientCreated.email, jwtToken, "patients")

            return emailStatus

    }
    async findByEmail(email: string) {
        return await this.prisma.patients.findUnique({where: {email}})
    }
    async verification(email: string) {
        if(!await this.findByEmail(email)) throw new NotFoundException("account not found")

        return await this.prisma.patients.update({where: {email},data: {isVerificate: true}})
    }

}
