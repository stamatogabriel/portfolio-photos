import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICategoryRepository } from '../../domain/categories/category.repository';
import { Category, CategoryIndex } from '../../domain/categories/category';
import { ICategoryEntity } from './category.entity';
import { IQuery } from '../../common/interfaces/query';
import { diacriticSensitiveRegex } from '../../common/logicals/diatric_sensitive_regex';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel('Category') private readonly category: Model<ICategoryEntity>
  ) {}

  public async CreateCategory(data: Category): Promise<Category> {
    try {
      return await this.category.create(data);
    } catch (error) {
      throw new HttpException(
        {
          message: `could not create category: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async IndexCategory(query: IQuery): Promise<CategoryIndex> {
    try {
      const page = Number(query.page) || 1;

      const limit = Number(query.limit) || 10;

      const skip = (page - 1) * limit;

      let data = {};

      if (query.name) {
        data = {
          ...data,
          name: {
            $regex: diacriticSensitiveRegex(query.name),
            $options: 'i',
          },
        };
      }

      if (query.startDate && query.endDate)
        data = {
          ...data,
          created_at: {
            $gte: query.startDate,
            $lte: query.endDate,
          },
        };

      const categories = await this.category.find(data).skip(skip).limit(limit);

      const count = await this.category.countDocuments(data);

      return {
        categories,
        total_pages: Math.ceil(count / limit),
        current_page: page,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `could not list categories: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async FindByIdCategory(id: string): Promise<Category> {
    try {
      return await this.category.findById(id);
    } catch (error) {
      throw new HttpException(
        {
          message: `could not find category: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async UpdateByIdCategory(
    id: string,
    data: Partial<Category>
  ): Promise<Category> {
    try {
      return await (
        await this.category.findByIdAndUpdate(id, data, { new: true })
      ).save();
    } catch (error) {
      throw new HttpException(
        {
          message: `could not update category: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async DestroyCategory(id: string): Promise<unknown> {
    try {
      await this.category.findByIdAndDelete(id);
      return { message: 'category successfully deleted.' };
    } catch (error) {
      throw new HttpException(
        {
          message: `could not delete category: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
