import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateClothingProductDto {
  @IsNotEmpty({ message: 'brand clothing product không được để trống' })
  @IsString()
  @MaxLength(25, { message: 'brand clothing product không được nhiều hơn 25 kí tự' })
  @MinLength(1, { message: 'brand clothing product không được ít hơn 1 kí tự' })
  brand: string;

  @IsNotEmpty({ message: 'size clothing product không được để trống' })
  @IsString()
  @MaxLength(10, { message: 'size clothing product không được nhiều hơn 10 kí tự' })
  @MinLength(1, { message: 'size clothing product không được ít hơn 1 kí tự' })
  size: string;

  @IsNotEmpty({ message: 'material clothing product không được để trống' })
  @IsString()
  @MaxLength(25, { message: 'material clothing product không được nhiều hơn 25 kí tự' })
  @MinLength(1, { message: 'material clothing product không được ít hơn 1 kí tự' })
  material: string;

  constructor(data: CreateClothingProductDto) {
    this.brand = data?.brand || '';
    this.size = data?.size || '';
    this.material = data?.material || '';
  }
}

export class CreateDecorProductDto {
  @IsNotEmpty({ message: 'placement Decor product không được để trống' })
  @IsString({ message: 'placement Decor product phải là string' })
  @MaxLength(25, { message: 'placement Decor product không được nhiều hơn 25 kí tự' })
  @MinLength(1, { message: 'placement Decor product không được ít hơn 1 kí tự' })
  placement: string;

  @IsNotEmpty({ message: 'size Decor product không được để trống' })
  @IsString({ message: 'size Decor product phải là string' })
  @MaxLength(25, { message: 'size Decor product không được nhiều hơn 25 kí tự' })
  @MinLength(1, { message: 'size Decor product không được ít hơn 1 kí tự' })
  size: string;

  @IsNotEmpty({ message: 'material Decor product không được để trống' })
  @IsString({ message: 'material Decor product phải là string' })
  @MaxLength(25, { message: 'material Decor product không được nhiều hơn 25 kí tự' })
  @MinLength(1, { message: 'material Decor product không được ít hơn 1 kí tự' })
  material: string;

  constructor(data: CreateDecorProductDto) {
    this.placement = data?.placement || '';
    this.size = data?.size || '';
    this.material = data?.material || '';
  }
}

export class CreateElectronicProductDto {
  @IsNotEmpty({ message: 'manufacturer Electronic product không được để trống' })
  @IsString({ message: 'manufacturer Electronic product phải là string' })
  @MaxLength(25, { message: 'manufacturer Electronic product không được nhiều hơn 25 kí tự' })
  @MinLength(1, { message: 'manufacturer Electronic product không được ít hơn 1 kí tự' })
  manufacturer: string;

  @IsNotEmpty({ message: 'model Electronic product không được để trống' })
  @IsString({ message: 'model Electronic product phải là string' })
  @MaxLength(25, { message: 'model Electronic product không được nhiều hơn 25 kí tự' })
  @MinLength(1, { message: 'model Electronic product không được ít hơn 1 kí tự' })
  model: string;

  @IsNotEmpty({ message: 'color Electronic product không được để trống' })
  @IsString({ message: 'color Electronic product phải là string' })
  @MaxLength(25, { message: 'color Electronic product không được nhiều hơn 25 kí tự' })
  @MinLength(1, { message: 'color Electronic product không được ít hơn 1 kí tự' })
  color: string;

  constructor(data: CreateElectronicProductDto) {
    this.manufacturer = data?.manufacturer || '';
    this.model = data?.model || '';
    this.color = data?.color || '';
  }
}
