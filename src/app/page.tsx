import CategoryGrid from "@/components/CategoryGrid";

export default function HomePage() {
  return (
    <main>
      <section className="hero-block">
        <div className="hero-inner">
          <h1>Nechce se ti hledat? Zadej poptávku.</h1>
          <p>
            Jedno zadání → více nabídek. Oslovíme prověřené profíky ve tvém
            okolí.
          </p>
          <div className="hero-cta">
            <a className="hero-btn" href="/vytvoreni-poptavky">
              Zadat poptávku
            </a>
          </div>
        </div>
      </section>

      <CategoryGrid />
    </main>
  );
}
