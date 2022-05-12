/* eslint-disable prettier/prettier */
import { AuthGuard } from "@nestjs/passport";

//možemo pozvati JwtGuard umjesto AuthGuard('jwt') cisto da ne pisemo ('jwt') dio
export class JwtGuard extends AuthGuard('jwt') {
    constructor() {
        super()
    }
}