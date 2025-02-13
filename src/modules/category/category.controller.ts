import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  @ApiBearerAuth('accessToken')
  @Post('')
  addCategory(
    @GetUser('id') userId: number,
    @Body() insertCategoryDto: InsertCategoryDto,
  ) {
    return this.categoryService.addCategory(userId, insertCategoryDto);
  }

  @UseGuards(MyJwtGuard)
  @ApiBearerAuth('accessToken')
  @Patch('/:id')
  updateCategory(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(userId, categoryId, updateCategoryDto);
  }

  @UseGuards(MyJwtGuard)
  @ApiBearerAuth('accessToken')
  @Delete('')
  deleteCategories(@Query('ids') ids: string) {
    const categoryIds = ids.split(',').map((id) => Number(id));

    if (categoryIds.some(isNaN)) {
      throw new Error('Invalid category ID(s) provided.');
    }
    
    return this.categoryService.deleteCategories(categoryIds);
  }
}
