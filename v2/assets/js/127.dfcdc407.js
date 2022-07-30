"use strict";(self.webpackChunkcropperjs=self.webpackChunkcropperjs||[]).push([[127],{2901:function(e,t,l){l.r(t),l.d(t,{default:function(){return Ie}});var a=l(6252),n=l(3577),o=l(2262),r=l(9963);const u={class:"theme-default-content"},i={};var s=(0,l(3744).Z)(i,[["render",function(e,t){const l=(0,a.up)("Content");return(0,a.wg)(),(0,a.iD)("div",u,[(0,a.Wm)(l)])}]]),c=l(4393),v=l(7171);const d={key:0,class:"features"};var p=(0,a.aZ)({__name:"HomeFeatures",setup(e){const t=(0,c.I2)(),l=(0,a.Fl)((()=>(0,v.kJ)(t.value.features)?t.value.features:[]));return(e,t)=>(0,o.SU)(l).length?((0,a.wg)(),(0,a.iD)("div",d,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,o.SU)(l),(e=>((0,a.wg)(),(0,a.iD)("div",{key:e.title,class:"feature"},[(0,a._)("h2",null,(0,n.zw)(e.title),1),(0,a._)("p",null,(0,n.zw)(e.details),1)])))),128))])):(0,a.kq)("",!0)}});const g=["innerHTML"],m=["textContent"];var h=(0,a.aZ)({__name:"HomeFooter",setup(e){const t=(0,c.I2)(),l=(0,a.Fl)((()=>t.value.footer)),r=(0,a.Fl)((()=>t.value.footerHtml));return(e,t)=>(0,o.SU)(l)?((0,a.wg)(),(0,a.iD)(a.HY,{key:0},[(0,o.SU)(r)?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"footer",innerHTML:(0,o.SU)(l)},null,8,g)):((0,a.wg)(),(0,a.iD)("div",{key:1,class:"footer",textContent:(0,n.zw)((0,o.SU)(l))},null,8,m))],64)):(0,a.kq)("",!0)}}),b=l(2119);const w=["href","rel","target","aria-label"],k=(0,a.aZ)({inheritAttrs:!1});var f=(0,a.aZ)({...k,__name:"AutoLink",props:{item:{type:Object,required:!0}},setup(e){const t=e,l=(0,b.yj)(),r=(0,c.WF)(),{item:u}=(0,o.BK)(t),i=(0,a.Fl)((()=>(0,v.ak)(u.value.link))),s=(0,a.Fl)((()=>(0,v.B2)(u.value.link)||(0,v.R5)(u.value.link))),d=(0,a.Fl)((()=>{if(!s.value)return u.value.target?u.value.target:i.value?"_blank":void 0})),p=(0,a.Fl)((()=>"_blank"===d.value)),g=(0,a.Fl)((()=>!i.value&&!s.value&&!p.value)),m=(0,a.Fl)((()=>{if(!s.value)return u.value.rel?u.value.rel:p.value?"noopener noreferrer":void 0})),h=(0,a.Fl)((()=>u.value.ariaLabel||u.value.text)),k=(0,a.Fl)((()=>{const e=Object.keys(r.value.locales);return e.length?!e.some((e=>e===u.value.link)):"/"!==u.value.link})),f=(0,a.Fl)((()=>!!k.value&&l.path.startsWith(u.value.link))),S=(0,a.Fl)((()=>!!g.value&&(u.value.activeMatch?new RegExp(u.value.activeMatch).test(l.path):f.value)));return(e,t)=>{const l=(0,a.up)("RouterLink"),r=(0,a.up)("AutoLinkExternalIcon");return(0,o.SU)(g)?((0,a.wg)(),(0,a.j4)(l,(0,a.dG)({key:0,class:{"router-link-active":(0,o.SU)(S)},to:(0,o.SU)(u).link,"aria-label":(0,o.SU)(h)},e.$attrs),{default:(0,a.w5)((()=>[(0,a.WI)(e.$slots,"before"),(0,a.Uk)(" "+(0,n.zw)((0,o.SU)(u).text)+" ",1),(0,a.WI)(e.$slots,"after")])),_:3},16,["class","to","aria-label"])):((0,a.wg)(),(0,a.iD)("a",(0,a.dG)({key:1,class:"external-link",href:(0,o.SU)(u).link,rel:(0,o.SU)(m),target:(0,o.SU)(d),"aria-label":(0,o.SU)(h)},e.$attrs),[(0,a.WI)(e.$slots,"before"),(0,a.Uk)(" "+(0,n.zw)((0,o.SU)(u).text)+" ",1),(0,o.SU)(p)?((0,a.wg)(),(0,a.j4)(r,{key:0})):(0,a.kq)("",!0),(0,a.WI)(e.$slots,"after")],16,w))}}}),S=l(4595);const U={class:"hero"},_={key:0,id:"main-title"},y={key:1,class:"description"},D={key:2,class:"actions"};var F=(0,a.aZ)({__name:"HomeHero",setup(e){const t=(0,c.I2)(),l=(0,c.I5)(),r=(0,S.vs)(),u=(0,a.Fl)((()=>r.value&&void 0!==t.value.heroImageDark?t.value.heroImageDark:t.value.heroImage)),i=(0,a.Fl)((()=>null===t.value.heroText?null:t.value.heroText||l.value.title||"Hello")),s=(0,a.Fl)((()=>t.value.heroAlt||i.value||"hero")),d=(0,a.Fl)((()=>null===t.value.tagline?null:t.value.tagline||l.value.description||"Welcome to your VuePress site")),p=(0,a.Fl)((()=>(0,v.kJ)(t.value.actions)?t.value.actions.map((({text:e,link:t,type:l="primary"})=>({text:e,link:t,type:l}))):[])),g=()=>{if(!u.value)return null;const e=(0,a.h)("img",{src:(0,c.pJ)(u.value),alt:s.value});return void 0===t.value.heroImageDark?e:(0,a.h)(c.qx,(()=>e))};return(e,t)=>((0,a.wg)(),(0,a.iD)("header",U,[(0,a.Wm)(g),(0,o.SU)(i)?((0,a.wg)(),(0,a.iD)("h1",_,(0,n.zw)((0,o.SU)(i)),1)):(0,a.kq)("",!0),(0,o.SU)(d)?((0,a.wg)(),(0,a.iD)("p",y,(0,n.zw)((0,o.SU)(d)),1)):(0,a.kq)("",!0),(0,o.SU)(p).length?((0,a.wg)(),(0,a.iD)("p",D,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,o.SU)(p),(e=>((0,a.wg)(),(0,a.j4)(f,{key:e.text,class:(0,n.C_)(["action-button",[e.type]]),item:e},null,8,["class","item"])))),128))])):(0,a.kq)("",!0)]))}});const W={class:"home"};var I=(0,a.aZ)({__name:"Home",setup:e=>(e,t)=>((0,a.wg)(),(0,a.iD)("main",W,[(0,a.Wm)(F),(0,a.Wm)(p),(0,a.Wm)(s),(0,a.Wm)(h)]))}),x=(0,a.aZ)({__name:"NavbarBrand",setup(e){const t=(0,c.I)(),l=(0,c.I5)(),r=(0,S.X6)(),u=(0,S.vs)(),i=(0,a.Fl)((()=>r.value.home||t.value)),s=(0,a.Fl)((()=>l.value.title)),v=(0,a.Fl)((()=>u.value&&void 0!==r.value.logoDark?r.value.logoDark:r.value.logo)),d=()=>{if(!v.value)return null;const e=(0,a.h)("img",{class:"logo",src:(0,c.pJ)(v.value),alt:s.value});return void 0===r.value.logoDark?e:(0,a.h)(c.qx,(()=>e))};return(e,t)=>{const l=(0,a.up)("RouterLink");return(0,a.wg)(),(0,a.j4)(l,{to:(0,o.SU)(i)},{default:(0,a.w5)((()=>[(0,a.Wm)(d),(0,o.SU)(s)?((0,a.wg)(),(0,a.iD)("span",{key:0,class:(0,n.C_)(["site-name",{"can-hide":(0,o.SU)(v)}])},(0,n.zw)((0,o.SU)(s)),3)):(0,a.kq)("",!0)])),_:1},8,["to"])}}}),$=(0,a.aZ)({__name:"DropdownTransition",setup(e){const t=e=>{e.style.height=e.scrollHeight+"px"},l=e=>{e.style.height=""};return(e,n)=>((0,a.wg)(),(0,a.j4)(r.uT,{name:"dropdown",onEnter:t,onAfterEnter:l,onBeforeLeave:t},{default:(0,a.w5)((()=>[(0,a.WI)(e.$slots,"default")])),_:3}))}});const C=["aria-label"],L={class:"title"},H=(0,a._)("span",{class:"arrow down"},null,-1),j=["aria-label"],q={class:"title"},z={class:"navbar-dropdown"},T={class:"navbar-dropdown-subtitle"},B={key:1},M={class:"navbar-dropdown-subitem-wrapper"};var Z=(0,a.aZ)({__name:"NavbarDropdown",props:{item:{type:Object,required:!0}},setup(e){const t=e,{item:l}=(0,o.BK)(t),u=(0,a.Fl)((()=>l.value.ariaLabel||l.value.text)),i=(0,o.iH)(!1),s=(0,b.yj)();(0,a.YP)((()=>s.path),(()=>{i.value=!1}));const c=e=>{const t=0===e.detail;i.value=!!t&&!i.value},v=(e,t)=>t[t.length-1]===e;return(e,t)=>((0,a.wg)(),(0,a.iD)("div",{class:(0,n.C_)(["navbar-dropdown-wrapper",{open:i.value}])},[(0,a._)("button",{class:"navbar-dropdown-title",type:"button","aria-label":(0,o.SU)(u),onClick:c},[(0,a._)("span",L,(0,n.zw)((0,o.SU)(l).text),1),H],8,C),(0,a._)("button",{class:"navbar-dropdown-title-mobile",type:"button","aria-label":(0,o.SU)(u),onClick:t[0]||(t[0]=e=>i.value=!i.value)},[(0,a._)("span",q,(0,n.zw)((0,o.SU)(l).text),1),(0,a._)("span",{class:(0,n.C_)(["arrow",i.value?"down":"right"])},null,2)],8,j),(0,a.Wm)($,null,{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("ul",z,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,o.SU)(l).children,(e=>((0,a.wg)(),(0,a.iD)("li",{key:e.text,class:"navbar-dropdown-item"},[e.children?((0,a.wg)(),(0,a.iD)(a.HY,{key:0},[(0,a._)("h4",T,[e.link?((0,a.wg)(),(0,a.j4)(f,{key:0,item:e,onFocusout:t=>v(e,(0,o.SU)(l).children)&&0===e.children.length&&(i.value=!1)},null,8,["item","onFocusout"])):((0,a.wg)(),(0,a.iD)("span",B,(0,n.zw)(e.text),1))]),(0,a._)("ul",M,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.children,(t=>((0,a.wg)(),(0,a.iD)("li",{key:t.link,class:"navbar-dropdown-subitem"},[(0,a.Wm)(f,{item:t,onFocusout:a=>v(t,e.children)&&v(e,(0,o.SU)(l).children)&&(i.value=!1)},null,8,["item","onFocusout"])])))),128))])],64)):((0,a.wg)(),(0,a.j4)(f,{key:1,item:e,onFocusout:t=>v(e,(0,o.SU)(l).children)&&(i.value=!1)},null,8,["item","onFocusout"]))])))),128))],512),[[r.F8,i.value]])])),_:1})],2))}});const R=e=>decodeURI(e).replace(/#.*$/,"").replace(/(index)?\.(md|html)$/,""),P=(e,t)=>!(!e.link||!((e,t)=>t.hash===e||R(t.path)===R(e))(e.link,t))||!!e.children&&e.children.some((e=>P(e,t))),Y=e=>!(0,v.ak)(e)||/github\.com/.test(e)?"GitHub":/bitbucket\.org/.test(e)?"Bitbucket":/gitlab\.com/.test(e)?"GitLab":/gitee\.com/.test(e)?"Gitee":null,X={GitHub:":repo/edit/:branch/:path",GitLab:":repo/-/edit/:branch/:path",Gitee:":repo/edit/:branch/:path",Bitbucket:":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"},E={key:0,class:"navbar-items"};var K=(0,a.aZ)({__name:"NavbarItems",setup(e){const t=e=>(0,v.HD)(e)?(0,S.sC)(e):e.children?{...e,children:e.children.map(t)}:e,l=(()=>{const e=(0,S.X6)();return(0,a.Fl)((()=>(e.value.navbar||[]).map(t)))})(),n=(()=>{const e=(0,b.tv)(),t=(0,c.I)(),l=(0,c.I5)(),n=(0,S.X6)();return(0,a.Fl)((()=>{var a,o;const r=Object.keys(l.value.locales);if(r.length<2)return[];const u=e.currentRoute.value.path,i=e.currentRoute.value.fullPath;return[{text:null!=(a=n.value.selectLanguageText)?a:"unknown language",ariaLabel:null!=(o=n.value.selectLanguageAriaLabel)?o:"unkown language",children:r.map((a=>{var o,r,s,c,v,d;const p=null!=(r=null==(o=l.value.locales)?void 0:o[a])?r:{},g=null!=(c=null==(s=n.value.locales)?void 0:s[a])?c:{},m=`${p.lang}`,h=null!=(v=g.selectLanguageName)?v:m;let b;if(m===l.value.lang)b=i;else{const l=u.replace(t.value,a);b=e.getRoutes().some((e=>e.path===l))?l:null!=(d=g.home)?d:a}return{text:h,link:b}}))}]}))})(),r=(()=>{const e=(0,S.X6)(),t=(0,a.Fl)((()=>e.value.repo)),l=(0,a.Fl)((()=>t.value?Y(t.value):null)),n=(0,a.Fl)((()=>t.value&&!(0,v.ak)(t.value)?`https://github.com/${t.value}`:t.value)),o=(0,a.Fl)((()=>n.value?e.value.repoLabel?e.value.repoLabel:null===l.value?"Source":l.value:null));return(0,a.Fl)((()=>n.value&&o.value?[{text:o.value,link:n.value}]:[]))})(),u=(0,a.Fl)((()=>[...l.value,...n.value,...r.value]));return(e,t)=>(0,o.SU)(u).length?((0,a.wg)(),(0,a.iD)("nav",E,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,o.SU)(u),(e=>((0,a.wg)(),(0,a.iD)("div",{key:e.text,class:"navbar-item"},[e.children?((0,a.wg)(),(0,a.j4)(Z,{key:0,item:e},null,8,["item"])):((0,a.wg)(),(0,a.j4)(f,{key:1,item:e},null,8,["item"]))])))),128))])):(0,a.kq)("",!0)}});const N=["title"],V={class:"icon",focusable:"false",viewBox:"0 0 32 32"},A=[(0,a.uE)('<path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path>',9)],G={class:"icon",focusable:"false",viewBox:"0 0 32 32"},O=[(0,a._)("path",{d:"M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z",fill:"currentColor"},null,-1)];var J=(0,a.aZ)({__name:"ToggleColorModeButton",setup(e){const t=(0,S.X6)(),l=(0,S.vs)(),n=()=>{l.value=!l.value};return(e,u)=>((0,a.wg)(),(0,a.iD)("button",{class:"toggle-color-mode-button",title:(0,o.SU)(t).toggleColorMode,onClick:n},[(0,a.wy)(((0,a.wg)(),(0,a.iD)("svg",V,A,512)),[[r.F8,!(0,o.SU)(l)]]),(0,a.wy)(((0,a.wg)(),(0,a.iD)("svg",G,O,512)),[[r.F8,(0,o.SU)(l)]])],8,N))}});const Q=["title"],ee=[(0,a._)("div",{class:"icon","aria-hidden":"true"},[(0,a._)("span"),(0,a._)("span"),(0,a._)("span")],-1)];var te=(0,a.aZ)({__name:"ToggleSidebarButton",emits:["toggle"],setup(e){const t=(0,S.X6)();return(e,l)=>((0,a.wg)(),(0,a.iD)("div",{class:"toggle-sidebar-button",title:(0,o.SU)(t).toggleSidebar,"aria-expanded":"false",role:"button",tabindex:"0",onClick:l[0]||(l[0]=t=>e.$emit("toggle"))},ee,8,Q))}}),le=(0,a.aZ)({__name:"Navbar",emits:["toggle-sidebar"],setup(e){const t=(0,S.X6)(),l=(0,o.iH)(null),r=(0,o.iH)(null),u=(0,o.iH)(0),i=(0,a.Fl)((()=>u.value?{maxWidth:u.value+"px"}:{}));function s(e,t){var l,a,n;const o=null==(n=null==(a=null==(l=null==e?void 0:e.ownerDocument)?void 0:l.defaultView)?void 0:a.getComputedStyle(e,null))?void 0:n[t],r=Number.parseInt(o,10);return Number.isNaN(r)?0:r}return(0,a.bv)((()=>{const e=s(l.value,"paddingLeft")+s(l.value,"paddingRight"),t=()=>{var t;window.innerWidth<=719?u.value=0:u.value=l.value.offsetWidth-e-((null==(t=r.value)?void 0:t.offsetWidth)||0)};t(),window.addEventListener("resize",t,!1),window.addEventListener("orientationchange",t,!1)})),(e,u)=>{const s=(0,a.up)("NavbarSearch");return(0,a.wg)(),(0,a.iD)("header",{ref_key:"navbar",ref:l,class:"navbar"},[(0,a.Wm)(te,{onToggle:u[0]||(u[0]=t=>e.$emit("toggle-sidebar"))}),(0,a._)("span",{ref_key:"navbarBrand",ref:r},[(0,a.Wm)(x)],512),(0,a._)("div",{class:"navbar-items-wrapper",style:(0,n.j5)((0,o.SU)(i))},[(0,a.WI)(e.$slots,"before"),(0,a.Wm)(K,{class:"can-hide"}),(0,a.WI)(e.$slots,"after"),(0,o.SU)(t).colorModeSwitch?((0,a.wg)(),(0,a.j4)(J,{key:0})):(0,a.kq)("",!0),(0,a.Wm)(s)],4)],512)}}});const ae={class:"page-meta"},ne={key:0,class:"meta-item edit-link"},oe={key:1,class:"meta-item last-updated"},re={class:"meta-item-label"},ue={class:"meta-item-info"},ie={key:2,class:"meta-item contributors"},se={class:"meta-item-label"},ce={class:"meta-item-info"},ve=["title"],de=(0,a.Uk)(", ");var pe=(0,a.aZ)({__name:"PageMeta",setup(e){const t=(0,S.X6)(),l=(()=>{const e=(0,S.X6)(),t=(0,c.Vi)(),l=(0,c.I2)();return(0,a.Fl)((()=>{var a,n,o;if(null!=(n=null!=(a=l.value.editLink)?a:e.value.editLink)&&!n)return null;const{repo:r,docsRepo:u=r,docsBranch:i="main",docsDir:s="",editLinkText:c}=e.value;if(!u)return null;const d=(({docsRepo:e,docsBranch:t,docsDir:l,filePathRelative:a,editLinkPattern:n})=>{if(!a)return null;const o=(({docsRepo:e,editLinkPattern:t})=>{if(t)return t;const l=Y(e);return null!==l?X[l]:null})({docsRepo:e,editLinkPattern:n});return o?o.replace(/:repo/,(0,v.ak)(e)?e:`https://github.com/${e}`).replace(/:branch/,t).replace(/:path/,(0,v.FY)(`${(0,v.U1)(l)}/${a}`)):null})({docsRepo:u,docsBranch:i,docsDir:s,filePathRelative:t.value.filePathRelative,editLinkPattern:null!=(o=l.value.editLinkPattern)?o:e.value.editLinkPattern});return d?{text:null!=c?c:"Edit this page",link:d}:null}))})(),r=(()=>{const e=(0,S.X6)(),t=(0,c.Vi)(),l=(0,c.I2)();return(0,a.Fl)((()=>{var a,n,o,r;return(null==(n=null!=(a=l.value.lastUpdated)?a:e.value.lastUpdated)||n)&&(null==(o=t.value.git)?void 0:o.updatedTime)?new Date(null==(r=t.value.git)?void 0:r.updatedTime).toLocaleString():null}))})(),u=(()=>{const e=(0,S.X6)(),t=(0,c.Vi)(),l=(0,c.I2)();return(0,a.Fl)((()=>{var a,n,o,r;return null!=(n=null!=(a=l.value.contributors)?a:e.value.contributors)&&!n||null==(r=null==(o=t.value.git)?void 0:o.contributors)?null:r}))})();return(e,i)=>{const s=(0,a.up)("ClientOnly");return(0,a.wg)(),(0,a.iD)("footer",ae,[(0,o.SU)(l)?((0,a.wg)(),(0,a.iD)("div",ne,[(0,a.Wm)(f,{class:"meta-item-label",item:(0,o.SU)(l)},null,8,["item"])])):(0,a.kq)("",!0),(0,o.SU)(r)?((0,a.wg)(),(0,a.iD)("div",oe,[(0,a._)("span",re,(0,n.zw)((0,o.SU)(t).lastUpdatedText)+": ",1),(0,a.Wm)(s,null,{default:(0,a.w5)((()=>[(0,a._)("span",ue,(0,n.zw)((0,o.SU)(r)),1)])),_:1})])):(0,a.kq)("",!0),(0,o.SU)(u)&&(0,o.SU)(u).length?((0,a.wg)(),(0,a.iD)("div",ie,[(0,a._)("span",se,(0,n.zw)((0,o.SU)(t).contributorsText)+": ",1),(0,a._)("span",ce,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,o.SU)(u),((e,t)=>((0,a.wg)(),(0,a.iD)(a.HY,{key:t},[(0,a._)("span",{class:"contributor",title:`email: ${e.email}`},(0,n.zw)(e.name),9,ve),t!==(0,o.SU)(u).length-1?((0,a.wg)(),(0,a.iD)(a.HY,{key:0},[de],64)):(0,a.kq)("",!0)],64)))),128))])])):(0,a.kq)("",!0)])}}});const ge={key:0,class:"page-nav"},me={class:"inner"},he={key:0,class:"prev"},be={key:1,class:"next"};var we=(0,a.aZ)({__name:"PageNav",setup(e){const t=e=>!1===e?null:(0,v.HD)(e)?(0,S.sC)(e):!!(0,v.PO)(e)&&e,l=(e,t,a)=>{const n=e.findIndex((e=>e.link===t));if(-1!==n){const t=e[n+a];return(null==t?void 0:t.link)?t:null}for(const n of e)if(n.children){const e=l(n.children,t,a);if(e)return e}return null},n=(0,c.I2)(),r=(0,S.VU)(),u=(0,b.yj)(),i=(0,a.Fl)((()=>{const e=t(n.value.prev);return!1!==e?e:l(r.value,u.path,-1)})),s=(0,a.Fl)((()=>{const e=t(n.value.next);return!1!==e?e:l(r.value,u.path,1)}));return(e,t)=>(0,o.SU)(i)||(0,o.SU)(s)?((0,a.wg)(),(0,a.iD)("nav",ge,[(0,a._)("p",me,[(0,o.SU)(i)?((0,a.wg)(),(0,a.iD)("span",he,[(0,a.Wm)(f,{item:(0,o.SU)(i)},null,8,["item"])])):(0,a.kq)("",!0),(0,o.SU)(s)?((0,a.wg)(),(0,a.iD)("span",be,[(0,a.Wm)(f,{item:(0,o.SU)(s)},null,8,["item"])])):(0,a.kq)("",!0)])])):(0,a.kq)("",!0)}});const ke={class:"page"},fe={class:"theme-default-content"};var Se=(0,a.aZ)({__name:"Page",setup:e=>(e,t)=>{const l=(0,a.up)("Content");return(0,a.wg)(),(0,a.iD)("main",ke,[(0,a.WI)(e.$slots,"top"),(0,a._)("div",fe,[(0,a.WI)(e.$slots,"content-top"),(0,a.Wm)(l),(0,a.WI)(e.$slots,"content-bottom")]),(0,a.Wm)(pe),(0,a.Wm)(we),(0,a.WI)(e.$slots,"bottom")])}});const Ue={class:"sidebar-item-children"};var _e=(0,a.aZ)({__name:"SidebarItem",props:{item:{type:Object,required:!0},depth:{type:Number,required:!1,default:0}},setup(e){const t=e,{item:l,depth:u}=(0,o.BK)(t),i=(0,b.yj)(),s=(0,b.tv)(),c=(0,a.Fl)((()=>P(l.value,i))),v=(0,a.Fl)((()=>({"sidebar-item":!0,"sidebar-heading":0===u.value,active:c.value,collapsible:l.value.collapsible}))),d=(0,o.iH)(!0),p=(0,o.iH)(void 0);return l.value.collapsible&&(d.value=c.value,p.value=()=>{d.value=!d.value},s.afterEach((()=>{d.value=c.value}))),(e,t)=>{var i;const s=(0,a.up)("SidebarItem",!0);return(0,a.wg)(),(0,a.iD)("li",null,[(0,o.SU)(l).link?((0,a.wg)(),(0,a.j4)(f,{key:0,class:(0,n.C_)((0,o.SU)(v)),item:(0,o.SU)(l)},null,8,["class","item"])):((0,a.wg)(),(0,a.iD)("p",{key:1,tabindex:"0",class:(0,n.C_)((0,o.SU)(v)),onClick:t[0]||(t[0]=(...e)=>p.value&&p.value(...e)),onKeydown:t[1]||(t[1]=(0,r.D2)(((...e)=>p.value&&p.value(...e)),["enter"]))},[(0,a.Uk)((0,n.zw)((0,o.SU)(l).text)+" ",1),(0,o.SU)(l).collapsible?((0,a.wg)(),(0,a.iD)("span",{key:0,class:(0,n.C_)(["arrow",d.value?"down":"right"])},null,2)):(0,a.kq)("",!0)],34)),(null==(i=(0,o.SU)(l).children)?void 0:i.length)?((0,a.wg)(),(0,a.j4)($,{key:2},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("ul",Ue,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,o.SU)(l).children,(e=>((0,a.wg)(),(0,a.j4)(s,{key:`${(0,o.SU)(u)}${e.text}${e.link}`,item:e,depth:(0,o.SU)(u)+1},null,8,["item","depth"])))),128))],512),[[r.F8,d.value]])])),_:1})):(0,a.kq)("",!0)])}}});const ye={key:0,class:"sidebar-items"};var De=(0,a.aZ)({__name:"SidebarItems",setup(e){const t=(0,b.yj)(),l=(0,S.VU)();return(0,a.bv)((()=>{(0,a.YP)((()=>t.hash),(e=>{const l=document.querySelector(".sidebar");if(!l)return;const a=document.querySelector(`.sidebar a.sidebar-item[href="${t.path}${e}"]`);if(!a)return;const{top:n,height:o}=l.getBoundingClientRect(),{top:r,height:u}=a.getBoundingClientRect();r<n?a.scrollIntoView(!0):r+u>n+o&&a.scrollIntoView(!1)}))})),(e,t)=>(0,o.SU)(l).length?((0,a.wg)(),(0,a.iD)("ul",ye,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,o.SU)(l),(e=>((0,a.wg)(),(0,a.j4)(_e,{key:e.link||e.text,item:e},null,8,["item"])))),128))])):(0,a.kq)("",!0)}});const Fe={class:"sidebar"};var We=(0,a.aZ)({__name:"Sidebar",setup:e=>(e,t)=>((0,a.wg)(),(0,a.iD)("aside",Fe,[(0,a.Wm)(K),(0,a.WI)(e.$slots,"top"),(0,a.Wm)(De),(0,a.WI)(e.$slots,"bottom")]))}),Ie=(0,a.aZ)({__name:"Layout",setup(e){const t=(0,c.Vi)(),l=(0,c.I2)(),u=(0,S.X6)(),i=(0,a.Fl)((()=>!1!==l.value.navbar&&!1!==u.value.navbar)),s=(0,S.VU)(),v=(0,o.iH)(!1),d=e=>{v.value="boolean"==typeof e?e:!v.value},p={x:0,y:0},g=e=>{p.x=e.changedTouches[0].clientX,p.y=e.changedTouches[0].clientY},m=e=>{const t=e.changedTouches[0].clientX-p.x,l=e.changedTouches[0].clientY-p.y;Math.abs(t)>Math.abs(l)&&Math.abs(t)>40&&(t>0&&p.x<=80?d(!0):d(!1))},h=(0,a.Fl)((()=>[{"no-navbar":!i.value,"no-sidebar":!s.value.length,"sidebar-open":v.value},l.value.pageClass]));let w;(0,a.bv)((()=>{const e=(0,b.tv)();w=e.afterEach((()=>{d(!1)}))})),(0,a.Ah)((()=>{w()}));const k=(0,S.P$)(),f=k.resolve,U=k.pending;return(e,u)=>((0,a.wg)(),(0,a.iD)("div",{class:(0,n.C_)(["theme-container",(0,o.SU)(h)]),onTouchstart:g,onTouchend:m},[(0,a.WI)(e.$slots,"navbar",{},(()=>[(0,o.SU)(i)?((0,a.wg)(),(0,a.j4)(le,{key:0,onToggleSidebar:d},{before:(0,a.w5)((()=>[(0,a.WI)(e.$slots,"navbar-before")])),after:(0,a.w5)((()=>[(0,a.WI)(e.$slots,"navbar-after")])),_:3})):(0,a.kq)("",!0)])),(0,a._)("div",{class:"sidebar-mask",onClick:u[0]||(u[0]=e=>d(!1))}),(0,a.WI)(e.$slots,"sidebar",{},(()=>[(0,a.Wm)(We,null,{top:(0,a.w5)((()=>[(0,a.WI)(e.$slots,"sidebar-top")])),bottom:(0,a.w5)((()=>[(0,a.WI)(e.$slots,"sidebar-bottom")])),_:3})])),(0,a.WI)(e.$slots,"page",{},(()=>[(0,o.SU)(l).home?((0,a.wg)(),(0,a.j4)(I,{key:0})):((0,a.wg)(),(0,a.j4)(r.uT,{key:1,name:"fade-slide-y",mode:"out-in",onBeforeEnter:(0,o.SU)(f),onBeforeLeave:(0,o.SU)(U)},{default:(0,a.w5)((()=>[((0,a.wg)(),(0,a.j4)(Se,{key:(0,o.SU)(t).path},{top:(0,a.w5)((()=>[(0,a.WI)(e.$slots,"page-top")])),"content-top":(0,a.w5)((()=>[(0,a.WI)(e.$slots,"page-content-top")])),"content-bottom":(0,a.w5)((()=>[(0,a.WI)(e.$slots,"page-content-bottom")])),bottom:(0,a.w5)((()=>[(0,a.WI)(e.$slots,"page-bottom")])),_:3}))])),_:3},8,["onBeforeEnter","onBeforeLeave"]))]))],34))}})},3744:function(e,t){t.Z=(e,t)=>{const l=e.__vccOpts||e;for(const[e,a]of t)l[e]=a;return l}}}]);