import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(authorId: number, createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: { ...createArticleDto, authorId },
    });
  }

  findAll() {
    return this.prisma.article.findMany({
      include: {
        author: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  update(id: number, authorId: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id, authorId },
      data: { ...updateArticleDto, authorId },
    });
  }

  remove(id: number, authorId: number) {
    return this.prisma.article.delete({
      where: { id, authorId },
    });
  }
}
