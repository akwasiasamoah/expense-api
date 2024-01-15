import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserId, OnlyAdmin } from 'src/auth/decorators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @OnlyAdmin()
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('me')
  getMe(@GetUserId() userId: number) {
    return this.userService.getMe(userId);
  }
}
