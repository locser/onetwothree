import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartRepository } from '@repositories/cart.repository';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './entities/cart.model';
import { ProductModule } from '@module/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cart.name,
        schema: CartSchema,
      },
    ]),
    ProductModule,
  ],

  controllers: [CartController],
  providers: [CartService, { provide: 'CartRepositoryInterface', useClass: CartRepository }],
})
export class CartModule {}
