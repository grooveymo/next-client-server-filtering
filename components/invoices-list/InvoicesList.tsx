import { Invoice } from '@prisma/client';
import SummaryBar from '../summary-bar/summary-bar';
import InvoiceCard from '../invoice-card/invoice-card';
import { InvoiceStatus } from '@/types/invoice-status';

export interface InvoicesListProps {
  title: string;
  data: Invoice[];
}
const InvoicesList = ({ title, data }: InvoicesListProps) => {
  if (!data || data?.length === 0) {
    <div>No data available</div>;
  }

  return (
    <div>
      <h1>{title}</h1>
      <SummaryBar numberOfInvoices={data?.length} />
      <div className="flex items-center justify-center flex-col gap-4 ">
        {data?.map((invoice: Invoice) => (
          <InvoiceCard
            key={invoice.id}
            id={`INV-${invoice.id}`}
            name={invoice.name}
            value={Number(invoice.value)}
            dueDate={invoice.dueDate}
            status={invoice.status as InvoiceStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default InvoicesList;
