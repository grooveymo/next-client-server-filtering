import InvoiceCard from '@/components/invoice-card/invoice-card';

export default function ClientPage() {
  return (
    <div>
      <h1>Client Page</h1>
      <InvoiceCard
        id="1"
        name="name"
        value={100}
        dueDate="2021-10-10"
        status="draft"
      />
    </div>
  );
}
