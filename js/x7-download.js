/* 📲 Pobierz aplikację – additive download/install panel (Android APK + PWA install + iPhone/iPad instructions). ✕ / ⛶ / Esc. */
(function(){if(window.X7Download)return;var s=document.currentScript&&document.currentScript.src||'',root=s?s.replace(/js\/[^/]*$/,''):'';
var APK=root+'downloads/C-Mass-G-Unit-v77.apk',H=document.head,dp=null;
function tag(sel,mk){if(!document.querySelector(sel))H.appendChild(mk())}
tag('link[rel=manifest]',function(){var l=document.createElement('link');l.rel='manifest';l.href=root+'gx/manifest.json';return l});
tag('link[rel=apple-touch-icon]',function(){var l=document.createElement('link');l.rel='apple-touch-icon';l.href=root+'gx/icon-shark-180.png';return l});
tag('meta[name=apple-mobile-web-app-capable]',function(){var m=document.createElement('meta');m.name='apple-mobile-web-app-capable';m.content='yes';return m});
try{if('serviceWorker' in navigator&&!navigator.serviceWorker.controller)navigator.serviceWorker.register(root+'sw.js').catch(function(){})}catch(e){}
addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e;var b=document.getElementById('x7dlInst');if(b)b.disabled=false});
var css=document.createElement('style');css.textContent='#x7dlBtn{position:fixed;left:10px;bottom:60px;z-index:2147483000;background:#ff2d55;color:#fff;border:0;border-radius:24px;padding:12px 16px;font:bold 15px system-ui;box-shadow:0 4px 18px #000a;cursor:pointer;min-height:44px}'+
'#x7dl{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(440px,94vw);max-height:90vh;overflow:auto;z-index:2147483001;background:#0a0214f5;color:#fff;border:2px solid #7b2cff;border-radius:16px;padding:14px;font:14px system-ui;display:none;box-sizing:border-box}#x7dl.on{display:block}'+
'#x7dl.fs{inset:0;left:0;top:0;transform:none;width:100vw;height:100vh;max-height:none;border-radius:0}#x7dl a.big,#x7dl button.big{display:block;margin:8px 0;padding:12px;border-radius:12px;background:#3a0a28;border:1px solid #ff2d55;color:#fff;text-decoration:none;font-size:16px;text-align:center;width:100%;box-sizing:border-box}'+
'#x7dl .bar{float:right;display:flex;gap:6px}#x7dl .bar button{min-width:44px;min-height:44px;font-size:20px;border-radius:12px;background:#3a0a28;border:1px solid #ff2d55;color:#fff}#x7dl ol{padding-left:20px}';
H.appendChild(css);
function build(){var b=document.createElement('button');b.id='x7dlBtn';b.type='button';b.textContent='📲 Pobierz aplikację';
var p=document.createElement('div');p.id='x7dl';p.innerHTML='<div class="bar"><button type="button" id="x7dlFs" title="Pełny ekran">⛶</button><button type="button" id="x7dlX" title="Zamknij (Esc)">✕</button></div><h3 style="margin:4px 0">📲 Pobierz aplikację</h3>'+
'<h4>🤖 Android</h4><a class="big" href="'+APK+'" download>⬇️ Pobierz APK v77 (C Mass G Unit, ~38 MB)</a><small>Po pobraniu otwórz plik i zezwól na „instalację z nieznanych źródeł”. APK zawiera wbudowaną (offline) wersję v77.</small>'+
'<button type="button" class="big" id="x7dlInst" disabled>➕ Zainstaluj jako aplikację (Chrome PWA)</button><small id="x7dlNote">Jeśli przycisk jest nieaktywny: Chrome → menu ⋮ → „Zainstaluj aplikację” / „Dodaj do ekranu głównego”.</small>'+
'<h4>🤖 D BOT (telefon)</h4><a class="big" href="'+root+'downloads/Super-Bot-D-DargonMoon.apk" download>⬇️ Super Bot D DargonMoon APK (~47 MB)</a><a class="big" href="'+root+'downloads/SuperBotD-PRO-55.apk" download>⬇️ SuperBotD PRO 55 APK (~30 MB)</a><a class="big" href="'+root+'x7gen.html">🐲 X7 → okno 🤖 D BOT (uruchom aplikację / wyślij stan)</a>'+'<h4>🍏 iPhone / iPad</h4><ol><li>Otwórz tę stronę w <b>Safari</b>.</li><li>Stuknij <b>Udostępnij</b> (kwadrat ze strzałką ⬆️).</li><li>Wybierz <b>„Do ekranu początkowego”</b>.</li><li>Stuknij <b>Dodaj</b> – ikona 🐲 pojawi się na ekranie.</li></ol><small>Apple nie pozwala instalować aplikacji spoza App Store bez konta deweloperskiego – dlatego na iOS działa jako aplikacja webowa (PWA).</small>';
document.body.appendChild(b);document.body.appendChild(p);
b.onclick=function(){p.classList.toggle('on')};document.getElementById('x7dlX').onclick=function(){p.classList.remove('on','fs')};document.getElementById('x7dlFs').onclick=function(){p.classList.toggle('fs')};
var ib=document.getElementById('x7dlInst');if(dp)ib.disabled=false;ib.onclick=function(){if(!dp)return;dp.prompt();dp.userChoice.then(function(){dp=null;ib.disabled=true})};
addEventListener('keydown',function(e){if(e.key=='Escape'&&p.classList.contains('on')){if(p.classList.contains('fs'))p.classList.remove('fs');else p.classList.remove('on')}});
window.X7Download={open:function(){p.classList.add('on')},apk:APK}}
if(document.body)build();else document.addEventListener('DOMContentLoaded',build)})();
