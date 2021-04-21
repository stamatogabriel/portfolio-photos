import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Req,
  // UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

import { CreateMediaDTO } from './dto/create.dto';
import { UpdateMediaDto } from './dto/update.dto';

import { CreateMedia } from '../../domain/medias/create';
import { IndexMedia } from '../../domain/medias/index';
import { FindByIdMedia } from '../../domain/medias/find_by_id';
import { UpdateByIdMedia } from '../../domain/medias/update_by_id';
import { DestroyMedia } from '../../domain/medias/delete';

// import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Medias')
@Controller('medias')
export class MediaController {
  constructor(
    private readonly createMedia: CreateMedia,
    private readonly indexMedia: IndexMedia,
    private readonly findByIdMedia: FindByIdMedia,
    private readonly updateByIdMedia: UpdateByIdMedia,
    private readonly destroyMedia: DestroyMedia
  ) {}

  @Post()
  public async create(@Body() media: CreateMediaDTO) {
    return this.createMedia.create(media);
  }

  @ApiQuery({ name: 'status', type: String, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'type', type: String, required: false })
  @ApiQuery({ name: 'startDate', type: Date, required: false })
  @ApiQuery({ name: 'endDate', type: Date, required: false })
  @Get()
  public async index(@Req() req) {
    return this.indexMedia.index(req.query);
  }

  @Get(':id')
  public async findById(@Param('id') param) {
    return this.findByIdMedia.findById(param);
  }

  @Put(':id')
  public async update(@Param('id') param, @Body() media: UpdateMediaDto) {
    return this.updateByIdMedia.updateById(param, media);
  }

  @Delete(':id')
  public async delete(@Param('id') param) {
    return this.destroyMedia.destroy(param);
  }
}
