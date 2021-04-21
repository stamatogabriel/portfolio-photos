import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMediaDTO {
  @IsString()
  @ApiProperty({ required: true })
  public readonly category_id: string;

  @IsString()
  @ApiProperty({ required: true })
  public readonly title_portuguese: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly description_portuguese: string | undefined;

  @IsString()
  @ApiProperty({ required: true })
  public readonly title_english: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly description_english: string | undefined;

  @IsString()
  @ApiProperty({ required: false })
  public readonly media_url: string;
}
