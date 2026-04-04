const lt=typeof window<"u"&&typeof window.document<"u",O=lt?window:{},wt=lt?"ontouchstart"in O.document.documentElement:!1,yt=lt?"PointerEvent"in O:!1,M="cropper",j=`${M}-canvas`,le=`${M}-crosshair`,de=`${M}-grid`,ue=`${M}-handle`,Y=`${M}-image`,I=`${M}-selection`,$e=`${M}-shade`,fe=`${M}-viewer`,Q="select",ne="move",H="scale",ut="rotate",tt="transform",P="none",kt="n-resize",Nt="e-resize",Ot="s-resize",Rt="w-resize",B="ne-resize",q="nw-resize",Z="se-resize",F="sw-resize",ge="action",me=wt?"touchend touchcancel":"mouseup",pe=wt?"touchmove":"mousemove",be=wt?"touchstart":"mousedown",xt=yt?"pointerdown":be,It=yt?"pointermove":pe,_t=yt?"pointerup pointercancel":me,Pt="error",zt="keydown",L="load",Mt="resize",Dt="wheel",U="action",D="actionend",Ee="actionmove",W="actionstart",z="change",$t="transform";function V(l){return typeof l=="string"}const ae=Number.isNaN||O.isNaN;function g(l){return typeof l=="number"&&!ae(l)}function T(l){return g(l)&&l>0&&l<1/0}function ve(l){return typeof l>"u"}function oe(l){return typeof l=="object"&&l!==null}const{hasOwnProperty:Se}=Object.prototype;function et(l){if(!oe(l))return!1;try{const{constructor:t}=l,{prototype:s}=t;return t&&s&&Se.call(s,"isPrototypeOf")}catch{return!1}}function Ct(l){return typeof l=="function"}function X(l){return typeof l=="object"&&l!==null&&l.nodeType===1}const we=/([a-z\d])([A-Z])/g;function Wt(l){return String(l).replace(we,"$1-$2").toLowerCase()}const ye=/-[A-z\d]/g;function Lt(l){return l.replace(ye,t=>t.slice(1).toUpperCase())}const re=/\s\s*/;function v(l,t,s,e){t.trim().split(re).forEach(i=>{l.removeEventListener(i,s,e)})}function S(l,t,s,e){t.trim().split(re).forEach(i=>{l.addEventListener(i,s,e)})}function Xt(l,t,s,e){S(l,t,s,{...e,once:!0})}const Ce={bubbles:!0,cancelable:!0,composed:!0};function Ae(l,t,s,e){return l.dispatchEvent(new CustomEvent(t,{...Ce,detail:s,...e}))}function Te(l){return typeof l.composedPath=="function"&&l.composedPath().find(X)||l.target}const Yt=Promise.resolve();function ke(l,t){return t?Yt.then(l?t.bind(l):t):Yt}function he(l){const t=l.getRootNode();switch(t.nodeType){case 1:return t.ownerDocument;case 9:return t;case 11:return t}return null}function Ht(l){const{documentElement:t}=l.ownerDocument,s=l.getBoundingClientRect();return{left:s.left+(O.pageXOffset-t.clientLeft),top:s.top+(O.pageYOffset-t.clientTop)}}const Ne=/deg|g?rad|turn$/i;function dt(l){const t=parseFloat(l)||0;if(t!==0){const[s="rad"]=String(l).match(Ne)||[];switch(s.toLowerCase()){case"deg":return t/360*(Math.PI*2);case"grad":return t/400*(Math.PI*2);case"turn":return t*(Math.PI*2)}}return t}const Ut="contain",Oe="cover";function J(l,t=Ut){const{aspectRatio:s}=l;let{width:e,height:i}=l;const n=T(e),h=T(i);if(n&&h){const r=i*s;t===Ut&&r>e||t===Oe&&r<e?i=e/s:e=i*s}else n?i=e/s:h&&(e=i*s);return{width:e,height:i}}function ce(l,...t){if(t.length===0)return l;const[s,e,i,n,h,r]=l,[c,o,a,d,$,f]=t[0];return l=[s*c+i*o,e*c+n*o,s*a+i*d,e*a+n*d,s*$+i*f+h,e*$+n*f+r],ce(l,...t.slice(1))}const Re=`
:host([hidden]) {
  display: none !important;
}
`,xe=/left|top|width|height/i,jt="open",K=new WeakMap,G=new WeakMap,Bt=new Map,qt=O.document&&Array.isArray(O.document.adoptedStyleSheets)&&"replaceSync"in O.CSSStyleSheet.prototype,At=class At extends HTMLElement{constructor(){var s,e;super(),this.shadowRootMode=jt,this.slottable=!0;const t=(e=(s=Object.getPrototypeOf(this))==null?void 0:s.constructor)==null?void 0:e.$name;t&&Bt.set(t,this.tagName.toLowerCase())}get $sharedStyle(){return`${this.themeColor?`:host{--theme-color: ${this.themeColor};}`:""}${Re}`}static get observedAttributes(){return["shadow-root-mode","slottable","theme-color"]}attributeChangedCallback(t,s,e){if(Object.is(e,s))return;const i=Lt(t),n=this[i];let h=e;switch(typeof n){case"boolean":h=e!==null&&e!=="false";break;case"number":h=Number(e);break}switch(this[i]=h,t){case"theme-color":{const r=G.get(this),c=this.$sharedStyle;r&&c&&(qt?r.replaceSync(c):r.textContent=c);break}}}$propertyChangedCallback(t,s,e){if(!Object.is(e,s))switch(t=Wt(t),typeof e){case"boolean":e===!0?this.hasAttribute(t)||this.setAttribute(t,""):this.removeAttribute(t);break;case"number":ae(e)?e="":e=String(e);default:e?this.getAttribute(t)!==e&&this.setAttribute(t,e):this.removeAttribute(t)}}connectedCallback(){Object.getPrototypeOf(this).constructor.observedAttributes.forEach(s=>{const e=Lt(s);let i=this[e];ve(i)||this.$propertyChangedCallback(e,void 0,i),Object.defineProperty(this,e,{enumerable:!0,configurable:!0,get(){return i},set(n){const h=i;i=n,this.$propertyChangedCallback(e,h,n)}})});const t=this.shadowRoot||this.attachShadow({mode:this.shadowRootMode||jt});if(K.set(this,t),G.set(this,this.$addStyles(this.$sharedStyle)),this.$style&&this.$addStyles(this.$style),this.$template){const s=document.createElement("template");s.innerHTML=this.$template,t.appendChild(s.content)}if(this.slottable){const s=document.createElement("slot");t.appendChild(s)}}disconnectedCallback(){G.has(this)&&G.delete(this),K.has(this)&&K.delete(this)}$getTagNameOf(t){return Bt.get(t)??t}$setStyles(t){return Object.keys(t).forEach(s=>{let e=t[s];g(e)&&(e!==0&&xe.test(s)?e=`${e}px`:e=String(e)),this.style[s]=e}),this}$getShadowRoot(){return this.shadowRoot||K.get(this)}$addStyles(t){let s;const e=this.$getShadowRoot();return qt?(s=new CSSStyleSheet,s.replaceSync(t),e.adoptedStyleSheets=e.adoptedStyleSheets.concat(s)):(s=document.createElement("style"),s.textContent=t,e.appendChild(s)),s}$emit(t,s,e){return Ae(this,t,s,e)}$nextTick(t){return ke(this,t)}static $define(t,s){oe(t)&&(s=t,t=""),t||(t=this.$name||this.name),t=Wt(t),lt&&O.customElements&&!O.customElements.get(t)&&customElements.define(t,this,s)}};At.$version="__VERSION__";let _=At;const Ie=`
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
`,st=class st extends _{constructor(){super(...arguments),this.$onPointerDown=null,this.$onPointerMove=null,this.$onPointerUp=null,this.$onWheel=null,this.$wheeling=!1,this.$pointers=new Map,this.$style=Ie,this.$action=P,this.background=!1,this.disabled=!1,this.scaleStep=.1,this.themeColor="#39f"}static get observedAttributes(){return super.observedAttributes.concat(["background","disabled","scale-step"])}connectedCallback(){super.connectedCallback(),this.disabled||this.$bind()}disconnectedCallback(){this.disabled||this.$unbind(),super.disconnectedCallback()}$propertyChangedCallback(t,s,e){if(!Object.is(e,s))switch(super.$propertyChangedCallback(t,s,e),t){case"disabled":e?this.$unbind():this.$bind();break}}$bind(){this.$onPointerDown||(this.$onPointerDown=this.$handlePointerDown.bind(this),S(this,xt,this.$onPointerDown)),this.$onPointerMove||(this.$onPointerMove=this.$handlePointerMove.bind(this),S(this.ownerDocument,It,this.$onPointerMove)),this.$onPointerUp||(this.$onPointerUp=this.$handlePointerUp.bind(this),S(this.ownerDocument,_t,this.$onPointerUp)),this.$onWheel||(this.$onWheel=this.$handleWheel.bind(this),S(this,Dt,this.$onWheel,{passive:!1,capture:!0}))}$unbind(){this.$onPointerDown&&(v(this,xt,this.$onPointerDown),this.$onPointerDown=null),this.$onPointerMove&&(v(this.ownerDocument,It,this.$onPointerMove),this.$onPointerMove=null),this.$onPointerUp&&(v(this.ownerDocument,_t,this.$onPointerUp),this.$onPointerUp=null),this.$onWheel&&(v(this,Dt,this.$onWheel,{capture:!0}),this.$onWheel=null)}$handlePointerDown(t){const{buttons:s,button:e,type:i}=t;if(this.disabled||(i==="pointerdown"&&t.pointerType==="mouse"||i==="mousedown")&&(g(s)&&s!==1||g(e)&&e!==0||t.ctrlKey))return;const{$pointers:n}=this;let h="";if(t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:r,pageX:c,pageY:o})=>{n.set(r,{startX:c,startY:o,endX:c,endY:o})});else{const{pointerId:r=0,pageX:c,pageY:o}=t;n.set(r,{startX:c,startY:o,endX:c,endY:o})}n.size>1?h=tt:X(t.target)&&(h=t.target.action||t.target.getAttribute(ge)||""),this.$emit(W,{action:h,relatedEvent:t})!==!1&&(t.preventDefault(),this.$action=h,this.style.willChange="transform")}$handlePointerMove(t){const{$action:s,$pointers:e}=this;if(this.disabled||s===P||e.size===0||this.$emit(Ee,{action:s,relatedEvent:t})===!1)return;if(t.preventDefault(),t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:n,pageX:h,pageY:r})=>{const c=e.get(n);c&&Object.assign(c,{endX:h,endY:r})});else{const{pointerId:n=0,pageX:h,pageY:r}=t,c=e.get(n);c&&Object.assign(c,{endX:h,endY:r})}const i={action:s,relatedEvent:t};if(s===tt){const n=new Map(e);let h=0,r=0,c=0,o=0,a=t.pageX,d=t.pageY;e.forEach((u,C)=>{n.delete(C),n.forEach(w=>{let m=w.startX-u.startX,E=w.startY-u.startY,p=w.endX-u.endX,b=w.endY-u.endY,y=0,A=0,k=0,N=0;if(m===0?E<0?k=Math.PI*2:E>0&&(k=Math.PI):m>0?k=Math.PI/2+Math.atan(E/m):m<0&&(k=Math.PI*1.5+Math.atan(E/m)),p===0?b<0?N=Math.PI*2:b>0&&(N=Math.PI):p>0?N=Math.PI/2+Math.atan(b/p):p<0&&(N=Math.PI*1.5+Math.atan(b/p)),N>0||k>0){const R=N-k,x=Math.abs(R);x>h&&(h=x,c=R,a=(u.startX+w.startX)/2,d=(u.startY+w.startY)/2)}if(m=Math.abs(m),E=Math.abs(E),p=Math.abs(p),b=Math.abs(b),m>0&&E>0?y=Math.sqrt(m*m+E*E):m>0?y=m:E>0&&(y=E),p>0&&b>0?A=Math.sqrt(p*p+b*b):p>0?A=p:b>0&&(A=b),y>0&&A>0){const R=(A-y)/y,x=Math.abs(R);x>r&&(r=x,o=R,a=(u.startX+w.startX)/2,d=(u.startY+w.startY)/2)}})});const $=h>0,f=r>0;$&&f?(i.rotate=c,i.scale=o,i.centerX=a,i.centerY=d):$?(i.action=ut,i.rotate=c,i.centerX=a,i.centerY=d):f?(i.action=H,i.scale=o,i.centerX=a,i.centerY=d):i.action=P}else{const[n]=Array.from(e.values());Object.assign(i,n)}e.forEach(n=>{n.startX=n.endX,n.startY=n.endY}),i.action!==P&&this.$emit(U,i,{cancelable:!1})}$handlePointerUp(t){const{$action:s,$pointers:e}=this;if(!(this.disabled||s===P)&&this.$emit(D,{action:s,relatedEvent:t})!==!1){if(t.preventDefault(),t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:i})=>{e.delete(i)});else{const{pointerId:i=0}=t;e.delete(i)}e.size===0&&(this.style.willChange="",this.$action=P)}}$handleWheel(t){if(this.disabled||(t.preventDefault(),this.$wheeling))return;this.$wheeling=!0,setTimeout(()=>{this.$wheeling=!1},50);const e=(t.deltaY>0?-1:1)*this.scaleStep;this.$emit(U,{action:H,scale:e,relatedEvent:t},{cancelable:!1})}$setAction(t){return V(t)&&(this.$action=t),this}$toCanvas(t){return new Promise((s,e)=>{if(!this.isConnected){e(new Error("The current element is not connected to the DOM."));return}const i=document.createElement("canvas");let n=this.offsetWidth,h=this.offsetHeight,r=1;et(t)&&(T(t.width)||T(t.height))&&({width:n,height:h}=J({aspectRatio:n/h,width:t.width,height:t.height}),r=n/this.offsetWidth),i.width=n,i.height=h;const c=this.querySelector(this.$getTagNameOf(Y));if(!c){s(i);return}c.$ready().then(o=>{const a=i.getContext("2d");if(a){const[d,$,f,u,C,w]=c.$getTransform();let m=C,E=w,p=o.naturalWidth,b=o.naturalHeight;r!==1&&(m*=r,E*=r,p*=r,b*=r);const y=p/2,A=b/2;a.fillStyle="transparent",a.fillRect(0,0,n,h),et(t)&&Ct(t.beforeDraw)&&t.beforeDraw.call(this,a,i),a.save(),a.translate(y,A),a.transform(d,$,f,u,m,E),a.translate(-y,-A),a.drawImage(o,0,0,p,b),a.restore()}s(i)}).catch(e)})}};st.$name=j,st.$version="__VERSION__";let ft=st;const _e=`
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
`,Zt=new WeakMap,Ft=["alt","crossorigin","decoding","elementtiming","fetchpriority","loading","referrerpolicy","sizes","src","srcset"],it=class it extends _{constructor(){super(...arguments),this.$matrix=[1,0,0,1,0,0],this.$onLoad=null,this.$onCanvasAction=null,this.$onCanvasActionEnd=null,this.$onCanvasActionStart=null,this.$actionStartTarget=null,this.$style=_e,this.$image=new Image,this.initialCenterSize="contain",this.rotatable=!1,this.scalable=!1,this.skewable=!1,this.slottable=!1,this.translatable=!1,this.alt="",this.crossorigin="",this.decoding="",this.elementtiming="",this.fetchpriority="",this.loading="",this.referrerpolicy="",this.sizes="",this.src="",this.srcset=""}set $canvas(t){Zt.set(this,t)}get $canvas(){return Zt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(Ft,["initial-center-size","rotatable","scalable","skewable","translatable"])}attributeChangedCallback(t,s,e){Object.is(e,s)||(super.attributeChangedCallback(t,s,e),Ft.includes(t)&&this.$image.setAttribute(t,e))}$propertyChangedCallback(t,s,e){if(!Object.is(e,s))switch(super.$propertyChangedCallback(t,s,e),t){case"initialCenterSize":this.$nextTick(()=>{this.$center(e)});break}}connectedCallback(){super.connectedCallback();const{$image:t}=this,s=this.closest(this.$getTagNameOf(j));s&&(this.$canvas=s,this.$setStyles({display:"block",position:"absolute"}),this.$onCanvasActionStart=e=>{var i,n;this.$actionStartTarget=(n=(i=e.detail)==null?void 0:i.relatedEvent)==null?void 0:n.target},this.$onCanvasActionEnd=()=>{this.$actionStartTarget=null},this.$onCanvasAction=this.$handleAction.bind(this),S(s,W,this.$onCanvasActionStart),S(s,D,this.$onCanvasActionEnd),S(s,U,this.$onCanvasAction)),this.$onLoad=this.$handleLoad.bind(this),S(t,L,this.$onLoad),this.$getShadowRoot().appendChild(t)}disconnectedCallback(){const{$image:t,$canvas:s}=this;s&&(this.$onCanvasActionStart&&(v(s,W,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(v(s,D,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasAction&&(v(s,U,this.$onCanvasAction),this.$onCanvasAction=null)),t&&this.$onLoad&&(v(t,L,this.$onLoad),this.$onLoad=null),this.$getShadowRoot().removeChild(t),super.disconnectedCallback()}$handleLoad(){const{$image:t}=this;this.$setStyles({width:t.naturalWidth,height:t.naturalHeight}),this.$canvas&&this.$center(this.initialCenterSize)}$handleAction(t){if(this.hidden||!(this.rotatable||this.scalable||this.translatable))return;const{$canvas:s}=this,{detail:e}=t;if(e){const{relatedEvent:i}=e;let{action:n}=e;switch(n===tt&&(!this.rotatable||!this.scalable)&&(this.rotatable?n=ut:this.scalable?n=H:n=P),n){case ne:if(this.translatable){let h=null;i&&(h=i.target.closest(this.$getTagNameOf(I))),h||(h=s.querySelector(this.$getTagNameOf(I))),h&&h.multiple&&!h.active&&(h=s.querySelector(`${this.$getTagNameOf(I)}[active]`)),(!h||h.hidden||!h.movable||h.dynamic||!(this.$actionStartTarget&&h.contains(this.$actionStartTarget)))&&this.$move(e.endX-e.startX,e.endY-e.startY)}break;case ut:if(this.rotatable)if(i){const{x:h,y:r}=this.getBoundingClientRect();this.$rotate(e.rotate,i.clientX-h,i.clientY-r)}else this.$rotate(e.rotate);break;case H:if(this.scalable)if(i){const h=i.target.closest(this.$getTagNameOf(I));if(!h||!h.zoomable||h.zoomable&&h.dynamic){const{x:r,y:c}=this.getBoundingClientRect();this.$zoom(e.scale,i.clientX-r,i.clientY-c)}}else this.$zoom(e.scale);break;case tt:if(this.rotatable&&this.scalable){const{rotate:h}=e;let{scale:r}=e;r<0?r=1/(1-r):r+=1;const c=Math.cos(h),o=Math.sin(h),[a,d,$,f]=[c*r,o*r,-o*r,c*r];if(i){const u=this.getBoundingClientRect(),C=i.clientX-u.x,w=i.clientY-u.y,[m,E,p,b]=this.$matrix,y=u.width/2,A=u.height/2,k=C-y,N=w-A,R=(k*b-p*N)/(m*b-p*E),x=(N*m-E*k)/(m*b-p*E);this.$transform(a,d,$,f,R*(1-a)+x*$,x*(1-f)+R*d)}else this.$transform(a,d,$,f,0,0)}break}}}$ready(t){const{$image:s}=this,e=new Promise((i,n)=>{const h=new Error("Failed to load the image source");if(s.complete)s.naturalWidth>0&&s.naturalHeight>0?i(s):n(h);else{const r=()=>{v(s,Pt,c),setTimeout(()=>{i(s)})},c=()=>{v(s,L,r),n(h)};Xt(s,L,r),Xt(s,Pt,c)}});return Ct(t)&&e.then(i=>(t(i),i)),e}$center(t){const{parentElement:s}=this;if(!s)return this;const e=s.getBoundingClientRect(),i=e.width,n=e.height,{x:h,y:r,width:c,height:o}=this.getBoundingClientRect(),a=h+c/2,d=r+o/2,$=e.x+i/2,f=e.y+n/2;if(this.$move($-a,f-d),t&&(c!==i||o!==n)){const u=i/c,C=n/o;switch(t){case"cover":this.$scale(Math.max(u,C));break;case"contain":this.$scale(Math.min(u,C));break}}return this}$move(t,s=t){if(this.translatable&&g(t)&&g(s)){const[e,i,n,h]=this.$matrix,r=(t*h-n*s)/(e*h-n*i),c=(s*e-i*t)/(e*h-n*i);this.$translate(r,c)}return this}$moveTo(t,s=t){if(this.translatable&&g(t)&&g(s)){const[e,i,n,h]=this.$matrix,r=(t*h-n*s)/(e*h-n*i),c=(s*e-i*t)/(e*h-n*i);this.$setTransform(e,i,n,h,r,c)}return this}$rotate(t,s,e){if(this.rotatable){const i=dt(t),n=Math.cos(i),h=Math.sin(i),[r,c,o,a]=[n,h,-h,n];if(g(s)&&g(e)){const[d,$,f,u]=this.$matrix,{width:C,height:w}=this.getBoundingClientRect(),m=C/2,E=w/2,p=s-m,b=e-E,y=(p*u-f*b)/(d*u-f*$),A=(b*d-$*p)/(d*u-f*$);this.$transform(r,c,o,a,y*(1-r)-A*o,A*(1-a)-y*c)}else this.$transform(r,c,o,a,0,0)}return this}$zoom(t,s,e){if(!this.scalable||t===0)return this;if(t<0?t=1/(1-t):t+=1,g(s)&&g(e)){const[i,n,h,r]=this.$matrix,{width:c,height:o}=this.getBoundingClientRect(),a=c/2,d=o/2,$=s-a,f=e-d,u=($*r-h*f)/(i*r-h*n),C=(f*i-n*$)/(i*r-h*n);this.$transform(t,0,0,t,u*(1-t),C*(1-t))}else this.$scale(t);return this}$scale(t,s=t){return this.scalable&&this.$transform(t,0,0,s,0,0),this}$skew(t,s=0){if(this.skewable){const e=dt(t),i=dt(s);this.$transform(1,Math.tan(i),Math.tan(e),1,0,0)}return this}$translate(t,s=t){return this.translatable&&g(t)&&g(s)&&this.$transform(1,0,0,1,t,s),this}$transform(t,s,e,i,n,h){return g(t)&&g(s)&&g(e)&&g(i)&&g(n)&&g(h)?this.$setTransform(ce(this.$matrix,[t,s,e,i,n,h])):this}$setTransform(t,s,e,i,n,h){if((this.rotatable||this.scalable||this.skewable||this.translatable)&&(Array.isArray(t)&&([t,s,e,i,n,h]=t),g(t)&&g(s)&&g(e)&&g(i)&&g(n)&&g(h))){const r=[...this.$matrix],c=[t,s,e,i,n,h];if(this.$emit($t,{matrix:c,oldMatrix:r})===!1)return this;this.$matrix=c,this.style.transform=`matrix(${c.join(", ")})`}return this}$getTransform(){return this.$matrix.slice()}$resetTransform(){return this.$setTransform([1,0,0,1,0,0])}};it.$name=Y,it.$version="__VERSION__";let gt=it;const Pe=`
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
`,Kt=new WeakMap,nt=class nt extends _{constructor(){super(...arguments),this.$onWindowResize=null,this.$onCanvasActionEnd=null,this.$onCanvasActionStart=null,this.$onSelectionChange=null,this.$style=Pe,this.x=0,this.y=0,this.width=0,this.height=0,this.slottable=!1,this.themeColor="rgba(0, 0, 0, 0.65)"}set $canvas(t){Kt.set(this,t)}get $canvas(){return Kt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["height","width","x","y"])}connectedCallback(){super.connectedCallback();const t=this.closest(this.$getTagNameOf(j));if(t){this.$canvas=t,this.style.position="absolute";const s=t.querySelector(this.$getTagNameOf(I));s&&(this.$onWindowResize=this.$render.bind(this),this.$onCanvasActionStart=e=>{s.hidden&&e.detail.action===Q&&(this.hidden=!1)},this.$onCanvasActionEnd=e=>{s.hidden&&e.detail.action===Q&&(this.hidden=!0)},this.$onSelectionChange=e=>{const{x:i,y:n,width:h,height:r}=e.defaultPrevented?s:e.detail;this.$change(i,n,h,r),(s.hidden||i===0&&n===0&&h===0&&r===0)&&(this.hidden=!0)},S(window,Mt,this.$onWindowResize),S(t,W,this.$onCanvasActionStart),S(t,D,this.$onCanvasActionEnd),S(t,z,this.$onSelectionChange))}this.$render()}disconnectedCallback(){const{$canvas:t}=this;t&&(this.$onWindowResize&&(v(window,Mt,this.$onWindowResize),this.$onWindowResize=null),this.$onCanvasActionStart&&(v(t,W,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(v(t,D,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onSelectionChange&&(v(t,z,this.$onSelectionChange),this.$onSelectionChange=null)),super.disconnectedCallback()}$change(t,s,e=this.width,i=this.height){return!g(t)||!g(s)||!g(e)||!g(i)||t===this.x&&s===this.y&&e===this.width&&i===this.height?this:(this.hidden&&(this.hidden=!1),this.x=t,this.y=s,this.width=e,this.height=i,this.$render())}$reset(){return this.$change(0,0,0,0)}$render(){return this.$setStyles({transform:`translate(${this.x}px, ${this.y}px)`,width:this.width,height:this.height,outlineWidth:O.innerWidth*O.devicePixelRatio})}};nt.$name=$e,nt.$version="__VERSION__";let mt=nt;const ze=`
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
`,at=class at extends _{constructor(){super(...arguments),this.$onCanvasCropEnd=null,this.$onCanvasCropStart=null,this.$style=ze,this.action=P,this.plain=!1,this.slottable=!1,this.themeColor="rgba(51, 153, 255, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["action","plain"])}};at.$name=ue,at.$version="__VERSION__";let pt=at;const Me=`
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
`,Gt=new WeakMap,ot=class ot extends _{constructor(){super(...arguments),this.$onCanvasAction=null,this.$onCanvasActionStart=null,this.$onCanvasActionEnd=null,this.$onDocumentKeyDown=null,this.$action="",this.$actionStartTarget=null,this.$changing=!1,this.$style=Me,this.$initialSelection={x:0,y:0,width:0,height:0},this.x=0,this.y=0,this.width=0,this.height=0,this.aspectRatio=NaN,this.initialAspectRatio=NaN,this.initialCoverage=NaN,this.active=!1,this.linked=!1,this.dynamic=!1,this.movable=!1,this.resizable=!1,this.zoomable=!1,this.multiple=!1,this.keyboard=!1,this.outlined=!1,this.precise=!1}set $canvas(t){Gt.set(this,t)}get $canvas(){return Gt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["active","aspect-ratio","dynamic","height","initial-aspect-ratio","initial-coverage","keyboard","linked","movable","multiple","outlined","precise","resizable","width","x","y","zoomable"])}$propertyChangedCallback(t,s,e){if(!Object.is(e,s))switch(super.$propertyChangedCallback(t,s,e),t){case"x":case"y":case"width":case"height":this.$changing||this.$nextTick(()=>{this.$change(this.x,this.y,this.width,this.height,this.aspectRatio,!0)});break;case"aspectRatio":case"initialAspectRatio":this.$nextTick(()=>{this.$initSelection()});break;case"initialCoverage":this.$nextTick(()=>{T(e)&&e<=1&&this.$initSelection(!0,!0)});break;case"keyboard":this.$nextTick(()=>{this.$canvas&&(e?this.$onDocumentKeyDown||(this.$onDocumentKeyDown=this.$handleKeyDown.bind(this),S(this.ownerDocument,zt,this.$onDocumentKeyDown)):this.$onDocumentKeyDown&&(v(this.ownerDocument,zt,this.$onDocumentKeyDown),this.$onDocumentKeyDown=null))});break;case"multiple":this.$nextTick(()=>{if(this.$canvas){const i=this.$getSelections();e?(i.forEach(n=>{n.active=!1}),this.active=!0,this.$emit(z,{x:this.x,y:this.y,width:this.width,height:this.height})):(this.active=!1,i.slice(1).forEach(n=>{this.$removeSelection(n)}))}});break;case"precise":this.$nextTick(()=>{this.$change(this.x,this.y)});break;case"linked":e&&(this.dynamic=!0);break}}connectedCallback(){super.connectedCallback();const t=this.closest(this.$getTagNameOf(j));t?(this.$canvas=t,this.$setStyles({position:"absolute",transform:`translate(${this.x}px, ${this.y}px)`}),this.hidden||this.$render(),this.$initSelection(!0),this.$onCanvasActionStart=this.$handleActionStart.bind(this),this.$onCanvasActionEnd=this.$handleActionEnd.bind(this),this.$onCanvasAction=this.$handleAction.bind(this),S(t,W,this.$onCanvasActionStart),S(t,D,this.$onCanvasActionEnd),S(t,U,this.$onCanvasAction)):this.$render()}disconnectedCallback(){const{$canvas:t}=this;t&&(this.$onCanvasActionStart&&(v(t,W,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(v(t,D,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasAction&&(v(t,U,this.$onCanvasAction),this.$onCanvasAction=null)),super.disconnectedCallback()}$getSelections(){let t=[];return this.parentElement&&(t=Array.from(this.parentElement.querySelectorAll(this.$getTagNameOf(I)))),t}$initSelection(t=!1,s=!1){const{initialCoverage:e,parentElement:i}=this;if(T(e)&&i){const n=this.aspectRatio||this.initialAspectRatio;let h=(s?0:this.width)||i.offsetWidth*e,r=(s?0:this.height)||i.offsetHeight*e;T(n)&&({width:h,height:r}=J({aspectRatio:n,width:h,height:r})),this.$change(this.x,this.y,h,r),t&&this.$center(),this.$initialSelection={x:this.x,y:this.y,width:this.width,height:this.height}}}$createSelection(){const t=this.cloneNode(!0);return this.hasAttribute("id")&&t.removeAttribute("id"),t.initialCoverage=NaN,this.active=!1,this.parentElement&&this.parentElement.insertBefore(t,this.nextSibling),t}$removeSelection(t=this){if(this.parentElement){const s=this.$getSelections();if(s.length>1){const e=s.indexOf(t),i=s[e+1]||s[e-1];i&&(t.active=!1,this.parentElement.removeChild(t),i.active=!0,i.$emit(z,{x:i.x,y:i.y,width:i.width,height:i.height}))}else this.$clear()}}$handleActionStart(t){var e,i;const s=(i=(e=t.detail)==null?void 0:e.relatedEvent)==null?void 0:i.target;this.$action="",this.$actionStartTarget=s,!this.hidden&&this.multiple&&!this.active&&s===this&&this.parentElement&&(this.$getSelections().forEach(n=>{n.active=!1}),this.active=!0,this.$emit(z,{x:this.x,y:this.y,width:this.width,height:this.height}))}$handleAction(t){const{currentTarget:s,detail:e}=t;if(!s||!e)return;const{relatedEvent:i}=e;let{action:n}=e;const h=i?Te(i):null;if(!n&&this.multiple&&(n=this.$action||(h==null?void 0:h.action),this.$action=n),!n||this.hidden&&n!==Q||this.multiple&&!this.active&&n!==H)return;const{width:r,height:c}=this;let o=e.endX-e.startX,a=e.endY-e.startY,{aspectRatio:d}=this;switch(!T(d)&&i.shiftKey&&(d=T(r)&&T(c)?r/c:1),n){case Q:if(o!==0||a!==0){o===0?o=a:a===0&&(a=o);const{$canvas:$}=this,f=Ht(s);(this.multiple&&!this.hidden?this.$createSelection():this).$change(e.startX-f.left,e.startY-f.top,Math.abs(o),Math.abs(a),d),o<0?a<0?n=q:a>0&&(n=F):o>0&&(a<0?n=B:a>0&&(n=Z)),$&&($.$action=n)}break;case ne:this.movable&&(this.dynamic||this.$actionStartTarget&&this.contains(this.$actionStartTarget))&&this.$move(o,a);break;case H:if(i&&this.zoomable&&(this.dynamic||this.contains(i.target))){const $=Ht(s);this.$zoom(e.scale,i.pageX-$.left,i.pageY-$.top)}break;default:this.$resize(n,o,a,d)}}$handleActionEnd(){this.$action="",this.$actionStartTarget=null}$handleKeyDown(t){if(this.hidden||!this.keyboard||this.multiple&&!this.active||t.defaultPrevented)return;const{activeElement:s}=document;if(!(s&&(["INPUT","TEXTAREA"].includes(s.tagName)||["true","plaintext-only"].includes(s.contentEditable))))switch(t.key){case"Backspace":t.metaKey&&(t.preventDefault(),this.$removeSelection());break;case"Delete":t.preventDefault(),this.$removeSelection();break;case"ArrowLeft":t.preventDefault(),this.$move(-1,0);break;case"ArrowRight":t.preventDefault(),this.$move(1,0);break;case"ArrowUp":t.preventDefault(),this.$move(0,-1);break;case"ArrowDown":t.preventDefault(),this.$move(0,1);break;case"+":t.preventDefault(),this.$zoom(.1);break;case"-":t.preventDefault(),this.$zoom(-.1);break}}$center(){const{parentElement:t}=this;if(!t)return this;const s=(t.offsetWidth-this.width)/2,e=(t.offsetHeight-this.height)/2;return this.$change(s,e)}$move(t,s=t){return this.$moveTo(this.x+t,this.y+s)}$moveTo(t,s=t){return this.movable?this.$change(t,s):this}$resize(t,s=0,e=0,i=this.aspectRatio){if(!this.resizable)return this;const n=T(i),{$canvas:h}=this;let{x:r,y:c,width:o,height:a}=this;switch(t){case kt:c+=e,a-=e,a<0&&(t=Ot,a=-a,c-=a),n&&(s=e*i,r+=s/2,o-=s,o<0&&(o=-o,r-=o));break;case Nt:o+=s,o<0&&(t=Rt,o=-o,r-=o),n&&(e=s/i,c-=e/2,a+=e,a<0&&(a=-a,c-=a));break;case Ot:a+=e,a<0&&(t=kt,a=-a,c-=a),n&&(s=e*i,r-=s/2,o+=s,o<0&&(o=-o,r-=o));break;case Rt:r+=s,o-=s,o<0&&(t=Nt,o=-o,r-=o),n&&(e=s/i,c+=e/2,a-=e,a<0&&(a=-a,c-=a));break;case B:n&&(e=-s/i),c+=e,a-=e,o+=s,o<0&&a<0?(t=F,o=-o,a=-a,r-=o,c-=a):o<0?(t=q,o=-o,r-=o):a<0&&(t=Z,a=-a,c-=a);break;case q:n&&(e=s/i),r+=s,c+=e,o-=s,a-=e,o<0&&a<0?(t=Z,o=-o,a=-a,r-=o,c-=a):o<0?(t=B,o=-o,r-=o):a<0&&(t=F,a=-a,c-=a);break;case Z:n&&(e=s/i),o+=s,a+=e,o<0&&a<0?(t=q,o=-o,a=-a,r-=o,c-=a):o<0?(t=F,o=-o,r-=o):a<0&&(t=B,a=-a,c-=a);break;case F:n&&(e=-s/i),r+=s,o-=s,a+=e,o<0&&a<0?(t=B,o=-o,a=-a,r-=o,c-=a):o<0?(t=Z,o=-o,r-=o):a<0&&(t=q,a=-a,c-=a);break}return h&&h.$setAction(t),this.$change(r,c,o,a)}$zoom(t,s,e){if(!this.zoomable||t===0)return this;t<0?t=1/(1-t):t+=1;const{width:i,height:n}=this,h=i*t,r=n*t;let c=this.x,o=this.y;return g(s)&&g(e)?(c-=(h-i)*((s-this.x)/i),o-=(r-n)*((e-this.y)/n)):(c-=(h-i)/2,o-=(r-n)/2),this.$change(c,o,h,r)}$change(t,s,e=this.width,i=this.height,n=this.aspectRatio,h=!1){return this.$changing||!g(t)||!g(s)||!g(e)||!g(i)||e<0||i<0?this:(T(n)&&({width:e,height:i}=J({aspectRatio:n,width:e,height:i},"cover")),this.precise||(t=Math.round(t),s=Math.round(s),e=Math.round(e),i=Math.round(i)),t===this.x&&s===this.y&&e===this.width&&i===this.height&&Object.is(n,this.aspectRatio)&&!h?this:(this.hidden&&(this.hidden=!1),this.$emit(z,{x:t,y:s,width:e,height:i})===!1?this:(this.$changing=!0,this.x=t,this.y=s,this.width=e,this.height=i,this.$changing=!1,this.$render())))}$reset(){const{x:t,y:s,width:e,height:i}=this.$initialSelection;return this.$change(t,s,e,i)}$clear(){return this.$change(0,0,0,0,NaN,!0),this.hidden=!0,this}$render(){return this.$setStyles({transform:`translate(${this.x}px, ${this.y}px)`,width:this.width,height:this.height})}$toCanvas(t){return new Promise((s,e)=>{if(!this.isConnected){e(new Error("The current element is not connected to the DOM."));return}const i=document.createElement("canvas");let{width:n,height:h}=this,r=1;if(et(t)&&(T(t.width)||T(t.height))&&({width:n,height:h}=J({aspectRatio:n/h,width:t.width,height:t.height}),r=n/this.width),i.width=n,i.height=h,!this.$canvas){s(i);return}const c=this.$canvas.querySelector(this.$getTagNameOf(Y));if(!c){s(i);return}c.$ready().then(o=>{const a=i.getContext("2d");if(a){const[d,$,f,u,C,w]=c.$getTransform(),m=-this.x,E=-this.y,p=(m*u-f*E)/(d*u-f*$),b=(E*d-$*m)/(d*u-f*$);let y=d*p+f*b+C,A=$*p+u*b+w,k=o.naturalWidth,N=o.naturalHeight;r!==1&&(y*=r,A*=r,k*=r,N*=r);const R=k/2,x=N/2;a.fillStyle="transparent",a.fillRect(0,0,n,h),et(t)&&Ct(t.beforeDraw)&&t.beforeDraw.call(this,a,i),a.save(),a.translate(R,x),a.transform(d,$,f,u,y,A),a.translate(-R,-x),a.drawImage(o,0,0,k,N),a.restore()}s(i)}).catch(e)})}};ot.$name=I,ot.$version="__VERSION__";let bt=ot;const De=`
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
`,rt=class rt extends _{constructor(){super(...arguments),this.$style=De,this.bordered=!1,this.columns=3,this.covered=!1,this.rows=3,this.slottable=!1,this.themeColor="rgba(238, 238, 238, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["bordered","columns","covered","rows"])}$propertyChangedCallback(t,s,e){Object.is(e,s)||(super.$propertyChangedCallback(t,s,e),(t==="rows"||t==="columns")&&this.$nextTick(()=>{this.$render()}))}connectedCallback(){super.connectedCallback(),this.$render()}$render(){const t=this.$getShadowRoot(),s=document.createDocumentFragment();for(let e=0;e<this.rows;e+=1){const i=document.createElement("span");i.setAttribute("role","row");for(let n=0;n<this.columns;n+=1){const h=document.createElement("span");h.setAttribute("role","gridcell"),i.appendChild(h)}s.appendChild(i)}t&&(t.innerHTML="",t.appendChild(s))}};rt.$name=de,rt.$version="__VERSION__";let Et=rt;const We=`
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
`,ht=class ht extends _{constructor(){super(...arguments),this.$style=We,this.centered=!1,this.slottable=!1,this.themeColor="rgba(238, 238, 238, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["centered"])}};ht.$name=le,ht.$version="__VERSION__";let vt=ht;const Le=`
:host {
  display: block;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
}
`,Vt=new WeakMap,Jt=new WeakMap,Qt=new WeakMap,te=new WeakMap,Xe="both",Ye="horizontal",ee="vertical",He="none",ct=class ct extends _{constructor(){super(...arguments),this.$onSelectionChange=null,this.$onSourceImageLoad=null,this.$onSourceImageTransform=null,this.$scale=1,this.$style=Le,this.resize=ee,this.selection="",this.slottable=!1}set $image(t){Jt.set(this,t)}get $image(){return Jt.get(this)}set $sourceImage(t){te.set(this,t)}get $sourceImage(){return te.get(this)}set $canvas(t){Vt.set(this,t)}get $canvas(){return Vt.get(this)}set $selection(t){Qt.set(this,t)}get $selection(){return Qt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["resize","selection"])}connectedCallback(){var s;super.connectedCallback();let t=null;if(this.selection?t=((s=he(this))==null?void 0:s.querySelector(this.selection))??null:t=this.closest(this.$getTagNameOf(I)),X(t)){this.$selection=t,this.$onSelectionChange=this.$handleSelectionChange.bind(this),S(t,z,this.$onSelectionChange);const e=t.closest(this.$getTagNameOf(j));if(e){this.$canvas=e;const i=e.querySelector(this.$getTagNameOf(Y));i&&(this.$sourceImage=i,this.$image=i.cloneNode(!0),this.$getShadowRoot().appendChild(this.$image),this.$onSourceImageLoad=this.$handleSourceImageLoad.bind(this),this.$onSourceImageTransform=this.$handleSourceImageTransform.bind(this),S(i.$image,L,this.$onSourceImageLoad),S(i,$t,this.$onSourceImageTransform))}this.$render()}}disconnectedCallback(){const{$selection:t,$sourceImage:s}=this;t&&this.$onSelectionChange&&(v(t,z,this.$onSelectionChange),this.$onSelectionChange=null),s&&this.$onSourceImageLoad&&(v(s.$image,L,this.$onSourceImageLoad),this.$onSourceImageLoad=null),s&&this.$onSourceImageTransform&&(v(s,$t,this.$onSourceImageTransform),this.$onSourceImageTransform=null),super.disconnectedCallback()}$handleSelectionChange(t){this.$render(t.defaultPrevented?this.$selection:t.detail)}$handleSourceImageLoad(){const{$image:t,$sourceImage:s}=this,e=t.getAttribute("src"),i=s.getAttribute("src");i&&i!==e&&(t.setAttribute("src",i),t.$ready(()=>{this.$render()}))}$handleSourceImageTransform(t){this.$render(void 0,t.detail.matrix)}$render(t,s){const{$canvas:e,$selection:i}=this;!t&&!i.hidden&&(t=i),(!t||t.x===0&&t.y===0&&t.width===0&&t.height===0)&&(t={x:0,y:0,width:e.offsetWidth,height:e.offsetHeight});const{x:n,y:h,width:r,height:c}=t,o={},{clientWidth:a,clientHeight:d}=this;let $=a,f=d,u=NaN;switch(this.resize){case Xe:u=1,$=r,f=c,o.width=r,o.height=c;break;case Ye:u=c>0?d/c:0,$=r*u,o.width=$;break;case ee:u=r>0?a/r:0,f=c*u,o.height=f;break;case He:default:a>0?u=r>0?a/r:0:d>0&&(u=c>0?d/c:0)}this.$scale=u,this.$setStyles(o),this.$sourceImage&&setTimeout(()=>{this.$transformImageByOffset(s??this.$sourceImage.$getTransform(),-n,-h)})}$transformImageByOffset(t,s,e){const{$image:i,$scale:n,$sourceImage:h}=this;if(h&&i&&n>=0){const[r,c,o,a,d,$]=t,f=(s*a-o*e)/(r*a-o*c),u=(e*r-c*s)/(r*a-o*c),C=r*f+o*u+d,w=c*f+a*u+$;i.$ready(m=>{this.$setStyles.call(i,{width:m.naturalWidth*n,height:m.naturalHeight*n})}),i.$setTransform(r,c,o,a,C*n,w*n)}}};ct.$name=fe,ct.$version="__VERSION__";let St=ct;const Ue='<cropper-canvas background><cropper-image rotatable scalable skewable translatable></cropper-image><cropper-shade hidden></cropper-shade><cropper-handle action="select" plain></cropper-handle><cropper-selection initial-coverage="0.5" movable resizable><cropper-grid role="grid" bordered covered></cropper-grid><cropper-crosshair centered></cropper-crosshair><cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle><cropper-handle action="n-resize"></cropper-handle><cropper-handle action="e-resize"></cropper-handle><cropper-handle action="s-resize"></cropper-handle><cropper-handle action="w-resize"></cropper-handle><cropper-handle action="ne-resize"></cropper-handle><cropper-handle action="nw-resize"></cropper-handle><cropper-handle action="se-resize"></cropper-handle><cropper-handle action="sw-resize"></cropper-handle></cropper-selection></cropper-canvas>',je=/^img|canvas$/,Be=/<(\/?(?:script|style)[^>]*)>/gi,se={template:Ue};ft.$define();vt.$define();Et.$define();pt.$define();gt.$define();bt.$define();mt.$define();St.$define();const Tt=class Tt{constructor(t,s){var r;if(this.options=se,V(t)&&(t=document.querySelector(t)),!X(t)||!je.test(t.localName))throw new Error("The first argument is required and must be an <img> or <canvas> element.");this.element=t,s={...se,...s},this.options=s;let{container:e}=s;if(e&&(V(e)&&(e=(r=he(t))==null?void 0:r.querySelector(e)),!X(e)))throw new Error("The `container` option must be an element or a valid selector.");X(e)||(t.parentElement?e=t.parentElement:e=t.ownerDocument.body),this.container=e;const i=t.localName;let n="";i==="img"?{src:n}=t:i==="canvas"&&window.HTMLCanvasElement&&(n=t.toDataURL());const{template:h}=s;if(h&&V(h)){const c=document.createElement("template"),o=document.createDocumentFragment();c.innerHTML=h.replace(Be,"&lt;$1&gt;"),o.appendChild(c.content),Array.from(o.querySelectorAll(Y)).forEach(a=>{a.setAttribute("src",n),a.setAttribute("alt",t.alt||"The image to crop"),i==="img"&&["crossorigin","decoding","elementtiming","fetchpriority","loading","referrerpolicy","sizes","srcset"].forEach(d=>{t.hasAttribute(d)&&a.setAttribute(d,t.getAttribute(d)||"")})}),t.parentElement?(t.style.display="none",e.insertBefore(o,t.nextSibling)):e.appendChild(o)}}getCropperCanvas(){return this.container.querySelector(j)}getCropperImage(){return this.container.querySelector(Y)}getCropperSelection(){return this.container.querySelector(I)}getCropperSelections(){return this.container.querySelectorAll(I)}destroy(){var s;const t=this.getCropperCanvas();t&&((s=t.parentElement)==null||s.removeChild(t)),this.element&&(this.element.style.display="")}};Tt.version="__VERSION__";let ie=Tt;export{ne as ACTION_MOVE,P as ACTION_NONE,Nt as ACTION_RESIZE_EAST,kt as ACTION_RESIZE_NORTH,B as ACTION_RESIZE_NORTHEAST,q as ACTION_RESIZE_NORTHWEST,Ot as ACTION_RESIZE_SOUTH,Z as ACTION_RESIZE_SOUTHEAST,F as ACTION_RESIZE_SOUTHWEST,Rt as ACTION_RESIZE_WEST,ut as ACTION_ROTATE,H as ACTION_SCALE,Q as ACTION_SELECT,tt as ACTION_TRANSFORM,ge as ATTRIBUTE_ACTION,j as CROPPER_CANVAS,le as CROPPER_CROSSHAIR,de as CROPPER_GIRD,ue as CROPPER_HANDLE,Y as CROPPER_IMAGE,I as CROPPER_SELECTION,$e as CROPPER_SHADE,fe as CROPPER_VIEWER,ft as CropperCanvas,vt as CropperCrosshair,_ as CropperElement,Et as CropperGrid,pt as CropperHandle,gt as CropperImage,bt as CropperSelection,mt as CropperShade,St as CropperViewer,Ue as DEFAULT_TEMPLATE,U as EVENT_ACTION,D as EVENT_ACTION_END,Ee as EVENT_ACTION_MOVE,W as EVENT_ACTION_START,z as EVENT_CHANGE,Pt as EVENT_ERROR,zt as EVENT_KEYDOWN,L as EVENT_LOAD,xt as EVENT_POINTER_DOWN,It as EVENT_POINTER_MOVE,_t as EVENT_POINTER_UP,Mt as EVENT_RESIZE,me as EVENT_TOUCH_END,pe as EVENT_TOUCH_MOVE,be as EVENT_TOUCH_START,$t as EVENT_TRANSFORM,Dt as EVENT_WHEEL,yt as HAS_POINTER_EVENT,lt as IS_BROWSER,wt as IS_TOUCH_DEVICE,M as NAMESPACE,O as WINDOW,ie as default,Ae as emit,J as getAdjustedSizes,Te as getComposedPathTarget,Ht as getOffset,he as getRootDocument,X as isElement,Ct as isFunction,ae as isNaN,g as isNumber,oe as isObject,et as isPlainObject,T as isPositiveNumber,V as isString,ve as isUndefined,ce as multiplyMatrices,ke as nextTick,v as off,S as on,Xt as once,dt as toAngleInRadian,Lt as toCamelCase,Wt as toKebabCase};
