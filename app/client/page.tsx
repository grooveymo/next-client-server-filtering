'use client';
import InvoiceCard from '@/components/invoice-card/invoice-card';
import SummaryBar from '@/components/summary-bar/summary-bar';
import { InvoiceStatus } from '@/types/invoice-status';
import { Invoice, PrismaClient } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// let db = new PrismaClient();

const fetchInvoices = async () => {
  // const data = await db.invoice.findMany({});
  const response = await fetch('http://localhost:3000/api/invoices');

  const data = await response.json();
  console.log('>>> Client data: ', data);
  return data;
};

export default function ClientPage() {
  const [filterSet, setFilterSet] = useState([]);
  const queryParams = useSearchParams().get('filters')?.split(',');
  console.log('🚀 ~ ClientPage ~ pathname:', queryParams);

  useEffect(() => {
    console.log(`Route changed to: ${queryParams}`);
    // setFilterSet(queryParams);
  }, [queryParams]);

  // use react query to fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => await fetchInvoices(),
  });

  return (
    <div>
      <h1>Client Page</h1>
      <SummaryBar numberOfInvoices={data?.data?.length} />
      <div className="flex items-center justify-center flex-col gap-4 ">
        {data?.data?.map((invoice: Invoice) => (
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
}
