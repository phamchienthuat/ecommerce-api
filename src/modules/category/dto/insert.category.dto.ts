import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class InsertCategoryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number) // Chuyển chuỗi sang số nguyên
  parentId?: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsString()
  image: string;
  @IsOptional()
  @IsString()
  slug: string;
}