import { Inject, Injectable } from '@nestjs/common';
import { ICategoryRepository } from './category.repository';

const CategoryRepo = () => Inject('CategoryRepo');

@Injectable()
export class DestroyCategory {
  constructor(
    @CategoryRepo() private readonly categoryRespository: ICategoryRepository
  ) {}

  public async destroy(id: string): Promise<unknown> {
    return await this.categoryRespository.DestroyCategory(id);
  }
}
