function e(e){return e&&e.__esModule?e.default:e}function t(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}const n={context:void 0,registry:void 0};function r(e){n.context=e}const o=(e,t)=>e===t,s=(Symbol("solid-proxy"),Symbol("solid-track")),i=(Symbol("solid-dev-component"),{equals:o});let l=null,u=q;const c=1,a=2,f={owned:null,cleanups:null,context:null,owner:null};var d=null;let p=null,h=null,g=null,v=null,y=null,b=null,m=0;const[w,_]=S(!1);function $(e,t){const n=v,r=d,o=0===e.length,s=o?f:{owned:null,cleanups:null,context:null,owner:void 0===t?r:t},i=o?e:()=>e((()=>P((()=>I(s)))));d=s,v=null;try{return j(i,!0)}finally{v=n,d=r}}function S(e,t){const n={value:e,observers:null,observerSlots:null,comparator:(t=t?Object.assign({},i,t):i).equals||void 0};return[D.bind(n),e=>("function"==typeof e&&(e=p&&p.running&&p.sources.has(n)?e(n.tValue):e(n.value)),L(n,e))]}function A(e,t,n){const r=R(e,t,!1,c);h&&p&&p.running?y.push(r):G(r)}function x(e,t,n){u=M;const r=R(e,t,!1,c),o=E&&J(d,E.id);o&&(r.suspense=o),n&&n.render||(r.user=!0),b?b.push(r):G(r)}function k(e,t,n){n=n?Object.assign({},i,n):i;const r=R(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,h&&p&&p.running?(r.tState=c,y.push(r)):G(r),D.bind(r)}function P(e){if(null===v)return e();const t=v;v=null;try{return e()}finally{v=t}}function T(e){x((()=>P(e)))}function C(e){return null===d||(null===d.cleanups?d.cleanups=[e]:d.cleanups.push(e)),e}function O(e){if(p&&p.running)return e(),p.done;const t=v,n=d;return Promise.resolve().then((()=>{let r;return v=t,d=n,(h||E)&&(r=p||(p={sources:new Set,effects:[],promises:new Set,disposed:new Set,queue:new Set,running:!0}),r.done||(r.done=new Promise((e=>r.resolve=e))),r.running=!0),j(e,!1),v=d=null,r?r.done:void 0}))}function N(e,t){const n=Symbol("context");return{id:n,Provider:Y(n),defaultValue:e}}function B(e){const t=k(e),n=k((()=>K(t())));return n.toArray=()=>{const e=n();return Array.isArray(e)?e:null!=e?[e]:[]},n}let E;function D(){const e=p&&p.running;if(this.sources&&(e?this.tState:this.state))if((e?this.tState:this.state)===c)G(this);else{const e=y;y=null,j((()=>H(this)),!1),y=e}if(v){const e=this.observers?this.observers.length:0;v.sources?(v.sources.push(this),v.sourceSlots.push(e)):(v.sources=[this],v.sourceSlots=[e]),this.observers?(this.observers.push(v),this.observerSlots.push(v.sources.length-1)):(this.observers=[v],this.observerSlots=[v.sources.length-1])}return e&&p.sources.has(this)?this.tValue:this.value}function L(e,t,n){let r=p&&p.running&&p.sources.has(e)?e.tValue:e.value;if(!e.comparator||!e.comparator(r,t)){if(p){const r=p.running;(r||!n&&p.sources.has(e))&&(p.sources.add(e),e.tValue=t),r||(e.value=t)}else e.value=t;e.observers&&e.observers.length&&j((()=>{for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t],r=p&&p.running;r&&p.disposed.has(n)||((r?n.tState:n.state)||(n.pure?y.push(n):b.push(n),n.observers&&U(n)),r?n.tState=c:n.state=c)}if(y.length>1e6)throw y=[],new Error}),!1)}return t}function G(e){if(!e.fn)return;I(e);const t=d,n=v,r=m;v=d=e,z(e,p&&p.running&&p.sources.has(e)?e.tValue:e.value,r),p&&!p.running&&p.sources.has(e)&&queueMicrotask((()=>{j((()=>{p&&(p.running=!0),v=d=e,z(e,e.tValue,r),v=d=null}),!1)})),v=n,d=t}function z(e,t,n){let r;try{r=e.fn(t)}catch(t){return e.pure&&(p&&p.running?(e.tState=c,e.tOwned&&e.tOwned.forEach(I),e.tOwned=void 0):(e.state=c,e.owned&&e.owned.forEach(I),e.owned=null)),e.updatedAt=n+1,X(t)}(!e.updatedAt||e.updatedAt<=n)&&(null!=e.updatedAt&&"observers"in e?L(e,r,!0):p&&p.running&&e.pure?(p.sources.add(e),e.tValue=r):e.value=r,e.updatedAt=n)}function R(e,t,n,r=c,o){const s={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:d,context:null,pure:n};if(p&&p.running&&(s.state=0,s.tState=r),null===d||d!==f&&(p&&p.running&&d.pure?d.tOwned?d.tOwned.push(s):d.tOwned=[s]:d.owned?d.owned.push(s):d.owned=[s]),g){const[e,t]=S(void 0,{equals:!1}),n=g(s.fn,t);C((()=>n.dispose()));const r=()=>O(t).then((()=>o.dispose())),o=g(s.fn,r);s.fn=t=>(e(),p&&p.running?o.track(t):n.track(t))}return s}function V(e){const t=p&&p.running;if(0===(t?e.tState:e.state))return;if((t?e.tState:e.state)===a)return H(e);if(e.suspense&&P(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<m);){if(t&&p.disposed.has(e))return;(t?e.tState:e.state)&&n.push(e)}for(let r=n.length-1;r>=0;r--){if(e=n[r],t){let t=e,o=n[r+1];for(;(t=t.owner)&&t!==o;)if(p.disposed.has(t))return}if((t?e.tState:e.state)===c)G(e);else if((t?e.tState:e.state)===a){const t=y;y=null,j((()=>H(e,n[0])),!1),y=t}}}function j(e,t){if(y)return e();let n=!1;t||(y=[]),b?n=!0:b=[],m++;try{const t=e();return function(e){y&&(h&&p&&p.running?function(e){for(let t=0;t<e.length;t++){const n=e[t],r=p.queue;r.has(n)||(r.add(n),h((()=>{r.delete(n),j((()=>{p.running=!0,V(n)}),!1),p&&(p.running=!1)})))}}(y):q(y),y=null);if(e)return;let t;if(p)if(p.promises.size||p.queue.size){if(p.running)return p.running=!1,p.effects.push.apply(p.effects,b),b=null,void _(!0)}else{const e=p.sources,n=p.disposed;b.push.apply(b,p.effects),t=p.resolve;for(const e of b)"tState"in e&&(e.state=e.tState),delete e.tState;p=null,j((()=>{for(const e of n)I(e);for(const t of e){if(t.value=t.tValue,t.owned)for(let e=0,n=t.owned.length;e<n;e++)I(t.owned[e]);t.tOwned&&(t.owned=t.tOwned),delete t.tValue,delete t.tOwned,t.tState=0}_(!1)}),!1)}const n=b;b=null,n.length&&j((()=>u(n)),!1);t&&t()}(n),t}catch(e){n||(b=null),y=null,X(e)}}function q(e){for(let t=0;t<e.length;t++)V(e[t])}function M(e){let t,o=0;for(t=0;t<e.length;t++){const n=e[t];n.user?e[o++]=n:V(n)}for(n.context&&r(),t=0;t<o;t++)V(e[t])}function H(e,t){const n=p&&p.running;n?e.tState=0:e.state=0;for(let r=0;r<e.sources.length;r+=1){const o=e.sources[r];if(o.sources){const e=n?o.tState:o.state;e===c?o!==t&&(!o.updatedAt||o.updatedAt<m)&&V(o):e===a&&H(o,t)}}}function U(e){const t=p&&p.running;for(let n=0;n<e.observers.length;n+=1){const r=e.observers[n];(t?r.tState:r.state)||(t?r.tState=a:r.state=a,r.pure?y.push(r):b.push(r),r.observers&&U(r))}}function I(e){let t;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const e=r.pop(),o=t.observerSlots.pop();n<r.length&&(e.sourceSlots[o]=n,r[n]=e,t.observerSlots[n]=o)}}if(p&&p.running&&e.pure){if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)I(e.tOwned[t]);delete e.tOwned}W(e,!0)}else if(e.owned){for(t=e.owned.length-1;t>=0;t--)I(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}p&&p.running?e.tState=0:e.state=0,e.context=null}function W(e,t){if(t||(e.tState=0,p.disposed.add(e)),e.owned)for(let t=0;t<e.owned.length;t++)W(e.owned[t])}function Z(e){return e instanceof Error?e:new Error("string"==typeof e?e:"Unknown error",{cause:e})}function F(e,t){for(const n of e)n(t)}function X(e){const t=l&&J(d,l);if(!t)throw e;const n=Z(e);b?b.push({fn(){F(t,n)},state:c}):F(t,n)}function J(e,t){return e?e.context&&void 0!==e.context[t]?e.context[t]:J(e.owner,t):void 0}function K(e){if("function"==typeof e&&!e.length)return K(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=K(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function Y(e,t){return function(t){let n;return A((()=>n=P((()=>(d.context={[e]:t.value},B((()=>t.children)))))),void 0),n}}const Q=Symbol("fallback");function ee(e){for(let t=0;t<e.length;t++)e[t]()}let te=!1;function ne(e,t){if(te&&n.context){const o=n.context;r({...n.context,id:`${n.context.id}${n.context.count++}-`,count:0});const s=P((()=>e(t||{})));return r(o),s}return P((()=>e(t||{})))}function re(e){const t="fallback"in e&&{fallback:()=>e.fallback};return k(function(e,t,n={}){let r=[],o=[],i=[],l=0,u=t.length>1?[]:null;return C((()=>ee(i))),()=>{let c,a,f=e()||[];return f[s],P((()=>{let e,t,s,p,h,g,v,y,b,m=f.length;if(0===m)0!==l&&(ee(i),i=[],r=[],o=[],l=0,u&&(u=[])),n.fallback&&(r=[Q],o[0]=$((e=>(i[0]=e,n.fallback()))),l=1);else if(0===l){for(o=new Array(m),a=0;a<m;a++)r[a]=f[a],o[a]=$(d);l=m}else{for(s=new Array(m),p=new Array(m),u&&(h=new Array(m)),g=0,v=Math.min(l,m);g<v&&r[g]===f[g];g++);for(v=l-1,y=m-1;v>=g&&y>=g&&r[v]===f[y];v--,y--)s[y]=o[v],p[y]=i[v],u&&(h[y]=u[v]);for(e=new Map,t=new Array(y+1),a=y;a>=g;a--)b=f[a],c=e.get(b),t[a]=void 0===c?-1:c,e.set(b,a);for(c=g;c<=v;c++)b=r[c],a=e.get(b),void 0!==a&&-1!==a?(s[a]=o[c],p[a]=i[c],u&&(h[a]=u[c]),a=t[a],e.set(b,a)):i[c]();for(a=g;a<m;a++)a in s?(o[a]=s[a],i[a]=p[a],u&&(u[a]=h[a],u[a](a))):o[a]=$(d);o=o.slice(0,l=m),r=f.slice(0)}return o}));function d(e){if(i[a]=e,u){const[e,n]=S(a);return u[a]=n,t(f[a],e)}return t(f[a])}}}((()=>e.each),e.children,t||void 0))}function oe(e){const t="fallback"in e&&{fallback:()=>e.fallback};return k(function(e,t,n={}){let r,o=[],i=[],l=[],u=[],c=0;return C((()=>ee(l))),()=>{const a=e()||[];return a[s],P((()=>{if(0===a.length)return 0!==c&&(ee(l),l=[],o=[],i=[],c=0,u=[]),n.fallback&&(o=[Q],i[0]=$((e=>(l[0]=e,n.fallback()))),c=1),i;for(o[0]===Q&&(l[0](),l=[],o=[],i=[],c=0),r=0;r<a.length;r++)r<o.length&&o[r]!==a[r]?u[r]((()=>a[r])):r>=o.length&&(i[r]=$(f));for(;r<o.length;r++)l[r]();return c=u.length=l.length=a.length,o=a.slice(0),i=i.slice(0,c)}));function f(e){l[r]=e;const[n,o]=S(a[r]);return u[r]=o,t(n,r)}}}((()=>e.each),e.children,t||void 0))}N();Object.create(null),Object.create(null);const se="_$DX_DELEGATE";function ie(e,t,n,r={}){let o;return $((r=>{o=r,t===document?e():he(t,e(),t.firstChild?null:void 0,n)}),r.owner),()=>{o(),t.textContent=""}}function le(e,t,n){let r;const o=()=>{const t=document.createElement("template");return t.innerHTML=e,n?t.content.firstChild.firstChild:t.content.firstChild},s=t?()=>(r||(r=o())).cloneNode(!0):()=>P((()=>document.importNode(r||(r=o()),!0)));return s.cloneNode=s,s}function ue(e,t=window.document){const n=t[se]||(t[se]=new Set);for(let r=0,o=e.length;r<o;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,ve))}}function ce(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function ae(e,t){null==t?e.removeAttribute("class"):e.className=t}function fe(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const r=n[0];e.addEventListener(t,n[0]=t=>r.call(e,n[1],t))}else e.addEventListener(t,n)}function de(e,t,n={}){const r=Object.keys(t||{}),o=Object.keys(n);let s,i;for(s=0,i=o.length;s<i;s++){const r=o[s];r&&"undefined"!==r&&!t[r]&&(ge(e,r,!1),delete n[r])}for(s=0,i=r.length;s<i;s++){const o=r[s],i=!!t[o];o&&"undefined"!==o&&n[o]!==i&&i&&(ge(e,o,!0),n[o]=i)}return n}function pe(e,t,n){if(!t)return n?ce(e,"style"):t;const r=e.style;if("string"==typeof t)return r.cssText=t;let o,s;for(s in"string"==typeof n&&(r.cssText=n=void 0),n||(n={}),t||(t={}),n)null==t[s]&&r.removeProperty(s),delete n[s];for(s in t)o=t[s],o!==n[s]&&(r.setProperty(s,o),n[s]=o);return n}function he(e,t,n,r){if(void 0===n||r||(r=[]),"function"!=typeof t)return ye(e,t,r,n);A((r=>ye(e,t(),r,n)),r)}function ge(e,t,n){const r=t.trim().split(/\s+/);for(let t=0,o=r.length;t<o;t++)e.classList.toggle(r[t],n)}function ve(e){const t=`$$${e.type}`;let r=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==r&&Object.defineProperty(e,"target",{configurable:!0,value:r}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>r||document}),n.registry&&!n.done&&(n.done=_$HY.done=!0);r;){const n=r[t];if(n&&!r.disabled){const o=r[`${t}Data`];if(void 0!==o?n.call(r,o,e):n.call(r,e),e.cancelBubble)return}r=r._$host||r.parentNode||r.host}}function ye(e,t,r,o,s){if(n.context){!r&&(r=[...e.childNodes]);let t=[];for(let e=0;e<r.length;e++){const n=r[e];8===n.nodeType&&"!$"===n.data.slice(0,2)?n.remove():t.push(n)}r=t}for(;"function"==typeof r;)r=r();if(t===r)return r;const i=typeof t,l=void 0!==o;if(e=l&&r[0]&&r[0].parentNode||e,"string"===i||"number"===i){if(n.context)return r;if("number"===i&&(t=t.toString()),l){let n=r[0];n&&3===n.nodeType?n.data=t:n=document.createTextNode(t),r=we(e,r,o,n)}else r=""!==r&&"string"==typeof r?e.firstChild.data=t:e.textContent=t}else if(null==t||"boolean"===i){if(n.context)return r;r=we(e,r,o)}else{if("function"===i)return A((()=>{let n=t();for(;"function"==typeof n;)n=n();r=ye(e,n,r,o)})),()=>r;if(Array.isArray(t)){const i=[],u=r&&Array.isArray(r);if(be(i,t,r,s))return A((()=>r=ye(e,i,r,o,!0))),()=>r;if(n.context){if(!i.length)return r;for(let e=0;e<i.length;e++)if(i[e].parentNode)return r=i}if(0===i.length){if(r=we(e,r,o),l)return r}else u?0===r.length?me(e,i,o):function(e,t,n){let r=n.length,o=t.length,s=r,i=0,l=0,u=t[o-1].nextSibling,c=null;for(;i<o||l<s;)if(t[i]!==n[l]){for(;t[o-1]===n[s-1];)o--,s--;if(o===i){const t=s<r?l?n[l-1].nextSibling:n[s-l]:u;for(;l<s;)e.insertBefore(n[l++],t)}else if(s===l)for(;i<o;)c&&c.has(t[i])||t[i].remove(),i++;else if(t[i]===n[s-1]&&n[l]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[l++],t[i++].nextSibling),e.insertBefore(n[--s],r),t[o]=n[s]}else{if(!c){c=new Map;let e=l;for(;e<s;)c.set(n[e],e++)}const r=c.get(t[i]);if(null!=r)if(l<r&&r<s){let u,a=i,f=1;for(;++a<o&&a<s&&null!=(u=c.get(t[a]))&&u===r+f;)f++;if(f>r-l){const o=t[i];for(;l<r;)e.insertBefore(n[l++],o)}else e.replaceChild(n[l++],t[i++])}else i++;else t[i++].remove()}}else i++,l++}(e,r,i):(r&&we(e),me(e,i));r=i}else if(t instanceof Node){if(n.context&&t.parentNode)return r=l?[t]:t;if(Array.isArray(r)){if(l)return r=we(e,r,o,t);we(e,r,null,t)}else null!=r&&""!==r&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);r=t}else console.warn("Unrecognized value. Skipped inserting",t)}return r}function be(e,t,n,r){let o=!1;for(let s=0,i=t.length;s<i;s++){let i=t[s],l=n&&n[s];if(i instanceof Node)e.push(i);else if(null==i||!0===i||!1===i);else if(Array.isArray(i))o=be(e,i,l)||o;else if("function"==typeof i)if(r){for(;"function"==typeof i;)i=i();o=be(e,Array.isArray(i)?i:[i],Array.isArray(l)?l:[l])||o}else e.push(i),o=!0;else{const t=String(i);l&&3===l.nodeType?(l.data=t,e.push(l)):e.push(document.createTextNode(t))}}return o}function me(e,t,n=null){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function we(e,t,n,r){if(void 0===n)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=!1;for(let s=t.length-1;s>=0;s--){const i=t[s];if(o!==i){const t=i.parentNode===e;r||s?t&&i.remove():t?e.replaceChild(o,i):e.insertBefore(o,n)}else r=!0}}else e.insertBefore(o,n);return[o]}class _e extends Error{}function $e(e){let t;const n=new Promise(((r,o)=>{e(r,o),t=r,n.skip=()=>o(new _e)}));return n.catch((e=>{if(!(e instanceof _e))throw e}))}class Se{constructor(){}create(e){return e}snapshot(e){return e}}const Ae=new Se,xe=(new Se,new Se,new Se);class ke{constructor(e){this.mandatoryTypeDescriptor=e}create(e){return null!=e?this.mandatoryTypeDescriptor.create(e):void 0}snapshot(e){return null!=e?this.mandatoryTypeDescriptor.snapshot(e):void 0}}class Pe{constructor(e){this.attributeTypes=e}create(e){const t={};for(let n in this.attributeTypes){const r=this.attributeTypes[n],o=e[n],s=r.create(o);t[n]=s}return t}snapshot(e){const t={};for(let n in this.attributeTypes){const r=this.attributeTypes[n],o=e[n],s=r.snapshot(o);t[n]=s}return t}}function Te(e){return new Pe(e)}class Ce{constructor(){}get(e,t){return e[t]?.[0]?.()}set(e,t,n){const r=e[t]?.[1];return r?.(n),null!=r}}class Oe{constructor(e){this.attributeTypes=e}create(e){const t={};for(let n in this.attributeTypes){const r=this.attributeTypes[n],o=e[n],s=r.create(o);t[n]=S(s)}return new Proxy(t,new Ce)}snapshot(e){const t={};for(let n in this.attributeTypes){const r=this.attributeTypes[n],o=e[n],s=r.snapshot(o);t[n]=s}return t}}var Ne,Be,Ee,De,Le,Ge,ze,Re={};t(Re,"pageWidth",(()=>Ne),(e=>Ne=e)),t(Re,"pageHeight",(()=>Be),(e=>Be=e)),t(Re,"bookWidth",(()=>Ee),(e=>Ee=e)),t(Re,"bookHeight",(()=>De),(e=>De=e)),t(Re,"page",(()=>Le),(e=>Le=e)),t(Re,"paper",(()=>Ge),(e=>Ge=e)),t(Re,"none",(()=>ze),(e=>ze=e)),Ne="40%",Be="60%",Ee="40%",De="60%",Le="page_d1805d",Ge="paper_d1805d",ze="none_d1805d";const Ve=le("<svg><g><rect></svg>",!1,!0);let je;var qe;function Me(t){return ne(re,{get each(){return B((()=>t.children)).toArray()},children:n=>n&&(()=>{const r=Ve(),o=r.firstChild;return he(r,n,null),A((n=>{const s={[e(Re).page]:!0,[t.pageAnimation||e(Re).none]:null!=t.pageAnimation},i=e(Re).paper;return n._v$=de(r,s,n._v$),i!==n._v$2&&ce(o,"class",n._v$2=i),n}),{_v$:void 0,_v$2:void 0}),r})()})}(qe=je||(je={})).LeftToRight="ltr",qe.RightToLeft="rtl";const He=Te({Left:xe,Right:xe}),Ue=(Ie={currentPage:He,previousPage:(We=He,new ke(We))},new Oe(Ie));var Ie,We;function Ze(){}function Fe({initialPage:e}){const t=Ue.create({currentPage:e,previousPage:void 0});return{controller:{next:function(e){return $e((n=>{t.previousPage=t.previousPage,t.currentPage=e,n()}))},previous:function(e){return $e((n=>{t.previousPage=t.previousPage,t.currentPage=e,n()}))}},Component:function(){return ne(Me,{get pageAnimation(){return je.LeftToRight},onPageAnimationComplete:Ze,get children(){return[k((()=>k((()=>!!t.previousPage))()&&[ne(t.previousPage.Left,{}),ne(t.previousPage.Right,{})])),ne(t.currentPage.Left,{}),ne(t.currentPage.Right,{})]}})}}}class Xe{constructor(e){this.referencedTypeDescriptor=e}create(e){return S(this.referencedTypeDescriptor.create(e))}snapshot([e]){return this.referencedTypeDescriptor.snapshot(e())}}const Je=Te({creationTimestamp:Ae,lastUpdatedTimestamp:(Ke=Ae,new Xe(Ke))});var Ke,Ye,Qe={};t(Qe,"menu",(()=>Ye),(e=>Ye=e)),Ye="NhmhmG_menu";var et,tt,nt,rt,ot={};t(ot,"book",(()=>et),(e=>et=e)),t(ot,"page",(()=>tt),(e=>tt=e)),t(ot,"spine",(()=>nt),(e=>nt=e)),t(ot,"open",(()=>rt),(e=>rt=e)),et="B3iZmG_book",tt="B3iZmG_page",nt="B3iZmG_spine",rt="B3iZmG_open";const st=le("<div>"),it=le("<h1>GRAND TERMINUS"),lt=le("<div><div>"),ut=128;function ct({z:t,onClick:n,style:r,children:o}){return(()=>{const s=st();return fe(s,"click",n,!0),he(s,o),A((n=>{const o=e(ot).page,i={transform:`translateZ(${t}px)`,...r};return o!==n._v$&&ae(s,n._v$=o),n._v$2=pe(s,i,n._v$2),n}),{_v$:void 0,_v$2:void 0}),s})()}function at({}){const[t,n]=S(!1);function r(){n(!0)}return(()=>{const n=lt(),o=n.firstChild;return he(n,ne(ct,{z:-.5-ut/2,style:{background:"black"}}),o),he(n,ne(oe,{get each(){return[...Array(ut/2).keys()]},children:e=>ne(ct,{get z(){return-1.5-(ut/2-1-e())}})}),o),he(n,ne(ct,{z:-.5}),o),he(o,ne(ct,{z:.5}),null),he(o,ne(oe,{get each(){return[...Array(ut/2).keys()]},children:(e,t)=>ne(ct,{get z(){return 1.5+e()}})}),null),he(o,ne(ct,{z:.5+ut/2,onClick:r,style:{background:"black","text-align":"center",color:"white"},get children(){return it()}}),null),A((r=>{const s=e(ot).book,i=`translateX(${t()?50:0}%)`,l={[e(ot).spine]:!0,[e(ot).open]:t()};return s!==r._v$3&&ae(n,r._v$3=s),i!==r._v$4&&(null!=(r._v$4=i)?n.style.setProperty("transform",i):n.style.removeProperty("transform")),r._v$5=de(o,l,r._v$5),r}),{_v$3:void 0,_v$4:void 0,_v$5:void 0}),n})()}ue(["click"]);const ft=le("<div>");function dt(t){return(()=>{const t=ft();return he(t,ne(at,{})),A((n=>de(t,{[e(Qe).menu]:!0},n))),t})()}function pt({launchGame:e}){return function(){T((()=>{console.log("home mounted"),C((()=>console.log("home cleaned up")))}));return ne(dt,{newGame:()=>e(Je.create({creationTimestamp:Date.now(),lastUpdatedTimestamp:Date.now()}))})}}const ht=le("<div> - ");var gt,vt,yt,bt,mt,wt,_t,$t,St,At,xt,kt,Pt,Tt,Ct,Ot,Nt={};t(Nt,"pageWidth",(()=>gt),(e=>gt=e)),t(Nt,"pageHeight",(()=>vt),(e=>vt=e)),t(Nt,"bookWidth",(()=>yt),(e=>yt=e)),t(Nt,"bookHeight",(()=>bt),(e=>bt=e)),t(Nt,"tableWidth",(()=>mt),(e=>mt=e)),t(Nt,"tableHeight",(()=>wt),(e=>wt=e)),t(Nt,"page",(()=>_t),(e=>_t=e)),t(Nt,"paper",(()=>$t),(e=>$t=e)),t(Nt,"none",(()=>St),(e=>St=e)),t(Nt,"container",(()=>At),(e=>At=e)),t(Nt,"board",(()=>xt),(e=>xt=e)),t(Nt,"table",(()=>kt),(e=>kt=e)),t(Nt,"flat",(()=>Pt),(e=>Pt=e)),t(Nt,"animate-upright",(()=>Tt),(e=>Tt=e)),t(Nt,"table-top",(()=>Ct),(e=>Ct=e)),t(Nt,"book",(()=>Ot),(e=>Ot=e)),gt="40%",vt="60%",yt="40%",bt="60%",mt="min(120vw, 100vh)",wt="min(100vw, 120vh)",_t="page_2b178e",$t="paper_2b178e",St="none_2b178e",At="container_2b178e",xt="board_2b178e",kt="table_2b178e",Pt="flat_2b178e",Tt="animate-upright_2b178e",Ct="table-top_2b178e",Ot="book_2b178e";const Bt=le("<div><div><div><div></div><div>");function Et(t){return(()=>{const n=Bt(),r=n.firstChild,o=r.firstChild,s=o.firstChild,i=s.nextSibling;return he(i,ne(t.Book,{})),A((l=>{const u=e(Nt).container,c={[e(Nt).board]:!0},a={[e(Nt).table]:!0,[e(Nt).flat]:t.flat},f=e(Nt)["table-top"],d=e(Nt).book;return u!==l._v$&&ae(n,l._v$=u),l._v$2=de(r,c,l._v$2),l._v$3=de(o,a,l._v$3),f!==l._v$4&&ae(s,l._v$4=f),d!==l._v$5&&ae(i,l._v$5=d),l}),{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),n})()}var Dt,Lt={};t(Lt,"prop",(()=>Dt),(e=>Dt=e)),Dt="_8v3k-G_prop";const Gt=le("<span>");function zt(t){return ne(re,{get each(){return t.props},children:t=>(()=>{const n=Gt();return n.style.setProperty("animation-delay","1s"),he(n,(()=>t.letter)),A((r=>{const o=e(Lt).prop,s=`${t.x}% ${t.y}%`,i=`${t.y}%`,l=`${t.x}%`;return o!==r._v$&&ae(n,r._v$=o),s!==r._v$2&&(null!=(r._v$2=s)?n.style.setProperty("transform-origin",s):n.style.removeProperty("transform-origin")),i!==r._v$3&&(null!=(r._v$3=i)?n.style.setProperty("top",i):n.style.removeProperty("top")),l!==r._v$4&&(null!=(r._v$4=l)?n.style.setProperty("left",l):n.style.removeProperty("left")),r}),{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),n})()})}var Rt,Vt={};t(Vt,"container",(()=>Rt),(e=>Rt=e)),Rt="BmEo-q_container";const jt=le("<div>");function qt(){return(()=>{const t=jt();return he(t,ne(at,{})),A((()=>ae(t,e(Vt).container))),t})()}window.onload=function(){const e=function(){return[]},t=function(){return ne(zt,{get props(){return[..."ABCDEFGHIJKL😂"].map((e=>({letter:e,x:100*Math.random(),y:100*Math.random()})))}})},n=pt({launchGame:function(e){s.next({Left:n,Right:function(){return ne(r,{game:e})},popdown:()=>$e((e=>e)),popup:()=>$e((e=>e))})}}),r=function(e){return T((()=>{const t=setInterval((()=>e.game.lastUpdatedTimestamp[1](Date.now())),1e3);C((()=>{clearInterval(t)}))})),(()=>{const t=ht();return he(t,(()=>e.game.creationTimestamp),t.firstChild),he(t,(()=>e.game.lastUpdatedTimestamp[0]()),null),t})()},{Component:o,controller:s}=Fe({initialPage:{Left:t,Right:e,popdown:()=>$e((e=>e)),popup:()=>$e((e=>e))}}),i=document.getElementById("app"),[l,u]=S(!1);ie((()=>ne(Et,{Book:qt,get flat(){return l()}})),i),setTimeout((()=>{u(!0)}),1e3)};
//# sourceMappingURL=index.3a522273.js.map
