import { Provider } from '@nestjs/common';
import { MediaRepository } from './media.repository';

export const MediaRepoProvider: Provider = {
  provide: 'MediaRepo',
  useClass: MediaRepository,
};
