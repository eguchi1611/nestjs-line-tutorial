import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const AuthUser = createParamDecorator<unknown>(
  (_data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
