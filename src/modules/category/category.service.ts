import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { errorResponse, successResponse } from 'src/utils/api-response.util';
import { InsertCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async getListCategory(page: number, limit: number) {
    try {
      const take = Number(limit);
      const skip = Number(page - 1) * limit;

      const totalRecords = await this.prismaService.category.count();

      // Lấy danh sách với phân trang
      const detail = await this.prismaService.category.findMany({
        take,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
      });

      const pagination = {
        page: page,
        itemPerPage: limit,
        totalRecords,
      };

      return successResponse(detail, pagination, HttpStatus.OK);
    } catch (error) {
      console.log(error);
      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message || 'Something went wrong',
      );
    }
  }

  async getCategoryById(categoryId: number) {
    try {
      const detail = await this.prismaService.category.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!detail) {
        throw new ForbiddenException(
          'Cannot find category with the provided id',
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

  async addCategory(userId: number, insertCategoryDto: InsertCategoryDto) {
    try {
      const detail = await this.prismaService.category.create({
        data: {
          parentId: insertCategoryDto.parentId
            ? Number(insertCategoryDto.parentId)
            : null,
          name: insertCategoryDto.name,
          description: insertCategoryDto.description,
          image: insertCategoryDto.image,
          slug: insertCategoryDto.slug,
        },
      });

      return successResponse([detail], {}, HttpStatus.CREATED);
    } catch (error) {
      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message || 'Internal Server Error',
      );
    }
  }

  async updateCategory(
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const detail = await this.prismaService.category.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!detail) {
        throw new ForbiddenException('Cannot find category to update');
      }

      const dataDetail = await this.prismaService.category.update({
        where: {
          id: categoryId,
        },
        data: {
          parentId: updateCategoryDto.parentId
            ? Number(updateCategoryDto.parentId)
            : null,
          name: updateCategoryDto.name,
          description: updateCategoryDto.description,
          image: updateCategoryDto.image,
          slug: updateCategoryDto.slug,
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

  async deleteCategories(categoryIds: number[]) {
    try {
      const details = await this.prismaService.category.findMany({
        where: {
          id: { in: categoryIds },
        },
      });

      if (details.length !== categoryIds.length) {
        throw new ForbiddenException('Some categories were not found');
      }

      await this.prismaService.category.deleteMany({
        where: {
          id: { in: categoryIds },
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
