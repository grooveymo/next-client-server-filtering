'use client';
import InvoiceCard from '@/components/invoice-card/invoice-card';
import SummaryBar from '@/components/summary-bar/summary-bar';
import { FilterForm } from '@/types/filter-form';
import { InvoiceStatus } from '@/types/invoice-status';
import { Invoice, PrismaClient } from '@prisma/client';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const fetchInvoices = async (filterForm: FilterForm) => {
  const queryParams = new URLSearchParams();

  if (filterForm.status) {
    queryParams.append('filters', filterForm.status.join(','));
  }
  if (filterForm.search) {
    queryParams.append('search', filterForm.search);
  }
  const response = await fetch(
    `http://localhost:3000/api/invoices?${queryParams.toString()}`
  );
  // const response = await fetch(
  //   `http://localhost:3000/api/invoices?filters=${filterForm.status}&search=${filterForm.search}`
  // );

  const data = await response.json();
  console.log('[ClientPage] => fetchInvoices => filterForm: ', filterForm);
  console.log('[ClientPage] => fetchInvoices data: ', data);
  return data;
};

export default function ClientPage() {
  const [filterForm, setFilterForm] = useState<FilterForm>({});
  const queryParams = useSearchParams().get('filters'); //?.split(',');
  const searchParams = useSearchParams().get('search');
  console.log('[ClientPage] =>  pathname:', queryParams);
  console.log('[ClientPage] =>  searchParams:', searchParams);

  useEffect(() => {
    setFilterForm({
      status: queryParams?.split(',') as InvoiceStatus[],
      search: searchParams || '',
    });
  }, [queryParams, searchParams]);

  // use react query to fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['invoices', filterForm],
    queryFn: async () => await fetchInvoices(filterForm),
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
