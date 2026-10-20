/* Super Bot G Pro add-on: 😈 Devil accent theme, full bots panel from bots.json (selectable teammates, route Multibot to a bot),
 * title/branding. Keeps G's Multibot intact. */
(function () {
  'use strict';
  var $ = function (i) { return document.getElementById(i); };
  // ---- themes
  var THEMES = { neon: { '--n1': '#0ff', '--n2': '#f0f', '--n3': '#7f0', '--bg': '#07070c', '--p': '#11111c', bg: 'radial-gradient(circle at 50% 0,#1a0830,#07070c 60%)' },
    devil: { '--n1': '#ff3b1f', '--n2': '#ff0844', '--n3': '#ffb000', '--bg': '#0c0303', '--p': '#1c0808', bg: 'radial-gradient(circle at 50% 0,#4a0606,#0c0303 62%)' } };
  function theme(n) { var t = THEMES[n] || THEMES.neon; for (var k in t) if (k[0] === '-') document.documentElement.style.setProperty(k, t[k]); document.body.style.background = t.bg; document.body.dataset.theme = n; try { localStorage.gproTheme = n; } catch (_) {} var b = $('gpTheme'); if (b) b.textContent = n === 'devil' ? '😈 Devil' : '💠 Neon'; }
  var st = document.createElement('style');
  st.textContent = 'body[data-theme=devil] h1::after{content:" 😈";}body[data-theme=devil] .panel{border-color:#f303;box-shadow:0 0 14px #f202 inset}body[data-theme=devil] .bot{border-color:#f306}' +
    '.bot{cursor:pointer;position:relative}.bot.sel{background:var(--n2);color:#000;box-shadow:0 0 14px var(--n2)}.bot.sel b,.bot.sel small{color:#000!important}.bot .em{font-size:22px;display:block}.gp-bar{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:6px}.gp-bar input{background:#000;color:var(--n3);border:1px solid var(--n3);padding:5px;font-family:inherit;flex:1;min-width:120px}.gp-to{color:var(--n3);font-size:11px}';
  document.head.appendChild(st);
  document.title = 'Super Bot G Pro · Daniel Dydo';
  var h1 = document.querySelector('h1'); if (h1) h1.innerHTML = 'SUPER BOT G<small>PRO · G DJ SUPER PRO · MULTIBOT</small>';
  var hdr = document.querySelector('header span'); if (hdr) { var tb = document.createElement('button'); tb.id = 'gpTheme'; tb.title = 'Motyw: Neon / 😈 Devil'; tb.onclick = function () { theme(document.body.dataset.theme === 'devil' ? 'neon' : 'devil'); }; hdr.appendChild(tb); }
  theme((function () { try { return localStorage.gproTheme || 'neon'; } catch (_) { return 'neon'; } })());
  // ---- bots
  var EM = { G: '🎛', SuperGrok: '🧠', '77': '🎹', DargonMoon: '🌙', AutoFix: '🛠', SuperCharger: '⚡', D: '👽', Dragon: '🐉', SuperBotD: '🤖', MoePieseDevil: '😈' };
  var list = (typeof BOTS !== 'undefined' ? BOTS : []).slice(), sel = {};
  try { sel = JSON.parse(localStorage.gproSel || '{}'); } catch (_) {}
  function url(b) { return b.url || 'grokbot://app/v1/agent?id=' + encodeURIComponent(b.id); }
  function save() { try { localStorage.gproSel = JSON.stringify(sel); } catch (_) {} }
  function selected() { return list.filter(function (b) { return sel[b.id]; }); }
  function render() {
    var box = $('bots'); if (!box) return; var host = box.parentNode, bar = $('gpBar');
    if (!bar) { bar = document.createElement('div'); bar.id = 'gpBar'; bar.className = 'gp-bar'; bar.innerHTML = '<input id="gpFind" placeholder="szukaj bota…"><button id="gpAll">✓ wszystkie</button><button id="gpNone">✕ żaden</button><button id="gpCopy">📋 linki</button><span class="gp-to" id="gpTo"></span>'; host.insertBefore(bar, box);
      $('gpFind').oninput = render; $('gpAll').onclick = function () { list.forEach(function (b) { sel[b.id] = 1; }); save(); render(); }; $('gpNone').onclick = function () { sel = {}; save(); render(); };
      $('gpCopy').onclick = function () { var t = selected().concat(selected().length ? [] : list).map(function (b) { return b.name + ' → ' + url(b); }).join('\n'); try { navigator.clipboard.writeText(t); } catch (_) {} this.textContent = '📋 skopiowano'; var me = this; setTimeout(function () { me.textContent = '📋 linki'; }, 1500); }; }
    var q = ($('gpFind').value || '').toLowerCase(); box.innerHTML = '';
    list.filter(function (b) { return !q || b.name.toLowerCase().indexOf(q) >= 0; }).forEach(function (b) {
      var c = document.createElement('div'); c.className = 'bot' + (sel[b.id] ? ' sel' : ''); c.dataset.id = b.id; c.title = 'Kliknij, aby zaznaczyć · ↗ otwiera bota';
      c.innerHTML = '<span class="em"></span><b></b><small></small><br><a class="open" target="_blank" rel="noopener">↗ otwórz</a>';
      c.querySelector('.em').textContent = EM[b.name] || '🤖'; c.querySelector('b').textContent = b.name; c.querySelector('small').textContent = sel[b.id] ? '● wybrany' : '○ ' + b.id.slice(0, 8); c.querySelector('a').href = url(b);
      c.onclick = function (e) { if (e.target.tagName === 'A') return; if (sel[b.id]) delete sel[b.id]; else sel[b.id] = 1; save(); render(); };
      box.appendChild(c);
    });
    var s = selected(); $('gpTo').textContent = s.length ? 'Multibot → ' + s.map(function (b) { return b.name; }).join(', ') : 'Multibot → G (lokalnie)';
  }
  fetch('bots.json', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (j) { if (j && j.bots && j.bots.length) { list = j.bots; render(); } }).catch(function () {});
  render();
  // ---- Multibot: "bot X" / "do X: …" selects/addresses a teammate (links stay local: grokbot:// opens the bot app)
  var orig = window.handle;
  if (typeof orig === 'function') window.handle = function (text, quiet) {
    var t = String(text || ''), m = t.match(/^\s*(?:bot|do)\s+([^:]+?)\s*(?::\s*(.*))?$/i);
    if (m) { var b = list.filter(function (x) { return x.name.toLowerCase() === m[1].toLowerCase(); })[0];
      if (b) { sel = {}; sel[b.id] = 1; save(); render(); say('u', t); say('b', 'Wybrany bot: ' + (EM[b.name] || '🤖') + ' ' + b.name + (m[2] ? ' — zadanie: „' + m[2] + '” (otwórz ↗ ' + b.name + ', aby wysłać)' : '') + ' · ' + url(b)); return; } }
    return orig.apply(this, arguments);
  };
  window.GPro = { theme: theme, bots: function () { return list; }, selected: selected };
})();
