/* eslint-disable prettier/prettier */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from '../auth/guard';
import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

//useGuards je za verifikaciju jwt, sve što se dešava u klasi userkontroler zahtjeva guard verifikaciju
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @Get('me')
    getMe(
        @GetUser() user: User
    ) {
        return user;
    }

    @Get('verification')
    getVerify(
        @GetUser('id') id:number
    ) {
        return true;
    }
    
}
