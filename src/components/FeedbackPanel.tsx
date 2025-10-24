export default function FeedbackPanel(){
  return (
    <section className="feedback">
      <div className="container">
        <div className="panel">
          <img
            src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
            alt="PINDOO feedback"
          />
          <div className="txt">
            <h3 style={{margin:"0 0 6px"}}>Chceš, aby PINDOO fungovalo přesně pro tebe?</h3>
            <p style={{margin:0, color:"var(--pindo-muted)"}}>Napiš, co ti chybí, a my to doplníme.</p>
          </div>
          <a href="/napoveda" className="btn btn-primary">Poslat zpětnou vazbu</a>
        </div>
      </div>
    </section>
  );
}
