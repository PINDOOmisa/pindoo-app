// src/components/FeedbackPanel.tsx

export default function FeedbackPanel() {
  return (
    <div className="mt-16 mb-10 flex items-center gap-6 rounded-2xl bg-white/90 p-6 shadow-sm border border-slate-100 max-w-5xl mx-auto">
      <img
        src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
        alt="PINDOO feedback"
        className="w-28 h-28 object-contain flex-shrink-0"
      />
      <div>
        <h3 className="text-slate-900 font-semibold text-lg mb-1">
          Chybí ti tu nějaká kategorie nebo podkategorie?
        </h3>
        <p className="text-slate-500 text-sm">
          Dej mi vědět a doplním ji do PINDOO. Tvoříme to pro tebe. 💛
        </p>
      </div>
    </div>
  );
}
