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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { ArticleEntity } from "./entities/article.entity";

@Controller("articles")
@ApiTags("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    const lineUid = 1;
    return new ArticleEntity(
      await this.articlesService.create(lineUid, createArticleDto),
    );
  }

  @Get()
  @ApiResponse({ type: ArticleEntity, isArray: true })
  async findAll() {
    const articles = await this.articlesService.findAll();
    return articles.map((article) => new ArticleEntity(article));
  }

  @Get(":id")
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const article = await this.articlesService.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return new ArticleEntity(article);
  }

  @Patch(":id")
  @ApiCreatedResponse({ type: ArticleEntity })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const lineUid = 1;
    return new ArticleEntity(
      await this.articlesService.update(id, lineUid, updateArticleDto),
    );
  }

  @Delete(":id")
  @ApiCreatedResponse({ type: ArticleEntity })
  async remove(@Param("id", ParseIntPipe) id: number) {
    const lineUid = 1;
    return new ArticleEntity(await this.articlesService.remove(id, lineUid));
  }
}
