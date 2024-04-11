import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import ClientInvoicesList from '@/components/client-invoices-list/ClientInvoicesList';
import { Invoice } from '@prisma/client';
import getQueryClient from './getQueryClient';

export default async function PrefetchedClientPage() {
  const queryClient = new QueryClient();
  // const queryClient = getQueryClient();

  console.log('[prefetch]1a >>> Before Prefetching Data');
  console.log(
    '[prefetch]1b >>> Data in Cache : ',
    queryClient.getQueryData<{ data: Invoice[] }>(['invoices', {}])?.data
      ?.length,
    ' <<<'
  );

  await queryClient.prefetchQuery({
    // queryKey: ['invoicesXXX'],
    queryKey: ['invoices', {}],
    queryFn: async () =>
      await fetch('http://localhost:3000/api/invoices?origin=prefetchQuery', {
        cache: 'no-cache',
      }) //NOTE: disable cache otw will get more data (100) than expected (20)
        .then(async (response) => {
          const result: { data: Invoice[] } = await response.json();
          return result;
        })
        .then((json) => {
          console.log(
            '[prefetch]2 after fetch >>> output: ',
            json?.data?.length
          );
          return json;
        }),
    // staleTime: 5000, // NOTE -required to prevent client refetching data when prefetch has already happened

    // queryFn: async () =>
    //   await fetch('http://localhost:3000/api/invoices')
    //     .then((response) => response.json())
    //     .then((json) => {
    //       console.log('>>>1a output: ', json?.data?.length);
    //       return json;
    //     }),
  });

  console.log('[prefetch]3 >>> After Prefetching Data');

  console.log(
    '[prefetch]4 >>> Data in Cache : ',
    queryClient.getQueryData<{ data: Invoice[] }>(['invoices', {}])?.data
      ?.length,
    ' <<<'
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientInvoicesList />
    </HydrationBoundary>
  );
}

// const fetchInvoices = async (filterForm: FilterForm) => {
//   const queryParams = new URLSearchParams();

//   if (filterForm.status) {
//     queryParams.append('filters', filterForm.status.join(','));
//   }
//   if (filterForm.search) {
//     queryParams.append('search', filterForm.search);
//   }
//   const response = await fetch(
//     `http://localhost:3000/api/invoices?${queryParams.toString()}`
//   );
//   // const response = await fetch(
//   //   `http://localhost:3000/api/invoices?filters=${filterForm.status}&search=${filterForm.search}`
//   // );

//   const data = await response.json();
//   console.log('[ClientPage] => fetchInvoices => filterForm: ', filterForm);
//   console.log('[ClientPage] => fetchInvoices data: ', data);
//   return data;
// };

// export default function ClientPage() {
//   const [filterForm, setFilterForm] = useState<FilterForm>({});
//   const queryParams = useSearchParams().get('filters'); //?.split(',');
//   const searchParams = useSearchParams().get('search');
//   console.log('[ClientPage] =>  pathname:', queryParams);
//   console.log('[ClientPage] =>  searchParams:', searchParams);

//   useEffect(() => {
//     setFilterForm({
//       status: queryParams?.split(',') as InvoiceStatus[],
//       search: searchParams || '',
//     });
//   }, [queryParams, searchParams]);

//   // use react query to fetch data
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['invoices', filterForm],
//     queryFn: async () => await fetchInvoices(filterForm),
//   });

//   return <InvoicesList title="Client Page" data={data?.data} />;
// }
