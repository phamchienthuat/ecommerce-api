import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { ProductService} from './product.service';
import { MyJwtGuard } from 'src/common/guards';
import { GetUser } from 'src/common/decorators';
import { InsertProductDto } from './dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService
    ){
    }

    @UseGuards(MyJwtGuard)
    @ApiBearerAuth('accessToken')
    @Post('')
    addProduct(
    @GetUser('id') userId: number,
    @Body() insertProductDto: InsertProductDto,
    ) {
    return this.productService.addProduct(userId, insertProductDto);
    }
}
