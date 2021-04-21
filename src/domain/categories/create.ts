import { Inject, Injectable } from '@nestjs/common';
import { Category } from './category';
import { ICategoryRepository } from './category.repository';

const CategoryRepo = () => Inject('CategoryRepo');

@Injectable()
export class CreateCategory {
  constructor(
    @CategoryRepo() private readonly categoryRespository: ICategoryRepository
  ) {}

  public async create(category: Category): Promise<Category> {
    return await this.categoryRespository.CreateCategory(category);
  }
}
