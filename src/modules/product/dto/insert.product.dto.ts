import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class InsertProductDto{
    @ApiProperty({
        description: "name product",
        example: "San pham 1"
    })
    @IsNotEmpty()
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
    @IsNotEmpty()
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
    @IsNotEmpty()
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
    @IsNotEmpty()
    @IsNumber()
    categoryId: string;

    @ApiProperty({
        description: "Thuộc tính",
        example: ""
    })
    @IsOptional()
    @IsArray()
    attributes: Array<Attribute>;

    @ApiProperty({
        description: "Sản phẩm biến thể",
        example: ""
    })
    @IsOptional()
    @IsArray()
    variants: Array<any>

    @ApiProperty({
        description: "Tag",
        example: ""
    })
    @IsOptional()
    @IsArray()
    tag: Array<number>
}

export interface Attribute {
    product_item_id: number;
    attributes_option_id: number;
    name: string;
    value: string;
}

export interface Variants {
    name: string;
    price: number;
    promotionPrice: number;
    currencyId: number;
    quantity: number;
    images: Array<string>;
    attributes: Array<Attribute>;
}