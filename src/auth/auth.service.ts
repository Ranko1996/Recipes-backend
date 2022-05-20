/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthorizationDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService, 
    ) {}

    async signup(dto: AuthorizationDto) {
        //generiranje passworda 
        const hash = await argon.hash(dto.password)

        try {
            //spremanje usera u db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            })
    
            //return user
            return this.signToken(user.id, user.email)
            
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error;
        }
    }
    
    async signin(dto: AuthorizationDto) {
        //nadji usera
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })

        //ako ne postoji baci exception
        if (!user) throw new ForbiddenException('Credentials incorrect')
        
        //usporedi lozinke
        const pwMatches = await argon.verify(
            user.hash, 
            dto.password
        )

        //ako je lozinka netočna exception
        if(!pwMatches) throw new ForbiddenException('Password incorrect')
     
        //vrati usera odnosno njegov jwt
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '50min',
            secret: secret,
        })

        return {
            access_token: token,
        }
    }

    
}