import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Vertical Systems | AI Employees",
  description:
    "Vertical Systems in Vancouver, BC builds AI employees and multi-agent systems. Book a 30-minute call.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
