export interface IQuery {
  page: number | string;
  limit: number | string;
  status?: string;
  email?: string;
  name?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
}
