// middleware.ts (v kořeni projektu)
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/kategorie(.*)",
    "/napoveda(.*)",
    "/faq(.*)",
    "/prihlaseni(.*)",
    "/registrace(.*)",
  ],
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
