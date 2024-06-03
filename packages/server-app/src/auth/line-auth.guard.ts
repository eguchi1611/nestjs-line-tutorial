import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import axios from "axios";

@Injectable()
export class LineAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const requset = context.switchToHttp().getRequest();
    const authorization = requset.headers.authorization;

    console.log("呼ばれた!");

    if (!authorization) throw new UnauthorizedException();

    const user = { test: "test" };

    requset["user"] = user;

    return true;
  }

  private verifyToken(token: string) {
    axios.post(
      "https://api.line.me/oauth2/v2.1/verify",
      {
        id_token: token,
        client_id: "todo",
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );
  }
}
