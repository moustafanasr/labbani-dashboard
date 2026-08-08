import type { Branch, BranchInput } from "@/types/branch";

const initial: Branch[] = [
  { id:"1", name:"Al Asalah Branch", code:"ASA-01", phone:"+966 55 884 2828", email:"asalah@labbani.sa", address:"Umm Al Qura Road", city:"Jeddah", latitude:21.5433, longitude:39.1728, status:"active", createdAt:"2026-01-14" },
  { id:"2", name:"Al Safa Branch", code:"SAF-02", phone:"+966 53 884 2828", email:"safa@labbani.sa", address:"Prince Mutaib Road", city:"Jeddah", latitude:21.5847, longitude:39.2134, status:"active", createdAt:"2026-02-02" },
  { id:"3", name:"Al Ferdous Branch", code:"FER-03", phone:"+966 54 210 9971", email:"ferdous@labbani.sa", address:"Al Ferdous District", city:"Jeddah", latitude:21.6261, longitude:39.1651, status:"active", createdAt:"2026-03-18" },
  { id:"4", name:"Al Rawdah Branch", code:"RAW-04", phone:"+966 55 440 1280", email:"rawdah@labbani.sa", address:"Sari Street", city:"Jeddah", latitude:21.5769, longitude:39.1442, status:"inactive", createdAt:"2026-04-07" },
  { id:"5", name:"Al Hamra Branch", code:"HAM-05", phone:"+966 56 201 4820", email:"hamra@labbani.sa", address:"Palestine Street", city:"Jeddah", latitude:21.5268, longitude:39.1654, status:"active", createdAt:"2026-05-11" },
  { id:"6", name:"Al Zahra Branch", code:"ZAH-06", phone:"+966 55 810 2020", email:"zahra@labbani.sa", address:"Hira Street", city:"Jeddah", latitude:21.6032, longitude:39.1401, status:"inactive", createdAt:"2026-06-23" }
];
let branches = [...initial];
export const db = {
  all: () => branches,
  create: (input: BranchInput) => { const b={...input,id:crypto.randomUUID(),createdAt:new Date().toISOString().slice(0,10)}; branches=[b,...branches]; return b; },
  update: (id:string,input:BranchInput) => { const old=branches.find(b=>b.id===id); if(!old) return null; const b={...old,...input}; branches=branches.map(x=>x.id===id?b:x); return b; },
  remove: (id:string) => { const exists=branches.some(b=>b.id===id); branches=branches.filter(b=>b.id!==id); return exists; }
};
