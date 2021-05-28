import { Inject, Injectable } from '@nestjs/common';
import { Lead } from './lead';
import { ILeadRepository } from './lead.repository';

const LeadRepo = () => Inject('LeadRepo');

@Injectable()
export class UpdateByIdLead {
  constructor(@LeadRepo() private readonly leadRepository: ILeadRepository) {}

  public async updateById(id: string, lead: Partial<Lead>): Promise<Lead> {
    return await this.leadRepository.LeadUpdateById(id, lead);
  }
}
