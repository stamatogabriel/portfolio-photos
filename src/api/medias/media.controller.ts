import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Req,
  UseInterceptors,
  UploadedFiles,
  // UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { FilesInterceptor, MulterModule } from '@nestjs/platform-express';

import { CreateMediaDTO } from './dto/create.dto';
import { UpdateMediaDto } from './dto/update.dto';

import { CreateMedia } from '../../domain/medias/create';
import { IndexMedia } from '../../domain/medias/index';
import { FindByIdMedia } from '../../domain/medias/find_by_id';
import { UpdateByIdMedia } from '../../domain/medias/update_by_id';
import { DestroyMedia } from '../../domain/medias/delete';

import { StorageTypes, FileFilter } from '../../common/configs';

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
  ) {
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: '/tmp/uploads',
      }),
    });
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      limits: {
        fileSize: 3 * 1024 * 1024,
      },
      fileFilter: FileFilter,
      storage: StorageTypes['s3'],
    })
  )
  public async create(@Body() media: CreateMediaDTO, @UploadedFiles() files) {
    if (files && files.length) {
      media = { ...media, media_url: files[0].location };
    }
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
  public async findById(@Param('id') param: string) {
    return this.findByIdMedia.findById(param);
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      limits: {
        fileSize: 3 * 1024 * 1024,
      },
      fileFilter: FileFilter,
      storage: StorageTypes['s3'],
    })
  )
  public async update(
    @Param('id') param: string,
    @Body() media: UpdateMediaDto,
    @UploadedFiles() files
  ) {
    if (files.length) {
      media = { ...media, media_url: files[0].location };
    }
    return this.updateByIdMedia.updateById(param, media);
  }

  @Delete(':id')
  public async delete(@Param('id') param: string) {
    return this.destroyMedia.destroy(param);
  }
}
