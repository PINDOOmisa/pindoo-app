// src/components/FeedbackPanel.tsx
"use client";

export default function FeedbackPanel() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col items-center justify-center text-center gap-3">
      <img
        src="https://cdn.kreezalid.com/kreezalid/564286/files/1006523/kopie_navrhu_p_2000_x_2000_px_34.png"
        alt="Chybí kategorie?"
        className="w-24 h-24 object-contain"
      />
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-1">
          Chybí ti kategorie?
        </h3>
        <p className="text-xs text-slate-500">
          Napiš mi a přidáme ji do PINDOO.
        </p>
      </div>
      <button className="mt-1 px-4 py-1.5 bg-[#0E3A8A] text-white rounded-xl text-xs font-medium hover:bg-[#0c2f6d] transition">
        Napsat zprávu
      </button>
    </div>
  );
}
