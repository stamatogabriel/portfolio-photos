import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/category.module';
import { MediaModule } from './medias/media.module';

@Module({
  imports: [UserModule, AuthModule, CategoryModule, MediaModule],
  exports: [UserModule, AuthModule, CategoryModule, MediaModule],
})
export class DomainModule {}
