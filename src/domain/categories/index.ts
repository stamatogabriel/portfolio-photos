import { Inject, Injectable } from '@nestjs/common';
import { CategoryIndex } from './category';
import { IQuery } from '../../common/interfaces/query';
import { ICategoryRepository } from './category.repository';

const CategoryRepo = () => Inject('CategoryRepo');

@Injectable()
export class IndexCategory {
  constructor(
    @CategoryRepo() private readonly categoryRespository: ICategoryRepository
  ) {}

  public async index(query: IQuery): Promise<CategoryIndex> {
    return await this.categoryRespository.IndexCategory(query);
  }
}
