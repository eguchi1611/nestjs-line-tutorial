import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { IsDate, IsNumber, IsString } from "class-validator";

export class UserEntity implements User {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  lineUid: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
