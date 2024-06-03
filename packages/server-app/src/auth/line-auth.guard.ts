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

    if (!authorization) throw new UnauthorizedException();

    const token = authorization.split(" ")[1];
    const uid = await this.verifyToken(token);

    if (!uid) throw new UnauthorizedException();

    requset["user"] = { uid };
    return true;
  }

  private async verifyToken(token: string): Promise<string | null> {
    try {
      const res = await axios.post(
        "https://api.line.me/oauth2/v2.1/verify",
        {
          id_token: token,
          client_id: process.env.LINE_CHANNEL_ID,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        },
      );

      if (res.status !== 200) throw new UnauthorizedException();
      return res.data.sub;
    } catch (error) {}
    return null;
  }
}
