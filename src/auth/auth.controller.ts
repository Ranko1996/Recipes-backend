/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthorizationDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

        @HttpCode(HttpStatus.CREATED)
        @Post('signup')
        signup(@Body() dto: AuthorizationDto) {
            return this.authService.signup(dto)
        }

        @HttpCode(HttpStatus.OK)
        @Post('signin')        
        singin(@Body() dto: AuthorizationDto) {
            return this.authService.signin(dto)
        }


   
}