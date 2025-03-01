import{_ as r,C as d,c as n,o as p,ag as k,G as a,j as i,w as l,a as t}from"./chunks/framework.CAD6b6pp.js";const m=JSON.parse('{"title":"CropperShade","description":"","frontmatter":{},"headers":[],"relativePath":"zh/api/cropper-shade.md","filePath":"zh/api/cropper-shade.md","lastUpdated":1740835647000}'),o={name:"zh/api/cropper-shade.md"};function E(c,s,g,y,u,F){const e=d("LiveDemo"),h=d("ClientOnly");return p(),n("div",null,[s[4]||(s[4]=k('<h1 id="croppershade" tabindex="-1">CropperShade <a class="header-anchor" href="#croppershade" aria-label="Permalink to &quot;CropperShade&quot;">​</a></h1><p><code>CropperShade</code> 接口提供了用于操作 <code>&lt;cropper-shade&gt;</code> 元素的布局和表示的属性和方法。</p><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><h3 id="基本" tabindex="-1">基本 <a class="header-anchor" href="#基本" aria-label="Permalink to &quot;基本&quot;">​</a></h3>',4)),a(h,null,{default:l(()=>[a(e,null,{default:l(()=>s[0]||(s[0]=[i("div",{class:"language-html vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"html"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-shade"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"></"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-shade"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")])])])],-1)])),_:1})]),_:1}),s[5]||(s[5]=i("div",{class:"tip custom-block"},[i("p",{class:"custom-block-title"},"TIP"),i("p",null,[t("此元素的默认宽度和高度为 "),i("code",null,"0"),t("。")])],-1)),s[6]||(s[6]=i("h3",{id:"指定位置和大小",tabindex:"-1"},[t("指定位置和大小 "),i("a",{class:"header-anchor",href:"#指定位置和大小","aria-label":'Permalink to "指定位置和大小"'},"​")],-1)),a(h,null,{default:l(()=>[a(e,null,{default:l(()=>s[1]||(s[1]=[i("div",{class:"language-html vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"html"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-canvas"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," background"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),t(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-shade"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," x"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"240"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," y"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"5"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," width"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"160"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," height"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"90"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"></"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-shade"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),t(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"</"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-canvas"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")])])])],-1)])),_:1})]),_:1}),s[7]||(s[7]=i("h3",{id:"自定义颜色",tabindex:"-1"},[t("自定义颜色 "),i("a",{class:"header-anchor",href:"#自定义颜色","aria-label":'Permalink to "自定义颜色"'},"​")],-1)),a(h,null,{default:l(()=>[a(e,null,{default:l(()=>s[2]||(s[2]=[i("div",{class:"language-html vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"html"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-canvas"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," background"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),t(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-shade"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," x"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"240"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," y"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"5"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," width"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"160"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," height"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"90"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," theme-color"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"rgba(0, 0, 0, 0.35)"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"></"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-shade"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),t(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"</"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-canvas"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")])])])],-1)])),_:1})]),_:1}),s[8]||(s[8]=i("h3",{id:"当指针按下-松开时动态切换可见性",tabindex:"-1"},[t("当指针按下/松开时动态切换可见性 "),i("a",{class:"header-anchor",href:"#当指针按下-松开时动态切换可见性","aria-label":'Permalink to "当指针按下/松开时动态切换可见性"'},"​")],-1)),a(h,null,{default:l(()=>[a(e,null,{default:l(()=>s[3]||(s[3]=[i("div",{class:"language-html vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"html"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-canvas"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," background"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),t(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-image"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," src"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"/cropperjs/picture.jpg"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," alt"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"Picture"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," rotatable"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," scalable"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," skewable"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," translatable"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"></"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-image"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),t(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-shade"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," hidden"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"></"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-shade"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),t(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-handle"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," action"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"select"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," plain"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"></"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-handle"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),t(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-selection"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," movable"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," resizable"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," hidden"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),t(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-handle"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," action"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"move"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," plain"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"></"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-handle"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),t(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  </"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-selection"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),t(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"</"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-canvas"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")])])])],-1)])),_:1})]),_:1}),s[9]||(s[9]=k('<div class="tip custom-block"><p class="custom-block-title">TIP</p><p><code>&lt;cropper-shade&gt;</code> 元素将自动同步当前活动的 <code>&lt;cropper-selection&gt;</code> 元素的位置和大小。</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/hidden" target="_blank" rel="noreferrer"><code>hidden</code></a> 属性是原生全局属性。</p></div><h2 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-label="Permalink to &quot;属性&quot;">​</a></h2><p>从其父级 <a href="./cropper-element.html"><code>CropperElement</code></a> 继承属性，并实现以下属性：</p><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>默认值</th><th>可选值</th><th>描述</th></tr></thead><tbody><tr><td>x</td><td><code>number</code></td><td><code>0</code></td><td>-</td><td>指示元素的 x 轴坐标。</td></tr><tr><td>y</td><td><code>number</code></td><td><code>0</code></td><td>-</td><td>指示元素的 y 轴坐标。</td></tr><tr><td>width</td><td><code>number</code></td><td><code>0</code></td><td>-</td><td>指示元素的宽度。</td></tr><tr><td>height</td><td><code>number</code></td><td><code>0</code></td><td>-</td><td>指示元素的高度。</td></tr><tr><td>slottable</td><td><code>boolean</code></td><td><code>false</code></td><td>-</td><td>指示此元素是否启用默认插槽。</td></tr><tr><td>themeColor</td><td><code>string</code></td><td><code>&quot;rgba(0, 0, 0, 0.65)&quot;</code></td><td>-</td><td>指示此元素的颜色。</td></tr></tbody></table><h2 id="方法" tabindex="-1">方法 <a class="header-anchor" href="#方法" aria-label="Permalink to &quot;方法&quot;">​</a></h2><h3 id="change" tabindex="-1">$change <a class="header-anchor" href="#change" aria-label="Permalink to &quot;$change&quot;">​</a></h3><ul><li><strong>语法</strong>： <ul><li><code>$change(x, y)</code></li><li><code>$change(x, y, width, height)</code></li></ul></li><li><strong>参数</strong>： <ul><li><code>x</code>： <ul><li>类型：<code>number</code></li><li>水平方向的新位置。</li></ul></li><li><code>y</code>： <ul><li>类型：<code>number</code></li><li>垂直方向的新位置。</li></ul></li><li><code>width</code>： <ul><li>类型：<code>number</code></li><li>默认值：<code>this.width</code></li><li>新宽度。</li></ul></li><li><code>height</code>： <ul><li>类型：<code>number</code></li><li>默认值：<code>this.height</code></li><li>新高度。</li></ul></li></ul></li><li><strong>返回值</strong>： <ul><li>类型：<code>CropperShade</code></li><li>用于链接的元素实例。</li></ul></li></ul><p>变更阴影的位置和/或大小。</p><h3 id="reset" tabindex="-1">$reset <a class="header-anchor" href="#reset" aria-label="Permalink to &quot;$reset&quot;">​</a></h3><ul><li><strong>语法</strong>：<code>$reset()</code></li><li><strong>返回值</strong>： <ul><li>类型：<code>CropperShade</code></li><li>元素实例。</li></ul></li></ul><p>将阴影重置为其初始位置和大小。</p><h3 id="render" tabindex="-1">$render <a class="header-anchor" href="#render" aria-label="Permalink to &quot;$render&quot;">​</a></h3><ul><li><strong>语法</strong>：<code>$render()</code></li><li><strong>返回值</strong>： <ul><li>类型：<code>CropperShade</code></li><li>元素实例。</li></ul></li></ul><p>刷新阴影的位置或大小。</p><h2 id="插槽" tabindex="-1">插槽 <a class="header-anchor" href="#插槽" aria-label="Permalink to &quot;插槽&quot;">​</a></h2><p>此元素中只有一个默认插槽。</p><blockquote><p>你可以通过将 <code>slottable</code> 属性设置为 <code>false</code> 来禁用它：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">cropper-shade</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> slottable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;false&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">cropper-shade</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></blockquote>',18))])}const C=r(o,[["render",E]]);export{m as __pageData,C as default};
