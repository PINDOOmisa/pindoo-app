"use client";
import { useState } from "react";

export default function LeadPage(){
  const [ok,setOk]=useState(false);
  function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setOk(true);
  }
  if(ok) return <div className="card"><h2>Hotovo! ✅</h2><p>Tady bude naše success karta.</p></div>;
  return (
    <form onSubmit={submit} className="card">
      <h1>Poptávka (placeholder)</h1>
      <label>Kategorie</label>
      <select><option>Úklid</option><option>Hlídání psů</option></select>
      <label>Poznámka</label>
      <textarea rows={5} placeholder="Stručně co potřebuješ..." />
      <div style={{marginTop:12}}><button type="submit">Odeslat</button></div>
    </form>
  );
}
