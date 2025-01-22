import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class UpdateCurrencyDto{
    @ApiProperty({
        description: "name",
        example: null
    })
    @IsOptional()
    @IsString()
    name: string
    @ApiProperty({
        description: "code",
        example: null
    })
    @IsOptional()
    @IsString()
    code: string
    @ApiProperty({
        description: "symbol",
        example: null
    })
    @IsOptional()
    @IsString()
    symbol: string
}