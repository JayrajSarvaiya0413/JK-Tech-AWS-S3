import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { S3Controller } from "./controller/s3.controller";
import { S3Service } from "./service/s3.service";

@Module({
  imports: [],
  controllers: [AppController, S3Controller],
  providers: [AppService, S3Service],
})
export class AppModule {}
