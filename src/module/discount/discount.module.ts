import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountRepository } from '@repositories/discount.repository';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { Discount, DiscountSchema } from './entities/discount.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Discount.name,
        schema: DiscountSchema,
      },
    ]),
  ],
  providers: [DiscountService, { provide: 'DiscountRepositoryInterface', useClass: DiscountRepository }],
  controllers: [DiscountController],
})
export class DiscountModule {}
