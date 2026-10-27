import fs from 'node:fs';
globalThis.self=globalThis;
globalThis.postMessage=()=>{};
globalThis.fetch=async(url)=>new Response(fs.readFileSync(new URL('./compiler/'+url.split('/').pop(),import.meta.url)));
const {runC}=await import('./np2-lab/dist/compiler.js');
for(const code of ['printf("hello\\n");','int x=0;int n=scanf("%d",&x);printf("%d %d\\n",n,x);','FILE *f=fopen("/teste.txt","w");if(!f){perror("open");return 1;}fprintf(f,"7");fclose(f);printf("file ok");']){
const r=await runC('#include <stdio.h>\nint main(void){'+code+'return 0;}','4\n');console.log(JSON.stringify(r));}

