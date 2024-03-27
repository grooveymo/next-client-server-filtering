'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

const items = [
  {
    id: 'draft',
    label: 'Draft',
  },
  {
    id: 'pending',
    label: 'Pending',
  },
  {
    id: 'paid',
    label: 'Paid',
  },
  {
    id: 'overdue',
    label: 'Overdue',
  },
] as const;

const FormSchema = z.object({
  search: z.string(),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

const Filter = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ['overdue'],
      search: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('>>> onSubmit => data: ', data);
    router.push(
      `/client?filters=${data.items.join()}&search=${data?.search}`,
      undefined
    );
  }
  return (
    <div className="flex flex-col justify-center">
      <div className="mx-8 border border-slate-100 rounded-2xl p-8 flex flex-col justify-between w-[250px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormField
                      control={form.control}
                      name="search"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Simpson" {...field} />
                          </FormControl>
                          <FormDescription>
                            Search for an invoice by name
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormLabel className="text-base">Sidebar</FormLabel>
                    <FormDescription>
                      Select the items you want to display in the sidebar.
                    </FormDescription> */}
                  </div>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Filter;
