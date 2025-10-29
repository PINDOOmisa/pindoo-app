// src/components/CategoryGrid.tsx
"use client";

import Link from "next/link";
import styles from "./CategoryGrid.module.css";
import * as CatMod from "@/data/categories";

type Raw = Record<string, any>;

function extractRaw(mod: any): Raw[] {
  const cands: any[] = [];
  if (Array.isArray(mod)) cands.push(mod);
  if (Array.isArray(mod?.default)) cands.push(mod.default);
  if (Array.isArray(mod?.categories)) cands.push(mod.categories);
  if (Array.isArray(mod?.default?.categories)) cands.push(mod.default.categories);
  if (Array.isArray(mod?.data)) cands.push(mod.data);
  if (Array.isArray(mod?.default?.data)) cands.push(mod.default.data);
  return (cands.find(Array.isArray) as Raw[]) || [];
}

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

export default function CategoryGrid() {
  const raw = extractRaw(CatMod);

  if (!raw?.length) {
    return <div style={{ padding: 24 }}>Nenalezeny kategorie.</div>;
  }

  return (
    <section className={styles.gridWrap}>
      <div className={styles.grid}>
        {raw.map((c: Raw, i: number) => {
          const title =
            pick(c, ["title", "name", "label", "Title"], "Kategorie");
          const givenSlug = pick<string | undefined>(c, ["slug", "Slug"]);
          const slug = givenSlug ? slugify(givenSlug) : slugify(title);

          // Ikona z dat nebo fallback do /icons/<slug>.svg|png
          const fromData =
            pick<string | undefined>(c, ["icon", "image", "coverImage", "thumbnailUrl"]);
          const iconSvg = `/icons/${slug}.svg`;
          const iconPng = `/icons/${slug}.png`;
          const icon = fromData || iconSvg;

          return (
            <Link key={slug || i} href={`/kategorie/${slug}`} className={styles.tile} aria-label={title}>
              <span className={styles.iconSlot}>
                {/* 1) zkus datovou ikonku */}
                {fromData ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={fromData} alt="" />
                ) : (
                  // 2) fallback: zkus svg -> když nenajde, prohlížeč tiše nic nevykreslí; uživatel nic nepocítí
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={icon} onError={(e) => ((e.currentTarget.src = iconPng))} alt="" />
                )}
              </span>
              <span className={styles.title}>{title}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
