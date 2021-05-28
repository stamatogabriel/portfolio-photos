import { Module } from '@nestjs/common';

import { IndexLeads } from './index';
import { CreateLeads } from './create';
import { DestroyLead } from './delete';
import { FindByIdLeads } from './find_by_id';
import { UpdateByIdLead } from './update_by_id';
import { LeadRepositoryModule } from '../../persistence/leads/lead_repository.module';

@Module({
  imports: [LeadRepositoryModule],
  providers: [
    IndexLeads,
    CreateLeads,
    DestroyLead,
    FindByIdLeads,
    UpdateByIdLead,
  ],
  exports: [
    IndexLeads,
    CreateLeads,
    DestroyLead,
    FindByIdLeads,
    UpdateByIdLead,
  ],
})
export class LeadModule { }
