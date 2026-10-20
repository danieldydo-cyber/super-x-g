/* Ghost X G 🐲 brain: offline in-browser LLM (WebLLM/WebGPU → transformers.js/WASM), fallback Pollinations online, then rule-based offline.
   Model files are downloaded once and kept in the browser Cache API (WebLLM "webllm/*" caches, transformers.js "transformers-cache"). No keys, no secrets. */
(function(){
var G=window.GXBrain={engine:null,kind:'rules',status:'Mózg: reguły offline (pobierz model, aby mieć AI bez internetu)',onstatus:null};
var WEBLLM_MODEL='Qwen2.5-0.5B-Instruct-q4f16_1-MLC', TJS_MODEL='onnx-community/Qwen2.5-0.5B-Instruct';
var SYS='Jesteś Ghost X G 🐲, asystent DJ DaX (Daniel Dydo) z Krakowa. Odpowiadaj krótko, po polsku, konkretnie. Tematy: DJ, muzyka, hip-hop, imprezy, technika, codzienne sprawy.';
function st(s){G.status=s;if(G.onstatus)G.onstatus(s)}
G.hasWebGPU=function(){return !!navigator.gpu};
G.isDownloaded=function(){return localStorage.getItem('gx_model')||''};
G.load=async function(force){
  if(G.engine)return G.kind;
  var pref=G.isDownloaded()||(G.hasWebGPU()?'webllm':'tjs');
  if(pref==='webllm'){try{
    st('Ładuję WebLLM (WebGPU)…');var w=await import('https://esm.run/@mlc-ai/web-llm');
    G.engine=await w.CreateMLCEngine(WEBLLM_MODEL,{initProgressCallback:function(p){st('Model Qwen2.5-0.5B: '+Math.round((p.progress||0)*100)+'% '+(p.text||'').slice(0,60))}});
    G.kind='webllm';localStorage.setItem('gx_model','webllm');st('🧠 Mózg offline: Qwen2.5-0.5B (WebGPU) gotowy');return G.kind}catch(e){console.warn('webllm',e);st('WebGPU niedostępne – próbuję WASM…')}}
  try{
    var t=await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2');t.env.allowLocalModels=false;t.env.useBrowserCache=true;
    G.engine=await t.pipeline('text-generation',TJS_MODEL,{dtype:'q4',device:'wasm',progress_callback:function(p){if(p.status==='progress')st('Model Qwen2.5-0.5B: '+(p.file||'')+' '+Math.round(p.progress||0)+'%')}});
    G.kind='tjs';localStorage.setItem('gx_model','tjs');st('🧠 Mózg offline: Qwen2.5-0.5B (WASM) gotowy');return G.kind}catch(e){console.warn('tjs',e);st('Nie udało się pobrać modelu: '+String(e.message||e).slice(0,80)+' – działam online/reguły')}
  return 'rules'};
async function local(msgs){
  if(G.kind==='webllm'){var r=await G.engine.chat.completions.create({messages:msgs,max_tokens:256,temperature:0.7});return r.choices[0].message.content}
  if(G.kind==='tjs'){var o=await G.engine(msgs,{max_new_tokens:160,do_sample:false,repetition_penalty:1.1});var g=o[0].generated_text;return Array.isArray(g)?g[g.length-1].content:String(g)}
  throw 0}
async function online(msgs){
  var c=new AbortController();setTimeout(function(){c.abort()},20000);
  var r=await fetch('https://text.pollinations.ai/openai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'openai',messages:msgs}),signal:c.signal});
  if(!r.ok)throw r.status;var j=await r.json();return j.choices[0].message.content}
var RULES=[[/cze|hej|siema|witam/i,'Siema! Tu Ghost X G 🐲 – DJ DaX z Krakowa. W czym pomóc?'],[/bpm|tempo/i,'Hip-hop: 85–100 BPM, house: 120–128, techno: 128–140, DnB: 170–175. Miksuj w zakresie ±6%.'],[/mix|miks|przej/i,'Przejście: zgraj BPM, wejdź na 16 lub 32 takcie, utnij basy (EQ low) w jednym utworze i płynnie zamień.'],[/kraków|krakow/i,'Kraków 🐉 – Smok Wawelski pozdrawia! Kluby: Kazimierz, Rynek, Zabłocie.'],[/płat|kup|pełn|cena/i,'Pełna wersja: 5 zł / 1 € / 1 $ – zakładka 💎 Pełna wersja (BLIK lub przelew).'],[/godz|czas|data/i,function(){return 'Teraz: '+new Date().toLocaleString('pl-PL')}],[/pomoc|help|co umiesz/i,'Umiem: czat, autoboty (Opis imprezy, Playlista, Post FB, Plan dnia), porady DJ. Offline po pobraniu modelu.']];
function rules(q){for(var i=0;i<RULES.length;i++)if(RULES[i][0].test(q)){var a=RULES[i][1];return typeof a=='function'?a():a}return 'Jestem w trybie offline bez modelu. Pobierz 🧠 mózg AI (jednorazowo), a odpowiem na wszystko bez internetu. Zapytaj o: BPM, miks, Kraków, pomoc.'}
G.ask=async function(q,hist,opts){
  var msgs=[{role:'system',content:(opts&&opts.system)||SYS}].concat((hist||[]).slice(-6)).concat([{role:'user',content:q}]);
  var allowLocal=!opts||opts.local!==false;
  if(allowLocal&&G.engine){try{return {a:await local(msgs),src:G.kind==='webllm'?'🧠 offline Qwen':'🧠 offline Qwen'}}catch(e){}}
  if(navigator.onLine){try{return {a:await online(msgs),src:'🌐 Pollinations'}}catch(e){}}
  return {a:rules(q),src:'📘 reguły offline'}};
G.autoload=function(){if(G.isDownloaded())G.load()};
})();
