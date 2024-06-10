import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import axios from "axios";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthEntity } from "./entities/auth.entity";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async login(accessToken: string): Promise<AuthEntity> {
    const { data: verified } = await axios
      .get("https://api.line.me/oauth2/v2.1/verify", {
        params: {
          access_token: accessToken,
        },
      })
      .catch(() => {
        throw new UnauthorizedException();
      });

    if (
      verified?.client_id !== process.env.LINE_CLIENT_ID ||
      verified?.expires_in < 0
    ) {
      throw new UnauthorizedException();
    }

    const { data: profile } = await axios
      .get("https://api.line.me/oauth2/v2.1/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .catch(() => {
        throw new UnauthorizedException();
      });

    const lineUid = profile.sub;

    const user = await this.prismaService.user.upsert({
      where: { lineUid: lineUid },
      update: {},
      create: {
        lineUid: lineUid,
      },
    });

    const payload = { username: "sample-user-1", sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      userId: user.id,
    };
  }
}
