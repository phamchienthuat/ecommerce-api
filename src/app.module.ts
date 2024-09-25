import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
