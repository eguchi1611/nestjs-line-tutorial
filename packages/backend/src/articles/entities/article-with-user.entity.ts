import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/user.entity";
import { ArticleEntity } from "./article.entity";

export class ArticleWithUserEntity extends ArticleEntity {
  @ApiProperty({ type: UserEntity })
  author: UserEntity;

  constructor({ author, ...partial }: Partial<ArticleWithUserEntity>) {
    super(partial);
    if (author) {
      this.author = new UserEntity(author);
    }
  }
}
