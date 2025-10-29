// src/app/prihlaseni/page.tsx
import { SignIn } from "@clerk/nextjs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <main style={{ maxWidth: 1140, margin: "0 auto", padding: "24px 16px" }}>
      <SignIn routing="path" path="/prihlaseni" />
    </main>
  );
}
