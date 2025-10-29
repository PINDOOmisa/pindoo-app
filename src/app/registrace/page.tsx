// src/app/registrace/page.tsx
import { SignUp } from "@clerk/nextjs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <main style={{ maxWidth: 1140, margin: "0 auto", padding: "24px 16px" }}>
      <SignUp routing="path" path="/registrace" />
    </main>
  );
}
