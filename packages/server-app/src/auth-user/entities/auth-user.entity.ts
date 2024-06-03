import { User } from "@prisma/client";
import { IsString } from "class-validator";

export class AuthUserEntity {
  @IsString()
  uid: string;

  constructor(partial: Partial<AuthUserEntity>) {
    Object.assign(this, partial);
  }
}
