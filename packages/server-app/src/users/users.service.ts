import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(lineUid: string, createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: { ...createUserDto, lineUid },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, lineUid: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id, lineUid },
      data: updateUserDto,
    });
  }

  remove(id: number, lineUid: string) {
    return this.prisma.user.delete({ where: { id, lineUid } });
  }
}
