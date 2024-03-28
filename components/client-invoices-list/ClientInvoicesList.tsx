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
  );
  // const response = await fetch(
  //   `http://localhost:3000/api/invoices?filters=${filterForm.status}&search=${filterForm.search}`
  // );

  const data = await response.json();
  console.log('[ClientInvoicesList] => fetchInvoices => filterForm: ', filterForm);
  console.log('[ClientInvoicesList] => fetchInvoices data: ', data);
  return data;
};

const ClientInvoicesList = () => {
  const [filterForm, setFilterForm] = useState<FilterForm>({});
  const queryParams = useSearchParams().get('filters'); //?.split(',');
  const searchParams = useSearchParams().get('search');
  console.log('[ClientInvoicesList] =>  pathname:', queryParams);
  console.log('[ClientInvoicesList] =>  searchParams:', searchParams);

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

  return <InvoicesList title="Client Page" data={data?.data} />;
};

export default ClientInvoicesList;
