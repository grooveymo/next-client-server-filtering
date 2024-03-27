import Filter from '@/components/filter/filter';
import React from 'react';
import ReactQueryProvider from '../utils/providers/ReactQueryProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1>Client Layout</h1>
      <ReactQueryProvider>
        <main>
          <section className="w-full flex flex-row">
            <aside className="w-2/12 h-full">
              <section className="mt-16">
                <Filter />
              </section>
            </aside>
            <article className="w-10/12 h-full ">{children}</article>
          </section>
        </main>
      </ReactQueryProvider>
    </>
  );
}
