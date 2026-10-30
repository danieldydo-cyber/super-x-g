/* X7 Anime 3D: 3D wireframe/point-cloud holograms with per-figure AI brain + Anime FX generator (additive layer, Canvas2D 3D projection) */
(function(){var $=function(i){return document.getElementById(i)};if(!$('vizP'))return;
var mob=matchMedia('(max-width:700px)').matches||innerWidth<700;
var cv=document.createElement('canvas');cv.id='a3c';cv.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:4;opacity:.9';document.body.appendChild(cv);var x=cv.getContext('2d'),W,H,DP=Math.min(devicePixelRatio||1,mob?1.5:2);
function rs(){W=cv.width=innerWidth*DP;H=cv.height=innerHeight*DP}rs();addEventListener('resize',rs);
var TY=[['Di','😈','diablo','Demon (oryginalny)',0],['Al','👽','alien','Alien',120],['Wo','🐺','wolf','Wilk',200],['Ph','🔥','phoenix','Feniks',25],['Ro','🤖','robot','Robot',180]];
var box=document.createElement('div');box.innerHTML='<h4>🐲 Hologramy 3D + AI</h4><label><input type="checkbox" id="a3On" checked> ON</label> '+TY.map(function(t){return '<label><input type="checkbox" id="a3'+t[0]+'" checked>'+t[1]+'</label>'}).join(' ')+' · ile <input type="range" id="a3N" min="1" max="10" value="'+(mob?3:6)+'" style="width:80px"><span id="a3Nv"></span> <label><input type="checkbox" id="a3Pts"> point-cloud</label> <label><input type="checkbox" id="a3Talk"> 🗣 mówią (Web Speech)</label><br><small id="a3Info">AI: każdy hologram ma własny mózg (bas/środek/góra → ruchy, frazy 8 beatów, unikanie innych)</small>'+
'<h4>💥 Anime FX generator</h4><label><input type="checkbox" id="afOn" checked> ON</label> styl <select id="afSt"><option value="mix">mix</option><option value="speed">speed lines</option><option value="impact">impact burst</option><option value="spark">sparkles</option><option value="aura">aury energii</option><option value="flash">flash</option></select> moc <input type="range" id="afI" min="0" max="100" value="'+(mob?40:60)+'" style="width:90px">';
$('vizP').appendChild(box);
// Funkcje menu entries (additive)
function addFn(){var L=$('fnL');if(!L||L.querySelector('[data-a3]'))return;var d=document.createElement('div');d.setAttribute('data-a3',1);d.innerHTML='<h4 style="margin:8px 0 4px">🐲 Hologramy 3D AI + Anime FX</h4><button type="button" class="fnI" data-t="vizP" style="min-height:44px;margin:2px">😈👽 Hologramy 3D z AI</button><button type="button" class="fnI" data-t="vizP" style="min-height:44px;margin:2px">💥 Anime FX generator</button>';L.appendChild(d)}addFn();setTimeout(addFn,500);
// ---- 3D models: functions returning polylines [[x,y,z],...] given pose p {t,k,arm,leg,wing}
function ring(cx,cy,cz,r,n,ax){var a=[];for(var i=0;i<=n;i++){var q=i/n*6.283,c=Math.cos(q)*r,s=Math.sin(q)*r;a.push(ax=='y'?[cx+c,cy,cz+s]:ax=='x'?[cx,cy+c,cz+s]:[cx+c,cy+s,cz])}return a}
function sph(cx,cy,cz,r,sx,sy,sz){var L=[];for(var j=1;j<5;j++){var y=Math.cos(j/5*3.1416),rr=Math.sin(j/5*3.1416);L.push(ring(0,0,0,1,14,'y').map(function(v){return[cx+v[0]*rr*r*(sx||1),cy+y*r*(sy||1),cz+v[2]*rr*r*(sz||1)]}))}for(var m=0;m<4;m++){var q=m/4*3.1416;L.push(ring(0,0,0,r,14,'z').map(function(v){return[cx+v[0]*Math.cos(q)*(sx||1),cy+v[1]*(sy||1),cz+v[0]*Math.sin(q)*(sz||1)]}))}return L}
function limb(a,b,c){return [a,b,c]}
var M={
diablo:function(p){var L=sph(0,-.62,0,.26,1,1.1,1);var h=.15*p.k;[-1,1].forEach(function(d){L.push([[d*.15,-.8,0],[d*.35,-1.0-h,.05],[d*.42,-1.25-h,-.1],[d*.3,-1.42-h,-.2]]);L.push([[d*.1,-.82,.05],[d*.2,-1.05,.1],[d*.16,-1.18-h*.5,0]]);
 L.push([[d*.25,-.25,0],[d*(.55+.1*p.arm),-.05+.25*p.arm*d,.15],[d*.75,.2-.3*p.arm*d,.25],[d*.85,.25,.35]]);
 L.push([[d*.12,.35,0],[d*.2,.75+.1*p.leg*d,.08],[d*.18,1.1,0],[d*.3,1.12,.12]]);
 L.push([[d*.2,-.3,-.1],[d*.9,-.75-.3*p.wing,-.4],[d*1.3,-.3-.4*p.wing,-.5],[d*1.0,.0,-.35],[d*.75,-.15,-.3],[d*.55,.15,-.25],[d*.2,-.05,-.1]])});
 L=L.concat(sph(0,0,0,.33,1,1.2,.7));L.push(ring(0,.35,0,.2,10,'y'));L.push([[0,.35,-.1],[.15*Math.sin(p.t*3),.7,-.35],[.3*Math.sin(p.t*3+1),.95,-.4],[.38,.9,-.45],[.3,1.02,-.42]]);return L},
alien:function(p){var L=sph(0,-.7,0,.32,1,1.35,.95);[-1,1].forEach(function(d){L.push(ring(0,0,0,.08,10,'z').map(function(v){return[d*.13+v[0]*1.4,-.72+v[1]*.6-v[0]*d*.4,.28]}));
 L.push([[d*.12,-.2,0],[d*(.35+.15*p.arm),.1-.3*p.arm*d,.1],[d*.45,.45,.15],[d*.5,.55,.2]]);L.push([[d*.08,.45,0],[d*.13,.8,.04+.1*p.leg*d],[d*.12,1.12,0]])});
 L=L.concat(sph(0,.1,0,.16,1,2.2,.8));L.push([[0,-1.08,0],[.1,-1.3-.1*p.k,0]]);L.push(ring(.1,-1.33-.1*p.k,0,.04,8,'z'));return L},
wolf:function(p){var L=sph(0,0,0,.32,1.7,.9,.8);var hj=.1*p.k;L=L.concat(sph(.65,-.35-hj,0,.2,1.1,1,.9));L.push([[.78,-.35-hj,0],[1.05,-.3-hj,0],[1.05,-.22-hj*1.5,0],[.8,-.2-hj,0]]);
 [-1,1].forEach(function(d){L.push([[.58,-.5-hj,d*.08],[.62,-.75-hj,d*.1],[.72,-.52-hj,d*.08]]);L.push([[.35,.2,d*.15],[.4+.12*p.leg*d,.6,d*.17],[.38,.95,d*.18]]);L.push([[-.35,.2,d*.15],[-.4-.12*p.leg*d,.6,d*.17],[-.38,.95,d*.18]])});
 L.push([[-.5,-.05,0],[-.85,-.35+.2*Math.sin(p.t*6),0],[-1.05,-.6+.25*Math.sin(p.t*6),0]]);return L},
phoenix:function(p){var L=sph(0,0,0,.2,.9,1.4,.8);L=L.concat(sph(0,-.42,.05,.13));L.push([[0,-.42,.18],[0,-.38,.32],[0,-.32,.18]]);L.push([[0,-.55,0],[.05,-.78,-.05],[-.05,-.7,-.1],[0,-.9,-.2]]);var w=p.wing;
 [-1,1].forEach(function(d){for(var f=0;f<5;f++){var ff=f/4;L.push([[d*.12,-.1,0],[d*(.55+ff*.3),-.25-w*(.6-ff*.3)+ff*.25,-.1],[d*(1+ff*.35),-.4-w*(.8-ff*.4)+ff*.45,-.2]])}});
 for(var tl=0;tl<5;tl++){var s=(tl-2)*.12;L.push([[0,.25,0],[s,.7,-.1],[s*1.8+.1*Math.sin(p.t*4+tl),1.15,-.2]])}return L},
robot:function(p){function cube(cx,cy,cz,sx,sy,sz){var v=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(function(a){return[cx+a[0]*sx,cy+a[1]*sy,cz+a[2]*sz]});return[[v[0],v[1],v[2],v[3],v[0],v[4],v[5],v[6],v[7],v[4]],[v[1],v[5]],[v[2],v[6]],[v[3],v[7]]]}
 var L=cube(0,0,0,.3,.35,.2).concat(cube(0,-.62+.05*p.k,0,.2,.18,.18));L.push([[-.1,-.64+.05*p.k,.19],[.1,-.64+.05*p.k,.19]]);L.push([[0,-.8,0],[0,-.98,0]]);L.push(ring(0,-1.02,0,.04,8,'z'));
 [-1,1].forEach(function(d){L.push([[d*.32,-.28,0],[d*(.55+.1*p.arm),-.1+.3*p.arm*d,.1],[d*.6,.25-.35*p.arm*d,.2]]);L=L.concat(cube(d*.15,.75+.08*p.leg*d,0,.08,.35,.1))});return L}};
// ---- AI brain
var MOVES=['bounce','spin','sway','jump','headbang','float','orbit','robotPop'];
var LINES={diablo:['Czuję ogień basu!','Piekielny drop!','Więcej mocy!'],alien:['Ziemska muzyka – fajna!','Bip-bop, beat odebrany.','Zabieram ten rytm na statek.'],wolf:['Auuu! Techno pełnią księżyca!','Wataha tańczy!'],phoenix:['Odradzam się na każdym dropie!','Płonę w rytmie!'],robot:['Analiza: BPM wysoki. Tańczę.','Tryb imprezy: ON.']};
var F=[],beatN=0,lastBeat=0,E={b:0,m:0,h:0,l:0},pulses=[],speaking=0;
function rebuild(){var n=+$('a3N').value,on=TY.filter(function(t){return $('a3'+t[0]).checked});$('a3Nv').textContent=' '+n;F=[];if(!on.length)return;for(var i=0;i<n;i++){var t=on[i%on.length];F.push({ty:t[2],hue:t[4],x:.15+.7*Math.random(),y:.35+.4*Math.random(),vx:0,vy:0,ry:Math.random()*6,move:'bounce',band:['b','m','h'][i%3],mood:Math.random(),say:'',sayT:0,sc:mob?.11:.13,jy:0})}}
['a3N'].concat(TY.map(function(t){return 'a3'+t[0]})).forEach(function(i){$(i).addEventListener('input',rebuild);$(i).addEventListener('change',rebuild)});rebuild();
function think(f,phrase){var e=E[f.band]*.6+E.l*.4;var pool=e>.6?['jump','spin','headbang','robotPop']:e>.35?['bounce','orbit','sway','spin']:['sway','float','bounce'];if(f.ty=='phoenix'&&e>.4)pool.push('float','orbit');if(f.ty=='robot')pool.push('robotPop');if(f.ty=='wolf')pool.push('headbang');f.move=pool[(Math.random()*pool.length)|0];f.mood=Math.min(1,f.mood*.7+e*.5);
 if(phrase&&$('a3Talk').checked&&Math.random()<.35&&performance.now()-speaking>9000){speaking=performance.now();var ls=LINES[f.ty];f.say=ls[(Math.random()*ls.length)|0];f.sayT=performance.now();try{if(window.speechSynthesis){var u=new SpeechSynthesisUtterance(f.say);u.lang='pl-PL';u.rate=1.1;u.pitch=f.ty=='diablo'?.4:f.ty=='alien'?1.8:1;speechSynthesis.cancel();speechSynthesis.speak(u)}}catch(_){}}}
function bands(){var d=window.X7&&X7.fd,a=window.X7&&X7.a||{level:.4};if(d&&d.length){var n=d.length,s=function(a0,a1){var t=0;for(var i=a0;i<a1;i++)t+=d[i];return t/(a1-a0)/255};E.b=E.b*.6+s(1,Math.max(2,n*.04|0))*.4;E.m=E.m*.6+s(n*.04|0,n*.25|0)*.4;E.h=E.h*.6+s(n*.25|0,n*.7|0)*.4}else{var l=a.level||.3;E.b=E.b*.7+(l+(a.beat?.4:0))*.3;E.m=E.m*.8+l*.8*.2;E.h=E.h*.85+(l*.6+Math.random()*.1)*.15}E.l=a.level||((E.b+E.m+E.h)/3);return !!a.beat}
// ---- Anime FX
var FX=[];function spawnFX(k){var st=$('afSt').value,I=+$('afI').value/100;if(!$('afOn').checked||I<=0)return;var kinds=st=='mix'?['speed','impact','spark','aura','flash']:[st];var n=Math.max(1,Math.round((mob?2:3)*I*(1+k)));for(var i=0;i<n;i++){var kd=kinds[(Math.random()*kinds.length)|0];var f=F.length&&Math.random()<.6?F[(Math.random()*F.length)|0]:null;FX.push({k:kd,x:f?f.x*W:Math.random()*W,y:f?f.y*H:Math.random()*H,t:0,life:kd=='speed'?18:kd=='flash'?8:kd=='aura'?40:28,h:f?f.hue:(Math.random()*360),I:I,a:Math.random()*6.28,s:1+Math.random()})}if(FX.length>(mob?60:140))FX.splice(0,FX.length-(mob?60:140))}
function drawFX(){x.globalCompositeOperation='lighter';for(var i=FX.length-1;i>=0;i--){var f=FX[i],p=f.t/f.life,al=(1-p)*f.I;x.strokeStyle=x.fillStyle='hsla('+f.h+',100%,65%,'+al+')';x.lineWidth=2*DP;
 if(f.k=='speed'){var cx=W/2,cy=H/2;x.beginPath();for(var j=0;j<14;j++){var q=f.a+j*.449,r0=Math.min(W,H)*(.25+p*.3),r1=r0+Math.min(W,H)*.35*f.s;x.moveTo(cx+Math.cos(q)*r0,cy+Math.sin(q)*r0);x.lineTo(cx+Math.cos(q)*r1,cy+Math.sin(q)*r1)}x.stroke()}
 else if(f.k=='impact'){var R=(30+p*160)*DP*f.s;x.beginPath();for(var j=0;j<=16;j++){var q=j/16*6.283,rr=R*(j%2?.55:1);x.lineTo(f.x+Math.cos(q+f.a)*rr,f.y+Math.sin(q+f.a)*rr)}x.closePath();x.stroke();x.beginPath();x.arc(f.x,f.y,R*.3,0,7);x.stroke()}
 else if(f.k=='spark'){for(var j=0;j<6;j++){var q=f.a+j*1.047,rr=p*90*DP*f.s,sx=f.x+Math.cos(q)*rr,sy=f.y+Math.sin(q)*rr,z=(6-p*4)*DP;x.beginPath();x.moveTo(sx-z,sy);x.lineTo(sx,sy-z*.25);x.lineTo(sx+z,sy);x.lineTo(sx,sy+z*.25);x.closePath();x.moveTo(sx,sy-z);x.lineTo(sx+z*.25,sy);x.lineTo(sx,sy+z);x.lineTo(sx-z*.25,sy);x.fill()}}
 else if(f.k=='aura'){var R=(50+20*Math.sin(f.t*.5))*DP*f.s;var g=x.createRadialGradient(f.x,f.y,R*.2,f.x,f.y,R*1.4);g.addColorStop(0,'hsla('+f.h+',100%,60%,0)');g.addColorStop(.6,'hsla('+f.h+',100%,60%,'+al*.5+')');g.addColorStop(1,'hsla('+f.h+',100%,60%,0)');x.fillStyle=g;x.beginPath();x.arc(f.x,f.y,R*1.4,0,7);x.fill();x.beginPath();for(var j=0;j<10;j++){var q=f.a+j*.628+f.t*.08;x.moveTo(f.x+Math.cos(q)*R,f.y+Math.sin(q)*R);x.quadraticCurveTo(f.x+Math.cos(q+.3)*R*1.3,f.y+Math.sin(q+.3)*R*1.3-20*DP,f.x+Math.cos(q)*R*1.1,f.y+Math.sin(q)*R*1.1-40*DP)}x.stroke()}
 else if(f.k=='flash'){x.fillStyle='hsla('+f.h+',100%,85%,'+al*.18+')';x.fillRect(0,0,W,H);x.save();x.translate(f.x,f.y);x.rotate(f.a);x.fillStyle='hsla('+f.h+',100%,75%,'+al*.8+')';x.beginPath();x.moveTo(-120*DP,-6*DP);x.lineTo(120*DP,0);x.lineTo(-120*DP,6*DP);x.fill();x.restore()}
 if(++f.t>f.life)FX.splice(i,1)}x.globalCompositeOperation='source-over'}
// ---- render loop
var t0=performance.now(),last=t0;
function proj(v,f,pose,cx,cy,S){var c=Math.cos(f.ry),s=Math.sin(f.ry),X=v[0]*c+v[2]*s,Z=-v[0]*s+v[2]*c,Y=v[1];var cr=Math.cos(.25),sr=Math.sin(.25);var Y2=Y*cr-Z*sr,Z2=Y*sr+Z*cr;var p=3/(3+Z2);return[cx+X*S*p,cy+Y2*S*p,p]}
function loop(now){requestAnimationFrame(loop);var dt=Math.min(.05,(now-last)/1000);last=now;if(!$('a3On').checked&&!$('afOn').checked){x.clearRect(0,0,W,H);return}var beat=bands();var t=(now-t0)/1000;
 if(beat&&now-lastBeat>180){lastBeat=now;beatN++;window.X7A3beats=beatN;var phrase=beatN%8==0;F.forEach(function(f){if(phrase||Math.random()<.15)think(f,phrase);f.jy=-.06-.08*E[f.band]});spawnFX(E.b)}
 x.clearRect(0,0,W,H);if($('afOn').checked)drawFX();if(!$('a3On').checked)return;
 F.forEach(function(f,i){var e=E[f.band];// avoid others + wander
  F.forEach(function(g,j){if(i==j)return;var dx=f.x-g.x,dy=f.y-g.y,d2=dx*dx+dy*dy+1e-4;if(d2<.03){f.vx+=dx/d2*.0004;f.vy+=dy/d2*.0004}});
  if(f.move=='orbit'){f.vx+=Math.cos(t+i)*.0006;f.vy+=Math.sin(t+i)*.0006}f.vx+=(.5-f.x)*.0002+(Math.random()-.5)*.0004;f.vy+=(.55-f.y)*.0002+(Math.random()-.5)*.0004;f.vx*=.95;f.vy*=.95;f.x=Math.max(.08,Math.min(.92,f.x+f.vx));f.y=Math.max(.2,Math.min(.85,f.y+f.vy));f.jy*=.88;
  var sp=f.move=='spin'?4+6*e:f.move=='robotPop'?(Math.round(t*4)%2?1.5:0):.6+e;f.ry+=sp*dt;var k=e;
  var pose={t:t,k:k,arm:Math.sin(t*(f.move=='headbang'?9:5)+i)*(.4+e),leg:Math.sin(t*6+i)*(f.move=='jump'?1:.4),wing:Math.sin(t*(3+5*e))*.5+.5};
  var bob=f.move=='bounce'?Math.abs(Math.sin(t*4))*-.05:f.move=='float'?Math.sin(t*1.5)*.03:f.move=='sway'?0:0;var cx=f.x*W+(f.move=='sway'?Math.sin(t*2+i)*30*DP:0),cy=(f.y+f.jy+bob)*H;var S=Math.min(W,H)*f.sc*(1+.25*e+(f.move=='jump'?.1:0));
  var L=M[f.ty](pose),h=(f.hue+e*40)%360,pts=$('a3Pts').checked;x.globalCompositeOperation='lighter';x.shadowColor='hsla('+h+',100%,60%,.9)';x.shadowBlur=(mob?8:14)*DP;x.strokeStyle='hsla('+h+',100%,'+(55+e*25)+'%,'+(.55+.4*e)+')';x.fillStyle=x.strokeStyle;x.lineWidth=(1.2+e*1.5)*DP;
  if(f.move=='headbang'){var sh=Math.sin(t*12)*.25;L=L.map(function(pl){return pl.map(function(v){return v[1]<-.4?[v[0],v[1]+sh*.2,v[2]+sh*(v[1]+.4)*-1]:v})})}
  x.beginPath();L.forEach(function(pl){pl.forEach(function(v,j){var P=proj(v,f,pose,cx,cy,S);if(pts){x.rect(P[0]-1.5*DP,P[1]-1.5*DP,3*DP*P[2],3*DP*P[2])}else j?x.lineTo(P[0],P[1]):x.moveTo(P[0],P[1])})});pts?x.fill():x.stroke();
  // scanlines + base ring = hologram
  x.shadowBlur=0;x.lineWidth=1*DP;x.strokeStyle='hsla('+h+',100%,70%,.25)';x.beginPath();x.ellipse(cx,cy+S*1.2,S*.7,S*.15,0,0,7);x.stroke();x.globalCompositeOperation='source-over';
  if(f.say&&now-f.sayT<4000){var n=Math.min(f.say.length,((now-f.sayT)/45)|0),tx=f.say.slice(0,n);x.font=(13*DP)+'px system-ui';var w=x.measureText(tx).width+14*DP;x.fillStyle='rgba(10,0,30,.75)';x.fillRect(cx-w/2,cy-S*1.7-20*DP,w,22*DP);x.fillStyle='#fff';x.fillText(tx,cx-w/2+7*DP,cy-S*1.7-4*DP)}});
 x.globalCompositeOperation='lighter';for(var y=0;y<H;y+=4*DP){x.fillStyle='rgba(0,0,0,0)'}x.globalCompositeOperation='source-over'}
requestAnimationFrame(loop);
window.X7A3={figs:function(){return F.map(function(f){return f.ty+':'+f.move})},E:E,fx:function(){return FX.length}};
})();
