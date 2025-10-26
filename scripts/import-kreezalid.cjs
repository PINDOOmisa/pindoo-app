// Použití: node scripts/import-kreezalid.cjs data/kreezalid_export.csv
const fs = require("fs");
const path = require("path");

// tiny CSV parser (čárka nebo středník)
function parseCSV(str) {
  const lines = str.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return { headers: [], rows: [] };
  const sep = (lines[0].includes(";") && !lines[0].includes(",")) ? ";" : ",";
  const headers = lines[0].split(sep).map(h => h.trim());
  const rows = lines.slice(1).map(l => {
    const cols = l.split(sep).map(c => c.trim());
    const obj = {};
    headers.forEach((h, i) => (obj[h] = cols[i] ?? ""));
    return obj;
  });
  return { headers, rows };
}

function toSlug(input) {
  return input
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function main() {
  const input = process.argv[2] || "data/kreezalid_export.csv";
  const raw = fs.readFileSync(input, "utf8");
  const { rows } = parseCSV(raw);

  const cats = new Map();

  for (const r of rows) {
    const catTitle = (r.Category || "").trim();
    const catSubtitle = (r.Subtitle || "").trim();
    const subTitle = (r.Subcategory || "").trim();
    const attrLabel = (r.Attribute || "").trim();
    const typeRaw = String(r.Type || "").toLowerCase();
    const isFilter = String(r.IsFilter || "").toLowerCase() === "true";
    const optionsRaw = (r.Options || "").trim();

    if (!catTitle) continue;
    const catSlug = toSlug(catTitle);

    if (!cats.has(catSlug)) {
      cats.set(catSlug, {
        title: catTitle,
        subtitle: catSubtitle || undefined,
        slug: catSlug,
        subcategories: new Map(),
      });
    }

    if (subTitle) {
      const subSlug = toSlug(subTitle);
      const cat = cats.get(catSlug);
      if (!cat.subcategories.has(subSlug)) {
        cat.subcategories.set(subSlug, { title: subTitle, slug: subSlug, attributes: [] });
      }

      if (attrLabel) {
        const attrCode = toSlug(attrLabel);
        let type = "text";
        if (["select","multiselect","boolean","number","text"].includes(typeRaw)) type = typeRaw;

        let options;
        if (type === "select" || type === "multiselect") {
          const parts = optionsRaw ? optionsRaw.split("|").map(x => x.trim()).filter(Boolean) : [];
          options = parts.map(p => ({ value: toSlug(p), label: p }));
        }

        const sub = cat.subcategories.get(subSlug);
        if (!sub.attributes.some(a => a.code === attrCode)) {
          sub.attributes.push({ code: attrCode, label: attrLabel, type, options, isFilter });
        }
      }
    }
  }

  const outCategories = Array.from(cats.values()).map(cat => ({
    title: cat.title,
    subtitle: cat.subtitle,
    slug: cat.slug,
    subcategories: Array.from(cat.subcategories.values()),
  }));

  const outDir = path.join(process.cwd(), "src", "data");
  fs.mkdirSync(outDir, { recursive: true });

  const header =
`/* AUTO-GENERATED from Kreezalid export. Do not edit by hand. */
import type { Category } from "../types/taxonomy";

export const CATEGORIES: Category[] = `;
  const ts = header + JSON.stringify(outCategories, null, 2) + ";\n";
  fs.writeFileSync(path.join(outDir, "categories.ts"), ts, "utf8");

  console.log(`✅ Generated src/data/categories.ts with ${outCategories.length} categories.`);
}

main();
