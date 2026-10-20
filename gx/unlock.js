/* Honest unlock: Daniel sends a code manually after seeing the payment. Only SHA-256 hashes live here (placeholder list, no real codes).
   To add a code: echo -n "GX-XXXX-XXXX" | sha256sum  → paste hash below → push. Client-side check = honor system, not DRM. */
window.GX_CODE_HASHES=[
 'b3f9edb06fa14258a6eeea176f1ab4b2fd1c35a361c05cc311aaef3ca9eb0ea2',
 'c58f150e87c7bc9a25372d7c31f5877abb8cf40a5e312c01b550f30873ec3731',
 '42746f6b549f0c00461f40559a755277bdc6e35737017ebf5ad382d63f5db72d',
 'd2bed5db9dfdcdd1144ea57fa4d0a27b5a16b1ecf37ecc9203060409c3a7827b',
 'a41a71a63ccc93eb0ab37fa0501be29185e142b0fdd2e083eac7934f02284ea6',
 '8acb05c3d4b186d36b6e4e4375a750ac1b4b28aadaf63c79e7c74f8e523321ab',
 '097f509c8bbdf55bfa8615ee8c665bf953381a0e360e42fd0ba8287bd19ee03a',
 '09860b69337758919181b239c992dfc4be5e40d65be8b8318dfc69422f28d119',
 'dc7c9713ae44ea7e1395a5b39a4e7347a4edb47847cab2cd3697fe85eff24aaf',
 '882a063beff2aff585c623c2034db7fbe9a2da39abe4b15337356322ae6e354c',
 '1d0aed746970bcb2fce4c8acd24d0c3dea59906f85ba317164d7ec30038c080f',
 '3de5ea3b3b4237ac8b91a57dacbae2f46ad26468418983eb1cf4a95db73d7b5c',
 'be95bfd84192c0c27c86f6f400912b18d3a7eb81b8c97bc0164618f24c13191b',
 '3e96fa751b2e53e7009f646ce204471b355a3f29c178a323603add99f98f09d4',
 '1140299860709e2ad520b5dee7c67722d685e4789ee4aa1d9b571955cec8dbf6',
 '20679c52c4dc665d9650be86e39ce73580cbd503f3c943264761e10c92d3f56d',
 'cffd2739b30965290dbf6a4ec73deceea76a241fac8a107e2c30fe58785919cc',
 '922e47fbbb0045184793ba11dc48fede293a726bfc501e677dd9ea7135dab9dc',
 '15f34299f615c9bf203662b47e44163d675015f5c902b6b46c8dd65e76cb92d4',
 '66160cdca06a23f1539ae6868d19aca02d44ed4cbd1f8f16623e01da71ae410e'
];
window.GXUnlock={
 full:function(){return localStorage.getItem('gx_full')==='1'},
 hash:async function(s){var b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s.trim().toUpperCase()));return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')},
 tryCode:async function(c){var h=await this.hash(c);if(GX_CODE_HASHES.indexOf(h)>=0){localStorage.setItem('gx_full','1');return true}return false}};
