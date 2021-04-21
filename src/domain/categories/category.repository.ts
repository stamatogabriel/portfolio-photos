import { Category, CategoryIndex } from './category';
import { IQuery } from '../../common/interfaces/query';

export interface ICategoryRepository {
  IndexCategory(query: IQuery): Promise<CategoryIndex>;
  CreateCategory(createFields: Category): Promise<Category>;
  UpdateByIdCategory(
    categoryId: string,
    updateFields: Partial<Category>
  ): Promise<Category>;
  FindByIdCategory(categoryId: string): Promise<Category>;
  DestroyCategory(categoryId: string): Promise<unknown>;
}
