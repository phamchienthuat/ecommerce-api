import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../../common/decorators';
import { MyJwtGuard } from '../../common/guards';
import { UserService } from './user.service';
import { InsertDetailDto, UpdateDetailDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(MyJwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  me(@GetUser() user: User) {
    return user;
  }

  @Get('detail')
  getDetails(@GetUser('id') userId: number) {
    return this.userService.getDetails(userId);
  }

  @Get('detail/:id')
  getDetailById(@Param('id', ParseIntPipe) detailId: number) {
    return this.userService.getDetailById(detailId);
  }

  @Post('detail')
  addDetail(
    @GetUser('id') userId: number,
    @Body() insertDetailDto: InsertDetailDto,
  ) {
    return this.userService.addDetail(userId, insertDetailDto);
  } 

  @Patch('detail/:id')
  updateDetail(
    @Param('id', ParseIntPipe) detailId: number,
    @Body() updateDetailDto: UpdateDetailDto,
  ) {
    return this.userService.updateDetail(detailId, updateDetailDto);
  }

  @Delete('detail/:id')
  deleteDetail(@Param('id', ParseIntPipe) detailId: number) {
    return this.userService.deleteDetail(detailId);
  }
}
