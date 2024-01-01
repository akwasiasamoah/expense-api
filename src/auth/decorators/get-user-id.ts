import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserSession } from '../types';
import { Request } from 'express';

export const GetUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request;
    const session = request.session as UserSession;

    return Number(session.user?.id);
  },
);
