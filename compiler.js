import { WASI } from './vendor/main.js';
// WASI execution is synchronous inside this dedicated worker. The UI can terminate it.
const BASE='https://raw.githubusercontent.com/taybenlor/runno/3c32435e7a07a59aac3f5497040c8c6317d1cff3/langs/';
let assets;
const decoder=new TextDecoder();
function file(path,content,mode='string'){return {path,content,mode,timestamps:{access:new Date(),change:new Date(),modification:new Date()}};}
async function resource(name){
  const url=BASE+name; let cache;
  try{cache=await caches.open('c-np2-compiler-v1'); const hit=await cache.match(url);if(hit)return hit.arrayBuffer();}catch{}
  const response=await fetch(url);if(!response.ok)throw Error('Não foi possível baixar o compilador ('+response.status+'). Verifique a conexão.');
  if(cache)try{await cache.put(url,response.clone());}catch{}
  return response.arrayBuffer();
}
async function load(){
  postMessage({type:'status',text:'Preparando compilador C… Na primeira vez, o download é de aproximadamente 53 MB.'});
  const [clang,linker,gzip]=await Promise.all(['clang.wasm','wasm-ld.wasm','clang-fs.tar.gz'].map(resource));
  const data=new Uint8Array(await new Response(new Blob([gzip]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());
  const fs={};
  for(let off=0;off+512<=data.length;){
    const name=decoder.decode(data.slice(off,off+100)).split('\0')[0];if(!name)break;
    const prefix=decoder.decode(data.slice(off+345,off+500)).split('\0')[0];
    const size=parseInt(decoder.decode(data.slice(off+124,off+136)).replace(/\0/g,'').trim(),8)||0;
    const type=data[off+156];const path='/'+(prefix?prefix+'/':'')+name.replace(/^\.\//,'');
    if(type===0||type===48)fs[path]=file(path,data.slice(off+512,off+512+size),'binary');
    off+=512+Math.ceil(size/512)*512;
  }
  return {clang,linker,fs};
}
async function execute(binary,args,fs,stdin=''){
  let stdout='',stderr='',used=false;
  const collect=(kind,text)=>{if(stdout.length+stderr.length>100000)throw Error('Saída muito longa. Verifique o laço.');if(kind==='out')stdout+=text;else stderr+=text;};
  const wasi=new WASI({args,env:{},fs,stdin:()=>{if(used)return null;used=true;return stdin||null;},stdout:t=>collect('out',t),stderr:t=>collect('err',t)});
  const instance=await WebAssembly.instantiate(binary,wasi.getImportObject());
  const result=wasi.start(instance);
  return {...result,stdout,stderr};
}
export async function runC(code,stdin='',inputFiles={}){
  assets=assets||await load();
  let fs=structuredClone(assets.fs);fs['/main.c']=file('/main.c',code);fs['/.runno']=file('/.runno','');
  for(const [name,content]of Object.entries(inputFiles))fs['/'+name.replace(/^\//,'')]=file('/'+name.replace(/^\//,''),content);
  postMessage({type:'status',text:'Compilando seu programa…'});
  const c=await execute(assets.clang,['clang','-cc1','-triple','wasm32-unknown-wasi','-isysroot','/sys','-internal-isystem','/sys/include','-internal-isystem','/sys/lib/clang/8.0.1/include','-std=c11','-Wall','-Wextra','-Werror=implicit-function-declaration','-ferror-limit','5','-O0','-emit-obj','-o','/program.o','/main.c'],fs);
  if(c.exitCode!==0)return {ok:false,phase:'compilação',stdout:c.stdout,stderr:c.stderr,exitCode:c.exitCode};
  const l=await execute(assets.linker,['wasm-ld','--no-threads','--export-dynamic','-z','stack-size=1048576','-L/sys/lib/wasm32-wasi','/sys/lib/wasm32-wasi/crt1.o','/program.o','-lc','-o','/program.wasm'],c.fs);
  if(l.exitCode!==0)return {ok:false,phase:'ligação',stdout:l.stdout,stderr:l.stderr,exitCode:l.exitCode};
  postMessage({type:'status',text:'Executando…'});
  const r=await execute(l.fs['/program.wasm'].content,['program'],l.fs,stdin);
  const files={};for(const [p,f]of Object.entries(r.fs)){if(!p.startsWith('/sys/')&&!['/main.c','/program.o','/program.wasm'].includes(p)){const bytes=f.mode==='binary'?f.content:new TextEncoder().encode(f.content);if(bytes.length<=200000)files[p]={text:decoder.decode(bytes),hex:Array.from(bytes.slice(0,256),b=>b.toString(16).padStart(2,'0')).join(' '),size:bytes.length};}}
  return {ok:r.exitCode===0,phase:'execução',stdout:r.stdout,stderr:c.stderr+r.stderr,exitCode:r.exitCode,files};
}
self.onmessage=async({data})=>{try{postMessage({type:'result',id:data.id,...await runC(data.code,data.stdin,data.files)});}catch(e){postMessage({type:'result',id:data.id,ok:false,phase:'ambiente',stdout:'',stderr:e.message});}};
