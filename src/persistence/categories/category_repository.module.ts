import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategorySchema } from './category.entity';
import { CategoryRepoProvider } from './category_persistance.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  providers: [CategoryRepoProvider],
  exports: [CategoryRepoProvider],
})
export class CategoryRepositoryModule {}
