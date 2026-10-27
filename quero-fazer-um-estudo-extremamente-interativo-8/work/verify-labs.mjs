import fs from 'node:fs';
globalThis.window=globalThis;globalThis.self=globalThis;globalThis.postMessage=()=>{};
globalThis.fetch=async(url)=>new Response(fs.readFileSync(new URL('./compiler/'+url.split('/').pop(),import.meta.url)));
await import('./np2-lab/dist/labs.js');
const {runC}=await import('./np2-lab/dist/compiler.js');
const norm=s=>String(s??'').trim().replace(/\s+/g,' ');
let failures=0,total=0;
for(const b of LABS){for(const t of b.tests){total++;const r=await runC(b.solution,t.stdin+'\n',t.inputFiles||b.inputFiles||{});let ok=r.ok&&norm(r.stdout)===norm(t.out);for(const [p,v]of Object.entries(t.files||{}))ok=ok&&!!r.files?.[p]&&norm(r.files[p].text)===norm(v);if(t.exists)ok=ok&&!!r.files?.[t.exists]?.size;if(!ok){failures++;console.log(JSON.stringify({lab:b.id,input:t.stdin,expected:t.out,result:r}));}}}
console.log(JSON.stringify({total,failures}));process.exitCode=failures?1:0;
