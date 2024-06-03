import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lineUid: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  comment?: string;
}
