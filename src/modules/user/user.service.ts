import { PrismaService } from './../prisma/prisma.service';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InsertAddressDto } from './dto';
import { errorResponse, successResponse } from 'src/utils/api-response.util';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getListAddress(userId: number, page: number, limit: number) {
    try {
      const take = Number(limit); // Số lượng bản ghi trên mỗi trang
      const skip = Number(page - 1) * limit; // Bỏ qua số lượng bản ghi cho đến trang hiện tại

      const totalRecords = await this.prismaService.userAddress.count({
        where: { userId },
      });

      // Lấy danh sách với phân trang
      const detail = await this.prismaService.userAddress.findMany({
        where: {
          userId,
        },
        include: {
          address: true,
        },
        take,
        skip,
      });

      const address = detail.map((ua) => ua.address);
      
      const pagination = {
        currentPage: page,
        limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
      }

      return successResponse(address, pagination, HttpStatus.OK)
    } catch (error) {
      console.log(error);
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message || 'Something went wrong');
    }
  }

  async getAddressById(addressId: number) {
    try {
      const detail = await this.prismaService.address.findUnique({
        where: {
          id: addressId,
        },
      });

      if (!detail) {
        throw new ForbiddenException(
          'Cannot find address with the provided id',
        );
      }

      return {
        success: true,
        statusCode: HttpStatus.OK,
        data: detail,
        pagination: null, // Không cần phân trang trong trường hợp này
        errors: [],
      };
    } catch (error) {
      // Xử lý ngoại lệ và trả về cấu trúc lỗi chuẩn
      return {
        success: false,
        statusCode:
          error instanceof ForbiddenException
            ? HttpStatus.FORBIDDEN
            : HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        pagination: null,
        errors: [error.message || 'Something went wrong'],
      };
    }
  }

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
        statusCode: HttpStatus.CREATED,
        data: [address],
        pagination: {},
        errors: [],
      };
    } catch (error) {
      console.error('Error creating address:', error);

      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR, // Mã lỗi HTTP
          data: [], // Không có dữ liệu khi lỗi xảy ra
          pagination: {}, // Có thể để trống hoặc cung cấp thông tin phân trang
          errors: [
            {
              message: error.message || 'Internal Server Error', // Thông điệp lỗi
            },
          ],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
