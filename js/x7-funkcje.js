/* x7 Funkcje: menu, Pioneer-style decks with jog scratch, Super Bots 777 loop generator (WAV export), AI Remix FX (DSP). Free, in-browser. */
(function(){'use strict';var $=function(i){return document.getElementById(i)};if(!$('fnP'))return;
function bar(el){if(el.querySelector('.pnb'))return;var b=document.createElement('div');b.className='pnb';b.innerHTML='<button type="button" class="pfs" title="Pełny ekran">⛶</button><button type="button" class="pcl" title="Zamknij (Esc)">✕</button>';b.querySelector('.pfs').onclick=function(e){e.stopPropagation();el.classList.toggle('fs')};b.querySelector('.pcl').onclick=function(e){e.stopPropagation();el.classList.remove('on','fs')};el.insertBefore(b,el.firstChild)}
['fnP','deckP','sbP','fxP'].forEach(function(i){bar($(i))});
function open(id){var e=$(id);if(e){e.classList.add('on')}}
var tb=document.createElement('button');tb.type='button';tb.id='pFn';tb.textContent='☰ Funkcje';tb.style.background='#6b21ff';tb.onclick=function(){$('fnP').classList.toggle('on')};var ui=$('ui');ui.insertBefore(tb,ui.children[1]||null);
// ---- Funkcje menu
var G=[['🎧 Funkcje DJ',[['🎚 Mikser','mixP'],['💿 Decki Pioneer + scratch','deckP'],['📻 Stacje ('+'…)','stP',1],['▶ Kali YouTube','#kaliBtn'],['📻 Radio sync','#radioBtn']]],
['🌌 Specjalne wizualizacje',[['🌀 Wizualizacje / tryby / hologramy taniec','vizP'],['👻 Ghost Psychedelic','ghP']]],
['🤖 Funkcje botów',[['🤖 Boty i agenci','botP'],['📱 D BOT telefon','dbP']]],
['🧠 Genius generatory',[['🎹 Super Bots 777 – generator loopów','sbP'],['🎲 Losowy preset X7','#rnd']]],
['💬 Animowane chatboty (mówiące/piszące)',[['🌲 Leśny Duch – hologram czatu','botP']]],
['🎛 AI remix / efekty (DSP)',[['🎛 AI Remix FX','fxP']]],
['🧩 Agenci i generatory',[['🧠 Hub agentów','@agents.html'],['🧩 Generator aplikacji','@app-gen.html'],['🎹 Generator muzyki','@music-gen.html'],['💳 Wesprzyj BLIK','blP'],['📲 Pobierz aplikację','#x7dlBtn']]]];
$('fnL').innerHTML=G.map(function(g){return '<h4 style="margin:8px 0 4px">'+g[0]+'</h4>'+g[1].map(function(it){return '<button type="button" class="fnI" data-t="'+it[1]+'" style="min-height:44px;margin:2px">'+it[0]+'</button>'}).join('')}).join('');
$('fnL').onclick=function(e){var b=e.target.closest('.fnI');if(!b)return;var t=b.dataset.t;if(t[0]=='@'){location.href=t.slice(1);return}if(t[0]=='#'){var x=$(t.slice(1));x&&x.click();return}$('fnP').classList.remove('on');setTimeout(function(){open(t)},30)};
setTimeout(function(){var n=(window.X7Mix&&X7Mix.stations())||0;[].forEach.call(document.querySelectorAll('.fnI[data-t=stP]'),function(b){b.textContent='📻 Stacje ('+n+')'})},4000);
// ---- audio graph: decks + generator -> FX -> master -> speakers + visual analyser
var ac=window.__x7ac||new (window.AudioContext||window.webkitAudioContext)();function A(){if(ac.state=='suspended')ac.resume();return ac}
var master=ac.createGain(),fxIn=ac.createGain(),dry=ac.createGain(),wet=ac.createGain();fxIn.connect(dry);dry.connect(master);master.connect(ac.destination);
var flt=ac.createBiquadFilter();flt.type='allpass';var crush=ac.createWaveShaper(),dly=ac.createDelay(2),fb=ac.createGain(),rev=ac.createConvolver(),revG=ac.createGain(),dlyG=ac.createGain();fb.gain.value=0;dlyG.gain.value=0;revG.gain.value=0;
function ir(){var l=ac.sampleRate*2.2,b=ac.createBuffer(2,l,ac.sampleRate);for(var c=0;c<2;c++){var d=b.getChannelData(c);for(var i=0;i<l;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/l,3)}return b}rev.buffer=ir();
fxIn.disconnect();fxIn.connect(flt);flt.connect(crush);crush.connect(master);crush.connect(dly);dly.connect(fb);fb.connect(dly);dly.connect(dlyG);dlyG.connect(master);crush.connect(rev);rev.connect(revG);revG.connect(master);
function crushCurve(bits){var n=4096,c=new Float32Array(n),st=Math.pow(2,bits);for(var i=0;i<n;i++){var x=i/n*2-1;c[i]=bits>=16?x:Math.round(x*st)/st}return c}crush.curve=crushCurve(16);
var linked=false;function link(){if(!linked&&window.X7&&X7.connect){try{X7.connect(master);linked=true}catch(e){}}}
window.X7Fn={master:master,fxIn:fxIn};
// ---- AI Remix FX
function fx(){var f=+$('fxF').value;if(f<-2){flt.type='lowpass';flt.frequency.value=200*Math.pow(100,(100+f)/100)}else if(f>2){flt.type='highpass';flt.frequency.value=20*Math.pow(200,f/100)}else flt.type='allpass';
 dly.delayTime.value=60/((window.X7SB&&X7SB.bpm)||120)*(+$('fxDt').value);fb.gain.value=+$('fxFb').value/100;dlyG.gain.value=+$('fxD').value/100;revG.gain.value=+$('fxR').value/100;crush.curve=crushCurve(+$('fxC').value)}
['fxF','fxDt','fxFb','fxD','fxR','fxC'].forEach(function(i){$(i).oninput=fx;$(i).onchange=fx});
var auto=null;$('fxAuto').onclick=function(){if(auto){clearInterval(auto);auto=null;this.textContent='🤖 AI auto-remix: OFF';return}this.textContent='🤖 AI auto-remix: ON';auto=setInterval(function(){var r=Math.random;$('fxF').value=r()<.5?0:Math.round((r()*2-1)*80);$('fxD').value=r()<.5?0:Math.round(r()*60);$('fxDt').value=[.25,.5,.75,1][Math.floor(r()*4)];$('fxR').value=Math.round(r()*40);$('fxC').value=r()<.7?16:[4,6,8][Math.floor(r()*3)];$('fxFb').value=Math.round(r()*55);fx()},60000/((window.X7SB&&X7SB.bpm)||120)*8)};
$('fxReset').onclick=function(){$('fxF').value=0;$('fxD').value=0;$('fxR').value=0;$('fxC').value=16;$('fxFb').value=0;fx()};
// ---- Pioneer-style decks with jog scratch
function rv(b){var r=ac.createBuffer(b.numberOfChannels,b.length,b.sampleRate);for(var c=0;c<b.numberOfChannels;c++){var s=b.getChannelData(c),d=r.getChannelData(c),n=s.length;for(var i=0;i<n;i++)d[i]=s[n-1-i]}return r}
function Deck(id){var D={id:id,buf:null,rev:null,src:null,pos:0,t0:0,rate:0,playing:false,cue:0,pitch:1,gain:ac.createGain(),lo:ac.createBiquadFilter(),hi:ac.createBiquadFilter(),ang:0};D.lo.type='lowshelf';D.lo.frequency.value=250;D.hi.type='highshelf';D.hi.frequency.value=4000;D.gain.connect(D.lo);D.lo.connect(D.hi);D.hi.connect(fxIn);
 D.now=function(){if(!D.src)return D.pos;var p=D.pos+(ac.currentTime-D.t0)*D.rate;var L=D.buf?D.buf.duration:1;return ((p%L)+L)%L};
 D.run=function(rate){if(!D.buf)return;var p=D.now();if(D.src){try{D.src.stop()}catch(e){}D.src.disconnect();D.src=null}D.pos=p;D.rate=rate;if(Math.abs(rate)<.02)return;var s=ac.createBufferSource(),L=D.buf.duration;if(rate>0){s.buffer=D.buf;s.playbackRate.value=rate;s.loop=true;s.connect(D.gain);s.start(0,p)}else{s.buffer=D.rev;s.playbackRate.value=-rate;s.loop=true;s.connect(D.gain);s.start(0,Math.max(0,L-p))}D.src=s;D.t0=ac.currentTime};
 D.load=function(b,name){D.buf=b;D.rev=rv(b);D.pos=0;D.cue=0;$('dk'+id+'n').textContent=name+' · '+b.duration.toFixed(1)+' s';if(D.playing)D.run(D.pitch)};return D}
var DK={A:Deck('A'),B:Deck('B')};window.X7Decks=DK;
function mixD(){var x=+$('dkX').value/100;DK.A.gain.gain.value=+$('dkAv').value/100*Math.min(1,2*(1-x));DK.B.gain.gain.value=+$('dkBv').value/100*Math.min(1,2*x)}
['A','B'].forEach(function(id){var D=DK[id];
 $('dk'+id+'f').onchange=function(){var f=this.files[0];if(!f)return;A();link();f.arrayBuffer().then(function(ab){return ac.decodeAudioData(ab)}).then(function(b){D.load(b,f.name)}).catch(function(){$('dk'+id+'n').textContent='⚠ nie można zdekodować pliku'})};
 $('dk'+id+'p').onclick=function(){A();link();if(!D.buf){$('dk'+id+'n').textContent='Wczytaj plik lub loop z 🎹 Super Bots 777';return}D.playing=!D.playing;this.textContent=D.playing?'⏸':'▶';D.run(D.playing?D.pitch:0)};
 $('dk'+id+'c').onclick=function(){if(!D.buf)return;if(D.playing){D.playing=false;$('dk'+id+'p').textContent='▶';D.run(0)}D.pos=D.cue;D.src=null};
 $('dk'+id+'s').onclick=function(){D.cue=D.now()};
 $('dk'+id+'t').oninput=function(){D.pitch=1+(+this.value)/100;$('dk'+id+'tv').textContent=(+this.value>0?'+':'')+this.value+'%';if(D.playing)D.run(D.pitch)};
 $('dk'+id+'v').oninput=mixD;$('dk'+id+'lo').oninput=function(){D.lo.gain.value=+this.value};$('dk'+id+'hi').oninput=function(){D.hi.gain.value=+this.value};
 var jog=$('dk'+id+'j'),jx=jog.getContext('2d'),drag=null,lastRun=0;
 function angle(e){var r=jog.getBoundingClientRect();return Math.atan2(e.clientY-r.top-r.height/2,e.clientX-r.left-r.width/2)}
 jog.addEventListener('pointerdown',function(e){A();link();jog.setPointerCapture(e.pointerId);drag={a:angle(e),t:performance.now()};D.run(0);e.preventDefault()});
 jog.addEventListener('pointermove',function(e){if(!drag)return;var a=angle(e),t=performance.now(),da=a-drag.a;if(da>Math.PI)da-=2*Math.PI;if(da<-Math.PI)da+=2*Math.PI;var dt=Math.max(8,t-drag.t);var rate=Math.max(-4,Math.min(4,da/(dt/1000)/(Math.PI*1.2)));D.ang+=da;drag.a=a;drag.t=t;if(t-lastRun>30){D.run(rate);lastRun=t}D.scr=(D.scr||0)+1});
 function up(){if(!drag)return;drag=null;D.run(D.playing?D.pitch:0)}jog.addEventListener('pointerup',up);jog.addEventListener('pointercancel',up);
 (function draw(){requestAnimationFrame(draw);if(!$('deckP').classList.contains('on'))return;var w=jog.width,h=jog.height,r=w/2-4;if(!drag&&D.src)D.ang+=D.rate*0.06;jx.clearRect(0,0,w,h);jx.save();jx.translate(w/2,h/2);var g=jx.createRadialGradient(0,0,r*.2,0,0,r);g.addColorStop(0,'#333');g.addColorStop(1,'#0a0a0a');jx.fillStyle=g;jx.beginPath();jx.arc(0,0,r,0,7);jx.fill();jx.strokeStyle=drag?'#ff2d55':'#00e5ff';jx.lineWidth=4;jx.beginPath();jx.arc(0,0,r-3,0,7);jx.stroke();
  jx.rotate(D.ang);for(var i=0;i<24;i++){jx.rotate(Math.PI/12);jx.strokeStyle='#555';jx.lineWidth=1;jx.beginPath();jx.moveTo(r*.55,0);jx.lineTo(r*.85,0);jx.stroke()}jx.fillStyle='#ff2d55';jx.fillRect(r*.3,-4,r*.6,8);jx.restore();jx.fillStyle='#fff';jx.font='12px system-ui';jx.textAlign='center';jx.fillText(D.buf?D.now().toFixed(1)+' s':'JOG',w/2,h/2+4)})()});
['dkX','dkAv','dkBv'].forEach(function(i){$(i).oninput=mixD});mixD();
// ---- Super Bots 777 generator
var BOTS=[{n:'Bot D 🐲 – Boom-bap',st:'boombap',bpm:90,sw:18},{n:'🐲 SuperGrok – Trap',st:'trap',bpm:140,sw:0},{n:'🧠 Mózg Kod – Techno',st:'techno',bpm:130,sw:0},{n:'MegaBot – Minimal',st:'minimal',bpm:124,sw:8},{n:'DJ Dragon ⚡ – Hard techno',st:'hard',bpm:145,sw:0},{n:'Bot Pamięć – Lo-fi',st:'lofi',bpm:82,sw:22},{n:'Agent #777 – Drill',st:'drill',bpm:142,sw:6}];
$('sbBot').innerHTML=BOTS.map(function(b,i){return '<option value="'+i+'">'+b.n+'</option>'}).join('');
var SB={bpm:90,st:'boombap',sw:18,seed:777,pat:null,playing:false,step:0,next:0,timer:null};window.X7SB=SB;
function rng(s){return function(){s=(s*16807)%2147483647;return(s-1)/2147483646}}
function gen(){var r=rng(SB.seed),st=SB.st,P={k:[],s:[],h:[],b:[],c:[]};var notes=[0,3,5,7,10],root=36+Math.floor(r()*7);
 for(var i=0;i<16;i++){var four=/techno|minimal|hard/.test(st);P.k[i]=four?(i%4==0?1:(st=='hard'&&i%4==2&&r()<.3?.7:0)):(i==0||i==10||(r()<.22&&i%2==0)?1:0);
  P.s[i]=four?(i%8==4?(st=='minimal'?.5:.9):0):(i%8==4?1:(st=='trap'||st=='drill')&&r()<.12?.6:0);P.h[i]=four?(i%4==2?1:(r()<.4?.4:0)):(st=='trap'||st=='drill')?(r()<.85?(.4+r()*.6):0):(i%2==0?.8:(r()<.3?.4:0));
  P.b[i]=r()<(four?.35:.28)?root+notes[Math.floor(r()*notes.length)]+(r()<.2?12:0):0;P.c[i]=i%8==0&&r()<.6?root+24+notes[Math.floor(r()*3)]:0}
 if(st=='trap'||st=='drill'){P.k=P.k.map(function(v,i){return i==0||i==7||i==10||(r()<.15)?1:0})}SB.pat=P;drawPat()}
function drawPat(){var P=SB.pat,rows=[['k','🥁 Kick'],['s','👏 Snare'],['h','🎩 Hat'],['b','🎸 Bass'],['c','🎹 Chord']];$('sbGrid').innerHTML=rows.map(function(r){return '<div style="display:flex;gap:2px;align-items:center"><span style="width:70px;font-size:12px">'+r[1]+'</span>'+P[r[0]].map(function(v,i){return '<span data-r="'+r[0]+'" data-i="'+i+'" style="flex:1;height:18px;border-radius:3px;cursor:pointer;background:'+(v?'#ff2d55':(i%4==0?'#2a1050':'#160830'))+'"></span>'}).join('')+'</div>'}).join('')}
$('sbGrid').onclick=function(e){var c=e.target.dataset;if(!c.r)return;var P=SB.pat,v=P[c.r][+c.i];P[c.r][+c.i]=v?0:(c.r=='b'?48:(c.r=='c'?60:1));drawPat()};
function voice(ctx,out,type,t,v,note){var g=ctx.createGain();g.connect(out);if(type=='k'){var o=ctx.createOscillator();o.frequency.setValueAtTime(SB.st=='trap'||SB.st=='drill'?120:150,t);o.frequency.exponentialRampToValueAtTime(40,t+.15);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+(SB.st=='trap'||SB.st=='drill'?.6:.35));o.connect(g);o.start(t);o.stop(t+.7)}
 else if(type=='s'||type=='h'){var n=ctx.createBufferSource(),L=ctx.sampleRate*.3,b=ctx.createBuffer(1,L,ctx.sampleRate),d=b.getChannelData(0);for(var i=0;i<L;i++)d[i]=Math.random()*2-1;n.buffer=b;var f=ctx.createBiquadFilter();f.type=type=='h'?'highpass':'bandpass';f.frequency.value=type=='h'?7000:1800;n.connect(f);f.connect(g);g.gain.setValueAtTime(v*(type=='h'?.35:.7),t);g.gain.exponentialRampToValueAtTime(.001,t+(type=='h'?.05:.18));n.start(t);n.stop(t+.3)}
 else{var o2=ctx.createOscillator(),f2=ctx.createBiquadFilter();o2.type=type=='b'?'sawtooth':'square';o2.frequency.value=440*Math.pow(2,(note-69)/12);f2.type='lowpass';f2.frequency.value=type=='b'?600:1800;o2.connect(f2);f2.connect(g);var len=type=='b'?.22:.4;g.gain.setValueAtTime(type=='b'?.35:.12,t);g.gain.exponentialRampToValueAtTime(.001,t+len);o2.start(t);o2.stop(t+len+.05)}}
function schedule(ctx,out,step,t){var P=SB.pat;['k','s','h'].forEach(function(k){if(P[k][step])voice(ctx,out,k,t,P[k][step])});if(P.b[step])voice(ctx,out,'b',t,1,P.b[step]);if(P.c[step])voice(ctx,out,'c',t,1,P.c[step])}
function stepDur(){var half=SB.st=='trap'||SB.st=='drill';return 60/SB.bpm/4*(half?1:1)}
function tick(){while(SB.next<ac.currentTime+.12){var sw=SB.step%2?SB.sw/100*stepDur()*.5:0;schedule(ac,sbOut,SB.step,SB.next+sw);SB.step=(SB.step+1)%16;SB.next+=stepDur()}}
var sbOut=ac.createGain();sbOut.gain.value=.8;sbOut.connect(fxIn);
function applyBot(){var b=BOTS[+$('sbBot').value];SB.st=b.st;SB.bpm=b.bpm;SB.sw=b.sw;$('sbBpm').value=b.bpm;$('sbSw').value=b.sw;$('sbSt').value=b.st;gen()}
$('sbBot').onchange=applyBot;$('sbSt').onchange=function(){SB.st=this.value;gen()};$('sbBpm').oninput=function(){SB.bpm=+this.value;$('sbBv').textContent=this.value};$('sbSw').oninput=function(){SB.sw=+this.value};
$('sbNew').onclick=function(){SB.seed=Math.floor(Math.random()*1e6)+1;gen();$('sbInfo').textContent='🎲 seed '+SB.seed};
$('sbPlay').onclick=function(){A();link();if(SB.playing){clearInterval(SB.timer);SB.playing=false;this.textContent='▶ Graj';return}SB.playing=true;SB.step=0;SB.next=ac.currentTime+.05;SB.timer=setInterval(tick,25);this.textContent='⏹ Stop'};
function render(bars){var sr=44100,dur=bars*16*stepDur(),oc=new OfflineAudioContext(2,Math.ceil(sr*dur),sr),o=oc.createGain();o.gain.value=.8;o.connect(oc.destination);var t=0;for(var i=0;i<bars*16;i++){var sw=i%2?SB.sw/100*stepDur()*.5:0;schedule(oc,o,i%16,t+sw);t+=stepDur()}return oc.startRendering()}
function wav(b){var n=b.length,ch=2,ab=new ArrayBuffer(44+n*ch*2),v=new DataView(ab),w=function(o,s){for(var i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))};w(0,'RIFF');v.setUint32(4,36+n*4,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,ch,true);v.setUint32(24,b.sampleRate,true);v.setUint32(28,b.sampleRate*4,true);v.setUint16(32,4,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*4,true);var L=b.getChannelData(0),R=b.getChannelData(1),o=44;for(var i=0;i<n;i++){v.setInt16(o,Math.max(-1,Math.min(1,L[i]))*32767,true);v.setInt16(o+2,Math.max(-1,Math.min(1,R[i]))*32767,true);o+=4}return new Blob([ab],{type:'audio/wav'})}
$('sbWav').onclick=function(){var bars=+$('sbBars').value;$('sbInfo').textContent='⏳ renderuję '+bars+' taktów…';render(bars).then(function(b){var u=URL.createObjectURL(wav(b)),a=document.createElement('a');a.href=u;a.download='super-bots-777-'+SB.st+'-'+SB.bpm+'bpm-'+SB.seed+'.wav';a.textContent='⬇️ Pobierz WAV ('+(b.duration).toFixed(1)+' s)';a.style.color='#fc0';$('sbOut').innerHTML='';$('sbOut').appendChild(a);$('sbInfo').textContent='✓ gotowe';window.X7SB.lastWav=b.length})};
['A','B'].forEach(function(id){$('sbTo'+id).onclick=function(){A();link();render(+$('sbBars').value).then(function(b){DK[id].load(b,'🎹 '+SB.st+' '+SB.bpm+' BPM #'+SB.seed);$('sbInfo').textContent='✓ wczytano do decka '+id}).catch(function(e){$('sbInfo').textContent='⚠ '+e.message})}});
applyBot();fx();
})();
