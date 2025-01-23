import { Injectable, HttpStatus, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertProductDto, UpdateProductDto } from './dto';
import { errorResponse, successResponse } from 'src/utils/api-response.util';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async getListProduct(page: number, limit: number) {
    try {
      const take = Number(limit);
      const skip = Number(page - 1) * limit;

      const totalRecords = await this.prismaService.product.count();

      // Lấy danh sách với phân trang
      const detail = await this.prismaService.product.findMany({
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

  async getProductById(productId: number) {
    try {
      const detail = await this.prismaService.product.findUnique({
        where: { id: productId },
        include: {
            images: true,
          items: {
            include: {
              images: true,
              attributes: {
                include: {
                  attributeOption: {
                    include: {
                      productAttribute: {
                        select: {
                          name: true, // Lấy tên của ProductAttributes
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!detail) {
        throw new ForbiddenException(
          'Cannot find product with the provided id',
        );
      }

      const pagination = null;

    //   const result = {
    //     ...detail,
    //     items: detail.items.map((item) => ({
    //       ...item,
    //       attributes: item.attributes.map((attr) => ({
    //         name: attr.attributeOption.productAttribute.name, // Tên của ProductAttributes
    //         value: attr.attributeOption.value, // Giá trị của AttributeOption
    //       })),
    //     })),
    //   };

      return successResponse(detail ? [detail] : [], pagination, HttpStatus.OK);
    } catch (error) {
      const statusCode =
        error instanceof ForbiddenException
          ? HttpStatus.FORBIDDEN
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return errorResponse(statusCode, error.message || 'Something went wrong');
    }
  }

  async addProduct(userId: number, insertProductDto: InsertProductDto) {
    try {
      const detail = await this.prismaService.product.create({
        data: {
          name: insertProductDto.name,
          description: insertProductDto.description,
          categoryId: Number(insertProductDto.categoryId),
          priceFrom: insertProductDto.priceFrom,
          priceTo: insertProductDto.priceTo,
          price: insertProductDto.price,
          promotionPrice: insertProductDto.promotionPrice,
          currencyId: insertProductDto.currencyId,
          createdBy: userId,
          slug: insertProductDto.slug,
        },
      });

      const imagePromises = insertProductDto.images.map((image) =>
        this.prismaService.productionImages.create({
          data: {
            productId: detail.id,
            imageFileName: image,
            isMain: true,
          },
        }),
      );
      await Promise.all(imagePromises);

      const productItemPromises = insertProductDto.items.map(async (item) => {
        const productItem = await this.prismaService.productItems.create({
          data: {
            productId: detail.id,
            name: item.name,
            price: item.price,
            promotionPrice: item.promotionPrice || null,
            quantity: item.quantity || 0,
            createdBy: userId,
          },
        });
        //  thêm image
        const imagePromises = item.images.map((image) =>
          this.prismaService.productionImages.create({
            data: {
              productItemId: productItem.id,
              imageFileName: image,
              isMain: false,
            },
          }),
        );
        await Promise.all(imagePromises);
        // thêm thuộc tính (attr)
        const attributes = item.attributes.map((attr) =>
          this.prismaService.productionConfig.create({
            data: {
              productItemId: productItem.id,
              attributesOptionId: attr.id,
            },
          }),
        );
        await Promise.all(attributes);
      });
      await Promise.all(productItemPromises);

      const productWithDetails = await this.prismaService.product.findUnique({
        where: { id: detail.id },
        include: {
          items: {
            include: {
              images: true,
              attributes: {
                include: {
                  attributeOption: true,
                },
              },
            },
          },
          images: true,
        },
      });

      return successResponse([productWithDetails], {}, HttpStatus.CREATED);
    } catch (error) {
      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message || 'Internal Server Error',
      );
    }
  }

  async updateProduct(
    userId: number,
    productId: number,
    updateProductDto: UpdateProductDto,
  ) {
    try {
      const detail = await this.prismaService.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!detail) {
        throw new ForbiddenException('Cannot find product to update');
      }

      const dataDetail = await this.prismaService.product.update({
        where: {
          id: productId,
        },
        data: {
            name: updateProductDto.name,
            description: updateProductDto.description,
            categoryId: Number(updateProductDto.categoryId),
            priceFrom: updateProductDto.priceFrom,
            priceTo: updateProductDto.priceTo,
            price: updateProductDto.price,
            promotionPrice: updateProductDto.promotionPrice,
            currencyId: updateProductDto.currencyId,
            updatedBy: userId,
            slug: updateProductDto.slug,
        },
      });

    //   const imagePromises = updateProductDto.images.map((image) =>
    //     this.prismaService.productionImages.update({
    //         where: {
    //             id: productId,
    //         },
    //       data: {
    //         productId: dataDetail.id,
    //         imageFileName: image,
    //         isMain: true,
    //       },
    //     }),
    //   );
    //   await Promise.all(imagePromises);

      const productItemPromises = updateProductDto.items.map(async (item) => {
        const productItem = await this.prismaService.productItems.create({
          data: {
            productId: dataDetail.id,
            name: item.name,
            price: item.price,
            promotionPrice: item.promotionPrice || null,
            quantity: item.quantity || 0,
            createdBy: userId,
          },
        });
        //  thêm image
        const imagePromises = item.images.map((image) =>
          this.prismaService.productionImages.create({
            data: {
              productItemId: productItem.id,
              imageFileName: image,
              isMain: false,
            },
          }),
        );
        await Promise.all(imagePromises);
        // thêm thuộc tính (attr)
        const attributes = item.attributes.map((attr) =>
          this.prismaService.productionConfig.create({
            data: {
              productItemId: productItem.id,
              attributesOptionId: attr.id,
            },
          }),
        );
        await Promise.all(attributes);
      });
      await Promise.all(productItemPromises);

    //   const productWithDetails = await this.prismaService.product.findUnique({
    //     where: { id: detail.id },
    //     include: {
    //       items: {
    //         include: {
    //           images: true,
    //           attributes: {
    //             include: {
    //               attributeOption: true,
    //             },
    //           },
    //         },
    //       },
    //       images: true,
    //     },
    //   });

      return successResponse([dataDetail], null, HttpStatus.OK);
    } catch (error) {
      const statusCode =
        error instanceof ForbiddenException
          ? HttpStatus.FORBIDDEN
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return errorResponse(statusCode, error.message || 'Something went wrong');
    }
  }

  async deleteProduct(productIds: number[]) {
    try {
      const details = await this.prismaService.product.findMany({
        where: {
          id: { in: productIds },
        },
      });

      if (details.length !== productIds.length) {
        throw new ForbiddenException('Some product were not found');
      }

      await this.prismaService.product.deleteMany({
        where: {
          id: { in: productIds },
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
