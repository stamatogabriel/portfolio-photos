import { Inject, Injectable } from '@nestjs/common';
import { Media } from './media';
import { IMediaRepository } from './media.repository';

const MediaRepo = () => Inject('MediaRepo');

@Injectable()
export class FindByIdMedia {
  constructor(
    @MediaRepo() private readonly mediaRespository: IMediaRepository
  ) {}

  public async findById(id: string): Promise<Media> {
    return await this.mediaRespository.FindByIdMedia(id);
  }
}
