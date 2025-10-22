import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <h1>Vítej v PINDOO (MVP kostra)</h1>
      <p>Tady stavíme kostru — jednoduché stránky, ať vidíš strukturu a můžeš klikat.</p>
      <ul>
        <li><Link href="/jak-funguje">Jak funguje PINDOO</Link></li>
        <li><Link href="/top-poskytovatel">TOP poskytovatel</Link></li>
        <li><Link href="/vytvoreni-poptavky">Vytvoření poptávky</Link></li>
        <li><Link href="/provider">Pro poskytovatele</Link></li>
        <li><Link href="/o-nas">O nás</Link></li>
        <li><Link href="/faq">FAQ</Link></li>
        <li><Link href="/zpravy">Zprávy</Link></li>
        <li><Link href="/lead">Lead</Link></li>
      </ul>
    </>
  );
}
