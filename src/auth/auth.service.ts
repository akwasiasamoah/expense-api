import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    console.log(dto);
    // get email and password
    // check if user exists
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    console.log(userExists);
    // hash password
    // store the user in the database
    return { status: 200, msg: 'signup function' };
  }

  signIn() {
    return 'signin function';
  }
}
