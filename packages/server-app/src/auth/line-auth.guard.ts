import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import axios from "axios";
import { AuthUserEntity } from "src/auth-user/entities/auth-user.entity";

@Injectable()
export class LineAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const requset = context.switchToHttp().getRequest();
    const authorization = requset.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    try {
      const uid = await this.verifyToken(token);
      if (uid) {
        requset["user"] = new AuthUserEntity({ uid });
        return true;
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  /**
   *
   * @param token liff.getAccessToken()で取得できるトークン
   * @returns LINEのユーザーID
   * @throws {any} トークンの検証に失敗した場合
   */
  private async verifyToken(token: string): Promise<string | null> {
    const verify = await axios.get("https://api.line.me/oauth2/v2.1/verify", {
      params: { access_token: token },
    });

    if (
      verify.status === 200 &&
      verify.data.client_id === process.env.LINE_CHANNEL_ID &&
      verify.data.expires_in > 0
    ) {
      const userinfo = await axios.get(
        "https://api.line.me/oauth2/v2.1/userinfo",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return userinfo.data.sub;
    }
    return null;
  }
}
