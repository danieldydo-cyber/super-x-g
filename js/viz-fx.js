/* Super Viz finishing FX + Roland TB-3 Web MIDI sync. */
(function(){var $=function(i){return document.getElementById(i)},mob=innerWidth<700;
var FX=[['bloom','🌟 Bloom / glow',1],['rgb','🌈 RGB split',0],['kal','🔷 Kalejdoskop',0],['trail','💫 Feedback trails',1],['strobe','⚡ Strobe na beat',0],['vig','⚫ Winieta',1],['grain','🎞 Ziarno filmu',0],['grade','🎨 Color grade',1]];
$('fxL').innerHTML=FX.map(function(f){return '<div><label><input type="checkbox" id="fx_'+f[0]+'"'+(f[2]&&!(mob&&f[0]=='bloom')?' checked':'')+'> '+f[1]+'</label> <input type="range" id="fi_'+f[0]+'" min="0" max="100" value="50" style="width:110px">'+(f[0]=='grade'?' <select id="gradeS"><option value="neon">neon</option><option value="film">film</option><option value="cold">zimny</option><option value="warm">ciepły</option><option value="bw">cz-b</option></select>':'')+'</div>'}).join('')+'<div>Moc wszystkich (MIDI CC) <input type="range" id="fxM" min="0" max="100" value="100"></div>';
function on(k){return $('fx_'+k).checked}function I(k){return +$('fi_'+k).value/100*(+$('fxM').value/100)}
var G={neon:'saturate(1.6) contrast(1.15)',film:'contrast(1.1) saturate(.85) sepia(.25)',cold:'hue-rotate(-20deg) saturate(1.2)',warm:'sepia(.35) saturate(1.3)',bw:'grayscale(1) contrast(1.3)'};
var tmp=document.createElement('canvas'),tx=tmp.getContext('2d'),noise=document.createElement('canvas');noise.width=noise.height=256;(function(){var n=noise.getContext('2d'),d=n.createImageData(256,256);for(var i=0;i<d.data.length;i+=4){var v=Math.random()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}n.putImageData(d,0,0)})();
var flash=0;
window.VizFX={pre:function(x,c){if(on('trail'))x.globalAlpha=1-.75*I('trail');if(on('grade'))x.filter=G[$('gradeS').value]},
apply:function(x,c,a,t){var W=c.width,H=c.height,b=a.bass||0;x.save();
 if(on('kal')){if(tmp.width!=W/2|0){tmp.width=W/2|0;tmp.height=H/2|0}tx.clearRect(0,0,tmp.width,tmp.height);tx.drawImage(c,0,0,tmp.width,tmp.height,0,0,tmp.width,tmp.height);var al=.5+.5*I('kal');x.globalAlpha=al;x.translate(W,0);x.scale(-1,1);x.drawImage(tmp,0,0);x.setTransform(1,0,0,1,0,0);x.translate(0,H);x.scale(1,-1);x.drawImage(tmp,0,0);x.setTransform(1,0,0,1,0,0);x.translate(W,H);x.scale(-1,-1);x.drawImage(tmp,0,0);x.setTransform(1,0,0,1,0,0);x.globalAlpha=1}
 if(on('bloom')){var sw=W/4|0,sh=H/4|0;if(tmp.width!=sw){tmp.width=sw;tmp.height=sh}tx.filter='blur('+(4+6*b)+'px) brightness(1.3)';tx.clearRect(0,0,sw,sh);tx.drawImage(c,0,0,sw,sh);tx.filter='none';x.globalCompositeOperation='lighter';x.globalAlpha=.12+.3*I('bloom')*(.5+b);x.drawImage(tmp,0,0,W,H);x.globalAlpha=1;x.globalCompositeOperation='source-over'}
 if(on('rgb')){var o=(2+18*I('rgb')*(.3+b))*W/1280;x.globalCompositeOperation='screen';x.globalAlpha=.35;x.filter='hue-rotate(120deg)';x.drawImage(c,o,0);x.filter='hue-rotate(240deg)';x.drawImage(c,-o,0);x.filter='none';x.globalAlpha=1;x.globalCompositeOperation='source-over'}
 if(a.beat)flash=1;if(on('strobe')&&flash>.05){x.fillStyle='rgba(255,255,255,'+(flash*.6*I('strobe')*2).toFixed(3)+')';x.fillRect(0,0,W,H)}flash*=.75;
 if(on('vig')){var g=x.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.7);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+(.4+.5*I('vig')-.2*b).toFixed(2)+')');x.fillStyle=g;x.fillRect(0,0,W,H)}
 if(on('grain')){x.globalCompositeOperation='overlay';x.globalAlpha=.08+.25*I('grain');var p=x.createPattern(noise,'repeat');x.translate(Math.random()*256,Math.random()*256);x.fillStyle=p;x.fillRect(-256,-256,W+256,H+256);x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.globalCompositeOperation='source-over'}
 x.restore()},get active(){return FX.filter(function(f){return on(f[0])}).map(function(f){return f[0]})}};
// ---- Web MIDI (TB-3)
var M=null,ticks=0,pend=0,hits=0,lastTick=0,iv=[],bpm=0,running=false,clkT=null;
window.VizMidi={get clock(){return $('mClk').checked&&running&&performance.now()-lastTick<500},take:function(){if(pend>0){pend--;return true}return false},hit:function(){if(hits>0){hits--;return true}return false},get bpm(){return bpm},get supported(){return!!navigator.requestMIDIAccess}};
function st(){$('mSt').textContent='MIDI: '+(M?'połączono':'nie połączono')+(running?' · ▶ clock':'')+(bpm?' · '+bpm.toFixed(1)+' BPM':'')+($('mSend').checked?' · wysyłam clock '+$('mBpm').value+' BPM':'')}
function msg(e){var d=e.data,s=d[0];if(s==0xF8){var n=performance.now();if(lastTick){iv.push(n-lastTick);if(iv.length>48)iv.shift();var avg=iv.reduce(function(a,b){return a+b},0)/iv.length;bpm=60000/(avg*24)}lastTick=n;running=true;if(++ticks%24==0)pend++}
 else if(s==0xFA||s==0xFB){running=true;ticks=0;pend++}else if(s==0xFC){running=false}
 else if((s&0xF0)==0x90&&d[2]>0){hits++}
 else if((s&0xF0)==0xB0){var v=Math.round(d[2]/127*100);if(d[1]==74)$('fi_bloom').value=v;else if(d[1]==71)$('fi_rgb').value=v;else $('fxM').value=v}st()}
function fill(){var i=$('mIn'),o=$('mOut'),iv2=i.value,ov=o.value;i.innerHTML='<option value="*">wszystkie</option>';o.innerHTML='<option value="">—</option>';M.inputs.forEach(function(p){i.innerHTML+='<option value="'+p.id+'">'+p.name+'</option>'});M.outputs.forEach(function(p){o.innerHTML+='<option value="'+p.id+'">'+p.name+'</option>'});i.value=iv2||'*';o.value=ov||'';bind()}
function bind(){var w=$('mIn').value;M.inputs.forEach(function(p){p.onmidimessage=(w=='*'||w==p.id)?msg:null})}
$('mOn').onclick=function(){if(!navigator.requestMIDIAccess){$('mSt').textContent='MIDI: ta przeglądarka nie ma Web MIDI (np. iOS Safari) – użyj Chrome/Edge na komputerze';return}navigator.requestMIDIAccess({sysex:false}).then(function(a){M=a;M.onstatechange=fill;fill();st()}).catch(function(e){$('mSt').textContent='MIDI: brak zgody ('+e.name+')'})};
$('mIn').onchange=function(){M&&bind()};
function sendClk(){clearInterval(clkT);clkT=null;if(!$('mSend').checked||!M)return st();var out=M.outputs.get($('mOut').value);if(!out){$('mSt').textContent='MIDI: wybierz wyjście';return}out.send([0xFA]);var b=+$('mBpm').value||120;clkT=setInterval(function(){out.send([0xF8])},60000/(b*24));st()}
$('mSend').onchange=function(){if(!this.checked&&M){var out=M.outputs.get($('mOut').value);out&&out.send([0xFC])}sendClk()};$('mBpm').onchange=sendClk;$('mOut').onchange=sendClk;
if(!navigator.requestMIDIAccess)$('mSt').textContent='MIDI: brak Web MIDI w tej przeglądarce (iOS) – na komputerze użyj Chrome/Edge';
})();
