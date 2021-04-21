import { PartialType } from '@nestjs/swagger';
import { CreateMediaDTO } from './create.dto';

export class UpdateMediaDto extends PartialType(CreateMediaDTO) {}
