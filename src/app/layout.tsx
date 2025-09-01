import Link from "next/link";
import "./globals.css";
import SearchUser from "@/components/SearchUser";

export const metadata = { title: "GitHub Explorer" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <nav className="mx-auto max-w-5xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold">
            GitHub Explorer
          </Link>
          <div className="flex items-center gap-4">
            <SearchUser />
          </div>
        </nav>
        <div className="mx-auto max-w-5xl px-6 py-3">{children}</div>
      </body>
    </html>
  );
}
