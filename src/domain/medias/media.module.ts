import { Module } from '@nestjs/common';

import { IndexMedia } from './index';
import { CreateMedia } from './create';
import { DestroyMedia } from './delete';
import { FindByIdMedia } from './find_by_id';
import { UpdateByIdMedia } from './update_by_id';
import { MediaRepositoryModule } from '../../persistence/medias/media_repository.module';

@Module({
  imports: [MediaRepositoryModule],
  providers: [
    IndexMedia,
    CreateMedia,
    FindByIdMedia,
    UpdateByIdMedia,
    DestroyMedia,
  ],
  exports: [
    IndexMedia,
    CreateMedia,
    FindByIdMedia,
    UpdateByIdMedia,
    DestroyMedia,
  ],
})
export class MediaModule {}
