import { Controller, Get, Param, Post, Body, Delete } from "@nestjs/common";
import { S3Service } from "../service/s3.service";

@Controller("s3")
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get(":bucket/:key")
  getObject(
    @Param("bucket") bucket: string,
    @Param("key") key: string
  ): Buffer {
    return this.s3Service.getObject(bucket, key);
  }

  @Post(":bucket/:key")
  putObject(
    @Param("bucket") bucket: string,
    @Param("key") key: string,
    @Body() body: Buffer
  ): void {
    this.s3Service.putObject(bucket, key, body);
  }

  @Delete(":bucket/:key")
  deleteObject(
    @Param("bucket") bucket: string,
    @Param("key") key: string
  ): void {
    this.s3Service.deleteObject(bucket, key);
  }

  @Get(":bucket")
  listObjects(@Param("bucket") bucket: string): string[] {
    return this.s3Service.listObjects(bucket);
  }

  @Get()
  listBuckets(): string[] {
    return this.s3Service.listBuckets();
  }
}
