import { Types } from 'mongoose';

export type Media = {
  _id?: string;
  category_id: Types.ObjectId | string;
  title_portuguese: string;
  description_portuguese?: string;
  title_english: string;
  description_english?: string;
  media_url: string;
};

export type MediaIndex = {
  medias: Media[];
  total_pages: number;
  current_page: number;
};
