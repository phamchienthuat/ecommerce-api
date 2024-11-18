import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class InsertCategoryDto {
  @ApiProperty({
    description: "parentId",
    example: null
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number) // Chuyển chuỗi sang số nguyên
  parentId?: number;

  @ApiProperty({
    description: "name",
    example: "Mũ",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "name",
    example: "Dùng để đội lên đầu",
    required: true
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: "image",
    example: "image"
  })
  @IsOptional()
  @IsString()
  image: object;

  @ApiProperty({
    description: "slug",
    example: "mu-doi-dau"
  })
  @IsOptional()
  @IsString()
  slug: string;
}