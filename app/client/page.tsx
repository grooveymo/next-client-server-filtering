'use client';
import ClientInvoicesList from '@/components/client-invoices-list/ClientInvoicesList';
import { Suspense } from 'react';

export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <ClientInvoicesList />
    </Suspense>
  );
}
