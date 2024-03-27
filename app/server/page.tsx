import InvoiceCard from '@/components/invoice-card/invoice-card';
import SummaryBar from '@/components/summary-bar/summary-bar';
import { FilterForm } from '@/types/filter-form';
import { InvoiceStatus } from '@/types/invoice-status';
import { Invoice } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { PrismaClient } from '@prisma/client';

let db = new PrismaClient();

const fetchInvoices = async (filterForm: FilterForm) => {
  let data;
  if (filterForm.status || filterForm.search) {
    console.log('[ServerPage] => criteria', filterForm);

    data = await db.invoice.findMany({
      where: {
        status: {
          in: filterForm.status,
        },
        name: {
          contains: filterForm.search,
        },
      },
    });
  } else {
    console.log('[ServerPage] =>  no criteria');
    data = await db.invoice.findMany({});
  }

  return data;
};

export default async function ServerPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log('[ServerPage] => params:', params);
  console.log('[ServerPage] => searchParams:', searchParams);
  
  const data = await fetchInvoices({
    status: searchParams.filters
    ? ((searchParams.filters as string).split(',') as InvoiceStatus[])
    : [],
    search: searchParams.search as string,
  });
  console.log('[ServerPage] => data:', data);
  return (
    <div>
      <h1>Server Page</h1>
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
}
