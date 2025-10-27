"use client";

import { useEffect, useState } from "react";

type Props = {
  slug: string;           // subcategory slug
  alt: string;
  className?: string;
  src?: string | null;    // explicitní URL z dat (volitelné)
  width?: number;
  height?: number;
};

export default function SubImage({ slug, alt, className, src, width, height }: Props) {
  const [current, setCurrent] = useState<string | null>(null);
  const [tried, setTried] = useState<"none" | "png" | "jpg" | "done">("none");

  useEffect(() => {
    if (src) {
      setCurrent(src);
      setTried("done"); // máme explicitní URL
    } else {
      setCurrent(`/img/subcategories/${slug}.png`); // 1) zkus .png
      setTried("png");
    }
  }, [slug, src]);

  const onError = () => {
    if (tried === "png") {
      setCurrent(`/img/subcategories/${slug}.jpg`); // 2) zkus .jpg
      setTried("jpg");
    } else if (tried === "jpg") {
      setCurrent(null); // 3) placeholder
      setTried("done");
    }
  };

  if (!current) {
    return <div className={className} aria-hidden="true" style={{ background: "#f1f5f9", borderRadius: 12 }} />;
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={current}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={onError}
      loading="lazy"
    />
  );
}
