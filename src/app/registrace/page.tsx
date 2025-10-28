import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <SignUp routing="path" path="/registrace" />
    </main>
  );
}
