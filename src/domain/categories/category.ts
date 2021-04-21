export type Category = {
  _id?: string;
  name_portuguese: string;
  description_portuguese?: string;
  name_english: string;
  description_english?: string;
};

export type CategoryIndex = {
  categories: Category[];
  total_pages: number;
  current_page: number;
};
