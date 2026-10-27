import fs from 'node:fs';
globalThis.window={};
globalThis.self=globalThis;
globalThis.postMessage=()=>{};
globalThis.fetch=async(url)=>new Response(fs.readFileSync(new URL('./compiler/'+url.split('/').pop(),import.meta.url)));
await import('./np2-lab/dist/lessons.js');
const {runC}=await import('./np2-lab/dist/compiler.js');
let count=0;
for (const l of window.LESSONS) {
  if(l.sections.length<3||!l.recall.answer||!l.pitfall)throw Error(l.id+' schema');
  for(const s of l.sections){
    if(!s.code?.startsWith('#include'))continue;
    const r=await runC(s.code,l.id==='n01'?'6 8\n':'Ana\n');
    console.log(l.id,r.ok,r.exitCode,r.stdout,r.stderr);
    if(!r.ok)throw Error(l.id+' code failure');
    count++;
  }
}
console.log('PASS',window.LESSONS.length,'lessons;',count,'complete examples compiled and executed.');
