import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <Card className="m-8">
      <CardContent className="flex justify-end">
        <div className="w-1/4 mt-4 flex justify-between">
          <Button>Client-side Filtering</Button>
          <Button variant={'secondary'}>Server-side Filtering</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Navbar;
