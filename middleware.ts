// middleware.ts (v kořeni projektu)
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/", "/kategorie(.*)", "/prihlaseni", "/registrace", "/faq(.*)", "/napoveda(.*)"],
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

