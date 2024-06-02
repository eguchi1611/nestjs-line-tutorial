import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PrismaModule, PostsModule],
  providers: [PrismaService],
})
export class AppModule {}
