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

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const session = request.session as UserSession;

    // if public route bypass authorization
    const isPublicRoute = this.reflector.getAllAndOverride<string>(
      'PUBLIC_ROUTE',
      [context.getHandler(), context.getClass()],
    );

    if (isPublicRoute) return true;

    console.log(isPublicRoute);
    if (!session.user) {
      throw new UnauthorizedException('Session not provided');
    }

    return true;
  }
}
