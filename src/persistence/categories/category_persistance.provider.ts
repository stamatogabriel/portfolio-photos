import { Provider } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

export const CategoryRepoProvider: Provider = {
  provide: 'CategoryRepo',
  useClass: CategoryRepository,
};
