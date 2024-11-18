import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @ApiProperty({
    description: 'password',
    example: 'a@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password',
    example: 1234,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'userName',
    example: 'Nguyen Van A',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userName: string;
}

export class AuthLoginDTO {
  @ApiProperty({
    description: 'password',
    example: 'a@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password',
    example: 1234,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
