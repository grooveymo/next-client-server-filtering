export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1>Server Layout</h1>
      <main>{children}</main>
    </>
  );
}
