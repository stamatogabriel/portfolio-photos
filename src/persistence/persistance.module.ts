import { Module } from '@nestjs/common';

import { UserRepositoryModule } from './user/user_repository.module';
import { AuthRepositoryModule } from './auth/auth_repository.module';
import { CategoryRepositoryModule } from './categories/category_repository.module';
import { MediaRepositoryModule } from './medias/media_repository.module';

@Module({
  imports: [
    UserRepositoryModule,
    AuthRepositoryModule,
    CategoryRepositoryModule,
    MediaRepositoryModule,
  ],
  exports: [
    UserRepositoryModule,
    AuthRepositoryModule,
    CategoryRepositoryModule,
    MediaRepositoryModule,
  ],
})
export class PersistenceModule {}
