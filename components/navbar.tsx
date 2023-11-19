import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const Navbar = () => {
  return (
    <Card className="m-8">
      <CardContent className="flex justify-end">
        <div className="w-1/4 mt-4 flex justify-between">
          <Link href="/client">Client-side Filtering</Link>
          <Link href="/server">Server-side Filtering</Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Navbar;
