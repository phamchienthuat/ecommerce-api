import { Injectable , HttpStatus} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertProductDto } from './dto';
import { errorResponse, successResponse } from 'src/utils/api-response.util';

@Injectable()
export class ProductService {
    constructor(private prismaService: PrismaService) {}


    async addProduct(userId: number, insertProductDto: InsertProductDto) {
    try {
        const detail = await this.prismaService.product.create({
            data: {
                name: insertProductDto.name,
                description: insertProductDto.description,
                categoryId: Number(insertProductDto.categoryId),
                priceFrom: insertProductDto.description,
                priceTo: insertProductDto.priceTo,
                price: insertProductDto.price,
                promotionPrice: insertProductDto.promotionPrice,
                currencyId: insertProductDto.currencyId,
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
}
