import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {

    @Post('/uploadImage')
    
    @UseInterceptors(FileInterceptor('file', {
        limits: { fileSize: Math.pow(1024, 2) * 3 }
    }))    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async uploadImage(@UploadedFile() file) {
        const fileUrl = `http://localhost:${process.env.PORT}/uploads/${file.filename}`; 
        return {
           url: fileUrl,
        };
    }
}