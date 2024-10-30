import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InsertAttributeDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    categoryId?: number;
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    type: string;
}