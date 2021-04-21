import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @ApiProperty({ required: true })
  public readonly name_portuguese: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly description_portuguese: string | undefined;

  @IsString()
  @ApiProperty({ required: true })
  public readonly name_english: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly description_english: string | undefined;
}
