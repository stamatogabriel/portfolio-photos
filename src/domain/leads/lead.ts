export type Lead = {
  _id?: string;
  name: string;
  email: string;
  motive: string;
  message: string;
};

export type LeadIndex = {
  leads: Lead[];
  total_pages: number;
  current_page: number;
};
