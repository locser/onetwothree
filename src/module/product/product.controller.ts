import { Body, Controller, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { RequestWithUser } from 'src/types/requests.type';
import { CreateNewBigProductDto } from './dto/create-new-big-product-dto';
// import { ProductService } from './product.service';
import { AuthGuardVip } from '@module/auth/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/interceptors/base-response.response';
import { ProductService } from './product.service';

@ApiTags('PRODUCT')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuardVip)
  @Post('create')
  async createNewBigProduct(@Request() req: RequestWithUser, @Body() createNewBigProductDto: CreateNewBigProductDto) {
    const data = await this.productService.createNewBigProduct(req.user._id, createNewBigProductDto);
    return new BaseResponse(HttpStatus.OK, 'success', data);
  }
}
