import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  lineUid: string;

  @ApiProperty({ nullable: true })
  comment: string | null;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
