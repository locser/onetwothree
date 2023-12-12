import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';
import { CreateClothingProductDto, CreateDecorProductDto, CreateElectronicProductDto } from './create-product-attribute.dto';
import { PRODUCT_TYPE } from 'src/constants/product.constant';

export class CreateNewBigProductDto {
  @IsString({ message: 'product_name sản phẩm phải là một chuỗi.' })
  @MaxLength(50)
  product_name: string;

  @IsString({ message: 'product_thumb sản phẩm phải là một chuỗi.' })
  @MaxLength(50)
  product_thumb: string;

  @IsString({ message: 'product_description sản phẩm phải là một chuỗi.' })
  @MaxLength(200)
  product_description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'product_price sản phẩm cần lớn hơn 0' })
  product_price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'product_quantity sản phẩm cần lớn hơn 0' })
  product_quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Loại sản phẩm phải là số lớn hơn 0' })
  @IsEnum(PRODUCT_TYPE)
  product_type: number;

  @IsString()
  product_user: string;

  @IsNotEmpty()
  product_attributes: CreateClothingProductDto | CreateDecorProductDto | CreateElectronicProductDto;

  constructor(data: Partial<CreateNewBigProductDto>) {
    this.product_name = data?.product_name;
    this.product_thumb = data?.product_thumb;
    this.product_description = data?.product_description;
    this.product_price = data?.product_price;
    this.product_quantity = data?.product_quantity;
    this.product_type = data?.product_type;
    this.product_user = data?.product_user;
    this.product_attributes = data?.product_attributes;
  }
}
