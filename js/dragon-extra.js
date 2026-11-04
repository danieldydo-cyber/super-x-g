/* Dragon D Pro – ☰ Dodatkowe funkcje: boty, Auto FX, Teledysk, 777 wariacji, agenci (regułowi). */
(function(){var $=function(i){return document.getElementById(i)},D=window.DDI;if(!D)return;
document.querySelectorAll('[data-q]').forEach(function(b){b.onclick=function(){D.pnl(b.dataset.q)}});
function log(t){var l=$('agLog'),d=document.createElement('div');d.textContent=new Date().toTimeString().slice(0,8)+' '+t;l.appendChild(d);if(l.children.length>60)l.removeChild(l.firstChild);l.scrollTop=1e6}
// 1) bots
var B=[['🐲 Bot D – czat','chat-d.html'],['🤖 Super Bot D PRO','superbotg.html'],['🧩 D7 Universal Bots','bots.html'],['🧠 Hub 8888 agentów SI','agents.html'],['🧠 DJ 777 SI','dj777si.html'],['🐲 DJ Supreme D · Kali Auto','auto.html'],['🤖 X7: Boty i agenci (VJ/DJ/komentarze)','x7gen.html#open=botP'],['💬 X7: 7 AI chatbotów','x7gen.html#open=aiP'],['🌲 X7: Leśny Duch hologram','x7gen.html#open=botP'],['🎹 X7: Super Bots 777 generator','x7gen.html#open=sbP']];
$('botL').innerHTML=B.map(function(b){return '<div><a href="'+b[1]+'" target="_blank" rel="noopener" style="color:#9ef;text-decoration:none">'+b[0]+'</a></div>'}).join('');
// 2) Auto FX
var ac=D.ac,fxT=0;function setFx(f,e,r,ramp){var t=ac.currentTime;D.flt.frequency.cancelScheduledValues(t);D.flt.frequency.setTargetAtTime(200*Math.pow(100,f/100),t,ramp||.05);D.dw.gain.setTargetAtTime(e/100,t,ramp||.05);D.rw.gain.setTargetAtTime(r/100,t,ramp||.05)}
function man(){setFx(100-+$('afF').value,+$('afE').value,+$('afR').value)}['afF','afE','afR'].forEach(function(i){$(i).oninput=man});
var dropFx=0;D.hooks.push(function(r,t){if($('afA').checked&&r.drop){dropFx=t;var t0=ac.currentTime;D.flt.frequency.cancelScheduledValues(t0);D.flt.frequency.setValueAtTime(400,t0);D.flt.frequency.exponentialRampToValueAtTime(20000,t0+2);D.dw.gain.setTargetAtTime(.35,t0,.05);D.dw.gain.setTargetAtTime(0,t0+2,.4);D.rw.gain.setTargetAtTime(.3,t0,.05);D.rw.gain.setTargetAtTime(+$('afR').value/100,t0+2.5,.6);$('afS').textContent='🎚 drop → filter sweep + echo + pogłos';log('Auto FX: drop → sweep/echo/pogłos')}});
var mv=$('mv'),pulse=0;window.DDvf=function(){if(!$('vfA').checked)return null;var E=D.E;return{f:'saturate('+(1.1+E.b*.8).toFixed(2)+') hue-rotate('+((performance.now()/60)%360|0)+'deg) contrast('+(1+E.h*.3).toFixed(2)+')',z:1+pulse*.06}};
D.hooks.push(function(r){if(r.bt)pulse=1;pulse*=.85;var v=window.DDvf();mv.style.filter=v?v.f:'';mv.style.transform=v?'scale('+v.z.toFixed(3)+')':''});
// 4) 777 variations
var MD=['auto','chill','techno','hiphop','fly'],FXC=[['czysty',0,0],['pulse',1,0],['drop-FX',0,1],['pulse+drop-FX',1,1]],VAR=[];
function buildVar(){var K=D.keys().slice().sort();VAR=[];for(var i=0;VAR.length<777&&i<K.length*MD.length*FXC.length;i++){var k=K[i%K.length],m=MD[Math.floor(i/K.length)%MD.length],f=FXC[Math.floor(i/(K.length*MD.length))%FXC.length];VAR.push({k:k,m:m,f:f,n:'Wariacja #'+(VAR.length+1)+': '+k.slice(0,48)+' · '+m+' · '+f[0]})}
 $('v7C').textContent=K.length+' prawdziwych presetów MilkDrop · '+VAR.length+' wizualizacji = '+(VAR.length-Math.min(K.length,VAR.length))+' wariacji (preset × tryb × FX)';window.DDvar=VAR;window.DD777={presets:K.length,total:VAR.length,variations:VAR.length-Math.min(K.length,VAR.length)};drawV()}
function drawV(){var q=$('v7Q').value.toLowerCase();$('v7L').innerHTML=VAR.map(function(v,i){return[v,i]}).filter(function(x){return!q||x[0].n.toLowerCase().indexOf(q)>=0}).slice(0,150).map(function(x){return '<div data-v="'+x[1]+'">'+(x[1]<D.keys().length?'🌌 ':'🌈 ')+x[0].n.replace(/</g,'')+'</div>'}).join('')}
function applyV(v){D.setMode(v.m);$('vfA').checked=!!v.f[1];$('afA').checked=!!v.f[2]||$('afA').checked;D.load(v.k,1.5);$('lk').checked=true;log('Wizualizacja: '+v.n)}
window.DDapply=applyV;$('v7Q').oninput=drawV;$('v7L').onclick=function(e){var d=e.target.closest('[data-v]');d&&applyV(VAR[+d.dataset.v])};$('v7R').onclick=function(){applyV(VAR[(Math.random()*VAR.length)|0])};
buildVar();var lastN=0;setInterval(function(){if(D.keys().length!=lastN){lastN=D.keys().length;buildVar()}},2000);
// 5) agents: Auto-VJ
var vjT=0,vjLvl='';window.DDvj=function(){return $('agVJ').checked&&!$('lk').checked&&!td.on};
D.hooks.push(function(r,t){if(!window.DDvj())return;var E=D.E,lvl=E.lt>.55?'hard':E.lt<.3?'calm':'mid',ev=+$('ev').value||(lvl=='hard'?4:lvl=='mid'?8:16);
 if(lvl!=vjLvl){vjLvl=lvl;log('Auto-VJ: energia '+E.lt.toFixed(2)+' → '+(lvl=='hard'?'twarde presety, zmiana co 4 beaty':lvl=='mid'?'mieszane, co 8':'spokojne, co 16, długie przejścia'))}
 if(r.drop){D.pick(false,.4);log('Auto-VJ: DROP → szybkie cięcie');vjT=t;return}
 if(r.bt&&DDPro.beats%ev==0&&t-vjT>(ev<=2?600:1500)){D.pick(false,ev<=2?.3+Math.random()*.2:lvl=='hard'?.8:lvl=='mid'?2.5:6);vjT=t}else if(t-vjT>45000){D.pick(false);vjT=t}});
// 3) Teledysk + Auto-Reżyser
var td={on:false,url:null,name:''};$('tdF').onchange=function(){var f=this.files[0];if(!f)return;td.url=URL.createObjectURL(f);td.name=f.name;$('tdGo').disabled=false;$('tdS').textContent='🎵 '+f.name};
var au=D.au,dirT=0,phase='';
$('tdGo').onclick=function(){if(!td.url)return;ac.resume();au.pause();au.src=td.url;au.currentTime=0;au.onloadedmetadata=null;td.on=true;$('lk').checked=false;window.DDfade=1;
 au.play().then(function(){D.rec();$('tdS').textContent='⏺ nagrywam teledysk: '+td.name;log('Reżyser: start – '+td.name)}).catch(function(e){$('tdS').textContent='⚠ '+e.message;td.on=false})};
function endTd(){if(!td.on)return;td.on=false;window.DDfade=null;if(D.recOn)D.rec();au.pause();$('tdS').textContent='✓ teledysk gotowy – pobierz w ⚙';log('Reżyser: koniec – zapisano plik')}
$('tdStop').onclick=endTd;au.addEventListener('ended',function(){if(td.on)endTd()});
D.hooks.push(function(r,t){if(!td.on)return;var d=au.duration||0,c=au.currentTime,E=D.E;window.DDfade=c<2?Math.max(0,1-c/2):d&&d-c<3?Math.min(1,1-(d-c)/3):null;if(!$('tdD').checked)return;
 var ph=c<8?'intro':d&&d-c<10?'outro':E.b>.55?'drop':'build';if(ph!=phase){phase=ph;log('Reżyser: '+ph);if(ph=='intro'||ph=='outro'){D.setMode('fly');D.pick(false,4)}else D.setMode(ph=='drop'?'techno':'hiphop')}
 if(r.drop){D.pick(false,.4);dirT=t;log('Reżyser: cięcie na dropie')}else if(r.bt&&t-dirT>(ph=='drop'?2500:ph=='build'?6000:12000)){D.pick(false,ph=='drop'?.8:ph=='build'?2.5:6);dirT=t}});
window.DDTd=td;})();
/* ⏺▶ Record & Play + 🌈 Psychedelic Dream generator */
(function(){var $=function(i){return document.getElementById(i)},D=window.DDI;if(!D)return;var au=D.au,ac=D.ac,rp={on:false,n:0,last:0};window.DDrp=rp;
var _vj=window.DDvj;window.DDvj=function(){return!rp.on&&_vj()};
// psychedelic generated params per beat
var ph={hue:0,hv:0,z:1,sat:1.5,on:false};var _vf=window.DDvf;window.DDvf=function(){var psy=$('md').value=='psy';if(!psy)return _vf();var E=D.E;ph.hue=(ph.hue+ph.hv+E.h*6)%360;return{f:'hue-rotate('+(ph.hue|0)+'deg) saturate('+(ph.sat+E.b).toFixed(2)+') contrast('+(1.05+E.m*.3).toFixed(2)+')',z:ph.z}};
D.hooks.push(function(r){if($('md').value!='psy'){if(ph.on){ph.on=false;$('mv').style.filter='';$('mv').style.transform=''}return}ph.on=true;if(r.bt){ph.hv=1+Math.random()*5;ph.z=1+Math.random()*.08+D.E.b*.05;ph.sat=1.4+Math.random()*.8}else ph.z=1+(ph.z-1)*.92;var v=window.DDvf();$('mv').style.filter=v.f;$('mv').style.transform='scale('+v.z.toFixed(3)+')'});
// variations list (from 777 builder)
function V(){return window.DD777&&window.DDvar?DDvar:null}
D.hooks.push(function(r,t){if(!rp.on||D.E==null)return;var every=+$('ev').value||($('md').value=='psy'?4:D.E.lt>.5?4:8);if((r.drop||(r.bt&&++rp.n%every==0))&&t-rp.last>(every<=2?600:1200)){rp.last=t;var L=window.DDvar||[];if(L.length){var v=L[(Math.random()*L.length)|0];if(rp.keepMode){D.load(v.k,r.drop||every<=2?.35:$('md').value=='psy'?.9:2)}else window.DDapply(v)}else D.pick(false);rp.count=(rp.count||0)+1}});
function fs(){var d=document.documentElement;try{if(!document.fullscreenElement&&d.requestFullscreen)d.requestFullscreen().catch(function(){})}catch(e){}}
function source(){if(au.src&&au.src!=location.href){return au.play()}var first=[].slice.call(document.querySelectorAll('#rL [data-r]')).filter(function(x){return x.textContent.indexOf('⏺')==0})[0];if(first){first.click();return new Promise(function(ok,no){var t=setTimeout(function(){au.paused?no(new Error('radio nie gra')):ok()},5000);au.addEventListener('playing',function f(){clearTimeout(t);au.removeEventListener('playing',f);ok()})})}$('fi').click();return Promise.reject(new Error('wybierz MP3'))}
function start(){if(rp.on)return stop();ac.resume();fs();document.querySelectorAll('.pn.on').forEach(function(p){p.classList.remove('on')});$('lk').checked=false;rp.keepMode=$('md').value=='psy';var b=$('rpB');b.textContent='⏳';
 source().then(function(){rp.on=true;rp.n=0;rp.count=0;$('lk').checked=true;if(!D.recOn)D.rec();b.textContent='⏹ Stop';$('st').textContent='⏺▶ Record & Play · 777 losowych wizualizacji'}).catch(function(e){b.innerHTML='⏺▶ Record &amp; Play';$('st').textContent='⚠ '+e.message+' – potem dotknij ⏺▶ ponownie'})}
function stop(){rp.on=false;$('lk').checked=false;if(D.recOn)D.rec();$('rpB').innerHTML='⏺▶ Record &amp; Play'}
$('rpB').onclick=start;$('fi').addEventListener('change',function(){if(rp.wantAfterPick){rp.wantAfterPick=false;setTimeout(start,600)}});
$('rpAuto').checked=localStorage.dd_auto==1;$('rpAuto').onchange=function(){localStorage.dd_auto=this.checked?1:0};
var go=$('go');if(go&&localStorage.dd_auto==1){go.querySelector('p').innerHTML+='<br><b style="font-size:16px;border:0;padding:0">⚡ Auto Record &amp; Play – dotknij, aby zacząć</b>';go.addEventListener('click',function(){setTimeout(start,300)})}
if(innerWidth<700||/Android|iPhone/.test(navigator.userAgent))$('rr').value='720';window.DDRP={start:start,stop:stop,get on(){return rp.on},get count(){return rp.count||0}};})();
