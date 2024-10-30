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
import { ApiTags } from '@nestjs/swagger';
import { MyJwtGuard } from 'src/common/guards';
import { GetUser } from 'src/common/decorators';
import { ProductAttributesService } from './product-attributes.service';
import {
  InsertAttributeDto,
  InsertAttributeOptionDto,
  UpdateAttributeDto,
  UpdateAttributeOptionDto,
} from './dto';

@ApiTags('product-attribute')
@UseGuards(MyJwtGuard)
@Controller('product-attribute')
export class ProductAttributesController {
  constructor(private productAttributeService: ProductAttributesService) {}

  @Get('')
  getListProductAttribute(
    @GetUser('id') userId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.productAttributeService.getListProductAttribute(page, limit);
  }

  @Get('/:id')
  getProductAttributeById(
    @Param('id', ParseIntPipe) productAttributeId: number,
  ) {
    return this.productAttributeService.getProductAttributeById(
      productAttributeId,
    );
  }

  @UseGuards(MyJwtGuard)
  @Post('')
  addProductAttribute(
    @GetUser('id') userId: number,
    @Body() insertAttributeDto: InsertAttributeDto,
  ) {
    return this.productAttributeService.addProductAttribute(
      userId,
      insertAttributeDto,
    );
  }

  @UseGuards(MyJwtGuard)
  @Patch('/:id')
  updateProductAttribute(
    @Param('id', ParseIntPipe) productAttributeId: number,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    return this.productAttributeService.updateProductAttribute(
      productAttributeId,
      updateAttributeDto,
    );
  }

  @UseGuards(MyJwtGuard)
  @Delete('/:id')
  deleteProductAttribute(
    @Param('id', ParseIntPipe) productAttributeId: number,
  ) {
    return this.productAttributeService.deleteProductAttribute(
      productAttributeId,
    );
  }

  // create option

  @Get(':id/option')
  getListAttributeOption(
    @GetUser('id') userId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.productAttributeService.getListAttributeOption(page, limit);
  }

  @Get(':id/option/:id')
  getAttributeOptionById(@Param('id', ParseIntPipe) attributeOptionId: number) {
    return this.productAttributeService.getAttributeOptionById(
      attributeOptionId,
    );
  }

  @UseGuards(MyJwtGuard)
  @Post(':id/option')
  addAttributeOption(
    @Param('id', ParseIntPipe) productAttributeId: number,
    @GetUser('id') userId: number,
    @Body() insertAttributeOptionDto: InsertAttributeOptionDto,
  ) {
    return this.productAttributeService.addAttributeOption(
      userId,
      productAttributeId,
      insertAttributeOptionDto,
    );
  }

  @UseGuards(MyJwtGuard)
  @Patch(':id/option/:id2')
  updateAttributeOption(
    @Param('id', ParseIntPipe) productAttributeId: number,
    @Param('id2', ParseIntPipe) attributeOptionId: number,
    @Body() updateAttributeOptionDto: UpdateAttributeOptionDto,
  ) {
    return this.productAttributeService.updateAttributeOption(
      productAttributeId,
      attributeOptionId,
      updateAttributeOptionDto,
    );
  }

  @UseGuards(MyJwtGuard)
  @Delete('/:id/option/:id2')
  deleteAttributeOption(
    @Param('id', ParseIntPipe) productAttributeId: number,
    @Param('id2', ParseIntPipe) attributeOptionId: number,
  ) {
    return this.productAttributeService.deleteAttributeOption(
      productAttributeId,
      attributeOptionId
    );
  }
}
