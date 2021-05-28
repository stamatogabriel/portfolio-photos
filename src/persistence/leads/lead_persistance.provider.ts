import { Provider } from '@nestjs/common';
import { LeadRepository } from './lead.repository';

export const LeadRepoProvider: Provider = {
  provide: 'LeadRepo',
  useClass: LeadRepository,
};
