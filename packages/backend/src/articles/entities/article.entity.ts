import { ApiProperty } from "@nestjs/swagger";
import { Article } from "@prisma/client";

export class ArticleEntity implements Article {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false, nullable: true })
  title: string | null;

  @ApiProperty({ required: false, nullable: true })
  content: string | null;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<Article>) {
    Object.assign(this, partial);
  }
}
