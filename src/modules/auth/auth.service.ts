import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2'
import { AuthDTO, AuthLoginDTO } from './dto';
import { AuthError } from './auth.constans';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor( 
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService
    ){

    }
    async register(authDTO:AuthDTO){
        // generate password to hasdedPassword
        const hasdedPassword = await argon.hash(authDTO.password)
        // insert Data
        try{
            const user = await this.prismaService.user.create({
                data: {
                    email: authDTO.email,
                    password: hasdedPassword,
                    firstName: authDTO.firstName,
                    lastName: authDTO.lastName,
                },
                 select:{
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    createAt: true
                 }
            });        
            return user
        }
        catch(error){
            if(error.code === 'P2002'){
                throw new ConflictException(AuthError.ERROR_EMAIL_EXISTS);
            }
            return {error}
        }
    }

    async login(authDTO:AuthLoginDTO){
        const user = await this.prismaService.user.findUnique({
            where: {
                email: authDTO.email,
            }
        })
        if(!user){
            throw new ForbiddenException(AuthError.USER_NOT_FOUND)
        }
        const passwordMatched = await argon.verify(
            user.password,
            authDTO.password
        )
        if(!passwordMatched){
            throw new ForbiddenException(AuthError.PASSWORD_NOT_CORRECT)
        }
        delete user.password
        return await this.signJwtToken(user.id, user.email)
    }

    async signJwtToken(userId: number , email: string):Promise<{accessToken: string}>{
        const payload = {
            sub: userId,
            email
        }

        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: '10h',
            secret: this.configService.get('JWT_SECRET')
        })

        return{
            accessToken: jwtString
        }
    }
}
