/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthDto } from './dto/auth.dto';
import { tokens } from './types/types';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){

    }
    
    @Public()
    @Post("signup")
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto:AuthDto):Promise<tokens>{
        return this.authService.signup(dto);
    }

    @Public()
    @Post("signin")
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto:AuthDto):Promise<tokens>{
        return this.authService.signin(dto);
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
    refreshTokens(
      @GetCurrentUserId() userId: number,
      @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<tokens> {
      return this.authService.refreshTokens(userId, refreshToken);
    }
}
