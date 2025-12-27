import "../globals.css";
import Header from "@/components/auth/header";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <section className="min-h-screen bg-linear-to-br from-[#020617] via-[#020617] to-[#020617] flex flex-col">
          <Header />

          <main className="flex flex-1 items-center justify-center px-4">
            {children}
          </main>
        </section>
      </body>
    </html>
  );
}
