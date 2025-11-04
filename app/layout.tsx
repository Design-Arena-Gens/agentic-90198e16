import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drug Development Research Papers",
  description: "Search and explore drug development research papers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
