import "./globals.css";
import Header from "@/components/Header";

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

