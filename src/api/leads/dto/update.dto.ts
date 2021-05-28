import { PartialType } from '@nestjs/swagger';
import { CreateLeadDTO } from './create.dto';

export class UpdateLeadDto extends PartialType(CreateLeadDTO) {}
