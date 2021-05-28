import { Inject, Injectable } from '@nestjs/common';
import { ILeadRepository } from './lead.repository';

const LeadRepo = () => Inject('LeadRepo');


@Injectable()
export class DestroyLead {
  constructor(
    @LeadRepo() private readonly mediaRespository: ILeadRepository
  ) {}

  public async destroy(id: string): Promise<unknown> {
    return await this.mediaRespository.LeadDestroy(id);
  }
}
