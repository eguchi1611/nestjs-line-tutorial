import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthEntity } from "./entities/auth.entity";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(_accessToken: string): Promise<AuthEntity> {
    // const user = null;
    const payload = { username: "sample-user-1", sub: 1 };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
