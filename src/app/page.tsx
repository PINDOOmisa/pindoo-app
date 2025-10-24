import HeroSearch from "@/components/HeroSearch";
import CategoryGrid from "@/components/CategoryGrid";
import FeedbackPanel from "@/components/FeedbackPanel";

export default function HomePage(){
  return (
    <>
      <HeroSearch />
      <CategoryGrid />
      <FeedbackPanel />
    </>
  );
}


          <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:14}}>
            <Link href="/vytvoreni-poptavky" className="btn btn-accent">Zadat poptávku</Link>
            <Link href="/provider" className="btn btn-primary">Vložit svou nabídku</Link>
          </div>
        </div>
      </section>

      {/* Dlaždice */}
      <section style={{marginTop:22}}>
        <div className="grid-tiles">
          {tiles.map((t,i)=>(
            <Link key={i} href={t.href} className="tile" style={{textDecoration:'none',color:'inherit'}}>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* žluté CTA + feedback panel */}
      <section style={{marginTop:22, display:'flex', justifyContent:'flex-end'}}>
        <Link href="/vytvoreni-poptavky" className="btn btn-accent">Zadat poptávku</Link>
      </section>

      <section style={{marginTop:18}}>
        <img
          src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
          alt="Feedback"
          style={{width:'100%',borderRadius:'16px',border:'1px solid var(--pindo-border)'}}
        />
      </section>
    </>
  )
}
