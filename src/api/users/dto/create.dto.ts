import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @ApiProperty({ required: true })
  public readonly name: string | undefined;

  @IsString()
  @IsEmail()
  @ApiProperty({ required: true })
  public readonly email: string | undefined;

  @IsString()
  @ApiProperty({ required: true })
  public readonly password: string | undefined;
}
