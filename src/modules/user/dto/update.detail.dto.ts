import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDetailDto {

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  addressLine?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  districtId?:number

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  communeId?:number

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  provinceId?:number
  
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isDefault?: boolean;
}
