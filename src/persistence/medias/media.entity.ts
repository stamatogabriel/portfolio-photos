import { Schema, Document, Types } from 'mongoose';

import { Media } from '../../domain/medias/media';

export const MediaSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    category_id: { type: Types.ObjectId, ref: 'Category', required: true },
    title_english: { type: String, required: true, unique: true },
    description_english: { type: String, required: false },
    title_portuguese: { type: String, required: true, unique: true },
    description_portuguese: { type: String, required: false },
    media_url: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export interface IMediaEntity extends Omit<Media, '_id'>, Document {}
