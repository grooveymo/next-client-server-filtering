import { PrismaClient } from '@prisma/client';

let db = new PrismaClient();

export const dynamic = 'force-dynamic'; // defaults to auto

/**
 * Route Handler for /api/invoices
 */
export async function GET(request: Request) {
  const data = await db.invoice.findMany({});
  console.log('>>> Server: data: ', data);
  return Response.json({ data });
}
