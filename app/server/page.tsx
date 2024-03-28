import InvoiceCard from '@/components/invoice-card/invoice-card';
import SummaryBar from '@/components/summary-bar/summary-bar';
import { FilterForm } from '@/types/filter-form';
import { InvoiceStatus } from '@/types/invoice-status';
import { Invoice } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { PrismaClient } from '@prisma/client';
import InvoicesList from '@/components/invoices-list/InvoicesList';

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
      : ['draft', 'pending', 'paid', 'overdue'],
    search: searchParams.search as string,
  });
  console.log('[ServerPage] => data.length:', data?.length);
  return (
    <InvoicesList title='Server Page' data={data} />
  );
}
