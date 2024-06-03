import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthUser } from "src/auth-user/auth-user.decorator";
import { AuthUserEntity } from "src/auth-user/entities/auth-user.entity";
import { LineAuthGuard } from "src/auth/line-auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(LineAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async create(
    @Body() createUserDto: CreateUserDto,
    @AuthUser()
    authUser: AuthUserEntity,
  ) {
    const { uid } = authUser;
    return new UserEntity(await this.usersService.create(uid, createUserDto));
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(":id")
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return new UserEntity(user);
  }

  @Patch(":id")
  @UseGuards(LineAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @AuthUser() authUser: AuthUserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { uid } = authUser;
    return new UserEntity(
      await this.usersService.update(id, uid, updateUserDto),
    );
  }

  @Delete(":id")
  @UseGuards(LineAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @AuthUser() authUser: AuthUserEntity,
  ) {
    const { uid } = authUser;

    return new UserEntity(await this.usersService.remove(id, uid));
  }
}
