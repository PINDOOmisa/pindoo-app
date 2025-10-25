import Link from "next/link";

// Ikonky si doplníš do pole níže (SVG/IMG URL). Ponechal jsem placeholder.
const items = [
  { href:"/remesla", title:"Řemesla", sub:"Elektrikáři, instalatéři, zedníci…", icon:"/icons/remesla.svg" },
  { href:"/uklid", title:"Úklid & domácnost", sub:"Pravidelný i jednorázový úklid", icon:"/icons/uklid.svg" },
  { href:"/zahrada", title:"Zahrada & exteriér", sub:"Údržba, sekání, stromy", icon:"/icons/zahrada.svg" },
  { href:"/beauty", title:"Beauty & PMU", sub:"Obočí, rty, linky, kurzy", icon:"/icons/beauty.svg" },
  { href:"/foto-video-audio", title:"Foto / Video / Audio", sub:"Fotografové, střih, zvuk", icon:"/icons/foto.svg" },
  { href:"/udalosti", title:"Události / Svatby", sub:"Výzdoba, koordinace, catering", icon:"/icons/udalosti.svg" },
  { href:"/hlidani", title:"Hlídání dětí & psi", sub:"Chůvy, doučování, venčení", icon:"/icons/hlidani.svg" },
  { href:"/digital", title:"Digitální služby", sub:"Weby, grafika, AI, marketing", icon:"/icons/digital.svg" },
];

export default function CategoryGrid(){
  return (
    <section className="kreez-grid">
      <div className="container">
        <div className="kreez-tiles">
          {items.map((it)=>(
            <Link key={it.href} href={it.href} className="kreez-tile">
              <div className="kreez-ico">
                {/* Pokud dáš IMG, měj čtverec 72–80px; nebo sem vlož přímo svoje SVG */}
                <img src={it.icon} alt="" aria-hidden="true" />
              </div>
              <div className="kreez-txt">
                <b>{it.title}</b>
                <small>{it.sub}</small>
              </div>
            </Link>
          ))}
        </div>

        <div className="kreez-more">
          <a href="/vytvoreni-poptavky" className="btn btn-accent">Zadat poptávku</a>
        </div>
      </div>
    </section>
  );
}

