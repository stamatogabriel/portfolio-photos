import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';

import { ILeadRepository } from '../../domain/leads/lead.repository';
import { Lead, LeadIndex } from '../../domain/leads/lead';
import { ILeadEntity } from './lead.entity';
import { IQuery } from '../../common/interfaces/query';
import { diacriticSensitiveRegex } from '../../common/logicals/diatric_sensitive_regex';

@Injectable()
export class LeadRepository implements ILeadRepository {
  constructor(
    @InjectModel('Lead') private readonly lead: Model<ILeadEntity>,
    private readonly mailerService: MailerService,
  ) { }

  public async LeadCreate(data: Lead): Promise<Lead> {
    try {
      const lead = await this.lead.create(data);
      
      await this.mailerService.sendMail({
        to: lead.email,
        from: lead.email,
        subject: lead.motive,
        template: 'forgot_pass',
        html: `<h1>Recupere sua senha </h1>
              ${lead.name}, ${lead.email}, ${lead.message}
        `,
      });

      return lead
    } catch (error) {
      throw new HttpException(
        {
          message: `could not create lead: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async LeadIndex(query: IQuery): Promise<LeadIndex> {
    try {
      const page = Number(query.page) || 1;

      const limit = Number(query.limit) || 10;

      const skip = (page - 1) * limit;

      let data = {};

      if (query.name) {
        data = {
          ...data,
          name: {
            $regex: diacriticSensitiveRegex(query.name),
            $options: 'i',
          },
        };
      }

      if (query.email) {
        data = {
          ...data,
          email: query.email,
        };
      }

      if (query.startDate && query.endDate)
        data = {
          ...data,
          created_at: {
            $gte: query.startDate,
            $lte: query.endDate,
          },
        };

      const leads = await this.lead.find(data).skip(skip).limit(limit);

      const count = await this.lead.countDocuments(data);

      return {
        leads,
        total_pages: Math.ceil(count / limit),
        current_page: page,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `could not list leads: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async LeadFindById(id: string): Promise<Lead> {
    try {
      return await this.lead.findById(id);
    } catch (error) {
      throw new HttpException(
        {
          message: `could not find lead: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async LeadFindByEmail(email: string): Promise<Lead> {
    try {
      return await this.lead.findOne({ email });
    } catch (error) {
      throw new HttpException(
        {
          message: `could not find lead: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async LeadUpdateById(
    id: string,
    data: Partial<Lead>
  ): Promise<Lead> {
    try {
      return await (
        await this.lead.findByIdAndUpdate(id, data, { new: true })
      ).save();
    } catch (error) {
      throw new HttpException(
        {
          message: `could not update lead: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async LeadDestroy(id: string): Promise<unknown> {
    try {
      await this.lead.findByIdAndDelete(id);
      return { message: 'lead successfully deleted.' };
    } catch (error) {
      throw new HttpException(
        {
          message: `could not delete lead: ${error}`,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
