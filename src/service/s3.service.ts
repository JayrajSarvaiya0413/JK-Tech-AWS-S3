import { Injectable } from "@nestjs/common";
import * as fs from "fs-extra";
import * as path from "path";

@Injectable()
export class S3Service {
  private readonly baseDir: string = path.join(__dirname, "storage");

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage() {
    fs.ensureDirSync(this.baseDir);
  }

  getObject(bucket: string, key: string): Buffer {
    const filePath = this.getFilePath(bucket, key);
    return fs.readFileSync(filePath);
  }

  putObject(bucket: string, key: string, data: Buffer): void {
    const filePath = this.getFilePath(bucket, key);
    fs.outputFileSync(filePath, data);
  }

  deleteObject(bucket: string, key: string): void {
    const filePath = this.getFilePath(bucket, key);
    fs.removeSync(filePath);
  }

  listObjects(bucket: string): string[] {
    const bucketPath = path.join(this.baseDir, bucket);
    return fs.readdirSync(bucketPath);
  }

  listBuckets(): string[] {
    return fs
      .readdirSync(this.baseDir)
      .filter((item) =>
        fs.statSync(path.join(this.baseDir, item)).isDirectory()
      );
  }

  private getFilePath(bucket: string, key: string): string {
    const bucketPath = path.join(this.baseDir, bucket);
    fs.ensureDirSync(bucketPath);
    return path.join(bucketPath, key);
  }
}
