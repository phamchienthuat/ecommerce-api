import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InsertAddressDto, UpdateDetailDto } from './dto';
import { errorResponse, successResponse } from 'src/utils/api-response.util';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getListAddress(userId: number, page: number, limit: number) {
    try {
      const take = Number(limit);
      const skip = Number(page - 1) * limit;

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
        page: page,
        itemPerPage: limit,
        totalRecords,
      };

      return successResponse(address, pagination, HttpStatus.OK);
    } catch (error) {
      console.log(error);
      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message || 'Something went wrong',
      );
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

      const pagination = null;

      return successResponse(detail ? [detail] : [], pagination, HttpStatus.OK);
    } catch (error) {
      const statusCode =
        error instanceof ForbiddenException
          ? HttpStatus.FORBIDDEN
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return errorResponse(statusCode, error.message || 'Something went wrong');
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

      return successResponse([address], {}, HttpStatus.CREATED);
    } catch (error) {
      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message || 'Internal Server Error',
      );
    }
  }

  async updateDetail(detailId: number, updateDetailDto: UpdateDetailDto) {
    try {
      const detail = await this.prismaService.address.findUnique({
        where: {
          id: detailId,
        },
      });

      if (!detail) {
        throw new ForbiddenException('Cannot find detail to update');
      }

      const updatedData = {
        name: updateDetailDto.name,
        addressLine: updateDetailDto.addressLine,
        districtId: updateDetailDto.districtId
          ? Number(updateDetailDto.districtId)
          : undefined,
        communeId: updateDetailDto.communeId
          ? Number(updateDetailDto.communeId)
          : undefined,
        provinceId: updateDetailDto.provinceId
          ? Number(updateDetailDto.provinceId)
          : undefined,
        phone: updateDetailDto.phone,
      };

      const updatedDetail = await this.prismaService.address.update({
        where: {
          id: detailId,
        },
        data: updatedData,
      });

      return successResponse([updatedDetail], null, HttpStatus.OK);
    } catch (error) {
      const statusCode =
        error instanceof ForbiddenException
          ? HttpStatus.FORBIDDEN
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return errorResponse(statusCode, error.message || 'Something went wrong');
    }
  }

  async deleteDetail(detailId: number) {
    try {
      const detail = await this.prismaService.address.findUnique({
        where: {
          id: detailId,
        },
      });

      if (!detail) {
        throw new ForbiddenException('Cannot find detail to delete');
      }

      await this.prismaService.address.delete({
        where: {
          id: detailId,
        },
      });

      return successResponse([], null, HttpStatus.OK);
    } catch (error) {
      const statusCode =
        error instanceof ForbiddenException
          ? HttpStatus.FORBIDDEN
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return errorResponse(statusCode, error.message || 'Something went wrong');
    }
  }
}
