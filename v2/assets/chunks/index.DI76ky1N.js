const lt=typeof window<"u"&&typeof window.document<"u",I=lt?window:{},wt=lt?"ontouchstart"in I.document.documentElement:!1,Ct=lt?"PointerEvent"in I:!1,M="cropper",U=`${M}-canvas`,he=`${M}-crosshair`,ce=`${M}-grid`,le=`${M}-handle`,X=`${M}-image`,D=`${M}-selection`,de=`${M}-shade`,ue=`${M}-viewer`,Q="select",ie="move",Y="scale",ut="rotate",tt="transform",x="none",kt="n-resize",Nt="e-resize",Ot="s-resize",Rt="w-resize",B="ne-resize",j="nw-resize",q="se-resize",Z="sw-resize",$e="action",fe=wt?"touchend touchcancel":"mouseup",ge=wt?"touchmove":"mousemove",me=wt?"touchstart":"mousedown",It=Ct?"pointerdown":me,_t=Ct?"pointermove":ge,xt=Ct?"pointerup pointercancel":fe,Pt="error",Mt="keydown",L="load",Ue="resize",Dt="wheel",H="action",z="actionend",pe="actionmove",W="actionstart",P="change",$t="transform";function G(l){return typeof l=="string"}const ne=Number.isNaN||I.isNaN;function $(l){return typeof l=="number"&&!ne(l)}function T(l){return $(l)&&l>0&&l<1/0}function be(l){return typeof l>"u"}function ae(l){return typeof l=="object"&&l!==null}const{hasOwnProperty:Ee}=Object.prototype;function et(l){if(!ae(l))return!1;try{const{constructor:t}=l,{prototype:s}=t;return t&&s&&Ee.call(s,"isPrototypeOf")}catch{return!1}}function yt(l){return typeof l=="function"}function F(l){return typeof l=="object"&&l!==null&&l.nodeType===1}const ve=/([a-z\d])([A-Z])/g;function zt(l){return String(l).replace(ve,"$1-$2").toLowerCase()}const Se=/-[A-z\d]/g;function Wt(l){return l.replace(Se,t=>t.slice(1).toUpperCase())}const oe=/\s\s*/;function v(l,t,s,e){t.trim().split(oe).forEach(i=>{l.removeEventListener(i,s,e)})}function S(l,t,s,e){t.trim().split(oe).forEach(i=>{l.addEventListener(i,s,e)})}function Lt(l,t,s,e){S(l,t,s,{...e,once:!0})}const we={bubbles:!0,cancelable:!0,composed:!0};function Ce(l,t,s,e){return l.dispatchEvent(new CustomEvent(t,{...we,detail:s,...e}))}const Xt=Promise.resolve();function ye(l,t){return t?Xt.then(l?t.bind(l):t):Xt}function Yt(l){const{documentElement:t}=l.ownerDocument,s=l.getBoundingClientRect();return{left:s.left+(I.pageXOffset-t.clientLeft),top:s.top+(I.pageYOffset-t.clientTop)}}const Ae=/deg|g?rad|turn$/i;function dt(l){const t=parseFloat(l)||0;if(t!==0){const[s="rad"]=String(l).match(Ae)||[];switch(s.toLowerCase()){case"deg":return t/360*(Math.PI*2);case"grad":return t/400*(Math.PI*2);case"turn":return t*(Math.PI*2)}}return t}const Ht="contain",Te="cover";function J(l,t=Ht){const{aspectRatio:s}=l;let{width:e,height:i}=l;const n=T(e),h=T(i);if(n&&h){const a=i*s;t===Ht&&a>e||t===Te&&a<e?i=e/s:e=i*s}else n?i=e/s:h&&(e=i*s);return{width:e,height:i}}function re(l,...t){if(t.length===0)return l;const[s,e,i,n,h,a]=l,[c,r,o,u,f,g]=t[0];return l=[s*c+i*r,e*c+n*r,s*o+i*u,e*o+n*u,s*f+i*g+h,e*f+n*g+a],re(l,...t.slice(1))}const ke=`
:host([hidden]) {
  display: none !important;
}
`,Ne=/left|top|width|height/i,Ut="open",K=new WeakMap,V=new WeakMap,Bt=new Map,jt=I.document&&Array.isArray(I.document.adoptedStyleSheets)&&"replaceSync"in I.CSSStyleSheet.prototype,At=class At extends HTMLElement{constructor(){var s,e;super(),this.shadowRootMode=Ut,this.slottable=!0;const t=(e=(s=Object.getPrototypeOf(this))==null?void 0:s.constructor)==null?void 0:e.$name;t&&Bt.set(t,this.tagName.toLowerCase())}get $sharedStyle(){return`${this.themeColor?`:host{--theme-color: ${this.themeColor};}`:""}${ke}`}static get observedAttributes(){return["shadow-root-mode","slottable","theme-color"]}attributeChangedCallback(t,s,e){if(Object.is(e,s))return;const i=Wt(t),n=this[i];let h=e;switch(typeof n){case"boolean":h=e!==null&&e!=="false";break;case"number":h=Number(e);break}switch(this[i]=h,t){case"theme-color":{const a=V.get(this),c=this.$sharedStyle;a&&c&&(jt?a.replaceSync(c):a.textContent=c);break}}}$propertyChangedCallback(t,s,e){if(!Object.is(e,s))switch(t=zt(t),typeof e){case"boolean":e===!0?this.hasAttribute(t)||this.setAttribute(t,""):this.removeAttribute(t);break;case"number":ne(e)?e="":e=String(e);default:e?this.getAttribute(t)!==e&&this.setAttribute(t,e):this.removeAttribute(t)}}connectedCallback(){Object.getPrototypeOf(this).constructor.observedAttributes.forEach(s=>{const e=Wt(s);let i=this[e];be(i)||this.$propertyChangedCallback(e,void 0,i),Object.defineProperty(this,e,{enumerable:!0,configurable:!0,get(){return i},set(n){const h=i;i=n,this.$propertyChangedCallback(e,h,n)}})});const t=this.attachShadow({mode:this.shadowRootMode||Ut});if(this.shadowRoot||K.set(this,t),V.set(this,this.$addStyles(this.$sharedStyle)),this.$style&&this.$addStyles(this.$style),this.$template){const s=document.createElement("template");s.innerHTML=this.$template,t.appendChild(s.content)}if(this.slottable){const s=document.createElement("slot");t.appendChild(s)}}disconnectedCallback(){V.has(this)&&V.delete(this),K.has(this)&&K.delete(this)}$getTagNameOf(t){return Bt.get(t)??t}$setStyles(t){return Object.keys(t).forEach(s=>{let e=t[s];$(e)&&(e!==0&&Ne.test(s)?e=`${e}px`:e=String(e)),this.style[s]=e}),this}$getShadowRoot(){return this.shadowRoot||K.get(this)}$addStyles(t){let s;const e=this.$getShadowRoot();return jt?(s=new CSSStyleSheet,s.replaceSync(t),e.adoptedStyleSheets=e.adoptedStyleSheets.concat(s)):(s=document.createElement("style"),s.textContent=t,e.appendChild(s)),s}$emit(t,s,e){return Ce(this,t,s,e)}$nextTick(t){return ye(this,t)}static $define(t,s){ae(t)&&(s=t,t=""),t||(t=this.$name||this.name),t=zt(t),lt&&I.customElements&&!I.customElements.get(t)&&customElements.define(t,this,s)}};At.$version="__VERSION__";let _=At;const Oe=`
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
`,st=class st extends _{constructor(){super(...arguments),this.$onPointerDown=null,this.$onPointerMove=null,this.$onPointerUp=null,this.$onWheel=null,this.$wheeling=!1,this.$pointers=new Map,this.$style=Oe,this.$action=x,this.background=!1,this.disabled=!1,this.scaleStep=.1,this.themeColor="#39f"}static get observedAttributes(){return super.observedAttributes.concat(["background","disabled","scale-step"])}connectedCallback(){super.connectedCallback(),this.disabled||this.$bind()}disconnectedCallback(){this.disabled||this.$unbind(),super.disconnectedCallback()}$propertyChangedCallback(t,s,e){if(!Object.is(e,s))switch(super.$propertyChangedCallback(t,s,e),t){case"disabled":e?this.$unbind():this.$bind();break}}$bind(){this.$onPointerDown||(this.$onPointerDown=this.$handlePointerDown.bind(this),S(this,It,this.$onPointerDown)),this.$onPointerMove||(this.$onPointerMove=this.$handlePointerMove.bind(this),S(this.ownerDocument,_t,this.$onPointerMove)),this.$onPointerUp||(this.$onPointerUp=this.$handlePointerUp.bind(this),S(this.ownerDocument,xt,this.$onPointerUp)),this.$onWheel||(this.$onWheel=this.$handleWheel.bind(this),S(this,Dt,this.$onWheel,{passive:!1,capture:!0}))}$unbind(){this.$onPointerDown&&(v(this,It,this.$onPointerDown),this.$onPointerDown=null),this.$onPointerMove&&(v(this.ownerDocument,_t,this.$onPointerMove),this.$onPointerMove=null),this.$onPointerUp&&(v(this.ownerDocument,xt,this.$onPointerUp),this.$onPointerUp=null),this.$onWheel&&(v(this,Dt,this.$onWheel,{capture:!0}),this.$onWheel=null)}$handlePointerDown(t){const{buttons:s,button:e,type:i}=t;if(this.disabled||(i==="pointerdown"&&t.pointerType==="mouse"||i==="mousedown")&&($(s)&&s!==1||$(e)&&e!==0||t.ctrlKey))return;const{$pointers:n}=this;let h="";if(t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:a,pageX:c,pageY:r})=>{n.set(a,{startX:c,startY:r,endX:c,endY:r})});else{const{pointerId:a=0,pageX:c,pageY:r}=t;n.set(a,{startX:c,startY:r,endX:c,endY:r})}n.size>1?h=tt:F(t.target)&&(h=t.target.action||t.target.getAttribute($e)||""),this.$emit(W,{action:h,relatedEvent:t})!==!1&&(t.preventDefault(),this.$action=h,this.style.willChange="transform")}$handlePointerMove(t){const{$action:s,$pointers:e}=this;if(this.disabled||s===x||e.size===0||this.$emit(pe,{action:s,relatedEvent:t})===!1)return;if(t.preventDefault(),t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:n,pageX:h,pageY:a})=>{const c=e.get(n);c&&Object.assign(c,{endX:h,endY:a})});else{const{pointerId:n=0,pageX:h,pageY:a}=t,c=e.get(n);c&&Object.assign(c,{endX:h,endY:a})}const i={action:s,relatedEvent:t};if(s===tt){const n=new Map(e);let h=0,a=0,c=0,r=0,o=t.pageX,u=t.pageY;e.forEach((d,y)=>{n.delete(y),n.forEach(w=>{let m=w.startX-d.startX,E=w.startY-d.startY,p=w.endX-d.endX,b=w.endY-d.endY,C=0,A=0,k=0,N=0;if(m===0?E<0?k=Math.PI*2:E>0&&(k=Math.PI):m>0?k=Math.PI/2+Math.atan(E/m):m<0&&(k=Math.PI*1.5+Math.atan(E/m)),p===0?b<0?N=Math.PI*2:b>0&&(N=Math.PI):p>0?N=Math.PI/2+Math.atan(b/p):p<0&&(N=Math.PI*1.5+Math.atan(b/p)),N>0||k>0){const O=N-k,R=Math.abs(O);R>h&&(h=R,c=O,o=(d.startX+w.startX)/2,u=(d.startY+w.startY)/2)}if(m=Math.abs(m),E=Math.abs(E),p=Math.abs(p),b=Math.abs(b),m>0&&E>0?C=Math.sqrt(m*m+E*E):m>0?C=m:E>0&&(C=E),p>0&&b>0?A=Math.sqrt(p*p+b*b):p>0?A=p:b>0&&(A=b),C>0&&A>0){const O=(A-C)/C,R=Math.abs(O);R>a&&(a=R,r=O,o=(d.startX+w.startX)/2,u=(d.startY+w.startY)/2)}})});const f=h>0,g=a>0;f&&g?(i.rotate=c,i.scale=r,i.centerX=o,i.centerY=u):f?(i.action=ut,i.rotate=c,i.centerX=o,i.centerY=u):g?(i.action=Y,i.scale=r,i.centerX=o,i.centerY=u):i.action=x}else{const[n]=Array.from(e.values());Object.assign(i,n)}e.forEach(n=>{n.startX=n.endX,n.startY=n.endY}),i.action!==x&&this.$emit(H,i,{cancelable:!1})}$handlePointerUp(t){const{$action:s,$pointers:e}=this;if(!(this.disabled||s===x)&&this.$emit(z,{action:s,relatedEvent:t})!==!1){if(t.preventDefault(),t.changedTouches)Array.from(t.changedTouches).forEach(({identifier:i})=>{e.delete(i)});else{const{pointerId:i=0}=t;e.delete(i)}e.size===0&&(this.style.willChange="",this.$action=x)}}$handleWheel(t){if(this.disabled||(t.preventDefault(),this.$wheeling))return;this.$wheeling=!0,setTimeout(()=>{this.$wheeling=!1},50);const e=(t.deltaY>0?-1:1)*this.scaleStep;this.$emit(H,{action:Y,scale:e,relatedEvent:t},{cancelable:!1})}$setAction(t){return G(t)&&(this.$action=t),this}$toCanvas(t){return new Promise((s,e)=>{if(!this.isConnected){e(new Error("The current element is not connected to the DOM."));return}const i=document.createElement("canvas");let n=this.offsetWidth,h=this.offsetHeight,a=1;et(t)&&(T(t.width)||T(t.height))&&({width:n,height:h}=J({aspectRatio:n/h,width:t.width,height:t.height}),a=n/this.offsetWidth),i.width=n,i.height=h;const c=this.querySelector(this.$getTagNameOf(X));if(!c){s(i);return}c.$ready().then(r=>{const o=i.getContext("2d");if(o){const[u,f,g,d,y,w]=c.$getTransform();let m=y,E=w,p=r.naturalWidth,b=r.naturalHeight;a!==1&&(m*=a,E*=a,p*=a,b*=a);const C=p/2,A=b/2;o.fillStyle="transparent",o.fillRect(0,0,n,h),et(t)&&yt(t.beforeDraw)&&t.beforeDraw.call(this,o,i),o.save(),o.translate(C,A),o.transform(u,f,g,d,m,E),o.translate(-C,-A),o.drawImage(r,0,0,p,b),o.restore()}s(i)}).catch(e)})}};st.$name=U,st.$version="__VERSION__";let ft=st;const Re=`
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
`,qt=new WeakMap,Zt=["alt","crossorigin","decoding","importance","loading","referrerpolicy","sizes","src","srcset"],it=class it extends _{constructor(){super(...arguments),this.$matrix=[1,0,0,1,0,0],this.$onLoad=null,this.$onCanvasAction=null,this.$onCanvasActionEnd=null,this.$onCanvasActionStart=null,this.$actionStartTarget=null,this.$style=Re,this.$image=new Image,this.rotatable=!0,this.scalable=!0,this.skewable=!0,this.slottable=!1,this.translatable=!0}set $canvas(t){qt.set(this,t)}get $canvas(){return qt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(Zt,["rotatable","scalable","skewable","translatable"])}attributeChangedCallback(t,s,e){Object.is(e,s)||(super.attributeChangedCallback(t,s,e),Zt.includes(t)&&this.$image.setAttribute(t,e))}connectedCallback(){super.connectedCallback();const{$image:t}=this,s=this.closest(this.$getTagNameOf(U));s&&(this.$canvas=s,this.$setStyles({display:"block",position:"absolute"}),this.$onCanvasActionStart=e=>{var i,n;this.$actionStartTarget=(n=(i=e.detail)==null?void 0:i.relatedEvent)==null?void 0:n.target},this.$onCanvasActionEnd=()=>{this.$actionStartTarget=null},this.$onCanvasAction=this.$handleAction.bind(this),S(s,W,this.$onCanvasActionStart),S(s,z,this.$onCanvasActionEnd),S(s,H,this.$onCanvasAction)),this.$onLoad=this.$handleLoad.bind(this),S(t,L,this.$onLoad),this.$getShadowRoot().appendChild(t)}disconnectedCallback(){const{$image:t,$canvas:s}=this;s&&(this.$onCanvasActionStart&&(v(s,W,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(v(s,z,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasAction&&(v(s,H,this.$onCanvasAction),this.$onCanvasAction=null)),t&&this.$onLoad&&(v(t,L,this.$onLoad),this.$onLoad=null),this.$getShadowRoot().removeChild(t),super.disconnectedCallback()}$handleLoad(){const{$image:t}=this;this.$setStyles({width:t.naturalWidth,height:t.naturalHeight}),this.$canvas&&this.$center("cover")}$handleAction(t){if(this.hidden||!(this.rotatable||this.scalable||this.translatable))return;const{$canvas:s}=this,{detail:e}=t;if(e){const{relatedEvent:i}=e;let{action:n}=e;switch(n===tt&&(!this.rotatable||!this.scalable)&&(this.rotatable?n=ut:this.scalable?n=Y:n=x),n){case ie:if(this.translatable){const h=this.$getTagNameOf(D);let a=s.querySelector(h);a&&a.multiple&&!a.active&&(a=s.querySelector(`${h}[active]`)),(!a||a.hidden||!a.movable||!(this.$actionStartTarget&&a.contains(this.$actionStartTarget)))&&this.$move(e.endX-e.startX,e.endY-e.startY)}break;case ut:if(this.rotatable)if(i){const{x:h,y:a}=this.getBoundingClientRect();this.$rotate(e.rotate,i.clientX-h,i.clientY-a)}else this.$rotate(e.rotate);break;case Y:if(this.scalable)if(i){const{x:h,y:a}=this.getBoundingClientRect();this.$zoom(e.scale,i.clientX-h,i.clientY-a)}else this.$zoom(e.scale);break;case tt:if(this.rotatable&&this.scalable){const{rotate:h}=e;let{scale:a}=e;a<0?a=1/(1-a):a+=1;const c=Math.cos(h),r=Math.sin(h),[o,u,f,g]=[c*a,r*a,-r*a,c*a];if(i){const d=this.getBoundingClientRect(),y=i.clientX-d.x,w=i.clientY-d.y,[m,E,p,b]=this.$matrix,C=d.width/2,A=d.height/2,k=y-C,N=w-A,O=(k*b-p*N)/(m*b-p*E),R=(N*m-E*k)/(m*b-p*E);this.$transform(o,u,f,g,O*(1-o)+R*f,R*(1-g)+O*u)}else this.$transform(o,u,f,g,0,0)}break}}}$ready(t){const{$image:s}=this,e=new Promise((i,n)=>{const h=new Error("Failed to load the image source");if(s.complete)s.naturalWidth>0&&s.naturalHeight>0?i(s):n(h);else{const a=()=>{v(s,Pt,c),i(s)},c=()=>{v(s,L,a),n(h)};Lt(s,L,a),Lt(s,Pt,c)}});return yt(t)&&e.then(i=>(t(i),i)),e}$center(t){const{parentElement:s}=this;if(!s)return this;const e=s.getBoundingClientRect(),i=e.width,n=e.height,{x:h,y:a,width:c,height:r}=this.getBoundingClientRect(),o=h+c/2,u=a+r/2,f=e.x+i/2,g=e.y+n/2;if(this.$move(f-o,g-u),t&&(c!==i||r!==n)){const d=i/c,y=n/r;switch(t){case"cover":this.$scale(Math.max(d,y));break;case"contain":this.$scale(Math.min(d,y));break}}return this}$move(t,s=t){if(this.translatable&&$(t)&&$(s)){const[e,i,n,h]=this.$matrix,a=(t*h-n*s)/(e*h-n*i),c=(s*e-i*t)/(e*h-n*i);this.$translate(a,c)}return this}$moveTo(t,s=t){if(this.translatable&&$(t)&&$(s)){const[e,i,n,h]=this.$matrix,a=(t*h-n*s)/(e*h-n*i),c=(s*e-i*t)/(e*h-n*i);this.$setTransform(e,i,n,h,a,c)}return this}$rotate(t,s,e){if(this.rotatable){const i=dt(t),n=Math.cos(i),h=Math.sin(i),[a,c,r,o]=[n,h,-h,n];if($(s)&&$(e)){const[u,f,g,d]=this.$matrix,{width:y,height:w}=this.getBoundingClientRect(),m=y/2,E=w/2,p=s-m,b=e-E,C=(p*d-g*b)/(u*d-g*f),A=(b*u-f*p)/(u*d-g*f);this.$transform(a,c,r,o,C*(1-a)-A*r,A*(1-o)-C*c)}else this.$transform(a,c,r,o,0,0)}return this}$zoom(t,s,e){if(!this.scalable||t===0)return this;if(t<0?t=1/(1-t):t+=1,$(s)&&$(e)){const[i,n,h,a]=this.$matrix,{width:c,height:r}=this.getBoundingClientRect(),o=c/2,u=r/2,f=s-o,g=e-u,d=(f*a-h*g)/(i*a-h*n),y=(g*i-n*f)/(i*a-h*n);this.$transform(t,0,0,t,d*(1-t),y*(1-t))}else this.$scale(t);return this}$scale(t,s=t){return this.scalable&&this.$transform(t,0,0,s,0,0),this}$skew(t,s=0){if(this.skewable){const e=dt(t),i=dt(s);this.$transform(1,Math.tan(i),Math.tan(e),1,0,0)}return this}$translate(t,s=t){return this.translatable&&$(t)&&$(s)&&this.$transform(1,0,0,1,t,s),this}$transform(t,s,e,i,n,h){return $(t)&&$(s)&&$(e)&&$(i)&&$(n)&&$(h)?this.$setTransform(re(this.$matrix,[t,s,e,i,n,h])):this}$setTransform(t,s,e,i,n,h){if((this.rotatable||this.scalable||this.skewable||this.translatable)&&(Array.isArray(t)&&([t,s,e,i,n,h]=t),$(t)&&$(s)&&$(e)&&$(i)&&$(n)&&$(h))){const a=[t,s,e,i,n,h];if(this.$emit($t,{matrix:a,oldMatrix:this.$matrix})===!1)return this;this.$matrix=a,this.style.transform=`matrix(${a.join(", ")})`}return this}$getTransform(){return this.$matrix.slice()}$resetTransform(){return this.$setTransform([1,0,0,1,0,0])}};it.$name=X,it.$version="__VERSION__";let gt=it;const Ie=`
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
`,Ft=new WeakMap,nt=class nt extends _{constructor(){super(...arguments),this.$onCanvasChange=null,this.$onCanvasActionEnd=null,this.$onCanvasActionStart=null,this.$style=Ie,this.x=0,this.y=0,this.width=0,this.height=0,this.slottable=!1,this.themeColor="rgba(0, 0, 0, 0.65)"}set $canvas(t){Ft.set(this,t)}get $canvas(){return Ft.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["height","width","x","y"])}connectedCallback(){super.connectedCallback();const t=this.closest(this.$getTagNameOf(U));if(t){this.$canvas=t,this.style.position="absolute";const s=t.querySelector(this.$getTagNameOf(D));s&&(this.$onCanvasActionStart=e=>{s.hidden&&e.detail.action===Q&&(this.hidden=!1)},this.$onCanvasActionEnd=e=>{s.hidden&&e.detail.action===Q&&(this.hidden=!0)},this.$onCanvasChange=e=>{const{x:i,y:n,width:h,height:a}=e.detail;this.$change(i,n,h,a),(s.hidden||i===0&&n===0&&h===0&&a===0)&&(this.hidden=!0)},S(t,W,this.$onCanvasActionStart),S(t,z,this.$onCanvasActionEnd),S(t,P,this.$onCanvasChange))}this.$render()}disconnectedCallback(){const{$canvas:t}=this;t&&(this.$onCanvasActionStart&&(v(t,W,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(v(t,z,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasChange&&(v(t,P,this.$onCanvasChange),this.$onCanvasChange=null)),super.disconnectedCallback()}$change(t,s,e=this.width,i=this.height){return!$(t)||!$(s)||!$(e)||!$(i)||t===this.x&&s===this.y&&e===this.width&&i===this.height?this:(this.hidden&&(this.hidden=!1),this.x=t,this.y=s,this.width=e,this.height=i,this.$render())}$reset(){return this.$change(0,0,0,0)}$render(){return this.$setStyles({transform:`translate(${this.x}px, ${this.y}px)`,width:this.width,height:this.height,outlineWidth:I.innerWidth})}};nt.$name=de,nt.$version="__VERSION__";let mt=nt;const _e=`
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
`,at=class at extends _{constructor(){super(...arguments),this.$onCanvasCropEnd=null,this.$onCanvasCropStart=null,this.$style=_e,this.action=x,this.plain=!1,this.slottable=!1,this.themeColor="rgba(51, 153, 255, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["action","plain"])}};at.$name=le,at.$version="__VERSION__";let pt=at;const xe=`
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
`,Kt=new WeakMap,ot=class ot extends _{constructor(){super(...arguments),this.$onCanvasAction=null,this.$onCanvasActionStart=null,this.$onCanvasActionEnd=null,this.$onDocumentKeyDown=null,this.$action="",this.$actionStartTarget=null,this.$style=xe,this.$x=0,this.$y=0,this.$width=0,this.$height=0,this.x=0,this.y=0,this.width=0,this.height=0,this.aspectRatio=NaN,this.initialAspectRatio=NaN,this.initialCoverage=NaN,this.active=!1,this.movable=!1,this.resizable=!1,this.zoomable=!1,this.multiple=!1,this.keyboard=!1,this.outlined=!1,this.precise=!1}set $canvas(t){Kt.set(this,t)}get $canvas(){return Kt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["active","aspect-ratio","height","initial-aspect-ratio","initial-coverage","keyboard","movable","multiple","outlined","precise","resizable","width","x","y","zoomable"])}$propertyChangedCallback(t,s,e){if(!Object.is(e,s))switch(super.$propertyChangedCallback(t,s,e),t){case"aspectRatio":T(e)||(this.aspectRatio=NaN);break;case"initialAspectRatio":T(e)||(this.initialAspectRatio=NaN);break;case"initialCoverage":(!T(e)||e>1)&&(this.initialCoverage=NaN);break;case"keyboard":this.$nextTick(()=>{this.$canvas&&(e?this.$onDocumentKeyDown||(this.$onDocumentKeyDown=this.$handleKeyDown.bind(this),S(this.ownerDocument,Mt,this.$onDocumentKeyDown)):this.$onDocumentKeyDown&&(v(this.ownerDocument,Mt,this.$onDocumentKeyDown),this.$onDocumentKeyDown=null))});break;case"multiple":this.$nextTick(()=>{if(this.$canvas){const i=this.$getSelections();e?(i.forEach(n=>{n.active=!1}),this.active=!0,this.$emit(P,{x:this.x,y:this.y,width:this.width,height:this.height})):(this.active=!1,i.slice(1).forEach(n=>{this.$removeSelection(n)}))}});break}}connectedCallback(){super.connectedCallback();const t=this.closest(this.$getTagNameOf(U));if(t){this.$canvas=t,this.$setStyles({position:"absolute",transform:`translate(${this.x}px, ${this.y}px)`}),this.hidden||this.$render();const{initialCoverage:s,parentElement:e}=this;if(T(s)&&e){const i=this.aspectRatio||this.initialAspectRatio,{offsetWidth:n,offsetHeight:h}=e;let a=n*s,c=h*s;T(i)&&({width:a,height:c}=J({aspectRatio:i,width:a,height:c})),this.$change(this.x,this.y,a,c),this.$center(),this.$x=this.x,this.$y=this.y,this.$width=this.width,this.$height=this.height}this.$onCanvasActionStart=this.$handleActionStart.bind(this),this.$onCanvasActionEnd=this.$handleActionEnd.bind(this),this.$onCanvasAction=this.$handleAction.bind(this),S(t,W,this.$onCanvasActionStart),S(t,z,this.$onCanvasActionStart),S(t,H,this.$onCanvasAction)}else this.$render()}disconnectedCallback(){const{$canvas:t}=this;t&&(this.$onCanvasActionStart&&(v(t,W,this.$onCanvasActionStart),this.$onCanvasActionStart=null),this.$onCanvasActionEnd&&(v(t,z,this.$onCanvasActionEnd),this.$onCanvasActionEnd=null),this.$onCanvasAction&&(v(t,H,this.$onCanvasAction),this.$onCanvasAction=null)),super.disconnectedCallback()}$getSelections(){let t=[];return this.parentElement&&(t=Array.from(this.parentElement.querySelectorAll(this.$getTagNameOf(D)))),t}$createSelection(){const t=this.cloneNode(!0);return this.hasAttribute("id")&&t.removeAttribute("id"),this.active=!1,this.parentElement&&this.parentElement.insertBefore(t,this.nextSibling),t}$removeSelection(t=this){if(this.parentElement){const s=this.$getSelections();if(s.length>1){const e=s.indexOf(t),i=s[e+1]||s[e-1];i&&(t.active=!1,this.parentElement.removeChild(t),i.active=!0,i.$emit(P,{x:i.x,y:i.y,width:i.width,height:i.height}))}else this.$clear()}}$handleActionStart(t){var e,i;const s=(i=(e=t.detail)==null?void 0:e.relatedEvent)==null?void 0:i.target;this.$action="",this.$actionStartTarget=s,!this.hidden&&this.multiple&&!this.active&&s===this&&this.parentElement&&(this.$getSelections().forEach(n=>{n.active=!1}),this.active=!0,this.$emit(P,{x:this.x,y:this.y,width:this.width,height:this.height}))}$handleAction(t){const{currentTarget:s,detail:e}=t;if(s&&e){const{relatedEvent:i}=e;let{action:n}=e;if(!n&&this.multiple&&(n=this.$action||(i==null?void 0:i.target.action),this.$action=n),!n||this.hidden&&n!==Q||this.multiple&&!this.active&&n!==Y)return;const h=e.endX-e.startX,a=e.endY-e.startY,{width:c,height:r}=this;let{aspectRatio:o}=this;switch(!T(o)&&t.shiftKey&&(o=T(c)&&T(r)?c/r:1),n){case Q:{const{$canvas:u}=this,f=Yt(s);(this.multiple&&!this.hidden?this.$createSelection():this).$change(e.startX-f.left,e.startY-f.top,h,a,o),n=q,h<0?a>0?n=Z:a<0&&(n=j):h>0&&a<0&&(n=B),u&&(u.$action=n);break}case ie:this.movable&&this.$actionStartTarget&&this.contains(this.$actionStartTarget)&&this.$move(h,a);break;case Y:if(i&&this.zoomable){const u=Yt(s);this.$zoom(e.scale,i.pageX-u.left,i.pageY-u.top)}break;default:this.$resize(n,h,a,o)}}}$handleActionEnd(){this.$action="",this.$actionStartTarget=null}$handleKeyDown(t){if(!(this.hidden||!this.keyboard||this.multiple&&!this.active||t.defaultPrevented))switch(t.key){case"Backspace":t.metaKey&&(t.preventDefault(),this.$removeSelection());break;case"Delete":t.preventDefault(),this.$removeSelection();break;case"ArrowLeft":t.preventDefault(),this.$move(-1,0);break;case"ArrowRight":t.preventDefault(),this.$move(1,0);break;case"ArrowUp":t.preventDefault(),this.$move(0,-1);break;case"ArrowDown":t.preventDefault(),this.$move(0,1);break;case"+":t.preventDefault(),this.$zoom(.1);break;case"-":t.preventDefault(),this.$zoom(-.1);break}}$center(){const{parentElement:t}=this;if(!t)return this;const s=(t.offsetWidth-this.width)/2,e=(t.offsetHeight-this.height)/2;return this.$change(s,e)}$move(t,s=t){return this.$moveTo(this.x+t,this.y+s)}$moveTo(t,s=t){return this.movable?this.$change(t,s):this}$resize(t,s=0,e=0,i=this.aspectRatio){if(!this.resizable)return this;const n=T(i),{$canvas:h}=this;let{x:a,y:c,width:r,height:o}=this;switch(t){case kt:c+=e,o-=e,o<0&&(t=Ot,o=-o,c-=o),n&&(s=e*i,a+=s/2,r-=s,r<0&&(r=-r,a-=r));break;case Nt:r+=s,r<0&&(t=Rt,r=-r,a-=r),n&&(e=s/i,c-=e/2,o+=e,o<0&&(o=-o,c-=o));break;case Ot:o+=e,o<0&&(t=kt,o=-o,c-=o),n&&(s=e*i,a-=s/2,r+=s,r<0&&(r=-r,a-=r));break;case Rt:a+=s,r-=s,r<0&&(t=Nt,r=-r,a-=r),n&&(e=s/i,c+=e/2,o-=e,o<0&&(o=-o,c-=o));break;case B:n&&(e=-s/i),c+=e,o-=e,r+=s,r<0&&o<0?(t=Z,r=-r,o=-o,a-=r,c-=o):r<0?(t=j,r=-r,a-=r):o<0&&(t=q,o=-o,c-=o);break;case j:n&&(e=s/i),a+=s,c+=e,r-=s,o-=e,r<0&&o<0?(t=q,r=-r,o=-o,a-=r,c-=o):r<0?(t=B,r=-r,a-=r):o<0&&(t=Z,o=-o,c-=o);break;case q:n&&(e=s/i),r+=s,o+=e,r<0&&o<0?(t=j,r=-r,o=-o,a-=r,c-=o):r<0?(t=Z,r=-r,a-=r):o<0&&(t=B,o=-o,c-=o);break;case Z:n&&(e=-s/i),a+=s,r-=s,o+=e,r<0&&o<0?(t=B,r=-r,o=-o,a-=r,c-=o):r<0?(t=q,r=-r,a-=r):o<0&&(t=j,o=-o,c-=o);break}return h&&h.$setAction(t),this.$change(a,c,r,o)}$zoom(t,s,e){if(!this.zoomable||t===0)return this;t<0?t=1/(1-t):t+=1;const{width:i,height:n}=this,h=i*t,a=n*t;let c=this.x,r=this.y;return $(s)&&$(e)?(c-=(h-i)*((s-this.x)/i),r-=(a-n)*((e-this.y)/n)):(c-=(h-i)/2,r-=(a-n)/2),this.$change(c,r,h,a)}$change(t,s,e=this.width,i=this.height,n=this.aspectRatio){return!$(t)||!$(s)||!$(e)||!$(i)?this:(this.precise||(t=Math.round(t),s=Math.round(s),e=Math.round(e),i=Math.round(i)),t===this.x&&s===this.y&&e===this.width&&i===this.height?this:(this.hidden&&(this.hidden=!1),T(n)&&({width:e,height:i}=J({aspectRatio:n,width:e,height:i},"cover")),this.$emit(P,{x:t,y:s,width:e,height:i})===!1?this:(this.x=t,this.y=s,this.width=e,this.height=i,this.$render())))}$reset(){return this.$change(this.$x,this.$y,this.$width,this.$height)}$clear(){return this.$change(0,0,0,0),this.hidden=!0,this}$render(){return this.$setStyles({transform:`translate(${this.x}px, ${this.y}px)`,width:this.width,height:this.height})}$toCanvas(t){return new Promise((s,e)=>{if(!this.isConnected){e(new Error("The current element is not connected to the DOM."));return}const i=document.createElement("canvas");let{width:n,height:h}=this,a=1;if(et(t)&&(T(t.width)||T(t.height))&&({width:n,height:h}=J({aspectRatio:n/h,width:t.width,height:t.height}),a=n/this.width),i.width=n,i.height=h,!this.$canvas){s(i);return}const c=this.$canvas.querySelector(this.$getTagNameOf(X));if(!c){s(i);return}c.$ready().then(r=>{const o=i.getContext("2d");if(o){const[u,f,g,d,y,w]=c.$getTransform(),m=-this.x,E=-this.y,p=(m*d-g*E)/(u*d-g*f),b=(E*u-f*m)/(u*d-g*f);let C=u*p+g*b+y,A=f*p+d*b+w,k=r.naturalWidth,N=r.naturalHeight;a!==1&&(C*=a,A*=a,k*=a,N*=a);const O=k/2,R=N/2;o.fillStyle="transparent",o.fillRect(0,0,n,h),et(t)&&yt(t.beforeDraw)&&t.beforeDraw.call(this,o,i),o.save(),o.translate(O,R),o.transform(u,f,g,d,C,A),o.translate(-O,-R),o.drawImage(r,0,0,k,N),o.restore()}s(i)}).catch(e)})}};ot.$name=D,ot.$version="__VERSION__";let bt=ot;const Pe=`
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
`,rt=class rt extends _{constructor(){super(...arguments),this.$style=Pe,this.bordered=!1,this.columns=3,this.covered=!1,this.rows=3,this.slottable=!1,this.themeColor="rgba(238, 238, 238, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["bordered","columns","covered","rows"])}$propertyChangedCallback(t,s,e){Object.is(e,s)||(super.$propertyChangedCallback(t,s,e),(t==="rows"||t==="columns")&&this.$render())}connectedCallback(){super.connectedCallback(),this.$render()}$render(){const t=this.$getShadowRoot(),s=document.createDocumentFragment();for(let e=0;e<this.rows;e+=1){const i=document.createElement("span");i.setAttribute("role","row");for(let n=0;n<this.columns;n+=1){const h=document.createElement("span");h.setAttribute("role","gridcell"),i.appendChild(h)}s.appendChild(i)}t&&(t.innerHTML="",t.appendChild(s))}};rt.$name=ce,rt.$version="__VERSION__";let Et=rt;const Me=`
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
`,ht=class ht extends _{constructor(){super(...arguments),this.$style=Me,this.centered=!1,this.slottable=!1,this.themeColor="rgba(238, 238, 238, 0.5)"}static get observedAttributes(){return super.observedAttributes.concat(["centered"])}};ht.$name=he,ht.$version="__VERSION__";let vt=ht;const De=`
:host {
  display: block;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
}
`,Vt=new WeakMap,Gt=new WeakMap,Jt=new WeakMap,Qt=new WeakMap,ze="both",We="horizontal",te="vertical",Le="none",ct=class ct extends _{constructor(){super(...arguments),this.$onSelectionChange=null,this.$onSourceImageLoad=null,this.$onSourceImageTransform=null,this.$scale=1,this.$style=De,this.resize=te,this.selection="",this.slottable=!1}set $image(t){Gt.set(this,t)}get $image(){return Gt.get(this)}set $sourceImage(t){Qt.set(this,t)}get $sourceImage(){return Qt.get(this)}set $canvas(t){Vt.set(this,t)}get $canvas(){return Vt.get(this)}set $selection(t){Jt.set(this,t)}get $selection(){return Jt.get(this)}static get observedAttributes(){return super.observedAttributes.concat(["resize","selection"])}connectedCallback(){super.connectedCallback();let t=null;if(this.selection?t=this.ownerDocument.querySelector(this.selection):t=this.closest(this.$getTagNameOf(D)),F(t)){this.$selection=t,this.$onSelectionChange=this.$handleSelectionChange.bind(this),S(t,P,this.$onSelectionChange);const s=t.closest(this.$getTagNameOf(U));if(s){this.$canvas=s;const e=s.querySelector(this.$getTagNameOf(X));e&&(this.$sourceImage=e,this.$image=e.cloneNode(!0),this.$getShadowRoot().appendChild(this.$image),this.$onSourceImageLoad=this.$handleSourceImageLoad.bind(this),this.$onSourceImageTransform=this.$handleSourceImageTransform.bind(this),S(e.$image,L,this.$onSourceImageLoad),S(e,$t,this.$onSourceImageTransform))}this.$render()}}disconnectedCallback(){const{$selection:t,$sourceImage:s}=this;t&&this.$onSelectionChange&&(v(t,P,this.$onSelectionChange),this.$onSelectionChange=null),s&&this.$onSourceImageLoad&&(v(s.$image,L,this.$onSourceImageLoad),this.$onSourceImageLoad=null),s&&this.$onSourceImageTransform&&(v(s,$t,this.$onSourceImageTransform),this.$onSourceImageTransform=null),super.disconnectedCallback()}$handleSelectionChange(t){this.$render(t.detail)}$handleSourceImageLoad(){const{$image:t,$sourceImage:s}=this,e=t.getAttribute("src"),i=s.getAttribute("src");i&&i!==e&&(t.setAttribute("src",i),t.$ready(()=>{setTimeout(()=>{this.$render()},50)}))}$handleSourceImageTransform(t){this.$render(void 0,t.detail.matrix)}$render(t,s){const{$canvas:e,$selection:i}=this;!t&&!i.hidden&&(t=i),(!t||t.x===0&&t.y===0&&t.width===0&&t.height===0)&&(t={x:0,y:0,width:e.offsetWidth,height:e.offsetHeight});const{x:n,y:h,width:a,height:c}=t,r={},{clientWidth:o,clientHeight:u}=this;let f=o,g=u,d=NaN;switch(this.resize){case ze:d=1,f=a,g=c,r.width=a,r.height=c;break;case We:d=c>0?u/c:0,f=a*d,r.width=f;break;case te:d=a>0?o/a:0,g=c*d,r.height=g;break;case Le:default:o>0?d=a>0?o/a:0:u>0&&(d=c>0?u/c:0)}this.$scale=d,this.$setStyles(r),this.$sourceImage&&this.$transformImageByOffset(s??this.$sourceImage.$getTransform(),-n,-h)}$transformImageByOffset(t,s,e){const{$image:i,$scale:n,$sourceImage:h}=this;if(h&&i&&n>=0){const[a,c,r,o,u,f]=t,g=(s*o-r*e)/(a*o-r*c),d=(e*a-c*s)/(a*o-r*c),y=a*g+r*d+u,w=c*g+o*d+f;i.$ready(m=>{this.$setStyles.call(i,{width:m.naturalWidth*n,height:m.naturalHeight*n})}),i.$setTransform(a,c,r,o,y*n,w*n)}}};ct.$name=ue,ct.$version="__VERSION__";let St=ct;const Xe='<cropper-canvas background><cropper-image></cropper-image><cropper-shade hidden></cropper-shade><cropper-handle action="select" plain></cropper-handle><cropper-selection initial-coverage="0.5" movable resizable zoomable><cropper-grid role="grid" bordered covered></cropper-grid><cropper-crosshair centered></cropper-crosshair><cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle><cropper-handle action="n-resize"></cropper-handle><cropper-handle action="e-resize"></cropper-handle><cropper-handle action="s-resize"></cropper-handle><cropper-handle action="w-resize"></cropper-handle><cropper-handle action="ne-resize"></cropper-handle><cropper-handle action="nw-resize"></cropper-handle><cropper-handle action="se-resize"></cropper-handle><cropper-handle action="sw-resize"></cropper-handle></cropper-selection></cropper-canvas>',Ye=/^img|canvas$/,He=/<(\/?(?:script|style)[^>]*)>/gi,ee={template:Xe};ft.$define();vt.$define();Et.$define();pt.$define();gt.$define();bt.$define();mt.$define();St.$define();const Tt=class Tt{constructor(t,s){if(this.options=ee,G(t)&&(t=document.querySelector(t)),!F(t)||!Ye.test(t.localName))throw new Error("The first argument is required and must be an <img> or <canvas> element.");this.element=t,s={...ee,...s},this.options=s;const{ownerDocument:e}=t;let{container:i}=s;if(i&&(G(i)&&(i=e.querySelector(i)),!F(i)))throw new Error("The `container` option must be an element or a valid selector.");F(i)||(t.parentElement?i=t.parentElement:i=e.body),this.container=i;const n=t.localName;let h="";n==="img"?{src:h}=t:n==="canvas"&&window.HTMLCanvasElement&&(h=t.toDataURL());const{template:a}=s;if(a&&G(a)){const c=document.createElement("template"),r=document.createDocumentFragment();c.innerHTML=a.replace(He,"&lt;$1&gt;"),r.appendChild(c.content),Array.from(r.querySelectorAll(X)).forEach(o=>{o.setAttribute("src",h),o.setAttribute("alt",t.alt||"The image to crop")}),t.parentElement?(t.style.display="none",i.insertBefore(r,t.nextSibling)):i.appendChild(r)}}getCropperCanvas(){return this.container.querySelector(U)}getCropperImage(){return this.container.querySelector(X)}getCropperSelection(){return this.container.querySelector(D)}getCropperSelections(){return this.container.querySelectorAll(D)}};Tt.version="__VERSION__";let se=Tt;export{ie as ACTION_MOVE,x as ACTION_NONE,Nt as ACTION_RESIZE_EAST,kt as ACTION_RESIZE_NORTH,B as ACTION_RESIZE_NORTHEAST,j as ACTION_RESIZE_NORTHWEST,Ot as ACTION_RESIZE_SOUTH,q as ACTION_RESIZE_SOUTHEAST,Z as ACTION_RESIZE_SOUTHWEST,Rt as ACTION_RESIZE_WEST,ut as ACTION_ROTATE,Y as ACTION_SCALE,Q as ACTION_SELECT,tt as ACTION_TRANSFORM,$e as ATTRIBUTE_ACTION,U as CROPPER_CANVAS,he as CROPPER_CROSSHAIR,ce as CROPPER_GIRD,le as CROPPER_HANDLE,X as CROPPER_IMAGE,D as CROPPER_SELECTION,de as CROPPER_SHADE,ue as CROPPER_VIEWER,ft as CropperCanvas,vt as CropperCrosshair,_ as CropperElement,Et as CropperGrid,pt as CropperHandle,gt as CropperImage,bt as CropperSelection,mt as CropperShade,St as CropperViewer,Xe as DEFAULT_TEMPLATE,H as EVENT_ACTION,z as EVENT_ACTION_END,pe as EVENT_ACTION_MOVE,W as EVENT_ACTION_START,P as EVENT_CHANGE,Pt as EVENT_ERROR,Mt as EVENT_KEYDOWN,L as EVENT_LOAD,It as EVENT_POINTER_DOWN,_t as EVENT_POINTER_MOVE,xt as EVENT_POINTER_UP,Ue as EVENT_RESIZE,fe as EVENT_TOUCH_END,ge as EVENT_TOUCH_MOVE,me as EVENT_TOUCH_START,$t as EVENT_TRANSFORM,Dt as EVENT_WHEEL,Ct as HAS_POINTER_EVENT,lt as IS_BROWSER,wt as IS_TOUCH_DEVICE,M as NAMESPACE,I as WINDOW,se as default,Ce as emit,J as getAdjustedSizes,Yt as getOffset,F as isElement,yt as isFunction,ne as isNaN,$ as isNumber,ae as isObject,et as isPlainObject,T as isPositiveNumber,G as isString,be as isUndefined,re as multiplyMatrices,ye as nextTick,v as off,S as on,Lt as once,dt as toAngleInRadian,Wt as toCamelCase,zt as toKebabCase};
