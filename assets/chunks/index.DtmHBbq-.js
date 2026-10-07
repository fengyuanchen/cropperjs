const bt=typeof window<"u"&&typeof window.document<"u",N=bt?window:{},Mt=bt?"ontouchstart"in N.document.documentElement:!1,Dt=bt?"PointerEvent"in N:!1,Y="cropper",K=`${Y}-canvas`,Ne=`${Y}-crosshair`,Re=`${Y}-grid`,Oe=`${Y}-handle`,U=`${Y}-image`,z=`${Y}-selection`,_e=`${Y}-shade`,Pe=`${Y}-viewer`,it="select",ve="move",q="scale",At="rotate",st="transform",P="none",Bt="n-resize",jt="e-resize",Ut="s-resize",qt="w-resize",J="ne-resize",Q="nw-resize",tt="se-resize",et="sw-resize",ze="action",Me=Mt?"touchend touchcancel":"mouseup",De=Mt?"touchmove":"mousemove",We=Mt?"touchstart":"mousedown",Zt=Dt?"pointerdown":We,Kt=Dt?"pointermove":De,Gt=Dt?"pointerup pointercancel":Me,Vt="error",Jt="keydown",B="load",Qt="resize",te="wheel",Z="action",F="actionend",Le="actionmove",H="actionstart",M="change",Tt="transform",R="contain",W="cover",L="fill",I="none",X="scale-down";function rt(d){return typeof d=="string"}const Se=Number.isNaN||N.isNaN;function m(d){return typeof d=="number"&&!Se(d)}function A(d){return m(d)&&d>0&&d<1/0}function Xe(d){return typeof d>"u"}function Ae(d){return typeof d=="object"&&d!==null}const{hasOwnProperty:Ye}=Object.prototype;function ct(d){if(!Ae(d))return!1;try{const{constructor:t}=d,{prototype:i}=t;return t&&i&&Ye.call(i,"isPrototypeOf")}catch{return!1}}function Et(d){return typeof d=="function"}function j(d){return typeof d=="object"&&d!==null&&d.nodeType===1}const Fe=/([a-z\d])([A-Z])/g;function ee(d){return String(d).replace(Fe,"$1-$2").toLowerCase()}const He=/-[A-z\d]/g;function ie(d){return d.replace(He,t=>t.slice(1).toUpperCase())}const Te=/\s\s*/;function w(d,t,i,e){t.trim().split(Te).forEach(s=>{d.removeEventListener(s,i,e)})}function S(d,t,i,e){t.trim().split(Te).forEach(s=>{d.addEventListener(s,i,e)})}function se(d,t,i,e){S(d,t,i,{...e,once:!0})}const Be={bubbles:!0,cancelable:!0,composed:!0};function je(d,t,i,e){return d.dispatchEvent(new CustomEvent(t,{...Be,detail:i,...e}))}function Ue(d){return typeof d.composedPath=="function"&&d.composedPath().find(j)||d.target}const ne=Promise.resolve();function qe(d,t){return t?ne.then(d?t.bind(d):t):ne}function ke(d){const t=d.getRootNode();switch(t.nodeType){case 1:return t.ownerDocument;case 9:return t;case 11:return t}return null}function vt(d){const{documentElement:t}=d.ownerDocument,i=d.getBoundingClientRect();return{left:i.left+(N.pageXOffset-t.clientLeft),top:i.top+(N.pageYOffset-t.clientTop)}}const Ze=/deg|g?rad|turn$/i;function St(d){const t=parseFloat(d)||0;if(t!==0){const[i="rad"]=String(d).match(Ze)||[];switch(i.toLowerCase()){case"deg":return t/360*(Math.PI*2);case"grad":return t/400*(Math.PI*2);case"turn":return t*(Math.PI*2)}}return t}const Ke=/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?(?:px)?$/i,Ge=/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?%$/i;function Ve(d){const t=[];let i=0,e="";return String(d).split("").forEach(s=>{s==="("?i+=1:s===")"&&(i=Math.max(0,i-1)),i===0&&/\s/.test(s)?e&&(t.push(e),e=""):e+=s}),e&&t.push(e),t}function ae(d,t,i,e){const s=Ve(d);if(s.length===0||s.length>4)return[null,null,null,null];const[n,o=n,h=n,c=o]=s;return[n,o,h,c].map((r,a)=>{const u=a%2===1;if(Ke.test(r))return parseFloat(r);if(Ge.test(r))return parseFloat(r)/100*(u?t:i);if(r.toLowerCase()==="auto"||!Et(e))return null;const $=e(r,u);return m($)?$:null})}function xe(d,t,i,e,s){const n=(u,$)=>{const f=$?"left":"top",l=e.ownerDocument.createElement("div");if(l.style.cssText="position: absolute; visibility: hidden; pointer-events: none;",l.style.setProperty(f,u),!l.style.getPropertyValue(f))return null;e.appendChild(l);const g=l.getBoundingClientRect(),b=$?g.left-s.left-e.clientLeft:g.top-s.top-e.clientTop;return e.removeChild(l),b},{width:o,height:h}=s,c=ae(t,o,h,n),r=ae(i,o,h,n),a=.001;return d.some((u,$)=>{const f=c[$],l=r[$];return f!==null&&u>f+a||l!==null&&u<l-a})}const oe="contain",Je="cover";function ht(d,t=oe){const{aspectRatio:i}=d;let{width:e,height:s}=d;const n=A(e),o=A(s);if(n&&o){const h=s*i;t===oe&&h>e||t===Je&&h<e?s=e/i:e=s*i}else n?s=e/i:o&&(e=s*i);return{width:e,height:s}}function Ie(d,...t){if(t.length===0)return d;const[i,e,s,n,o,h]=d,[c,r,a,u,$,f]=t[0];return d=[i*c+s*r,e*c+n*r,i*a+s*u,e*a+n*u,i*$+s*f+o,e*$+n*f+h],Ie(d,...t.slice(1))}const Qe=`
:host([hidden]) {
  display: none !important;
}
`,ti=/left|top|width|height/i,re="open",at=new WeakMap,ot=new WeakMap,he=new Map,ce=!!(N.document&&Array.isArray(N.document.adoptedStyleSheets)&&N.CSSStyleSheet&&"replaceSync"in N.CSSStyleSheet.prototype),Wt=class Wt extends HTMLElement{constructor(){var i,e;super(),this.shadowRootMode=re,this.slottable=!0;const t=(e=(i=Object.getPrototypeOf(this))==null?void 0:i.constructor)==null?void 0:e.$name;t&&he.set(t,this.tagName.toLowerCase())}get $sharedStyle(){return`${this.themeColor?`:host{--theme-color: ${this.themeColor};}`:""}${Qe}`}static get observedAttributes(){return["shadow-root-mode","slottable","theme-color"]}attributeChangedCallback(t,i,e){if(Object.is(e,i))return;const s=ie(t),n=this[s];let o=e;switch(typeof n){case"boolean":o=e!==null&&e!=="false";break;case"number":o=Number(e);break}switch(this[s]=o,t){case"theme-color":{const h=ot.get(this),c=this.$sharedStyle;h&&c&&(ce?h.replaceSync(c):h.textContent=c);break}}}$propertyChangedCallback(t,i,e){if(!Object.is(e,i))switch(t=ee(t),typeof e){case"boolean":e===!0?this.hasAttribute(t)||this.setAttribute(t,""):this.removeAttribute(t);break;case"number":Se(e)?e="":e=String(e);default:e?this.getAttribute(t)!==e&&this.setAttribute(t,e):this.removeAttribute(t)}}connectedCallback(){Object.getPrototypeOf(this).constructor.observedAttributes.forEach(i=>{const e=ie(i);let s=this[e];Xe(s)||this.$propertyChangedCallback(e,void 0,s),Object.defineProperty(this,e,{enumerable:!0,configurable:!0,get(){return s},set(n){const o=s;s=n,this.$propertyChangedCallback(e,o,n)}})});const t=this.shadowRoot||this.attachShadow({mode:this.shadowRootMode||re});if(at.set(this,t),ot.set(this,this.$addStyles(this.$sharedStyle)),this.$style&&this.$addStyles(this.$style),this.$template){const i=document.createElement("template");i.innerHTML=this.$template,t.appendChild(i.content)}if(this.slottable){const i=document.createElement("slot");t.appendChild(i)}}disconnectedCallback(){ot.has(this)&&ot.delete(this),at.has(this)&&at.delete(this)}$getTagNameOf(t){return he.get(t)??t}$setStyles(t){return Object.keys(t).forEach(i=>{let e=t[i];m(e)&&(e!==0&&ti.test(i)?e=`${e}px`:e=String(e)),this.style[i]=e}),this}$getShadowRoot(){return this.shadowRoot||at.get(this)}$addStyles(t){let i;const e=this.$getShadowRoot();return ce?(i=new CSSStyleSheet,i.replaceSync(t),e.adoptedStyleSheets=e.adoptedStyleSheets.concat(i)):(i=document.createElement("style"),i.textContent=t,e.appendChild(i)),i}$emit(t,i,e){return je(this,t,i,e)}$nextTick(t){return qe(this,t)}static $define(t,i){Ae(t)&&(i=t,t=""),t||(t=this.$name||this.name),t=ee(t),bt&&N.customElements&&!N.customElements.get(t)&&customElements.define(t,this,i)}};Wt.$version="__VERSION__";let D=Wt;const ei=`
:host {
  display: block;
  min-height: 100px;
  min-width: 200px;
  overflow: hidden;
  position: relative;
  touch-action: none;
  -webkit-touch-callout: none;
  user-select: none;
}

:host([background]) {
  background-color: #fff;
  background-image: repeating-linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), repeating-linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);
  background-image: repeating-conic-gradient(#ccc 0 25%, #fff 0 50%);
  background-position: 0 0, 0.5rem 0.5rem;
  background-size: 1rem 1rem;
}

:host([disabled]) {
  pointer-events: none;
}

:host([disabled])::after {
  bottom: 0;
  content: "";
  cursor: not-allowed;
  display: block;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
}
`,lt=class lt extends D{constructor(){super(...arguments),this.$onPointerDown=null,this.$onPointerMove=null,this.$onPointerUp=null,this.$onWheel=null,this.$wheeling=!1,this.$pointers=new Map,this.$style=ei,this.$action=P,this.background=!1,this.disabled=!1,this.scaleStep=.1,this.themeColor="#39f"}static get observedAttributes(){return super.observedAttributes.concat(["background","disabled","scale-step"])}connectedCallback(){super.connectedCallback(),this.disabled||this.$bind()}disconnectedCallback(){this.$unbind(),super.disconnectedCallback()}$propertyChangedCallback(t,i,e){if(!Object.is(e,i))switch(super.$propertyChangedCallback(t,i,e),t){case"disabled":e?this.$unbind():this.$bind();break}}$bind(){this.$onPointerDown||(this.$onPointerDown=this.$handlePointerDown.bind(this),S(this,Zt,this.$onPointerDown)),this.$onPointerMove||(this.$onPointerMove=this.$handlePointerMove.bind(this),S(this.ownerDocument,Kt,this.$onPointerMove)),this.$onPointerUp||(this.$onPointerUp=this.$handlePointerUp.bind(this),S(this.ownerDocument,Gt,this.$onPointerUp)),this.$onWheel||(this.$onWheel=this.$handleWheel.bind(this),S(this,te,this.$onWheel,{passive:!1,capture:!0}))}$unbind(){this.$onPointerDown&&(w(this,Zt,this.$onPointerDown),this.$onPointerDown=null),this.$onPointerMove&&(w(this.ownerDocument,Kt,this.$onPointerMove),this.$onPointerMove=null),this.$onPointerUp&&(w(this.ownerDocument,Gt,this.$onPointerUp),this.$onPointerUp=null),this.$onWheel&&(w(this,te,this.$onWheel,{capture:!0}),this.$onWheel=null),this.$pointers.clear(),this.style.willChange="",this.$action=P}$addPointers(t){const{$pointers:i}=this;if(t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:e,pageX:s,pageY:n})=>{i.set(e,{startX:s,startY:n,endX:s,endY:n})});else{const{pointerId:e=0,pageX:s,pageY:n}=t;i.set(e,{startX:s,startY:n,endX:s,endY:n})}}$removePointers(t){const{$pointers:i}=this;if(t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:e})=>{i.delete(e)});else{const{pointerId:e=0}=t;i.delete(e)}i.size===0&&(this.style.willChange="",this.$action=P)}$handlePointerDown(t){const{buttons:i,button:e,type:s}=t;if(this.disabled||(s==="pointerdown"&&t.pointerType==="mouse"||s==="mousedown")&&(m(i)&&i!==1||m(e)&&e!==0||t.ctrlKey))return;this.$addPointers(t);const{$pointers:n}=this;let o=P;if(n.size>1?o=st:j(t.target)&&(o=t.target.action||t.target.getAttribute(ze)||P),this.$emit(H,{action:o,relatedEvent:t})===!1){this.$removePointers(t);return}t.preventDefault(),this.$action=o,this.style.willChange="transform"}$handlePointerMove(t){const{$action:i,$pointers:e}=this;if(this.disabled||i===P||e.size===0||this.$emit(Le,{action:i,relatedEvent:t})===!1)return;if(t.preventDefault(),t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:n,pageX:o,pageY:h})=>{const c=e.get(n);c&&Object.assign(c,{endX:o,endY:h})});else{const{pointerId:n=0,pageX:o,pageY:h}=t,c=e.get(n);c&&Object.assign(c,{endX:o,endY:h})}const s={action:i,relatedEvent:t};if(i===st){const n=new Map(e);let o=0,h=0,c=0,r=0,a=t.pageX,u=t.pageY;e.forEach((l,g)=>{n.delete(g),n.forEach(b=>{let p=b.startX-l.startX,E=b.startY-l.startY,C=b.endX-l.endX,y=b.endY-l.endY,v=0,T=0,k=0,x=0;if(p===0?E<0?k=Math.PI*2:E>0&&(k=Math.PI):p>0?k=Math.PI/2+Math.atan(E/p):p<0&&(k=Math.PI*1.5+Math.atan(E/p)),C===0?y<0?x=Math.PI*2:y>0&&(x=Math.PI):C>0?x=Math.PI/2+Math.atan(y/C):C<0&&(x=Math.PI*1.5+Math.atan(y/C)),x>0||k>0){const O=x-k,_=Math.abs(O);_>o&&(o=_,c=O,a=(l.startX+b.startX)/2,u=(l.startY+b.startY)/2)}if(p=Math.abs(p),E=Math.abs(E),C=Math.abs(C),y=Math.abs(y),p>0&&E>0?v=Math.sqrt(p*p+E*E):p>0?v=p:E>0&&(v=E),C>0&&y>0?T=Math.sqrt(C*C+y*y):C>0?T=C:y>0&&(T=y),v>0&&T>0){const O=(T-v)/v,_=Math.abs(O);_>h&&(h=_,r=O,a=(l.startX+b.startX)/2,u=(l.startY+b.startY)/2)}})});const $=o>0,f=h>0;$&&f?(s.rotate=c,s.scale=r,s.centerX=a,s.centerY=u):$?(s.action=At,s.rotate=c,s.centerX=a,s.centerY=u):f?(s.action=q,s.scale=r,s.centerX=a,s.centerY=u):s.action=P}else{const[n]=Array.from(e.values());Object.assign(s,n)}e.forEach(n=>{n.startX=n.endX,n.startY=n.endY}),s.action!==P&&this.$emit(Z,s)}$handlePointerUp(t){const{$action:i}=this;if(this.disabled){this.$removePointers(t);return}if(i===P){this.$removePointers(t);return}if(this.$emit(F,{action:i,relatedEvent:t})===!1){this.$removePointers(t);return}t.preventDefault(),this.$removePointers(t)}$handleWheel(t){if(this.disabled||(t.preventDefault(),this.$wheeling))return;this.$wheeling=!0,setTimeout(()=>{this.$wheeling=!1},50);const e=(t.deltaY>0?-1:1)*this.scaleStep;this.$emit(Z,{action:q,scale:e,relatedEvent:t})}$setAction(t){return rt(t)&&(this.$action=t),this}$toCanvas(t){return new Promise((i,e)=>{if(!this.isConnected){e(new Error("The current element is not connected to the DOM."));return}const s=document.createElement("canvas");let n=this.offsetWidth,o=this.offsetHeight,h=1;ct(t)&&(A(t.width)||A(t.height))&&({width:n,height:o}=ht({aspectRatio:n/o,width:t.width,height:t.height}),h=n/this.offsetWidth),s.width=n,s.height=o;const c=this.querySelector(this.$getTagNameOf(U));if(!c){i(s);return}c.$ready().then(r=>{const a=s.getContext("2d");if(a){const[u,$,f,l,g,b]=c.$getTransform();let p=g,E=b,C=r.naturalWidth,y=r.naturalHeight;h!==1&&(p*=h,E*=h,C*=h,y*=h);const v=C/2,T=y/2;a.fillStyle="transparent",a.fillRect(0,0,n,o),ct(t)&&Et(t.beforeDraw)&&t.beforeDraw.call(this,a,s),a.save(),a.translate(v,T),a.transform(u,$,f,l,p,E),a.translate(-v,-T),a.drawImage(r,0,0,C,y),a.restore()}i(s)}).catch(e)})}};lt.$name=K,lt.$version="__VERSION__";let kt=lt;const ii=`
:host {
  display: inline-block;
}

img {
  display: block;
  height: 100%;
  max-height: none !important;
  max-width: none !important;
  min-height: 0 !important;
  min-width: 0 !important;
  width: 100%;
}
`,le=new WeakMap,de=["alt","crossorigin","decoding","elementtiming","fetchpriority","loading","referrerpolicy","sizes","src","srcset"],dt=class dt extends D{constructor(){super(...arguments),this.$isReady=!1,this.$insetRejected=!1,this.$matrix=[1,0,0,1,0,0],this.$onLoad=null,this.$onCanvasAction=null,this.$onCanvasActionEnd=null,this.$onCanvasActionStart=null,this.$actionStartTarget=null,this.$style=ii,this.$image=new Image,this.initialCenterSize="",this.initialFit=R,this.maxFit="",this.minFit="",this.maxInset="auto",this.minInset="auto",this.zoomAroundCenter=!1,this.rotatable=!1,this.scalable=!1,this.skewable=!1,this.slottable=!1,this.translatable=!1,this.alt="",this.crossorigin="",this.decoding="",this.elementtiming="",this.fetchpriority="",this.loading="",this.referrerpolicy="",this.sizes="",this.src="",this.srcset=""}set $canvas(t){le.set(this,t)}get $canvas(){return le.get(this)}static get observedAttributes(){return super.observedAttributes.concat(de,["initial-center-size","initial-fit","max-fit","max-inset","min-fit","min-inset","rotatable","scalable","skewable","translatable","zoom-around-center"])}attributeChangedCallback(t,i,e){Object.is(e,i)||(super.attributeChangedCallback(t,i,e),de.includes(t)&&(e===null?this.$image.removeAttribute(t):this.$image.setAttribute(t,e)))}$propertyChangedCallback(t,i,e){if(!Object.is(e,i))switch(super.$propertyChangedCallback(t,i,e),t){case"initialCenterSize":case"initialFit":this.$nextTick(()=>{this.$isReady&&this.$canvas&&this.$center(e)});break;case"maxFit":case"minFit":case"maxInset":case"minInset":this.$nextTick(()=>{this.$isReady&&this.$canvas&&(this.$resetTransform(),this.$center(this.initialCenterSize||this.initialFit))});break;case"src":this.$isReady=!1;break}}connectedCallback(){super.connectedCallback();const{$image:t}=this,i=this.closest(this.$getTagNameOf(K));i&&(this.$canvas=i,this.$setStyles({display:"block",position:"absolute"}),this.$onCanvasActionStart=e=>{var s,n;e.defaultPrevented||(this.$actionStartTarget=(n=(s=e.detail)==null?void 0:s.relatedEvent)==null?void 0:n.target)},this.$onCanvasActionEnd=()=>{this.$actionStartTarget=null},this.$onCanvasAction=this.$handleAction.bind(this),S(i,H,this.$onCanvasActionStart),S(i,F,this.$onCanvasActionEnd),S(i,Z,this.$onCanvasAction)),t.complete?this.$handleLoad():(this.$onLoad=this.$handleLoad.bind(this),S(t,B,this.$onLoad)),this.$getShadowRoot().appendChild(t)}disconnectedCallback(){const{$image:t,$canvas:i}=this;i&&(this.$onCanvasActionStart&&(w(i,H,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(w(i,F,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasAction&&(w(i,Z,this.$onCanvasAction),this.$onCanvasAction=null)),t&&this.$onLoad&&(w(t,B,this.$onLoad),this.$onLoad=null),this.$getShadowRoot().removeChild(t),super.disconnectedCallback()}$exceedsFit(t,i){const{naturalWidth:e,naturalHeight:s}=this.$image;let{maxFit:n,minFit:o}=this;switch(n===X&&(e>=i.width||s>=i.height?n=R:n=I),n){case W:if(t.width>i.width&&t.height>i.height)return!0;break;case L:case R:if(t.width>i.width||t.height>i.height)return!0;break;case I:if(t.width>e||t.height>s)return!0;break}switch(o===X&&(e>=i.width||s>=i.height?o=R:o=I),o){case W:case L:if(t.width<i.width||t.height<i.height)return!0;break;case R:if(t.width<i.width&&t.height<i.height)return!0;break;case I:if(t.width<e||t.height<s)return!0;break}return!1}$exceedsInset(t,i){return xe([t.top-i.top,i.right-t.right,i.bottom-t.bottom,t.left-i.left],this.maxInset,this.minInset,this.$canvas,i)}$handleLoad(){const{$image:t}=this;this.$setStyles({width:t.naturalWidth,height:t.naturalHeight}),this.$canvas&&this.$center(this.initialCenterSize||this.initialFit),this.$isReady=!0}$handleAction(t){if(t.defaultPrevented||this.hidden||!(this.rotatable||this.scalable||this.translatable))return;const{$canvas:i}=this,{detail:e}=t;if(e){const{relatedEvent:s}=e;let{action:n}=e;switch(n===st&&(!this.rotatable||!this.scalable)&&(this.rotatable?n=At:this.scalable?n=q:n=P),n){case ve:if(this.translatable){let o=null;s&&(o=s.target.closest(this.$getTagNameOf(z))),o||(o=i.querySelector(this.$getTagNameOf(z))),o&&o.multiple&&!o.active&&(o=i.querySelector(`${this.$getTagNameOf(z)}[active]`)),(!o||o.hidden||!o.movable||o.dynamic||!(this.$actionStartTarget&&o.contains(this.$actionStartTarget)))&&this.$move(e.endX-e.startX,e.endY-e.startY)}break;case At:if(this.rotatable)if(s){const{x:o,y:h}=this.getBoundingClientRect();this.$rotate(e.rotate,s.clientX-o,s.clientY-h)}else this.$rotate(e.rotate);break;case q:if(this.scalable)if(s){const o=s.target.closest(this.$getTagNameOf(z));if(!o||!o.zoomable||o.zoomable&&o.dynamic)if(this.zoomAroundCenter)this.$zoom(e.scale);else{const{x:h,y:c}=this.getBoundingClientRect();this.$zoom(e.scale,s.clientX-h,s.clientY-c)}}else this.$zoom(e.scale);break;case st:if(this.rotatable&&this.scalable){const{rotate:o}=e;let{scale:h}=e;h<0?h=1/(1-h):h+=1;const c=Math.cos(o),r=Math.sin(o),[a,u,$,f]=[c*h,r*h,-r*h,c*h];if(s){const l=this.getBoundingClientRect(),g=s.clientX-l.x,b=s.clientY-l.y,[p,E,C,y]=this.$matrix,v=l.width/2,T=l.height/2,k=g-v,x=b-T,O=(k*y-C*x)/(p*y-C*E),_=(x*p-E*k)/(p*y-C*E);this.$transform(a,u,$,f,O*(1-a)+_*$,_*(1-f)+O*u)}else this.$transform(a,u,$,f,0,0)}break}}}$ready(t){const{$image:i}=this,e=new Promise((s,n)=>{const o=new Error("Failed to load the image source");if(i.complete)i.naturalWidth>0&&i.naturalHeight>0?s(i):n(o);else{const h=()=>{w(i,Vt,c),setTimeout(()=>{s(i)})},c=()=>{w(i,B,h),n(o)};se(i,B,h),se(i,Vt,c)}});return Et(t)&&e.then(s=>(t(s),s)),e}$center(t){const{parentElement:i}=this;if(!i)return this;const e=i.getBoundingClientRect(),s=e.width,n=e.height,{x:o,y:h,width:c,height:r}=this.getBoundingClientRect(),a=o+c/2,u=h+r/2,$=e.x+s/2,f=e.y+n/2,{translatable:l}=this;!l&&!this.$isReady&&(this.translatable=!0,this.$nextTick(()=>{this.translatable=l})),this.$move($-a,f-u);const{maxFit:g,minFit:b}=this;if(t||g||b){const{naturalWidth:p,naturalHeight:E}=this.$image;switch(t){case W:[L,R,X].includes(g)||g===I&&(p<s||E<n)?t=g:b===I&&p>s&&E>n&&(t=b);break;case L:[R,X].includes(g)||g===I&&(p<s||E<n)?t=g:(b===W||b===I&&p>s&&E>n)&&(t=b);break;case R:g===X||g===I&&p<s&&E<n?t=g:([W,L].includes(b)||b===I&&(p>s||E>n))&&(t=b);break;case X:g===I&&p<s&&E<n?t=g:([W,L,R].includes(b)||b===I&&p>s&&E>n)&&(t=b);break;default:[W,L,R,X].includes(g)&&(p>s||E>n)?t=g:[W,L,R,X].includes(b)&&p<s&&E<n&&(t=b)}const C=s/c,y=n/r,{scalable:v}=this;switch(!v&&!this.$isReady&&(this.scalable=!0,this.$nextTick(()=>{this.scalable=v})),t){case W:this.$scale(Math.max(C,y));break;case R:this.$scale(Math.min(C,y));break;case L:this.$scale(C,y);break;case X:this.$scale(Math.min(C,y,1));break;case I:this.$scale(1);break}}return this}$move(t,i=t){if(this.translatable&&m(t)&&m(i)){const[e,s,n,o]=this.$matrix,h=(t*o-n*i)/(e*o-n*s),c=(i*e-s*t)/(e*o-n*s),{$matrix:r}=this;this.$translate(h,c),this.$matrix===r&&this.$insetRejected&&t!==0&&i!==0&&(this.$move(t,0),this.$move(0,i))}return this}$moveTo(t,i=t){if(this.translatable&&m(t)&&m(i)){const[e,s,n,o]=this.$matrix,h=(t*o-n*i)/(e*o-n*s),c=(i*e-s*t)/(e*o-n*s);this.$setTransform(e,s,n,o,h,c)}return this}$rotate(t,i,e){if(this.rotatable){const s=St(t),n=Math.cos(s),o=Math.sin(s),[h,c,r,a]=[n,o,-o,n];if(m(i)&&m(e)){const[u,$,f,l]=this.$matrix,{width:g,height:b}=this.getBoundingClientRect(),p=g/2,E=b/2,C=i-p,y=e-E,v=(C*l-f*y)/(u*l-f*$),T=(y*u-$*C)/(u*l-f*$);this.$transform(h,c,r,a,v*(1-h)-T*r,T*(1-a)-v*c)}else this.$transform(h,c,r,a,0,0)}return this}$zoom(t,i,e){if(!this.scalable||t===0)return this;if(t<0?t=1/(1-t):t+=1,m(i)&&m(e)){const[s,n,o,h]=this.$matrix,{width:c,height:r}=this.getBoundingClientRect(),a=c/2,u=r/2,$=i-a,f=e-u,l=($*h-o*f)/(s*h-o*n),g=(f*s-n*$)/(s*h-o*n);this.$transform(t,0,0,t,l*(1-t),g*(1-t))}else this.$scale(t);return this}$scale(t,i=t){return this.scalable&&this.$transform(t,0,0,i,0,0),this}$skew(t,i=0){if(this.skewable){const e=St(t),s=St(i);this.$transform(1,Math.tan(s),Math.tan(e),1,0,0)}return this}$translate(t,i=t){return this.translatable&&m(t)&&m(i)&&this.$transform(1,0,0,1,t,i),this}$transform(t,i,e,s,n,o){return m(t)&&m(i)&&m(e)&&m(s)&&m(n)&&m(o)?this.$setTransform(Ie(this.$matrix,[t,i,e,s,n,o])):this}$setTransform(t,i,e,s,n,o){if(this.$insetRejected=!1,(this.rotatable||this.scalable||this.skewable||this.translatable)&&(Array.isArray(t)&&([t,i,e,s,n,o]=t),m(t)&&m(i)&&m(e)&&m(s)&&m(n)&&m(o))){const h=[...this.$matrix],c=[t,i,e,s,n,o];if(this.$isReady&&this.$canvas){const{$canvas:r}=this,a=r.getBoundingClientRect();this.style.transform=`matrix(${c.join(", ")})`;const u=this.$image.getBoundingClientRect();if(this.style.transform=`matrix(${h.join(", ")})`,this.$exceedsFit(u,a))return this;if(this.$exceedsInset(u,a))return this.$insetRejected=!0,this;if(this.$emit(M,{x:u.x-a.x,y:u.y-a.y,width:u.width,height:u.height})===!1)return this}if(this.$emit(Tt,{matrix:c,oldMatrix:h})===!1)return this;this.$matrix=c,this.style.transform=`matrix(${c.join(", ")})`}return this}$getTransform(){return this.$matrix.slice()}$resetTransform(){return this.$setTransform([1,0,0,1,0,0])}};dt.$name=U,dt.$version="__VERSION__";let xt=dt;const si=`
:host {
  display: block;
  height: 0;
  left: 0;
  outline: var(--theme-color) solid 1px;
  position: relative;
  top: 0;
  width: 0;
}

:host([transparent]) {
  outline-color: transparent;
}
`,ue=new WeakMap,ut=class ut extends D{constructor(){super(...arguments),this.$onWindowResize=null,this.$onCanvasActionEnd=null,this.$onCanvasActionStart=null,this.$onSelectionChange=null,this.$style=si,this.x=0,this.y=0,this.width=0,this.height=0,this.borderRadius="",this.slottable=!1,this.themeColor="rgba(0, 0, 0, 0.65)"}set $canvas(t){ue.set(this,t)}get $canvas(){return ue.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["border-radius","height","width","x","y"])}$propertyChangedCallback(t,i,e){Object.is(e,i)||(super.$propertyChangedCallback(t,i,e),t==="borderRadius"&&this.$nextTick(()=>{this.$render()}))}connectedCallback(){super.connectedCallback();const t=this.closest(this.$getTagNameOf(K));if(t){this.$canvas=t,this.style.position="absolute";const i=t.querySelector(this.$getTagNameOf(z));i&&(this.borderRadius=i.borderRadius,this.$onWindowResize=this.$render.bind(this),this.$onCanvasActionStart=e=>{i.hidden&&e.detail.action===it&&(this.hidden=!1)},this.$onCanvasActionEnd=e=>{i.hidden&&e.detail.action===it&&(this.hidden=!0)},this.$onSelectionChange=e=>{var c,r;if(((r=(c=e.target)==null?void 0:c.constructor)==null?void 0:r.$name)!==z)return;const{x:s,y:n,width:o,height:h}=e.defaultPrevented?i:e.detail;this.borderRadius=e.target.borderRadius,this.$change(s,n,o,h),(i.hidden||s===0&&n===0&&o===0&&h===0)&&(this.hidden=!0)},S(window,Qt,this.$onWindowResize),S(t,H,this.$onCanvasActionStart),S(t,F,this.$onCanvasActionEnd),S(t,M,this.$onSelectionChange))}this.$render()}disconnectedCallback(){const{$canvas:t}=this;t&&(this.$onWindowResize&&(w(window,Qt,this.$onWindowResize),this.$onWindowResize=null),this.$onCanvasActionStart&&(w(t,H,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(w(t,F,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onSelectionChange&&(w(t,M,this.$onSelectionChange),this.$onSelectionChange=null)),super.disconnectedCallback()}$change(t,i,e=this.width,s=this.height){return!m(t)||!m(i)||!m(e)||!m(s)||t===this.x&&i===this.y&&e===this.width&&s===this.height?this:(this.hidden&&(this.hidden=!1),this.x=t,this.y=i,this.width=e,this.height=s,this.$render())}$reset(){return this.$change(0,0,0,0)}$render(){return this.$setStyles({transform:`translate(${this.x}px, ${this.y}px)`,width:this.width,height:this.height,borderRadius:this.borderRadius,outlineWidth:N.innerWidth*N.devicePixelRatio})}};ut.$name=_e,ut.$version="__VERSION__";let It=ut;const ni=`
:host {
  background-color: var(--theme-color);
  display: block;
}

:host([action="move"]),
:host([action="select"]) {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

:host([action="move"]) {
  cursor: move;
}

:host([action="select"]) {
  cursor: crosshair;
}

:host([action$="-resize"]) {
  background-color: transparent;
  height: 15px;
  position: absolute;
  width: 15px;
}

:host([action$="-resize"])::after {
  background-color: var(--theme-color);
  content: "";
  display: block;
  height: 5px;
  left: 50%;
  top: 50%;
  position: absolute;
  width: 5px;
  transform: translate(-50%, -50%);
}

:host([action="n-resize"]),
:host([action="s-resize"]) {
  cursor: ns-resize;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

:host([action="n-resize"]) {
  top: -8px;
}

:host([action="s-resize"]) {
  bottom: -8px;
}

:host([action="e-resize"]),
:host([action="w-resize"]) {
  cursor: ew-resize;
  height: 100%;
  top: 50%;
  transform: translateY(-50%);
}

:host([action="e-resize"]) {
  right: -8px;
}

:host([action="w-resize"]) {
  left: -8px;
}

:host([action="ne-resize"]) {
  cursor: nesw-resize;
  right: -8px;
  top: -8px;
}

:host([action="nw-resize"]) {
  cursor: nwse-resize;
  left: -8px;
  top: -8px;
}

:host([action="se-resize"]) {
  cursor: nwse-resize;
  right: -8px;
  bottom: -8px;
}

:host([action="se-resize"])::after {
  height: 15px;
  width: 15px;
}

@media (pointer: coarse) {
  :host([action="se-resize"])::after {
    height: 10px;
    width: 10px;
  }
}

@media (pointer: fine) {
  :host([action="se-resize"])::after {
    height: 5px;
    width: 5px;
  }
}

:host([action="sw-resize"]) {
  cursor: nesw-resize;
  left: -8px;
  bottom: -8px;
}

:host([plain]) {
  background-color: transparent;
}
`,ft=class ft extends D{constructor(){super(...arguments),this.$onCanvasCropEnd=null,this.$onCanvasCropStart=null,this.$style=ni,this.action=P,this.plain=!1,this.slottable=!1,this.themeColor="rgba(51, 153, 255, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["action","plain"])}};ft.$name=Oe,ft.$version="__VERSION__";let Nt=ft;const ai=`
:host {
  display: block;
  left: 0;
  position: relative;
  right: 0;
}

:host([outlined]) {
  outline: 1px solid var(--theme-color);
}

:host([multiple]) {
  outline: 1px dashed rgba(255, 255, 255, 0.5);
}

:host([multiple])::after {
  bottom: 0;
  content: '';
  cursor: pointer;
  display: block;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

:host([multiple][active]) {
  outline-color: var(--theme-color);
  z-index: 1;
}

:host([multiple]) > * {
  visibility: hidden;
}

:host([multiple][active]) > * {
  visibility: visible;
}

:host([multiple][active])::after {
  display: none;
}
`,fe=new WeakMap,$e=new WeakMap;function ge(d,t,i){const e=parseFloat(d);return Number.isNaN(e)?0:d.trim().endsWith("%")?e/100*t:e*i}function me(d){const[t,i=t,e=t,s=i]=d;return[t,i,e,s]}function oi(d,t,i,e){const[s,n=s]=d.split("/").map(l=>{const g=l.trim().split(/\s+/).filter(Boolean).slice(0,4);return g.length>0?g:["0"]}),o=me(s).map(l=>ge(l,t,e)),h=me(n).map(l=>ge(l,i,e)),c=o.map((l,g)=>[Math.max(l,0),Math.max(h[g],0)]),[r,a,u,$]=c,f=Math.min(1,t/(r[0]+a[0]||1),t/($[0]+u[0]||1),i/(r[1]+$[1]||1),i/(a[1]+u[1]||1));return f<1?c.map(([l,g])=>[l*f,g*f]):c}const $t=class $t extends D{constructor(){super(...arguments),this.$onCanvasAction=null,this.$onCanvasActionStart=null,this.$onCanvasActionEnd=null,this.$onDocumentKeyDown=null,this.$action="",this.$actionStartTarget=null,this.$resizeStart=null,this.$changing=!1,this.$insetRejected=!1,this.$style=ai,this.$initialSelection={x:0,y:0,width:0,height:0},this.$changingAroundCenter=!1,this.x=0,this.y=0,this.width=0,this.height=0,this.aspectRatio=NaN,this.borderRadius="",this.initialAspectRatio=NaN,this.initialCoverage=NaN,this.active=!1,this.linked=!1,this.dynamic=!1,this.movable=!1,this.maxInset="auto",this.minInset="auto",this.resizable=!1,this.resizeAroundCenter=!1,this.zoomable=!1,this.zoomAroundCenter=!1,this.multiple=!1,this.keyboard=!1,this.outlined=!1,this.precise=!1}set $canvas(t){fe.set(this,t)}get $canvas(){return fe.get(this)}set $image(t){$e.set(this,t)}get $image(){return $e.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["active","aspect-ratio","border-radius","dynamic","height","initial-aspect-ratio","initial-coverage","keyboard","linked","max-inset","min-inset","movable","multiple","outlined","precise","resizable","resize-around-center","width","x","y","zoom-around-center","zoomable"])}$propertyChangedCallback(t,i,e){if(!Object.is(e,i))switch(super.$propertyChangedCallback(t,i,e),t){case"borderRadius":this.$nextTick(()=>{this.$render(),this.$emit(M,{x:this.x,y:this.y,width:this.width,height:this.height})});break;case"x":case"y":case"width":case"height":this.$changing||this.$nextTick(()=>{this.$change(this.x,this.y,this.width,this.height,this.aspectRatio,!0)});break;case"aspectRatio":case"initialAspectRatio":this.$nextTick(()=>{this.$initSelection()});break;case"initialCoverage":this.$nextTick(()=>{A(e)&&e<=1&&this.$initSelection(!0,A(i))});break;case"keyboard":this.$nextTick(()=>{this.$canvas&&(e?this.$onDocumentKeyDown||(this.$onDocumentKeyDown=this.$handleKeyDown.bind(this),S(this.ownerDocument,Jt,this.$onDocumentKeyDown)):this.$onDocumentKeyDown&&(w(this.ownerDocument,Jt,this.$onDocumentKeyDown),this.$onDocumentKeyDown=null))});break;case"multiple":this.$nextTick(()=>{if(this.$canvas){const s=this.$getSelections();e?(s.forEach(n=>{n.active=!1}),this.active=!0,this.$emit(M,{x:this.x,y:this.y,width:this.width,height:this.height})):(this.active=!1,s.slice(1).forEach(n=>{this.$removeSelection(n)}))}});break;case"precise":this.$nextTick(()=>{this.$change(this.x,this.y)});break;case"linked":e&&(this.dynamic=!0);break}}connectedCallback(){super.connectedCallback();const t=this.closest(this.$getTagNameOf(K));if(t){this.$canvas=t;const i=t.querySelector(this.$getTagNameOf(U));i&&(this.$image=i),this.$setStyles({position:"absolute",transform:`translate(${this.x}px, ${this.y}px)`}),this.hidden||this.$render(),this.$initSelection(!0),this.$onCanvasActionStart=this.$handleActionStart.bind(this),this.$onCanvasActionEnd=this.$handleActionEnd.bind(this),this.$onCanvasAction=this.$handleAction.bind(this),S(t,H,this.$onCanvasActionStart),S(t,F,this.$onCanvasActionEnd),S(t,Z,this.$onCanvasAction)}else this.$render()}disconnectedCallback(){const{$canvas:t}=this;t&&(this.$onCanvasActionStart&&(w(t,H,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(w(t,F,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasAction&&(w(t,Z,this.$onCanvasAction),this.$onCanvasAction=null)),super.disconnectedCallback()}$exceedsInset(t,i,e,s){const{parentElement:n,maxInset:o,minInset:h}=this;if(!n||e===0&&s===0||o==="auto"&&h==="auto")return!1;const c=n.getBoundingClientRect();return xe([i,c.width-(t+e),c.height-(i+s),t],o,h,n,c)}$getSelections(){let t=[];return this.parentElement&&(t=Array.from(this.parentElement.querySelectorAll(this.$getTagNameOf(z)))),t}async $initSelection(t=!1,i=!1){const{initialCoverage:e,parentElement:s}=this;if(A(e)&&s){const{$canvas:n}=this;let o=this.$image||null;if(o){try{await o.$ready()}catch{o=null}if(this.parentElement!==s||this.initialCoverage!==e)return}const c=(o||n||s).getBoundingClientRect(),a=(n||s).getBoundingClientRect(),u=o?c.left-a.left:0,$=o?c.top-a.top:0,f=this.aspectRatio||this.initialAspectRatio;let l=(i?0:this.width)||c.width*e,g=(i?0:this.height)||c.height*e;A(f)&&({width:l,height:g}=ht({aspectRatio:f,width:l,height:g})),t?this.$change(u+(c.width-l)/2,$+(c.height-g)/2,l,g):this.$change(this.x,this.y,l,g),this.$initialSelection={x:this.x,y:this.y,width:this.width,height:this.height}}}$createSelection(){const t=this.cloneNode(!0);return this.hasAttribute("id")&&t.removeAttribute("id"),t.initialCoverage=NaN,this.active=!1,this.parentElement&&this.parentElement.insertBefore(t,this.nextSibling),t}$removeSelection(t=this){if(this.parentElement){const i=this.$getSelections();if(i.length>1){const e=i.indexOf(t),s=i[e+1]||i[e-1];s&&(t.active=!1,this.parentElement.removeChild(t),s.active=!0,s.$emit(M,{x:s.x,y:s.y,width:s.width,height:s.height}))}else this.$clear()}}$handleActionStart(t){if(t.defaultPrevented)return;const{action:i,relatedEvent:e}=t.detail||{},s=e==null?void 0:e.target;if(this.$action="",this.$actionStartTarget=s,this.$resizeStart=typeof i=="string"&&i.endsWith("-resize")&&e?{action:i,pageX:e.pageX,pageY:e.pageY,x:this.x,y:this.y,width:this.width,height:this.height}:null,i===it&&!this.resizable&&(!this.multiple||this.active)&&A(this.width)&&A(this.height)&&e&&t.currentTarget){const n=vt(t.currentTarget);(this.multiple&&!this.hidden?this.$createSelection():this).$change(e.pageX-n.left,e.pageY-n.top,this.width,this.height)}!this.hidden&&this.multiple&&!this.active&&s===this&&this.parentElement&&(this.$getSelections().forEach(n=>{n.active=!1}),this.active=!0,this.$emit(M,{x:this.x,y:this.y,width:this.width,height:this.height}))}$handleAction(t){const{currentTarget:i,detail:e}=t;if(t.defaultPrevented||!i||!e)return;const{relatedEvent:s}=e;let{action:n}=e;const o=s?Ue(s):null;if(!n&&this.multiple&&(n=this.$action||(o==null?void 0:o.action),this.$action=n),!n||this.hidden&&n!==it||this.multiple&&!this.active&&n!==q)return;const{width:h,height:c}=this;let r=e.endX-e.startX,a=e.endY-e.startY,{aspectRatio:u}=this,$=null;if(this.$resizeStart&&n.endsWith("-resize")){const f=this.$resizeStart;n=f.action,r=e.endX-f.pageX,a=e.endY-f.pageY,$=f}if(!A(u)&&s.shiftKey){const f=($==null?void 0:$.width)??h,l=($==null?void 0:$.height)??c;u=A(f)&&A(l)?f/l:1}switch(n){case it:if(!this.resizable&&A(this.width)&&A(this.height))break;if(r!==0||a!==0){r===0?r=a:a===0&&(a=r);const{$canvas:f}=this,l=vt(i);(this.multiple&&!this.hidden?this.$createSelection():this).$change(e.startX-l.left,e.startY-l.top,Math.abs(r),Math.abs(a),u),r<0?a<0?n=Q:a>0&&(n=et):r>0&&(a<0?n=J:a>0&&(n=tt)),f&&(f.$action=n)}break;case ve:this.movable&&(this.dynamic||this.$actionStartTarget&&this.contains(this.$actionStartTarget))&&this.$move(r,a);break;case q:case st:if(s&&this.zoomable&&(this.dynamic||this.contains(s.target)))if(this.zoomAroundCenter)this.$zoom(e.scale);else{const f=vt(i);this.$zoom(e.scale,s.pageX-f.left,s.pageY-f.top)}break;default:this.$resize(n,r,a,u)}}$handleActionEnd(){this.$action="",this.$actionStartTarget=null,this.$resizeStart=null}$handleKeyDown(t){if(t.defaultPrevented||this.hidden||!this.keyboard||this.multiple&&!this.active)return;const{activeElement:i}=document;if(!(i&&(["INPUT","TEXTAREA"].includes(i.tagName)||["true","plaintext-only"].includes(i.contentEditable))))switch(t.key){case"Backspace":t.metaKey&&(t.preventDefault(),this.$removeSelection());break;case"Delete":t.preventDefault(),this.$removeSelection();break;case"ArrowLeft":t.preventDefault(),this.$move(-1,0);break;case"ArrowRight":t.preventDefault(),this.$move(1,0);break;case"ArrowUp":t.preventDefault(),this.$move(0,-1);break;case"ArrowDown":t.preventDefault(),this.$move(0,1);break;case"+":t.preventDefault(),this.$zoom(.1);break;case"-":t.preventDefault(),this.$zoom(-.1);break}}$center(){const{parentElement:t}=this;if(!t)return this;const i=(t.offsetWidth-this.width)/2,e=(t.offsetHeight-this.height)/2;return this.$change(i,e)}$move(t,i=t){return this.$moveTo(this.x+t,this.y+i)}$moveTo(t,i=t){return this.movable?(this.$change(t,i),this.$insetRejected&&t!==this.x&&i!==this.y&&(this.$change(t,this.y),this.$change(this.x,i)),this):this}$resize(t,i=0,e=0,s=this.aspectRatio){if(!this.resizable)return this;const n=A(s),{$canvas:o}=this;let{x:h,y:c,width:r,height:a}=this.$resizeStart||this;switch(t){case Bt:c+=e,a-=e,a<0&&(t=Ut,a=-a,c-=a),n&&(i=e*s,h+=i/2,r-=i,r<0&&(r=-r,h-=r));break;case jt:r+=i,r<0&&(t=qt,r=-r,h-=r),n&&(e=i/s,c-=e/2,a+=e,a<0&&(a=-a,c-=a));break;case Ut:a+=e,a<0&&(t=Bt,a=-a,c-=a),n&&(i=e*s,h-=i/2,r+=i,r<0&&(r=-r,h-=r));break;case qt:h+=i,r-=i,r<0&&(t=jt,r=-r,h-=r),n&&(e=i/s,c+=e/2,a-=e,a<0&&(a=-a,c-=a));break;case J:n&&(e=-i/s),c+=e,a-=e,r+=i,r<0&&a<0?(t=et,r=-r,a=-a,h-=r,c-=a):r<0?(t=Q,r=-r,h-=r):a<0&&(t=tt,a=-a,c-=a);break;case Q:n&&(e=i/s),h+=i,c+=e,r-=i,a-=e,r<0&&a<0?(t=tt,r=-r,a=-a,h-=r,c-=a):r<0?(t=J,r=-r,h-=r):a<0&&(t=et,a=-a,c-=a);break;case tt:n&&(e=i/s),r+=i,a+=e,r<0&&a<0?(t=Q,r=-r,a=-a,h-=r,c-=a):r<0?(t=et,r=-r,h-=r):a<0&&(t=J,a=-a,c-=a);break;case et:n&&(e=-i/s),h+=i,r-=i,a+=e,r<0&&a<0?(t=J,r=-r,a=-a,h-=r,c-=a):r<0?(t=tt,r=-r,h-=r):a<0&&(t=Q,a=-a,c-=a);break}o&&o.$setAction(t);const u=this.$changingAroundCenter;this.$changingAroundCenter=this.resizeAroundCenter||u;try{return this.$change(h,c,r,a)}finally{this.$changingAroundCenter=u}}$zoom(t,i,e){if(!this.zoomable||t===0)return this;t<0?t=1/(1-t):t+=1;const{width:s,height:n}=this,o=s*t,h=n*t;let c=this.x,r=this.y;m(i)&&m(e)?(c-=(o-s)*((i-this.x)/s),r-=(h-n)*((e-this.y)/n)):(c-=(o-s)/2,r-=(h-n)/2);const a=this.$changingAroundCenter;this.$changingAroundCenter=this.zoomAroundCenter&&!(m(i)&&m(e))||a;try{return this.$change(c,r,o,h)}finally{this.$changingAroundCenter=a}}$change(t,i,e=this.width,s=this.height,n=this.aspectRatio,o=!1){if(this.$insetRejected=!1,this.$changing||!m(t)||!m(i)||!m(e)||!m(s)||e<0||s<0)return this;if(A(n)&&({width:e,height:s}=ht({aspectRatio:n,width:e,height:s},"cover")),this.$changingAroundCenter){this.precise||(e=Math.round(e),s=Math.round(s),(e-this.width)%2!==0&&(e+=e<this.width?-1:1),(s-this.height)%2!==0&&(s+=s<this.height?-1:1));const h=this.$resizeStart||this;t=h.x+(h.width-e)/2,i=h.y+(h.height-s)/2}else this.precise||(e=Math.round(e),s=Math.round(s),t=Math.round(t),i=Math.round(i));return t===this.x&&i===this.y&&e===this.width&&s===this.height&&Object.is(n,this.aspectRatio)&&!o?this:this.$exceedsInset(t,i,e,s)?(this.$insetRejected=!0,this):(this.hidden&&(this.hidden=!1),this.$emit(M,{x:t,y:i,width:e,height:s})===!1?this:(this.$changing=!0,this.x=t,this.y=i,this.width=e,this.height=s,this.$changing=!1,this.$render()))}$reset(){const{x:t,y:i,width:e,height:s}=this.$initialSelection;return this.$change(t,i,e,s)}$clear(){return this.$change(0,0,0,0,NaN,!0),this.hidden=!0,this}$render(){return this.$setStyles({transform:`translate(${this.x}px, ${this.y}px)`,width:this.width,height:this.height,borderRadius:this.borderRadius})}$toCanvas(t){return new Promise((i,e)=>{if(!this.isConnected){e(new Error("The current element is not connected to the DOM."));return}const s=document.createElement("canvas");let{width:n,height:o}=this,h=1;if(ct(t)&&(A(t.width)||A(t.height))&&({width:n,height:o}=ht({aspectRatio:n/o,width:t.width,height:t.height}),h=n/this.width),s.width=n,s.height=o,!this.$canvas){i(s);return}const{$image:c}=this;if(!c){i(s);return}c.$ready().then(r=>{const a=s.getContext("2d");if(a){const[u,$,f,l,g,b]=c.$getTransform(),p=-this.x,E=-this.y,C=(p*l-f*E)/(u*l-f*$),y=(E*u-$*p)/(u*l-f*$);let v=u*C+f*y+g,T=$*C+l*y+b,k=r.naturalWidth,x=r.naturalHeight;h!==1&&(v*=h,T*=h,k*=h,x*=h);const O=k/2,_=x/2;a.fillStyle="transparent",a.fillRect(0,0,n,o),ct(t)&&Et(t.beforeDraw)&&t.beforeDraw.call(this,a,s),a.save();const Xt=oi(this.borderRadius,n,o,h);if(Xt.some(([G,V])=>G>0&&V>0)){const[[G,V],[Ct,Yt],[Ft,yt],[wt,Ht]]=Xt,nt=Math.PI/2;a.beginPath(),a.moveTo(G,0),a.lineTo(n-Ct,0),a.ellipse(n-Ct,Yt,Ct,Yt,0,-nt,0),a.lineTo(n,o-yt),a.ellipse(n-Ft,o-yt,Ft,yt,0,0,nt),a.lineTo(wt,o),a.ellipse(wt,o-Ht,wt,Ht,0,nt,Math.PI),a.lineTo(0,V),a.ellipse(G,V,G,V,0,Math.PI,Math.PI+nt),a.closePath(),a.clip()}a.translate(O,_),a.transform(u,$,f,l,v,T),a.translate(-O,-_),a.drawImage(r,0,0,k,x),a.restore()}i(s)}).catch(e)})}};$t.$name=z,$t.$version="__VERSION__";let Rt=$t;const ri=`
:host {
  display: flex;
  flex-direction: column;
  position: relative;
  touch-action: none;
  user-select: none;
}

:host([bordered]) {
  border: 1px dashed var(--theme-color);
}

:host([covered]) {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

:host > span {
  display: flex;
  flex: 1;
}

:host > span + span {
  border-top: 1px dashed var(--theme-color);
}

:host > span > span {
  flex: 1;
}

:host > span > span + span {
  border-left: 1px dashed var(--theme-color);
}
`,gt=class gt extends D{constructor(){super(...arguments),this.$style=ri,this.bordered=!1,this.columns=3,this.covered=!1,this.rows=3,this.slottable=!1,this.themeColor="rgba(238, 238, 238, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["bordered","columns","covered","rows"])}$propertyChangedCallback(t,i,e){Object.is(e,i)||(super.$propertyChangedCallback(t,i,e),(t==="rows"||t==="columns")&&this.$nextTick(()=>{this.$render()}))}connectedCallback(){super.connectedCallback(),this.$render()}$render(){const t=this.$getShadowRoot(),i=document.createDocumentFragment();for(let e=0;e<this.rows;e+=1){const s=document.createElement("span");s.setAttribute("data-cropper-grid-row",""),s.setAttribute("role","row");for(let n=0;n<this.columns;n+=1){const o=document.createElement("span");o.setAttribute("role","gridcell"),s.appendChild(o)}i.appendChild(s)}t&&(t.querySelectorAll("[data-cropper-grid-row]").forEach(e=>e.remove()),t.appendChild(i))}};gt.$name=Re,gt.$version="__VERSION__";let Ot=gt;const hi=`
:host {
  display: inline-block;
  height: 1em;
  position: relative;
  touch-action: none;
  user-select: none;
  vertical-align: middle;
  width: 1em;
}

:host::before,
:host::after {
  background-color: var(--theme-color);
  content: "";
  display: block;
  position: absolute;
}

:host::before {
  height: 1px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}

:host::after {
  height: 100%;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 1px;
}

:host([centered]) {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
`,mt=class mt extends D{constructor(){super(...arguments),this.$style=hi,this.centered=!1,this.slottable=!1,this.themeColor="rgba(238, 238, 238, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["centered"])}};mt.$name=Ne,mt.$version="__VERSION__";let _t=mt;const ci=`
:host {
  display: block;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
}
`,pe=new WeakMap,be=new WeakMap,Ee=new WeakMap,Ce=new WeakMap,li="both",di="horizontal",ye="vertical",ui="none",pt=class pt extends D{constructor(){super(...arguments),this.$onSelectionChange=null,this.$onSourceImageLoad=null,this.$onSourceImageTransform=null,this.$scale=1,this.$style=ci,this.resize=ye,this.selection="",this.slottable=!1}set $canvas(t){pe.set(this,t)}get $canvas(){return pe.get(this)}set $image(t){be.set(this,t)}get $image(){return be.get(this)}set $sourceImage(t){Ce.set(this,t)}get $sourceImage(){return Ce.get(this)}set $selection(t){Ee.set(this,t)}get $selection(){return Ee.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["resize","selection"])}connectedCallback(){var i;super.connectedCallback();let t=null;if(this.selection?t=((i=ke(this))==null?void 0:i.querySelector(this.selection))??null:t=this.closest(this.$getTagNameOf(z)),j(t)){this.$selection=t,this.$onSelectionChange=this.$handleSelectionChange.bind(this),S(t,M,this.$onSelectionChange);const e=t.closest(this.$getTagNameOf(K));if(e){this.$canvas=e;const s=e.querySelector(this.$getTagNameOf(U));s&&(this.$sourceImage=s,this.$image=s.cloneNode(!0),this.$getShadowRoot().appendChild(this.$image),this.$onSourceImageLoad=this.$handleSourceImageLoad.bind(this),this.$onSourceImageTransform=this.$handleSourceImageTransform.bind(this),S(s.$image,B,this.$onSourceImageLoad),S(s,Tt,this.$onSourceImageTransform))}this.$render()}}disconnectedCallback(){const{$image:t,$selection:i,$sourceImage:e}=this;i&&this.$onSelectionChange&&(w(i,M,this.$onSelectionChange),this.$onSelectionChange=null),e&&this.$onSourceImageLoad&&(w(e.$image,B,this.$onSourceImageLoad),this.$onSourceImageLoad=null),e&&this.$onSourceImageTransform&&(w(e,Tt,this.$onSourceImageTransform),this.$onSourceImageTransform=null);const s=this.$getShadowRoot();t&&(s!=null&&s.contains(t))&&s.removeChild(t),super.disconnectedCallback()}$handleSelectionChange(t){this.$render(t.defaultPrevented?this.$selection:t.detail)}$handleSourceImageLoad(){const{$image:t,$sourceImage:i}=this,e=t.getAttribute("src"),s=i.getAttribute("src");s&&s!==e&&(t.setAttribute("src",s),t.$ready(()=>{this.$render()}))}$handleSourceImageTransform(t){this.$render(void 0,t.detail.matrix)}$render(t,i){const{$canvas:e,$selection:s}=this;!t&&!s.hidden&&(t=s),(!t||t.x===0&&t.y===0&&t.width===0&&t.height===0)&&(t={x:0,y:0,width:e.offsetWidth,height:e.offsetHeight});const{x:n,y:o,width:h,height:c}=t,r={},{clientWidth:a,clientHeight:u}=this;let $=a,f=u,l=NaN;switch(this.resize){case li:l=1,$=h,f=c,r.width=h,r.height=c;break;case di:l=c>0?u/c:0,$=h*l,r.width=$;break;case ye:l=h>0?a/h:0,f=c*l,r.height=f;break;case ui:default:a>0?l=h>0?a/h:0:u>0&&(l=c>0?u/c:0)}this.$scale=l,r.borderRadius=Number.isFinite(l)&&l>0?(s.borderRadius||"").replace(/(-?\d*\.?\d+)px/g,(g,b)=>`${parseFloat(b)*l}px`):s.borderRadius,this.$setStyles(r),this.$sourceImage&&setTimeout(()=>{this.$transformImageByOffset(i??this.$sourceImage.$getTransform(),-n,-o)})}$transformImageByOffset(t,i,e){const{$image:s,$scale:n,$sourceImage:o}=this;if(o&&s&&n>=0){const[h,c,r,a,u,$]=t,f=(i*a-r*e)/(h*a-r*c),l=(e*h-c*i)/(h*a-r*c),g=h*f+r*l+u,b=c*f+a*l+$;o.$ready(p=>{this.$setStyles.call(s,{width:p.naturalWidth*n,height:p.naturalHeight*n})}),s.$setTransform(h,c,r,a,g*n,b*n)}}};pt.$name=Pe,pt.$version="__VERSION__";let Pt=pt;const fi='<cropper-canvas background><cropper-image rotatable scalable skewable translatable></cropper-image><cropper-shade hidden></cropper-shade><cropper-handle action="select" plain></cropper-handle><cropper-selection initial-coverage="0.5" movable resizable><cropper-grid role="grid" bordered covered></cropper-grid><cropper-crosshair centered></cropper-crosshair><cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle><cropper-handle action="n-resize"></cropper-handle><cropper-handle action="e-resize"></cropper-handle><cropper-handle action="s-resize"></cropper-handle><cropper-handle action="w-resize"></cropper-handle><cropper-handle action="ne-resize"></cropper-handle><cropper-handle action="nw-resize"></cropper-handle><cropper-handle action="se-resize"></cropper-handle><cropper-handle action="sw-resize"></cropper-handle></cropper-selection></cropper-canvas>',$i=/^(img|canvas)$/,gi=/<(\/?(?:script|style)[^>]*)>/gi,we={template:fi};kt.$define();_t.$define();Ot.$define();Nt.$define();xt.$define();Rt.$define();It.$define();Pt.$define();const Lt=class Lt{constructor(t,i){var h;if(this.options=we,rt(t)&&(t=document.querySelector(t)),!j(t)||!$i.test(t.localName))throw new Error("The first argument is required and must be an <img> or <canvas> element.");this.element=t,i={...we,...i},this.options=i;let{container:e}=i;if(e&&(rt(e)&&(e=(h=ke(t))==null?void 0:h.querySelector(e)),!j(e)))throw new Error("The `container` option must be an element or a valid selector.");j(e)||(t.parentElement?e=t.parentElement:e=t.ownerDocument.body),this.container=e;const s=t.localName;let n="";s==="img"?{src:n}=t:s==="canvas"&&window.HTMLCanvasElement&&(n=t.toDataURL());const{template:o}=i;if(o&&rt(o)){const c=document.createElement("template"),r=document.createDocumentFragment();c.innerHTML=o.replace(gi,"&lt;$1&gt;"),r.appendChild(c.content),Array.from(r.querySelectorAll(U)).forEach(a=>{a.setAttribute("src",n),a.setAttribute("alt",t.alt||"The image to crop"),s==="img"&&["crossorigin","decoding","elementtiming","fetchpriority","loading","referrerpolicy","sizes","srcset"].forEach(u=>{t.hasAttribute(u)&&a.setAttribute(u,t.getAttribute(u)||"")})}),t.parentElement?(t.style.display="none",e.insertBefore(r,t.nextSibling)):e.appendChild(r)}}getCropperCanvas(){return this.container.querySelector(K)}getCropperImage(){return this.container.querySelector(U)}getCropperSelection(){return this.container.querySelector(z)}getCropperSelections(){return this.container.querySelectorAll(z)}destroy(){var i;const t=this.getCropperCanvas();t&&((i=t.parentElement)==null||i.removeChild(t)),this.element&&(this.element.style.display="")}};Lt.version="__VERSION__";let zt=Lt;function mi(d,t){return new zt(d,t)}export{ve as ACTION_MOVE,P as ACTION_NONE,jt as ACTION_RESIZE_EAST,Bt as ACTION_RESIZE_NORTH,J as ACTION_RESIZE_NORTHEAST,Q as ACTION_RESIZE_NORTHWEST,Ut as ACTION_RESIZE_SOUTH,tt as ACTION_RESIZE_SOUTHEAST,et as ACTION_RESIZE_SOUTHWEST,qt as ACTION_RESIZE_WEST,At as ACTION_ROTATE,q as ACTION_SCALE,it as ACTION_SELECT,st as ACTION_TRANSFORM,ze as ATTRIBUTE_ACTION,K as CROPPER_CANVAS,Ne as CROPPER_CROSSHAIR,Re as CROPPER_GIRD,Oe as CROPPER_HANDLE,U as CROPPER_IMAGE,z as CROPPER_SELECTION,_e as CROPPER_SHADE,Pe as CROPPER_VIEWER,zt as Cropper,kt as CropperCanvas,_t as CropperCrosshair,D as CropperElement,Ot as CropperGrid,Nt as CropperHandle,xt as CropperImage,Rt as CropperSelection,It as CropperShade,Pt as CropperViewer,fi as DEFAULT_TEMPLATE,Z as EVENT_ACTION,F as EVENT_ACTION_END,Le as EVENT_ACTION_MOVE,H as EVENT_ACTION_START,M as EVENT_CHANGE,Vt as EVENT_ERROR,Jt as EVENT_KEYDOWN,B as EVENT_LOAD,Zt as EVENT_POINTER_DOWN,Kt as EVENT_POINTER_MOVE,Gt as EVENT_POINTER_UP,Qt as EVENT_RESIZE,Me as EVENT_TOUCH_END,De as EVENT_TOUCH_MOVE,We as EVENT_TOUCH_START,Tt as EVENT_TRANSFORM,te as EVENT_WHEEL,Dt as HAS_POINTER_EVENT,bt as IS_BROWSER,Mt as IS_TOUCH_DEVICE,Y as NAMESPACE,R as OBJECT_FIT_CONTAIN,W as OBJECT_FIT_COVER,L as OBJECT_FIT_FILL,I as OBJECT_FIT_NONE,X as OBJECT_FIT_SCALE_DOWN,N as WINDOW,mi as createCropper,zt as default,je as emit,xe as exceedsInset,ht as getAdjustedSizes,Ue as getComposedPathTarget,vt as getOffset,ke as getRootDocument,j as isElement,Et as isFunction,Se as isNaN,m as isNumber,Ae as isObject,ct as isPlainObject,A as isPositiveNumber,rt as isString,Xe as isUndefined,Ie as multiplyMatrices,qe as nextTick,w as off,S as on,se as once,Ve as splitInsetValue,St as toAngleInRadian,ie as toCamelCase,ae as toInsetValues,ee as toKebabCase};
