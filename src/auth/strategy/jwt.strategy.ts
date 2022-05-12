/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        config: ConfigService, 
        private prisma: PrismaService
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        })
    }
    //user je u biti ovaj payload odnosno u nodu smo ga dobijali preko req.user, u payloadu dobijamo info sa emailom i ostalim info koje su kriptirane u jwt
    //usera dobijemo dekodiranog
    async validate(payload: {sub: number, email: string}) {
        const user = 
            await this.prisma.user.findUnique({
                where: {
                    id: payload.sub,
                }
            })
            delete user.hash;
            return user;
    }
}