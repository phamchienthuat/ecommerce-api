import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { errorResponse, successResponse } from 'src/utils/api-response.util';
import { InsertAttributeDto, InsertAttributeOptionDto, UpdateAttributeDto, UpdateAttributeOptionDto } from './dto';

@Injectable()
export class ProductAttributesService {
  constructor(private prismaService: PrismaService) {}

  async getListProductAttribute(page: number, limit: number) {
    try {
      const take = Number(limit);
      const skip = Number(page - 1) * limit;

      const totalRecords = await this.prismaService.productAttributes.count();

      // Lấy danh sách với phân trang
      const detail = await this.prismaService.productAttributes.findMany({
        take,
        skip,
      });

      const pagination = {
        page: page,
        itemPerPage: limit,
        totalRecords,
      };

      return successResponse([detail], pagination, HttpStatus.OK);
    } catch (error) {
      console.log(error);
      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message || 'Something went wrong',
      );
    }
  }

  async getProductAttributeById(productAttributeId: number) {
    try {
      const detail = await this.prismaService.productAttributes.findUnique({
        where: {
          id: productAttributeId,
        },
      });

      if (!detail) {
        throw new ForbiddenException(
          'Cannot find productAttributeId with the provided id',
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

  async addProductAttribute(
    userId: number,
    insertAttributeDto: InsertAttributeDto,
  ) {
    try {
      const detail = await this.prismaService.productAttributes.create({
        data: {
          categoryId: insertAttributeDto.categoryId
            ? Number(insertAttributeDto.categoryId)
            : null,
          name: insertAttributeDto.name,
          type: insertAttributeDto.type,
        },
      });

      return successResponse([detail], {}, HttpStatus.CREATED);
    } catch (error) {
      console.log(error.message);
      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message || 'Internal Server Error',
      );
    }
  }

  async updateProductAttribute(
    productAttributeId: number,
    updateAttributeDto: UpdateAttributeDto,
  ) {
    try {
      const detail = await this.prismaService.productAttributes.findUnique({
        where: {
          id: productAttributeId,
        },
      });

      if (!detail) {
        throw new ForbiddenException('Cannot find category to update');
      }

      const dataDetail = await this.prismaService.productAttributes.update({
        where: {
          id: productAttributeId,
        },
        data: {
          categoryId: updateAttributeDto.categoryId
            ? Number(updateAttributeDto.categoryId)
            : null,
          name: updateAttributeDto.name,
        },
      });

      return successResponse([dataDetail], null, HttpStatus.OK);
    } catch (error) {
      const statusCode =
        error instanceof ForbiddenException
          ? HttpStatus.FORBIDDEN
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return errorResponse(statusCode, error.message || 'Something went wrong');
    }
  }

  async deleteProductAttribute(productAttributeId: number) {
    try {
      const detail = await this.prismaService.productAttributes.findUnique({
        where: {
          id: productAttributeId,
        },
      });

      if (!detail) {
        throw new ForbiddenException('Cannot find productAttributes to delete');
      }

      await this.prismaService.productAttributes.delete({
        where: {
          id: productAttributeId,
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


  async getListAttributeOption(page: number, limit: number) {
    try {
      const take = Number(limit);
      const skip = Number(page - 1) * limit;

      const totalRecords = await this.prismaService.attributeOption.count();

      // Lấy danh sách với phân trang
      const detail = await this.prismaService.attributeOption.findMany({
        take,
        skip,
      });

      const pagination = {
        page: page,
        itemPerPage: limit,
        totalRecords,
      };

      return successResponse([detail], pagination, HttpStatus.OK);
    } catch (error) {
      console.log(error);
      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message || 'Something went wrong',
      );
    }
  }

  async getAttributeOptionById(attributeOptionId: number) {
    try {
      const detail = await this.prismaService.attributeOption.findUnique({
        where: {
          id: attributeOptionId,
        },
      });

      if (!detail) {
        throw new ForbiddenException(
          'Cannot find attributeOptionId with the provided id',
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

  async addAttributeOption(
    userId: number,
    productAttributeId: number,
    insertAttributeOptionDto: InsertAttributeOptionDto,
  ) {
    try {
      const detail = await this.prismaService.attributeOption.create({
        data: {
          productAttributeId: productAttributeId
            ? Number(productAttributeId)
            : null,
          value: insertAttributeOptionDto.value,
        },
      });

      return successResponse([detail], {}, HttpStatus.CREATED);
    } catch (error) {
      console.log(error.message);
      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message || 'Internal Server Error',
      );
    }
  }

  async updateAttributeOption(
    productAttributeId: number,
    attributeOptionId: number,
    updateAttributeOptionDto: UpdateAttributeOptionDto,
  ) {
    try {
      const detail = await this.prismaService.attributeOption.findUnique({
        where: {
          id: attributeOptionId,
        },
      });

      if (!detail) {
        throw new ForbiddenException('Cannot find category to update');
      }

      const dataDetail = await this.prismaService.attributeOption.update({
        where: {
          id: attributeOptionId,
        },
        data: {
          productAttributeId: productAttributeId
            ? Number(productAttributeId)
            : null,
          value: updateAttributeOptionDto.value,
        },
      });

      return successResponse([dataDetail], null, HttpStatus.OK);
    } catch (error) {
      const statusCode =
        error instanceof ForbiddenException
          ? HttpStatus.FORBIDDEN
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return errorResponse(statusCode, error.message || 'Something went wrong');
    }
  }

  async deleteAttributeOption(productAttributeId: number, attributeOptionId:number) {
    try {
      const detail = await this.prismaService.attributeOption.findUnique({
        where: {
          id: attributeOptionId,
        },
      });

      if (!detail) {
        throw new ForbiddenException('Cannot find attributeOption to delete');
      }

      await this.prismaService.attributeOption.delete({
        where: {
          id: attributeOptionId,
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
