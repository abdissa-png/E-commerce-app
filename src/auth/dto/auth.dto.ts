/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";


export class AuthDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password:string;
}