import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Doctor } from "../entities/doctor.entity";

export class createDoctorDto extends Doctor {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6, {message: "password too short"})
    @MaxLength(20, {message: "too long password"})
    password: string;

    @IsNumber()
    phone: number;
    
    @IsNumber()
    @IsOptional()
    room: number;

    @IsString()
    specialty: string;
}