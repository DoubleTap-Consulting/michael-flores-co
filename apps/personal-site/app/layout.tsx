import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michael Flores | Coming Soon",
  description:
    "A teaser for the upcoming portfolio redesign of Michael Flores."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
