import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michael Flores | Product Engineer",
  description:
    "Portfolio and personal brand site for Michael Flores, a Product Engineer focused on full-stack systems, interaction design, and UX."
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
