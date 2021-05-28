import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateLeadDTO {
  @IsString()
  @ApiProperty({ required: true })
  public readonly name: string;

  @IsEmail()
  @ApiProperty({ required: true })
  public readonly email: string;

  @IsString()
  @ApiProperty({ required: true })
  public readonly motive: string;

  @IsString()
  @ApiProperty({ required: true })
  public readonly message: string;
}
