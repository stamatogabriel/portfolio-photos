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

import { CreateCategoryDTO } from './dto/create.dto';
import { UpdateCategoryDto } from './dto/update.dto';

import { CreateCategory } from '../../domain/categories/create';
import { IndexCategory } from '../../domain/categories/index';
import { FindByIdCategory } from '../../domain/categories/find_by_id';
import { UpdateByIdCategory } from '../../domain/categories/update_by_id';
import { DestroyCategory } from '../../domain/categories/delete';

// import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategory: CreateCategory,
    private readonly indexCategory: IndexCategory,
    private readonly findByIdCategory: FindByIdCategory,
    private readonly updateCategory: UpdateByIdCategory,
    private readonly destroyCategory: DestroyCategory
  ) {}

  @Post()
  public async create(@Body() category: CreateCategoryDTO) {
    return this.createCategory.create(category);
  }

  @ApiQuery({ name: 'status', type: String, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'type', type: String, required: false })
  @ApiQuery({ name: 'startDate', type: Date, required: false })
  @ApiQuery({ name: 'endDate', type: Date, required: false })
  @Get()
  public async index(@Req() req) {
    return this.indexCategory.index(req.query);
  }

  @Get(':id')
  public async findById(@Param('id') param) {
    return this.findByIdCategory.findById(param);
  }

  @Put(':id')
  public async update(@Param('id') param, @Body() category: UpdateCategoryDto) {
    return this.updateCategory.updateById(param, category);
  }

  @Delete(':id')
  public async delete(@Param('id') param) {
    return this.destroyCategory.destroy(param);
  }
}
