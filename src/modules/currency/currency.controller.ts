import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';
import { MyJwtGuard } from 'src/common/guards';
import { GetUser } from 'src/common/decorators';
import { InsertCurrencyDto, UpdateCurrencyDto } from './dto';

@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

    @Get('')
    getListCurrency(
      @GetUser('id') userId: number,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
    ) {
      return this.currencyService.getListCurrency( page, limit);
    }
  
    @Get('/:id')
    getCurrencyById(@Param('id', ParseIntPipe) currencyId: number) {
      return this.currencyService.getCurrencyById(currencyId);
    }

    @UseGuards(MyJwtGuard)
    @ApiBearerAuth('accessToken')
    @Post('')
    addCurrency(
    @GetUser('id') userId: number,
    @Body() insertCurrencyDto: InsertCurrencyDto,
    ) {
      return this.currencyService.addCurrency(userId, insertCurrencyDto);
    }

    @UseGuards(MyJwtGuard)
    @ApiBearerAuth('accessToken')
    @Patch('/:id')
    updateCurrency(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) currencyId: number,
      @Body() updateCurrencyDto: UpdateCurrencyDto,
    ) {
      return this.currencyService.updateCurrency(userId, currencyId, updateCurrencyDto);
    }
    
    @UseGuards(MyJwtGuard)
    @ApiBearerAuth('accessToken')
    @Delete('')
    deleteCategories(@Query('ids') ids: string) {
      const currencyIds = ids.split(',').map((id) => Number(id));
  
      if (currencyIds.some(isNaN)) {
        throw new Error('Invalid category ID(s) provided.');
      }
      
      return this.currencyService.deleteCurrency(currencyIds);
    }
}
