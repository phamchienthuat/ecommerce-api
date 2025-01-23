import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { MyJwtGuard } from 'src/common/guards';
import { GetUser } from 'src/common/decorators';
import { InsertProductDto, UpdateProductDto } from './dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('')
  getListCategory(
    @GetUser('id') userId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.productService.getListProduct(page, limit);
  }

  @Get('/:id')
  getCategoryById(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.getProductById(productId);
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

  @UseGuards(MyJwtGuard)
  @ApiBearerAuth('accessToken')
  @Patch('/:id')
  updateCategory(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(
      userId,
      categoryId,
      updateProductDto,
    );
  }

  @UseGuards(MyJwtGuard)
  @ApiBearerAuth('accessToken')
  @Delete('')
  deleteProducts(@Query('ids') ids: string) {
    const productIds = ids.split(',').map((id) => Number(id));

    if (productIds.some(isNaN)) {
      throw new Error('Invalid product ID(s) provided.');
    }

    return this.productService.deleteProduct(productIds);
  }
}
