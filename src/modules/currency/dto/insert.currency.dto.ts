import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class InsertCurrencyDto{
    @ApiProperty({
        description: "name",
        example: null
    })
    @IsNotEmpty()
    @IsString()
    name: string
    @ApiProperty({
        description: "code",
        example: null
    })
    @IsNotEmpty()
    @IsString()
    code: string
    @ApiProperty({
        description: "symbol",
        example: null
    })
    @IsNotEmpty()
    @IsString()
    symbol: string
}