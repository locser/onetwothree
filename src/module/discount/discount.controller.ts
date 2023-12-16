import { Body, Controller, Get, HttpStatus, Post, Query, Request, UseGuards } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { AuthGuardVip } from '@module/auth/guard/auth.guard';
import { BaseResponse } from 'src/interceptors/base-response.response';
import { RequestWithUser } from 'src/types/requests.type';
import { ApiTags } from '@nestjs/swagger';
import { CreateDiscount } from './dto/create-discount.dto';
import { ListProductDto } from '@module/product/dto/list-product.dto';

@ApiTags('DISCOUNT')
@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  // tạo discount
  @UseGuards(AuthGuardVip)
  @Post('create')
  async createNewDiscount(@Request() req: RequestWithUser, @Body() createDiscount: CreateDiscount) {
    const data = await this.discountService.createNewDiscount(req.user._id, createDiscount);
    return new BaseResponse(HttpStatus.OK, 'success', data);
  }

  // laasy các sản phẩm được áp dụng discount
  @UseGuards(AuthGuardVip)
  @Get('all-product-with-discount')
  async getProductAllWithDiscountCode(@Request() req: RequestWithUser, @Query() query: any) {
    const data = await this.discountService.getProductAllWithDiscountCode(req.user._id, query);
    return new BaseResponse(HttpStatus.OK, 'success', data);
  }

  //  lấy tất cả các discount của shop
  @UseGuards(AuthGuardVip)
  @Get('discount-shop')
  async getAllDiscountCodesByShop(@Request() req: RequestWithUser, @Query() listProductDto: ListProductDto) {
    const data = await this.discountService.getAllDiscountCodesByShop(listProductDto);
    return new BaseResponse(HttpStatus.OK, 'success', data);
  }
}
