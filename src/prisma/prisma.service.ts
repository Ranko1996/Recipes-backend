/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        //Poziva konstruktor prismaClient clase koji mora imati datasources i url 
        super({
            datasources: {
                db: {
                    url:config.get('DATABASE_URL'),
                },
            },
        })
    }
}

