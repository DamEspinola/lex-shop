import type { Metadata } from "next";
import "./globals.css";
import { DmSans } from "@/config/fonts";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s - Campestre | Micro-Importados",
    default: "Campestre | Micro-Importados",
  },
  description: "Tu logística Inteligente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={DmSans.className}>{children}</body>
      </Providers>
    </html>
  );
}
