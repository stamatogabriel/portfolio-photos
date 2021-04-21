import { Inject, Injectable } from '@nestjs/common';
import { IMediaRepository } from './media.repository';

const MediaRepo = () => Inject('MediaRepo');

@Injectable()
export class DestroyMedia {
  constructor(
    @MediaRepo() private readonly mediaRespository: IMediaRepository
  ) {}

  public async destroy(id: string): Promise<unknown> {
    return await this.mediaRespository.DestroyMedia(id);
  }
}
