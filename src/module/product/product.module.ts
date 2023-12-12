import { AuthModule } from '@module/auth/auth.module';
import { InventoryModule } from '@module/inventory/inventory.module';
import { KeyToken, KeyTokenSchema } from '@module/key-token/entities/key-token.model';
import { KeyTokenService } from '@module/key-token/key-token.service';
import { User, UserSchema } from '@module/user/entities/user.entity';
import { UserModule } from '@module/user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeyTokensRepository } from '@repositories/key-tokens.repository';
import { ProductRepository } from '@repositories/product.repository';
import { Clothing, ClothingProductSchema } from './entities/clothing-product.entity';
import { Decor, DecorProductSchema } from './entities/decor-product.entity';
import { Electronic, ElectronicProductSchema } from './entities/electronic-product.entity';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },

      {
        name: KeyToken.name,
        schema: KeyTokenSchema,
      },
      {
        name: Clothing.name,
        schema: ClothingProductSchema,
      },
      {
        name: Decor.name,
        schema: DecorProductSchema,
      },
      {
        name: Electronic.name,
        schema: ElectronicProductSchema,
      },
    ]),
    AuthModule,
    UserModule,
    InventoryModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    { provide: 'ProductsRepositoryInterface', useClass: ProductRepository },

    KeyTokenService,
    { provide: 'KeysRepositoryInterface', useClass: KeyTokensRepository },

    // InventoryService,
    // { provide: 'InventoryRepositoryInterface', useClass: InventoryRepository },
  ],
  // exports: [ProductService],
})
export class ProductModule {}
