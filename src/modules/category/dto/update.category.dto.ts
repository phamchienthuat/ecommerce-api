import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: "parentId",
    example: null
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  parentId: number;

  @ApiProperty({
    description: "name",
    example: "Mũ",
    required: true
  })
  @IsOptional()
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
  image: string;

  @ApiProperty({
    description: "slug",
    example: "mu-doi-dau"
  })
  @IsOptional()
  @IsString()
  slug: string;
}
