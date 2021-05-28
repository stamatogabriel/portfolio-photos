import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { LeadSchema } from './lead.entity';
import { LeadRepoProvider } from './lead_persistance.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lead', schema: LeadSchema }]),
  ],
  providers: [LeadRepoProvider],
  exports: [LeadRepoProvider],
})
export class LeadRepositoryModule {}
