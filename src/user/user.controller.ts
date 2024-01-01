import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserId } from 'src/auth/decorators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUserId() userId: number) {
    return this.userService.getMe(userId);
  }
}
