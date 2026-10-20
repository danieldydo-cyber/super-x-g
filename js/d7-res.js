/* v66: shared resolution setting (auto/720/1080/1440/4k, localStorage d7res), beat bus from launcher radio, robust fullscreen with CSS fallback */
(function(){if(window.D7Res)return;var M={'720':[1280,720],'1080':[1920,1080],'1440':[2560,1440],'4k':[3840,2160]};
 function key(){var k='auto';try{k=localStorage.getItem('d7res')||'auto'}catch(e){}return M[k]||k=='auto'?k:'auto'}
 window.D7Res={key:key,cap:function(){var k=key();if(M[k])return M[k];var ph=/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)||Math.min(screen.width,screen.height)<700;return ph?M['720']:M['1080']},
  fit:function(w,h){var c=this.cap(),s=Math.min(1,c[0]/Math.max(w,h,1),c[1]/Math.max(Math.min(w,h),1));return[Math.max(2,Math.round(w*s)),Math.max(2,Math.round(h*s))]},
  set:function(k){try{localStorage.setItem('d7res',k)}catch(e){}window.dispatchEvent(new Event('d7res'));window.dispatchEvent(new Event('resize'));try{[].forEach.call(document.querySelectorAll('iframe'),function(f){f.contentWindow.postMessage({type:'d7:res',key:k},'*')})}catch(e){}}};
 window.D7Beat={level:0,beat:0,t:0};
 window.addEventListener('message',function(e){var d=e.data;if(!d||e.source!==window.parent)return;
  if(d.type=='d7:res'){window.dispatchEvent(new Event('d7res'));window.dispatchEvent(new Event('resize'))}
  if(d.type=='d7:beat'){D7Beat.level=d.level;D7Beat.t=Date.now();if(d.beat){D7Beat.beat++;document.documentElement.style.setProperty('--d7beat',String(d.level));try{window.dispatchEvent(new CustomEvent('d7beat',{detail:d}))}catch(x){}}}});
 var css=document.createElement('style');css.textContent='.d7fsfake{position:fixed!important;inset:0!important;z-index:2147483000!important;width:100vw!important;height:100vh!important;max-width:none!important;max-height:none!important;margin:0!important;background:#000}';(document.head||document.documentElement).appendChild(css);
 window.D7FS={el:function(){return document.fullscreenElement||document.webkitFullscreenElement||document.querySelector('.d7fsfake')},
  on:function(el){el=el||document.documentElement;var r=el.requestFullscreen||el.webkitRequestFullscreen||el.webkitEnterFullscreen,fake=function(){el.classList.add('d7fsfake');window.dispatchEvent(new Event('resize'))};
   if(!r)return fake();try{var p=r.call(el,{navigationUI:'hide'});if(p&&p.catch)p.catch(fake)}catch(e){fake()}},
  off:function(){var f=document.querySelector('.d7fsfake');if(f){f.classList.remove('d7fsfake');window.dispatchEvent(new Event('resize'))}var x=document.exitFullscreen||document.webkitExitFullscreen;if(x&&(document.fullscreenElement||document.webkitFullscreenElement))try{var p=x.call(document);if(p&&p.catch)p.catch(function(){})}catch(e){}},
  toggle:function(el){if(this.el())this.off();else this.on(el)}};
})();
