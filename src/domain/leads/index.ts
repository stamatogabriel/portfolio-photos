import { Inject, Injectable } from '@nestjs/common';
import { LeadIndex } from './lead';
import { ILeadRepository } from './lead.repository';
import { IQuery } from '../../common/interfaces/query';

const LeadRepo = () => Inject('LeadRepo');

@Injectable()
export class IndexLeads {
  constructor(@LeadRepo() private readonly leadRespository: ILeadRepository) {}

  public async index(query: IQuery): Promise<LeadIndex> {
    return await this.leadRespository.LeadIndex(query);
  }
}
