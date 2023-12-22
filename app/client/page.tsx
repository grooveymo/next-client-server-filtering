import InvoiceCard from '@/components/invoice-card/invoice-card';

export default function ClientPage() {
  return (
    <div>
      <h1>Client Page</h1>
      <div className="flex items-center justify-center flex-col gap-4 ">
        <InvoiceCard
          id="INV001"
          name="name"
          value={100}
          dueDate="2021-10-11"
          status="draft"
        />
        <InvoiceCard
          id="IN002"
          name="name2"
          value={200}
          dueDate="2023-09-10"
          status="pending"
        />
        <InvoiceCard
          id="IN003"
          name="name3"
          value={300}
          dueDate="2023-05-24"
          status="paid"
        />
        <InvoiceCard
          id="IN004"
          name="name4"
          value={400}
          dueDate="2023-04-12"
          status="overdue"
        />
      </div>
    </div>
  );
}
