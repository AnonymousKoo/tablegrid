import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TableGrid | The Operating Network for Food Businesses",
  description:
    "TableGrid connects demand, orders, recipes, inventory, purchasing, production, fulfillment, and economics in one operating network for food businesses.",
  applicationName: "TableGrid",
  openGraph: {
    title: "TableGrid | The Operating Network for Food Businesses",
    description:
      "Know what to make, buy, prep, and profit. TableGrid connects the food operation from demand to economics.",
    type: "website",
  },
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
