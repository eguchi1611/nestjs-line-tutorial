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
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/user.entity";
import { User } from "src/users/user.decorator";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { ArticleWithUserEntity } from "./entities/article-with-user.entity";
import { ArticleEntity } from "./entities/article.entity";
import { Public } from "src/auth/decorators/public.decorator";

@Controller("articles")
@ApiTags("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  @ApiBearerAuth()
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @User() user: UserEntity,
  ) {
    const uid = user.id;
    return new ArticleEntity(
      await this.articlesService.create(uid, createArticleDto),
    );
  }

  @Get()
  @ApiResponse({ type: ArticleWithUserEntity, isArray: true })
  @Public()
  async findAll() {
    const articles = await this.articlesService.findAll();
    return articles.map((article) => new ArticleWithUserEntity(article));
  }

  @Get(":id")
  @ApiOkResponse({ type: ArticleWithUserEntity })
  @Public()
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const article = await this.articlesService.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return new ArticleWithUserEntity(article);
  }

  @Patch(":id")
  @ApiCreatedResponse({ type: ArticleEntity })
  @ApiBearerAuth()
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
    @User() user: UserEntity,
  ) {
    const uid = user.id;
    return new ArticleEntity(
      await this.articlesService.update(id, uid, updateArticleDto),
    );
  }

  @Delete(":id")
  @ApiCreatedResponse({ type: ArticleEntity })
  @ApiBearerAuth()
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    const uid = user.id;
    return new ArticleEntity(await this.articlesService.remove(id, uid));
  }
}
