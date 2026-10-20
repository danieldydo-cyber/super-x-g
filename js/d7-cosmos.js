/* v66 · Super X G 🐲 cosmic start page: animated space + live MilkDrop X behind tiles, grouped categories, Kali radio bus (beat → every window),
   resolution selector, AI effects (chat + viz) through the 7-brain chain, online sync/status. Non-blocking: heavy work after first paint + idle. */
(function(){'use strict';var $=function(i){return document.getElementById(i)},LS=window.localStorage,TEST=!!window.__D7_TEST__;
function lsg(k,d){try{var v=LS.getItem(k);return v==null?d:v}catch(e){return d}}function lss(k,v){try{LS.setItem(k,v)}catch(e){}}
var css=document.createElement('style');css.textContent=
'body{background:#02010a}#cosmos,#cosmoMilk{position:fixed;inset:0;width:100vw;height:100vh;z-index:0;pointer-events:none}#cosmoMilk{opacity:0;transition:opacity 1.2s;mix-blend-mode:screen}#cosmoMilk.on{opacity:.75}'+
'body>header,body>section,#cxbar,#launch,#sgRec{position:relative;z-index:1}header{background:linear-gradient(180deg,#0a0214cc,#0a021400)!important}'+
'#cxbar{display:flex;gap:6px;flex-wrap:wrap;align-items:center;padding:4px 10px;font-size:13px}#cxbar select,#cxbar button{background:#1a0830cc;color:#fff;border:1px solid #7b2cff;border-radius:10px;padding:5px 8px;font-size:13px}'+
'#cxbar .dot{width:10px;height:10px;border-radius:50%;display:inline-block;background:#888;margin-right:4px}#cxbar .dot.ok{background:#3f6;box-shadow:0 0 8px #3f6}#cxbar .dot.off{background:#f44}'+
'#launch{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(300px,1fr))!important;gap:12px!important;padding:0 10px 20px}'+
'.cxg{background:linear-gradient(135deg,#1a0835b3,#06142bb3);border:1px solid #7b2cff88;border-radius:18px;padding:12px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);box-shadow:0 0 24px #7b2cff33}'+
'.cxg h3{margin:0 0 8px;font-size:18px;color:#ffcc00;text-shadow:0 0 12px #ff2d55}.cxg small{display:block;color:#bcd;margin:-4px 0 8px;font-size:12px}.cxg .chips{display:flex;flex-wrap:wrap;gap:6px}'+
'.cxg .tile{min-height:0!important;padding:8px 11px!important;font-size:14px!important;border-radius:12px!important;background:#2a0a4acc!important;box-shadow:none!important}.cxg .tile:hover{background:#ff2d55!important}'+
'body.d7fx-neon .card,body.d7fx-neon #lyr{text-shadow:0 0 8px #0ff,0 0 2px #fff}.d7tw{animation:d7tw .6s steps(20) both}@keyframes d7tw{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}'+
'#cxRadio.on{background:#ff2d55!important}.cxbeat{transition:transform .08s}';
document.head.appendChild(css);
/* ---------- groups (fewer top-level choices; every tile still reachable) ---------- */
var GROUPS=[['🎧 DJ & Decki','2 decki WeDJ, PRO8, DXF, klasyki',['pioneer','pro8','dxf','pioneerold','dj','gdj','gpro','proc']],
 ['🌌 Wizualizacje','MilkDrop X, X7S, v51',['milk','x7s','v51','kalic']],['📻 Radio & Muzyka','Kali radio, beaty, studio',['kali','radiogen','hiphop','studio']],
 ['🤖 Boty & AI','Bot Builder, 7 mózgów, agenci, czat',['bb','brains','agents','bots','super','mrd','dpage','sbg','g','builder','dagents']],
 ['🛠 Narzędzia','Auto-Fix 7777, aplikacje',['fix','superapp','app']],['⬇ Aplikacja & Wsparcie','APK, płatności (tylko informacje)',['dl','pay']]];
function group(){var L=$('launch');if(!L||!L.querySelector('.tile'))return setTimeout(group,50);if(L.querySelector('.cxg'))return;var used={};
 GROUPS.forEach(function(g){var c=document.createElement('div');c.className='cxg';c.innerHTML='<h3>'+g[0]+'</h3><small>'+g[1]+'</small><div class="chips"></div>';var ch=c.querySelector('.chips');
  g[2].forEach(function(id){var t=L.querySelector('.tile[data-t="'+id+'"]');if(t&&!used[id]){used[id]=1;ch.appendChild(t)}});if(ch.children.length)L.appendChild(c)});
 var rest=[].filter.call(L.querySelectorAll(':scope>.tile'),function(t){return !used[t.dataset.t]});if(rest.length){var c=document.createElement('div');c.className='cxg';c.innerHTML='<h3>✨ Inne</h3><div class="chips"></div>';rest.forEach(function(t){c.querySelector('.chips').appendChild(t)});L.appendChild(c)}}
/* ---------- control bar ---------- */
var bar=document.createElement('div');bar.id='cxbar';
bar.innerHTML='<span id="cxNet"><span class="dot"></span><span id="cxNetT">sprawdzam…</span></span>'+
 '<button id="cxRadio">📻 Kali radio</button><select id="cxSt"></select>'+
 '<label>🖥 <select id="cxRes"><option value="auto">Auto</option><option value="720">720p</option><option value="1080">1080p</option><option value="1440">1440p</option><option value="4k">4K</option></select></label>'+
 '<label>💬 AI czat <select id="cxChat"><option value="none">zwykły</option><option value="neon">neon</option><option value="type">maszyna do pisania</option><option value="voice">głos</option><option value="rhyme">AI: rymy + emoji</option><option value="pro">AI: DJ-pro</option></select></label>'+
 '<label>🌌 AI wizualizacje <select id="cxViz"><option value="ai">AI nastrój (7 mózgów)</option><option value="beat">beat-sync</option><option value="off">wył.</option></select></label>'+
 '<button id="cxFs">⛶ Pełny ekran</button><button id="cxAuto">🤖 Auto online</button>';
var STN=[['Kali · Radio 357','https://stream.radio357.pl/'],['SomaFM Fluid (hip-hop)','https://ice1.somafm.com/fluid-128-mp3'],['SomaFM Beat Blender','https://ice1.somafm.com/beatblender-128-mp3'],['SomaFM Groove Salad','https://ice1.somafm.com/groovesalad-128-mp3'],['RMF MAXXX','https://rs101-krk.rmfstream.pl/RMFMAXXX48']];
function mountBar(){var h=document.querySelector('body>header');if(!h)return setTimeout(mountBar,50);var h1=h.querySelector('h1');h.insertBefore(bar,h1?h1.nextSibling:h.firstChild);
 STN.forEach(function(s,i){var o=document.createElement('option');o.value=i;o.textContent=s[0];$('cxSt').appendChild(o)});$('cxSt').value=lsg('d7radioSt','0');
 $('cxRes').value=lsg('d7res','auto');$('cxRes').onchange=function(){window.D7Res&&D7Res.set(this.value);startMilk(true)};
 $('cxChat').value=lsg('d7chatfx','none');$('cxChat').onchange=function(){lss('d7chatfx',this.value);chatFx()};chatFx();
 $('cxViz').value=lsg('d7vizfx','ai');$('cxViz').onchange=function(){lss('d7vizfx',this.value)};
 $('cxFs').onclick=function(){window.D7FS&&D7FS.toggle(document.documentElement)};
 $('cxRadio').onclick=function(){radio(!R.on)};$('cxSt').onchange=function(){lss('d7radioSt',this.value);if(R.on){radio(false);radio(true)}};
 $('cxAuto').onclick=function(){autoOnline(!AUTO)}}
/* ---------- cosmic background (2D stars + nebula, ≤30 fps, paused when a window is open or tab hidden) ---------- */
var cv=document.createElement('canvas');cv.id='cosmos';var mk=document.createElement('canvas');mk.id='cosmoMilk';
document.body.insertBefore(mk,document.body.firstChild);document.body.insertBefore(cv,document.body.firstChild);
var g=cv.getContext('2d'),stars=[],lastF=0,W=0,H=0;
function size(){var dpr=Math.min(devicePixelRatio||1,1.5),c=window.D7Res?D7Res.fit(innerWidth*dpr,innerHeight*dpr):[innerWidth,innerHeight];W=cv.width=Math.min(c[0],1280);H=cv.height=Math.round(W*innerHeight/Math.max(1,innerWidth));stars=[];for(var i=0;i<260;i++)stars.push([Math.random()*W,Math.random()*H,Math.random()*1.6+.2,Math.random()])}
size();addEventListener('resize',function(){size();if(MV)sizeMilk()});
function sky(t){requestAnimationFrame(sky);if(document.hidden||document.body.classList.contains('ovon')||t-lastF<33)return;lastF=t;var b=beatLvl;
 var gr=g.createRadialGradient(W*.5,H*.4,10,W*.5,H*.5,Math.max(W,H)*.75);gr.addColorStop(0,'hsl('+(260+40*Math.sin(t/9000))+',70%,'+(14+b*14)+'%)');gr.addColorStop(.55,'#090320');gr.addColorStop(1,'#010006');g.fillStyle=gr;g.fillRect(0,0,W,H);
 for(var i=0;i<stars.length;i++){var s=stars[i];s[0]-=s[2]*(.15+b*1.2);if(s[0]<0){s[0]=W;s[1]=Math.random()*H}g.fillStyle='rgba(255,255,255,'+(.35+.65*Math.abs(Math.sin(t/700+s[3]*9)))+')';g.fillRect(s[0],s[1],s[2],s[2])}}
requestAnimationFrame(sky);
/* ---------- audio bus: Kali radio in the launcher → beat analyser → MilkDrop X + d7:beat to the open window ---------- */
var R={on:false,el:null},beatLvl=0,avg=0,lastBeat=0,fb=null,lastPost=0;
function A(){return window.HIPHOPX&&HIPHOPX.audio()}
function radio(on){var a=A();if(!a)return;R.on=on;$('cxRadio').classList.toggle('on',on);if(!on){if(R.el){R.el.pause();R.el.src=''}return}
 a.ctx.resume&&a.ctx.resume();var s=STN[+$('cxSt').value||0];if(!R.el){R.el=new Audio();R.el.crossOrigin='anonymous';try{a.ctx.createMediaElementSource(R.el).connect(a.node)}catch(e){}}
 R.el.onerror=function(){var st=$('cxSt');if(R.on&&!R.hop&&R.el.error&&R.el.error.code==4){R.hop=1;st.value=(+st.value+1)%STN.length;R.el.src=STN[+st.value][1];R.el.play().catch(function(){});return}if(R.el.crossOrigin&&!R.retry){R.retry=1;/* stream without CORS: play directly (no beat sync) */var e2=new Audio(s[1]);R.el.src='';R.el=e2;e2.play().catch(function(){});$('cxRadio').textContent='📻 '+s[0].split('·').pop().trim()+' (bez sync)'}};R.retry=0;R.hop=0;R.el.src=s[1];R.el.play().then(function(){$('cxRadio').textContent='📻 '+s[0].split('·').pop().trim()},function(e){$('cxRadio').textContent='📻 błąd: '+e.name;R.on=false;$('cxRadio').classList.remove('on')});startMilk()}
window.D7Radio={on:function(){radio(true)},off:function(){radio(false)},state:function(){return{on:R.on,st:+$('cxSt').value,level:beatLvl}}};
setInterval(function(){if(!R.on&&!MV)return;var a=A();if(!a||a.ctx.state!='running')return;var n=a.node;if(!fb||fb.length!=n.frequencyBinCount)fb=new Uint8Array(n.frequencyBinCount);n.getByteFrequencyData(fb);
 var e=0;for(var i=1;i<8;i++)e+=fb[i];e/=7*255;avg=avg*.92+e*.08;var now=Date.now(),beat=e>avg*1.06&&e-(R.pe||0)>.02&&e>.15&&now-lastBeat>280;R.pe=e;if(beat)lastBeat=now;beatLvl=Math.max(e,beatLvl*.85);
 if(now-lastPost>60||beat){lastPost=now;var f=document.querySelector('#hxbody>iframe');if(f)try{f.contentWindow.postMessage({type:'d7:beat',level:+e.toFixed(3),beat:beat},'*')}catch(x){}}
 if(beat&&MV&&lsg('d7vizfx','ai')!='off'&&Math.random()<.04)nextPreset()},50);
/* ---------- MilkDrop X behind tiles (lazy libs, low res, idle start) ---------- */
var MV=null,MKeys=[],MP={},mlast=0,mStarting=false;
function load(src){return new Promise(function(ok,no){var s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
function sizeMilk(){var c=window.D7Res?D7Res.fit(innerWidth,innerHeight):[innerWidth,innerHeight],w=Math.min(c[0],D7Res&&D7Res.key()=='auto'?960:c[0]),h=Math.round(w*innerHeight/Math.max(1,innerWidth));mk.width=w;mk.height=h;if(MV)try{MV.setRendererSize(w,h)}catch(e){}}
function nextPreset(match){if(!MV||!MKeys.length)return;var pool=MKeys;if(match){var re=new RegExp(match,'i'),m=MKeys.filter(function(k){return re.test(k)});if(m.length)pool=m}var k=pool[Math.floor(Math.random()*pool.length)];try{MV.loadPreset(MP[k],2.5)}catch(e){}window.D7MilkPreset=k}
function startMilk(resize){if(MV){if(resize)sizeMilk();return}if(mStarting)return;mStarting=true;var a=A();if(!a)return;
 (window.butterchurn?Promise.resolve():load('libs/butterchurn.min.js').then(function(){return load('libs/butterchurnPresets.min.js')})).then(function(){return new Promise(function(r){(window.requestIdleCallback||setTimeout)(r,{timeout:2000})})}).then(function wait(){ /* never compile MilkDrop while a window is open (keeps every window smooth) */ if(document.body.classList.contains('ovon'))return new Promise(function(r){setTimeout(r,1500)}).then(wait);
  }).then(function(){
  var bc=window.butterchurn.default||window.butterchurn;sizeMilk();MV=bc.createVisualizer(a.ctx,mk,{width:mk.width,height:mk.height,pixelRatio:1,textureRatio:1});MV.connectAudio(a.node);
  var pp=window.butterchurnPresets;pp=pp&&(pp.getPresets?pp:pp.default);MP=pp.getPresets();MKeys=Object.keys(MP);nextPreset('geiss|flexi|martin');mk.classList.add('on');
  (function loop(t){requestAnimationFrame(loop);if(document.hidden||document.body.classList.contains('ovon')||t-mlast<33)return;mlast=t;try{MV.render()}catch(e){}})(0);
  setInterval(function(){if(!document.body.classList.contains('ovon')&&lsg('d7vizfx','ai')!='off')nextPreset()},25000)}).catch(function(e){mStarting=false;console.warn('[cosmos] milk',e)})}
/* MilkDrop starts on first interaction (AudioContext needs a gesture) or right away when it is already running — never during page load */
['pointerdown','keydown'].forEach(function(ev){document.addEventListener(ev,function k(e){if(e.target.closest&&e.target.closest('#launch .tile,#hxov'))return;if(document.body.classList.contains('ovon'))return;document.removeEventListener(ev,k,true);setTimeout(startMilk,30)},true)});
/* ---------- AI effects: chat style + viz mood via the 7-brain chain (own key > Pollinations queue > /api/brain > offline) ---------- */
window.D7ChatStyle=function(){var v=lsg('d7chatfx','none');return v=='rhyme'?'rymowany hip-hop z emoji 🔥🎧':v=='pro'?'profesjonalny DJ, konkretne liczby BPM/tonacja':''};
function chatFx(){var v=lsg('d7chatfx','none');document.body.classList.toggle('d7fx-neon',v=='neon')}
new MutationObserver(function(ms){var v=lsg('d7chatfx','none');if(v!='type'&&v!='voice')return;ms.forEach(function(m){[].forEach.call(m.addedNodes,function(n){if(n.nodeType!=1||!n.closest||!n.closest('section')||!n.textContent||n.textContent.length<20)return;
 if(v=='type')n.classList.add('d7tw');if(v=='voice'&&window.speechSynthesis&&!TEST){var u=new SpeechSynthesisUtterance(n.textContent.slice(0,300));u.lang='pl-PL';speechSynthesis.cancel();speechSynthesis.speak(u)}})})}).observe(document.body,{childList:true,subtree:true});
var moodBusy=false;function aiMood(){if(moodBusy||!MV||lsg('d7vizfx','ai')!='ai'||!window.SBDJ||document.body.classList.contains('ovon'))return;moodBusy=true;var h=new Date().getHours();
 SBDJ.brain('visual','Godzina '+h+':00, energia muzyki '+Math.round(beatLvl*100)+'%, stacja: '+(R.on?STN[+$('cxSt').value][0]:'cisza')+'. Podaj JEDNO angielskie słowo-klucz nastroju wizualizacji MilkDrop (np. tunnel, fractal, plasma, spiral, galaxy, flower, neon). Tylko to słowo.').then(function(a){moodBusy=false;var w=(String(a).match(/tunnel|fractal|plasma|spiral|galaxy|flower|neon|geiss|flexi|martin|kaleido|warp|cosmic|star|fire|water/i)||[])[0];if(w&&!/\[offline\]/.test(a)){nextPreset(w);window.D7MilkMood=w}},function(){moodBusy=false})}
setInterval(aiMood,90000);
/* ---------- online sync + status ---------- */
var isApk=/^(file|content):|appassets/.test(location.href)||!!window.D7APK,BASE=isApk?((window.D7_APK_CONFIG&&D7_APK_CONFIG.liveUrl)||'').replace(/\/$/,''):'',SY={online:null,server:null,t:0,facts:null,bots:null};
function net(){var d=bar.querySelector('.dot'),t=$('cxNetT');if(!d)return;if(navigator.onLine===false){d.className='dot off';t.textContent='offline · tryb lokalny';return}
 var ctl=new AbortController(),tm=setTimeout(function(){ctl.abort()},6000);fetch(BASE+'/api/status',{signal:ctl.signal,cache:'no-store'}).then(function(r){return r.json()}).then(function(j){clearTimeout(tm);SY={online:true,server:true,t:Date.now(),facts:j.facts,bots:j.bots,mem:j.messages};d.className='dot ok';t.textContent='online · serwer ✔ · '+(j.bots||0)+' botów · pamięć '+(j.facts||0)+' faktów';lss('d7sync',JSON.stringify(SY))},
  function(){clearTimeout(tm);SY.server=false;SY.online=navigator.onLine!==false;d.className='dot '+(SY.online?'':'off');t.textContent=SY.online?'online · serwer niedostępny (Pollinations/offline)':'offline'})}
window.D7Sync={status:function(){return SY},now:net};addEventListener('online',net);addEventListener('offline',net);
/* ---------- full automation online ---------- */
var AUTO=false,autoT=0;function autoOnline(on){AUTO=on;$('cxAuto').classList.toggle('on',on);$('cxAuto').textContent=on?'🤖 Auto online: WŁ':'🤖 Auto online';clearInterval(autoT);if(!on)return;
 radio(true);startMilk();net();aiMood();autoT=setInterval(function(){net();aiMood()},60000)}
window.D7Cosmos={group:group,startMilk:startMilk,auto:autoOnline,milk:function(){return{on:!!MV,preset:window.D7MilkPreset,w:mk.width,h:mk.height,mood:window.D7MilkMood}}};
mountBar();group();setTimeout(net,1200);setInterval(net,60000);
})();
/* v67 polish: typography, glow, glass cards, staggered entrance, smooth hovers (visual only — all v66 functions unchanged) */
(function(){var s=document.createElement('style');s.textContent=
'body{font-family:"Inter","Segoe UI",system-ui,-apple-system,Roboto,sans-serif;letter-spacing:.01em;-webkit-font-smoothing:antialiased}'+
'body>header h1{font-size:clamp(22px,3.2vw,38px)!important;font-weight:800;letter-spacing:.02em;background:linear-gradient(90deg,#ffd23f,#ff2d95 45%,#8a5cff 75%,#2de2ff);-webkit-background-clip:text;background-clip:text;color:transparent!important;text-shadow:none!important;filter:drop-shadow(0 0 14px #ff2d9566);animation:cxHue 12s ease-in-out infinite alternate}'+
'body>header h1 small{-webkit-text-fill-color:#cfc6ff;font-weight:500;letter-spacing:.06em;text-transform:uppercase;font-size:.38em!important}'+
'@keyframes cxHue{to{filter:drop-shadow(0 0 22px #2de2ff77) hue-rotate(25deg)}}'+
'#cxbar{gap:8px!important;padding:8px 12px!important;margin:4px 8px 10px;border-radius:16px;background:linear-gradient(135deg,#ffffff0d,#ffffff04);border:1px solid #ffffff1a;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}'+
'#cxbar select,#cxbar button,#sgRec .b{border-radius:999px!important;border:1px solid #8a5cff66!important;background:#120a2acc!important;padding:6px 12px!important;transition:transform .18s ease,box-shadow .18s ease,background .18s}'+
'#cxbar button:hover,#cxbar select:hover,#sgRec .b:hover{transform:translateY(-1px);box-shadow:0 0 14px #8a5cff88}#cxbar label{color:#cfc6ff;font-size:12px}'+
'#launch{gap:16px!important;padding:4px 14px 28px!important;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))!important}'+
'.cxg{position:relative;border:0!important;border-radius:22px!important;padding:16px 16px 14px!important;background:linear-gradient(160deg,#1b0d3ccc,#0a1630cc)!important;box-shadow:0 10px 40px #0008,inset 0 1px 0 #ffffff14!important;opacity:0;transform:translateY(14px) scale(.98);animation:cxIn .6s cubic-bezier(.2,.8,.2,1) forwards;transition:transform .25s ease,box-shadow .25s ease}'+
'.cxg::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(135deg,#ff2d95aa,#8a5cff55 40%,#2de2ff88);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}'+
'.cxg:hover{transform:translateY(-3px)!important;box-shadow:0 16px 50px #0009,0 0 30px #8a5cff44!important}'+
'.cxg:nth-child(1){animation-delay:.03s}.cxg:nth-child(2){animation-delay:.09s}.cxg:nth-child(3){animation-delay:.15s}.cxg:nth-child(4){animation-delay:.21s}.cxg:nth-child(5){animation-delay:.27s}.cxg:nth-child(6){animation-delay:.33s}.cxg:nth-child(7){animation-delay:.39s}'+
'@keyframes cxIn{to{opacity:1;transform:none}}'+
'.cxg h3{font-size:19px!important;font-weight:750;letter-spacing:.02em;color:#fff!important;text-shadow:0 0 18px #ff2d9566!important}.cxg small{color:#a9b4d6!important;font-size:12.5px!important}'+
'.cxg .chips{gap:8px!important}.cxg .tile{border:1px solid #ffffff1f!important;background:linear-gradient(135deg,#2a1356e6,#16234ae6)!important;border-radius:14px!important;padding:9px 13px!important;font-weight:600;transition:transform .16s ease,background .2s,box-shadow .2s!important}'+
'.cxg .tile:hover,.cxg .tile:focus-visible{transform:translateY(-2px) scale(1.03);background:linear-gradient(135deg,#ff2d95,#8a5cff)!important;box-shadow:0 6px 22px #ff2d9566!important;outline:none}'+
'.cxg .tile:active{transform:scale(.97)}#cosmoMilk.on{opacity:.62}'+
'@media (prefers-reduced-motion:reduce){.cxg,body>header h1{animation:none!important;opacity:1!important;transform:none!important}}';
document.head.appendChild(s)})();
