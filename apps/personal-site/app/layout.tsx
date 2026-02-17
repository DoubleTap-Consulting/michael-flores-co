import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SideRailNav from "./components/side-rail-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Michael Flores",
    template: "%s | Michael Flores",
  },
  description: "Portfolio site for Michael Flores.",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="site-shell">
        <SideRailNav />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
