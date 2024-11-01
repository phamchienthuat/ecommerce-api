import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MyJwtGuard } from 'src/common/guards';
import { CategoryService } from './category.service';
import { GetUser } from 'src/common/decorators';
import { InsertCategoryDto, UpdateCategoryDto } from './dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('')
  getListCategory(
    @GetUser('id') userId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.categoryService.getListCategory( page, limit);
  }

  @Get('/:id')
  getCategoryById(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoryService.getCategoryById(categoryId);
  }

  @UseGuards(MyJwtGuard)
  @Post('')
  addCategory(
    @GetUser('id') userId: number,
    @Body() insertCategoryDto: InsertCategoryDto,
  ) {
    return this.categoryService.addCategory(userId, insertCategoryDto);
  }

  @UseGuards(MyJwtGuard)
  @Patch('/:id')
  updateCategory(
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(categoryId, updateCategoryDto);
  }

  @UseGuards(MyJwtGuard)
  @Delete('')
  deleteCategories(@Body('categoryIds') categoryIds: number[]) {
    return this.categoryService.deleteCategories(categoryIds);
  }
}
