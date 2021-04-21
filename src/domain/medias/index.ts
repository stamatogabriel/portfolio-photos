import { Inject, Injectable } from '@nestjs/common';
import { MediaIndex } from './media';
import { IQuery } from '../../common/interfaces/query';
import { IMediaRepository } from './media.repository';

const MediaRepo = () => Inject('MediaRepo');

@Injectable()
export class IndexMedia {
  constructor(
    @MediaRepo() private readonly mediaRespository: IMediaRepository
  ) {}

  public async index(query: IQuery): Promise<MediaIndex> {
    return await this.mediaRespository.IndexMedia(query);
  }
}
