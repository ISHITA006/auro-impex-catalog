import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auro Impex Catalogue",
  description: "Private catalogue viewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
