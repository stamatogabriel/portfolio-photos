import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MediaSchema } from './media.entity';
import { MediaRepoProvider } from './media_persistance.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Media', schema: MediaSchema }]),
  ],
  providers: [MediaRepoProvider],
  exports: [MediaRepoProvider],
})
export class MediaRepositoryModule {}
