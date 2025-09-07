import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to upload (max 25MB, images only)',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'File uploaded successfully',
    schema: {
      type: 'object',
      required: ['message', 'filename', 'size'],
      properties: {
        message: { type: 'string', example: 'File uploaded successfully' },
        filename: { type: 'string', example: 'example.jpg' },
        size: { type: 'number', example: 1024 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid file type or size',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 25 }), // 25MB
          new FileTypeValidator({ fileType: 'image/*' }), // only images
        ],
      })
    )
    file: Express.Multer.File
  ) {
    await this.uploadService.upload(file);
    return {
      message: 'File uploaded successfully',
      filename: file.filename,
      size: file.size,
    };
  }
}
