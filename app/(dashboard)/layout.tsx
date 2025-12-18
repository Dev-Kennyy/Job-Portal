import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Tech Career",
  description: "Land your dream tech job",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="
          antialiased
          min-h-screen
          flex flex-col
          bg-linear-to-r
          from-[--color-bg-deep]
          via-[--color-bg-indigo]
          to-[--color-bg-deep]
        "
      >
        <Header />

        <main className="flex-1 pt-16">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
