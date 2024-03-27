import { PrismaClient } from '@prisma/client';

let db = new PrismaClient();

export const dynamic = 'force-dynamic'; // defaults to auto

/**
 * Route Handler for /api/invoices
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const filters = url.searchParams.get('filters')?.split(',');
  const search = url.searchParams.get('search') || undefined;
  console.log('🚀 ~ GET ~ filters:', filters);
  console.log('🚀 ~ GET ~ search:', search);

  let data;
  if (filters || search) {
    console.log('🚀 ~ GET ~ has criteria', url.searchParams.get('filters'));
    data = await db.invoice.findMany({
      where: {
        status: {
          in: filters,
        },
        name: {
          contains: search,
        },
      },
    });
  } else {
    console.log('🚀 ~ GET ~ no criteria');
    data = await db.invoice.findMany({});
  }
  //   const data = await db.invoice.findMany({
  //     where: {
  //       status: {
  //         in: filters,
  //       },
  //         name: {
  //             contains: search,
  //         },
  //     },
  //   });
  //   //   console.log('>>> Server: data: ', data);
  return Response.json({ data });
}
