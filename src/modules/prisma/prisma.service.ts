import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(){
        super({
            datasources:{
                db:{
                    url: process.env.DATABASE_URL
                }
            }
        })
    }

    async onModuleInit() {
        await this.$connect(); // Kết nối với cơ sở dữ liệu khi module khởi tạo
    }

    async onModuleDestroy() {
        await this.$disconnect(); // Đóng kết nối khi module bị phá hủy
      }
      
    cleanDatabase(){
        return this.$transaction([
            this.user.deleteMany()
        ])
    }
}
