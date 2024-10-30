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
import { User } from '@prisma/client';
import { GetUser } from '../../common/decorators';
import { MyJwtGuard } from '../../common/guards';
import { UserService } from './user.service';
import { InsertAddressDto, UpdateAddressDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(MyJwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  me(@GetUser() user: User) {
    return user;
  }

  @Get('address')
  getListAddress(
    @GetUser('id') userId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.userService.getListAddress(userId, page, limit);
  }

  @Get('address/:id')
  getAddressById(@Param('id', ParseIntPipe) addressId: number) {
    return this.userService.getAddressById(addressId);
  }

  @Post('address')
  addAddress(
    @GetUser('id') userId: number,
    @Body() insertAddressDto: InsertAddressDto,
  ) {
    return this.userService.addAddress(userId, insertAddressDto);
  }

  @Patch('address/:id')
  updateAddress(
    @Param('id', ParseIntPipe) addressId: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.userService.updateAddress(addressId, updateAddressDto);
  }

  @Delete('address/:id')
  deleteAddress(@Param('id', ParseIntPipe) addressId: number) {
    return this.userService.deleteAddress(addressId);
  }
}
