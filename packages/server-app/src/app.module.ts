import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  imports: [PrismaModule],
  providers: [PrismaService],
})
export class AppModule {}
