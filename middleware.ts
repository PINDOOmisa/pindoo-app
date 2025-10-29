// middleware.ts (v kořeni projektu)
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/kategorie(.*)",
    "/faq(.*)",
    "/napoveda(.*)",
    "/prihlaseni",
    "/registrace",
  ],
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // ignoruje _next a statické soubory
};
