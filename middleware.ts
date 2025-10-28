// middleware.ts (v KOŘENI projektu)
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/kategorie(.*)", "/prihlaseni", "/registrace", "/faq(.*)", "/napoveda(.*)"],
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
