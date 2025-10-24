import Link from "next/link";

const items = [
  { href:"/remesla", title:"Řemesla", sub:"Elektrikáři, instalatéři, zedníci…" },
  { href:"/uklid", title:"Úklid & domácnost", sub:"Pravidelný i jednorázový úklid" },
  { href:"/zahrada", title:"Zahrada & exteriér", sub:"Údržba, sekání, stromy" },
  { href:"/beauty", title:"Beauty & PMU", sub:"Obočí, rty, linky, kurzy" },
  { href:"/foto-video-audio", title:"Foto / Video / Audio", sub:"Fotografové, střih, zvuk" },
  { href:"/udalosti", title:"Události / Svatby", sub:"Výzdoba, koordinace, catering" },
  { href:"/hlidani", title:"Hlídání dětí & psi", sub:"Chůvy, doučování, venčení" },
  { href:"/digital", title:"Digitální služby", sub:"Weby, grafika, AI, marketing" },
];

export default function CategoryGrid(){
  return (
    <section className="container">
      <div className="tiles">
        {items.map(it=>(
          <Link key={it.href} href={it.href} className="tile">
            <b>{it.title}</b>
            <small>{it.sub}</small>
          </Link>
        ))}
      </div>
      <div style={{display:"flex", justifyContent:"flex-end"}}>
        <a href="/vytvoreni-poptavky" className="btn btn-accent">Zadat poptávku</a>
      </div>
    </section>
  );
}
