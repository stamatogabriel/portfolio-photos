import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor, MulterModule } from '@nestjs/platform-express';

import { CreateUserDTO } from './dto/create.dto';

import { Create } from '../../domain/user/create';
import { Index } from '../../domain/user/index';
import { FindById } from '../../domain/user/find_by_id';
import { UpdateById } from '../../domain/user/update_by_id';
import { UpdatePassById } from '../../domain/user/update_pass_by_id';
import { Destroy } from '../../domain/user/delete';

import { StorageTypes, FileFilter } from '../../common/configs';

import { UpdateUserDto } from './dto/update.dto';

import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: Create,
    private readonly indexUser: Index,
    private readonly findByIdUser: FindById,
    private readonly updateUser: UpdateById,
    private readonly updatePass: UpdatePassById,
    private readonly destroyUser: Destroy
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
  public async create(@Body() user: CreateUserDTO, @UploadedFiles() files) {
    if (files && files.length) {
      user = { ...user, avatar: files[0].location };
    }
    return this.createUser.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async index() {
    return this.indexUser.index();
  }

  @Get(':id')
  public async findById(@Param('id') param: string) {
    return this.findByIdUser.findById(param);
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
    @Body() user: UpdateUserDto,
    @UploadedFiles() files
  ) {
    if (files && files.length) {
      user = { ...user, avatar: files[0].location };
    }
    return this.updateUser.updateById(param, user);
  }

  @Put(':id/pass')
  public async updatePassword(
    @Param('id') param: string,
    @Body() user: UpdateUserDto,
    @UploadedFiles() files
  ) {
    if (files && files.length) {
      user = { ...user, avatar: files[0].location };
    }
    return this.updatePass.updatePassById(param, user);
  }

  @Delete(':id')
  public async delete(@Param('id') param: string) {
    return this.destroyUser.destroy(param);
  }
}
