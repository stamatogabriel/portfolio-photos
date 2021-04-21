import { Inject, Injectable } from '@nestjs/common';
import { Media } from './media';
import { IMediaRepository } from './media.repository';

const MediaRepo = () => Inject('MediaRepo');

@Injectable()
export class UpdateByIdMedia {
  constructor(
    @MediaRepo() private readonly mediaRespository: IMediaRepository
  ) {}

  public async updateById(id: string, media: Partial<Media>): Promise<Media> {
    return await this.mediaRespository.UpdateByIdMedia(id, media);
  }
}
