import { PrismaService } from './../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InsertAddressDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getListAddress(userId: number) {
    const detail = await this.prismaService.userAddress.findMany({
      where: {
        userId: userId, // Lọc theo userId trong bảng UserAddress
      },
      include: {
        address: true, // Bao gồm thông tin địa chỉ từ bảng Address
      },
    });

    return detail.map((ua) => ua.address); // Trả về danh sách địa chỉ
  }

  // async getDetailById(detailId: number) {
  //   const detail = await this.prismaService.address.findMany({
  //     where: {
  //       id: detailId,
  //     },
  //   });
  //   if (!detail) {
  //     throw new ForbiddenException('Cannot find detail to delete');
  //   }
  //   return detail
  // }

  async addAddress(userId: number, insertAddressDto: InsertAddressDto) {
    try {
      console.log(insertAddressDto);
      
      const address = await this.prismaService.address.create({
        data: {
          name: insertAddressDto.name,
          addressLine: insertAddressDto.addressLine,
          districtId: Number(insertAddressDto.districtId),
          communeId: Number(insertAddressDto.communeId),
          provinceId: Number(insertAddressDto.provinceId),
          phone: insertAddressDto.phone,
        },
      });

      await this.prismaService.userAddress.create({
        data: {
          userId: userId,
          addressId: address.id,
          isDefault: Boolean(insertAddressDto.isDefault),
        },
      });

      return {
        success: true,
        response: {
          data: [address],
          pagination: {},
        },
        errors: [],
      };
      
    } catch (error) {
      console.error('Error creating address:', error);
      
      throw new HttpException({
        success: false,
        response: {
          data: [],         // Không có dữ liệu khi lỗi xảy ra
          pagination: {},   // Có thể để trống hoặc cung cấp thông tin phân trang
        },
        errors: [
          {
            code: HttpStatus.INTERNAL_SERVER_ERROR, // Mã lỗi HTTP
            message: error.message || 'Internal Server Error', // Thông điệp lỗi
          },
        ],
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async updateDetail(detailId: number, updateDetailDto: UpdateDetailDto) {
  //   const detail = await this.prismaService.address.findMany({
  //     where: {
  //       id: detailId,
  //     },
  //   });
  //   if (!detail) {
  //     throw new ForbiddenException('Cannot find detail to update');
  //   }

  //   return this.prismaService.address.update({
  //     where: {
  //       id: detailId,
  //     },
  //     data: { ...updateDetailDto },
  //   });
  // }

  // async deleteDetail(detailId: number) {
  //   const detail = await this.prismaService.address.findMany({
  //     where: {
  //       id: detailId,
  //     },
  //   });
  //   if (!detail) {
  //     throw new ForbiddenException('Cannot find detail to delete');
  //   }

  //   return this.prismaService.address.delete({
  //     where: {
  //       id: detailId,
  //     },
  //   });
  // }
}
