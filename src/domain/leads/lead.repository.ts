import { Lead, LeadIndex } from './lead';
import { IQuery } from '../../common/interfaces/query';

export interface ILeadRepository {
  LeadIndex(query: IQuery): Promise<LeadIndex>;
  LeadCreate(createFields: Lead): Promise<Lead>;
  LeadUpdateById(leadId: string, updateFields: Partial<Lead>): Promise<Lead>;
  LeadFindById(leadId: string): Promise<Lead>;
  LeadFindByEmail(email: string): Promise<Lead>;
  LeadDestroy(leadId: string): Promise<unknown>;
}
