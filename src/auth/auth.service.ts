import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';
import * as bcrypt from "bcrypt"
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { User } from './models/UserModel';

@Injectable()
export class AuthService {
    constructor(
        private readonly doctorsService : DoctorsService,
        private readonly patientsService : PatientsService,
        private readonly jwtService : JwtService
    ) {}

    login(user: User) {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            isVerificate: user.isVerificate,
            name: user.name
        };

        const jwtToken = this.jwtService.sign(payload)

        return {
            access_token: jwtToken
        }
    }

    async validate(email: string, password: string, userType: string) {

        if(userType == "patients")  {
            const patients = await this.patientsService.findByEmail(email)
            await this.exeptions(patients, password)
            return {...patients, password: undefined}

        } if(userType == "doctors") {
            const doctor = await this.doctorsService.findByEmail(email)
            await this.exeptions(doctor, password)
            return {...doctor,password: undefined}

        }
        throw new UnauthorizedException()
    }

    async exeptions(user: User, password: string) {

        if(!user) {
            throw new UnauthorizedException("Email address or password provided is incorrect.")
        }
        
        if(!user.isVerificate) {
            throw new UnauthorizedException("Email address or password provided is incorrect.")
        }
        
        const passwordStatus = await bcrypt.compare(password, user.password)

        if(!passwordStatus) {
            throw new UnauthorizedException("Email address or password provided is incorrect.")
        }

    }
}
