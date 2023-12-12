import { AuthGuardVip } from '@module/auth/guard/auth.guard';
import { Body, Controller, Get, HttpStatus, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/interceptors/base-response.response';
import { RequestWithUser } from 'src/types/requests.type';
import { CreateNewBigProductDto } from './dto/create-new-big-product-dto';
import { ListProductDto } from './dto/list-product.dto';
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

  @Get('')
  async getAllProductPublicHomePage(@Query() listProductDto: ListProductDto) {
    const data = await this.productService.getAllProductPublicHomePage(listProductDto);
    return new BaseResponse(HttpStatus.OK, 'success', data);
  }

  @Get('public-product-detail')
  async getDetailPublicProduct(@Query('product_id') product_id: string) {
    const data = await this.productService.getDetailPublicProduct(product_id);
    return new BaseResponse(HttpStatus.OK, 'success', data);
  }

  @Get('product-detail')
  async getDetailProduct(@Request() req: RequestWithUser, @Query('product_id') product_id: string) {
    const data = await this.productService.getDetailProduct(req.user._id, product_id);
    return new BaseResponse(HttpStatus.OK, 'success', data);
  }

  @ApiOperation({ summary: 'cập nhật sản phẩm trạng thái public, khi về public thì sẽ không còn draft' })
  @UseGuards(AuthGuardVip)
  @Post('update-product-public')
  async updatePublicBigProduct(@Request() req: RequestWithUser, @Query('product_id') product_id: string) {
    const data = await this.productService.updatePublicBigProduct(req.user._id, product_id);
    return new BaseResponse(HttpStatus.OK, 'success', data);
  }

  @ApiOperation({ summary: 'cập nhật sản phẩm trạng thái public, khi về public thì sẽ không còn draft' })
  @UseGuards(AuthGuardVip)
  @Post('update-product-un-public')
  async updateUnPublicBigProduct(@Request() req: RequestWithUser, @Query('product_id') product_id: string) {
    const data = await this.productService.updateUnPublicBigProduct(req.user._id, product_id);
    return new BaseResponse(HttpStatus.OK, 'success', data);
  }

  @ApiOperation({ summary: 'cập nhật sản phẩm trạng thái draft, khi về draft thì sẽ không còn public' })
  @UseGuards(AuthGuardVip)
  @Post('update-product-draft')
  async updateDraftBigProduct(@Request() req: RequestWithUser, @Query('product_id') product_id: string) {
    const data = await this.productService.updateDraftBigProduct(req.user._id, product_id);
    return new BaseResponse(HttpStatus.OK, 'success', data);
  }

  @ApiOperation({ summary: 'Lấy danh sách các sản phẩm trạng thái draft, cần login để xem' })
  @UseGuards(AuthGuardVip)
  @Get('all-product-draft')
  async getAllProductDraftOneShop(@Query() listProductDto: ListProductDto) {
    const data = await this.productService.getAllProductDraft(listProductDto);
    return new BaseResponse(HttpStatus.OK, 'success', data);
  }

  @ApiOperation({ summary: 'Lấy danh sách các sản phẩm trạng thái unPublic, cần login để xem' })
  @UseGuards(AuthGuardVip)
  @Get('all-product-un-public')
  async getAllProductUnPublicOneShop(@Query() listProductDto: ListProductDto) {
    const data = await this.productService.getAllProductUnPublic(listProductDto);
    return new BaseResponse(HttpStatus.OK, 'success', data);
  }

  @ApiOperation({ summary: 'Lấy danh sách các sản phẩm trạng thái public, không cần login cũng xem được' })
  // @UseGuards(AuthGuardVip)
  @Get('all-product-public')
  async getAllProductPublicOneShop(@Query() listProductDto: ListProductDto) {
    const data = await this.productService.getAllProductPublic(listProductDto);
    return new BaseResponse(HttpStatus.OK, 'success', data);
  }
}
