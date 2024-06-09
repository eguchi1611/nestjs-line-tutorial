import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/user.entity";
import { User } from "src/users/user.decorator";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { LoginDto } from "./dto/login.dto";
import { AuthEntity } from "./entities/auth.entity";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOkResponse({ type: AuthEntity })
  @Public()
  login(@Body() { accessToken }: LoginDto) {
    return this.authService.login(accessToken);
  }

  @Get("profile")
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  getProfile(@User() user: UserEntity) {
    return user;
  }
}
