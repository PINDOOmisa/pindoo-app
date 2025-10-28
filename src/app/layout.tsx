// src/app/napoveda/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nápověda | PINDOO",
  description: "Jak PINDOO funguje a kde hledat pomoc.",
};

export default function Page() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Nápověda</h1>
      <p>Na této stránce brzy přidáme nápovědu. Zatím se můžeš přihlásit/registrovat a pokračovat v testování.</p>
    </main>
  );
}
