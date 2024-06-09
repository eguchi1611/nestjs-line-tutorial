import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, validateCustomDecorators: true }),
  );

  const config = new DocumentBuilder()
    .setTitle("nestjs-line-tutorial")
    .setDescription("nestjs-line-tutorial")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document);
  fs.writeFileSync("openapi.json", JSON.stringify(document, null, 2));

  await app.listen(8080);
}
bootstrap();
