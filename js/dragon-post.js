/* Dragon D Pro – 🎨 Styl: GPU post-process (WebGL) – vivid / glass / metal / liquid / magic + sharpen + tone map. Also recorded. */
(function(){var $=function(i){return document.getElementById(i)},D=window.DDI;if(!D)return;var mv=D.mv,mob=innerWidth<700;
var po=document.createElement('canvas');po.id='po';po.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;z-index:0;pointer-events:none';mv.parentNode.insertBefore(po,mv.nextSibling);
var gl=po.getContext('webgl',{alpha:false,antialias:false,premultipliedAlpha:false,preserveDrawingBuffer:false});if(!gl){po.remove();return}
var VS='attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0,1);}';
var FS='precision mediump float;varying vec2 uv;uniform sampler2D T;uniform vec2 px;uniform float tm,bt,st,mt,sh,en,kk;\n'+
'float L(vec3 c){return dot(c,vec3(.299,.587,.114));}vec3 hue(vec3 c,float a){const vec3 k=vec3(.57735);float ca=cos(a);return c*ca+cross(k,c)*sin(a)+k*dot(k,c)*(1.-ca);}\n'+
'vec3 aces(vec3 x){return clamp(x*(2.51*x+.03)/(x*(2.43*x+.59)+.14),0.,1.);}float h21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}\n'+
'vec3 S(vec2 u){return texture2D(T,u).rgb;}\n'+
'void main(){vec2 u=uv;if(st==4.){float a=.006+.02*bt;u+=vec2(sin(u.y*9.+tm*1.3)+sin(u.y*23.-tm*2.1)*.4,cos(u.x*8.-tm*1.1)+cos(u.x*19.+tm*1.7)*.4)*a;}\n'+
' vec3 c=S(u);vec3 l=S(u-vec2(px.x,0.)),r=S(u+vec2(px.x,0.)),d=S(u-vec2(0.,px.y)),t=S(u+vec2(0.,px.y));\n'+
' c+=(c*4.-l-r-d-t)*sh;vec3 n=normalize(vec3((L(l)-L(r))*6.,(L(d)-L(t))*6.,1.));float y=L(c);\n'+
' if(st==1.||st==4.){c=mix(vec3(y),c,1.75+en*.4);c=pow(max(c,0.),vec3(.9))*1.25;}\n'+
' else if(st==2.){vec2 o=n.xy*.012;c=vec3(S(u+o*1.3).r,S(u+o).g,S(u+o*.7).b);c=mix(vec3(L(c)),c,1.6);float sp=pow(max(dot(n,normalize(vec3(-.4,.5,.75))),0.),40.);float edge=clamp(length(n.xy)*2.,0.,1.);c=c*(.85+.3*edge)+vec3(sp)*(.7+bt*.5)+vec3(.15,.25,.35)*edge*.4;}\n'+
' else if(st==3.){vec3 rf=reflect(vec3(0.,0.,-1.),n);float e=.5+.5*rf.y;float band=.55+.45*sin(rf.x*7.+rf.y*5.+tm*.3);vec3 tint=mt==0.?vec3(1.,.78,.35):mt==1.?vec3(.86,.9,.97):vec3(.95,.97,1.);vec3 env=mix(vec3(.08,.07,.1),tint,smoothstep(.15,.95,e*band));float sp=pow(max(dot(n,normalize(vec3(.3,.6,.7))),0.),30.);c=env*(.55+.9*y)+mix(vec3(y),c,1.4)*.35+sp*(.8+bt*.6);if(mt==2.)c=mix(c,c*vec3(.7,.9,1.3),.35);}\n'+
' else if(st==5.){vec3 g=vec3(0.);for(int i=0;i<8;i++){float a=float(i)*.785;g+=S(u+vec2(cos(a),sin(a))*px*6.);}g/=8.;c=mix(vec3(y),c,1.6)+g*(.45+bt*.4);c=hue(c,tm*.25);vec2 q=floor(u/px/4.);float h=h21(q+floor(tm*6.));c+=vec3(1.,.95,.8)*step(.985,h)*smoothstep(.45,.9,L(g))*2.;}\n'+
' if(kk>.02){float o=kk*.012;c.r=mix(c.r,S(u+vec2(o,0.)).r*1.1,.8);c.b=mix(c.b,S(u-vec2(o,0.)).b*1.1,.8);c*=1.+kk*.18;}\n c=aces(clamp(c,0.,1.8)*.92);c=min(c,vec3(.94));gl_FragColor=vec4(c,1.);}';
function sh_(t,src){var s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))console.warn(gl.getShaderInfoLog(s));return s}
var pr=gl.createProgram();gl.attachShader(pr,sh_(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh_(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){po.remove();return}gl.useProgram(pr);
var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);var pa=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(pa);gl.vertexAttribPointer(pa,2,gl.FLOAT,false,0,0);
var tx=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tx);[gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(function(k){gl.texParameteri(gl.TEXTURE_2D,k,gl.CLAMP_TO_EDGE)});gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
var U={};['px','tm','bt','st','mt','sh','en','kk'].forEach(function(k){U[k]=gl.getUniformLocation(pr,k)});
var cur=1,beat=0,dark={},lastP='',chk=0,pix=new Uint8Array(4*64),STY=[1,2,3,4,5];
var P=window.DDpost={canvas:po,get active(){return cur>0},get style(){return cur},dark:dark,run:run};
function setStyle(){var v=$('sty').value;if(v!='mix')cur=+v;po.style.display=cur>0?'block':'none';mv.style.opacity=cur>0?0:1}$('sty').onchange=setStyle;setStyle();
function run(t,r){if($('sty').value=='mix'&&r&&r.bt&&window.DDphase&&DDphase(+$('dvB').value)){cur=STY[(STY.indexOf(cur)+1)%STY.length];}
 if(cur<=0){po.style.display='none';mv.style.opacity=1;return}po.style.display='block';mv.style.opacity=0;
 if(po.width!=mv.width||po.height!=mv.height){po.width=mv.width;po.height=mv.height;gl.viewport(0,0,po.width,po.height)}
 if(r&&r.bt)beat=1;beat*=.85;po.style.filter=mv.style.filter;po.style.scale=mv.style.scale;
 gl.bindTexture(gl.TEXTURE_2D,tx);try{gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,mv)}catch(e){return}
 gl.uniform2f(U.px,1/po.width,1/po.height);gl.uniform1f(U.tm,t/1000);gl.uniform1f(U.bt,beat);gl.uniform1f(U.st,cur);gl.uniform1f(U.mt,+$('mtl').value);gl.uniform1f(U.sh,mob?.12:(po.width>innerWidth?.18:.3));gl.uniform1f(U.en,D.E.b||0);gl.uniform1f(U.kk,window.DDrgbK?(window.DDkick||0):0);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
 // bright/colourful preset filter: sample output ~1.5 s after a preset change
 var k=D.cur;if(k!==lastP){lastP=k;chk=t+1500}if($('bri').checked&&chk&&t>chk&&window.DDguard&&DDguard.s){chk=0;var g=DDguard.s;P.last={lum:g.lum,sat:g.sat,k:k};if(g.lum<.1||g.sat<.15){dark[k]=1;P.skipped=(P.skipped||0)+1;D.pick(false,.3)}}else if($('bri').checked&&chk&&t>chk){chk=0;var W=po.width,H=po.height,i=0,sl=0,ss=0;for(var yy=0;yy<8;yy++)for(var xx=0;xx<8;xx++){gl.readPixels(((xx+.5)/8*W)|0,((yy+.5)/8*H)|0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pix.subarray(i*4,i*4+4));i++}
  for(i=0;i<64;i++){var R=pix[i*4]/255,G=pix[i*4+1]/255,B=pix[i*4+2]/255,mx=Math.max(R,G,B),mn=Math.min(R,G,B);sl+=(R*.3+G*.59+B*.11);ss+=mx>0?(mx-mn)/mx:0}sl/=64;ss/=64;P.last={lum:+sl.toFixed(3),sat:+ss.toFixed(3),k:k};
  if(sl<.1||ss<.15){dark[k]=1;P.skipped=(P.skipped||0)+1;D.pick(false,.3)}}}
// make pool skip dark presets (wrap DDI.pick: retry when dark)
var op=D.pick;D.pick=function(m,bl){for(var i=0;i<6;i++){op(m,bl);if(!$('bri').checked||!dark[D.cur])return}};
})();
