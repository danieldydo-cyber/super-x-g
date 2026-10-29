/* x7 single-window manager for v77 (additive): one window visible at a time, centered & aligned, ✕ / ⛶ / Esc on each. */
(function(){if(window.X7WMLite)return;
var W=[{id:'x7dl',open:function(e){return e.classList.contains('on')},close:function(e){e.classList.remove('on','fs')}},
 {id:'dsbBox',open:function(e){return getComputedStyle(e).display!='none'},close:function(e){var x=[].slice.call(e.querySelectorAll('button')).filter(function(b){return b.textContent.trim()=='✕'&&!b.classList.contains('x7wfs')})[0];if(x)x.click();else e.style.display='none';e.classList.remove('x7fs')}}];
var css=document.createElement('style');css.textContent='.x7wm-win:not(.fs):not(.x7fs){position:fixed!important;left:50%!important;top:12px!important;right:auto!important;bottom:auto!important;transform:translateX(-50%)!important;width:min(560px,calc(100vw - 16px))!important;max-width:none!important;max-height:calc(100vh - 90px)!important;overflow:auto!important;box-sizing:border-box!important}'+
'.x7wm-win.x7fs{position:fixed!important;inset:0!important;left:0!important;top:0!important;width:100vw!important;max-width:none!important;height:100vh!important;max-height:none!important;transform:none!important;border-radius:0!important;box-sizing:border-box!important}'+
'.x7wbar{position:sticky;top:0;display:flex;justify-content:flex-end;gap:6px;z-index:3}.x7wbar button{min-width:44px;min-height:44px;font-size:20px;border-radius:12px;background:#3a0a28;border:1px solid #ff2d55;color:#fff}';
document.head.appendChild(css);var front=null,busy=false;
function each(f){W.forEach(function(w){var e=document.getElementById(w.id);if(e)f(w,e)})}
function setup(w,e){if(e.dataset.x7wm)return;e.dataset.x7wm='1';e.classList.add('x7wm-win');
 if(!e.querySelector('.pfs,#x7dlFs')){var b=document.createElement('div');b.className='x7wbar';b.innerHTML='<button type="button" class="x7wfs" title="Pełny ekran">⛶</button>';b.firstChild.onclick=function(ev){ev.stopPropagation();e.classList.toggle('x7fs')};e.insertBefore(b,e.firstChild)}
 new MutationObserver(function(){if(busy)return;if(w.open(e)&&front!==w.id){busy=true;front=w.id;each(function(w2,e2){if(w2.id!==w.id&&w2.open(e2))w2.close(e2)});busy=false}else if(!w.open(e)&&front===w.id){front=null;e.classList.remove('x7fs')}}).observe(e,{attributes:true,attributeFilter:['class','style']})}
function scan(){each(setup)}scan();setInterval(scan,1500);
addEventListener('keydown',function(ev){if(ev.key!='Escape')return;each(function(w,e){if(w.open(e)){if(e.classList.contains('x7fs'))e.classList.remove('x7fs');else w.close(e)}})});
window.X7WMLite={visible:function(){var v=[];each(function(w,e){if(w.open(e))v.push(w.id)});return v}};})();
