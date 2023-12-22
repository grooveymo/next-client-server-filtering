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
    <div className="border border-gr rounded-md ">
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
