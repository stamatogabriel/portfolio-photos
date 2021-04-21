import { Inject, Injectable } from '@nestjs/common';
import { Media } from './media';
import { IMediaRepository } from './media.repository';

const MediaRepo = () => Inject('MediaRepo');

@Injectable()
export class CreateMedia {
  constructor(
    @MediaRepo() private readonly mediaRespository: IMediaRepository
  ) {}

  public async create(media: Media): Promise<Media> {
    return await this.mediaRespository.CreateMedia(media);
  }
}
