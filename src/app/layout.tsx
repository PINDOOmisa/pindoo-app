// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { csCZ } from "@clerk/localizations";
import "./globals.css";

export const metadata: Metadata = {
  title: "PINDOO",
  description: "Portál pro služby",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={csCZ}>
      <html lang="cs">
        <body>
          {/* --- Hlavní horní lišta / menu --- */}
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 50,
              background: "#fff",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <nav
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", fontWeight: 700 }}>
                <span style={{ fontSize: 20, letterSpacing: 0.5 }}>PIN<span style={{ color: "#0E3A8A" }}>DOO</span></span>
              </Link>

              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
                <Link href="/jak-funguje">Jak to funguje?</Link>
                <Link href="/napoveda">Centrum nápovědy</Link>

                <SignedOut>
                  <Link href="/registrace">Registrace</Link>
                  <Link href="/prihlaseni">Přihlášení</Link>
                </SignedOut>

                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </nav>
          </header>

          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
