import { ApiProperty } from "@nestjs/swagger";
import { Post } from "@prisma/client";

export class PostEntity implements Post {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  published: boolean;
}
