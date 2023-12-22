import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  signup(dto: AuthDto) {
    console.log(dto);
    // get email and password
    // check if user exists

    // hash password
    // store the user in the database
    return { status: 200, msg: 'signup function' };
  }

  signIn() {
    return 'signin function';
  }
}
