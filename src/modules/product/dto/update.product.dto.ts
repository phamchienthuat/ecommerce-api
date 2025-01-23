import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsString, IsArray } from "class-validator";

export class UpdateProductDto{
   @ApiProperty({
        description: "name product",
        example: "San pham 1"
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        description: "mo ta name product",
        example: "mo ta name product"
    })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({
        description: "Giá từ",
        example: "300.000"
    })
    @IsOptional()
    @IsNumber()
    priceFrom:number;

    @ApiProperty({
        description: "Giá đến",
        example: "200.000"
    })
    @IsOptional()
    @IsNumber()
    priceTo:number;

    @ApiProperty({
        description: "Giá",
        example: "3300.000"
    })
    @IsOptional()
    @IsNumber()
    price:number;

    @ApiProperty({
        description: "Giá khuyến mãi",
        example: "150.000"
    })
    @IsOptional()
    @IsNumber()
    promotionPrice: number;

    @ApiProperty({
        description: "Tiền tệ",
        example: "VND"
    })
    @IsOptional()
    @IsNumber()
    currencyId: number;

    @ApiProperty({
        description: "Hình ảnh",
        example: ""
    })
    @IsOptional()
    @IsArray()
    images: Array<string>;

    @ApiProperty({
        description: "Danh mục",
        example: "Mũ"
    })
    @IsOptional()
    @IsNumber()
    categoryId: string;

    @ApiProperty({
        description: "Thuộc tính",
        example: ""
    })
    @IsOptional()
    @IsArray()
    UAttributes: Array<UAttribute>;

    @ApiProperty({
        description: "Sản phẩm biến thể",
        example: ""
    })
    @IsOptional()
    @IsArray()
    items: Array<UVariants>

    @ApiProperty({
        description: "Tag",
        example: ""
    })
    @IsOptional()
    @IsArray()
    tag: Array<number>

    @ApiProperty({
        description: "Slug",
        example: ""
    })
    @IsOptional()
    @IsString()
    slug: string
}

export interface UAttribute {
    product_item_id?: number;
    id: number;
    name: string;
    value: string;
}

export interface UVariants {
    name: string;
    price: number;
    promotionPrice: number;
    currencyId: number;
    quantity: number;
    images: Array<string>;
    attributes: Array<UAttribute>;
}