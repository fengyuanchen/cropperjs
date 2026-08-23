const gt=typeof window<"u"&&typeof window.document<"u",N=gt?window:{},kt=gt?"ontouchstart"in N.document.documentElement:!1,Rt=gt?"PointerEvent"in N:!1,Y="cropper",K=`${Y}-canvas`,ge=`${Y}-crosshair`,me=`${Y}-grid`,pe=`${Y}-handle`,j=`${Y}-image`,M=`${Y}-selection`,be=`${Y}-shade`,Ee=`${Y}-viewer`,at="select",ce="move",q="scale",pt="rotate",tt="transform",P="none",_t="n-resize",It="e-resize",Pt="s-resize",Mt="w-resize",G="ne-resize",V="nw-resize",J="se-resize",Q="sw-resize",ve="action",we=kt?"touchend touchcancel":"mouseup",ye=kt?"touchmove":"mousemove",Se=kt?"touchstart":"mousedown",Dt=Rt?"pointerdown":Se,zt=Rt?"pointermove":ye,Wt=Rt?"pointerup pointercancel":we,Lt="error",Xt="keydown",U="load",Yt="resize",Ht="wheel",Z="action",H="actionend",Ce="actionmove",F="actionstart",X="change",bt="transform",x="contain",z="cover",W="fill",O="none",L="scale-down";function st(d){return typeof d=="string"}const le=Number.isNaN||N.isNaN;function m(d){return typeof d=="number"&&!le(d)}function A(d){return m(d)&&d>0&&d<1/0}function Te(d){return typeof d>"u"}function de(d){return typeof d=="object"&&d!==null}const{hasOwnProperty:Ae}=Object.prototype;function ot(d){if(!de(d))return!1;try{const{constructor:t}=d,{prototype:i}=t;return t&&i&&Ae.call(i,"isPrototypeOf")}catch{return!1}}function Ot(d){return typeof d=="function"}function B(d){return typeof d=="object"&&d!==null&&d.nodeType===1}const ke=/([a-z\d])([A-Z])/g;function Ft(d){return String(d).replace(ke,"$1-$2").toLowerCase()}const Re=/-[A-z\d]/g;function Ut(d){return d.replace(Re,t=>t.slice(1).toUpperCase())}const ue=/\s\s*/;function y(d,t,i,e){t.trim().split(ue).forEach(s=>{d.removeEventListener(s,i,e)})}function C(d,t,i,e){t.trim().split(ue).forEach(s=>{d.addEventListener(s,i,e)})}function Bt(d,t,i,e){C(d,t,i,{...e,once:!0})}const Oe={bubbles:!0,cancelable:!0,composed:!0};function Ne(d,t,i,e){return d.dispatchEvent(new CustomEvent(t,{...Oe,detail:i,...e}))}function xe(d){return typeof d.composedPath=="function"&&d.composedPath().find(B)||d.target}const jt=Promise.resolve();function _e(d,t){return t?jt.then(d?t.bind(d):t):jt}function fe(d){const t=d.getRootNode();switch(t.nodeType){case 1:return t.ownerDocument;case 9:return t;case 11:return t}return null}function qt(d){const{documentElement:t}=d.ownerDocument,i=d.getBoundingClientRect();return{left:i.left+(N.pageXOffset-t.clientLeft),top:i.top+(N.pageYOffset-t.clientTop)}}const Ie=/deg|g?rad|turn$/i;function mt(d){const t=parseFloat(d)||0;if(t!==0){const[i="rad"]=String(d).match(Ie)||[];switch(i.toLowerCase()){case"deg":return t/360*(Math.PI*2);case"grad":return t/400*(Math.PI*2);case"turn":return t*(Math.PI*2)}}return t}const Zt="contain",Pe="cover";function nt(d,t=Zt){const{aspectRatio:i}=d;let{width:e,height:s}=d;const n=A(e),r=A(s);if(n&&r){const h=s*i;t===Zt&&h>e||t===Pe&&h<e?s=e/i:e=s*i}else n?s=e/i:r&&(e=s*i);return{width:e,height:s}}function $e(d,...t){if(t.length===0)return d;const[i,e,s,n,r,h]=d,[c,o,a,l,f,$]=t[0];return d=[i*c+s*o,e*c+n*o,i*a+s*l,e*a+n*l,i*f+s*$+r,e*f+n*$+h],$e(d,...t.slice(1))}const Me=`
:host([hidden]) {
  display: none !important;
}
`,De=/left|top|width|height/i,Kt="open",et=new WeakMap,it=new WeakMap,Gt=new Map,Vt=!!(N.document&&Array.isArray(N.document.adoptedStyleSheets)&&N.CSSStyleSheet&&"replaceSync"in N.CSSStyleSheet.prototype),Nt=class Nt extends HTMLElement{constructor(){var i,e;super(),this.shadowRootMode=Kt,this.slottable=!0;const t=(e=(i=Object.getPrototypeOf(this))==null?void 0:i.constructor)==null?void 0:e.$name;t&&Gt.set(t,this.tagName.toLowerCase())}get $sharedStyle(){return`${this.themeColor?`:host{--theme-color: ${this.themeColor};}`:""}${Me}`}static get observedAttributes(){return["shadow-root-mode","slottable","theme-color"]}attributeChangedCallback(t,i,e){if(Object.is(e,i))return;const s=Ut(t),n=this[s];let r=e;switch(typeof n){case"boolean":r=e!==null&&e!=="false";break;case"number":r=Number(e);break}switch(this[s]=r,t){case"theme-color":{const h=it.get(this),c=this.$sharedStyle;h&&c&&(Vt?h.replaceSync(c):h.textContent=c);break}}}$propertyChangedCallback(t,i,e){if(!Object.is(e,i))switch(t=Ft(t),typeof e){case"boolean":e===!0?this.hasAttribute(t)||this.setAttribute(t,""):this.removeAttribute(t);break;case"number":le(e)?e="":e=String(e);default:e?this.getAttribute(t)!==e&&this.setAttribute(t,e):this.removeAttribute(t)}}connectedCallback(){Object.getPrototypeOf(this).constructor.observedAttributes.forEach(i=>{const e=Ut(i);let s=this[e];Te(s)||this.$propertyChangedCallback(e,void 0,s),Object.defineProperty(this,e,{enumerable:!0,configurable:!0,get(){return s},set(n){const r=s;s=n,this.$propertyChangedCallback(e,r,n)}})});const t=this.shadowRoot||this.attachShadow({mode:this.shadowRootMode||Kt});if(et.set(this,t),it.set(this,this.$addStyles(this.$sharedStyle)),this.$style&&this.$addStyles(this.$style),this.$template){const i=document.createElement("template");i.innerHTML=this.$template,t.appendChild(i.content)}if(this.slottable){const i=document.createElement("slot");t.appendChild(i)}}disconnectedCallback(){it.has(this)&&it.delete(this),et.has(this)&&et.delete(this)}$getTagNameOf(t){return Gt.get(t)??t}$setStyles(t){return Object.keys(t).forEach(i=>{let e=t[i];m(e)&&(e!==0&&De.test(i)?e=`${e}px`:e=String(e)),this.style[i]=e}),this}$getShadowRoot(){return this.shadowRoot||et.get(this)}$addStyles(t){let i;const e=this.$getShadowRoot();return Vt?(i=new CSSStyleSheet,i.replaceSync(t),e.adoptedStyleSheets=e.adoptedStyleSheets.concat(i)):(i=document.createElement("style"),i.textContent=t,e.appendChild(i)),i}$emit(t,i,e){return Ne(this,t,i,e)}$nextTick(t){return _e(this,t)}static $define(t,i){de(t)&&(i=t,t=""),t||(t=this.$name||this.name),t=Ft(t),gt&&N.customElements&&!N.customElements.get(t)&&customElements.define(t,this,i)}};Nt.$version="__VERSION__";let D=Nt;const ze=`
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
`,rt=class rt extends D{constructor(){super(...arguments),this.$onPointerDown=null,this.$onPointerMove=null,this.$onPointerUp=null,this.$onWheel=null,this.$wheeling=!1,this.$pointers=new Map,this.$style=ze,this.$action=P,this.background=!1,this.disabled=!1,this.scaleStep=.1,this.themeColor="#39f"}static get observedAttributes(){return super.observedAttributes.concat(["background","disabled","scale-step"])}connectedCallback(){super.connectedCallback(),this.disabled||this.$bind()}disconnectedCallback(){this.$unbind(),super.disconnectedCallback()}$propertyChangedCallback(t,i,e){if(!Object.is(e,i))switch(super.$propertyChangedCallback(t,i,e),t){case"disabled":e?this.$unbind():this.$bind();break}}$bind(){this.$onPointerDown||(this.$onPointerDown=this.$handlePointerDown.bind(this),C(this,Dt,this.$onPointerDown)),this.$onPointerMove||(this.$onPointerMove=this.$handlePointerMove.bind(this),C(this.ownerDocument,zt,this.$onPointerMove)),this.$onPointerUp||(this.$onPointerUp=this.$handlePointerUp.bind(this),C(this.ownerDocument,Wt,this.$onPointerUp)),this.$onWheel||(this.$onWheel=this.$handleWheel.bind(this),C(this,Ht,this.$onWheel,{passive:!1,capture:!0}))}$unbind(){this.$onPointerDown&&(y(this,Dt,this.$onPointerDown),this.$onPointerDown=null),this.$onPointerMove&&(y(this.ownerDocument,zt,this.$onPointerMove),this.$onPointerMove=null),this.$onPointerUp&&(y(this.ownerDocument,Wt,this.$onPointerUp),this.$onPointerUp=null),this.$onWheel&&(y(this,Ht,this.$onWheel,{capture:!0}),this.$onWheel=null),this.$pointers.clear(),this.style.willChange="",this.$action=P}$addPointers(t){const{$pointers:i}=this;if(t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:e,pageX:s,pageY:n})=>{i.set(e,{startX:s,startY:n,endX:s,endY:n})});else{const{pointerId:e=0,pageX:s,pageY:n}=t;i.set(e,{startX:s,startY:n,endX:s,endY:n})}}$removePointers(t){const{$pointers:i}=this;if(t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:e})=>{i.delete(e)});else{const{pointerId:e=0}=t;i.delete(e)}i.size===0&&(this.style.willChange="",this.$action=P)}$handlePointerDown(t){const{buttons:i,button:e,type:s}=t;if(this.disabled||(s==="pointerdown"&&t.pointerType==="mouse"||s==="mousedown")&&(m(i)&&i!==1||m(e)&&e!==0||t.ctrlKey))return;this.$addPointers(t);const{$pointers:n}=this;let r=P;if(n.size>1?r=tt:B(t.target)&&(r=t.target.action||t.target.getAttribute(ve)||P),this.$emit(F,{action:r,relatedEvent:t})===!1){this.$removePointers(t);return}t.preventDefault(),this.$action=r,this.style.willChange="transform"}$handlePointerMove(t){const{$action:i,$pointers:e}=this;if(this.disabled||i===P||e.size===0||this.$emit(Ce,{action:i,relatedEvent:t})===!1)return;if(t.preventDefault(),t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:n,pageX:r,pageY:h})=>{const c=e.get(n);c&&Object.assign(c,{endX:r,endY:h})});else{const{pointerId:n=0,pageX:r,pageY:h}=t,c=e.get(n);c&&Object.assign(c,{endX:r,endY:h})}const s={action:i,relatedEvent:t};if(i===tt){const n=new Map(e);let r=0,h=0,c=0,o=0,a=t.pageX,l=t.pageY;e.forEach((u,b)=>{n.delete(b),n.forEach(E=>{let g=E.startX-u.startX,p=E.startY-u.startY,v=E.endX-u.endX,w=E.endY-u.endY,S=0,T=0,k=0,R=0;if(g===0?p<0?k=Math.PI*2:p>0&&(k=Math.PI):g>0?k=Math.PI/2+Math.atan(p/g):g<0&&(k=Math.PI*1.5+Math.atan(p/g)),v===0?w<0?R=Math.PI*2:w>0&&(R=Math.PI):v>0?R=Math.PI/2+Math.atan(w/v):v<0&&(R=Math.PI*1.5+Math.atan(w/v)),R>0||k>0){const _=R-k,I=Math.abs(_);I>r&&(r=I,c=_,a=(u.startX+E.startX)/2,l=(u.startY+E.startY)/2)}if(g=Math.abs(g),p=Math.abs(p),v=Math.abs(v),w=Math.abs(w),g>0&&p>0?S=Math.sqrt(g*g+p*p):g>0?S=g:p>0&&(S=p),v>0&&w>0?T=Math.sqrt(v*v+w*w):v>0?T=v:w>0&&(T=w),S>0&&T>0){const _=(T-S)/S,I=Math.abs(_);I>h&&(h=I,o=_,a=(u.startX+E.startX)/2,l=(u.startY+E.startY)/2)}})});const f=r>0,$=h>0;f&&$?(s.rotate=c,s.scale=o,s.centerX=a,s.centerY=l):f?(s.action=pt,s.rotate=c,s.centerX=a,s.centerY=l):$?(s.action=q,s.scale=o,s.centerX=a,s.centerY=l):s.action=P}else{const[n]=Array.from(e.values());Object.assign(s,n)}e.forEach(n=>{n.startX=n.endX,n.startY=n.endY}),s.action!==P&&this.$emit(Z,s)}$handlePointerUp(t){const{$action:i}=this;if(this.disabled){this.$removePointers(t);return}if(i===P){this.$removePointers(t);return}if(this.$emit(H,{action:i,relatedEvent:t})===!1){this.$removePointers(t);return}t.preventDefault(),this.$removePointers(t)}$handleWheel(t){if(this.disabled||(t.preventDefault(),this.$wheeling))return;this.$wheeling=!0,setTimeout(()=>{this.$wheeling=!1},50);const e=(t.deltaY>0?-1:1)*this.scaleStep;this.$emit(Z,{action:q,scale:e,relatedEvent:t})}$setAction(t){return st(t)&&(this.$action=t),this}$toCanvas(t){return new Promise((i,e)=>{if(!this.isConnected){e(new Error("The current element is not connected to the DOM."));return}const s=document.createElement("canvas");let n=this.offsetWidth,r=this.offsetHeight,h=1;ot(t)&&(A(t.width)||A(t.height))&&({width:n,height:r}=nt({aspectRatio:n/r,width:t.width,height:t.height}),h=n/this.offsetWidth),s.width=n,s.height=r;const c=this.querySelector(this.$getTagNameOf(j));if(!c){i(s);return}c.$ready().then(o=>{const a=s.getContext("2d");if(a){const[l,f,$,u,b,E]=c.$getTransform();let g=b,p=E,v=o.naturalWidth,w=o.naturalHeight;h!==1&&(g*=h,p*=h,v*=h,w*=h);const S=v/2,T=w/2;a.fillStyle="transparent",a.fillRect(0,0,n,r),ot(t)&&Ot(t.beforeDraw)&&t.beforeDraw.call(this,a,s),a.save(),a.translate(S,T),a.transform(l,f,$,u,g,p),a.translate(-S,-T),a.drawImage(o,0,0,v,w),a.restore()}i(s)}).catch(e)})}};rt.$name=K,rt.$version="__VERSION__";let Et=rt;const We=`
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
`,Jt=new WeakMap,Qt=["alt","crossorigin","decoding","elementtiming","fetchpriority","loading","referrerpolicy","sizes","src","srcset"],ht=class ht extends D{constructor(){super(...arguments),this.$isReady=!1,this.$matrix=[1,0,0,1,0,0],this.$onLoad=null,this.$onCanvasAction=null,this.$onCanvasActionEnd=null,this.$onCanvasActionStart=null,this.$actionStartTarget=null,this.$style=We,this.$image=new Image,this.initialCenterSize="",this.initialFit=x,this.maxFit="",this.minFit="",this.rotatable=!1,this.scalable=!1,this.skewable=!1,this.slottable=!1,this.translatable=!1,this.alt="",this.crossorigin="",this.decoding="",this.elementtiming="",this.fetchpriority="",this.loading="",this.referrerpolicy="",this.sizes="",this.src="",this.srcset=""}set $canvas(t){Jt.set(this,t)}get $canvas(){return Jt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(Qt,["initial-center-size","initial-fit","max-fit","min-fit","rotatable","scalable","skewable","translatable"])}attributeChangedCallback(t,i,e){Object.is(e,i)||(super.attributeChangedCallback(t,i,e),Qt.includes(t)&&(e===null?this.$image.removeAttribute(t):this.$image.setAttribute(t,e)))}$propertyChangedCallback(t,i,e){if(!Object.is(e,i))switch(super.$propertyChangedCallback(t,i,e),t){case"initialCenterSize":case"initialFit":this.$nextTick(()=>{this.$isReady&&this.$canvas&&this.$center(e)});break;case"maxFit":case"minFit":this.$nextTick(()=>{this.$isReady&&this.$canvas&&(this.$resetTransform(),this.$center(this.initialCenterSize||this.initialFit))});break;case"src":this.$isReady=!1;break}}connectedCallback(){super.connectedCallback();const{$image:t}=this,i=this.closest(this.$getTagNameOf(K));i&&(this.$canvas=i,this.$setStyles({display:"block",position:"absolute"}),this.$onCanvasActionStart=e=>{var s,n;e.defaultPrevented||(this.$actionStartTarget=(n=(s=e.detail)==null?void 0:s.relatedEvent)==null?void 0:n.target)},this.$onCanvasActionEnd=()=>{this.$actionStartTarget=null},this.$onCanvasAction=this.$handleAction.bind(this),C(i,F,this.$onCanvasActionStart),C(i,H,this.$onCanvasActionEnd),C(i,Z,this.$onCanvasAction)),this.$onLoad=this.$handleLoad.bind(this),C(t,U,this.$onLoad),this.$getShadowRoot().appendChild(t)}disconnectedCallback(){const{$image:t,$canvas:i}=this;i&&(this.$onCanvasActionStart&&(y(i,F,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(y(i,H,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasAction&&(y(i,Z,this.$onCanvasAction),this.$onCanvasAction=null)),t&&this.$onLoad&&(y(t,U,this.$onLoad),this.$onLoad=null),this.$getShadowRoot().removeChild(t),super.disconnectedCallback()}$handleLoad(){const{$image:t}=this;this.$setStyles({width:t.naturalWidth,height:t.naturalHeight}),this.$canvas&&this.$center(this.initialCenterSize||this.initialFit),this.$isReady=!0}$handleAction(t){if(t.defaultPrevented||this.hidden||!(this.rotatable||this.scalable||this.translatable))return;const{$canvas:i}=this,{detail:e}=t;if(e){const{relatedEvent:s}=e;let{action:n}=e;switch(n===tt&&(!this.rotatable||!this.scalable)&&(this.rotatable?n=pt:this.scalable?n=q:n=P),n){case ce:if(this.translatable){let r=null;s&&(r=s.target.closest(this.$getTagNameOf(M))),r||(r=i.querySelector(this.$getTagNameOf(M))),r&&r.multiple&&!r.active&&(r=i.querySelector(`${this.$getTagNameOf(M)}[active]`)),(!r||r.hidden||!r.movable||r.dynamic||!(this.$actionStartTarget&&r.contains(this.$actionStartTarget)))&&this.$move(e.endX-e.startX,e.endY-e.startY)}break;case pt:if(this.rotatable)if(s){const{x:r,y:h}=this.getBoundingClientRect();this.$rotate(e.rotate,s.clientX-r,s.clientY-h)}else this.$rotate(e.rotate);break;case q:if(this.scalable)if(s){const r=s.target.closest(this.$getTagNameOf(M));if(!r||!r.zoomable||r.zoomable&&r.dynamic){const{x:h,y:c}=this.getBoundingClientRect();this.$zoom(e.scale,s.clientX-h,s.clientY-c)}}else this.$zoom(e.scale);break;case tt:if(this.rotatable&&this.scalable){const{rotate:r}=e;let{scale:h}=e;h<0?h=1/(1-h):h+=1;const c=Math.cos(r),o=Math.sin(r),[a,l,f,$]=[c*h,o*h,-o*h,c*h];if(s){const u=this.getBoundingClientRect(),b=s.clientX-u.x,E=s.clientY-u.y,[g,p,v,w]=this.$matrix,S=u.width/2,T=u.height/2,k=b-S,R=E-T,_=(k*w-v*R)/(g*w-v*p),I=(R*g-p*k)/(g*w-v*p);this.$transform(a,l,f,$,_*(1-a)+I*f,I*(1-$)+_*l)}else this.$transform(a,l,f,$,0,0)}break}}}$ready(t){const{$image:i}=this,e=new Promise((s,n)=>{const r=new Error("Failed to load the image source");if(i.complete)i.naturalWidth>0&&i.naturalHeight>0?s(i):n(r);else{const h=()=>{y(i,Lt,c),setTimeout(()=>{s(i)})},c=()=>{y(i,U,h),n(r)};Bt(i,U,h),Bt(i,Lt,c)}});return Ot(t)&&e.then(s=>(t(s),s)),e}$center(t){const{parentElement:i}=this;if(!i)return this;const e=i.getBoundingClientRect(),s=e.width,n=e.height,{x:r,y:h,width:c,height:o}=this.getBoundingClientRect(),a=r+c/2,l=h+o/2,f=e.x+s/2,$=e.y+n/2,{translatable:u}=this;!u&&!this.$isReady&&(this.translatable=!0,this.$nextTick(()=>{this.translatable=u})),this.$move(f-a,$-l);const{maxFit:b,minFit:E}=this;if(t||b||E){const{naturalWidth:g,naturalHeight:p}=this.$image;switch(t){case z:[W,x,L].includes(b)||b===O&&(g<s||p<n)?t=b:E===O&&g>s&&p>n&&(t=E);break;case W:[x,L].includes(b)||b===O&&(g<s||p<n)?t=b:(E===z||E===O&&g>s&&p>n)&&(t=E);break;case x:b===L||b===O&&g<s&&p<n?t=b:([z,W].includes(E)||E===O&&(g>s||p>n))&&(t=E);break;case L:b===O&&g<s&&p<n?t=b:([z,W,x].includes(E)||E===O&&g>s&&p>n)&&(t=E);break;default:[z,W,x,L].includes(b)&&(g>s||p>n)?t=b:[z,W,x,L].includes(E)&&g<s&&p<n&&(t=E)}const v=s/c,w=n/o,{scalable:S}=this;switch(!S&&!this.$isReady&&(this.scalable=!0,this.$nextTick(()=>{this.scalable=S})),t){case z:this.$scale(Math.max(v,w));break;case x:this.$scale(Math.min(v,w));break;case W:this.$scale(v,w);break;case L:this.$scale(Math.min(v,w,1));break;case O:this.$scale(1);break}}return this}$move(t,i=t){if(this.translatable&&m(t)&&m(i)){const[e,s,n,r]=this.$matrix,h=(t*r-n*i)/(e*r-n*s),c=(i*e-s*t)/(e*r-n*s);this.$translate(h,c)}return this}$moveTo(t,i=t){if(this.translatable&&m(t)&&m(i)){const[e,s,n,r]=this.$matrix,h=(t*r-n*i)/(e*r-n*s),c=(i*e-s*t)/(e*r-n*s);this.$setTransform(e,s,n,r,h,c)}return this}$rotate(t,i,e){if(this.rotatable){const s=mt(t),n=Math.cos(s),r=Math.sin(s),[h,c,o,a]=[n,r,-r,n];if(m(i)&&m(e)){const[l,f,$,u]=this.$matrix,{width:b,height:E}=this.getBoundingClientRect(),g=b/2,p=E/2,v=i-g,w=e-p,S=(v*u-$*w)/(l*u-$*f),T=(w*l-f*v)/(l*u-$*f);this.$transform(h,c,o,a,S*(1-h)-T*o,T*(1-a)-S*c)}else this.$transform(h,c,o,a,0,0)}return this}$zoom(t,i,e){if(!this.scalable||t===0)return this;if(t<0?t=1/(1-t):t+=1,m(i)&&m(e)){const[s,n,r,h]=this.$matrix,{width:c,height:o}=this.getBoundingClientRect(),a=c/2,l=o/2,f=i-a,$=e-l,u=(f*h-r*$)/(s*h-r*n),b=($*s-n*f)/(s*h-r*n);this.$transform(t,0,0,t,u*(1-t),b*(1-t))}else this.$scale(t);return this}$scale(t,i=t){return this.scalable&&this.$transform(t,0,0,i,0,0),this}$skew(t,i=0){if(this.skewable){const e=mt(t),s=mt(i);this.$transform(1,Math.tan(s),Math.tan(e),1,0,0)}return this}$translate(t,i=t){return this.translatable&&m(t)&&m(i)&&this.$transform(1,0,0,1,t,i),this}$transform(t,i,e,s,n,r){return m(t)&&m(i)&&m(e)&&m(s)&&m(n)&&m(r)?this.$setTransform($e(this.$matrix,[t,i,e,s,n,r])):this}$setTransform(t,i,e,s,n,r){if((this.rotatable||this.scalable||this.skewable||this.translatable)&&(Array.isArray(t)&&([t,i,e,s,n,r]=t),m(t)&&m(i)&&m(e)&&m(s)&&m(n)&&m(r))){const h=[...this.$matrix],c=[t,i,e,s,n,r];if(this.$isReady&&this.$canvas){const{$canvas:o}=this,a=o.getBoundingClientRect();this.style.transform=`matrix(${c.join(", ")})`;const l=this.$image.getBoundingClientRect();this.style.transform=`matrix(${h.join(", ")})`;let{maxFit:f,minFit:$}=this;if(f||$){if(l.top>a.bottom||l.right<a.left||l.bottom<a.top||l.left>a.right)return this;const{naturalWidth:u,naturalHeight:b}=this.$image;switch(f===L&&(u>=a.width||b>=a.height?f=x:f=O),f){case z:if(l.width>a.width&&l.height>a.height)return this;break;case W:case x:if(l.width>a.width||l.height>a.height)return this;break;case O:if(l.width>u||l.height>b)return this;break}switch($===L&&(u>=a.width||b>=a.height?$=x:$=O),$){case z:case W:if(l.width<a.width||l.height<a.height)return this;break;case x:if(l.width<a.width&&l.height<a.height)return this;break;case O:if(l.width<u||l.height<b)return this;break}}if(this.$emit(X,{x:l.x-a.x,y:l.y-a.y,width:l.width,height:l.height})===!1)return this}if(this.$emit(bt,{matrix:c,oldMatrix:h})===!1)return this;this.$matrix=c,this.style.transform=`matrix(${c.join(", ")})`}return this}$getTransform(){return this.$matrix.slice()}$resetTransform(){return this.$setTransform([1,0,0,1,0,0])}};ht.$name=j,ht.$version="__VERSION__";let vt=ht;const Le=`
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
`,te=new WeakMap,ct=class ct extends D{constructor(){super(...arguments),this.$onWindowResize=null,this.$onCanvasActionEnd=null,this.$onCanvasActionStart=null,this.$onSelectionChange=null,this.$style=Le,this.x=0,this.y=0,this.width=0,this.height=0,this.slottable=!1,this.themeColor="rgba(0, 0, 0, 0.65)"}set $canvas(t){te.set(this,t)}get $canvas(){return te.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["height","width","x","y"])}connectedCallback(){super.connectedCallback();const t=this.closest(this.$getTagNameOf(K));if(t){this.$canvas=t,this.style.position="absolute";const i=t.querySelector(this.$getTagNameOf(M));i&&(this.$onWindowResize=this.$render.bind(this),this.$onCanvasActionStart=e=>{i.hidden&&e.detail.action===at&&(this.hidden=!1)},this.$onCanvasActionEnd=e=>{i.hidden&&e.detail.action===at&&(this.hidden=!0)},this.$onSelectionChange=e=>{var c,o;if(((o=(c=e.target)==null?void 0:c.constructor)==null?void 0:o.$name)!==M)return;const{x:s,y:n,width:r,height:h}=e.defaultPrevented?i:e.detail;this.$change(s,n,r,h),(i.hidden||s===0&&n===0&&r===0&&h===0)&&(this.hidden=!0)},C(window,Yt,this.$onWindowResize),C(t,F,this.$onCanvasActionStart),C(t,H,this.$onCanvasActionEnd),C(t,X,this.$onSelectionChange))}this.$render()}disconnectedCallback(){const{$canvas:t}=this;t&&(this.$onWindowResize&&(y(window,Yt,this.$onWindowResize),this.$onWindowResize=null),this.$onCanvasActionStart&&(y(t,F,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(y(t,H,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onSelectionChange&&(y(t,X,this.$onSelectionChange),this.$onSelectionChange=null)),super.disconnectedCallback()}$change(t,i,e=this.width,s=this.height){return!m(t)||!m(i)||!m(e)||!m(s)||t===this.x&&i===this.y&&e===this.width&&s===this.height?this:(this.hidden&&(this.hidden=!1),this.x=t,this.y=i,this.width=e,this.height=s,this.$render())}$reset(){return this.$change(0,0,0,0)}$render(){return this.$setStyles({transform:`translate(${this.x}px, ${this.y}px)`,width:this.width,height:this.height,outlineWidth:N.innerWidth*N.devicePixelRatio})}};ct.$name=be,ct.$version="__VERSION__";let wt=ct;const Xe=`
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
`,lt=class lt extends D{constructor(){super(...arguments),this.$onCanvasCropEnd=null,this.$onCanvasCropStart=null,this.$style=Xe,this.action=P,this.plain=!1,this.slottable=!1,this.themeColor="rgba(51, 153, 255, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["action","plain"])}};lt.$name=pe,lt.$version="__VERSION__";let yt=lt;const Ye=`
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
`,ee=new WeakMap,dt=class dt extends D{constructor(){super(...arguments),this.$onCanvasAction=null,this.$onCanvasActionStart=null,this.$onCanvasActionEnd=null,this.$onDocumentKeyDown=null,this.$action="",this.$actionStartTarget=null,this.$changing=!1,this.$style=Ye,this.$initialSelection={x:0,y:0,width:0,height:0},this.x=0,this.y=0,this.width=0,this.height=0,this.aspectRatio=NaN,this.initialAspectRatio=NaN,this.initialCoverage=NaN,this.active=!1,this.linked=!1,this.dynamic=!1,this.movable=!1,this.resizable=!1,this.zoomable=!1,this.multiple=!1,this.keyboard=!1,this.outlined=!1,this.precise=!1}set $canvas(t){ee.set(this,t)}get $canvas(){return ee.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["active","aspect-ratio","dynamic","height","initial-aspect-ratio","initial-coverage","keyboard","linked","movable","multiple","outlined","precise","resizable","width","x","y","zoomable"])}$propertyChangedCallback(t,i,e){if(!Object.is(e,i))switch(super.$propertyChangedCallback(t,i,e),t){case"x":case"y":case"width":case"height":this.$changing||this.$nextTick(()=>{this.$change(this.x,this.y,this.width,this.height,this.aspectRatio,!0)});break;case"aspectRatio":case"initialAspectRatio":this.$nextTick(()=>{this.$initSelection()});break;case"initialCoverage":this.$nextTick(()=>{A(e)&&e<=1&&this.$initSelection(!0,!0)});break;case"keyboard":this.$nextTick(()=>{this.$canvas&&(e?this.$onDocumentKeyDown||(this.$onDocumentKeyDown=this.$handleKeyDown.bind(this),C(this.ownerDocument,Xt,this.$onDocumentKeyDown)):this.$onDocumentKeyDown&&(y(this.ownerDocument,Xt,this.$onDocumentKeyDown),this.$onDocumentKeyDown=null))});break;case"multiple":this.$nextTick(()=>{if(this.$canvas){const s=this.$getSelections();e?(s.forEach(n=>{n.active=!1}),this.active=!0,this.$emit(X,{x:this.x,y:this.y,width:this.width,height:this.height})):(this.active=!1,s.slice(1).forEach(n=>{this.$removeSelection(n)}))}});break;case"precise":this.$nextTick(()=>{this.$change(this.x,this.y)});break;case"linked":e&&(this.dynamic=!0);break}}connectedCallback(){super.connectedCallback();const t=this.closest(this.$getTagNameOf(K));t?(this.$canvas=t,this.$setStyles({position:"absolute",transform:`translate(${this.x}px, ${this.y}px)`}),this.hidden||this.$render(),this.$initSelection(!0),this.$onCanvasActionStart=this.$handleActionStart.bind(this),this.$onCanvasActionEnd=this.$handleActionEnd.bind(this),this.$onCanvasAction=this.$handleAction.bind(this),C(t,F,this.$onCanvasActionStart),C(t,H,this.$onCanvasActionEnd),C(t,Z,this.$onCanvasAction)):this.$render()}disconnectedCallback(){const{$canvas:t}=this;t&&(this.$onCanvasActionStart&&(y(t,F,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(y(t,H,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasAction&&(y(t,Z,this.$onCanvasAction),this.$onCanvasAction=null)),super.disconnectedCallback()}$getSelections(){let t=[];return this.parentElement&&(t=Array.from(this.parentElement.querySelectorAll(this.$getTagNameOf(M)))),t}$initSelection(t=!1,i=!1){const{initialCoverage:e,parentElement:s}=this;if(A(e)&&s){const n=this.aspectRatio||this.initialAspectRatio;let r=(i?0:this.width)||s.offsetWidth*e,h=(i?0:this.height)||s.offsetHeight*e;A(n)&&({width:r,height:h}=nt({aspectRatio:n,width:r,height:h})),this.$change(this.x,this.y,r,h),t&&this.$center(),this.$initialSelection={x:this.x,y:this.y,width:this.width,height:this.height}}}$createSelection(){const t=this.cloneNode(!0);return this.hasAttribute("id")&&t.removeAttribute("id"),t.initialCoverage=NaN,this.active=!1,this.parentElement&&this.parentElement.insertBefore(t,this.nextSibling),t}$removeSelection(t=this){if(this.parentElement){const i=this.$getSelections();if(i.length>1){const e=i.indexOf(t),s=i[e+1]||i[e-1];s&&(t.active=!1,this.parentElement.removeChild(t),s.active=!0,s.$emit(X,{x:s.x,y:s.y,width:s.width,height:s.height}))}else this.$clear()}}$handleActionStart(t){var e,s;if(t.defaultPrevented)return;const i=(s=(e=t.detail)==null?void 0:e.relatedEvent)==null?void 0:s.target;this.$action="",this.$actionStartTarget=i,!this.hidden&&this.multiple&&!this.active&&i===this&&this.parentElement&&(this.$getSelections().forEach(n=>{n.active=!1}),this.active=!0,this.$emit(X,{x:this.x,y:this.y,width:this.width,height:this.height}))}$handleAction(t){const{currentTarget:i,detail:e}=t;if(t.defaultPrevented||!i||!e)return;const{relatedEvent:s}=e;let{action:n}=e;const r=s?xe(s):null;if(!n&&this.multiple&&(n=this.$action||(r==null?void 0:r.action),this.$action=n),!n||this.hidden&&n!==at||this.multiple&&!this.active&&n!==q)return;const{width:h,height:c}=this;let o=e.endX-e.startX,a=e.endY-e.startY,{aspectRatio:l}=this;switch(!A(l)&&s.shiftKey&&(l=A(h)&&A(c)?h/c:1),n){case at:if(o!==0||a!==0){o===0?o=a:a===0&&(a=o);const{$canvas:f}=this,$=qt(i);(this.multiple&&!this.hidden?this.$createSelection():this).$change(e.startX-$.left,e.startY-$.top,Math.abs(o),Math.abs(a),l),o<0?a<0?n=V:a>0&&(n=Q):o>0&&(a<0?n=G:a>0&&(n=J)),f&&(f.$action=n)}break;case ce:this.movable&&(this.dynamic||this.$actionStartTarget&&this.contains(this.$actionStartTarget))&&this.$move(o,a);break;case q:case tt:if(s&&this.zoomable&&(this.dynamic||this.contains(s.target))){const f=qt(i);this.$zoom(e.scale,s.pageX-f.left,s.pageY-f.top)}break;default:this.$resize(n,o,a,l)}}$handleActionEnd(){this.$action="",this.$actionStartTarget=null}$handleKeyDown(t){if(t.defaultPrevented||this.hidden||!this.keyboard||this.multiple&&!this.active)return;const{activeElement:i}=document;if(!(i&&(["INPUT","TEXTAREA"].includes(i.tagName)||["true","plaintext-only"].includes(i.contentEditable))))switch(t.key){case"Backspace":t.metaKey&&(t.preventDefault(),this.$removeSelection());break;case"Delete":t.preventDefault(),this.$removeSelection();break;case"ArrowLeft":t.preventDefault(),this.$move(-1,0);break;case"ArrowRight":t.preventDefault(),this.$move(1,0);break;case"ArrowUp":t.preventDefault(),this.$move(0,-1);break;case"ArrowDown":t.preventDefault(),this.$move(0,1);break;case"+":t.preventDefault(),this.$zoom(.1);break;case"-":t.preventDefault(),this.$zoom(-.1);break}}$center(){const{parentElement:t}=this;if(!t)return this;const i=(t.offsetWidth-this.width)/2,e=(t.offsetHeight-this.height)/2;return this.$change(i,e)}$move(t,i=t){return this.$moveTo(this.x+t,this.y+i)}$moveTo(t,i=t){return this.movable?this.$change(t,i):this}$resize(t,i=0,e=0,s=this.aspectRatio){if(!this.resizable)return this;const n=A(s),{$canvas:r}=this;let{x:h,y:c,width:o,height:a}=this;switch(t){case _t:c+=e,a-=e,a<0&&(t=Pt,a=-a,c-=a),n&&(i=e*s,h+=i/2,o-=i,o<0&&(o=-o,h-=o));break;case It:o+=i,o<0&&(t=Mt,o=-o,h-=o),n&&(e=i/s,c-=e/2,a+=e,a<0&&(a=-a,c-=a));break;case Pt:a+=e,a<0&&(t=_t,a=-a,c-=a),n&&(i=e*s,h-=i/2,o+=i,o<0&&(o=-o,h-=o));break;case Mt:h+=i,o-=i,o<0&&(t=It,o=-o,h-=o),n&&(e=i/s,c+=e/2,a-=e,a<0&&(a=-a,c-=a));break;case G:n&&(e=-i/s),c+=e,a-=e,o+=i,o<0&&a<0?(t=Q,o=-o,a=-a,h-=o,c-=a):o<0?(t=V,o=-o,h-=o):a<0&&(t=J,a=-a,c-=a);break;case V:n&&(e=i/s),h+=i,c+=e,o-=i,a-=e,o<0&&a<0?(t=J,o=-o,a=-a,h-=o,c-=a):o<0?(t=G,o=-o,h-=o):a<0&&(t=Q,a=-a,c-=a);break;case J:n&&(e=i/s),o+=i,a+=e,o<0&&a<0?(t=V,o=-o,a=-a,h-=o,c-=a):o<0?(t=Q,o=-o,h-=o):a<0&&(t=G,a=-a,c-=a);break;case Q:n&&(e=-i/s),h+=i,o-=i,a+=e,o<0&&a<0?(t=G,o=-o,a=-a,h-=o,c-=a):o<0?(t=J,o=-o,h-=o):a<0&&(t=V,a=-a,c-=a);break}return r&&r.$setAction(t),this.$change(h,c,o,a)}$zoom(t,i,e){if(!this.zoomable||t===0)return this;t<0?t=1/(1-t):t+=1;const{width:s,height:n}=this,r=s*t,h=n*t;let c=this.x,o=this.y;return m(i)&&m(e)?(c-=(r-s)*((i-this.x)/s),o-=(h-n)*((e-this.y)/n)):(c-=(r-s)/2,o-=(h-n)/2),this.$change(c,o,r,h)}$change(t,i,e=this.width,s=this.height,n=this.aspectRatio,r=!1){return this.$changing||!m(t)||!m(i)||!m(e)||!m(s)||e<0||s<0?this:(A(n)&&({width:e,height:s}=nt({aspectRatio:n,width:e,height:s},"cover")),this.precise||(t=Math.round(t),i=Math.round(i),e=Math.round(e),s=Math.round(s)),t===this.x&&i===this.y&&e===this.width&&s===this.height&&Object.is(n,this.aspectRatio)&&!r?this:(this.hidden&&(this.hidden=!1),this.$emit(X,{x:t,y:i,width:e,height:s})===!1?this:(this.$changing=!0,this.x=t,this.y=i,this.width=e,this.height=s,this.$changing=!1,this.$render())))}$reset(){const{x:t,y:i,width:e,height:s}=this.$initialSelection;return this.$change(t,i,e,s)}$clear(){return this.$change(0,0,0,0,NaN,!0),this.hidden=!0,this}$render(){return this.$setStyles({transform:`translate(${this.x}px, ${this.y}px)`,width:this.width,height:this.height})}$toCanvas(t){return new Promise((i,e)=>{if(!this.isConnected){e(new Error("The current element is not connected to the DOM."));return}const s=document.createElement("canvas");let{width:n,height:r}=this,h=1;if(ot(t)&&(A(t.width)||A(t.height))&&({width:n,height:r}=nt({aspectRatio:n/r,width:t.width,height:t.height}),h=n/this.width),s.width=n,s.height=r,!this.$canvas){i(s);return}const c=this.$canvas.querySelector(this.$getTagNameOf(j));if(!c){i(s);return}c.$ready().then(o=>{const a=s.getContext("2d");if(a){const[l,f,$,u,b,E]=c.$getTransform(),g=-this.x,p=-this.y,v=(g*u-$*p)/(l*u-$*f),w=(p*l-f*g)/(l*u-$*f);let S=l*v+$*w+b,T=f*v+u*w+E,k=o.naturalWidth,R=o.naturalHeight;h!==1&&(S*=h,T*=h,k*=h,R*=h);const _=k/2,I=R/2;a.fillStyle="transparent",a.fillRect(0,0,n,r),ot(t)&&Ot(t.beforeDraw)&&t.beforeDraw.call(this,a,s),a.save(),a.translate(_,I),a.transform(l,f,$,u,S,T),a.translate(-_,-I),a.drawImage(o,0,0,k,R),a.restore()}i(s)}).catch(e)})}};dt.$name=M,dt.$version="__VERSION__";let St=dt;const He=`
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
`,ut=class ut extends D{constructor(){super(...arguments),this.$style=He,this.bordered=!1,this.columns=3,this.covered=!1,this.rows=3,this.slottable=!1,this.themeColor="rgba(238, 238, 238, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["bordered","columns","covered","rows"])}$propertyChangedCallback(t,i,e){Object.is(e,i)||(super.$propertyChangedCallback(t,i,e),(t==="rows"||t==="columns")&&this.$nextTick(()=>{this.$render()}))}connectedCallback(){super.connectedCallback(),this.$render()}$render(){const t=this.$getShadowRoot(),i=document.createDocumentFragment();for(let e=0;e<this.rows;e+=1){const s=document.createElement("span");s.setAttribute("data-cropper-grid-row",""),s.setAttribute("role","row");for(let n=0;n<this.columns;n+=1){const r=document.createElement("span");r.setAttribute("role","gridcell"),s.appendChild(r)}i.appendChild(s)}t&&(t.querySelectorAll("[data-cropper-grid-row]").forEach(e=>e.remove()),t.appendChild(i))}};ut.$name=me,ut.$version="__VERSION__";let Ct=ut;const Fe=`
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
`,ft=class ft extends D{constructor(){super(...arguments),this.$style=Fe,this.centered=!1,this.slottable=!1,this.themeColor="rgba(238, 238, 238, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["centered"])}};ft.$name=ge,ft.$version="__VERSION__";let Tt=ft;const Ue=`
:host {
  display: block;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
}
`,ie=new WeakMap,se=new WeakMap,ne=new WeakMap,ae=new WeakMap,Be="both",je="horizontal",oe="vertical",qe="none",$t=class $t extends D{constructor(){super(...arguments),this.$onSelectionChange=null,this.$onSourceImageLoad=null,this.$onSourceImageTransform=null,this.$scale=1,this.$style=Ue,this.resize=oe,this.selection="",this.slottable=!1}set $image(t){se.set(this,t)}get $image(){return se.get(this)}set $sourceImage(t){ae.set(this,t)}get $sourceImage(){return ae.get(this)}set $canvas(t){ie.set(this,t)}get $canvas(){return ie.get(this)}set $selection(t){ne.set(this,t)}get $selection(){return ne.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["resize","selection"])}connectedCallback(){var i;super.connectedCallback();let t=null;if(this.selection?t=((i=fe(this))==null?void 0:i.querySelector(this.selection))??null:t=this.closest(this.$getTagNameOf(M)),B(t)){this.$selection=t,this.$onSelectionChange=this.$handleSelectionChange.bind(this),C(t,X,this.$onSelectionChange);const e=t.closest(this.$getTagNameOf(K));if(e){this.$canvas=e;const s=e.querySelector(this.$getTagNameOf(j));s&&(this.$sourceImage=s,this.$image=s.cloneNode(!0),this.$getShadowRoot().appendChild(this.$image),this.$onSourceImageLoad=this.$handleSourceImageLoad.bind(this),this.$onSourceImageTransform=this.$handleSourceImageTransform.bind(this),C(s.$image,U,this.$onSourceImageLoad),C(s,bt,this.$onSourceImageTransform))}this.$render()}}disconnectedCallback(){const{$image:t,$selection:i,$sourceImage:e}=this;i&&this.$onSelectionChange&&(y(i,X,this.$onSelectionChange),this.$onSelectionChange=null),e&&this.$onSourceImageLoad&&(y(e.$image,U,this.$onSourceImageLoad),this.$onSourceImageLoad=null),e&&this.$onSourceImageTransform&&(y(e,bt,this.$onSourceImageTransform),this.$onSourceImageTransform=null);const s=this.$getShadowRoot();t&&(s!=null&&s.contains(t))&&s.removeChild(t),super.disconnectedCallback()}$handleSelectionChange(t){this.$render(t.defaultPrevented?this.$selection:t.detail)}$handleSourceImageLoad(){const{$image:t,$sourceImage:i}=this,e=t.getAttribute("src"),s=i.getAttribute("src");s&&s!==e&&(t.setAttribute("src",s),t.$ready(()=>{this.$render()}))}$handleSourceImageTransform(t){this.$render(void 0,t.detail.matrix)}$render(t,i){const{$canvas:e,$selection:s}=this;!t&&!s.hidden&&(t=s),(!t||t.x===0&&t.y===0&&t.width===0&&t.height===0)&&(t={x:0,y:0,width:e.offsetWidth,height:e.offsetHeight});const{x:n,y:r,width:h,height:c}=t,o={},{clientWidth:a,clientHeight:l}=this;let f=a,$=l,u=NaN;switch(this.resize){case Be:u=1,f=h,$=c,o.width=h,o.height=c;break;case je:u=c>0?l/c:0,f=h*u,o.width=f;break;case oe:u=h>0?a/h:0,$=c*u,o.height=$;break;case qe:default:a>0?u=h>0?a/h:0:l>0&&(u=c>0?l/c:0)}this.$scale=u,this.$setStyles(o),this.$sourceImage&&setTimeout(()=>{this.$transformImageByOffset(i??this.$sourceImage.$getTransform(),-n,-r)})}$transformImageByOffset(t,i,e){const{$image:s,$scale:n,$sourceImage:r}=this;if(r&&s&&n>=0){const[h,c,o,a,l,f]=t,$=(i*a-o*e)/(h*a-o*c),u=(e*h-c*i)/(h*a-o*c),b=h*$+o*u+l,E=c*$+a*u+f;r.$ready(g=>{this.$setStyles.call(s,{width:g.naturalWidth*n,height:g.naturalHeight*n})}),s.$setTransform(h,c,o,a,b*n,E*n)}}};$t.$name=Ee,$t.$version="__VERSION__";let At=$t;const Ze='<cropper-canvas background><cropper-image rotatable scalable skewable translatable></cropper-image><cropper-shade hidden></cropper-shade><cropper-handle action="select" plain></cropper-handle><cropper-selection initial-coverage="0.5" movable resizable><cropper-grid role="grid" bordered covered></cropper-grid><cropper-crosshair centered></cropper-crosshair><cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle><cropper-handle action="n-resize"></cropper-handle><cropper-handle action="e-resize"></cropper-handle><cropper-handle action="s-resize"></cropper-handle><cropper-handle action="w-resize"></cropper-handle><cropper-handle action="ne-resize"></cropper-handle><cropper-handle action="nw-resize"></cropper-handle><cropper-handle action="se-resize"></cropper-handle><cropper-handle action="sw-resize"></cropper-handle></cropper-selection></cropper-canvas>',Ke=/^(img|canvas)$/,Ge=/<(\/?(?:script|style)[^>]*)>/gi,re={template:Ze};Et.$define();Tt.$define();Ct.$define();yt.$define();vt.$define();St.$define();wt.$define();At.$define();const xt=class xt{constructor(t,i){var h;if(this.options=re,st(t)&&(t=document.querySelector(t)),!B(t)||!Ke.test(t.localName))throw new Error("The first argument is required and must be an <img> or <canvas> element.");this.element=t,i={...re,...i},this.options=i;let{container:e}=i;if(e&&(st(e)&&(e=(h=fe(t))==null?void 0:h.querySelector(e)),!B(e)))throw new Error("The `container` option must be an element or a valid selector.");B(e)||(t.parentElement?e=t.parentElement:e=t.ownerDocument.body),this.container=e;const s=t.localName;let n="";s==="img"?{src:n}=t:s==="canvas"&&window.HTMLCanvasElement&&(n=t.toDataURL());const{template:r}=i;if(r&&st(r)){const c=document.createElement("template"),o=document.createDocumentFragment();c.innerHTML=r.replace(Ge,"&lt;$1&gt;"),o.appendChild(c.content),Array.from(o.querySelectorAll(j)).forEach(a=>{a.setAttribute("src",n),a.setAttribute("alt",t.alt||"The image to crop"),s==="img"&&["crossorigin","decoding","elementtiming","fetchpriority","loading","referrerpolicy","sizes","srcset"].forEach(l=>{t.hasAttribute(l)&&a.setAttribute(l,t.getAttribute(l)||"")})}),t.parentElement?(t.style.display="none",e.insertBefore(o,t.nextSibling)):e.appendChild(o)}}getCropperCanvas(){return this.container.querySelector(K)}getCropperImage(){return this.container.querySelector(j)}getCropperSelection(){return this.container.querySelector(M)}getCropperSelections(){return this.container.querySelectorAll(M)}destroy(){var i;const t=this.getCropperCanvas();t&&((i=t.parentElement)==null||i.removeChild(t)),this.element&&(this.element.style.display="")}};xt.version="__VERSION__";let he=xt;export{ce as ACTION_MOVE,P as ACTION_NONE,It as ACTION_RESIZE_EAST,_t as ACTION_RESIZE_NORTH,G as ACTION_RESIZE_NORTHEAST,V as ACTION_RESIZE_NORTHWEST,Pt as ACTION_RESIZE_SOUTH,J as ACTION_RESIZE_SOUTHEAST,Q as ACTION_RESIZE_SOUTHWEST,Mt as ACTION_RESIZE_WEST,pt as ACTION_ROTATE,q as ACTION_SCALE,at as ACTION_SELECT,tt as ACTION_TRANSFORM,ve as ATTRIBUTE_ACTION,K as CROPPER_CANVAS,ge as CROPPER_CROSSHAIR,me as CROPPER_GIRD,pe as CROPPER_HANDLE,j as CROPPER_IMAGE,M as CROPPER_SELECTION,be as CROPPER_SHADE,Ee as CROPPER_VIEWER,Et as CropperCanvas,Tt as CropperCrosshair,D as CropperElement,Ct as CropperGrid,yt as CropperHandle,vt as CropperImage,St as CropperSelection,wt as CropperShade,At as CropperViewer,Ze as DEFAULT_TEMPLATE,Z as EVENT_ACTION,H as EVENT_ACTION_END,Ce as EVENT_ACTION_MOVE,F as EVENT_ACTION_START,X as EVENT_CHANGE,Lt as EVENT_ERROR,Xt as EVENT_KEYDOWN,U as EVENT_LOAD,Dt as EVENT_POINTER_DOWN,zt as EVENT_POINTER_MOVE,Wt as EVENT_POINTER_UP,Yt as EVENT_RESIZE,we as EVENT_TOUCH_END,ye as EVENT_TOUCH_MOVE,Se as EVENT_TOUCH_START,bt as EVENT_TRANSFORM,Ht as EVENT_WHEEL,Rt as HAS_POINTER_EVENT,gt as IS_BROWSER,kt as IS_TOUCH_DEVICE,Y as NAMESPACE,x as OBJECT_FIT_CONTAIN,z as OBJECT_FIT_COVER,W as OBJECT_FIT_FILL,O as OBJECT_FIT_NONE,L as OBJECT_FIT_SCALE_DOWN,N as WINDOW,he as default,Ne as emit,nt as getAdjustedSizes,xe as getComposedPathTarget,qt as getOffset,fe as getRootDocument,B as isElement,Ot as isFunction,le as isNaN,m as isNumber,de as isObject,ot as isPlainObject,A as isPositiveNumber,st as isString,Te as isUndefined,$e as multiplyMatrices,_e as nextTick,y as off,C as on,Bt as once,mt as toAngleInRadian,Ut as toCamelCase,Ft as toKebabCase};
