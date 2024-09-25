import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InsertDetailDto, UpdateDetailDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  getDetails(userId: number) {
    const detail = this.prismaService.userDetail.findMany({
      where: {
        userId: userId,
      },
    });
    return detail;
  }

  async getDetailById(detailId: number) {
    const detail = await this.prismaService.userDetail.findMany({
      where: {
        id: detailId,
      },
    });
    if (!detail) {
      throw new ForbiddenException('Cannot find detail to delete');
    }
    return detail
  }

  async addDetail(userId: number, insertDetailDto: InsertDetailDto) {
    console.log(userId);
    const detail = await this.prismaService.userDetail.create({
      data: {
        name: insertDetailDto.name,
        address: insertDetailDto.address,
        phone: insertDetailDto.phone,
        user: {
          connect: { id: userId },
        },
      },
    });
    return detail;
  }

  async updateDetail(detailId: number, updateDetailDto: UpdateDetailDto) {
    const detail = await this.prismaService.userDetail.findMany({
      where: {
        id: detailId,
      },
    });
    if (!detail) {
      throw new ForbiddenException('Cannot find detail to update');
    }

    return this.prismaService.userDetail.update({
      where: {
        id: detailId,
      },
      data: { ...updateDetailDto },
    });
  }

  async deleteDetail(detailId: number) {
    const detail = await this.prismaService.userDetail.findMany({
      where: {
        id: detailId,
      },
    });
    if (!detail) {
      throw new ForbiddenException('Cannot find detail to delete');
    }

    return this.prismaService.userDetail.delete({
      where: {
        id: detailId,
      },
    });
  }
}
