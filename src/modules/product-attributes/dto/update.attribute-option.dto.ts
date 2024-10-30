import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateAttributeOptionDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  productAttributeId?: number;
  @IsOptional()
  @IsString()
  value: string;
}
