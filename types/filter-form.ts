import { InvoiceStatus } from './invoice-status';

export interface FilterForm {
  status?: InvoiceStatus[];
  search?: string;
}
