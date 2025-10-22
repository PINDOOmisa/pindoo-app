# PINDOO – čistý skeleton (App Router)

Tento balíček je startovní kostra vlastního webu PINDOO (Next.js). 
Je to náhrada za "okýnka" v Kreezalidu — tady máš složky a soubory:

- `src/app` – stránky (místo HTML editoru)
- `src/app/globals.css` – globální CSS (místo Theme CSS)
- Komponenty (později) – JS logika přímo v komponentách
- `public/` – obrázky, favicon, atd.

## Jak spustit

1) `npm install`
2) zkopíruj `.env.example` → `.env.local` (zatím default)
3) `npm run dev` a otevři http://localhost:3000

## Kde co vkládat (rychlé mapování Kreezalid → Next.js)

- **HTML do stránek** → `src/app/<stránka>/page.tsx`
- **CSS** → `src/app/globals.css` (globální) nebo `*.module.css` (lokální)
- **JS** → součást komponent (React), externí snippet přes `<Script>` v `src/app/layout.tsx`
- **Exporty (CSV/JSON)** → později import do DB (ne sem do kódu)
- **Obrázky** → složka `public/`

## Stránky v kostře

- `/` (domů)
- `/lead` (poptávkový formulář – placeholder)
- `/provider` (dashboard – placeholder)
- `/zpravy` (messaging – placeholder)
- `/o-nas` (statická ukázka)

Teď jen skeleton. Později napojíme DB, přihlášení, Stripe a náš v6.6 formulář.
