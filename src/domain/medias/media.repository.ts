import { Media, MediaIndex } from './media';
import { IQuery } from '../../common/interfaces/query';

export interface IMediaRepository {
  IndexMedia(query: IQuery): Promise<MediaIndex>;
  CreateMedia(createFields: Media): Promise<Media>;
  UpdateByIdMedia(
    mediaId: string,
    updateFields: Partial<Media>
  ): Promise<Media>;
  FindByIdMedia(mediaId: string): Promise<Media>;
  DestroyMedia(mediaId: string): Promise<unknown>;
}
