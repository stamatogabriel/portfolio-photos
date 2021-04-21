import { Inject, Injectable } from '@nestjs/common';
import { Category } from './category';
import { ICategoryRepository } from './category.repository';

const CategoryRepo = () => Inject('CategoryRepo');

@Injectable()
export class UpdateByIdCategory {
  constructor(
    @CategoryRepo() private readonly categoryRespository: ICategoryRepository
  ) {}

  public async updateById(
    id: string,
    category: Partial<Category>
  ): Promise<Category> {
    return await this.categoryRespository.UpdateByIdCategory(id, category);
  }
}
