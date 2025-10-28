// src/app/layout.tsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PINDOO",
  description: "Portál pro služby",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="cs">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
