// Použití:
// node scripts/import-kreezalid-categories.cjs "src/data/pindo_listing_categories_2025-10-21-20-23.csv"

const fs = require("fs");
const path = require("path");

function toSlug(input) {
  return String(input || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseCSV(str) {
  const lines = str.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return { headers: [], rows: [] };

  // V tomhle exportu je oddělovač středník
  const sep = ";";
  const headers = lines[0].split(sep).map(h => h.trim());
  const rows = lines.slice(1).map(l => {
    const cols = l.split(sep).map(c => c.trim());
    const obj = {};
    headers.forEach((h, i) => (obj[h] = cols[i] ?? ""));
    return obj;
  });
  return { headers, rows };
}

function main() {
  const input = process.argv[2];
  if (!input || !fs.existsSync(input)) {
    console.error("Zadej cestu k CSV se sloupci id;parent_id;title;… (např. src/data/xxx.csv)");
    process.exit(1);
  }

  const raw = fs.readFileSync(input, "utf8");
  const { rows } = parseCSV(raw);

  // Namapujeme různé možné názvy sloupců
  const pick = (row, variants, fallback = "") => {
    for (const v of variants) if (row[v] !== undefined) return row[v];
    // case-insensitive
    const found = Object.keys(row).find(k => variants.map(x => x.toLowerCase()).includes(k.toLowerCase()));
    return found ? row[found] : fallback;
  };

  // Nejčastější hlavičky v tomto exportu:
  // id; external_id; parent_id; title; page_title; description; meta_title; meta_description; image_url…
  const mapRow = (r) => ({
    id: pick(r, ["id"]),
    parent_id: pick(r, ["parent_id", "parentId", "parent"]),
    title: pick(r, ["title", "name"]),
    subtitle: pick(r, ["page_title", "subtitle", "meta_title", "description"], ""), // co máme, to použijeme
  });

  // Index podle id
  const byId = new Map();
  const all = rows
    .map(mapRow)
    .filter(x => x.id && x.title);

  all.forEach(x => byId.set(x.id, x));

  // Děti podle parent_id
  const children = new Map();
  all.forEach(x => {
    const pid = x.parent_id || "0";
    if (!children.has(pid)) children.set(pid, []);
    children.get(pid).push(x);
  });

  // Top-level = parent_id = 0 (nebo prázdný)
  const top = all.filter(x => String(x.parent_id || "0") === "0");

  // Sestavíme náš výstupní tvar
  const outCategories = top.map(cat => {
    const sub = (children.get(cat.id) || []).map(sc => ({
      title: sc.title,
      slug: toSlug(sc.title),
      attributes: [], // doplníme později z exportu atributů
    }));

    return {
      title: cat.title,
      subtitle: cat.subtitle || undefined,
      slug: toSlug(cat.title),
      subcategories: sub,
    };
  });

  // Zapis do src/data/categories.ts
  const outDir = path.join(process.cwd(), "src", "data");
  fs.mkdirSync(outDir, { recursive: true });

  const header =
`/* AUTO-GENERATED from Kreezalid categories CSV (id/parent_id). Do not edit by hand. */
import type { Category } from "../types/taxonomy";

export const CATEGORIES: Category[] = `;
  const ts = header + JSON.stringify(outCategories, null, 2) + ";\n";
  fs.writeFileSync(path.join(outDir, "categories.ts"), ts, "utf8");

  console.log('Generated src/data/categories.ts with ' + outCategories.length + ' categories.');

}

main();
