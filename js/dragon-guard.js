/* Dragon D Pro – 🛡 Strażnik: anti-white/black/flat watchdog, freeze recovery, WebGL context loss, idle preset pre-warm, static + session blacklist. */
(function(){var D=window.DDI;if(!D)return;var mob=innerWidth<700;
var BAD=window.DDbad={};(window.DDbadStatic||[]).forEach(function(k){BAD[k]='static'});var LS={};try{LS=JSON.parse(localStorage.dd_bl||'{}')}catch(e){}for(var k in LS)BAD[k]=LS[k];
var sc=document.createElement('canvas');sc.width=sc.height=8;var sx=sc.getContext('2d',{willReadFrequently:true});
var G=window.DDguard={s:null,ev:{white:0,black:0,flat:0,freeze:0,stall:0,err:0,ctx:0},maxBad:0,strikes:{},recover:recover,err:err,BAD:BAD,log:[]};
var busy=false,nextS=0,badT=0,badK='',lastH=-1,hT=0,lastT=0,errs=[],ep=0;
function SRC(){return window.DDpost&&DDpost.active?DDpost.canvas:D.mv}
function log(x){G.log.push(Math.round(performance.now())+' '+x);if(G.log.length>40)G.log.shift()}
function save(){var o={};for(var k in BAD)if(BAD[k]!='static')o[k]=BAD[k];try{localStorage.dd_bl=JSON.stringify(o)}catch(e){}}
function recover(kind,hard){G.ev[kind]=(G.ev[kind]||0)+1;var k=D.cur;log(kind+' '+k);
 if(kind=='white'||kind=='black'||kind=='flat'){G.strikes[k]=(G.strikes[k]||0)+1;if(G.strikes[k]>=2){BAD[k]=kind;save()}D.pick(false,0);return}
 if(hard)D.rebuild();else{try{D.load(k,0)}catch(e){D.rebuild()}}}
function err(e,where){var n=performance.now();errs.push(n);errs=errs.filter(function(x){return n-x<2000});G.ev.err++;log('err '+where+' '+(e&&e.message||e).toString().slice(0,60));if(errs.length>=3){errs=[];G.ev.freeze++;D.rebuild()}}
// rAF stall detection
window.DDtick=function(t){if(lastT&&t-lastT>500&&!(window.DDhid&&t-DDhid<1000)){G.ev.stall++;log('stall '+Math.round(t-lastT));D.load(D.cur,0)}lastT=t};
// async downscaled readback every ~250 ms (500 ms while converting)
window.DDafter=function(t){if(busy||t<nextS||!window.createImageBitmap)return;nextS=t+(window.DDconvBusy?500:250);busy=true;var c=SRC();if(!c.width){busy=false;return}
 createImageBitmap(c,{resizeWidth:8,resizeHeight:8,resizeQuality:'low'}).then(function(bm){sx.drawImage(bm,0,0);bm.close&&bm.close();var d=sx.getImageData(0,0,8,8).data,sl=0,s2=0,ss=0,h=0;
  for(var i=0;i<256;i+=4){var R=d[i]/255,Gg=d[i+1]/255,B=d[i+2]/255,l=R*.3+Gg*.59+B*.11,mx=Math.max(R,Gg,B),mn=Math.min(R,Gg,B);sl+=l;s2+=l*l;ss+=mx>0?(mx-mn)/mx:0;h=(h*31+d[i]+d[i+1]*7+d[i+2]*13)|0}
  sl/=64;var sd=Math.sqrt(Math.max(0,s2/64-sl*sl));ss/=64;G.s={lum:+sl.toFixed(3),sat:+ss.toFixed(3),sd:+sd.toFixed(3),h:h,k:D.cur};judge(performance.now(),sl,sd,ss,h)}).catch(function(){}).then(function(){busy=false})};
function judge(n,l,sd,s,h){if(window.DDscan||!D.cur)return;var kind=l>.86&&s<.25?'white':l<.04?'black':sd<.012&&l<.2?'flat':'';
 if(kind){if(!badT){badT=n;badK=kind}var dur=n-badT;G.maxBad=Math.max(G.maxBad,dur);if(dur>=400){badT=0;recover(badK)}}else badT=0;
 if(h!==lastH){lastH=h;hT=n}else if(n-hT>2000&&D.playing&&!document.hidden){hT=n;recover('freeze',G.ev.freeze%3==2)}}
// WebGL context loss / restore
D.mv.addEventListener('webglcontextlost',function(e){e.preventDefault();G.ev.ctx++;log('ctx lost')});D.mv.addEventListener('webglcontextrestored',function(){log('ctx restored');D.rebuild()});
if(window.DDpost&&DDpost.canvas)DDpost.canvas.addEventListener('webglcontextlost',function(e){e.preventDefault();G.ev.ctx++;var s=document.getElementById('sty');if(s){s.value='0';s.onchange&&s.onchange()}log('post ctx lost → oryginał')});
// idle pre-pick + pre-warm next preset (desktop: compile shaders in a tiny hidden visualizer so the GPU program cache is hot)
var ric=window.requestIdleCallback||function(f){return setTimeout(function(){f({timeRemaining:function(){return 10}})},200)},wv=null,wc=null;
function warm(){ric(function(){try{if(!D.recOn&&!window.DDconvBusy&&!window.DDnext){var L=D.pool('any');var k=L[(Math.random()*L.length)|0];if(k&&k!=D.cur){var p=D.nb(k);window.DDnext=k;
  if(!mob&&window.butterchurn){if(!wv){wc=document.createElement('canvas');wc.width=wc.height=32;var bc=butterchurn.default||butterchurn;wv=bc.createVisualizer(D.ac,wc,{width:32,height:32,pixelRatio:1,textureRatio:1})}wv.loadPreset(p,0);wv.render()}}}}catch(e){}setTimeout(warm,700)},{timeout:2000})}setTimeout(warm,2500);
// throttle ffmpeg conversion: start only when idle and not recording
var oc=window.DDconv;if(oc)window.DDconv=function(){return new Promise(function(ok){(function w(){if(D.recOn)return setTimeout(w,500);ric(function(){window.DDconvBusy=true;ok(oc().then(function(r){window.DDconvBusy=false;return r},function(e){window.DDconvBusy=false;throw e}))},{timeout:1500})})()})};
})();
