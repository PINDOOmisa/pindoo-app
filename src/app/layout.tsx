// src/app/layout.tsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "PINDOO",
  description: "Portál pro služby",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="cs">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
