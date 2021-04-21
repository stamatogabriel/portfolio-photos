import { Inject, Injectable } from '@nestjs/common';
import { Category } from './category';
import { ICategoryRepository } from './category.repository';

const CategoryRepo = () => Inject('CategoryRepo');

@Injectable()
export class FindByIdCategory {
  constructor(
    @CategoryRepo() private readonly categoryRespository: ICategoryRepository
  ) {}

  public async findById(id: string): Promise<Category> {
    return await this.categoryRespository.FindByIdCategory(id);
  }
}
