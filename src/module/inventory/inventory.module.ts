import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from '@repositories/inventory,repository';
import { Inventory, InventorySchema } from './entities/inventory.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Inventory.name,
        schema: InventorySchema,
      },
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService, { provide: 'InventoryRepositoryInterface', useClass: InventoryRepository }],
  exports: [InventoryService],
})
export class InventoryModule {}
