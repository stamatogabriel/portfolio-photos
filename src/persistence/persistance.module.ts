import { Module } from '@nestjs/common';

import { UserRepositoryModule } from './user/user_repository.module';
import { AuthRepositoryModule } from './auth/auth_repository.module';
import { CategoryRepositoryModule } from './categories/category_repository.module';
import { MediaRepositoryModule } from './medias/media_repository.module';
import { LeadRepositoryModule } from './leads/lead_repository.module'

@Module({
  imports: [
    UserRepositoryModule,
    AuthRepositoryModule,
    CategoryRepositoryModule,
    MediaRepositoryModule,
    LeadRepositoryModule
  ],
  exports: [
    UserRepositoryModule,
    AuthRepositoryModule,
    CategoryRepositoryModule,
    MediaRepositoryModule,
    LeadRepositoryModule
  ],
})
export class PersistenceModule {}
