import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly S3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.S3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async upload(file: Express.Multer.File) {
    await this.S3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_BUCKET_NAME'),
        Key: file.originalname,
        Body: file.buffer,
      })
    );
  }
}
