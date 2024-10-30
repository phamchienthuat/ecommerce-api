import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateAttributeDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    categoryId?: number;
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    type: string;
}