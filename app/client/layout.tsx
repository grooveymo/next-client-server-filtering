import Filter from '@/components/filter/filter';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1>Client Layout</h1>
      <main>
        <section className="border border-dashed border-green-900 w-full flex flex-row">
          <aside className="border border-dashed border-red-900 w-2/12 h-full">
            <Filter />
          </aside>
          <article className="w-10/12 h-full border border-1 border-blue-400">
            {children}
          </article>
        </section>
      </main>
    </>
  );
}
