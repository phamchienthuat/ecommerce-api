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
                    userName: authDTO.userName,
                },
                 select:{
                    id: true,
                    email: true,
                    userName: true,
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
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;

        const tokens = await this.signJwtToken(user.id, user.email)

        return {
            user: userWithoutPassword,
            ...tokens,
        };
    }

    async signJwtToken(userId: number , email: string):Promise<{accessToken: string, refreshToken:string}>{
        const payload = {
            sub: userId,
            email
        }

        const jwtAccessTokenString = await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
            secret: this.configService.get('JWT_ACCESS_SECRET')
        })

        const jwtRefreshTokenString = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
            secret: this.configService.get('JWT_ACCESS_SECRET')
        })

        return{
            accessToken: jwtAccessTokenString,
            refreshToken: jwtRefreshTokenString
        }
    }
}
