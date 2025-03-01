import{_ as i,c as a,o as e,ag as t}from"./chunks/framework.CAD6b6pp.js";const c=JSON.parse('{"title":"CropperElement","description":"","frontmatter":{},"headers":[],"relativePath":"zh/api/cropper-element.md","filePath":"zh/api/cropper-element.md","lastUpdated":1740835647000}'),l={name:"zh/api/cropper-element.md"};function n(p,s,h,d,o,r){return e(),a("div",null,s[0]||(s[0]=[t(`<h1 id="cropperelement" tabindex="-1">CropperElement <a class="header-anchor" href="#cropperelement" aria-label="Permalink to &quot;CropperElement&quot;">​</a></h1><p><code>CropperElement</code> 接口代表任何 Cropper 元素，扩展了 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement" target="_blank" rel="noreferrer">HTMLElement</a> 接口。</p><h2 id="规格" tabindex="-1">规格 <a class="header-anchor" href="#规格" aria-label="Permalink to &quot;规格&quot;">​</a></h2><ul><li>公共属性的名称应以字母字符开头。</li><li>私有属性的名称应该以 <code>$</code> 开头。</li><li>公共/私有自定义方法的名称应以 <code>$</code> 开头。</li><li>私有自定义侦听器的名称应以 <code>$on</code> 开头。</li></ul><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { CropperElement } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;cropperjs&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Or</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// import CropperElement from &#39;@cropper/element&#39;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MyCropperElement</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CropperElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  myStringProperty</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  myNumberProperty</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> NaN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  myBooleanProperty</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> get</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> observedAttributes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.observedAttributes.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">concat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;my-boolean-property&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;my-number-property&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;my-string-property&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">MyCropperElement.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$define</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">my-cropper-element</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> my-string-property</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;foo&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> my-number-property</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> my-boolean-property</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">my-cropper-element</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-label="Permalink to &quot;属性&quot;">​</a></h2><p>从其父级 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement" target="_blank" rel="noreferrer"><code>HTMLElement</code></a> 继承属性，并实现以下属性：</p><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>默认值</th><th>可选值</th><th>描述</th></tr></thead><tbody><tr><td>shadowRootMode</td><td><code>string</code></td><td><code>&quot;open&quot;</code></td><td><code>&quot;closed&quot; | &quot;open&quot;</code></td><td>指示 shadow DOM 树的封装模式。</td></tr><tr><td>slottable</td><td><code>boolean</code></td><td><code>true</code></td><td>-</td><td>指示此元素是否启用默认插槽，即包含 <code>&lt;slot&gt;</code> 元素。</td></tr><tr><td>themeColor</td><td><code>string</code></td><td>-</td><td>-</td><td>指示此元素及其子元素的颜色。</td></tr></tbody></table><h2 id="方法" tabindex="-1">方法 <a class="header-anchor" href="#方法" aria-label="Permalink to &quot;方法&quot;">​</a></h2><h3 id="getshadowroot" tabindex="-1">$getShadowRoot <a class="header-anchor" href="#getshadowroot" aria-label="Permalink to &quot;$getShadowRoot&quot;">​</a></h3><ul><li><strong>语法</strong>：<code>$getShadowRoot()</code></li><li><strong>返回值</strong>： <ul><li>类型：<code>ShadowRoot</code></li><li>shadow root。</li></ul></li></ul><p>输出元素的 shadow root，即使它的模式是 <code>&quot;closed&quot;</code>。</p><h3 id="addstyles" tabindex="-1">$addStyles <a class="header-anchor" href="#addstyles" aria-label="Permalink to &quot;$addStyles&quot;">​</a></h3><ul><li><p><strong>语法</strong>：<code>$addStyles(styles)</code></p></li><li><p><strong>参数</strong>：</p><ul><li><code>styles</code>： <ul><li>类型：<code>string</code></li><li>要添加的样式。</li></ul></li></ul></li><li><p><strong>返回值</strong>：</p><ul><li>类型：<code>CSSStyleSheet | HTMLStyleElement</code></li><li>生成的样式表。</li></ul></li><li><p><strong>示例</strong>：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> canvas</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CropperCanvas</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">canvas.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$addStyles</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  :host {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    border: 1px solid #39f;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div></li></ul><p>将样式添加到 shadow root。</p><h3 id="emit" tabindex="-1">$emit <a class="header-anchor" href="#emit" aria-label="Permalink to &quot;$emit&quot;">​</a></h3><ul><li><p><strong>语法</strong>：</p><ul><li><code>$emit(type)</code></li><li><code>$emit(type, detail)</code></li><li><code>$emit(type, detail, options)</code></li></ul></li><li><p><strong>参数</strong>：</p><ul><li><code>type</code>： <ul><li>类型：<code>string</code></li><li>事件的名称。</li></ul></li><li><code>detail</code>： <ul><li>类型：<code>*</code></li><li>默认值：<code>undefined</code></li><li>初始化事件时传递的数据。</li></ul></li><li><code>options</code>： <ul><li>类型：<code>CustomEventInit</code></li><li>默认值：<code>{ bubbles：true, cancelable: true, composed: true }</code></li><li>其他事件选项。</li></ul></li></ul></li><li><p><strong>返回值</strong>：</p><ul><li>类型：<code>boolean</code></li><li>结果值。</li></ul></li><li><p><strong>示例</strong>：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> selection</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CropperSelection</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">selection.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$emit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;change&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  x: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  y: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  width: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">160</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  height: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">90</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div></li></ul><p>在当前元素上派发事件。</p><h3 id="nexttick" tabindex="-1">$nextTick <a class="header-anchor" href="#nexttick" aria-label="Permalink to &quot;$nextTick&quot;">​</a></h3><ul><li><strong>语法</strong>： <ul><li><code>$nextTick()</code></li><li><code>$nextTick(callback)</code></li></ul></li><li><strong>参数</strong>： <ul><li><code>callback</code>： <ul><li>类型：<code>Function</code></li><li>在下一个 DOM 更新周期后执行的回调。</li></ul></li></ul></li><li><strong>返回值</strong>： <ul><li>类型：<code>Promise</code></li><li>一个以 <code>undefined</code> 为给定值解析后的 Promise 对象。</li></ul></li></ul><p>推迟到下一个 DOM 更新周期后执行的回调。</p><h2 id="静态属性" tabindex="-1">静态属性 <a class="header-anchor" href="#静态属性" aria-label="Permalink to &quot;静态属性&quot;">​</a></h2><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>$name</td><td><code>string</code></td><td>自定义元素的名称。</td></tr><tr><td>$version</td><td><code>string</code></td><td>安装包的版本。</td></tr></tbody></table><h2 id="静态方法" tabindex="-1">静态方法 <a class="header-anchor" href="#静态方法" aria-label="Permalink to &quot;静态方法&quot;">​</a></h2><h3 id="define" tabindex="-1">$define <a class="header-anchor" href="#define" aria-label="Permalink to &quot;$define&quot;">​</a></h3><p>将构造函数定义为新的自定义元素。这只是调用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define" target="_blank" rel="noreferrer"><code>CustomElementRegistry.define()</code></a> 的快捷方式。</p><ul><li><p><strong>语法</strong>：</p><ul><li><code>$define()</code></li><li><code>$define(name)</code></li><li><code>$define(options)</code></li><li><code>$define(name, options)</code></li></ul></li><li><p><strong>等同于</strong>：</p><ul><li><code>customElements.define(name, constructor)</code></li><li><code>customElements.define(name, constructor, options)</code></li></ul></li><li><p><strong>参数</strong>：</p><ul><li><code>name</code>： <ul><li>类型：<code>string</code></li><li>元素名称。默认为构造函数的 <code>$name</code> 静态属性。</li></ul></li><li><code>options</code>： <ul><li>类型：<code>Object</code></li><li>元素定义选项。</li></ul></li></ul></li><li><p><strong>示例</strong>：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 定义为自主自定义元素：\`&lt;my-cropper-element&gt;&lt;/my-cropper-element&gt;\`.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CropperElement.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$define</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;my-cropper-element&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div></li></ul>`,29)]))}const E=i(l,[["render",n]]);export{c as __pageData,E as default};
