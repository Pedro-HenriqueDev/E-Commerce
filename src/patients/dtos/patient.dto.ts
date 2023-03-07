import { IsEmail, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "src/auth/models/UserModel";

export class createUserDto extends User {
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
}