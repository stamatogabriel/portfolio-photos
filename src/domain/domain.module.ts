import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/category.module';
import { MediaModule } from './medias/media.module';
import { LeadModule } from './leads/lead.module'

@Module({
  imports: [UserModule, AuthModule, CategoryModule, MediaModule, LeadModule],
  exports: [UserModule, AuthModule, CategoryModule, MediaModule, LeadModule],
})
export class DomainModule {}
