/* Honest unlock: Daniel sends a code manually after seeing the payment. Only SHA-256 hashes live here (placeholder list, no real codes).
   To add a code: echo -n "GX-XXXX-XXXX" | sha256sum  → paste hash below → push. Client-side check = honor system, not DRM. */
window.GX_CODE_HASHES=[
 /* 'sha256-hex-placeholder', */
];
window.GXUnlock={
 full:function(){return localStorage.getItem('gx_full')==='1'},
 hash:async function(s){var b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s.trim().toUpperCase()));return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')},
 tryCode:async function(c){var h=await this.hash(c);if(GX_CODE_HASHES.indexOf(h)>=0){localStorage.setItem('gx_full','1');return true}return false}};
