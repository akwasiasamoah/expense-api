import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserSession } from '../types';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const session = request.session as UserSession;

    // if public route bypass authorization
    const isAdminRoute = this.reflector.getAllAndOverride<string>(
      'ONLY_ADMIN',
      [context.getHandler(), context.getClass()],
    );

    if (isAdminRoute) return true;

    console.log(isAdminRoute);
    if (session.user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Reserved for admins');
    }

    return true;
  }
}
