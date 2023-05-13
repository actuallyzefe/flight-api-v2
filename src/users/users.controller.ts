import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { RequestExpress, ResponseExpress } from 'express';
import { UsersService } from './users.service';
import { UserInfoDto } from './dtos/user-info.dto';
import { CheckIDInterceptor } from './checkID.interceptor';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(new CheckIDInterceptor())
  @Post('checkout/:id')
  async checkout(
    @Request() req: RequestExpress,
    @Param('id') id: string,
    @Body() userCredentials: UserInfoDto,
  ) {
    return this.usersService.checkout(req, id, userCredentials);
  }
}
