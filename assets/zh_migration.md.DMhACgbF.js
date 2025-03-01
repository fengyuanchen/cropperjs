import{_ as t,c as e,o,ag as c}from"./chunks/framework.CAD6b6pp.js";const h=JSON.parse('{"title":"迁移","description":"","frontmatter":{"sidebar":"auto"},"headers":[],"relativePath":"zh/migration.md","filePath":"zh/migration.md","lastUpdated":1740835647000}'),r={name:"zh/migration.md"};function a(p,d,i,l,n,s){return o(),e("div",null,d[0]||(d[0]=[c('<h1 id="迁移" tabindex="-1">迁移 <a class="header-anchor" href="#迁移" aria-label="Permalink to &quot;迁移&quot;">​</a></h1><h2 id="选项" tabindex="-1">选项 <a class="header-anchor" href="#选项" aria-label="Permalink to &quot;选项&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Cropper.js 1.0</th><th>Cropper.js 2.0</th></tr></thead><tbody><tr><td><code>viewMode</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>transform</code> 事件去<a href="./api/cropper-image.html#限制边界">限制图片边界</a>, 或者改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>change</code> 事件去<a href="./api/cropper-selection.html#限制边界">限制选区边界</a>.</td></tr><tr><td><code>dragMode</code></td><td>改用 <code>&lt;cropper-handle&gt;</code> 元素的 <code>action</code> 属性。</td></tr><tr><td><code>initialAspectRatio</code></td><td>改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>initialAspectRatio</code> 属性。</td></tr><tr><td><code>aspectRatio</code></td><td>改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>aspectRatio</code> 属性。</td></tr><tr><td><code>data</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$setTransform</code> 方法，以及 <code>&lt;cropper-selection&gt;</code> 元素的 <code>x</code>、<code>y</code>、<code>width</code>、<code>height</code> 属性。</td></tr><tr><td><code>preview</code></td><td>改用 <code>&lt;cropper-viewer&gt;</code> 元素。</td></tr><tr><td><code>responsive</code></td><td>已废弃。</td></tr><tr><td><code>restore</code></td><td>已废弃。</td></tr><tr><td><code>checkCrossOrigin</code></td><td>已废弃。</td></tr><tr><td><code>checkOrientation</code></td><td>出于性能原因已废弃。作为替代方案，建议使用第三方库，例如 <a href="https://github.com/blueimp/JavaScript-Load-Image" target="_blank" rel="noreferrer">JavaScript-Load-Image</a>。</td></tr><tr><td><code>modal</code></td><td>改用 <code>&lt;cropper-shade&gt;</code> 元素。</td></tr><tr><td><code>guides</code></td><td>改用 <code>&lt;cropper-grid&gt;</code> 元素。</td></tr><tr><td><code>center</code></td><td>改用 <code>&lt;cropper-crosshair&gt;</code> 元素。</td></tr><tr><td><code>highlight</code></td><td>改用 <code>&lt;cropper-action&gt;</code> 元素。</td></tr><tr><td><code>background</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>background</code> 属性。</td></tr><tr><td><code>autoCrop</code></td><td>改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>initialCoverage</code> 属性。</td></tr><tr><td><code>autoCropArea</code></td><td>改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>initialCoverage</code> 属性。</td></tr><tr><td><code>movable</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>translatable</code> 属性。</td></tr><tr><td><code>rotatable</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>rotatable</code> 属性。</td></tr><tr><td><code>scalable</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>scalable</code> 属性。</td></tr><tr><td><code>zoomable</code></td><td>已废弃。</td></tr><tr><td><code>zoomOnTouch</code></td><td>已废弃。</td></tr><tr><td><code>zoomOnWheel</code></td><td>已废弃。</td></tr><tr><td><code>wheelZoomRatio</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>scaleStep</code> 属性。</td></tr><tr><td><code>cropBoxMovable</code></td><td>改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>movable</code> 属性。</td></tr><tr><td><code>cropBoxResizable</code></td><td>改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>resizable</code> 属性。</td></tr><tr><td><code>toggleDragModeOnDblclick</code></td><td>改用 <code>&lt;cropper-handle&gt;</code> 元素的 <code>dblclick</code> 事件去<a href="./api/cropper-handle.html#toggle-action-on-dblclick">双击切换动作类型</a>。</td></tr><tr><td><code>minContainerWidth</code></td><td>已废弃。</td></tr><tr><td><code>minContainerHeight</code></td><td>已废弃。</td></tr><tr><td><code>minCanvasWidth</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>min-width</code> CSS 属性。</td></tr><tr><td><code>minCanvasHeight</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>min-height</code> CSS 属性。</td></tr><tr><td><code>minCropBoxWidth</code></td><td>改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>min-width</code> CSS 属性。</td></tr><tr><td><code>minCropBoxHeight</code></td><td>改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>min-height</code> CSS 属性。</td></tr><tr><td><code>ready</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$ready</code> 方法。</td></tr><tr><td><code>cropstart</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>actionstart</code> 事件。</td></tr><tr><td><code>cropmove</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>actionmove</code> 事件。</td></tr><tr><td><code>cropend</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>actionend</code> 事件。</td></tr><tr><td><code>crop</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>action</code> 事件。</td></tr><tr><td><code>zoom</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>action</code> 事件。</td></tr></tbody></table><h2 id="方法" tabindex="-1">方法 <a class="header-anchor" href="#方法" aria-label="Permalink to &quot;方法&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Cropper.js 1.0</th><th>Cropper.js 2.0</th></tr></thead><tbody><tr><td><code>crop</code></td><td>改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>$change</code> 方法。</td></tr><tr><td><code>reset</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$resetTransform</code> 方法，以及 <code>&lt;cropper-selection&gt;</code> 元素的 <code>$reset</code> 方法。</td></tr><tr><td><code>clear</code></td><td>改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>$reset</code> 方法和 <code>hidden</code> 属性。</td></tr><tr><td><code>replace</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>src</code> 属性。</td></tr><tr><td><code>enable</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>disabled</code> 属性。</td></tr><tr><td><code>disable</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>disabled</code> 属性。</td></tr><tr><td><code>destroy</code></td><td>已废弃。直接从 DOM 中删除所有 Cropper 元素。</td></tr><tr><td><code>move</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$move</code> 方法。</td></tr><tr><td><code>moveTo</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$moveTo</code> 方法。</td></tr><tr><td><code>zoom</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$scale</code> 方法。</td></tr><tr><td><code>zoomTo</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$setTransform</code> 方法。</td></tr><tr><td><code>rotate</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$rotate</code> 方法。</td></tr><tr><td><code>rotateTo</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$setTransform</code> 方法。</td></tr><tr><td><code>scale</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$scale</code> 方法。</td></tr><tr><td><code>scaleX</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$scale</code> 方法。</td></tr><tr><td><code>scaleY</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$scale</code> 方法。</td></tr><tr><td><code>getData</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$getTransform</code> 方法，以及 <code>&lt;cropper-selection&gt;</code> 元素的 <code>x</code>、<code>y</code>、<code>width</code>、<code>height</code> 属性。</td></tr><tr><td><code>setData</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$setTransform</code> 方法，以及 <code>&lt;cropper-selection&gt;</code> 元素的 <code>x</code>、<code>y</code>、<code>width</code>、<code>height</code> 属性。</td></tr><tr><td><code>getContainerData</code></td><td>已废弃。</td></tr><tr><td><code>getImageData</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$getTransform</code> 方法。</td></tr><tr><td><code>getCanvasData</code></td><td>已废弃。</td></tr><tr><td><code>setCanvasData</code></td><td>已废弃。</td></tr><tr><td><code>getCropBoxData</code></td><td>改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>x</code>、<code>y</code>、<code>width</code>、<code>height</code> 属性。</td></tr><tr><td><code>setCropBoxData</code></td><td>改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>x</code>、<code>y</code>、<code>width</code>、<code>height</code> 属性。</td></tr><tr><td><code>getCroppedCanvas</code></td><td>改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>$toCanvas</code> 方法。</td></tr><tr><td><code>setAspectRatio</code></td><td>改用 <code>&lt;cropper-selection&gt;</code> 元素的 <code>aspectRatio</code> 属性。</td></tr><tr><td><code>setDragMode</code></td><td>改用 <code>&lt;cropper-handle&gt;</code> 元素的 <code>action</code> 属性。</td></tr></tbody></table><h2 id="事件" tabindex="-1">事件 <a class="header-anchor" href="#事件" aria-label="Permalink to &quot;事件&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Cropper.js 1.0</th><th>Cropper.js 2.0</th></tr></thead><tbody><tr><td><code>ready</code></td><td>改用 <code>&lt;cropper-image&gt;</code> 元素的 <code>$ready</code> 方法。</td></tr><tr><td><code>cropstart</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>actionstart</code> 事件。</td></tr><tr><td><code>cropmove</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>actionmove</code> 事件。</td></tr><tr><td><code>cropend</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>actionend</code> 事件。</td></tr><tr><td><code>crop</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>action</code> 事件。</td></tr><tr><td><code>zoom</code></td><td>改用 <code>&lt;cropper-canvas&gt;</code> 元素的 <code>action</code> 事件。</td></tr></tbody></table>',7)]))}const m=t(r,[["render",a]]);export{h as __pageData,m as default};
