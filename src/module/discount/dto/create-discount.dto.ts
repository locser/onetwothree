import { ArrayUnique, IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateDiscount {
  @IsNotEmpty({ message: 'discount_name không thể bỏ trống' })
  @IsString()
  @Min(5, { message: 'discount_name ít nhất 5 kí tự' })
  code: string;

  @IsString({ message: 'Thời gian không hợp lệ' })
  start_date: string;

  @IsString({ message: 'Thời gian không hợp lệ' })
  end_date: string;

  @IsNumber({}, { message: 'discount_is_active là 0 và 1' })
  @IsEnum([0, 1], { message: 'discount_is_active là 0 và 1' })
  is_active: number;

  @IsNotEmpty({ message: 'discount_shopId không thể bỏ trống' })
  @IsString({ message: 'discount_shopId không hợp lệ' })
  shopId: string;

  @IsNumber({}, { message: 'discount_min_order_value không được để trống' })
  @Min(0)
  min_order_value: number;

  @ArrayUnique()
  product_ids: string[];

  @IsNotEmpty()
  @IsNumber()
  applies_to: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  type: string;

  @IsNotEmpty()
  users_used: string[];

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsNumber()
  @Min(0)
  max_value: number;

  @IsNumber()
  @Min(0)
  max_users: number;

  @IsNumber()
  @Min(0)
  uses_count: number;

  @IsNumber()
  @Min(0)
  max_uses_per_user: number;
}
