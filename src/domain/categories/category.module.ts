import { Module } from '@nestjs/common';

import { IndexCategory } from './index';
import { CreateCategory } from './create';
import { DestroyCategory } from './delete';
import { FindByIdCategory } from './find_by_id';
import { UpdateByIdCategory } from './update_by_id';
import { CategoryRepositoryModule } from '../../persistence/categories/category_repository.module';

@Module({
  imports: [CategoryRepositoryModule],
  providers: [
    IndexCategory,
    CreateCategory,
    FindByIdCategory,
    UpdateByIdCategory,
    DestroyCategory,
  ],
  exports: [
    IndexCategory,
    CreateCategory,
    FindByIdCategory,
    UpdateByIdCategory,
    DestroyCategory,
  ],
})
export class CategoryModule {}
