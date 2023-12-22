import { InvoiceStatus } from '@/types/invoice-status';
import Badge from '../badge/badge';

export interface InvoiceCardProps {
  id: string;
  name: string;
  value: number;
  dueDate: string;
  status: InvoiceStatus;
}
const InvoiceCard = ({
  id,
  name,
  value,
  dueDate,
  status,
}: InvoiceCardProps) => {
  return (
    <div className="border border-gray-200 rounded-md bg-gray-50 text-slate-900 flex flex-row justify-between w-[800px] h-[100px] p-10">
      <div>{id}</div>
      <div>{name}</div>
      <div>{value}</div>
      <div>{dueDate}</div>
      <div>
        <Badge status={status} />
      </div>
    </div>
  );
};

export default InvoiceCard;
