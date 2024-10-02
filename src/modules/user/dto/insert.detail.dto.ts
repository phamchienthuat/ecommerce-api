import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class InsertAddressDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  addressLine: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number) // Chuyển chuỗi sang số nguyên
  districtId: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number) // Chuyển chuỗi sang số nguyên
  communeId: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number) // Chuyển chuỗi sang số nguyên
  provinceId: number;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean) // Chuyển chuỗi sang boolean nếu cần
  isDefault: boolean;
}
