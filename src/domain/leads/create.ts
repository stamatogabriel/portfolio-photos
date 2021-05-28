import { Inject, Injectable } from '@nestjs/common';
import { Lead } from './lead';
import { ILeadRepository } from './lead.repository';

const LeadRepo = () => Inject('LeadRepo');

@Injectable()
export class CreateLeads {
  constructor(@LeadRepo() private readonly leadRespository: ILeadRepository) {}

  public async create(lead: Lead): Promise<Lead> {
    return await this.leadRespository.LeadCreate(lead);
  }
}
