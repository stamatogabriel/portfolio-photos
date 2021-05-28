import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

import { CreateLeadDTO } from './dto/create.dto';
import { UpdateLeadDto } from './dto/update.dto';

import { CreateLeads } from '../../domain/leads/create';
import { IndexLeads } from '../../domain/leads/index';
import { FindByIdLeads } from '../../domain/leads/find_by_id';
import { UpdateByIdLead } from '../../domain/leads/update_by_id';
import { DestroyLead } from '../../domain/leads/delete';

import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Leads')
@Controller('leads')
export class LeadController {
  constructor(
    private readonly createLead: CreateLeads,
    private readonly indexLead: IndexLeads,
    private readonly findByIdLead: FindByIdLeads,
    private readonly updateLead: UpdateByIdLead,
    private readonly destroyLead: DestroyLead
  ) {}

  @Post()
  public async create(@Body() lead: CreateLeadDTO) {
    return this.createLead.create(lead);
  }

  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'name', type: String, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'email', type: String, required: false })
  @ApiQuery({ name: 'startDate', type: Date, required: false })
  @ApiQuery({ name: 'endDate', type: Date, required: false })
  @Get()
  public async index(@Req() req) {
    return this.indexLead.index(req.query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async findById(@Param('id') param: string) {
    return this.findByIdLead.findById(param);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  public async update(@Param('id') param: string, @Body() lead: UpdateLeadDto) {
    return this.updateLead.updateById(param, lead);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') param: string) {
    return this.destroyLead.destroy(param);
  }
}
