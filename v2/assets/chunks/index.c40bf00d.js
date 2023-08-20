const st=typeof window<"u"&&typeof window.document<"u",I=st?window:{},at=st?"ontouchstart"in I.document.documentElement:!1,rt=st?"PointerEvent"in I:!1,M="cropper",U=`${M}-canvas`,Vt=`${M}-crosshair`,Gt=`${M}-grid`,Jt=`${M}-handle`,X=`${M}-image`,D=`${M}-selection`,Qt=`${M}-shade`,te=`${M}-viewer`,Q="select",jt="move",Y="scale",nt="rotate",tt="transform",x="none",mt="n-resize",bt="e-resize",Et="s-resize",Ct="w-resize",B="ne-resize",j="nw-resize",q="se-resize",Z="sw-resize",ee="action",se=at?"touchend touchcancel":"mouseup",ie=at?"touchmove":"mousemove",ne=at?"touchstart":"mousedown",vt=rt?"pointerdown":ne,St=rt?"pointermove":ie,wt=rt?"pointerup pointercancel":se,yt="error",At="keydown",W="load",Re="resize",Tt="wheel",H="action",z="actionend",oe="actionmove",L="actionstart",P="change",ot="transform";function G(l){return typeof l=="string"}const qt=Number.isNaN||I.isNaN;function u(l){return typeof l=="number"&&!qt(l)}function T(l){return u(l)&&l>0&&l<1/0}function ae(l){return typeof l>"u"}function Zt(l){return typeof l=="object"&&l!==null}const{hasOwnProperty:re}=Object.prototype;function et(l){if(!Zt(l))return!1;try{const{constructor:t}=l,{prototype:s}=t;return t&&s&&re.call(s,"isPrototypeOf")}catch{return!1}}function ct(l){return typeof l=="function"}function F(l){return typeof l=="object"&&l!==null&&l.nodeType===1}const ce=/([a-z\d])([A-Z])/g;function _t(l){return String(l).replace(ce,"$1-$2").toLowerCase()}const he=/-[A-z\d]/g;function kt(l){return l.replace(he,t=>t.slice(1).toUpperCase())}const Ft=/\s\s*/;function C(l,t,s,e){t.trim().split(Ft).forEach(i=>{l.removeEventListener(i,s,e)})}function v(l,t,s,e){t.trim().split(Ft).forEach(i=>{l.addEventListener(i,s,e)})}function Nt(l,t,s,e){v(l,t,s,{...e,once:!0})}const le={bubbles:!0,cancelable:!0,composed:!0};function de(l,t,s,e){return l.dispatchEvent(new CustomEvent(t,{...le,detail:s,...e}))}const Ot=Promise.resolve();function ue(l,t){return t?Ot.then(l?t.bind(l):t):Ot}function It(l){const{documentElement:t}=l.ownerDocument,s=l.getBoundingClientRect();return{left:s.left+(I.pageXOffset-t.clientLeft),top:s.top+(I.pageYOffset-t.clientTop)}}const $e=/deg|g?rad|turn$/i;function it(l){const t=parseFloat(l)||0;if(t!==0){const[s="rad"]=String(l).match($e)||[];switch(s.toLowerCase()){case"deg":return t/360*(Math.PI*2);case"grad":return t/400*(Math.PI*2);case"turn":return t*(Math.PI*2)}}return t}const Rt="contain",fe="cover";function J(l,t=Rt){const{aspectRatio:s}=l;let{width:e,height:i}=l;const n=T(e),c=T(i);if(n&&c){const o=i*s;t===Rt&&o>e||t===fe&&o<e?i=e/s:e=i*s}else n?i=e/s:c&&(e=i*s);return{width:e,height:i}}function Kt(l,...t){if(t.length===0)return l;const[s,e,i,n,c,o]=l,[h,r,a,d,f,p]=t[0];return l=[s*h+i*r,e*h+n*r,s*a+i*d,e*a+n*d,s*f+i*p+c,e*f+n*p+o],Kt(l,...t.slice(1))}const pe=`
:host([hidden]) {
  display: none !important;
}
`,ge=/left|top|width|height/i,xt="open",K=new WeakMap,V=new WeakMap,Pt=new Map,Mt=I.document&&Array.isArray(I.document.adoptedStyleSheets)&&"replaceSync"in I.CSSStyleSheet.prototype;class R extends HTMLElement{constructor(){var s,e;super(),this.shadowRootMode=xt,this.slottable=!0;const t=(e=(s=Object.getPrototypeOf(this))==null?void 0:s.constructor)==null?void 0:e.$name;t&&Pt.set(t,this.tagName.toLowerCase())}get $sharedStyle(){return`${this.themeColor?`:host{--theme-color: ${this.themeColor};}`:""}${pe}`}static get observedAttributes(){return["shadow-root-mode","slottable","theme-color"]}attributeChangedCallback(t,s,e){if(Object.is(e,s))return;const i=kt(t),n=this[i];let c=e;switch(typeof n){case"boolean":c=e!==null&&e!=="false";break;case"number":c=Number(e);break}switch(this[i]=c,t){case"theme-color":{const o=V.get(this),h=this.$sharedStyle;o&&h&&(Mt?o.replaceSync(h):o.textContent=h);break}}}$propertyChangedCallback(t,s,e){if(!Object.is(e,s))switch(t=_t(t),typeof e){case"boolean":e===!0?this.hasAttribute(t)||this.setAttribute(t,""):this.removeAttribute(t);break;case"number":qt(e)?e="":e=String(e);default:e?this.getAttribute(t)!==e&&this.setAttribute(t,e):this.removeAttribute(t)}}connectedCallback(){Object.getPrototypeOf(this).constructor.observedAttributes.forEach(s=>{const e=kt(s);let i=this[e];ae(i)||this.$propertyChangedCallback(e,void 0,i),Object.defineProperty(this,e,{enumerable:!0,configurable:!0,get(){return i},set(n){const c=i;i=n,this.$propertyChangedCallback(e,c,n)}})});const t=this.attachShadow({mode:this.shadowRootMode||xt});if(this.shadowRoot||K.set(this,t),V.set(this,this.$addStyles(this.$sharedStyle)),this.$style&&this.$addStyles(this.$style),this.$template){const s=document.createElement("template");s.innerHTML=this.$template,t.appendChild(s.content)}if(this.slottable){const s=document.createElement("slot");t.appendChild(s)}}disconnectedCallback(){V.has(this)&&V.delete(this),K.has(this)&&K.delete(this)}$getTagNameOf(t){return Pt.get(t)??t}$setStyles(t){return Object.keys(t).forEach(s=>{let e=t[s];u(e)&&(e!==0&&ge.test(s)?e=`${e}px`:e=String(e)),this.style[s]=e}),this}$getShadowRoot(){return this.shadowRoot||K.get(this)}$addStyles(t){let s;const e=this.$getShadowRoot();return Mt?(s=new CSSStyleSheet,s.replaceSync(t),e.adoptedStyleSheets=e.adoptedStyleSheets.concat(s)):(s=document.createElement("style"),s.textContent=t,e.appendChild(s)),s}$emit(t,s,e){return de(this,t,s,e)}$nextTick(t){return ue(this,t)}static $define(t,s){Zt(t)&&(s=t,t=""),t||(t=this.$name||this.name),t=_t(t),st&&I.customElements&&!I.customElements.get(t)&&customElements.define(t,this,s)}}R.$version="__VERSION__";const me=`
:host {
  display: block;
  min-height: 100px;
  min-width: 200px;
  overflow: hidden;
  position: relative;
  touch-action: none;
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
`;class ht extends R{constructor(){super(...arguments),this.$onPointerDown=null,this.$onPointerMove=null,this.$onPointerUp=null,this.$onWheel=null,this.$wheeling=!1,this.$pointers=new Map,this.$style=me,this.$action=x,this.background=!1,this.disabled=!1,this.scaleStep=.1,this.themeColor="#39f"}static get observedAttributes(){return super.observedAttributes.concat(["background","disabled","scale-step"])}connectedCallback(){super.connectedCallback(),this.disabled||this.$bind()}disconnectedCallback(){this.disabled||this.$unbind(),super.disconnectedCallback()}$propertyChangedCallback(t,s,e){if(!Object.is(e,s))switch(super.$propertyChangedCallback(t,s,e),t){case"disabled":e?this.$unbind():this.$bind();break}}$bind(){this.$onPointerDown||(this.$onPointerDown=this.$handlePointerDown.bind(this),v(this,vt,this.$onPointerDown)),this.$onPointerMove||(this.$onPointerMove=this.$handlePointerMove.bind(this),v(this.ownerDocument,St,this.$onPointerMove)),this.$onPointerUp||(this.$onPointerUp=this.$handlePointerUp.bind(this),v(this.ownerDocument,wt,this.$onPointerUp)),this.$onWheel||(this.$onWheel=this.$handleWheel.bind(this),v(this,Tt,this.$onWheel,{passive:!1,capture:!0}))}$unbind(){this.$onPointerDown&&(C(this,vt,this.$onPointerDown),this.$onPointerDown=null),this.$onPointerMove&&(C(this.ownerDocument,St,this.$onPointerMove),this.$onPointerMove=null),this.$onPointerUp&&(C(this.ownerDocument,wt,this.$onPointerUp),this.$onPointerUp=null),this.$onWheel&&(C(this,Tt,this.$onWheel,{capture:!0}),this.$onWheel=null)}$handlePointerDown(t){const{buttons:s,button:e,type:i}=t;if(this.disabled||(i==="pointerdown"&&t.pointerType==="mouse"||i==="mousedown")&&(u(s)&&s!==1||u(e)&&e!==0||t.ctrlKey))return;const{$pointers:n}=this;let c="";if(t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:o,pageX:h,pageY:r})=>{n.set(o,{startX:h,startY:r,endX:h,endY:r})});else{const{pointerId:o=0,pageX:h,pageY:r}=t;n.set(o,{startX:h,startY:r,endX:h,endY:r})}n.size>1?c=tt:F(t.target)&&(c=t.target.action||t.target.getAttribute(ee)||""),this.$emit(L,{action:c,relatedEvent:t})!==!1&&(t.preventDefault(),this.$action=c,this.style.willChange="transform")}$handlePointerMove(t){const{$action:s,$pointers:e}=this;if(this.disabled||s===x||e.size===0||this.$emit(oe,{action:s,relatedEvent:t})===!1)return;if(t.preventDefault(),t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:n,pageX:c,pageY:o})=>{const h=e.get(n);h&&Object.assign(h,{endX:c,endY:o})});else{const{pointerId:n=0,pageX:c,pageY:o}=t,h=e.get(n);h&&Object.assign(h,{endX:c,endY:o})}const i={action:s,relatedEvent:t};if(s===tt){const n=new Map(e);let c=0,o=0,h=0,r=0,a=t.pageX,d=t.pageY;e.forEach(($,y)=>{n.delete(y),n.forEach(S=>{let b=S.startX-$.startX,E=S.startY-$.startY,g=S.endX-$.endX,m=S.endY-$.endY,w=0,A=0,k=0,_=0;if(b===0?E<0?k=Math.PI*2:E>0&&(k=Math.PI):b>0?k=Math.PI/2+Math.atan(E/b):b<0&&(k=Math.PI*1.5+Math.atan(E/b)),g===0?m<0?_=Math.PI*2:m>0&&(_=Math.PI):g>0?_=Math.PI/2+Math.atan(m/g):g<0&&(_=Math.PI*1.5+Math.atan(m/g)),_>0||k>0){const N=_-k,O=Math.abs(N);O>c&&(c=O,h=N,a=($.startX+S.startX)/2,d=($.startY+S.startY)/2)}if(b=Math.abs(b),E=Math.abs(E),g=Math.abs(g),m=Math.abs(m),b>0&&E>0?w=Math.sqrt(b*b+E*E):b>0?w=b:E>0&&(w=E),g>0&&m>0?A=Math.sqrt(g*g+m*m):g>0?A=g:m>0&&(A=m),w>0&&A>0){const N=(A-w)/w,O=Math.abs(N);O>o&&(o=O,r=N,a=($.startX+S.startX)/2,d=($.startY+S.startY)/2)}})});const f=c>0,p=o>0;f&&p?(i.rotate=h,i.scale=r,i.centerX=a,i.centerY=d):f?(i.action=nt,i.rotate=h,i.centerX=a,i.centerY=d):p?(i.action=Y,i.scale=r,i.centerX=a,i.centerY=d):i.action=x}else{const[n]=Array.from(e.values());Object.assign(i,n)}e.forEach(n=>{n.startX=n.endX,n.startY=n.endY}),i.action!==x&&this.$emit(H,i,{cancelable:!1})}$handlePointerUp(t){const{$action:s,$pointers:e}=this;if(!(this.disabled||s===x)&&this.$emit(z,{action:s,relatedEvent:t})!==!1){if(t.preventDefault(),t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:i})=>{e.delete(i)});else{const{pointerId:i=0}=t;e.delete(i)}e.size===0&&(this.style.willChange="",this.$action=x)}}$handleWheel(t){if(this.disabled||(t.preventDefault(),this.$wheeling))return;this.$wheeling=!0,setTimeout(()=>{this.$wheeling=!1},50);const e=(t.deltaY>0?-1:1)*this.scaleStep;this.$emit(H,{action:Y,scale:e,relatedEvent:t},{cancelable:!1})}$setAction(t){return G(t)&&(this.$action=t),this}$toCanvas(t){return new Promise((s,e)=>{if(!this.isConnected){e(new Error("The current element is not connected to the DOM."));return}const i=document.createElement("canvas");let n=this.offsetWidth,c=this.offsetHeight,o=1;et(t)&&(T(t.width)||T(t.height))&&({width:n,height:c}=J({aspectRatio:n/c,width:t.width,height:t.height}),o=n/this.offsetWidth),i.width=n,i.height=c;const h=this.querySelector(this.$getTagNameOf(X));if(!h){s(i);return}h.$ready().then(r=>{const a=i.getContext("2d");if(a){const[d,f,p,$,y,S]=h.$getTransform();let b=y,E=S,g=r.naturalWidth,m=r.naturalHeight;o!==1&&(b*=o,E*=o,g*=o,m*=o);const w=g/2,A=m/2;a.fillStyle="transparent",a.fillRect(0,0,n,c),et(t)&&ct(t.beforeDraw)&&t.beforeDraw.call(this,a,i),a.save(),a.translate(w,A),a.transform(d,f,p,$,b,E),a.translate(-w,-A),a.drawImage(r,0,0,g,m),a.restore()}s(i)}).catch(e)})}}ht.$name=U;ht.$version="__VERSION__";const be=`
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
`,Dt=new WeakMap,zt=["alt","crossorigin","decoding","importance","loading","referrerpolicy","sizes","src","srcset"];class lt extends R{constructor(){super(...arguments),this.$matrix=[1,0,0,1,0,0],this.$onLoad=null,this.$onCanvasAction=null,this.$onCanvasActionEnd=null,this.$onCanvasActionStart=null,this.$actionStartTarget=null,this.$style=be,this.$image=new Image,this.rotatable=!0,this.scalable=!0,this.skewable=!0,this.slottable=!1,this.translatable=!0}set $canvas(t){Dt.set(this,t)}get $canvas(){return Dt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(zt,["rotatable","scalable","skewable","translatable"])}attributeChangedCallback(t,s,e){Object.is(e,s)||(super.attributeChangedCallback(t,s,e),zt.includes(t)&&this.$image.setAttribute(t,e))}connectedCallback(){super.connectedCallback();const{$image:t}=this,s=this.closest(this.$getTagNameOf(U));s&&(this.$canvas=s,this.$setStyles({display:"block",position:"absolute"}),this.$onCanvasActionStart=e=>{var i,n;this.$actionStartTarget=(n=(i=e.detail)==null?void 0:i.relatedEvent)==null?void 0:n.target},this.$onCanvasActionEnd=()=>{this.$actionStartTarget=null},this.$onCanvasAction=this.$handleAction.bind(this),v(s,L,this.$onCanvasActionStart),v(s,z,this.$onCanvasActionEnd),v(s,H,this.$onCanvasAction)),this.$onLoad=this.$handleLoad.bind(this),v(t,W,this.$onLoad),this.$getShadowRoot().appendChild(t)}disconnectedCallback(){const{$image:t,$canvas:s}=this;s&&(this.$onCanvasActionStart&&(C(s,L,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(C(s,z,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasAction&&(C(s,H,this.$onCanvasAction),this.$onCanvasAction=null)),t&&this.$onLoad&&(C(t,W,this.$onLoad),this.$onLoad=null),this.$getShadowRoot().removeChild(t),super.disconnectedCallback()}$handleLoad(){const{$image:t}=this;this.$setStyles({width:t.naturalWidth,height:t.naturalHeight}),this.$canvas&&this.$center("cover")}$handleAction(t){if(this.hidden||!(this.rotatable||this.scalable||this.translatable))return;const{$canvas:s}=this,{detail:e}=t;if(e){const{relatedEvent:i}=e;let{action:n}=e;switch(n===tt&&(!this.rotatable||!this.scalable)&&(this.rotatable?n=nt:this.scalable?n=Y:n=x),n){case jt:if(this.translatable){const c=this.$getTagNameOf(D);let o=s.querySelector(c);o&&o.multiple&&!o.active&&(o=s.querySelector(`${c}[active]`)),(!o||o.hidden||!o.movable||!(this.$actionStartTarget&&o.contains(this.$actionStartTarget)))&&this.$move(e.endX-e.startX,e.endY-e.startY)}break;case nt:if(this.rotatable)if(i){const{x:c,y:o}=this.getBoundingClientRect();this.$rotate(e.rotate,i.clientX-c,i.clientY-o)}else this.$rotate(e.rotate);break;case Y:if(this.scalable)if(i){const{x:c,y:o}=this.getBoundingClientRect();this.$zoom(e.scale,i.clientX-c,i.clientY-o)}else this.$zoom(e.scale);break;case tt:if(this.rotatable&&this.scalable){const{rotate:c}=e;let{scale:o}=e;o<0?o=1/(1-o):o+=1;const h=Math.cos(c),r=Math.sin(c),[a,d,f,p]=[h*o,r*o,-r*o,h*o];if(i){const $=this.getBoundingClientRect(),y=i.clientX-$.x,S=i.clientY-$.y,[b,E,g,m]=this.$matrix,w=$.width/2,A=$.height/2,k=y-w,_=S-A,N=(k*m-g*_)/(b*m-g*E),O=(_-E*N)/m;this.$transform(a,d,f,p,N*(1-a)+O*f,O*(1-p)+N*d)}else this.$transform(a,d,f,p,0,0)}break}}}$ready(t){const{$image:s}=this,e=new Promise((i,n)=>{const c=new Error("Failed to load the image source");if(s.complete)s.naturalWidth>0&&s.naturalHeight>0?i(s):n(c);else{const o=()=>{C(s,yt,h),i(s)},h=()=>{C(s,W,o),n(c)};Nt(s,W,o),Nt(s,yt,h)}});return ct(t)&&e.then(i=>(t(i),i)),e}$center(t){const{parentElement:s}=this;if(!s)return this;const e=s.getBoundingClientRect(),i=e.width,n=e.height,{x:c,y:o,width:h,height:r}=this.getBoundingClientRect(),a=c+h/2,d=o+r/2,f=e.x+i/2,p=e.y+n/2;if(this.$move(f-a,p-d),t&&(h!==i||r!==n)){const $=i/h,y=n/r;switch(t){case"cover":this.$scale(Math.max($,y));break;case"contain":this.$scale(Math.min($,y));break}}return this}$move(t,s=t){if(this.translatable&&u(t)&&u(s)){const[e,i,n,c]=this.$matrix,o=(t*c-n*s)/(e*c-n*i),h=(s-i*o)/c;this.$translate(o,h)}return this}$moveTo(t,s=t){if(this.translatable&&u(t)&&u(s)){const[e,i,n,c]=this.$matrix,o=(t*c-n*s)/(e*c-n*i),h=(s-i*o)/c;this.$setTransform(e,i,n,c,o,h)}return this}$rotate(t,s,e){if(this.rotatable){const i=it(t),n=Math.cos(i),c=Math.sin(i),[o,h,r,a]=[n,c,-c,n];if(u(s)&&u(e)){const[d,f,p,$]=this.$matrix,{width:y,height:S}=this.getBoundingClientRect(),b=y/2,E=S/2,g=s-b,m=e-E,w=(g*$-p*m)/(d*$-p*f),A=(m-f*w)/$;this.$transform(o,h,r,a,w*(1-o)-A*r,A*(1-a)-w*h)}else this.$transform(o,h,r,a,0,0)}return this}$zoom(t,s,e){if(!this.scalable||t===0)return this;if(t<0?t=1/(1-t):t+=1,u(s)&&u(e)){const[i,n,c,o]=this.$matrix,{width:h,height:r}=this.getBoundingClientRect(),a=h/2,d=r/2,f=s-a,p=e-d,$=(f*o-c*p)/(i*o-c*n),y=(p-n*$)/o;this.$transform(t,0,0,t,$*(1-t),y*(1-t))}else this.$scale(t);return this}$scale(t,s=t){return this.scalable&&this.$transform(t,0,0,s,0,0),this}$skew(t,s=0){if(this.skewable){const e=it(t),i=it(s);this.$transform(1,Math.tan(i),Math.tan(e),1,0,0)}return this}$translate(t,s=t){return this.translatable&&u(t)&&u(s)&&this.$transform(1,0,0,1,t,s),this}$transform(t,s,e,i,n,c){return u(t)&&u(s)&&u(e)&&u(i)&&u(n)&&u(c)?this.$setTransform(Kt(this.$matrix,[t,s,e,i,n,c])):this}$setTransform(t,s,e,i,n,c){if((this.rotatable||this.scalable||this.skewable||this.translatable)&&(Array.isArray(t)&&([t,s,e,i,n,c]=t),u(t)&&u(s)&&u(e)&&u(i)&&u(n)&&u(c))){const o=[t,s,e,i,n,c];if(this.$emit(ot,{matrix:o,oldMatrix:this.$matrix})===!1)return this;this.$matrix=o,this.style.transform=`matrix(${o.join(", ")})`}return this}$getTransform(){return this.$matrix.slice()}$resetTransform(){return this.$setTransform([1,0,0,1,0,0])}}lt.$name=X;lt.$version="__VERSION__";const Ee=`
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
`,Lt=new WeakMap;class dt extends R{constructor(){super(...arguments),this.$onCanvasChange=null,this.$onCanvasActionEnd=null,this.$onCanvasActionStart=null,this.$style=Ee,this.x=0,this.y=0,this.width=0,this.height=0,this.slottable=!1,this.themeColor="rgba(0, 0, 0, 0.65)"}set $canvas(t){Lt.set(this,t)}get $canvas(){return Lt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["height","width","x","y"])}connectedCallback(){super.connectedCallback();const t=this.closest(this.$getTagNameOf(U));if(t){this.$canvas=t,this.style.position="absolute";const s=t.querySelector(this.$getTagNameOf(D));s&&(this.$onCanvasActionStart=e=>{s.hidden&&e.detail.action===Q&&(this.hidden=!1)},this.$onCanvasActionEnd=e=>{s.hidden&&e.detail.action===Q&&(this.hidden=!0)},this.$onCanvasChange=e=>{const{x:i,y:n,width:c,height:o}=e.detail;this.$change(i,n,c,o),(s.hidden||i===0&&n===0&&c===0&&o===0)&&(this.hidden=!0)},v(t,L,this.$onCanvasActionStart),v(t,z,this.$onCanvasActionEnd),v(t,P,this.$onCanvasChange))}this.$render()}disconnectedCallback(){const{$canvas:t}=this;t&&(this.$onCanvasActionStart&&(C(t,L,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(C(t,z,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasChange&&(C(t,P,this.$onCanvasChange),this.$onCanvasChange=null)),super.disconnectedCallback()}$change(t,s,e=this.width,i=this.height){return!u(t)||!u(s)||!u(e)||!u(i)||t===this.x&&s===this.y&&e===this.width&&i===this.height?this:(this.hidden&&(this.hidden=!1),this.x=t,this.y=s,this.width=e,this.height=i,this.$render())}$reset(){return this.$change(0,0,0,0)}$render(){return this.$setStyles({transform:`translate(${this.x}px, ${this.y}px)`,width:this.width,height:this.height,outlineWidth:I.innerWidth})}}dt.$name=Qt;dt.$version="__VERSION__";const Ce=`
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
`;class ut extends R{constructor(){super(...arguments),this.$onCanvasCropEnd=null,this.$onCanvasCropStart=null,this.$style=Ce,this.action=x,this.plain=!1,this.slottable=!1,this.themeColor="rgba(51, 153, 255, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["action","plain"])}}ut.$name=Jt;ut.$version="__VERSION__";const ve=`
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
`,Wt=new WeakMap;class $t extends R{constructor(){super(...arguments),this.$onCanvasAction=null,this.$onCanvasActionStart=null,this.$onCanvasActionEnd=null,this.$onDocumentKeyDown=null,this.$action="",this.$actionStartTarget=null,this.$style=ve,this.x=0,this.y=0,this.width=0,this.height=0,this.aspectRatio=NaN,this.initialAspectRatio=NaN,this.initialCoverage=NaN,this.active=!1,this.movable=!1,this.resizable=!1,this.zoomable=!1,this.multiple=!1,this.keyboard=!1,this.outlined=!1,this.precise=!1}set $canvas(t){Wt.set(this,t)}get $canvas(){return Wt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["active","aspect-ratio","height","initial-aspect-ratio","initial-coverage","keyboard","movable","multiple","outlined","precise","resizable","width","x","y","zoomable"])}$propertyChangedCallback(t,s,e){if(!Object.is(e,s))switch(super.$propertyChangedCallback(t,s,e),t){case"aspectRatio":T(e)||(this.aspectRatio=NaN);break;case"initialAspectRatio":T(e)||(this.initialAspectRatio=NaN);break;case"initialCoverage":(!T(e)||e>1)&&(this.initialCoverage=NaN);break;case"keyboard":this.$nextTick(()=>{this.$canvas&&(e?this.$onDocumentKeyDown||(this.$onDocumentKeyDown=this.$handleKeyDown.bind(this),v(this.ownerDocument,At,this.$onDocumentKeyDown)):this.$onDocumentKeyDown&&(C(this.ownerDocument,At,this.$onDocumentKeyDown),this.$onDocumentKeyDown=null))});break;case"multiple":this.$nextTick(()=>{if(this.$canvas){const i=this.$getSelections();e?(i.forEach(n=>{n.active=!1}),this.active=!0,this.$emit(P,{x:this.x,y:this.y,width:this.width,height:this.height})):(this.active=!1,i.slice(1).forEach(n=>{this.$removeSelection(n)}))}});break}}connectedCallback(){super.connectedCallback();const t=this.closest(this.$getTagNameOf(U));if(t){this.$canvas=t,this.$setStyles({position:"absolute",transform:`translate(${this.x}px, ${this.y}px)`}),this.hidden||this.$render();const{initialCoverage:s,parentElement:e}=this;if(T(s)&&e){const i=this.aspectRatio||this.initialAspectRatio,{offsetWidth:n,offsetHeight:c}=e;let o=n*s,h=c*s;T(i)&&({width:o,height:h}=J({aspectRatio:i,width:o,height:h})),this.$change(this.x,this.y,o,h),this.$center()}this.$onCanvasActionStart=this.$handleActionStart.bind(this),this.$onCanvasActionEnd=this.$handleActionEnd.bind(this),this.$onCanvasAction=this.$handleAction.bind(this),v(t,L,this.$onCanvasActionStart),v(t,z,this.$onCanvasActionStart),v(t,H,this.$onCanvasAction)}else this.$render()}disconnectedCallback(){const{$canvas:t}=this;t&&(this.$onCanvasActionStart&&(C(t,L,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(C(t,z,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasAction&&(C(t,H,this.$onCanvasAction),this.$onCanvasAction=null)),super.disconnectedCallback()}$getSelections(){let t=[];return this.parentElement&&(t=Array.from(this.parentElement.querySelectorAll(this.$getTagNameOf(D)))),t}$createSelection(){const t=this.cloneNode(!0);return this.hasAttribute("id")&&t.removeAttribute("id"),this.active=!1,this.parentElement&&this.parentElement.insertBefore(t,this.nextSibling),t}$removeSelection(t=this){if(this.parentElement){const s=this.$getSelections();if(s.length>1){const e=s.indexOf(t),i=s[e+1]||s[e-1];i&&(t.active=!1,this.parentElement.removeChild(t),i.active=!0,i.$emit(P,{x:i.x,y:i.y,width:i.width,height:i.height}))}else this.$reset(),this.hidden=!0}}$handleActionStart(t){var e,i;const s=(i=(e=t.detail)==null?void 0:e.relatedEvent)==null?void 0:i.target;this.$action="",this.$actionStartTarget=s,!this.hidden&&this.multiple&&!this.active&&s===this&&this.parentElement&&(this.$getSelections().forEach(n=>{n.active=!1}),this.active=!0,this.$emit(P,{x:this.x,y:this.y,width:this.width,height:this.height}))}$handleAction(t){const{currentTarget:s,detail:e}=t;if(s&&e){const{relatedEvent:i}=e;let{action:n}=e;if(!n&&this.multiple&&(n=this.$action||(i==null?void 0:i.target.action),this.$action=n),!n||this.hidden&&n!==Q||this.multiple&&!this.active&&n!==Y)return;const c=e.endX-e.startX,o=e.endY-e.startY,{width:h,height:r}=this;let{aspectRatio:a}=this;switch(!T(a)&&t.shiftKey&&(a=T(h)&&T(r)?h/r:1),n){case Q:{const{$canvas:d}=this,f=It(s);(this.multiple&&!this.hidden?this.$createSelection():this).$change(e.startX-f.left,e.startY-f.top,c,o,a),n=q,c<0?o>0?n=Z:o<0&&(n=j):c>0&&o<0&&(n=B),d&&(d.$action=n);break}case jt:this.movable&&this.$actionStartTarget&&this.contains(this.$actionStartTarget)&&this.$move(c,o);break;case Y:if(i&&this.zoomable){const d=It(s);this.$zoom(e.scale,i.pageX-d.left,i.pageY-d.top)}break;default:this.$resize(n,c,o,a)}}}$handleActionEnd(){this.$action="",this.$actionStartTarget=null}$handleKeyDown(t){if(!(this.hidden||!this.keyboard||this.multiple&&!this.active||t.defaultPrevented))switch(t.key){case"Backspace":t.metaKey&&(t.preventDefault(),this.$removeSelection());break;case"Delete":t.preventDefault(),this.$removeSelection();break;case"ArrowLeft":t.preventDefault(),this.$move(-1,0);break;case"ArrowRight":t.preventDefault(),this.$move(1,0);break;case"ArrowUp":t.preventDefault(),this.$move(0,-1);break;case"ArrowDown":t.preventDefault(),this.$move(0,1);break;case"+":t.preventDefault(),this.$zoom(.1);break;case"-":t.preventDefault(),this.$zoom(-.1);break}}$center(){const{parentElement:t}=this;if(!t)return this;const s=(t.offsetWidth-this.width)/2,e=(t.offsetHeight-this.height)/2;return this.$change(s,e)}$move(t,s=t){return this.$moveTo(this.x+t,this.y+s)}$moveTo(t,s=t){return this.movable?this.$change(t,s):this}$resize(t,s=0,e=0,i=this.aspectRatio){if(!this.resizable)return this;const n=T(i),{$canvas:c}=this;let{x:o,y:h,width:r,height:a}=this;switch(t){case mt:h+=e,a-=e,a<0&&(t=Et,a=-a,h-=a),n&&(s=e*i,o+=s/2,r-=s,r<0&&(r=-r,o-=r));break;case bt:r+=s,r<0&&(t=Ct,r=-r,o-=r),n&&(e=s/i,h-=e/2,a+=e,a<0&&(a=-a,h-=a));break;case Et:a+=e,a<0&&(t=mt,a=-a,h-=a),n&&(s=e*i,o-=s/2,r+=s,r<0&&(r=-r,o-=r));break;case Ct:o+=s,r-=s,r<0&&(t=bt,r=-r,o-=r),n&&(e=s/i,h+=e/2,a-=e,a<0&&(a=-a,h-=a));break;case B:n&&(e=-s/i),h+=e,a-=e,r+=s,r<0&&a<0?(t=Z,r=-r,a=-a,o-=r,h-=a):r<0?(t=j,r=-r,o-=r):a<0&&(t=q,a=-a,h-=a);break;case j:n&&(e=s/i),o+=s,h+=e,r-=s,a-=e,r<0&&a<0?(t=q,r=-r,a=-a,o-=r,h-=a):r<0?(t=B,r=-r,o-=r):a<0&&(t=Z,a=-a,h-=a);break;case q:n&&(e=s/i),r+=s,a+=e,r<0&&a<0?(t=j,r=-r,a=-a,o-=r,h-=a):r<0?(t=Z,r=-r,o-=r):a<0&&(t=B,a=-a,h-=a);break;case Z:n&&(e=-s/i),o+=s,r-=s,a+=e,r<0&&a<0?(t=B,r=-r,a=-a,o-=r,h-=a):r<0?(t=q,r=-r,o-=r):a<0&&(t=j,a=-a,h-=a);break}return c&&c.$setAction(t),this.$change(o,h,r,a)}$zoom(t,s,e){if(!this.zoomable||t===0)return this;t<0?t=1/(1-t):t+=1;const{width:i,height:n}=this,c=i*t,o=n*t;let h=this.x,r=this.y;return u(s)&&u(e)?(h-=(c-i)*((s-this.x)/i),r-=(o-n)*((e-this.y)/n)):(h-=(c-i)/2,r-=(o-n)/2),this.$change(h,r,c,o)}$change(t,s,e=this.width,i=this.height,n=this.aspectRatio){return!u(t)||!u(s)||!u(e)||!u(i)?this:(this.precise||(t=Math.round(t),s=Math.round(s),e=Math.round(e),i=Math.round(i)),t===this.x&&s===this.y&&e===this.width&&i===this.height?this:(this.hidden&&(this.hidden=!1),T(n)&&({width:e,height:i}=J({aspectRatio:n,width:e,height:i},"cover")),this.$emit(P,{x:t,y:s,width:e,height:i})===!1?this:(this.x=t,this.y=s,this.width=e,this.height=i,this.$render())))}$reset(){return this.$change(0,0,0,0)}$render(){return this.$setStyles({transform:`translate(${this.x}px, ${this.y}px)`,width:this.width,height:this.height})}$toCanvas(t){return new Promise((s,e)=>{if(!this.isConnected){e(new Error("The current element is not connected to the DOM."));return}const i=document.createElement("canvas");let{width:n,height:c}=this,o=1;if(et(t)&&(T(t.width)||T(t.height))&&({width:n,height:c}=J({aspectRatio:n/c,width:t.width,height:t.height}),o=n/this.width),i.width=n,i.height=c,!this.$canvas){s(i);return}const h=this.$canvas.querySelector(this.$getTagNameOf(X));if(!h){s(i);return}h.$ready().then(r=>{const a=i.getContext("2d");if(a){const[d,f,p,$,y,S]=h.$getTransform(),b=-this.x,E=-this.y,g=(b*$-p*E)/(d*$-p*f),m=(E-f*g)/$;let w=d*g+p*m+y,A=f*g+$*m+S,k=r.naturalWidth,_=r.naturalHeight;o!==1&&(w*=o,A*=o,k*=o,_*=o);const N=k/2,O=_/2;a.fillStyle="transparent",a.fillRect(0,0,n,c),et(t)&&ct(t.beforeDraw)&&t.beforeDraw.call(this,a,i),a.save(),a.translate(N,O),a.transform(d,f,p,$,w,A),a.translate(-N,-O),a.drawImage(r,0,0,k,_),a.restore()}s(i)}).catch(e)})}}$t.$name=D;$t.$version="__VERSION__";const Se=`
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
`;class ft extends R{constructor(){super(...arguments),this.$style=Se,this.bordered=!1,this.columns=3,this.covered=!1,this.rows=3,this.slottable=!1,this.themeColor="rgba(238, 238, 238, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["bordered","columns","covered","rows"])}$propertyChangedCallback(t,s,e){Object.is(e,s)||(super.$propertyChangedCallback(t,s,e),(t==="rows"||t==="columns")&&this.$render())}connectedCallback(){super.connectedCallback(),this.$render()}$render(){const t=this.$getShadowRoot(),s=document.createDocumentFragment();for(let e=0;e<this.rows;e+=1){const i=document.createElement("span");i.setAttribute("role","row");for(let n=0;n<this.columns;n+=1){const c=document.createElement("span");c.setAttribute("role","gridcell"),i.appendChild(c)}s.appendChild(i)}t&&(t.innerHTML="",t.appendChild(s))}}ft.$name=Gt;ft.$version="__VERSION__";const we=`
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
`;class pt extends R{constructor(){super(...arguments),this.$style=we,this.centered=!1,this.slottable=!1,this.themeColor="rgba(238, 238, 238, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["centered"])}}pt.$name=Vt;pt.$version="__VERSION__";const ye=`
:host {
  display: block;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
}
`,Xt=new WeakMap,Yt=new WeakMap,Ht=new WeakMap,Ae="both",Te="horizontal",Ut="vertical",_e="none";class gt extends R{constructor(){super(...arguments),this.$onSelectionChange=null,this.$onSourceImageLoad=null,this.$onSourceImageTransform=null,this.$scale=1,this.$style=ye,this.resize=Ut,this.selection="",this.slottable=!1}set $image(t){Xt.set(this,t)}get $image(){return Xt.get(this)}set $sourceImage(t){Ht.set(this,t)}get $sourceImage(){return Ht.get(this)}set $selection(t){Yt.set(this,t)}get $selection(){return Yt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["resize","selection"])}connectedCallback(){super.connectedCallback();let t=null;if(this.selection?t=this.ownerDocument.querySelector(this.selection):t=this.closest(this.$getTagNameOf(D)),F(t)){this.$selection=t,this.$onSelectionChange=this.$handleSelectionChange.bind(this),v(t,P,this.$onSelectionChange);const s=t.closest(this.$getTagNameOf(U));if(s){const e=s.querySelector(this.$getTagNameOf(X));e&&(this.$sourceImage=e,this.$image=e.cloneNode(!0),this.$getShadowRoot().appendChild(this.$image),this.$onSourceImageLoad=this.$handleSourceImageLoad.bind(this),this.$onSourceImageTransform=this.$handleSourceImageTransform.bind(this),v(e.$image,W,this.$onSourceImageLoad),v(e,ot,this.$onSourceImageTransform))}this.$render()}}disconnectedCallback(){const{$selection:t,$sourceImage:s}=this;t&&this.$onSelectionChange&&(C(t,P,this.$onSelectionChange),this.$onSelectionChange=null),s&&this.$onSourceImageLoad&&(C(s.$image,W,this.$onSourceImageLoad),this.$onSourceImageLoad=null),s&&this.$onSourceImageTransform&&(C(s,ot,this.$onSourceImageTransform),this.$onSourceImageTransform=null),super.disconnectedCallback()}$handleSelectionChange(t){this.$render(t.detail)}$handleSourceImageLoad(){const{$image:t,$sourceImage:s}=this,e=t.getAttribute("src"),i=s.getAttribute("src");i&&i!==e&&(t.setAttribute("src",i),t.$ready(()=>{setTimeout(()=>{const{x:n,y:c}=this.$selection;this.$transformImageByOffset(s.$getTransform(),-n,-c)})}))}$handleSourceImageTransform(t){const{x:s,y:e}=this.$selection;this.$transformImageByOffset(t.detail.matrix,-s,-e)}$render(t){const{x:s,y:e,width:i,height:n}=t||this.$selection,c={},{clientWidth:o,clientHeight:h}=this;let r=o,a=h,d=NaN;switch(this.resize){case Ae:d=1,r=i,a=n,c.width=i,c.height=n;break;case Te:d=h/n,r=i*d,c.width=r;break;case Ut:d=o/i,a=n*d,c.height=a;break;case _e:default:o>0?d=o/i:h>0&&(d=h/n)}this.$scale=d,this.$setStyles(c),this.$sourceImage&&this.$transformImageByOffset(this.$sourceImage.$getTransform(),-s,-e)}$transformImageByOffset(t,s,e){const{$image:i,$scale:n,$sourceImage:c}=this;if(c&&i&&n>0){const[o,h,r,a,d,f]=t,p=(s*a-r*e)/(o*a-r*h),$=(e-h*p)/a,y=o*p+r*$+d,S=h*p+a*$+f;i.$ready(b=>{this.$setStyles.call(i,{width:b.naturalWidth*n,height:b.naturalHeight*n})}),i.$setTransform(o,h,r,a,y*n,S*n)}}}gt.$name=te;gt.$version="__VERSION__";const ke='<cropper-canvas background><cropper-image></cropper-image><cropper-shade hidden></cropper-shade><cropper-handle action="select" plain></cropper-handle><cropper-selection initial-coverage="0.5" movable resizable zoomable><cropper-grid role="grid" bordered covered></cropper-grid><cropper-crosshair centered></cropper-crosshair><cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle><cropper-handle action="n-resize"></cropper-handle><cropper-handle action="e-resize"></cropper-handle><cropper-handle action="s-resize"></cropper-handle><cropper-handle action="w-resize"></cropper-handle><cropper-handle action="ne-resize"></cropper-handle><cropper-handle action="nw-resize"></cropper-handle><cropper-handle action="se-resize"></cropper-handle><cropper-handle action="sw-resize"></cropper-handle></cropper-selection></cropper-canvas>',Ne=/^img|canvas$/,Oe=/<(\/?(?:script|style)[^>]*)>/gi,Bt={template:ke};ht.$define();pt.$define();ft.$define();ut.$define();lt.$define();$t.$define();dt.$define();gt.$define();class Ie{constructor(t,s){if(this.options=Bt,G(t)&&(t=document.querySelector(t)),!F(t)||!Ne.test(t.localName))throw new Error("The first argument is required and must be an <img> or <canvas> element.");this.element=t,s={...Bt,...s},this.options=s;const{ownerDocument:e}=t;let{container:i}=s;if(i&&(G(i)&&(i=e.querySelector(i)),!F(i)))throw new Error("The `container` option must be an element or a valid selector.");F(i)||(t.parentElement?i=t.parentElement:i=e.body),this.container=i;const n=t.localName;let c="";n==="img"?{src:c}=t:n==="canvas"&&window.HTMLCanvasElement&&(c=t.toDataURL());const{template:o}=s;if(o&&G(o)){const h=document.createElement("template"),r=document.createDocumentFragment();h.innerHTML=o.replace(Oe,"&lt;$1&gt;"),r.appendChild(h.content),Array.from(r.querySelectorAll(X)).forEach(a=>{a.setAttribute("src",c),a.setAttribute("alt",t.alt||"The image to crop")}),t.parentElement?(t.style.display="none",i.insertBefore(r,t.nextSibling)):i.appendChild(r)}}getCropperCanvas(){return this.container.querySelector(U)}getCropperImage(){return this.container.querySelector(X)}getCropperSelection(){return this.container.querySelector(D)}getCropperSelections(){return this.container.querySelectorAll(D)}}Ie.version="__VERSION__";export{jt as ACTION_MOVE,x as ACTION_NONE,bt as ACTION_RESIZE_EAST,mt as ACTION_RESIZE_NORTH,B as ACTION_RESIZE_NORTHEAST,j as ACTION_RESIZE_NORTHWEST,Et as ACTION_RESIZE_SOUTH,q as ACTION_RESIZE_SOUTHEAST,Z as ACTION_RESIZE_SOUTHWEST,Ct as ACTION_RESIZE_WEST,nt as ACTION_ROTATE,Y as ACTION_SCALE,Q as ACTION_SELECT,tt as ACTION_TRANSFORM,ee as ATTRIBUTE_ACTION,U as CROPPER_CANVAS,Vt as CROPPER_CROSSHAIR,Gt as CROPPER_GIRD,Jt as CROPPER_HANDLE,X as CROPPER_IMAGE,D as CROPPER_SELECTION,Qt as CROPPER_SHADE,te as CROPPER_VIEWER,ht as CropperCanvas,pt as CropperCrosshair,R as CropperElement,ft as CropperGrid,ut as CropperHandle,lt as CropperImage,$t as CropperSelection,dt as CropperShade,gt as CropperViewer,H as EVENT_ACTION,z as EVENT_ACTION_END,oe as EVENT_ACTION_MOVE,L as EVENT_ACTION_START,P as EVENT_CHANGE,yt as EVENT_ERROR,At as EVENT_KEYDOWN,W as EVENT_LOAD,vt as EVENT_POINTER_DOWN,St as EVENT_POINTER_MOVE,wt as EVENT_POINTER_UP,Re as EVENT_RESIZE,se as EVENT_TOUCH_END,ie as EVENT_TOUCH_MOVE,ne as EVENT_TOUCH_START,ot as EVENT_TRANSFORM,Tt as EVENT_WHEEL,rt as HAS_POINTER_EVENT,st as IS_BROWSER,at as IS_TOUCH_DEVICE,M as NAMESPACE,I as WINDOW,Ie as default,de as emit,J as getAdjustedSizes,It as getOffset,F as isElement,ct as isFunction,qt as isNaN,u as isNumber,Zt as isObject,et as isPlainObject,T as isPositiveNumber,G as isString,ae as isUndefined,Kt as multiplyMatrices,ue as nextTick,C as off,v as on,Nt as once,it as toAngleInRadian,kt as toCamelCase,_t as toKebabCase};
