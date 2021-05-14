import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IMediaRepository } from '../../domain/medias/media.repository';
import { Media, MediaIndex } from '../../domain/medias/media';
import { IMediaEntity } from './media.entity';
import { IQuery } from '../../common/interfaces/query';
import { diacriticSensitiveRegex } from '../../common/logicals/diatric_sensitive_regex';

@Injectable()
export class MediaRepository implements IMediaRepository {
  constructor(
    @InjectModel('Media') private readonly media: Model<IMediaEntity>
  ) {}

  public async CreateMedia(data: Media): Promise<Media> {
    try {
      return await this.media.create(data);
    } catch (error) {
      throw new HttpException(
        {
          message: `could not create media: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async IndexMedia(query: IQuery): Promise<MediaIndex> {
    try {
      const page = Number(query.page) || 1;

      const limit = Number(query.limit) || 10;

      const skip = (page - 1) * limit;

      let data = {};

      if (query.name) {
        data = {
          ...data,
          title_english: {
            $regex: diacriticSensitiveRegex(query.name),
            $options: 'i',
          },
        };
      }

      if (query.category) {
        data = {
          ...data,
          category_id: query.category,
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

      const medias = await this.media
        .find(data)
        .skip(skip)
        .limit(limit)
        .populate('category_id');

      const count = await this.media.countDocuments(data);

      return {
        medias,
        total_pages: Math.ceil(count / limit),
        current_page: page,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `could not list medias:mediaerror}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async FindByIdMedia(id: string): Promise<Media> {
    try {
      return await this.media.findById(id).populate('category_id');
    } catch (error) {
      throw new HttpException(
        {
          message: `could not find media: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async UpdateByIdMedia(
    id: string,
    data: Partial<Media>
  ): Promise<Media> {
    try {
      return await (
        await this.media.findByIdAndUpdate(id, data, { new: true })
      ).save();
    } catch (error) {
      throw new HttpException(
        {
          message: `could not update media: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async DestroyMedia(id: string): Promise<unknown> {
    try {
      await this.media.findByIdAndDelete(id);
      return { message: 'media successfully deleted.' };
    } catch (error) {
      throw new HttpException(
        {
          message: `could not delete media: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
