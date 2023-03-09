import { IsBIC, IsEmail, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";
import { User } from "../entities/User";

export class UserCreate extends User {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(7)
    @MaxLength(20)
    password: string;

    @IsNumber()
    @Min(18)
    age: number
}