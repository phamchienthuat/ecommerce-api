import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { errorResponse, successResponse } from 'src/utils/api-response.util';
import { InsertCurrencyDto, UpdateCurrencyDto } from './dto';

@Injectable()
export class CurrencyService {
    constructor(private prismaService: PrismaService) {}
    async getListCurrency(page: number, limit: number) {
        try {
          const take = Number(limit);
          const skip = Number(page - 1) * limit;
    
          const totalRecords = await this.prismaService.currency.count();
    
          // Lấy danh sách với phân trang
          const detail = await this.prismaService.currency.findMany({
            take,
            skip,
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

    async getCurrencyById(currencyId: number) {
        try {
          const detail = await this.prismaService.currency.findUnique({
            where: {
              id: currencyId,
            },
          });
    
          if (!detail) {
            throw new ForbiddenException(
              'Cannot find currency with the provided id',
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

    async addCurrency(userId: number, insertCurrencyDto: InsertCurrencyDto) {
        try {
          const detail = await this.prismaService.currency.create({
            data: {
              name: insertCurrencyDto.name,
              code: insertCurrencyDto.code,
              symbol: insertCurrencyDto.symbol,
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

    async updateCurrency(
        userId: number,
        currencyId: number,
        updateCurrencyDto: UpdateCurrencyDto,
      ) {
        try {
          const detail = await this.prismaService.currency.findUnique({
            where: {
              id: currencyId,
            },
          });
    
          if (!detail) {
            throw new ForbiddenException('Cannot find currency to update');
          }
    
          const dataDetail = await this.prismaService.currency.update({
            where: {
              id: currencyId,
            },
            data: {
              name: updateCurrencyDto.name,
              code: updateCurrencyDto.code,
              symbol: updateCurrencyDto.symbol,
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

    async deleteCurrency(currencyIds: number[]) {
      try {
        const details = await this.prismaService.currency.findMany({
          where: {
            id: { in: currencyIds },
          },
        });
  
        if (details.length !== currencyIds.length) {
          throw new ForbiddenException('Some currency were not found');
        }
  
        await this.prismaService.currency.deleteMany({
          where: {
            id: { in: currencyIds },
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
