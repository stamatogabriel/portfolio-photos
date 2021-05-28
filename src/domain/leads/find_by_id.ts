import { Inject, Injectable } from '@nestjs/common';
import { Lead } from './lead';
import { ILeadRepository } from './lead.repository';

const LeadRepo = () => Inject('LeadRepo');

@Injectable()
export class FindByIdLeads {
  constructor(@LeadRepo() private readonly leadRespository: ILeadRepository) {}

  public async findById(leadId: string): Promise<Lead> {
    return await this.leadRespository.LeadFindById(leadId);
  }
}
