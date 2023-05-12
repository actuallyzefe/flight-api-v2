import { Controller, Param, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('checkout/:id')
  async checkout(@Request() req: any, @Param('id') id: string) {
    return this.usersService.checkout(req, id);
  }
}
