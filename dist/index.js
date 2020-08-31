/*! 基于时间的动态码 */
!function(r,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.otp=e():r.otp=e()}(global,(function(){return function(r){var e={};function n(t){if(e[t])return e[t].exports;var o=e[t]={i:t,l:!1,exports:{}};return r[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=r,n.c=e,n.d=function(r,e,t){n.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:t})},n.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},n.t=function(r,e){if(1&e&&(r=n(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var o in r)n.d(t,o,function(e){return r[e]}.bind(null,o));return t},n.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return n.d(e,"a",e),e},n.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},n.p="",n(n.s=0)}([function(r,e,n){const t=n(1),o=n(2);function i(r){if(this.secret=r.secret||"",""==this.secret)throw new Error("seed is empty");this.digits=r.digits||6,this.digest=r.digest||"SHA-1",this.interval=r.interval||60,this.offset=r.offset||0,this.name=String(r.name||"myotp").split(/[^\w|_|-|@]/).join(""),this.hmacObj=new t(this.digest,"BYTES"),this.hmacObj.setHMACKey(this.docodeSecret(this.secret),"BYTES")}i.prototype.docodeSecret=function(r){return o.decode(r).toString()},i.prototype.generate_otp=function(r){let e=this.hmacObj;e.update(this.int_to_bytestring(r),1);let n=e.getHMAC("BYTES").split(""),t=15&n[n.length-1].charCodeAt(),o=(127&n[t].charCodeAt())<<24|(255&n[t+1].charCodeAt())<<16|(255&n[t+2].charCodeAt())<<8|255&n[t+3].charCodeAt();return(new Array(this.digits+1).join("0")+o).slice(-1*this.digits)},i.prototype.generate_now=function(r){r=r||0;let e=Math.floor(Date.now()/1e3)-this.offset,n=parseInt(e/this.interval);return n+=r,this.generate_otp(n)},i.prototype.check_now=function(r,e){e=e||0;const n=e=Math.abs(e);let t;for(let o=-e;o<=n;o++)if(t=this.generate_now(o),console.log(t),t==r)return!0;return!1},i.prototype.int_to_bytestring=function(r,e){e=e||8;let n=r,t=[];for(;0!==n;)t.push(String.fromCharCode(255&n)),n>>=8;return t=t.reverse(),t=this.arr_rjust(t,e).join(""),t},i.prototype.arr_rjust=function(r,e){let n=r;if(e<=n.length)return n=n.splice(n.length-1-e),n;let t=e-n.length;for(let r=0;r<t;r+=1)n.unshift(String.fromCharCode(0));return n},i.prototype.getOtpUrl=function(){const r=["secret="+encodeURIComponent(this.secret),"period="+this.interval,"digits="+this.digits];return["otpauth://totp/",this.name,"?",r.join("&")].join("")},r.exports=i},function(r,e,n){var t;
/**
 * @preserve A JavaScript implementation of the SHA family of hashes, as
 * defined in FIPS PUB 180-4 and FIPS PUB 202, as well as the corresponding
 * HMAC implementation as defined in FIPS PUB 198a
 *
 * Copyright Brian Turek 2008-2017
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 *
 * Several functions taken from Paul Johnston
 */!function(o){"use strict";var i,h,w,u;function f(r,e){this.highOrder=r,this.lowOrder=e}function d(r,e,n,t){var o,i,h,w="",u=e/8;for(h=-1===n?3:0,o=0;o<u;o+=1)i=r[o>>>2]>>>8*(h+n*(o%4)),w+="0123456789abcdef".charAt(i>>>4&15)+"0123456789abcdef".charAt(15&i);return t.outputUpper?w.toUpperCase():w}function a(r,e,n,t){var o,i,h,w,u,f,d="",a=e/8;for(f=-1===n?3:0,o=0;o<a;o+=3)for(w=o+1<a?r[o+1>>>2]:0,u=o+2<a?r[o+2>>>2]:0,h=(r[o>>>2]>>>8*(f+n*(o%4))&255)<<16|(w>>>8*(f+n*((o+1)%4))&255)<<8|u>>>8*(f+n*((o+2)%4))&255,i=0;i<4;i+=1)d+=8*o+6*i<=e?"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(h>>>6*(3-i)&63):t.b64Pad;return d}function l(r,e,n){var t,o,i,h="",w=e/8;for(i=-1===n?3:0,t=0;t<w;t+=1)o=r[t>>>2]>>>8*(i+n*(t%4))&255,h+=String.fromCharCode(o);return h}function s(r,e,n){var t,o,i,h=e/8,w=new ArrayBuffer(h);for(i=new Uint8Array(w),o=-1===n?3:0,t=0;t<h;t+=1)i[t]=r[t>>>2]>>>8*(o+n*(t%4))&255;return w}function c(r){var e,n={outputUpper:!1,b64Pad:"=",shakeLen:-1};if(e=r||{},n.outputUpper=e.outputUpper||!1,!0===e.hasOwnProperty("b64Pad")&&(n.b64Pad=e.b64Pad),!0===e.hasOwnProperty("shakeLen")){if(e.shakeLen%8!=0)throw new Error("shakeLen must be a multiple of 8");n.shakeLen=e.shakeLen}if("boolean"!=typeof n.outputUpper)throw new Error("Invalid outputUpper formatting option");if("string"!=typeof n.b64Pad)throw new Error("Invalid b64Pad formatting option");return n}function O(r,e,n){var t;switch(e){case"UTF8":case"UTF16BE":case"UTF16LE":break;default:throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE")}switch(r){case"HEX":t=function(r,e,t){return function(r,e,n,t){var o,i,h,w,u,f,d,a=r.length;if(0!=a%2)throw new Error("String of HEX type must be in byte increments");for(o=e||[0],f=(n=n||0)>>>3,d=-1===t?3:0,i=0;i<a;i+=2){if(h=parseInt(r.substr(i,2),16),isNaN(h))throw new Error("String of HEX type contains invalid characters");for(w=(u=(i>>>1)+f)>>>2;o.length<=w;)o.push(0);o[w]|=h<<8*(d+t*(u%4))}return{value:o,binLen:4*a+n}}(r,e,t,n)};break;case"TEXT":t=function(r,t,o){return function(r,e,n,t,o){var i,h,w,u,f,d,a,l,s,c,O=0;if(i=n||[0],d=(t=t||0)>>>3,"UTF8"===e)for(s=-1===o?3:0,u=0;u<r.length;u+=1)for(w=[],128>(h=r.charCodeAt(u))?w.push(h):2048>h?(w.push(192|h>>>6),w.push(128|63&h)):55296>h||57344<=h?w.push(224|h>>>12,128|h>>>6&63,128|63&h):(u+=1,h=65536+((1023&h)<<10|1023&r.charCodeAt(u)),w.push(240|h>>>18,128|h>>>12&63,128|h>>>6&63,128|63&h)),f=0;f<w.length;f+=1){for(a=(l=O+d)>>>2;i.length<=a;)i.push(0);i[a]|=w[f]<<8*(s+o*(l%4)),O+=1}else if("UTF16BE"===e||"UTF16LE"===e)for(s=-1===o?2:0,c="UTF16LE"===e&&1!==o||"UTF16LE"!==e&&1===o,u=0;u<r.length;u+=1){for(h=r.charCodeAt(u),!0===c&&(h=(f=255&h)<<8|h>>>8),a=(l=O+d)>>>2;i.length<=a;)i.push(0);i[a]|=h<<8*(s+o*(l%4)),O+=2}return{value:i,binLen:8*O+t}}(r,e,t,o,n)};break;case"B64":t=function(r,e,t){return function(r,e,n,t){var o,i,h,w,u,f,d,a,l,s,c=0;if(-1===r.search(/^[a-zA-Z0-9=+\/]+$/))throw new Error("Invalid character in base-64 string");if(f=r.indexOf("="),r=r.replace(/\=/g,""),-1!==f&&f<r.length)throw new Error("Invalid '=' found in base-64 string");for(o=e||[0],d=(n=n||0)>>>3,s=-1===t?3:0,i=0;i<r.length;i+=4){for(u=r.substr(i,4),w=0,h=0;h<u.length;h+=1)w|="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(u[h])<<18-6*h;for(h=0;h<u.length-1;h+=1){for(a=(l=c+d)>>>2;o.length<=a;)o.push(0);o[a]|=(w>>>16-8*h&255)<<8*(s+t*(l%4)),c+=1}}return{value:o,binLen:8*c+n}}(r,e,t,n)};break;case"BYTES":t=function(r,e,t){return function(r,e,n,t){var o,i,h,w,u,f,d;for(o=e||[0],w=(n=n||0)>>>3,d=-1===t?3:0,h=0;h<r.length;h+=1)i=r.charCodeAt(h),u=(f=h+w)>>>2,o.length<=u&&o.push(0),o[u]|=i<<8*(d+t*(f%4));return{value:o,binLen:8*r.length+n}}(r,e,t,n)};break;case"ARRAYBUFFER":try{t=new ArrayBuffer(0)}catch(r){throw new Error("ARRAYBUFFER not supported by this environment")}t=function(r,e,t){return function(r,e,n,t){var o,i,h,w,u,f,d;for(o=e||[0],h=(n=n||0)>>>3,f=-1===t?3:0,d=new Uint8Array(r),i=0;i<r.byteLength;i+=1)w=(u=i+h)>>>2,o.length<=w&&o.push(0),o[w]|=d[i]<<8*(f+t*(u%4));return{value:o,binLen:8*r.byteLength+n}}(r,e,t,n)};break;default:throw new Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER")}return t}function g(r,e){return r<<e|r>>>32-e}function p(r,e){return e>32?(e-=32,new f(r.lowOrder<<e|r.highOrder>>>32-e,r.highOrder<<e|r.lowOrder>>>32-e)):0!==e?new f(r.highOrder<<e|r.lowOrder>>>32-e,r.lowOrder<<e|r.highOrder>>>32-e):r}function A(r,e){return r>>>e|r<<32-e}function v(r,e){var n=new f(r.highOrder,r.lowOrder);return 32>=e?new f(n.highOrder>>>e|n.lowOrder<<32-e&4294967295,n.lowOrder>>>e|n.highOrder<<32-e&4294967295):new f(n.lowOrder>>>e-32|n.highOrder<<64-e&4294967295,n.highOrder>>>e-32|n.lowOrder<<64-e&4294967295)}function b(r,e){return r>>>e}function E(r,e){return 32>=e?new f(r.highOrder>>>e,r.lowOrder>>>e|r.highOrder<<32-e&4294967295):new f(0,r.highOrder>>>e-32)}function S(r,e,n){return r^e^n}function H(r,e,n){return r&e^~r&n}function y(r,e,n){return new f(r.highOrder&e.highOrder^~r.highOrder&n.highOrder,r.lowOrder&e.lowOrder^~r.lowOrder&n.lowOrder)}function m(r,e,n){return r&e^r&n^e&n}function B(r,e,n){return new f(r.highOrder&e.highOrder^r.highOrder&n.highOrder^e.highOrder&n.highOrder,r.lowOrder&e.lowOrder^r.lowOrder&n.lowOrder^e.lowOrder&n.lowOrder)}function C(r){return A(r,2)^A(r,13)^A(r,22)}function U(r){var e=v(r,28),n=v(r,34),t=v(r,39);return new f(e.highOrder^n.highOrder^t.highOrder,e.lowOrder^n.lowOrder^t.lowOrder)}function k(r){return A(r,6)^A(r,11)^A(r,25)}function F(r){var e=v(r,14),n=v(r,18),t=v(r,41);return new f(e.highOrder^n.highOrder^t.highOrder,e.lowOrder^n.lowOrder^t.lowOrder)}function R(r){return A(r,7)^A(r,18)^b(r,3)}function T(r){var e=v(r,1),n=v(r,8),t=E(r,7);return new f(e.highOrder^n.highOrder^t.highOrder,e.lowOrder^n.lowOrder^t.lowOrder)}function L(r){return A(r,17)^A(r,19)^b(r,10)}function x(r){var e=v(r,19),n=v(r,61),t=E(r,6);return new f(e.highOrder^n.highOrder^t.highOrder,e.lowOrder^n.lowOrder^t.lowOrder)}function j(r,e){var n=(65535&r)+(65535&e);return(65535&(r>>>16)+(e>>>16)+(n>>>16))<<16|65535&n}function M(r,e,n,t){var o=(65535&r)+(65535&e)+(65535&n)+(65535&t);return(65535&(r>>>16)+(e>>>16)+(n>>>16)+(t>>>16)+(o>>>16))<<16|65535&o}function Y(r,e,n,t,o){var i=(65535&r)+(65535&e)+(65535&n)+(65535&t)+(65535&o);return(65535&(r>>>16)+(e>>>16)+(n>>>16)+(t>>>16)+(o>>>16)+(i>>>16))<<16|65535&i}function I(r,e){var n,t,o;return n=(65535&r.lowOrder)+(65535&e.lowOrder),o=(65535&(t=(r.lowOrder>>>16)+(e.lowOrder>>>16)+(n>>>16)))<<16|65535&n,n=(65535&r.highOrder)+(65535&e.highOrder)+(t>>>16),new f((65535&(t=(r.highOrder>>>16)+(e.highOrder>>>16)+(n>>>16)))<<16|65535&n,o)}function _(r,e,n,t){var o,i,h;return o=(65535&r.lowOrder)+(65535&e.lowOrder)+(65535&n.lowOrder)+(65535&t.lowOrder),h=(65535&(i=(r.lowOrder>>>16)+(e.lowOrder>>>16)+(n.lowOrder>>>16)+(t.lowOrder>>>16)+(o>>>16)))<<16|65535&o,o=(65535&r.highOrder)+(65535&e.highOrder)+(65535&n.highOrder)+(65535&t.highOrder)+(i>>>16),new f((65535&(i=(r.highOrder>>>16)+(e.highOrder>>>16)+(n.highOrder>>>16)+(t.highOrder>>>16)+(o>>>16)))<<16|65535&o,h)}function P(r,e,n,t,o){var i,h,w;return i=(65535&r.lowOrder)+(65535&e.lowOrder)+(65535&n.lowOrder)+(65535&t.lowOrder)+(65535&o.lowOrder),w=(65535&(h=(r.lowOrder>>>16)+(e.lowOrder>>>16)+(n.lowOrder>>>16)+(t.lowOrder>>>16)+(o.lowOrder>>>16)+(i>>>16)))<<16|65535&i,i=(65535&r.highOrder)+(65535&e.highOrder)+(65535&n.highOrder)+(65535&t.highOrder)+(65535&o.highOrder)+(h>>>16),new f((65535&(h=(r.highOrder>>>16)+(e.highOrder>>>16)+(n.highOrder>>>16)+(t.highOrder>>>16)+(o.highOrder>>>16)+(i>>>16)))<<16|65535&i,w)}function X(r,e){return new f(r.highOrder^e.highOrder,r.lowOrder^e.lowOrder)}function K(r){var e,n,t,o=[];if("SHA-1"===r)o=[1732584193,4023233417,2562383102,271733878,3285377520];else if(0===r.lastIndexOf("SHA-",0))switch(e=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],n=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],r){case"SHA-224":o=e;break;case"SHA-256":o=n;break;case"SHA-384":o=[new f(3418070365,e[0]),new f(1654270250,e[1]),new f(2438529370,e[2]),new f(355462360,e[3]),new f(1731405415,e[4]),new f(41048885895,e[5]),new f(3675008525,e[6]),new f(1203062813,e[7])];break;case"SHA-512":o=[new f(n[0],4089235720),new f(n[1],2227873595),new f(n[2],4271175723),new f(n[3],1595750129),new f(n[4],2917565137),new f(n[5],725511199),new f(n[6],4215389547),new f(n[7],327033209)];break;default:throw new Error("Unknown SHA variant")}else{if(0!==r.lastIndexOf("SHA3-",0)&&0!==r.lastIndexOf("SHAKE",0))throw new Error("No SHA variants supported");for(t=0;t<5;t+=1)o[t]=[new f(0,0),new f(0,0),new f(0,0),new f(0,0),new f(0,0)]}return o}function N(r,e){var n,t,o,i,h,w,u,f=[],d=H,a=S,l=m,s=g,c=j,O=Y;for(n=e[0],t=e[1],o=e[2],i=e[3],h=e[4],u=0;u<80;u+=1)f[u]=u<16?r[u]:s(f[u-3]^f[u-8]^f[u-14]^f[u-16],1),w=u<20?O(s(n,5),d(t,o,i),h,1518500249,f[u]):u<40?O(s(n,5),a(t,o,i),h,1859775393,f[u]):u<60?O(s(n,5),l(t,o,i),h,2400959708,f[u]):O(s(n,5),a(t,o,i),h,3395469782,f[u]),h=i,i=o,o=s(t,30),t=n,n=w;return e[0]=c(n,e[0]),e[1]=c(t,e[1]),e[2]=c(o,e[2]),e[3]=c(i,e[3]),e[4]=c(h,e[4]),e}function D(r,e,n,t,o){var i,h,w,u;for(w=15+(e+65>>>9<<4);r.length<=w;)r.push(0);for(r[e>>>5]|=128<<24-e%32,u=e+n,r[w]=4294967295&u,r[w-1]=u/4294967296|0,h=r.length,i=0;i<h;i+=16)t=N(r.slice(i,i+16),t);return t}function Z(r,e,n){var t,o,w,u,d,a,l,s,c,O,g,p,A,v,b,E,S,X,K,N,D,Z,z,G,J,Q,V,W=[];if("SHA-224"===n||"SHA-256"===n)g=64,A=1,z=Number,v=j,b=M,E=Y,S=R,X=L,K=C,N=k,Z=m,D=H,V=i;else{if("SHA-384"!==n&&"SHA-512"!==n)throw new Error("Unexpected error in SHA-2 implementation");g=80,A=2,z=f,v=I,b=_,E=P,S=T,X=x,K=U,N=F,Z=B,D=y,V=h}for(t=e[0],o=e[1],w=e[2],u=e[3],d=e[4],a=e[5],l=e[6],s=e[7],p=0;p<g;p+=1)p<16?(Q=p*A,G=r.length<=Q?0:r[Q],J=r.length<=Q+1?0:r[Q+1],W[p]=new z(G,J)):W[p]=b(X(W[p-2]),W[p-7],S(W[p-15]),W[p-16]),c=E(s,N(d),D(d,a,l),V[p],W[p]),O=v(K(t),Z(t,o,w)),s=l,l=a,a=d,d=v(u,c),u=w,w=o,o=t,t=v(c,O);return e[0]=v(t,e[0]),e[1]=v(o,e[1]),e[2]=v(w,e[2]),e[3]=v(u,e[3]),e[4]=v(d,e[4]),e[5]=v(a,e[5]),e[6]=v(l,e[6]),e[7]=v(s,e[7]),e}function z(r,e){var n,t,o,i,h,d,a,l,s,c=[],O=[];if(null!==r)for(t=0;t<r.length;t+=2)e[(t>>>1)%5][(t>>>1)/5|0]=X(e[(t>>>1)%5][(t>>>1)/5|0],new f(r[t+1],r[t]));for(n=0;n<24;n+=1){for(i=K("SHA3-"),t=0;t<5;t+=1)c[t]=(h=e[t][0],d=e[t][1],a=e[t][2],l=e[t][3],s=e[t][4],new f(h.highOrder^d.highOrder^a.highOrder^l.highOrder^s.highOrder,h.lowOrder^d.lowOrder^a.lowOrder^l.lowOrder^s.lowOrder));for(t=0;t<5;t+=1)O[t]=X(c[(t+4)%5],p(c[(t+1)%5],1));for(t=0;t<5;t+=1)for(o=0;o<5;o+=1)e[t][o]=X(e[t][o],O[t]);for(t=0;t<5;t+=1)for(o=0;o<5;o+=1)i[o][(2*t+3*o)%5]=p(e[t][o],w[t][o]);for(t=0;t<5;t+=1)for(o=0;o<5;o+=1)e[t][o]=X(i[t][o],new f(~i[(t+1)%5][o].highOrder&i[(t+2)%5][o].highOrder,~i[(t+1)%5][o].lowOrder&i[(t+2)%5][o].lowOrder));e[0][0]=X(e[0][0],u[n])}return e}h=[new f((i=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298])[0],3609767458),new f(i[1],602891725),new f(i[2],3964484399),new f(i[3],2173295548),new f(i[4],4081628472),new f(i[5],3053834265),new f(i[6],2937671579),new f(i[7],3664609560),new f(i[8],2734883394),new f(i[9],1164996542),new f(i[10],1323610764),new f(i[11],3590304994),new f(i[12],4068182383),new f(i[13],991336113),new f(i[14],633803317),new f(i[15],3479774868),new f(i[16],2666613458),new f(i[17],944711139),new f(i[18],2341262773),new f(i[19],2007800933),new f(i[20],1495990901),new f(i[21],1856431235),new f(i[22],3175218132),new f(i[23],2198950837),new f(i[24],3999719339),new f(i[25],766784016),new f(i[26],2566594879),new f(i[27],3203337956),new f(i[28],1034457026),new f(i[29],2466948901),new f(i[30],3758326383),new f(i[31],168717936),new f(i[32],1188179964),new f(i[33],1546045734),new f(i[34],1522805485),new f(i[35],2643833823),new f(i[36],2343527390),new f(i[37],1014477480),new f(i[38],1206759142),new f(i[39],344077627),new f(i[40],1290863460),new f(i[41],3158454273),new f(i[42],3505952657),new f(i[43],106217008),new f(i[44],3606008344),new f(i[45],1432725776),new f(i[46],1467031594),new f(i[47],851169720),new f(i[48],3100823752),new f(i[49],1363258195),new f(i[50],3750685593),new f(i[51],3785050280),new f(i[52],3318307427),new f(i[53],3812723403),new f(i[54],2003034995),new f(i[55],3602036899),new f(i[56],1575990012),new f(i[57],1125592928),new f(i[58],2716904306),new f(i[59],442776044),new f(i[60],593698344),new f(i[61],3733110249),new f(i[62],2999351573),new f(i[63],3815920427),new f(3391569614,3928383900),new f(3515267271,566280711),new f(3940187606,3454069534),new f(4118630271,4000239992),new f(116418474,1914138554),new f(174292421,2731055270),new f(289380356,3203993006),new f(460393269,320620315),new f(685471733,587496836),new f(852142971,1086792851),new f(1017036298,365543100),new f(1126000580,2618297676),new f(1288033470,3409855158),new f(1501505948,4234509866),new f(1607167915,987167468),new f(1816402316,1246189591)],u=[new f(0,1),new f(0,32898),new f(2147483648,32906),new f(2147483648,2147516416),new f(0,32907),new f(0,2147483649),new f(2147483648,2147516545),new f(2147483648,32777),new f(0,138),new f(0,136),new f(0,2147516425),new f(0,2147483658),new f(0,2147516555),new f(2147483648,139),new f(2147483648,32905),new f(2147483648,32771),new f(2147483648,32770),new f(2147483648,128),new f(0,32778),new f(2147483648,2147483658),new f(2147483648,2147516545),new f(2147483648,32896),new f(0,2147483649),new f(2147483648,2147516424)],w=[[0,36,3,41,18],[1,44,10,45,2],[62,6,43,15,61],[28,55,25,21,56],[27,20,39,8,14]];var G=function(r,e,n){var t,o,i,h,w,u,f,g,p,A,v=0,b=[],E=0,S=r,H=!1,y=[],m=[],B=!1,C=!1,U=-1;if(t=(A=n||{}).encoding||"UTF8",(p=A.numRounds||1)!==parseInt(p,10)||1>p)throw new Error("numRounds must a integer >= 1");if("SHA-1"===S)w=512,u=N,f=D,h=160,g=function(r){return r.slice()};else if(0===S.lastIndexOf("SHA-",0))if(u=function(r,e){return Z(r,e,S)},f=function(r,e,n,t,o){return function(r,e,n,t,o,i){var h,w,u,f,d,a;if("SHA-224"===o||"SHA-256"===o)u=15+(e+65>>>9<<4),d=16;else{if("SHA-384"!==o&&"SHA-512"!==o)throw new Error("Unexpected error in SHA-2 implementation");u=31+(e+129>>>10<<5),d=32}for(;r.length<=u;)r.push(0);for(r[e>>>5]|=128<<24-e%32,a=e+n,r[u]=4294967295&a,r[u-1]=a/4294967296|0,w=r.length,h=0;h<w;h+=d)t=Z(r.slice(h,h+d),t,o);if("SHA-224"===o)f=[t[0],t[1],t[2],t[3],t[4],t[5],t[6]];else if("SHA-256"===o)f=t;else if("SHA-384"===o)f=[t[0].highOrder,t[0].lowOrder,t[1].highOrder,t[1].lowOrder,t[2].highOrder,t[2].lowOrder,t[3].highOrder,t[3].lowOrder,t[4].highOrder,t[4].lowOrder,t[5].highOrder,t[5].lowOrder];else{if("SHA-512"!==o)throw new Error("Unexpected error in SHA-2 implementation");f=[t[0].highOrder,t[0].lowOrder,t[1].highOrder,t[1].lowOrder,t[2].highOrder,t[2].lowOrder,t[3].highOrder,t[3].lowOrder,t[4].highOrder,t[4].lowOrder,t[5].highOrder,t[5].lowOrder,t[6].highOrder,t[6].lowOrder,t[7].highOrder,t[7].lowOrder]}return f}(r,e,n,t,S)},g=function(r){return r.slice()},"SHA-224"===S)w=512,h=224;else if("SHA-256"===S)w=512,h=256;else if("SHA-384"===S)w=1024,h=384;else{if("SHA-512"!==S)throw new Error("Chosen SHA variant is not supported");w=1024,h=512}else{if(0!==S.lastIndexOf("SHA3-",0)&&0!==S.lastIndexOf("SHAKE",0))throw new Error("Chosen SHA variant is not supported");var k=6;if(u=z,g=function(r){return function(r){var e,n=[];for(e=0;e<5;e+=1)n[e]=r[e].slice();return n}(r)},U=1,"SHA3-224"===S)w=1152,h=224;else if("SHA3-256"===S)w=1088,h=256;else if("SHA3-384"===S)w=832,h=384;else if("SHA3-512"===S)w=576,h=512;else if("SHAKE128"===S)w=1344,h=-1,k=31,C=!0;else{if("SHAKE256"!==S)throw new Error("Chosen SHA variant is not supported");w=1088,h=-1,k=31,C=!0}f=function(r,e,n,t,o){return function(r,e,n,t,o,i,h){var w,u,f=[],d=o>>>5,a=0,l=e>>>5;for(w=0;w<l&&e>=o;w+=d)t=z(r.slice(w,w+d),t),e-=o;for(r=r.slice(w),e%=o;r.length<d;)r.push(0);for(r[(w=e>>>3)>>2]^=i<<w%4*8,r[d-1]^=2147483648,t=z(r,t);32*f.length<h&&(u=t[a%5][a/5|0],f.push(u.lowOrder),!(32*f.length>=h));)f.push(u.highOrder),0==64*(a+=1)%o&&z(null,t);return f}(r,e,0,t,w,k,o)}}i=O(e,t,U),o=K(S),this.setHMACKey=function(r,e,n){var i,d,a,l,s,c;if(!0===H)throw new Error("HMAC key already set");if(!0===B)throw new Error("Cannot set HMAC key after calling update");if(!0===C)throw new Error("SHAKE is not supported for HMAC");if(d=(i=O(e,t=(n||{}).encoding||"UTF8",U)(r)).binLen,a=i.value,c=(l=w>>>3)/4-1,l<d/8){for(a=f(a,d,0,K(S),h);a.length<=c;)a.push(0);a[c]&=4294967040}else if(l>d/8){for(;a.length<=c;)a.push(0);a[c]&=4294967040}for(s=0;s<=c;s+=1)y[s]=909522486^a[s],m[s]=1549556828^a[s];o=u(y,o),v=w,H=!0},this.update=function(r,e){var n,t,h,f,d,a=0,l=w>>>5;for((e=e||!1)&&(b=[],E=0),t=(n=i(r,b,E)).binLen,f=n.value,h=t>>>5,d=0;d<h;d+=l)a+w<=t&&(o=u(f.slice(d,d+l),o),a+=w);v+=a,b=f.slice(a>>>5),E=t%w,B=!0},this.getHash=function(r,e){var n,t,i,w;if(!0===H)throw new Error("Cannot call getHash after setting HMAC key");if(i=c(e),!0===C){if(-1===i.shakeLen)throw new Error("shakeLen must be specified in options");h=i.shakeLen}switch(r){case"HEX":n=function(r){return d(r,h,U,i)};break;case"B64":n=function(r){return a(r,h,U,i)};break;case"BYTES":n=function(r){return l(r,h,U)};break;case"ARRAYBUFFER":try{t=new ArrayBuffer(0)}catch(r){throw new Error("ARRAYBUFFER not supported by this environment")}n=function(r){return s(r,h,U)};break;default:throw new Error("format must be HEX, B64, BYTES, or ARRAYBUFFER")}for(w=f(b.slice(),E,v,g(o),h),t=1;t<p;t+=1)!0===C&&h%32!=0&&(w[w.length-1]&=16777215>>>24-h%32),w=f(w,h,0,K(S),h);return n(w)},this.getHMAC=function(r,e){var n,t,i,O;if(!1===H)throw new Error("Cannot call getHMAC without first setting HMAC key");switch(i=c(e),r){case"HEX":n=function(r){return d(r,h,U,i)};break;case"B64":n=function(r){return a(r,h,U,i)};break;case"BYTES":n=function(r){return l(r,h,U)};break;case"ARRAYBUFFER":try{n=new ArrayBuffer(0)}catch(r){throw new Error("ARRAYBUFFER not supported by this environment")}n=function(r){return s(r,h,U)};break;default:throw new Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER")}return t=f(b.slice(),E,v,g(o),h),O=u(m,K(S)),n(O=f(t,h,w,O,h))}};void 0===(t=function(){return G}.call(e,n,e,r))||(r.exports=t)}()},function(r,e,n){const t=n(3);var o={encode:function(r){return t.encode(r)},decode:function(r){return t.decode(r)},assicEncode:function(r){let e=[];for(let n=0;n<r.length/2;n++){let t=r.substr(2*n,2);t=String.fromCharCode(parseInt(t,16)),e.push(t)}return e.join("")},assicDecode:function(r){let e=[];for(let n=0;n<r.length;n++){let t=("00"+r[n].charCodeAt().toString(16)).slice(2);e.push(t)}return e.join("")}};r.exports=o},function(r,e,n){var t=n(4);e.encode=t.encode,e.decode=t.decode},function(r,e,n){"use strict";var t=[255,255,26,27,28,29,30,31,255,255,255,255,255,255,255,255,255,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,255,255,255,255,255,255,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,255,255,255,255,255];e.encode=function(r){Buffer.isBuffer(r)||(r=new Buffer.from(r));for(var e,n,t=0,o=0,i=0,h=0,w=new Buffer.alloc(8*(e=r,n=Math.floor(e.length/5),e.length%5==0?n:n+1));t<r.length;){var u=r[t];i>3?(h=(h=u&255>>i)<<(i=(i+5)%8)|(t+1<r.length?r[t+1]:0)>>8-i,t++):(h=u>>8-(i+5)&31,0===(i=(i+5)%8)&&t++),w[o]="ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".charCodeAt(h),o++}for(t=o;t<w.length;t++)w[t]=61;return w},e.decode=function(r){var e,n=0,o=0,i=0;Buffer.isBuffer(r)||(r=new Buffer.from(r));for(var h=new Buffer.alloc(Math.ceil(5*r.length/8)),w=0;w<r.length&&61!==r[w];w++){var u=r[w]-48;if(!(u<t.length))throw new Error("Invalid input - it is not base32 encoded string");o=t[u],n<=3?0===(n=(n+5)%8)?(e|=o,h[i]=e,i++,e=0):e|=255&o<<8-n:(e|=255&o>>>(n=(n+5)%8),h[i]=e,i++,e=255&o<<8-n)}return h.slice(0,i)}}])}));