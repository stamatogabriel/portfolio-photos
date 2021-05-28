import { Schema, Document } from 'mongoose';

import { Lead } from '../../domain/leads/lead';

export const LeadSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    motive: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export interface ILeadEntity extends Omit<Lead, '_id'>, Document { }
