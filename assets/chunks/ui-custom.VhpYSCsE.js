import{u as i,a as p}from"./theme.nHW_zial.js";import{d as l,p as f,q as c,v as u,c as _,o as m,_ as b}from"./framework.CAD6b6pp.js";const v=l({__name:"VPCarbonAds",props:{carbonAds:{}},setup(r){const{page:d}=i(),a=r.carbonAds,{isAsideEnabled:s}=p(),o=f();let n=!1;function t(){if(!n){n=!0;const e=document.createElement("script");e.id="_carbonads_js",e.src=`//cdn.carbonads.com/carbon.js?serve=${a.code}&placement=${a.placement}`,e.async=!0,o.value.appendChild(e)}}return c(()=>d.value.relativePath,()=>{var e;n&&s.value&&((e=window._carbonads)==null||e.refresh())}),a&&u(()=>{s.value?t():c(s,e=>e&&t())}),(e,h)=>(m(),_("div",{class:"VPCarbonAds",ref_key:"container",ref:o},null,512))}}),k=b(v,[["__scopeId","data-v-2e1efd59"]]);export{k as default};
