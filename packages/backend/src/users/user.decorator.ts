import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";

export const User = createParamDecorator((_data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const user = request.user;

  return new UserEntity(user);
});
