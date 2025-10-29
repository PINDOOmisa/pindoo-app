// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "PINDOO",
  description: "Portál pro služby",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="cs">
        <body style={{ background: "#F7F7F9", color: "#0f172a" }}>
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 40,
              background: "#fff",
              borderBottom: "1px solid #e6eaf2",
            }}
          >
            <div
              style={{
                maxWidth: 1140,
                margin: "0 auto",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <Link href="/" style={{ fontWeight: 800, fontSize: 20, textDecoration: "none" }}>
                PINDOO
              </Link>

              <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <Link href="/jak-funguje" style={{ textDecoration: "none" }}>
                  Jak to funguje?
                </Link>
                <Link href="/napoveda" style={{ textDecoration: "none" }}>
                  Centrum nápovědy
                </Link>
                <Link href="/registrace" style={{ textDecoration: "none", fontWeight: 700 }}>
                  Registrace
                </Link>
                <Link href="/prihlaseni" style={{ textDecoration: "none", fontWeight: 700 }}>
                  Přihlášení
                </Link>
              </nav>
            </div>
          </header>

          <div style={{ minHeight: "calc(100dvh - 56px)" }}>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
