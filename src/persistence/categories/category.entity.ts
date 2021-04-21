import { Schema, Document } from 'mongoose';

import { Category } from '../../domain/categories/category';

export const CategorySchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    name_english: { type: String, required: true, unique: true },
    description_english: { type: String, required: false },
    name_portuguese: { type: String, required: true, unique: true },
    description_portuguese: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export interface ICategoryEntity extends Omit<Category, '_id'>, Document {}
