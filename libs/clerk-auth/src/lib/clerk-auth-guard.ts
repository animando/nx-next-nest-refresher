import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Http2ServerRequest } from 'http2';
import { verifyToken } from '@clerk/backend';
import { RolesMeta, Type, TypeMeta } from './clerk-auth.constants';
import { Reflector } from '@nestjs/core';
import { ClerkConfigService } from './clerk-config.service';
import { validateToken } from './clerk-auth.lib';

type GraphqlContext = {
  req: Http2ServerRequest;
};

const getToken = (
  context: ExecutionContext,
  type: Type
): string | undefined => {
  const request =
    type === 'http'
      ? context.switchToHttp().getRequest<Http2ServerRequest>()
      : GqlExecutionContext.create(context).getContext<GraphqlContext>().req;
  const authz = request?.headers['authorization'];
  const token = authz?.split(' ')[1];

  return token;
};

@Injectable()
export class VerifyTokenGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject() private clerkConfig: ClerkConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(RolesMeta, context.getHandler());
    const type = this.reflector.get<Type>(TypeMeta, context.getHandler());

    const token = getToken(context, type);
    return validateToken(token);
  }
}
