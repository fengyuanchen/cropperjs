import{_ as h,C as d,c,o as k,ag as n,G as t,j as i,w as l,a as s}from"./chunks/framework.CAD6b6pp.js";const C=JSON.parse('{"title":"CropperCanvas","description":"","frontmatter":{},"headers":[],"relativePath":"zh/api/cropper-canvas.md","filePath":"zh/api/cropper-canvas.md","lastUpdated":1740835481000}'),p={name:"zh/api/cropper-canvas.md"};function E(u,e,g,v,y,b){const o=d("LiveDemo"),a=d("ClientOnly"),r=d("CropperCanvasToNativeCanvas");return k(),c("div",null,[e[7]||(e[7]=n('<h1 id="croppercanvas" tabindex="-1">CropperCanvas <a class="header-anchor" href="#croppercanvas" aria-label="Permalink to &quot;CropperCanvas&quot;">​</a></h1><p><code>CropperCanvas</code> 接口提供了用于操作 <code>&lt;cropper-canvas&gt;</code> 元素的布局和表示的属性和方法。</p><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><h3 id="基本" tabindex="-1">基本 <a class="header-anchor" href="#基本" aria-label="Permalink to &quot;基本&quot;">​</a></h3>',4)),t(a,null,{default:l(()=>[t(o,null,{default:l(()=>e[0]||(e[0]=[i("div",{class:"language-html vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"html"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-canvas"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"></"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-canvas"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")])])])],-1)])),_:1})]),_:1}),e[8]||(e[8]=i("div",{class:"tip custom-block"},[i("p",{class:"custom-block-title"},"TIP"),i("p",null,[s("此元素的默认最小宽度和最小高度为 "),i("code",null,"200px"),s(" 和 "),i("code",null,"100px"),s("。")])],-1)),e[9]||(e[9]=i("h3",{id:"背景",tabindex:"-1"},[s("背景 "),i("a",{class:"header-anchor",href:"#背景","aria-label":'Permalink to "背景"'},"​")],-1)),t(a,null,{default:l(()=>[t(o,null,{default:l(()=>e[1]||(e[1]=[i("div",{class:"language-html vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"html"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-canvas"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," background"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"></"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-canvas"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")])])])],-1)])),_:1})]),_:1}),e[10]||(e[10]=i("h3",{id:"交互",tabindex:"-1"},[s("交互 "),i("a",{class:"header-anchor",href:"#交互","aria-label":'Permalink to "交互"'},"​")],-1)),t(a,null,{default:l(()=>[t(o,null,{default:l(()=>e[2]||(e[2]=[i("div",{class:"language-html vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"html"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-canvas"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," background"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-image"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," src"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"/cropperjs/picture.jpg"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," alt"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"Picture"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," rotatable"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," scalable"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," skewable"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," translatable"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"></"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-image"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-handle"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," action"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"move"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," plain"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"></"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-handle"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"</"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-canvas"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")])])])],-1)])),_:1})]),_:1}),e[11]||(e[11]=i("h3",{id:"禁用",tabindex:"-1"},[s("禁用 "),i("a",{class:"header-anchor",href:"#禁用","aria-label":'Permalink to "禁用"'},"​")],-1)),e[12]||(e[12]=i("p",null,"所有指针事件均被禁用。",-1)),t(a,null,{default:l(()=>[t(o,null,{default:l(()=>e[3]||(e[3]=[i("div",{class:"language-html vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"html"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-canvas"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," background"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," disabled"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-image"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," src"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"/cropperjs/picture.jpg"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," alt"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"Picture"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," rotatable"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," scalable"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," skewable"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," translatable"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"></"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-image"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"  <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-handle"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," action"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"move"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," plain"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"></"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-handle"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"</"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"cropper-canvas"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")])])])],-1)])),_:1})]),_:1}),e[13]||(e[13]=n('<h2 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-label="Permalink to &quot;属性&quot;">​</a></h2><p>从其父级 <a href="./cropper-element.html"><code>CropperElement</code></a> 继承属性，并实现以下属性：</p><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>默认值</th><th>可选值</th><th>描述</th></tr></thead><tbody><tr><td>background</td><td><code>boolean</code></td><td><code>false</code></td><td>-</td><td>指示此元素是否具有网格背景。</td></tr><tr><td>disabled</td><td><code>boolean</code></td><td><code>false</code></td><td>-</td><td>指示此元素是否已禁用。</td></tr><tr><td>scaleStep</td><td><code>number</code></td><td><code>0.1</code></td><td>-</td><td>指示滚轮放大/缩小时缩放系数的步进间隔，必须为正数。</td></tr><tr><td>themeColor</td><td><code>string</code></td><td><code>&quot;#39f&quot;</code></td><td>-</td><td>指示此元素及其子元素的颜色。</td></tr></tbody></table><h2 id="方法" tabindex="-1">方法 <a class="header-anchor" href="#方法" aria-label="Permalink to &quot;方法&quot;">​</a></h2><h3 id="setaction" tabindex="-1">$setAction <a class="header-anchor" href="#setaction" aria-label="Permalink to &quot;$setAction&quot;">​</a></h3><ul><li><strong>语法</strong>：<code>$setAction(action)</code></li><li><strong>参数</strong>： <ul><li><code>action</code>： <ul><li>类型：<code>string</code></li><li>新的动作。</li></ul></li></ul></li><li><strong>返回值</strong>： <ul><li>类型：<code>CropperCanvas</code></li><li>元素实例。</li></ul></li></ul><p>将当前动作变更为新动作。</p><h3 id="tocanvas" tabindex="-1">$toCanvas <a class="header-anchor" href="#tocanvas" aria-label="Permalink to &quot;$toCanvas&quot;">​</a></h3>',8)),i("ul",null,[e[6]||(e[6]=n("<li><strong>语法</strong>： <ul><li><code>$toCanvas()</code></li><li><code>$toCanvas(options)</code></li></ul></li><li><strong>参数</strong>： <ul><li><code>options</code>： <ul><li>类型：<code>Object</code></li><li>可用选项。</li><li>属性： <ul><li><code>width</code>： <ul><li>类型：<code>number</code></li><li>画布的宽度。</li></ul></li><li><code>height</code>： <ul><li>类型：<code>number</code></li><li>画布的高度。</li></ul></li><li><code>beforeDraw</code>： <ul><li>类型：<code>Function</code></li><li>在将图像绘制到画布上之前调用的函数。</li><li>语法：<code>beforeDraw(context, canvas)</code></li><li>参数： <ul><li><code>context</code>： <ul><li>类型：<code>CanvasRenderingContext2D</code></li><li>画布的 2D 渲染上下文。</li></ul></li><li><code>canvas</code>： <ul><li>类型：<code>HTMLCanvasElement</code></li><li>画布元素本身。</li></ul></li></ul></li><li>示例：<code>function (context) { context.filter = &#39;grayscale(100%)&#39;; }</code></li></ul></li></ul></li></ul></li></ul></li><li><strong>返回值</strong>： <ul><li>类型：<code>Promise</code></li><li>一个以生成的画布元素为给定值解析后的 Promise 对象。</li></ul></li>",3)),i("li",null,[e[4]||(e[4]=i("strong",null,"示例",-1)),e[5]||(e[5]=s("：")),t(a,null,{default:l(()=>[t(r)]),_:1})])]),e[14]||(e[14]=n(`<p>生成一个真实的画布元素，如果有图像，则将其绘制到其中。</p><h2 id="事件" tabindex="-1">事件 <a class="header-anchor" href="#事件" aria-label="Permalink to &quot;事件&quot;">​</a></h2><h3 id="action" tabindex="-1">action <a class="header-anchor" href="#action" aria-label="Permalink to &quot;action&quot;">​</a></h3><p>当指针在画布上变化时触发该事件。</p><ul><li>事件： <ul><li><strong>event.bubbles</strong>：<code>true</code></li><li><strong>event.cancelable</strong>：<code>false</code></li><li><strong>event.composed</strong>：<code>true</code></li><li><strong>event.detail</strong>： <ul><li>类型：<code>Object</code></li><li>动作的相关数据。</li></ul></li><li><strong>event.detail.action</strong>： <ul><li>类型：<code>string</code></li><li>可选值：<code>&quot;select&quot;</code>, <code>&quot;move&quot;</code>, <code>&quot;scale&quot;</code>, <code>&quot;rotate&quot;</code>, <code>&quot;transform&quot;</code>, <code>&quot;n-resize&quot;</code>, <code>&quot;e-resize&quot;</code>, <code>&quot;s-resize&quot;</code>, <code>&quot;w-resize&quot;</code>, <code>&quot;ne-resize&quot;</code>, <code>&quot;nw-resize&quot;</code>, <code>&quot;se-resize&quot;</code>, and <code>&quot;sw-resize&quot;</code>.</li><li>动作类型。</li></ul></li><li><strong>event.detail.relatedEvent</strong>： <ul><li>类型：<code>PointerEvent | TouchEvent | MouseEvent | WheelEvent</code></li><li>触发此事件的相关原生事件。</li></ul></li><li><strong>event.detail.scale</strong>： <ul><li>类型：<code>number</code></li><li>缩放系数，仅当 <code>action</code> 为 <code>&quot;scale&quot;</code> 或 <code>&quot;transform&quot;</code> 时可用。</li></ul></li><li><strong>event.detail.rotate</strong>： <ul><li>类型：<code>number</code></li><li>缩放系数，仅当 <code>action</code> 为 <code>&quot;rotate&quot;</code> 或 <code>&quot;transform&quot;</code> 时可用。</li></ul></li><li><strong>event.detail.startX</strong>： <ul><li>类型：<code>number</code></li><li>起始 <code>pageX</code> 值，仅当 <code>relatedEvent</code> 为 <code>PointerEvent</code>、<code>TouchEvent</code> 或 <code>MouseEvent</code> 时可用。</li></ul></li><li><strong>event.detail.startY</strong>： <ul><li>类型：<code>number</code></li><li>起始 <code>pageY</code> 值，仅在 <code>relatedEvent</code> 为 <code>PointerEvent</code>、<code>TouchEvent</code> 或 <code>MouseEvent</code> 时可用。</li></ul></li><li><strong>event.detail.endX</strong>： <ul><li>类型：<code>number</code></li><li>结束 <code>pageX</code> 值，仅当 <code>relatedEvent</code> 为 <code>PointerEvent</code>、<code>TouchEvent</code> 或 <code>MouseEvent</code> 时可用。</li></ul></li><li><strong>event.detail.endY</strong>： <ul><li>类型：<code>number</code></li><li>结束 <code>pageY</code> 值，仅当 <code>relatedEvent</code> 为 <code>PointerEvent</code>、<code>TouchEvent</code> 或 <code>MouseEvent</code> 时可用。</li></ul></li></ul></li><li>示例：</li></ul><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">cropper-canvas</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;canvas&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">cropper-canvas</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#canvas&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;action&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">event</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(event);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="actionstart" tabindex="-1">actionstart <a class="header-anchor" href="#actionstart" aria-label="Permalink to &quot;actionstart&quot;">​</a></h3><p>当指针变为活动状态时触发该事件。</p><ul><li>事件： <ul><li><strong>event.bubbles</strong>：<code>true</code></li><li><strong>event.cancelable</strong>：<code>true</code></li><li><strong>event.composed</strong>：<code>true</code></li><li><strong>event.detail</strong>： <ul><li>类型：<code>Object</code></li><li>动作的相关数据。</li></ul></li><li><strong>event.detail.action</strong>： <ul><li>类型：<code>string</code></li><li>可选值：与 <code>action</code> 事件相同，除了 <code>&quot;scale&quot;</code> 选项。</li><li>动作类型。</li></ul></li><li><strong>event.detail.relatedEvent</strong>： <ul><li>类型：<code>PointerEvent | TouchEvent | MouseEvent</code></li><li>触发此事件的相关原生事件。</li></ul></li></ul></li></ul><h3 id="actionmove" tabindex="-1">actionmove <a class="header-anchor" href="#actionmove" aria-label="Permalink to &quot;actionmove&quot;">​</a></h3><p>当指针改变坐标时触发此事件。</p><ul><li>事件： <ul><li><strong>event.bubbles</strong>：<code>true</code></li><li><strong>event.cancelable</strong>：<code>true</code></li><li><strong>event.composed</strong>：<code>true</code></li><li><strong>event.detail</strong>： <ul><li>类型：<code>Object</code></li><li>动作的相关数据。</li></ul></li><li><strong>event.detail.action</strong>： <ul><li>类型：<code>string</code></li><li>可选值：与 <code>action</code> 事件相同，除了 <code>&quot;scale&quot;</code> 选项。</li><li>动作类型。</li></ul></li><li><strong>event.detail.relatedEvent</strong>： <ul><li>类型：<code>PointerEvent | TouchEvent | MouseEvent</code></li><li>触发此事件的相关原生事件。</li></ul></li></ul></li></ul><h3 id="actionend" tabindex="-1">actionend <a class="header-anchor" href="#actionend" aria-label="Permalink to &quot;actionend&quot;">​</a></h3><p>当指针不再处于活动状态时会触发此事件。</p><ul><li>事件： <ul><li><strong>event.bubbles</strong>：<code>true</code></li><li><strong>event.cancelable</strong>：<code>true</code></li><li><strong>event.composed</strong>：<code>true</code></li><li><strong>event.detail</strong>： <ul><li>类型：<code>Object</code></li><li>动作的相关数据。</li></ul></li><li><strong>event.detail.action</strong>： <ul><li>类型：<code>string</code></li><li>可选值：与 <code>action</code> 事件相同，除了 <code>&quot;scale&quot;</code> 选项。</li><li>动作类型。</li></ul></li><li><strong>event.detail.relatedEvent</strong>： <ul><li>类型：<code>PointerEvent | TouchEvent | MouseEvent</code></li><li>触发此事件的相关原生事件。</li></ul></li></ul></li></ul><h2 id="插槽" tabindex="-1">插槽 <a class="header-anchor" href="#插槽" aria-label="Permalink to &quot;插槽&quot;">​</a></h2><p>此元素中只有一个默认插槽。</p><blockquote><p>你可以通过将 <code>slottable</code> 属性设置为 <code>false</code> 来禁用它：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">cropper-canvas</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> slottable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;false&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">cropper-canvas</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></blockquote>`,18))])}const F=h(p,[["render",E]]);export{C as __pageData,F as default};
