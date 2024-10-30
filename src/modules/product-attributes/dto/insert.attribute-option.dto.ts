import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class InsertAttributeOptionDto {
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    productAttributeId?: number;
    @IsNotEmpty()
    @IsString()
    value: string;
}