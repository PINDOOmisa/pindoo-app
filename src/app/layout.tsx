import "./globals.css";
import Header from "../components/Header";  // ⬅ místo "@/components/Header"


export const metadata = { title: "PINDOO", description: "Portál služeb" };

export default function RootLayout({ children }:{children:React.ReactNode}){
  return (
    <html lang="cs">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
// src/app/layout.tsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
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

