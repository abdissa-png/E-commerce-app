/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/User';
import * as bcrypt from "bcrypt";
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { tokens } from './types/types';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>,
        private jwtService:JwtService,
        private config:ConfigService){
        
    }
    hashData(data:string){
        return bcrypt.hash(data,10);
    }
    async getTokens(userId:number,email:string):Promise<tokens>{
        const [at,rt]=await Promise.all([
            this.jwtService.signAsync({
                sub:userId,
                email
            },{
                secret:this.config.get<string>('AT_SECRET'),
                expiresIn:60*15,
            }),
            this.jwtService.signAsync({
                sub:userId,
                email
            },{
                secret:this.config.get<string>('RT_SECRET'),
                expiresIn:60*60*24*7,
            })
        ])
        return {
            access_token:at,
            refresh_token:rt
        }
    }
    
    async updateRtHash(userId:number,rt:string){
        const hash=await this.hashData(rt);
        await this.userRepository.update(userId,{hashedRt:hash});
    }
    async signup(dto:AuthDto):Promise<any>{
        const hash=await this.hashData(dto.password)
        const newUser=this.userRepository.create({...dto,hash:hash});
        const savedUser=await this.userRepository.save(newUser).catch((error)=>{
            throw new HttpException("Internal Server Error",HttpStatus.INTERNAL_SERVER_ERROR);
        });
        const tokens=await this.getTokens(newUser.id,newUser.email)
        await this.updateRtHash(newUser.id,tokens.refresh_token)
        return tokens;
    }
    async signin(dto:AuthDto):Promise<any>{
        const email=dto.email;
        const user=await this.userRepository.findOneBy({email});
        if(!user) throw new HttpException("Access Denied!",HttpStatus.FORBIDDEN);

        const passwordMatches=await bcrypt.compare(dto.password,user.hash)
        if(!passwordMatches ) throw new HttpException("Access Denied!",HttpStatus.FORBIDDEN);
        const tokens=await this.getTokens(user.id,user.email)
        await this.updateRtHash(user.id,tokens.refresh_token)
        return tokens;
    }
    async logout(userId:number){
        await this.userRepository.update(userId,{hashedRt:null})
        return true;
    }
    
    async refreshTokens(userId:number,rt:string){
        const user=await this.userRepository.findOneBy({id:userId});
        if(!user || !user.hashedRt) throw new HttpException("Access Denied!",HttpStatus.FORBIDDEN);
        const rtMatches= await bcrypt.compare(rt,user.hashedRt);
        if(!rtMatches) throw new HttpException("Access Denied!",HttpStatus.FORBIDDEN);
        const tokens=await this.getTokens(user.id,user.email)
        await this.updateRtHash(user.id,tokens.refresh_token)
        return tokens;
    }

}
