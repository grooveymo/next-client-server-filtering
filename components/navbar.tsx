'use client';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  console.log('🚀 ~ Navbar ~ pathname:', pathname);

  return (
    <Card className="m-8">
      <CardContent className="flex justify-end">
        <div className="w-1/4 mt-4 flex justify-between">
          <Link
            href="/client"
            className={
              pathname === '/client'
                ? 'border rounded-lg border-gray-700 p-4 bg-slate-700'
                : 'border rounded-lg border-gray-100 p-4 bg-slate-700 opacity-10'
            }
          >
            Client-side Filtering
          </Link>
          <Link
            href="/server"
            className={
              pathname === '/server'
                ? 'border rounded-lg border-gray-700 p-4 bg-slate-700'
                : 'border rounded-lg border-gray-100 p-4 bg-slate-700 opacity-10'
            }
          >
            Server-side Filtering
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Navbar;
