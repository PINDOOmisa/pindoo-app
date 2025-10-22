import Link from 'next/link';

export default function FAQPage() {
  return (
    <main className="p-6">
      <h1>FAQ</h1>
      <p>Tady bude časté otázky a odpovědi. (Dočasný obsah)</p>
      <p><Link href="/">Zpět na úvod</Link></p>
    </main>
  );
}
