/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthDto } from './dto/auth.dto';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){

    }
    
    @Public()
    @Post("signup")
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() dto:AuthDto,@Res({ passthrough: true }) res:Response){
        await this.authService.signup(dto).then((tokens)=>{
          res.cookie('auth-cookie',tokens.access_token,{httpOnly:true});
          res.cookie('refresh-cookie',tokens.refresh_token,{httpOnly:true})
        }).catch((error:HttpException)=>{
          throw new HttpException(error.getResponse(),error.getStatus())
        });
    }

    @Public()
    @Post("signin")
    @HttpCode(HttpStatus.OK)
    async signin(@Body() dto:AuthDto,@Res({ passthrough: true }) res:Response){
        await this.authService.signin(dto).then((tokens)=>{
          res.cookie('auth-cookie',tokens.access_token,{httpOnly:true});
          res.cookie('refresh-cookie',tokens.refresh_token,{httpOnly:true})
        }).catch((error:HttpException)=>{
          throw new HttpException(error.getResponse(),error.getStatus())
        });
    }

    @Post("logout")
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId:number):Promise<boolean>{
        return this.authService.logout(userId);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refreshTokens(
      @GetCurrentUserId() userId: number,
      @GetCurrentUser('refreshToken') refreshToken: string,
      @Res({ passthrough: true }) res:Response
    ){
      await this.authService.refreshTokens(userId, refreshToken).then((tokens)=>{
        res.cookie('auth-cookie',tokens.access_token,{httpOnly:true});
        res.cookie('refresh-cookie',tokens.refresh_token,{httpOnly:true})
      }).catch((error:HttpException)=>{
        throw new HttpException(error.getResponse(),error.getStatus())
      });
    }
}
