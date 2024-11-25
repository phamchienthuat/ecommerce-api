import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('upload')
@Controller('upload')
export class UploadController {

  @Post('/uploadImages')
  @UseInterceptors(FilesInterceptor('files', 10, { 
    limits: { fileSize: Math.pow(1024, 2) * 3 },
  }))
  async uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {
    // Log thông tin file
    console.log('Received files:', files);

    if (!files || files.length === 0) {
      return { message: 'No files received' };
    }

    const fileUrls = files.map(file => ({
      filename: file.filename,
      url: `http://localhost:${process.env.PORT}/uploads/${file.filename}`,
    }));

    return {
      files: fileUrls,
    };
  }
}
