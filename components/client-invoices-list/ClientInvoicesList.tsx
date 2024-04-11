'use client';
import InvoicesList from '@/components/invoices-list/InvoicesList';
import { FilterForm } from '@/types/filter-form';
import { InvoiceStatus } from '@/types/invoice-status';
import { useQuery } from '@tanstack/react-query';
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
    // `http://localhost:3000/api/invoices?${queryParams.toString()}&test=foo`
  );
  // const response = await fetch(
  //   `http://localhost:3000/api/invoices?filters=${filterForm.status}&search=${filterForm.search}`
  // );

  const data = await response.json();
  console.log(
    '[ClientInvoicesList]XXX => fetchInvoices => filterForm: ',
    filterForm
  );
  console.log('[ClientInvoicesList]XXX => fetchInvoices data: ', data);
  return data;
};

const ClientInvoicesList = () => {
  const [filterForm, setFilterForm] = useState<FilterForm>({
    status: undefined,
    search: '',
  });
  const queryParams = useSearchParams().get('filters'); //?.split(',');
  const searchParams = useSearchParams().get('search');

  console.log('[ClientInvoicesList]XXX =>  queryParams:', queryParams);
  useEffect(() => {
    setFilterForm({
      status: queryParams?.split(',') as InvoiceStatus[],
      search: searchParams || '',
    });
  }, [queryParams, searchParams]);

  // use react query to fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['invoices', filterForm],
    // queryKey: ['invoicesXXX'],
    queryFn: async () => await fetchInvoices(filterForm),
    staleTime: 5000, // NOTE -required to prevent client refetching data when prefetch has already happened
  });
  console.log(
    '[ClientInvoicesList]ZZZ from React Query => data:',
    data?.data?.length
  );

  return <InvoicesList title="Client Page" data={data?.data} />;
};

export default ClientInvoicesList;
