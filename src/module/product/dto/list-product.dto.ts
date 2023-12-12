import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ListProductDto {
  @IsNotEmpty()
  product_user: string;

  @Type(() => Number)
  @Min(1)
  limit: number;

  @Type(() => Number)
  @Min(1)
  page: number;
}
