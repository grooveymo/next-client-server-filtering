export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1>Client Layout</h1>
      <main>{children}</main>
    </>
  );
}
