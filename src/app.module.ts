import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductAttributesModule } from './modules/product-attributes/product-attributes.module';
import { UploadModule } from './modules/upload/upload.module';
import { ProductModule } from './modules/product/product.module';
import { CurrencyModule } from './modules/currency/currency.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    UserModule,
    CategoryModule,
    ProductAttributesModule,
    UploadModule,
    ProductModule,
    CurrencyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
