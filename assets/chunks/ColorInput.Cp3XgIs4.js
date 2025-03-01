import{_ as m,c as p,o as d}from"./framework.CAD6b6pp.js";const _=(t,o,r,e)=>(r|o<<8|t<<16|1<<24).toString(16).slice(1)+e;function l(t,o,r,e){let s=(t+(e||"")).toString().includes("%");if(typeof t=="string"&&!o){const n=a(t);if(!n)throw new TypeError("Invalid or unsupported color format.");s=!1,[t,o,r,e]=n}else e!==void 0&&(e=Number.parseFloat(e));if(typeof t!="number"||typeof o!="number"||typeof r!="number"||t>255||o>255||r>255)throw new TypeError("Expected three numbers below 256");if(typeof e=="number"){if(!s&&e>=0&&e<=1)e=Math.round(255*e);else if(s&&e>=0&&e<=100)e=Math.round(255*e/100);else throw new TypeError(`Expected alpha value (${e}) as a fraction or percentage`);e=(e|256).toString(16).slice(1)}else e="";return _(t,o,r,e)}const a=t=>{const o=t.replace(/rgba?\(([^)]+)\)/,"$1").split(/[,\s/]+/).filter(Boolean);if(o.length<3)return;const r=(u,c)=>(u=u.trim(),u.endsWith("%")?Math.min(Number.parseFloat(u)*c/100,c):Math.min(Number.parseFloat(u),c)),e=r(o[0],255),s=r(o[1],255),n=r(o[2],255);let i;return o.length===4&&(i=r(o[3],1)),[e,s,n,i]},f="update:modelValue",b={name:"ColorInput",props:{modelValue:{type:String,default:""}},emits:[f],computed:{modelValueAsHex(){const{modelValue:t}=this;return t.includes("rgba")?l(t):t}},methods:{rgbHex:l,onInput(t){this.$emit(f,t.target.value,this.modelValue)}}},g=["value"];function E(t,o,r,e,s,n){return d(),p("input",{type:"color",class:"form-control form-control-color form-control-sm",value:n.modelValueAsHex,onInput:o[0]||(o[0]=(...i)=>n.onInput&&n.onInput(...i))},null,40,g)}const V=m(b,[["render",E]]);export{V as default};
