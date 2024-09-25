import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDetailDto {

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  address?: string;
  
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  phone?: string;
}
