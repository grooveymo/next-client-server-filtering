import { PrismaClient } from '@prisma/client';

let db = new PrismaClient();

export const dynamic = 'force-dynamic'; // defaults to auto

/**
 * Route Handler for /api/invoices
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const filters = url.searchParams.get('filters')?.split(',');
  const search = url.searchParams.get('search');
  console.log('🚀 ~ GET ~ filters:', filters);
  console.log('🚀 ~ GET ~ search:', search);

  const data = await db.invoice.findMany({
    where: {
      status: {
        in: filters,
      },
    },
  });
  //   console.log('>>> Server: data: ', data);
  return Response.json({ data });
}
