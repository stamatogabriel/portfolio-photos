import { Module } from '@nestjs/common';

import { DomainModule } from '../domain/domain.module';

import { CategoryController } from './categories/category.controller';
import { UserController } from './users/user.controller';
import { AuthController } from './auth/auth.controller';
import { MediaController } from './medias/media.controller';
import { LeadController } from './leads/leads.controller'

@Module({
  controllers: [
    AuthController,
    UserController,
    CategoryController,
    MediaController,
    LeadController,
  ],
  imports: [DomainModule],
})
export class ApiModule {}
