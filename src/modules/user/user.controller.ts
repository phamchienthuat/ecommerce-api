import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  // ParseIntPipe,
  // Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../../common/decorators';
import { MyJwtGuard } from '../../common/guards';
import { UserService } from './user.service';
import { InsertAddressDto,  } from './dto';
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
  getListAddress(@GetUser('id') userId: number) {
    return this.userService.getListAddress(userId);
  }

  // @Get('detail/:id')
  // getDetailById(@Param('id', ParseIntPipe) detailId: number) {
  //   return this.userService.getDetailById(detailId);
  // }

  @Post('address')
  addAddress(
    @GetUser('id') userId: number,
    @Body() insertAddressDto: InsertAddressDto,
  ) {
    console.log(insertAddressDto)
    return this.userService.addAddress(userId, insertAddressDto);
  } 

  // @Patch('detail/:id')
  // updateDetail(
  //   @Param('id', ParseIntPipe) detailId: number,
  //   @Body() updateDetailDto: UpdateDetailDto,
  // ) {
  //   return this.userService.updateDetail(detailId, updateDetailDto);
  // }

  // @Delete('detail/:id')
  // deleteDetail(@Param('id', ParseIntPipe) detailId: number) {
  //   return this.userService.deleteDetail(detailId);
  // }
}
