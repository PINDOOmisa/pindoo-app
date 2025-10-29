// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { csCZ } from "@clerk/localizations";

export const metadata: Metadata = {
  title: "PINDOO",
  description: "Portál pro služby",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={csCZ}>
      <html lang="cs">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
