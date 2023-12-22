'use client';
const Filter = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="mx-8 border border-slate-100 rounded-2xl p-8 flex flex-col justify-between w-[250px]">
        <div data-testid="search">
          <label htmlFor="search">Search</label>
          <input id="search" type="text" />
        </div>
        <div data-testid="quick filter" className="mt-8 flex flex-col">
          <h2 className="text-2xl font-bold align-middle mb-4">Filter</h2>
          <div className="flex align-middle flex-col gap-6 justify-between w-[400px]">
            <div>Draft</div>
            <div>Pending</div>
            <div>Paid</div>
            <div>Overdue</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
