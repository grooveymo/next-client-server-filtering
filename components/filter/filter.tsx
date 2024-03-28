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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import path from 'path';

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

  const pathname = usePathname();

  // check if the url state contains filters
  const queryParams = useSearchParams().get('filters');
  console.log('[Filter] => queryParams', queryParams);

  // access the form state
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ['draft', 'pending', 'paid', 'overdue'],
      // items: queryParams
      //   ? queryParams?.split(',')
      //   : ['draft', 'pending', 'paid', 'overdue'],
      search: '',
    },
  });

  // set the form state based on the url state (consider user may hit back button - we want the filters to be in sync)
  useEffect(() => {
    console.log('[Filter] => queryParams', queryParams);
    form.reset({
      items: queryParams
        ? queryParams?.split(',')
        : ['draft', 'pending', 'paid', 'overdue'],
      search: '',
    });
  }, [queryParams, form]);

  // submit handler - updates url state based on form state
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const url = new URL(
      `/${pathname === '/client' ? 'client' : 'server'}`,
      window.location.href
    );

    if (data?.items?.length) {
      url.searchParams.append('filters', data?.items.join());
    }
    if (data?.search) {
      url.searchParams.append('search', data?.search);
    }
    router.push(url.href, undefined);
  };

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
