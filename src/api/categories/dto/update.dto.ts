import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDTO } from './create.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDTO) {}
