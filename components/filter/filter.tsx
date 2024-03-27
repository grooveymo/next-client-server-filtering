'use client';

import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';

const Filter = () => {
  const [filters, setFilters] = useState({
    draft: false,
    pending: false,
    paid: false,
    overdue: false,
  });
  const handleCheckedChange = (value: boolean) => {
    console.log(
      'checked => ',
      value
      // e.target?.id,
      // ' => ',
      // e.target?.checked,
      // ' => ',
    );
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="mx-8 border border-slate-100 rounded-2xl p-8 flex flex-col justify-between w-[250px]">
        <div data-testid="search">
          <label htmlFor="search">Search</label>
          <input id="search" type="text" />
        </div>
        <div data-testid="quick filter" className="mt-8 flex flex-col">
          <h2 className="text-2xl font-bold align-middle mb-4">Filter</h2>
          <div className="ml-4 flex align-middle flex-col gap-6 justify-between w-[400px]">
            <div className="flex items-center space-x-2">
              {/* onClick={handleCheckedChange} */}
              <Checkbox
                id="draft"
                name="draft"
                // onCheckedChange={(e) => console.log('>>> xxx e: ', e)}
                // onCheckedChange={handleCheckedChange}
                onClick={(e) => console.log('>>> xxx', e.currentTarget.name)}
              />
              <label
                htmlFor="draft"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Draft
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="pending" />
              <label
                htmlFor="pending"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Pending
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="paid" />
              <label
                htmlFor="paid"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Paid
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="overdue" />
              <label
                htmlFor="overdue"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Overdue
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
