export default function ServerPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log('🚀 ~ ServerPage ~ params:', params);
  console.log('🚀 ~ ServerPage ~ searchParams:', searchParams);
  return <div>Server Page XXX</div>;
}
