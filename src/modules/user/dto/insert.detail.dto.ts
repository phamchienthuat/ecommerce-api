import { IsNotEmpty, IsString } from 'class-validator';

export class InsertDetailDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;
  
  @IsNotEmpty()
  @IsString()
  phone: string;
}
