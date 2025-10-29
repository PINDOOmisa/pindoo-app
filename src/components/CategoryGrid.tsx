// src/components/CategoryGrid.tsx
import Link from "next/link";
import styles from "./CategoryGrid.module.css";
import * as CatMod from "@/data/categories";

type Raw = Record<string, any>;

function pick<T = string>(obj: Raw, keys: string[], fallback?: T): T {
  for (const k of keys) {
    const v = obj?.[k];
    if (typeof v === "string" && v.trim()) return v as T;
  }
  return fallback as T;
}

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCategoriesFromModule(mod: any): Raw[] {
  const candidates = [
    mod?.CATEGORIES,
    mod?.default,
    mod?.categories,
    mod?.default?.categories,
    mod?.data,
    mod?.default?.data,
    Array.isArray(mod) ? mod : undefined,
  ].filter(Boolean);

  const firstArray = candidates.find((v) => Array.isArray(v));
  return Array.isArray(firstArray) ? (firstArray as Raw[]) : [];
}

const FALLBACK: Raw[] = [
  { title: "Domácnost & úklid" },
  { title: "Řemesla & stavební práce" },
  { title: "Zahrada & exteriér" },
  { title: "Krása" },
  { title: "Zdraví & wellness" },
  { title: "Péče o děti" },
  { title: "Péče o zvířata" },
  { title: "Auto, moto & doprava" },
  { title: "Události & svatby" },
  { title: "Foto & video & audio" },
  { title: "IT & digitální tvorba" },
  { title: "Podnikání & administrativa" },
  { title: "Učení & hobby & volný čas" },
  { title: "Péče o seniory" },
];

export default function CategoryGrid() {
  const raw = getCategoriesFromModule(CatMod);
  const list = raw?.length ? raw : FALLBACK;

  return (
    <section className={styles.gridWrap}>
      <div className={styles.grid}>
        {list.map((c: Raw, i: number) => {
          const title = pick(c, ["title", "name", "label", "Title"], "Kategorie");
          const givenSlug = pick<string | undefined>(c, ["slug", "Slug"]);
          const slug = givenSlug ? slugify(givenSlug) : slugify(title);

          const fromData = pick<string | undefined>(c, [
            "icon",
            "image",
            "coverImage",
            "thumbnailUrl",
          ]);
          const iconSvg = `/icons/${slug}.svg`;

          return (
            <Link key={slug || i} href={`/kategorie/${slug}`} className={styles.tile} aria-label={title}>
              <span className={styles.iconSlot}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={fromData || iconSvg} alt="" />
              </span>
              <span className={styles.title}>{title}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
