import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Doctor } from './entities/doctor.entity';
import * as bcrypt from "bcrypt"
import { Doctors, Prisma } from '@prisma/client';
import { EmailService } from 'src/emails/email.service';
import { JwtService } from '@nestjs/jwt';
import { HelpersService } from 'src/helpers/helpers.service';

@Injectable()
export class DoctorsService {
    constructor(
        private readonly helper: HelpersService,
        private readonly prisma: PrismaService,
        private readonly emailService: EmailService,
        private readonly jwtService : JwtService
    ) {}

    async create(doctor: Doctor) {
            const doctorExist = await this.findByEmail(doctor.email)

            if(doctorExist) {
                throw new BadRequestException("E-mail already registered")
            }

            const data: Prisma.DoctorsCreateInput = {
                ...doctor,
                role: 2,
                isVerificate: false,
                password: await bcrypt.hash(doctor.password, 10)
            }

            const doctorCreated: Doctors = await this.prisma.doctors.create({data})

            const jwtToken = this.jwtService.sign(this.helper.defineStructure(doctorCreated))

            const emailStatus = await this.emailService.sendEmailSistem(doctorCreated.email, jwtToken, "doctors")

            return emailStatus


    }
    async findByEmail(email: string): Promise<Doctor> {
        return await this.prisma.doctors.findUnique({where: {email}})
    }

    async verification(email: string) {
        if(!await this.findByEmail(email)) throw new NotFoundException("account not found")

        return await this.prisma.doctors.update({where: {email},data: {isVerificate: true}})
    }
}
