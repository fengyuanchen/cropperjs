const lt=typeof window<"u"&&typeof window.document<"u",x=lt?window:{},Ct=lt?"ontouchstart"in x.document.documentElement:!1,wt=lt?"PointerEvent"in x:!1,z="cropper",U=`${z}-canvas`,he=`${z}-crosshair`,ce=`${z}-grid`,le=`${z}-handle`,X=`${z}-image`,I=`${z}-selection`,de=`${z}-shade`,ue=`${z}-viewer`,Q="select",ie="move",Y="scale",ut="rotate",tt="transform",P="none",kt="n-resize",Ot="e-resize",Nt="s-resize",Rt="w-resize",j="ne-resize",B="nw-resize",q="se-resize",Z="sw-resize",$e="action",fe=Ct?"touchend touchcancel":"mouseup",ge=Ct?"touchmove":"mousemove",me=Ct?"touchstart":"mousedown",xt=wt?"pointerdown":me,It=wt?"pointermove":ge,_t=wt?"pointerup pointercancel":fe,Pt="error",Mt="keydown",L="load",Ue="resize",zt="wheel",H="action",D="actionend",pe="actionmove",W="actionstart",M="change",$t="transform";function V(l){return typeof l=="string"}const ne=Number.isNaN||x.isNaN;function $(l){return typeof l=="number"&&!ne(l)}function T(l){return $(l)&&l>0&&l<1/0}function be(l){return typeof l>"u"}function ae(l){return typeof l=="object"&&l!==null}const{hasOwnProperty:Ee}=Object.prototype;function et(l){if(!ae(l))return!1;try{const{constructor:t}=l,{prototype:s}=t;return t&&s&&Ee.call(s,"isPrototypeOf")}catch{return!1}}function yt(l){return typeof l=="function"}function F(l){return typeof l=="object"&&l!==null&&l.nodeType===1}const ve=/([a-z\d])([A-Z])/g;function Dt(l){return String(l).replace(ve,"$1-$2").toLowerCase()}const Se=/-[A-z\d]/g;function Wt(l){return l.replace(Se,t=>t.slice(1).toUpperCase())}const oe=/\s\s*/;function v(l,t,s,e){t.trim().split(oe).forEach(i=>{l.removeEventListener(i,s,e)})}function S(l,t,s,e){t.trim().split(oe).forEach(i=>{l.addEventListener(i,s,e)})}function Lt(l,t,s,e){S(l,t,s,{...e,once:!0})}const Ce={bubbles:!0,cancelable:!0,composed:!0};function we(l,t,s,e){return l.dispatchEvent(new CustomEvent(t,{...Ce,detail:s,...e}))}const Xt=Promise.resolve();function ye(l,t){return t?Xt.then(l?t.bind(l):t):Xt}function Yt(l){const{documentElement:t}=l.ownerDocument,s=l.getBoundingClientRect();return{left:s.left+(x.pageXOffset-t.clientLeft),top:s.top+(x.pageYOffset-t.clientTop)}}const Ae=/deg|g?rad|turn$/i;function dt(l){const t=parseFloat(l)||0;if(t!==0){const[s="rad"]=String(l).match(Ae)||[];switch(s.toLowerCase()){case"deg":return t/360*(Math.PI*2);case"grad":return t/400*(Math.PI*2);case"turn":return t*(Math.PI*2)}}return t}const Ht="contain",Te="cover";function J(l,t=Ht){const{aspectRatio:s}=l;let{width:e,height:i}=l;const n=T(e),r=T(i);if(n&&r){const a=i*s;t===Ht&&a>e||t===Te&&a<e?i=e/s:e=i*s}else n?i=e/s:r&&(e=i*s);return{width:e,height:i}}function re(l,...t){if(t.length===0)return l;const[s,e,i,n,r,a]=l,[c,h,o,u,f,g]=t[0];return l=[s*c+i*h,e*c+n*h,s*o+i*u,e*o+n*u,s*f+i*g+r,e*f+n*g+a],re(l,...t.slice(1))}const ke=`
:host([hidden]) {
  display: none !important;
}
`,Oe=/left|top|width|height/i,Ut="open",K=new WeakMap,G=new WeakMap,jt=new Map,Bt=x.document&&Array.isArray(x.document.adoptedStyleSheets)&&"replaceSync"in x.CSSStyleSheet.prototype,At=class At extends HTMLElement{constructor(){var s,e;super(),this.shadowRootMode=Ut,this.slottable=!0;const t=(e=(s=Object.getPrototypeOf(this))==null?void 0:s.constructor)==null?void 0:e.$name;t&&jt.set(t,this.tagName.toLowerCase())}get $sharedStyle(){return`${this.themeColor?`:host{--theme-color: ${this.themeColor};}`:""}${ke}`}static get observedAttributes(){return["shadow-root-mode","slottable","theme-color"]}attributeChangedCallback(t,s,e){if(Object.is(e,s))return;const i=Wt(t),n=this[i];let r=e;switch(typeof n){case"boolean":r=e!==null&&e!=="false";break;case"number":r=Number(e);break}switch(this[i]=r,t){case"theme-color":{const a=G.get(this),c=this.$sharedStyle;a&&c&&(Bt?a.replaceSync(c):a.textContent=c);break}}}$propertyChangedCallback(t,s,e){if(!Object.is(e,s))switch(t=Dt(t),typeof e){case"boolean":e===!0?this.hasAttribute(t)||this.setAttribute(t,""):this.removeAttribute(t);break;case"number":ne(e)?e="":e=String(e);default:e?this.getAttribute(t)!==e&&this.setAttribute(t,e):this.removeAttribute(t)}}connectedCallback(){Object.getPrototypeOf(this).constructor.observedAttributes.forEach(s=>{const e=Wt(s);let i=this[e];be(i)||this.$propertyChangedCallback(e,void 0,i),Object.defineProperty(this,e,{enumerable:!0,configurable:!0,get(){return i},set(n){const r=i;i=n,this.$propertyChangedCallback(e,r,n)}})});const t=this.attachShadow({mode:this.shadowRootMode||Ut});if(this.shadowRoot||K.set(this,t),G.set(this,this.$addStyles(this.$sharedStyle)),this.$style&&this.$addStyles(this.$style),this.$template){const s=document.createElement("template");s.innerHTML=this.$template,t.appendChild(s.content)}if(this.slottable){const s=document.createElement("slot");t.appendChild(s)}}disconnectedCallback(){G.has(this)&&G.delete(this),K.has(this)&&K.delete(this)}$getTagNameOf(t){return jt.get(t)??t}$setStyles(t){return Object.keys(t).forEach(s=>{let e=t[s];$(e)&&(e!==0&&Oe.test(s)?e=`${e}px`:e=String(e)),this.style[s]=e}),this}$getShadowRoot(){return this.shadowRoot||K.get(this)}$addStyles(t){let s;const e=this.$getShadowRoot();return Bt?(s=new CSSStyleSheet,s.replaceSync(t),e.adoptedStyleSheets=e.adoptedStyleSheets.concat(s)):(s=document.createElement("style"),s.textContent=t,e.appendChild(s)),s}$emit(t,s,e){return we(this,t,s,e)}$nextTick(t){return ye(this,t)}static $define(t,s){ae(t)&&(s=t,t=""),t||(t=this.$name||this.name),t=Dt(t),lt&&x.customElements&&!x.customElements.get(t)&&customElements.define(t,this,s)}};At.$version="__VERSION__";let _=At;const Ne=`
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
`,st=class st extends _{constructor(){super(...arguments),this.$onPointerDown=null,this.$onPointerMove=null,this.$onPointerUp=null,this.$onWheel=null,this.$wheeling=!1,this.$pointers=new Map,this.$style=Ne,this.$action=P,this.background=!1,this.disabled=!1,this.scaleStep=.1,this.themeColor="#39f"}static get observedAttributes(){return super.observedAttributes.concat(["background","disabled","scale-step"])}connectedCallback(){super.connectedCallback(),this.disabled||this.$bind()}disconnectedCallback(){this.disabled||this.$unbind(),super.disconnectedCallback()}$propertyChangedCallback(t,s,e){if(!Object.is(e,s))switch(super.$propertyChangedCallback(t,s,e),t){case"disabled":e?this.$unbind():this.$bind();break}}$bind(){this.$onPointerDown||(this.$onPointerDown=this.$handlePointerDown.bind(this),S(this,xt,this.$onPointerDown)),this.$onPointerMove||(this.$onPointerMove=this.$handlePointerMove.bind(this),S(this.ownerDocument,It,this.$onPointerMove)),this.$onPointerUp||(this.$onPointerUp=this.$handlePointerUp.bind(this),S(this.ownerDocument,_t,this.$onPointerUp)),this.$onWheel||(this.$onWheel=this.$handleWheel.bind(this),S(this,zt,this.$onWheel,{passive:!1,capture:!0}))}$unbind(){this.$onPointerDown&&(v(this,xt,this.$onPointerDown),this.$onPointerDown=null),this.$onPointerMove&&(v(this.ownerDocument,It,this.$onPointerMove),this.$onPointerMove=null),this.$onPointerUp&&(v(this.ownerDocument,_t,this.$onPointerUp),this.$onPointerUp=null),this.$onWheel&&(v(this,zt,this.$onWheel,{capture:!0}),this.$onWheel=null)}$handlePointerDown(t){const{buttons:s,button:e,type:i}=t;if(this.disabled||(i==="pointerdown"&&t.pointerType==="mouse"||i==="mousedown")&&($(s)&&s!==1||$(e)&&e!==0||t.ctrlKey))return;const{$pointers:n}=this;let r="";if(t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:a,pageX:c,pageY:h})=>{n.set(a,{startX:c,startY:h,endX:c,endY:h})});else{const{pointerId:a=0,pageX:c,pageY:h}=t;n.set(a,{startX:c,startY:h,endX:c,endY:h})}n.size>1?r=tt:F(t.target)&&(r=t.target.action||t.target.getAttribute($e)||""),this.$emit(W,{action:r,relatedEvent:t})!==!1&&(t.preventDefault(),this.$action=r,this.style.willChange="transform")}$handlePointerMove(t){const{$action:s,$pointers:e}=this;if(this.disabled||s===P||e.size===0||this.$emit(pe,{action:s,relatedEvent:t})===!1)return;if(t.preventDefault(),t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:n,pageX:r,pageY:a})=>{const c=e.get(n);c&&Object.assign(c,{endX:r,endY:a})});else{const{pointerId:n=0,pageX:r,pageY:a}=t,c=e.get(n);c&&Object.assign(c,{endX:r,endY:a})}const i={action:s,relatedEvent:t};if(s===tt){const n=new Map(e);let r=0,a=0,c=0,h=0,o=t.pageX,u=t.pageY;e.forEach((d,y)=>{n.delete(y),n.forEach(C=>{let m=C.startX-d.startX,E=C.startY-d.startY,p=C.endX-d.endX,b=C.endY-d.endY,w=0,A=0,k=0,O=0;if(m===0?E<0?k=Math.PI*2:E>0&&(k=Math.PI):m>0?k=Math.PI/2+Math.atan(E/m):m<0&&(k=Math.PI*1.5+Math.atan(E/m)),p===0?b<0?O=Math.PI*2:b>0&&(O=Math.PI):p>0?O=Math.PI/2+Math.atan(b/p):p<0&&(O=Math.PI*1.5+Math.atan(b/p)),O>0||k>0){const N=O-k,R=Math.abs(N);R>r&&(r=R,c=N,o=(d.startX+C.startX)/2,u=(d.startY+C.startY)/2)}if(m=Math.abs(m),E=Math.abs(E),p=Math.abs(p),b=Math.abs(b),m>0&&E>0?w=Math.sqrt(m*m+E*E):m>0?w=m:E>0&&(w=E),p>0&&b>0?A=Math.sqrt(p*p+b*b):p>0?A=p:b>0&&(A=b),w>0&&A>0){const N=(A-w)/w,R=Math.abs(N);R>a&&(a=R,h=N,o=(d.startX+C.startX)/2,u=(d.startY+C.startY)/2)}})});const f=r>0,g=a>0;f&&g?(i.rotate=c,i.scale=h,i.centerX=o,i.centerY=u):f?(i.action=ut,i.rotate=c,i.centerX=o,i.centerY=u):g?(i.action=Y,i.scale=h,i.centerX=o,i.centerY=u):i.action=P}else{const[n]=Array.from(e.values());Object.assign(i,n)}e.forEach(n=>{n.startX=n.endX,n.startY=n.endY}),i.action!==P&&this.$emit(H,i,{cancelable:!1})}$handlePointerUp(t){const{$action:s,$pointers:e}=this;if(!(this.disabled||s===P)&&this.$emit(D,{action:s,relatedEvent:t})!==!1){if(t.preventDefault(),t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:i})=>{e.delete(i)});else{const{pointerId:i=0}=t;e.delete(i)}e.size===0&&(this.style.willChange="",this.$action=P)}}$handleWheel(t){if(this.disabled||(t.preventDefault(),this.$wheeling))return;this.$wheeling=!0,setTimeout(()=>{this.$wheeling=!1},50);const e=(t.deltaY>0?-1:1)*this.scaleStep;this.$emit(H,{action:Y,scale:e,relatedEvent:t},{cancelable:!1})}$setAction(t){return V(t)&&(this.$action=t),this}$toCanvas(t){return new Promise((s,e)=>{if(!this.isConnected){e(new Error("The current element is not connected to the DOM."));return}const i=document.createElement("canvas");let n=this.offsetWidth,r=this.offsetHeight,a=1;et(t)&&(T(t.width)||T(t.height))&&({width:n,height:r}=J({aspectRatio:n/r,width:t.width,height:t.height}),a=n/this.offsetWidth),i.width=n,i.height=r;const c=this.querySelector(this.$getTagNameOf(X));if(!c){s(i);return}c.$ready().then(h=>{const o=i.getContext("2d");if(o){const[u,f,g,d,y,C]=c.$getTransform();let m=y,E=C,p=h.naturalWidth,b=h.naturalHeight;a!==1&&(m*=a,E*=a,p*=a,b*=a);const w=p/2,A=b/2;o.fillStyle="transparent",o.fillRect(0,0,n,r),et(t)&&yt(t.beforeDraw)&&t.beforeDraw.call(this,o,i),o.save(),o.translate(w,A),o.transform(u,f,g,d,m,E),o.translate(-w,-A),o.drawImage(h,0,0,p,b),o.restore()}s(i)}).catch(e)})}};st.$name=U,st.$version="__VERSION__";let ft=st;const Re=`
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
`,qt=new WeakMap,Zt=["alt","crossorigin","decoding","importance","loading","referrerpolicy","sizes","src","srcset"],it=class it extends _{constructor(){super(...arguments),this.$matrix=[1,0,0,1,0,0],this.$onLoad=null,this.$onCanvasAction=null,this.$onCanvasActionEnd=null,this.$onCanvasActionStart=null,this.$actionStartTarget=null,this.$style=Re,this.$image=new Image,this.initialCenterSize="contain",this.rotatable=!1,this.scalable=!1,this.skewable=!1,this.slottable=!1,this.translatable=!1}set $canvas(t){qt.set(this,t)}get $canvas(){return qt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(Zt,["initial-center-size","rotatable","scalable","skewable","translatable"])}attributeChangedCallback(t,s,e){Object.is(e,s)||(super.attributeChangedCallback(t,s,e),Zt.includes(t)&&this.$image.setAttribute(t,e))}$propertyChangedCallback(t,s,e){if(!Object.is(e,s))switch(super.$propertyChangedCallback(t,s,e),t){case"initialCenterSize":this.$nextTick(()=>{this.$center(e)});break}}connectedCallback(){super.connectedCallback();const{$image:t}=this,s=this.closest(this.$getTagNameOf(U));s&&(this.$canvas=s,this.$setStyles({display:"block",position:"absolute"}),this.$onCanvasActionStart=e=>{var i,n;this.$actionStartTarget=(n=(i=e.detail)==null?void 0:i.relatedEvent)==null?void 0:n.target},this.$onCanvasActionEnd=()=>{this.$actionStartTarget=null},this.$onCanvasAction=this.$handleAction.bind(this),S(s,W,this.$onCanvasActionStart),S(s,D,this.$onCanvasActionEnd),S(s,H,this.$onCanvasAction)),this.$onLoad=this.$handleLoad.bind(this),S(t,L,this.$onLoad),this.$getShadowRoot().appendChild(t)}disconnectedCallback(){const{$image:t,$canvas:s}=this;s&&(this.$onCanvasActionStart&&(v(s,W,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(v(s,D,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasAction&&(v(s,H,this.$onCanvasAction),this.$onCanvasAction=null)),t&&this.$onLoad&&(v(t,L,this.$onLoad),this.$onLoad=null),this.$getShadowRoot().removeChild(t),super.disconnectedCallback()}$handleLoad(){const{$image:t}=this;this.$setStyles({width:t.naturalWidth,height:t.naturalHeight}),this.$canvas&&this.$center(this.initialCenterSize)}$handleAction(t){if(this.hidden||!(this.rotatable||this.scalable||this.translatable))return;const{$canvas:s}=this,{detail:e}=t;if(e){const{relatedEvent:i}=e;let{action:n}=e;switch(n===tt&&(!this.rotatable||!this.scalable)&&(this.rotatable?n=ut:this.scalable?n=Y:n=P),n){case ie:if(this.translatable){let r=null;i&&(r=i.target.closest(this.$getTagNameOf(I))),r||(r=s.querySelector(this.$getTagNameOf(I))),r&&r.multiple&&!r.active&&(r=s.querySelector(`${this.$getTagNameOf(I)}[active]`)),(!r||r.hidden||!r.movable||r.dynamic||!(this.$actionStartTarget&&r.contains(this.$actionStartTarget)))&&this.$move(e.endX-e.startX,e.endY-e.startY)}break;case ut:if(this.rotatable)if(i){const{x:r,y:a}=this.getBoundingClientRect();this.$rotate(e.rotate,i.clientX-r,i.clientY-a)}else this.$rotate(e.rotate);break;case Y:if(this.scalable)if(i){const r=i.target.closest(this.$getTagNameOf(I));if(!r||!r.zoomable||r.zoomable&&r.dynamic){const{x:a,y:c}=this.getBoundingClientRect();this.$zoom(e.scale,i.clientX-a,i.clientY-c)}}else this.$zoom(e.scale);break;case tt:if(this.rotatable&&this.scalable){const{rotate:r}=e;let{scale:a}=e;a<0?a=1/(1-a):a+=1;const c=Math.cos(r),h=Math.sin(r),[o,u,f,g]=[c*a,h*a,-h*a,c*a];if(i){const d=this.getBoundingClientRect(),y=i.clientX-d.x,C=i.clientY-d.y,[m,E,p,b]=this.$matrix,w=d.width/2,A=d.height/2,k=y-w,O=C-A,N=(k*b-p*O)/(m*b-p*E),R=(O*m-E*k)/(m*b-p*E);this.$transform(o,u,f,g,N*(1-o)+R*f,R*(1-g)+N*u)}else this.$transform(o,u,f,g,0,0)}break}}}$ready(t){const{$image:s}=this,e=new Promise((i,n)=>{const r=new Error("Failed to load the image source");if(s.complete)s.naturalWidth>0&&s.naturalHeight>0?i(s):n(r);else{const a=()=>{v(s,Pt,c),i(s)},c=()=>{v(s,L,a),n(r)};Lt(s,L,a),Lt(s,Pt,c)}});return yt(t)&&e.then(i=>(t(i),i)),e}$center(t){const{parentElement:s}=this;if(!s)return this;const e=s.getBoundingClientRect(),i=e.width,n=e.height,{x:r,y:a,width:c,height:h}=this.getBoundingClientRect(),o=r+c/2,u=a+h/2,f=e.x+i/2,g=e.y+n/2;if(this.$move(f-o,g-u),t&&(c!==i||h!==n)){const d=i/c,y=n/h;switch(t){case"cover":this.$scale(Math.max(d,y));break;case"contain":this.$scale(Math.min(d,y));break}}return this}$move(t,s=t){if(this.translatable&&$(t)&&$(s)){const[e,i,n,r]=this.$matrix,a=(t*r-n*s)/(e*r-n*i),c=(s*e-i*t)/(e*r-n*i);this.$translate(a,c)}return this}$moveTo(t,s=t){if(this.translatable&&$(t)&&$(s)){const[e,i,n,r]=this.$matrix,a=(t*r-n*s)/(e*r-n*i),c=(s*e-i*t)/(e*r-n*i);this.$setTransform(e,i,n,r,a,c)}return this}$rotate(t,s,e){if(this.rotatable){const i=dt(t),n=Math.cos(i),r=Math.sin(i),[a,c,h,o]=[n,r,-r,n];if($(s)&&$(e)){const[u,f,g,d]=this.$matrix,{width:y,height:C}=this.getBoundingClientRect(),m=y/2,E=C/2,p=s-m,b=e-E,w=(p*d-g*b)/(u*d-g*f),A=(b*u-f*p)/(u*d-g*f);this.$transform(a,c,h,o,w*(1-a)-A*h,A*(1-o)-w*c)}else this.$transform(a,c,h,o,0,0)}return this}$zoom(t,s,e){if(!this.scalable||t===0)return this;if(t<0?t=1/(1-t):t+=1,$(s)&&$(e)){const[i,n,r,a]=this.$matrix,{width:c,height:h}=this.getBoundingClientRect(),o=c/2,u=h/2,f=s-o,g=e-u,d=(f*a-r*g)/(i*a-r*n),y=(g*i-n*f)/(i*a-r*n);this.$transform(t,0,0,t,d*(1-t),y*(1-t))}else this.$scale(t);return this}$scale(t,s=t){return this.scalable&&this.$transform(t,0,0,s,0,0),this}$skew(t,s=0){if(this.skewable){const e=dt(t),i=dt(s);this.$transform(1,Math.tan(i),Math.tan(e),1,0,0)}return this}$translate(t,s=t){return this.translatable&&$(t)&&$(s)&&this.$transform(1,0,0,1,t,s),this}$transform(t,s,e,i,n,r){return $(t)&&$(s)&&$(e)&&$(i)&&$(n)&&$(r)?this.$setTransform(re(this.$matrix,[t,s,e,i,n,r])):this}$setTransform(t,s,e,i,n,r){if((this.rotatable||this.scalable||this.skewable||this.translatable)&&(Array.isArray(t)&&([t,s,e,i,n,r]=t),$(t)&&$(s)&&$(e)&&$(i)&&$(n)&&$(r))){const a=[...this.$matrix],c=[t,s,e,i,n,r];if(this.$emit($t,{matrix:c,oldMatrix:a})===!1)return this;this.$matrix=c,this.style.transform=`matrix(${c.join(", ")})`}return this}$getTransform(){return this.$matrix.slice()}$resetTransform(){return this.$setTransform([1,0,0,1,0,0])}};it.$name=X,it.$version="__VERSION__";let gt=it;const xe=`
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
`,Ft=new WeakMap,nt=class nt extends _{constructor(){super(...arguments),this.$onCanvasChange=null,this.$onCanvasActionEnd=null,this.$onCanvasActionStart=null,this.$style=xe,this.x=0,this.y=0,this.width=0,this.height=0,this.slottable=!1,this.themeColor="rgba(0, 0, 0, 0.65)"}set $canvas(t){Ft.set(this,t)}get $canvas(){return Ft.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["height","width","x","y"])}connectedCallback(){super.connectedCallback();const t=this.closest(this.$getTagNameOf(U));if(t){this.$canvas=t,this.style.position="absolute";const s=t.querySelector(this.$getTagNameOf(I));s&&(this.$onCanvasActionStart=e=>{s.hidden&&e.detail.action===Q&&(this.hidden=!1)},this.$onCanvasActionEnd=e=>{s.hidden&&e.detail.action===Q&&(this.hidden=!0)},this.$onCanvasChange=e=>{const{x:i,y:n,width:r,height:a}=e.detail;this.$change(i,n,r,a),(s.hidden||i===0&&n===0&&r===0&&a===0)&&(this.hidden=!0)},S(t,W,this.$onCanvasActionStart),S(t,D,this.$onCanvasActionEnd),S(t,M,this.$onCanvasChange))}this.$render()}disconnectedCallback(){const{$canvas:t}=this;t&&(this.$onCanvasActionStart&&(v(t,W,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(v(t,D,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasChange&&(v(t,M,this.$onCanvasChange),this.$onCanvasChange=null)),super.disconnectedCallback()}$change(t,s,e=this.width,i=this.height){return!$(t)||!$(s)||!$(e)||!$(i)||t===this.x&&s===this.y&&e===this.width&&i===this.height?this:(this.hidden&&(this.hidden=!1),this.x=t,this.y=s,this.width=e,this.height=i,this.$render())}$reset(){return this.$change(0,0,0,0)}$render(){return this.$setStyles({transform:`translate(${this.x}px, ${this.y}px)`,width:this.width,height:this.height,outlineWidth:x.innerWidth})}};nt.$name=de,nt.$version="__VERSION__";let mt=nt;const Ie=`
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
`,at=class at extends _{constructor(){super(...arguments),this.$onCanvasCropEnd=null,this.$onCanvasCropStart=null,this.$style=Ie,this.action=P,this.plain=!1,this.slottable=!1,this.themeColor="rgba(51, 153, 255, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["action","plain"])}};at.$name=le,at.$version="__VERSION__";let pt=at;const _e=`
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
`,Kt=new WeakMap,ot=class ot extends _{constructor(){super(...arguments),this.$onCanvasAction=null,this.$onCanvasActionStart=null,this.$onCanvasActionEnd=null,this.$onDocumentKeyDown=null,this.$action="",this.$actionStartTarget=null,this.$changing=!1,this.$style=_e,this.$initialSelection={x:0,y:0,width:0,height:0},this.x=0,this.y=0,this.width=0,this.height=0,this.aspectRatio=NaN,this.initialAspectRatio=NaN,this.initialCoverage=NaN,this.active=!1,this.linked=!1,this.dynamic=!1,this.movable=!1,this.resizable=!1,this.zoomable=!1,this.multiple=!1,this.keyboard=!1,this.outlined=!1,this.precise=!1}set $canvas(t){Kt.set(this,t)}get $canvas(){return Kt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["active","aspect-ratio","dynamic","height","initial-aspect-ratio","initial-coverage","keyboard","linked","movable","multiple","outlined","precise","resizable","width","x","y","zoomable"])}$propertyChangedCallback(t,s,e){if(!Object.is(e,s))switch(super.$propertyChangedCallback(t,s,e),t){case"x":case"y":case"width":case"height":this.$changing||this.$nextTick(()=>{this.$change(this.x,this.y,this.width,this.height,this.aspectRatio,!0)});break;case"aspectRatio":case"initialAspectRatio":this.$nextTick(()=>{this.$initSelection()});break;case"initialCoverage":this.$nextTick(()=>{T(e)&&e<=1&&this.$initSelection(!0,!0)});break;case"keyboard":this.$nextTick(()=>{this.$canvas&&(e?this.$onDocumentKeyDown||(this.$onDocumentKeyDown=this.$handleKeyDown.bind(this),S(this.ownerDocument,Mt,this.$onDocumentKeyDown)):this.$onDocumentKeyDown&&(v(this.ownerDocument,Mt,this.$onDocumentKeyDown),this.$onDocumentKeyDown=null))});break;case"multiple":this.$nextTick(()=>{if(this.$canvas){const i=this.$getSelections();e?(i.forEach(n=>{n.active=!1}),this.active=!0,this.$emit(M,{x:this.x,y:this.y,width:this.width,height:this.height})):(this.active=!1,i.slice(1).forEach(n=>{this.$removeSelection(n)}))}});break;case"precise":this.$nextTick(()=>{this.$change(this.x,this.y)});break;case"linked":e&&(this.dynamic=!0);break}}connectedCallback(){super.connectedCallback();const t=this.closest(this.$getTagNameOf(U));t?(this.$canvas=t,this.$setStyles({position:"absolute",transform:`translate(${this.x}px, ${this.y}px)`}),this.hidden||this.$render(),this.$initSelection(!0),this.$onCanvasActionStart=this.$handleActionStart.bind(this),this.$onCanvasActionEnd=this.$handleActionEnd.bind(this),this.$onCanvasAction=this.$handleAction.bind(this),S(t,W,this.$onCanvasActionStart),S(t,D,this.$onCanvasActionEnd),S(t,H,this.$onCanvasAction)):this.$render()}disconnectedCallback(){const{$canvas:t}=this;t&&(this.$onCanvasActionStart&&(v(t,W,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(v(t,D,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasAction&&(v(t,H,this.$onCanvasAction),this.$onCanvasAction=null)),super.disconnectedCallback()}$getSelections(){let t=[];return this.parentElement&&(t=Array.from(this.parentElement.querySelectorAll(this.$getTagNameOf(I)))),t}$initSelection(t=!1,s=!1){const{initialCoverage:e,parentElement:i}=this;if(T(e)&&i){const n=this.aspectRatio||this.initialAspectRatio;let r=(s?0:this.width)||i.offsetWidth*e,a=(s?0:this.height)||i.offsetHeight*e;T(n)&&({width:r,height:a}=J({aspectRatio:n,width:r,height:a})),this.$change(this.x,this.y,r,a),t&&this.$center(),this.$initialSelection={x:this.x,y:this.y,width:this.width,height:this.height}}}$createSelection(){const t=this.cloneNode(!0);return this.hasAttribute("id")&&t.removeAttribute("id"),t.initialCoverage=NaN,this.active=!1,this.parentElement&&this.parentElement.insertBefore(t,this.nextSibling),t}$removeSelection(t=this){if(this.parentElement){const s=this.$getSelections();if(s.length>1){const e=s.indexOf(t),i=s[e+1]||s[e-1];i&&(t.active=!1,this.parentElement.removeChild(t),i.active=!0,i.$emit(M,{x:i.x,y:i.y,width:i.width,height:i.height}))}else this.$clear()}}$handleActionStart(t){var e,i;const s=(i=(e=t.detail)==null?void 0:e.relatedEvent)==null?void 0:i.target;this.$action="",this.$actionStartTarget=s,!this.hidden&&this.multiple&&!this.active&&s===this&&this.parentElement&&(this.$getSelections().forEach(n=>{n.active=!1}),this.active=!0,this.$emit(M,{x:this.x,y:this.y,width:this.width,height:this.height}))}$handleAction(t){const{currentTarget:s,detail:e}=t;if(!s||!e)return;const{relatedEvent:i}=e;let{action:n}=e;if(!n&&this.multiple&&(n=this.$action||(i==null?void 0:i.target.action),this.$action=n),!n||this.hidden&&n!==Q||this.multiple&&!this.active&&n!==Y)return;const r=e.endX-e.startX,a=e.endY-e.startY,{width:c,height:h}=this;let{aspectRatio:o}=this;switch(!T(o)&&i.shiftKey&&(o=T(c)&&T(h)?c/h:1),n){case Q:if(r!==0&&a!==0){const{$canvas:u}=this,f=Yt(s);(this.multiple&&!this.hidden?this.$createSelection():this).$change(e.startX-f.left,e.startY-f.top,Math.abs(r),Math.abs(a),o),r<0?a<0?n=B:a>0&&(n=Z):r>0&&(a<0?n=j:a>0&&(n=q)),u&&(u.$action=n)}break;case ie:this.movable&&(this.dynamic||this.$actionStartTarget&&this.contains(this.$actionStartTarget))&&this.$move(r,a);break;case Y:if(i&&this.zoomable&&(this.dynamic||this.contains(i.target))){const u=Yt(s);this.$zoom(e.scale,i.pageX-u.left,i.pageY-u.top)}break;default:this.$resize(n,r,a,o)}}$handleActionEnd(){this.$action="",this.$actionStartTarget=null}$handleKeyDown(t){if(!(this.hidden||!this.keyboard||this.multiple&&!this.active||t.defaultPrevented))switch(t.key){case"Backspace":t.metaKey&&(t.preventDefault(),this.$removeSelection());break;case"Delete":t.preventDefault(),this.$removeSelection();break;case"ArrowLeft":t.preventDefault(),this.$move(-1,0);break;case"ArrowRight":t.preventDefault(),this.$move(1,0);break;case"ArrowUp":t.preventDefault(),this.$move(0,-1);break;case"ArrowDown":t.preventDefault(),this.$move(0,1);break;case"+":t.preventDefault(),this.$zoom(.1);break;case"-":t.preventDefault(),this.$zoom(-.1);break}}$center(){const{parentElement:t}=this;if(!t)return this;const s=(t.offsetWidth-this.width)/2,e=(t.offsetHeight-this.height)/2;return this.$change(s,e)}$move(t,s=t){return this.$moveTo(this.x+t,this.y+s)}$moveTo(t,s=t){return this.movable?this.$change(t,s):this}$resize(t,s=0,e=0,i=this.aspectRatio){if(!this.resizable)return this;const n=T(i),{$canvas:r}=this;let{x:a,y:c,width:h,height:o}=this;switch(t){case kt:c+=e,o-=e,o<0&&(t=Nt,o=-o,c-=o),n&&(s=e*i,a+=s/2,h-=s,h<0&&(h=-h,a-=h));break;case Ot:h+=s,h<0&&(t=Rt,h=-h,a-=h),n&&(e=s/i,c-=e/2,o+=e,o<0&&(o=-o,c-=o));break;case Nt:o+=e,o<0&&(t=kt,o=-o,c-=o),n&&(s=e*i,a-=s/2,h+=s,h<0&&(h=-h,a-=h));break;case Rt:a+=s,h-=s,h<0&&(t=Ot,h=-h,a-=h),n&&(e=s/i,c+=e/2,o-=e,o<0&&(o=-o,c-=o));break;case j:n&&(e=-s/i),c+=e,o-=e,h+=s,h<0&&o<0?(t=Z,h=-h,o=-o,a-=h,c-=o):h<0?(t=B,h=-h,a-=h):o<0&&(t=q,o=-o,c-=o);break;case B:n&&(e=s/i),a+=s,c+=e,h-=s,o-=e,h<0&&o<0?(t=q,h=-h,o=-o,a-=h,c-=o):h<0?(t=j,h=-h,a-=h):o<0&&(t=Z,o=-o,c-=o);break;case q:n&&(e=s/i),h+=s,o+=e,h<0&&o<0?(t=B,h=-h,o=-o,a-=h,c-=o):h<0?(t=Z,h=-h,a-=h):o<0&&(t=j,o=-o,c-=o);break;case Z:n&&(e=-s/i),a+=s,h-=s,o+=e,h<0&&o<0?(t=j,h=-h,o=-o,a-=h,c-=o):h<0?(t=q,h=-h,a-=h):o<0&&(t=B,o=-o,c-=o);break}return r&&r.$setAction(t),this.$change(a,c,h,o)}$zoom(t,s,e){if(!this.zoomable||t===0)return this;t<0?t=1/(1-t):t+=1;const{width:i,height:n}=this,r=i*t,a=n*t;let c=this.x,h=this.y;return $(s)&&$(e)?(c-=(r-i)*((s-this.x)/i),h-=(a-n)*((e-this.y)/n)):(c-=(r-i)/2,h-=(a-n)/2),this.$change(c,h,r,a)}$change(t,s,e=this.width,i=this.height,n=this.aspectRatio,r=!1){return this.$changing||!$(t)||!$(s)||!$(e)||!$(i)||e<0||i<0?this:(T(n)&&({width:e,height:i}=J({aspectRatio:n,width:e,height:i},"cover")),this.precise||(t=Math.round(t),s=Math.round(s),e=Math.round(e),i=Math.round(i)),t===this.x&&s===this.y&&e===this.width&&i===this.height&&Object.is(n,this.aspectRatio)&&!r?this:(this.hidden&&(this.hidden=!1),this.$emit(M,{x:t,y:s,width:e,height:i})===!1?this:(this.$changing=!0,this.x=t,this.y=s,this.width=e,this.height=i,this.$changing=!1,this.$render())))}$reset(){const{x:t,y:s,width:e,height:i}=this.$initialSelection;return this.$change(t,s,e,i)}$clear(){return this.$change(0,0,0,0,NaN,!0),this.hidden=!0,this}$render(){return this.$setStyles({transform:`translate(${this.x}px, ${this.y}px)`,width:this.width,height:this.height})}$toCanvas(t){return new Promise((s,e)=>{if(!this.isConnected){e(new Error("The current element is not connected to the DOM."));return}const i=document.createElement("canvas");let{width:n,height:r}=this,a=1;if(et(t)&&(T(t.width)||T(t.height))&&({width:n,height:r}=J({aspectRatio:n/r,width:t.width,height:t.height}),a=n/this.width),i.width=n,i.height=r,!this.$canvas){s(i);return}const c=this.$canvas.querySelector(this.$getTagNameOf(X));if(!c){s(i);return}c.$ready().then(h=>{const o=i.getContext("2d");if(o){const[u,f,g,d,y,C]=c.$getTransform(),m=-this.x,E=-this.y,p=(m*d-g*E)/(u*d-g*f),b=(E*u-f*m)/(u*d-g*f);let w=u*p+g*b+y,A=f*p+d*b+C,k=h.naturalWidth,O=h.naturalHeight;a!==1&&(w*=a,A*=a,k*=a,O*=a);const N=k/2,R=O/2;o.fillStyle="transparent",o.fillRect(0,0,n,r),et(t)&&yt(t.beforeDraw)&&t.beforeDraw.call(this,o,i),o.save(),o.translate(N,R),o.transform(u,f,g,d,w,A),o.translate(-N,-R),o.drawImage(h,0,0,k,O),o.restore()}s(i)}).catch(e)})}};ot.$name=I,ot.$version="__VERSION__";let bt=ot;const Pe=`
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
`,rt=class rt extends _{constructor(){super(...arguments),this.$style=Pe,this.bordered=!1,this.columns=3,this.covered=!1,this.rows=3,this.slottable=!1,this.themeColor="rgba(238, 238, 238, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["bordered","columns","covered","rows"])}$propertyChangedCallback(t,s,e){Object.is(e,s)||(super.$propertyChangedCallback(t,s,e),(t==="rows"||t==="columns")&&this.$nextTick(()=>{this.$render()}))}connectedCallback(){super.connectedCallback(),this.$render()}$render(){const t=this.$getShadowRoot(),s=document.createDocumentFragment();for(let e=0;e<this.rows;e+=1){const i=document.createElement("span");i.setAttribute("role","row");for(let n=0;n<this.columns;n+=1){const r=document.createElement("span");r.setAttribute("role","gridcell"),i.appendChild(r)}s.appendChild(i)}t&&(t.innerHTML="",t.appendChild(s))}};rt.$name=ce,rt.$version="__VERSION__";let Et=rt;const Me=`
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
`,ht=class ht extends _{constructor(){super(...arguments),this.$style=Me,this.centered=!1,this.slottable=!1,this.themeColor="rgba(238, 238, 238, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["centered"])}};ht.$name=he,ht.$version="__VERSION__";let vt=ht;const ze=`
:host {
  display: block;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
}
`,Gt=new WeakMap,Vt=new WeakMap,Jt=new WeakMap,Qt=new WeakMap,De="both",We="horizontal",te="vertical",Le="none",ct=class ct extends _{constructor(){super(...arguments),this.$onSelectionChange=null,this.$onSourceImageLoad=null,this.$onSourceImageTransform=null,this.$scale=1,this.$style=ze,this.resize=te,this.selection="",this.slottable=!1}set $image(t){Vt.set(this,t)}get $image(){return Vt.get(this)}set $sourceImage(t){Qt.set(this,t)}get $sourceImage(){return Qt.get(this)}set $canvas(t){Gt.set(this,t)}get $canvas(){return Gt.get(this)}set $selection(t){Jt.set(this,t)}get $selection(){return Jt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["resize","selection"])}connectedCallback(){super.connectedCallback();let t=null;if(this.selection?t=this.ownerDocument.querySelector(this.selection):t=this.closest(this.$getTagNameOf(I)),F(t)){this.$selection=t,this.$onSelectionChange=this.$handleSelectionChange.bind(this),S(t,M,this.$onSelectionChange);const s=t.closest(this.$getTagNameOf(U));if(s){this.$canvas=s;const e=s.querySelector(this.$getTagNameOf(X));e&&(this.$sourceImage=e,this.$image=e.cloneNode(!0),this.$getShadowRoot().appendChild(this.$image),this.$onSourceImageLoad=this.$handleSourceImageLoad.bind(this),this.$onSourceImageTransform=this.$handleSourceImageTransform.bind(this),S(e.$image,L,this.$onSourceImageLoad),S(e,$t,this.$onSourceImageTransform))}this.$render()}}disconnectedCallback(){const{$selection:t,$sourceImage:s}=this;t&&this.$onSelectionChange&&(v(t,M,this.$onSelectionChange),this.$onSelectionChange=null),s&&this.$onSourceImageLoad&&(v(s.$image,L,this.$onSourceImageLoad),this.$onSourceImageLoad=null),s&&this.$onSourceImageTransform&&(v(s,$t,this.$onSourceImageTransform),this.$onSourceImageTransform=null),super.disconnectedCallback()}$handleSelectionChange(t){this.$render(t.detail)}$handleSourceImageLoad(){const{$image:t,$sourceImage:s}=this,e=t.getAttribute("src"),i=s.getAttribute("src");i&&i!==e&&(t.setAttribute("src",i),t.$ready(()=>{setTimeout(()=>{this.$render()},50)}))}$handleSourceImageTransform(t){this.$render(void 0,t.detail.matrix)}$render(t,s){const{$canvas:e,$selection:i}=this;!t&&!i.hidden&&(t=i),(!t||t.x===0&&t.y===0&&t.width===0&&t.height===0)&&(t={x:0,y:0,width:e.offsetWidth,height:e.offsetHeight});const{x:n,y:r,width:a,height:c}=t,h={},{clientWidth:o,clientHeight:u}=this;let f=o,g=u,d=NaN;switch(this.resize){case De:d=1,f=a,g=c,h.width=a,h.height=c;break;case We:d=c>0?u/c:0,f=a*d,h.width=f;break;case te:d=a>0?o/a:0,g=c*d,h.height=g;break;case Le:default:o>0?d=a>0?o/a:0:u>0&&(d=c>0?u/c:0)}this.$scale=d,this.$setStyles(h),this.$sourceImage&&this.$transformImageByOffset(s??this.$sourceImage.$getTransform(),-n,-r)}$transformImageByOffset(t,s,e){const{$image:i,$scale:n,$sourceImage:r}=this;if(r&&i&&n>=0){const[a,c,h,o,u,f]=t,g=(s*o-h*e)/(a*o-h*c),d=(e*a-c*s)/(a*o-h*c),y=a*g+h*d+u,C=c*g+o*d+f;i.$ready(m=>{this.$setStyles.call(i,{width:m.naturalWidth*n,height:m.naturalHeight*n})}),i.$setTransform(a,c,h,o,y*n,C*n)}}};ct.$name=ue,ct.$version="__VERSION__";let St=ct;const Xe='<cropper-canvas background><cropper-image rotatable scalable skewable translatable></cropper-image><cropper-shade hidden></cropper-shade><cropper-handle action="select" plain></cropper-handle><cropper-selection initial-coverage="0.5" movable resizable><cropper-grid role="grid" bordered covered></cropper-grid><cropper-crosshair centered></cropper-crosshair><cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle><cropper-handle action="n-resize"></cropper-handle><cropper-handle action="e-resize"></cropper-handle><cropper-handle action="s-resize"></cropper-handle><cropper-handle action="w-resize"></cropper-handle><cropper-handle action="ne-resize"></cropper-handle><cropper-handle action="nw-resize"></cropper-handle><cropper-handle action="se-resize"></cropper-handle><cropper-handle action="sw-resize"></cropper-handle></cropper-selection></cropper-canvas>',Ye=/^img|canvas$/,He=/<(\/?(?:script|style)[^>]*)>/gi,ee={template:Xe};ft.$define();vt.$define();Et.$define();pt.$define();gt.$define();bt.$define();mt.$define();St.$define();const Tt=class Tt{constructor(t,s){if(this.options=ee,V(t)&&(t=document.querySelector(t)),!F(t)||!Ye.test(t.localName))throw new Error("The first argument is required and must be an <img> or <canvas> element.");this.element=t,s={...ee,...s},this.options=s;const{ownerDocument:e}=t;let{container:i}=s;if(i&&(V(i)&&(i=e.querySelector(i)),!F(i)))throw new Error("The `container` option must be an element or a valid selector.");F(i)||(t.parentElement?i=t.parentElement:i=e.body),this.container=i;const n=t.localName;let r="";n==="img"?{src:r}=t:n==="canvas"&&window.HTMLCanvasElement&&(r=t.toDataURL());const{template:a}=s;if(a&&V(a)){const c=document.createElement("template"),h=document.createDocumentFragment();c.innerHTML=a.replace(He,"&lt;$1&gt;"),h.appendChild(c.content),Array.from(h.querySelectorAll(X)).forEach(o=>{o.setAttribute("src",r),o.setAttribute("alt",t.alt||"The image to crop")}),t.parentElement?(t.style.display="none",i.insertBefore(h,t.nextSibling)):i.appendChild(h)}}getCropperCanvas(){return this.container.querySelector(U)}getCropperImage(){return this.container.querySelector(X)}getCropperSelection(){return this.container.querySelector(I)}getCropperSelections(){return this.container.querySelectorAll(I)}};Tt.version="__VERSION__";let se=Tt;export{ie as ACTION_MOVE,P as ACTION_NONE,Ot as ACTION_RESIZE_EAST,kt as ACTION_RESIZE_NORTH,j as ACTION_RESIZE_NORTHEAST,B as ACTION_RESIZE_NORTHWEST,Nt as ACTION_RESIZE_SOUTH,q as ACTION_RESIZE_SOUTHEAST,Z as ACTION_RESIZE_SOUTHWEST,Rt as ACTION_RESIZE_WEST,ut as ACTION_ROTATE,Y as ACTION_SCALE,Q as ACTION_SELECT,tt as ACTION_TRANSFORM,$e as ATTRIBUTE_ACTION,U as CROPPER_CANVAS,he as CROPPER_CROSSHAIR,ce as CROPPER_GIRD,le as CROPPER_HANDLE,X as CROPPER_IMAGE,I as CROPPER_SELECTION,de as CROPPER_SHADE,ue as CROPPER_VIEWER,ft as CropperCanvas,vt as CropperCrosshair,_ as CropperElement,Et as CropperGrid,pt as CropperHandle,gt as CropperImage,bt as CropperSelection,mt as CropperShade,St as CropperViewer,Xe as DEFAULT_TEMPLATE,H as EVENT_ACTION,D as EVENT_ACTION_END,pe as EVENT_ACTION_MOVE,W as EVENT_ACTION_START,M as EVENT_CHANGE,Pt as EVENT_ERROR,Mt as EVENT_KEYDOWN,L as EVENT_LOAD,xt as EVENT_POINTER_DOWN,It as EVENT_POINTER_MOVE,_t as EVENT_POINTER_UP,Ue as EVENT_RESIZE,fe as EVENT_TOUCH_END,ge as EVENT_TOUCH_MOVE,me as EVENT_TOUCH_START,$t as EVENT_TRANSFORM,zt as EVENT_WHEEL,wt as HAS_POINTER_EVENT,lt as IS_BROWSER,Ct as IS_TOUCH_DEVICE,z as NAMESPACE,x as WINDOW,se as default,we as emit,J as getAdjustedSizes,Yt as getOffset,F as isElement,yt as isFunction,ne as isNaN,$ as isNumber,ae as isObject,et as isPlainObject,T as isPositiveNumber,V as isString,be as isUndefined,re as multiplyMatrices,ye as nextTick,v as off,S as on,Lt as once,dt as toAngleInRadian,Wt as toCamelCase,Dt as toKebabCase};
