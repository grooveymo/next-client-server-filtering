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

  console.log('[RouteHandler] GET ~ filters:', filters, request.url);

  let data;
  if (filters || search) {
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
    data = await db.invoice.findMany({});
  }
  console.log('[RouteHandler]  Server: data: ', data?.length);
  return Response.json({ data });
}
