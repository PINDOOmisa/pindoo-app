// src/components/FeedbackPanel.tsx

export default function FeedbackPanel() {
  return (
    <div className="mt-10 rounded-2xl bg-white border border-slate-100 p-6 flex gap-4 items-center">
      <img
        src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
        alt="PINDOO mascot"
        className="w-20 h-20 object-contain"
      />
      <div>
        <h3 className="text-base font-semibold text-slate-900">
          Chybí ti tu nějaká kategorie nebo podkategorie?
        </h3>
        <p className="text-sm text-slate-500">
          Dej mi vědět a doplním ji do PINDOO. Tvoříme to pro tebe. 💛
        </p>
      </div>
    </div>
  );
}
