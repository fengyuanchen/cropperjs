## 2.1.0 (2025-10-19)

* docs: fix value of free aspect ratio ([5b4e96f](https://github.com/fengyuanchen/cropperjs/commit/5b4e96f)), closes [#1274](https://github.com/fengyuanchen/cropperjs/issues/1274)
* refactor(element-shade): use selection itself when default prevented ([0673f15](https://github.com/fengyuanchen/cropperjs/commit/0673f15))
* fix(element-image): ensure the image is fully rendered ([5afd8f3](https://github.com/fengyuanchen/cropperjs/commit/5afd8f3)), closes [#1168](https://github.com/fengyuanchen/cropperjs/issues/1168)
* fix(element-selection): get correct event target in shadow DOM (#1276) ([e64d6c3](https://github.com/fengyuanchen/cropperjs/commit/e64d6c3)), closes [#1276](https://github.com/fengyuanchen/cropperjs/issues/1276)
* fix(element-shade): fix shade size when selection changes ([98c101c](https://github.com/fengyuanchen/cropperjs/commit/98c101c))
* fix(element): call `attachShadow` only if `shadowRoot` does not exist ([75cabcf](https://github.com/fengyuanchen/cropperjs/commit/75cabcf)), closes [#1217](https://github.com/fengyuanchen/cropperjs/issues/1217)
* feat(cropperjs): add `destroy` method ([6a933e3](https://github.com/fengyuanchen/cropperjs/commit/6a933e3)), closes [#1271](https://github.com/fengyuanchen/cropperjs/issues/1271)



## <small>2.0.1 (2025-07-25)</small>

* build: add missing `/dist` paths ([42dba8b](https://github.com/fengyuanchen/cropperjs/commit/42dba8b))
* build: release v2.0.1 ([6b8e5ff](https://github.com/fengyuanchen/cropperjs/commit/6b8e5ff))
* fix: correct require.node.default export and explicitly export package.json (#1259) ([97f8787](https://github.com/fengyuanchen/cropperjs/commit/97f8787)), closes [#1259](https://github.com/fengyuanchen/cropperjs/issues/1259)
* fix: set crossorigin attribute on cropper image element (#1253) ([f11026c](https://github.com/fengyuanchen/cropperjs/commit/f11026c)), closes [#1253](https://github.com/fengyuanchen/cropperjs/issues/1253)
* fix(cropper-selection): improve selection movement logic for better user experience ([e7e3510](https://github.com/fengyuanchen/cropperjs/commit/e7e3510))
* fix(cropperjs): fix container query issue when in a custom element ([4fea6fd](https://github.com/fengyuanchen/cropperjs/commit/4fea6fd))
* fix(cropperjs): inherit additional attributes from HTMLImageElement ([cb5a341](https://github.com/fengyuanchen/cropperjs/commit/cb5a341))
* fix(element-image): add missing attributes (type declarations) ([2e46715](https://github.com/fengyuanchen/cropperjs/commit/2e46715)), closes [#1233](https://github.com/fengyuanchen/cropperjs/issues/1233)
* fix(element-shade): get data from `event.detail` when the selection is  dynamic ([f6b2847](https://github.com/fengyuanchen/cropperjs/commit/f6b2847))
* fix(element-shade): get data from `event.detail` when there are multiple selections ([09fd9ca](https://github.com/fengyuanchen/cropperjs/commit/09fd9ca))
* fix(element-shade): prevent shade from "glitching" when pulling selection too far (#1242) ([2dab6ff](https://github.com/fengyuanchen/cropperjs/commit/2dab6ff)), closes [#1242](https://github.com/fengyuanchen/cropperjs/issues/1242) [#1078](https://github.com/fengyuanchen/cropperjs/issues/1078)
* fix(element-viewer): fix selection query issue when in a custom element ([aecee79](https://github.com/fengyuanchen/cropperjs/commit/aecee79)), closes [#1245](https://github.com/fengyuanchen/cropperjs/issues/1245)
* fix(element-viewer): transform the image by the selection offset after the next DOM update cycle ([04a2c8b](https://github.com/fengyuanchen/cropperjs/commit/04a2c8b)), closes [#1258](https://github.com/fengyuanchen/cropperjs/issues/1258)
* test(cropper): remove support for HTMLCanvasElement and improve container handling in tests ([91d5ab3](https://github.com/fengyuanchen/cropperjs/commit/91d5ab3))
* test(cropperjs): add container option to `getCropperSelections` test ([69a0ab6](https://github.com/fengyuanchen/cropperjs/commit/69a0ab6))
* refactor(element-shade): rename selection event handler for better readability ([c960217](https://github.com/fengyuanchen/cropperjs/commit/c960217))
* docs: explain that jQuery Cropper only available for Cropper.js 1.0 now ([3df9b20](https://github.com/fengyuanchen/cropperjs/commit/3df9b20))



## 2.0.0 (2025-03-01)

* build: config issue template ([649b2fa](https://github.com/fengyuanchen/cropperjs/commit/649b2fa))
* build: prepare v2 stable version ([ae55bdf](https://github.com/fengyuanchen/cropperjs/commit/ae55bdf))
* build: release v2.0.0 ([08a3d16](https://github.com/fengyuanchen/cropperjs/commit/08a3d16))
* build: update dependencies ([56cef09](https://github.com/fengyuanchen/cropperjs/commit/56cef09))
* build: update issue template for bug reports ([dc09c90](https://github.com/fengyuanchen/cropperjs/commit/dc09c90))
* build: update repo urls ([2bee699](https://github.com/fengyuanchen/cropperjs/commit/2bee699))
* ci: fix file path ([c13c162](https://github.com/fengyuanchen/cropperjs/commit/c13c162))
* ci: update action version ([0bb45db](https://github.com/fengyuanchen/cropperjs/commit/0bb45db))
* docs(element-canvas): except the `"scale"` option for the `event.detail.action` of actionstart/move/ ([c778cb6](https://github.com/fengyuanchen/cropperjs/commit/c778cb6))



## 2.0.0-rc.2 (2024-08-18)

* build: release v2.0.0-rc.2 ([396f2c7](https://github.com/fengyuanchen/cropperjs/commit/396f2c7))
* fix(element-selection): disable keyboard control when input something ([af97972](https://github.com/fengyuanchen/cropperjs/commit/af97972)), closes [#1192](https://github.com/fengyuanchen/cropperjs/issues/1192)



## 2.0.0-rc.1 (2024-07-06)

* build: ignore `docs/public/service-worker.js` file ([d9cff71](https://github.com/fengyuanchen/cropperjs/commit/d9cff71))
* build: release 2.0.0-rc.1 ([1a290d5](https://github.com/fengyuanchen/cropperjs/commit/1a290d5))
* docs: add version info and changelog link ([4281c7f](https://github.com/fengyuanchen/cropperjs/commit/4281c7f))
* docs: unregister service worker ([236d155](https://github.com/fengyuanchen/cropperjs/commit/236d155))
* docs(element-selection): add dynamic changes example ([3b853fb](https://github.com/fengyuanchen/cropperjs/commit/3b853fb))
* fix(element-image): zoom when the selection is both zoomable and dynamic ([0193036](https://github.com/fengyuanchen/cropperjs/commit/0193036))
* fix(element-selection): backward compatible with `linked="true"` only ([64e2714](https://github.com/fengyuanchen/cropperjs/commit/64e2714))
* fix(element-selection): fix wrong action end listener ([5f764a1](https://github.com/fengyuanchen/cropperjs/commit/5f764a1))
* refactor(cropperjs): disable zoomable by default ([f63e55d](https://github.com/fengyuanchen/cropperjs/commit/f63e55d))
* feat(element-selection): pass zoom events down to image when selection is not zoomable ([3aa7ff4](https://github.com/fengyuanchen/cropperjs/commit/3aa7ff4)), closes [#1182](https://github.com/fengyuanchen/cropperjs/issues/1182)



## 2.0.0-rc.0 (2024-06-22)

* build: release 2.0.0-rc.0 ([08368f1](https://github.com/fengyuanchen/cropperjs/commit/08368f1))
* build: update dependencies ([b9719fe](https://github.com/fengyuanchen/cropperjs/commit/b9719fe))
* refactor(element-selection): backward compatible with 2.0.0-rc for the `linked` property ([0a931ed](https://github.com/fengyuanchen/cropperjs/commit/0a931ed))
* refactor(element-selection): simplify the `$handleAction` function ([388c71a](https://github.com/fengyuanchen/cropperjs/commit/388c71a))
* fix(element-selection): fix select action interaction ([a0ad269](https://github.com/fengyuanchen/cropperjs/commit/a0ad269)), closes [#1176](https://github.com/fengyuanchen/cropperjs/issues/1176)
* fix(element-selection): fix wrong event to read `shiftKey` ([206d2b4](https://github.com/fengyuanchen/cropperjs/commit/206d2b4))
* fix(element-selection): reset the `initialCoverage` property to its initial value when creating new  ([57e2688](https://github.com/fengyuanchen/cropperjs/commit/57e2688))
* perf(element-selection): Avoid repeatedly calling the `$change` method ([a99a5bd](https://github.com/fengyuanchen/cropperjs/commit/a99a5bd))
* refactor(element-selection)!: rename the `linked` property to `dynamic` and disable it by default ([8a005ab](https://github.com/fengyuanchen/cropperjs/commit/8a005ab)), closes [#1175](https://github.com/fengyuanchen/cropperjs/issues/1175)
* docs(element-handle): add example for toggling action on dblclick ([1829c23](https://github.com/fengyuanchen/cropperjs/commit/1829c23))



## 2.0.0-rc (2024-05-26)

* build: add `--host` argument to `vitepress` script ([d8bd0dd](https://github.com/fengyuanchen/cropperjs/commit/d8bd0dd))
* build: add publish script ([23bfd85](https://github.com/fengyuanchen/cropperjs/commit/23bfd85))
* build: release 2.0.0-rc ([7027554](https://github.com/fengyuanchen/cropperjs/commit/7027554))
* build: update dependencies ([8819476](https://github.com/fengyuanchen/cropperjs/commit/8819476))
* test: update test cases ([b58ecd6](https://github.com/fengyuanchen/cropperjs/commit/b58ecd6))
* fix: disable callout in webkit-based browsers ([851bd70](https://github.com/fengyuanchen/cropperjs/commit/851bd70)), closes [#1108](https://github.com/fengyuanchen/cropperjs/issues/1108)
* fix(element-selection): observe the `linked` property ([7075bfe](https://github.com/fengyuanchen/cropperjs/commit/7075bfe))
* fix(element-selection): resize when initial coverage change ([2c75cd9](https://github.com/fengyuanchen/cropperjs/commit/2c75cd9))
* docs: fix TypeError when cropperCanvas is null ([6799b61](https://github.com/fengyuanchen/cropperjs/commit/6799b61))
* docs: outline level 3 titles ([9dbc0d8](https://github.com/fengyuanchen/cropperjs/commit/9dbc0d8))
* docs: outline level 3 titles for zh lang ([f4f1ec9](https://github.com/fengyuanchen/cropperjs/commit/f4f1ec9))
* docs: replace `withBase` with `BASE_URL` ([b8c8a51](https://github.com/fengyuanchen/cropperjs/commit/b8c8a51))
* docs: update migration for the `viewMode` option ([e3c7ab7](https://github.com/fengyuanchen/cropperjs/commit/e3c7ab7))
* docs(cropperjs): improve basic example ([464d6ab](https://github.com/fengyuanchen/cropperjs/commit/464d6ab))
* docs(element-image): add limiting boundaries example ([f022d68](https://github.com/fengyuanchen/cropperjs/commit/f022d68))
* docs(element-selection): add example for limiting boundaries ([d5068b8](https://github.com/fengyuanchen/cropperjs/commit/d5068b8))
* docs(element-selection): improve limiting boundaries example ([4e09be6](https://github.com/fengyuanchen/cropperjs/commit/4e09be6))
* docs(element-shade): change the `x` property values in the demo ([1c004a3](https://github.com/fengyuanchen/cropperjs/commit/1c004a3))
* feat(element-image): add new `initial-center-size` property ([daccbfb](https://github.com/fengyuanchen/cropperjs/commit/daccbfb)), closes [#1105](https://github.com/fengyuanchen/cropperjs/issues/1105)
* feat(element-selection): add new `linked` property ([1851f25](https://github.com/fengyuanchen/cropperjs/commit/1851f25)), closes [#1133](https://github.com/fengyuanchen/cropperjs/issues/1133)
* feat(element-selection): make the `x`, `y`, `width`, `height`, `aspect-ratio`, `initial-aspect-ratio ([ce3c6d3](https://github.com/fengyuanchen/cropperjs/commit/ce3c6d3)), closes [#1124](https://github.com/fengyuanchen/cropperjs/issues/1124) [#1163](https://github.com/fengyuanchen/cropperjs/issues/1163) [#1164](https://github.com/fengyuanchen/cropperjs/issues/1164) [#1165](https://github.com/fengyuanchen/cropperjs/issues/1165)
* refactor: drop unnecessary type definitions ([7fc90e7](https://github.com/fengyuanchen/cropperjs/commit/7fc90e7))
* refactor(element-grid): render grid in next tick ([aad0bde](https://github.com/fengyuanchen/cropperjs/commit/aad0bde))
* refactor(element-image): change the default value of the `rotatable`, `scalable`, `skewable`, `trans ([1b5992e](https://github.com/fengyuanchen/cropperjs/commit/1b5992e))
* refactor(element-image): use a copy of the internal matrix for avoiding side effects ([9761125](https://github.com/fengyuanchen/cropperjs/commit/9761125))



## 2.0.0-beta.5 (2024-04-21)

* build: release 2.0.0-beta.5 ([8e1b201](https://github.com/fengyuanchen/cropperjs/commit/8e1b201))
* build: update dependencies ([739ceb1](https://github.com/fengyuanchen/cropperjs/commit/739ceb1))
* build: upgrade to vitepress 1.1.3 ([37e48d2](https://github.com/fengyuanchen/cropperjs/commit/37e48d2))
* docs: add reset all feature ([7a204ae](https://github.com/fengyuanchen/cropperjs/commit/7a204ae))
* docs: drop useless images ([7b69e39](https://github.com/fengyuanchen/cropperjs/commit/7b69e39))
* docs: update theme variables ([3a6e2f4](https://github.com/fengyuanchen/cropperjs/commit/3a6e2f4))
* docs(cropperjs): add exported modules section ([5b6ed96](https://github.com/fengyuanchen/cropperjs/commit/5b6ed96))
* feat: export `DEFAULT_TEMPLATE` (#1156) ([2208e73](https://github.com/fengyuanchen/cropperjs/commit/2208e73)), closes [#1156](https://github.com/fengyuanchen/cropperjs/issues/1156)
* feat(cropper-selection): add `$clear` method and improve  `$reset` method (#1157) ([8e6dbb0](https://github.com/fengyuanchen/cropperjs/commit/8e6dbb0)), closes [#1157](https://github.com/fengyuanchen/cropperjs/issues/1157)
* refactor: change  the translateY calculation to avoid side effects ([4d2665e](https://github.com/fengyuanchen/cropperjs/commit/4d2665e)), closes [#1152](https://github.com/fengyuanchen/cropperjs/issues/1152)
* refactor(cropper-viewer): fallback to canvas if the selection is invalid ([4e4ce43](https://github.com/fengyuanchen/cropperjs/commit/4e4ce43))
* refactor(cropperjs): add missing semicolon and move position ([003ffa0](https://github.com/fengyuanchen/cropperjs/commit/003ffa0))
* fix(cropper-viewer): calculate translateY correctly when rotated 90deg (#1152) ([2dea551](https://github.com/fengyuanchen/cropperjs/commit/2dea551)), closes [#1152](https://github.com/fengyuanchen/cropperjs/issues/1152) [#1031](https://github.com/fengyuanchen/cropperjs/issues/1031)



## 2.0.0-beta.4 (2023-08-20)

* build: release 2.0.0-beta.4 ([163b419](https://github.com/fengyuanchen/cropperjs/commit/163b419))
* build: update dependencies ([76f9874](https://github.com/fengyuanchen/cropperjs/commit/76f9874))
* refactor(cropper-selection): improve selection switching UX ([e440638](https://github.com/fengyuanchen/cropperjs/commit/e440638))
* docs: drop the `manifest.webmanifest.json` file ([684bbe4](https://github.com/fengyuanchen/cropperjs/commit/684bbe4))
* docs(cropper-selection): improve multiple selections demo ([8460a97](https://github.com/fengyuanchen/cropperjs/commit/8460a97))
* ci: remove v2 directory before copy files ([25d64bf](https://github.com/fengyuanchen/cropperjs/commit/25d64bf))
* ci: use node 18 ([6f27efa](https://github.com/fengyuanchen/cropperjs/commit/6f27efa))
* fix(cropper-image): make it a block element to avoid side effects ([c3d94fc](https://github.com/fengyuanchen/cropperjs/commit/c3d94fc)), closes [#1074](https://github.com/fengyuanchen/cropperjs/issues/1074)
* fix(cropper-selection): change inactive selections synchronously when scaling ([2e8d67f](https://github.com/fengyuanchen/cropperjs/commit/2e8d67f))
* fix(cropper-selection): improve  interaction between multiple selections ([f2bd525](https://github.com/fengyuanchen/cropperjs/commit/f2bd525)), closes [#1044](https://github.com/fengyuanchen/cropperjs/issues/1044) [#1061](https://github.com/fengyuanchen/cropperjs/issues/1061)



## 2.0.0-beta.3 (2023-06-18)

* build: release 2.0.0-beta.3 ([3bbcba4](https://github.com/fengyuanchen/cropperjs/commit/3bbcba4))
* build: update dependencies ([c015559](https://github.com/fengyuanchen/cropperjs/commit/c015559))
* build: update dependencies ([f69579c](https://github.com/fengyuanchen/cropperjs/commit/f69579c))
* style: fix jsdoc comments ([16447cf](https://github.com/fengyuanchen/cropperjs/commit/16447cf))
* style: sort order by stylelint ([3698074](https://github.com/fengyuanchen/cropperjs/commit/3698074))
* docs: add missing page title ([b9bc75c](https://github.com/fengyuanchen/cropperjs/commit/b9bc75c))
* docs: migrate Vuepress to Vitepress ([cb1425d](https://github.com/fengyuanchen/cropperjs/commit/cb1425d))
* fix: blur the removing selection to avoid side-effects ([0a334d9](https://github.com/fengyuanchen/cropperjs/commit/0a334d9)), closes [#1022](https://github.com/fengyuanchen/cropperjs/issues/1022)



## 2.0.0-beta.2 (2022-12-04)

* build: add missing config for eslint ([0dbf411](https://github.com/fengyuanchen/cropperjs/commit/0dbf411))
* build: release 2.0.0-beta.2 ([78de561](https://github.com/fengyuanchen/cropperjs/commit/78de561))
* build: update config files ([5a71ee5](https://github.com/fengyuanchen/cropperjs/commit/5a71ee5))
* build: update dependencies ([2ca9013](https://github.com/fengyuanchen/cropperjs/commit/2ca9013))
* refactor: extract matrices multiplying as a utility function ([d21e093](https://github.com/fengyuanchen/cropperjs/commit/d21e093))
* refactor: fix an eslint error ([c7c786a](https://github.com/fengyuanchen/cropperjs/commit/c7c786a))
* refactor: improve the `$toCanvas` method for better image quality ([6365ab7](https://github.com/fengyuanchen/cropperjs/commit/6365ab7))
* refactor(element-select): improve move interaction ([91907d8](https://github.com/fengyuanchen/cropperjs/commit/91907d8))
* refactor(element-selection): improve code style ([0164109](https://github.com/fengyuanchen/cropperjs/commit/0164109))
* test: add test cases for `multiplyMatrices` function ([8b327f5](https://github.com/fengyuanchen/cropperjs/commit/8b327f5))
* fix(element-image): ignore selection move action ([c2aa7d9](https://github.com/fengyuanchen/cropperjs/commit/c2aa7d9)), closes [#985](https://github.com/fengyuanchen/cropperjs/issues/985)
* docs: add missing slash ([888f001](https://github.com/fengyuanchen/cropperjs/commit/888f001))
* docs: add zh locale ([fb227b3](https://github.com/fengyuanchen/cropperjs/commit/fb227b3))
* docs: improve colors in drak mode ([b0f6f9e](https://github.com/fengyuanchen/cropperjs/commit/b0f6f9e))



## 2.0.0-beta.1 (2022-06-19)

* build: add entry file for unpkg and jsdelivr ([7303dad](https://github.com/fengyuanchen/cropperjs/commit/7303dad))
* build: release 2.0.0-beta.1 ([f9b7e9f](https://github.com/fengyuanchen/cropperjs/commit/f9b7e9f))
* fix: refresh viewer when the source image changed ([ab866e4](https://github.com/fengyuanchen/cropperjs/commit/ab866e4)), closes [#940](https://github.com/fengyuanchen/cropperjs/issues/940)
* fix(element-canvas): correct the opposite scale direction ([9616427](https://github.com/fengyuanchen/cropperjs/commit/9616427))
* fix(element-selection): correct canvas drawing position ([2604d15](https://github.com/fengyuanchen/cropperjs/commit/2604d15)), closes [#939](https://github.com/fengyuanchen/cropperjs/issues/939)
* docs: drop unbubbled `load` events ([e2cc34c](https://github.com/fengyuanchen/cropperjs/commit/e2cc34c))



## 2.0.0-beta (2022-05-01)

* build: 简化 husky 命令 ([eaf868a](https://github.com/fengyuanchen/cropperjs/commit/eaf868a))
* build: add jsdoc plugin for eslint ([5dfd4fc](https://github.com/fengyuanchen/cropperjs/commit/5dfd4fc))
* build: clean up files for next version ([ae5733a](https://github.com/fengyuanchen/cropperjs/commit/ae5733a))
* build: collect elements and helpers ([d38171d](https://github.com/fengyuanchen/cropperjs/commit/d38171d))
* build: correct repo name ([1c89d5e](https://github.com/fengyuanchen/cropperjs/commit/1c89d5e))
* build: improve bundled files ([851afff](https://github.com/fengyuanchen/cropperjs/commit/851afff))
* build: improve config ([a4de3d4](https://github.com/fengyuanchen/cropperjs/commit/a4de3d4))
* build: init ([0e279f7](https://github.com/fengyuanchen/cropperjs/commit/0e279f7))
* build: migrate VuePress from v1 to v2 ([25d4437](https://github.com/fengyuanchen/cropperjs/commit/25d4437))
* build: move `isCustomElement` into compilerOptions ([213151e](https://github.com/fengyuanchen/cropperjs/commit/213151e))
* build: move up the `version` field ([4c55115](https://github.com/fengyuanchen/cropperjs/commit/4c55115))
* build: process inline css with postcss ([67156c1](https://github.com/fengyuanchen/cropperjs/commit/67156c1))
* build: release 2.0.0-beta ([f13e2bd](https://github.com/fengyuanchen/cropperjs/commit/f13e2bd))
* build: separate config into files ([3dd7146](https://github.com/fengyuanchen/cropperjs/commit/3dd7146))
* build: simplify config ([9a7f8c9](https://github.com/fengyuanchen/cropperjs/commit/9a7f8c9))
* build: simplify configurations ([134558c](https://github.com/fengyuanchen/cropperjs/commit/134558c))
* build: update ([83bd87f](https://github.com/fengyuanchen/cropperjs/commit/83bd87f))
* build: update ([609a28e](https://github.com/fengyuanchen/cropperjs/commit/609a28e))
* build: update ([b9ff6fd](https://github.com/fengyuanchen/cropperjs/commit/b9ff6fd))
* build: update ([6f9bcb3](https://github.com/fengyuanchen/cropperjs/commit/6f9bcb3))
* build: update ([7118faa](https://github.com/fengyuanchen/cropperjs/commit/7118faa))
* build: update ([406a552](https://github.com/fengyuanchen/cropperjs/commit/406a552))
* build: update ([c70464b](https://github.com/fengyuanchen/cropperjs/commit/c70464b))
* build: update ([3caf1cb](https://github.com/fengyuanchen/cropperjs/commit/3caf1cb))
* build: update ([97b08c2](https://github.com/fengyuanchen/cropperjs/commit/97b08c2))
* build: update ([d436531](https://github.com/fengyuanchen/cropperjs/commit/d436531))
* build: update ([d924b38](https://github.com/fengyuanchen/cropperjs/commit/d924b38))
* build: update ([cf2b11d](https://github.com/fengyuanchen/cropperjs/commit/cf2b11d))
* build: update ([c9bb962](https://github.com/fengyuanchen/cropperjs/commit/c9bb962))
* build: update ([77aac17](https://github.com/fengyuanchen/cropperjs/commit/77aac17))
* build: update building temp folder ([cef7b20](https://github.com/fengyuanchen/cropperjs/commit/cef7b20))
* build: update dependencies ([a76bb77](https://github.com/fengyuanchen/cropperjs/commit/a76bb77))
* build: update dependencies ([f7a60c5](https://github.com/fengyuanchen/cropperjs/commit/f7a60c5))
* build: update dependencies ([9c0d861](https://github.com/fengyuanchen/cropperjs/commit/9c0d861))
* build: update dependencies ([dcc47ca](https://github.com/fengyuanchen/cropperjs/commit/dcc47ca))
* build: update dependencies ([f4c2cfc](https://github.com/fengyuanchen/cropperjs/commit/f4c2cfc))
* build: update dependencies ([b66aeaa](https://github.com/fengyuanchen/cropperjs/commit/b66aeaa))
* build: update dependencies ([3dc8045](https://github.com/fengyuanchen/cropperjs/commit/3dc8045))
* build: update dependencies ([b4315fe](https://github.com/fengyuanchen/cropperjs/commit/b4315fe))
* build: update dependencies ([4e2e5e0](https://github.com/fengyuanchen/cropperjs/commit/4e2e5e0))
* build: update dependencies ([e073100](https://github.com/fengyuanchen/cropperjs/commit/e073100))
* build: update dependencies ([69f28ab](https://github.com/fengyuanchen/cropperjs/commit/69f28ab))
* build: update dev dependencies ([3cc1bbc](https://github.com/fengyuanchen/cropperjs/commit/3cc1bbc))
* build: update huksy commands ([c9db707](https://github.com/fengyuanchen/cropperjs/commit/c9db707))
* build: upgrade husky from v4 to v6 ([c597d90](https://github.com/fengyuanchen/cropperjs/commit/c597d90))
* build: upgrade jest to v27 ([b9d9e84](https://github.com/fengyuanchen/cropperjs/commit/b9d9e84))
* build: upgrade vuepress ([526b3fa](https://github.com/fengyuanchen/cropperjs/commit/526b3fa))
* build: upgrade vuepress to v2.0.0-beta.18 ([15b9e8a](https://github.com/fengyuanchen/cropperjs/commit/15b9e8a))
* build: use jsdom as test environment ([4f5e8b8](https://github.com/fengyuanchen/cropperjs/commit/4f5e8b8))
* build(docs): use webpack as bundler ([5b836b6](https://github.com/fengyuanchen/cropperjs/commit/5b836b6))
* fix: import type only ([590b83e](https://github.com/fengyuanchen/cropperjs/commit/590b83e))
* fix: improve size adjusting ([abbdb54](https://github.com/fengyuanchen/cropperjs/commit/abbdb54))
* fix: make the focusing in selection actionable ([a20c30b](https://github.com/fengyuanchen/cropperjs/commit/a20c30b))
* fix: remove event listeners when disconnected ([d712947](https://github.com/fengyuanchen/cropperjs/commit/d712947))
* fix(cropperjs): add missing initial attribute ([81c6d49](https://github.com/fengyuanchen/cropperjs/commit/81c6d49))
* fix(element-canvas): add missing attribute to observe ([87fed15](https://github.com/fengyuanchen/cropperjs/commit/87fed15))
* fix(element-canvas): fix type and add missing doc ([af831eb](https://github.com/fengyuanchen/cropperjs/commit/af831eb))
* fix(element-selection): drop incorrect code ([039700f](https://github.com/fengyuanchen/cropperjs/commit/039700f))
* fix(element-selection): update `active` when `multiple`  changed ([c36b026](https://github.com/fengyuanchen/cropperjs/commit/c36b026))
* fix(element-shade): toggle only when the action is select ([34775ff](https://github.com/fengyuanchen/cropperjs/commit/34775ff))
* fix(element): drop `$name`'s value to avoid side effects ([97c0c60](https://github.com/fengyuanchen/cropperjs/commit/97c0c60))
* docs: add base URL ([8f47524](https://github.com/fengyuanchen/cropperjs/commit/8f47524))
* docs: add logo, icons, and PWA support ([3759090](https://github.com/fengyuanchen/cropperjs/commit/3759090))
* docs: add specifications for implementing `CropperElement` ([cd9376a](https://github.com/fengyuanchen/cropperjs/commit/cd9376a))
* docs: change the status of the `cropper` library ([d5ec64e](https://github.com/fengyuanchen/cropperjs/commit/d5ec64e))
* docs: drop build status badge ([cac5340](https://github.com/fengyuanchen/cropperjs/commit/cac5340))
* docs: drop examples ([c3552bf](https://github.com/fengyuanchen/cropperjs/commit/c3552bf))
* docs: drop examples links ([129be1a](https://github.com/fengyuanchen/cropperjs/commit/129be1a))
* docs: fix brand colors ([17553de](https://github.com/fengyuanchen/cropperjs/commit/17553de))
* docs: fix paths of the images ([618dcfd](https://github.com/fengyuanchen/cropperjs/commit/618dcfd))
* docs: fix site link and add branch hint ([95db2de](https://github.com/fengyuanchen/cropperjs/commit/95db2de))
* docs: fix typo ([5052de9](https://github.com/fengyuanchen/cropperjs/commit/5052de9))
* docs: fix typos ([bc50442](https://github.com/fengyuanchen/cropperjs/commit/bc50442))
* docs: fix typos ([cbf4691](https://github.com/fengyuanchen/cropperjs/commit/cbf4691))
* docs: improve ([062c65a](https://github.com/fengyuanchen/cropperjs/commit/062c65a))
* docs: improve components and cofigurations ([6cf6573](https://github.com/fengyuanchen/cropperjs/commit/6cf6573))
* docs: improve content ([d5d1d57](https://github.com/fengyuanchen/cropperjs/commit/d5d1d57))
* docs: improve demo code ([8a2f374](https://github.com/fengyuanchen/cropperjs/commit/8a2f374))
* docs: improve distribution files title ([9a67f46](https://github.com/fengyuanchen/cropperjs/commit/9a67f46))
* docs: improve playground ([662acfc](https://github.com/fengyuanchen/cropperjs/commit/662acfc))
* docs: integrate Google Analytics ([62128b4](https://github.com/fengyuanchen/cropperjs/commit/62128b4))
* docs: keep the attributes the same as the template's ([1b5e5e9](https://github.com/fengyuanchen/cropperjs/commit/1b5e5e9))
* docs: resolve console error messages ([a8c1177](https://github.com/fengyuanchen/cropperjs/commit/a8c1177))
* docs: simplify folders and content ([a82f30c](https://github.com/fengyuanchen/cropperjs/commit/a82f30c))
* docs: update repo settings ([5dfa12d](https://github.com/fengyuanchen/cropperjs/commit/5dfa12d))
* feat: add `$getTagNameOf` method to get real tag name ([cfc3a41](https://github.com/fengyuanchen/cropperjs/commit/cfc3a41))
* feat: add some methods to Cropper interface ([1428e8c](https://github.com/fengyuanchen/cropperjs/commit/1428e8c))
* feat: allow to zoom image and selection together ([a8dcbe7](https://github.com/fengyuanchen/cropperjs/commit/a8dcbe7))
* feat: support two-finger touch rotation ([0b3f262](https://github.com/fengyuanchen/cropperjs/commit/0b3f262))
* feat(cropper-image): support to rotate by offset ([1993e2e](https://github.com/fengyuanchen/cropperjs/commit/1993e2e))
* feat(element-canvas): add 2 options to `$toCanvas` ([8f9e21e](https://github.com/fengyuanchen/cropperjs/commit/8f9e21e))
* feat(element-selection): add 2 options to $toCanvas ([e3cdfd9](https://github.com/fengyuanchen/cropperjs/commit/e3cdfd9))
* feat(types): add `Selection` interface ([51855c4](https://github.com/fengyuanchen/cropperjs/commit/51855c4))
* ci: add deploy.yml ([05762c1](https://github.com/fengyuanchen/cropperjs/commit/05762c1))
* ci: add v2 dir only ([c7b6b1c](https://github.com/fengyuanchen/cropperjs/commit/c7b6b1c))
* ci: exclude v2.0.0-alpha* ([33ed5de](https://github.com/fengyuanchen/cropperjs/commit/33ed5de))
* ci: improve ci workflow ([9755862](https://github.com/fengyuanchen/cropperjs/commit/9755862))
* style: add note comment ([7af366f](https://github.com/fengyuanchen/cropperjs/commit/7af366f))
* style: drop useless parameter ([7f6a2eb](https://github.com/fengyuanchen/cropperjs/commit/7f6a2eb))
* style: fix eslint errors ([44b867c](https://github.com/fengyuanchen/cropperjs/commit/44b867c))
* style: fix eslint errors ([cd04646](https://github.com/fengyuanchen/cropperjs/commit/cd04646))
* style: fix stylelint errors ([0730dec](https://github.com/fengyuanchen/cropperjs/commit/0730dec))
*  ci: create directory first if it does not exist ([52871bb](https://github.com/fengyuanchen/cropperjs/commit/52871bb))
* refactor!: rename CropperCanvas's `scale` property to `scaleStep` ([bafa533](https://github.com/fengyuanchen/cropperjs/commit/bafa533))
* refactor: drop the `$setTransformByOffset` method ([241640a](https://github.com/fengyuanchen/cropperjs/commit/241640a))
* refactor: improve ([55a5905](https://github.com/fengyuanchen/cropperjs/commit/55a5905))
* refactor: improve code, docs, and playground ([d243243](https://github.com/fengyuanchen/cropperjs/commit/d243243))
* refactor: improve Cropper ([17d07ef](https://github.com/fengyuanchen/cropperjs/commit/17d07ef))
* refactor: improve dependents ([f3cdadc](https://github.com/fengyuanchen/cropperjs/commit/f3cdadc))
* refactor: improve elements and documentation ([5c370c7](https://github.com/fengyuanchen/cropperjs/commit/5c370c7))
* refactor: improve events binding ([aa6be90](https://github.com/fengyuanchen/cropperjs/commit/aa6be90))
* refactor: improve properties observing ([018c0ef](https://github.com/fengyuanchen/cropperjs/commit/018c0ef))
* refactor: improve selection operating ([fa88586](https://github.com/fengyuanchen/cropperjs/commit/fa88586))
* refactor: improve the `nextTick` utility function ([903e7a9](https://github.com/fengyuanchen/cropperjs/commit/903e7a9))
* refactor: improve the move action behaviour ([bdd43ab](https://github.com/fengyuanchen/cropperjs/commit/bdd43ab))
* refactor: merge `autoSelect` and `autoSelectArea` properties into `initialCoverage` property ([2582aed](https://github.com/fengyuanchen/cropperjs/commit/2582aed))
* refactor: merge all helpers in the utils package ([f54228a](https://github.com/fengyuanchen/cropperjs/commit/f54228a))
* refactor: rename `precision` to `precise` ([b654108](https://github.com/fengyuanchen/cropperjs/commit/b654108))
* test: fix style property ([da86c43](https://github.com/fengyuanchen/cropperjs/commit/da86c43))
* test(cropperjs): improve test case ([52c2a80](https://github.com/fengyuanchen/cropperjs/commit/52c2a80))
* refacror: improve the `$center` and `$fit` methods ([21039d7](https://github.com/fengyuanchen/cropperjs/commit/21039d7))
* perf: use `transform` for better performance ([23ab36b](https://github.com/fengyuanchen/cropperjs/commit/23ab36b))
* chore: sort element packages ([c1b8af7](https://github.com/fengyuanchen/cropperjs/commit/c1b8af7))



## 2.0.0-alpha.2 (2021-12-25)

* build: add postcss dependency ([ca45f09](https://github.com/fengyuanchen/cropperjs/commit/ca45f09))
* build: exports default module for CommonJS ([5836c46](https://github.com/fengyuanchen/cropperjs/commit/5836c46))
* build: fix wrong file match pattern ([515bc81](https://github.com/fengyuanchen/cropperjs/commit/515bc81))
* build: improve config ([edde79c](https://github.com/fengyuanchen/cropperjs/commit/edde79c))
* build: release 2.0.0-alpha.2 ([a4378d5](https://github.com/fengyuanchen/cropperjs/commit/a4378d5))
* build: simplify husky config ([20f70de](https://github.com/fengyuanchen/cropperjs/commit/20f70de))
* build: update dependencies ([b2bd7ba](https://github.com/fengyuanchen/cropperjs/commit/b2bd7ba))
* build: update dependencies ([2f1e322](https://github.com/fengyuanchen/cropperjs/commit/2f1e322))
* build: update dependencies ([9ed8dc5](https://github.com/fengyuanchen/cropperjs/commit/9ed8dc5))
* build: upgrade to husky 6 from 4 ([f0dab99](https://github.com/fengyuanchen/cropperjs/commit/f0dab99))
* style: drop .scss extension ([b4481f4](https://github.com/fengyuanchen/cropperjs/commit/b4481f4))
* style: fix eslint errors ([6466797](https://github.com/fengyuanchen/cropperjs/commit/6466797))
* style: fix stylelint errors ([0830355](https://github.com/fengyuanchen/cropperjs/commit/0830355))
* style: remove useless variable ([1f17255](https://github.com/fengyuanchen/cropperjs/commit/1f17255))
* docs: add missing type of original event for the zoom event ([be89c55](https://github.com/fengyuanchen/cropperjs/commit/be89c55))
* docs: add note about upload errors ([072220e](https://github.com/fengyuanchen/cropperjs/commit/072220e)), closes [#820](https://github.com/fengyuanchen/cropperjs/issues/820)
* docs: add note for limiting max zoom ratio ([e3b8571](https://github.com/fengyuanchen/cropperjs/commit/e3b8571))
* docs: disable zoomable to avoid side-effect ([d360b12](https://github.com/fengyuanchen/cropperjs/commit/d360b12)), closes [#837](https://github.com/fengyuanchen/cropperjs/issues/837)
* docs: fix grammar errors ([852d743](https://github.com/fengyuanchen/cropperjs/commit/852d743))
* docs: fix quotes ([b05b0e4](https://github.com/fengyuanchen/cropperjs/commit/b05b0e4))
* docs: fix typos ([ef0447e](https://github.com/fengyuanchen/cropperjs/commit/ef0447e))
* docs: fix wrong closing tag ([4604233](https://github.com/fengyuanchen/cropperjs/commit/4604233))
* docs: improove notice for image styles ([b5e0ae8](https://github.com/fengyuanchen/cropperjs/commit/b5e0ae8))
* docs: improve demo layout ([3bcc9ca](https://github.com/fengyuanchen/cropperjs/commit/3bcc9ca))
* docs: improve event description ([ca6b79d](https://github.com/fengyuanchen/cropperjs/commit/ca6b79d))
* docs: improve image importing ([72510a0](https://github.com/fengyuanchen/cropperjs/commit/72510a0)), closes [#724](https://github.com/fengyuanchen/cropperjs/issues/724)
* docs: remove redundant HTML tags (#821) ([fccca8a](https://github.com/fengyuanchen/cropperjs/commit/fccca8a)), closes [#821](https://github.com/fengyuanchen/cropperjs/issues/821)
* docs: rename `master` branch to `main` ([a773503](https://github.com/fengyuanchen/cropperjs/commit/a773503))
* docs: replace "ratio" with "scale" for zooming feature ([9786c5f](https://github.com/fengyuanchen/cropperjs/commit/9786c5f))
* docs: simplify changelog ([6bc40d6](https://github.com/fengyuanchen/cropperjs/commit/6bc40d6))
* docs: update links of the external dependencies ([1605410](https://github.com/fengyuanchen/cropperjs/commit/1605410))
* docs: update react-cropper repo url (#698) ([ecc5125](https://github.com/fengyuanchen/cropperjs/commit/ecc5125)), closes [#698](https://github.com/fengyuanchen/cropperjs/issues/698)
* ci: move to GitHub Actions ([cc3154c](https://github.com/fengyuanchen/cropperjs/commit/cc3154c))
* ci: use LTS version of Node.js ([104d914](https://github.com/fengyuanchen/cropperjs/commit/104d914))
* fix: add `$cropper-image-path` variable into the SCSS file for Sass users (#498) ([086f260](https://github.com/fengyuanchen/cropperjs/commit/086f260)), closes [#498](https://github.com/fengyuanchen/cropperjs/issues/498)
* fix: check if the preview image is ready ([38c3f67](https://github.com/fengyuanchen/cropperjs/commit/38c3f67)), closes [#654](https://github.com/fengyuanchen/cropperjs/issues/654)
* fix: improve container resizing ([d9e3f76](https://github.com/fengyuanchen/cropperjs/commit/d9e3f76)), closes [#636](https://github.com/fengyuanchen/cropperjs/issues/636)
* fix: improve ratio comparsion for negative value ([a165bf1](https://github.com/fengyuanchen/cropperjs/commit/a165bf1)), closes [#726](https://github.com/fengyuanchen/cropperjs/issues/726)
* fix: IS_TOUCH_DEVICE (#614) ([2ebf9ec](https://github.com/fengyuanchen/cropperjs/commit/2ebf9ec)), closes [#614](https://github.com/fengyuanchen/cropperjs/issues/614)
* fix: keep back compatibility (#799) ([2f939db](https://github.com/fengyuanchen/cropperjs/commit/2f939db)), closes [#799](https://github.com/fengyuanchen/cropperjs/issues/799)
* fix: move initial image data storing to a reasonable place ([bbdc758](https://github.com/fengyuanchen/cropperjs/commit/bbdc758))
* fix: set the request to be asynchronous explicitly ([9ac4738](https://github.com/fengyuanchen/cropperjs/commit/9ac4738)), closes [#682](https://github.com/fengyuanchen/cropperjs/issues/682)
* fix: support to set the minContainerWidth/Height to 0 ([db8b851](https://github.com/fengyuanchen/cropperjs/commit/db8b851)), closes [#683](https://github.com/fengyuanchen/cropperjs/issues/683)
* fix: typescript typing (#791) ([7db38ce](https://github.com/fengyuanchen/cropperjs/commit/7db38ce)), closes [#791](https://github.com/fengyuanchen/cropperjs/issues/791)
* fix: use the max ratio of the X/Y-axis for resizing ([1c822ef](https://github.com/fengyuanchen/cropperjs/commit/1c822ef)), closes [#835](https://github.com/fengyuanchen/cropperjs/issues/835)
* fix(types): add missing `MouseEvent` to the original event of the `zoom` event ([5018357](https://github.com/fengyuanchen/cropperjs/commit/5018357))
* fix(types): improve the types for the `preview` option (#731) ([1f4f3f9](https://github.com/fengyuanchen/cropperjs/commit/1f4f3f9)), closes [#731](https://github.com/fengyuanchen/cropperjs/issues/731)
* test: improve test cases for `wheelZoomRatio` ([f33734c](https://github.com/fengyuanchen/cropperjs/commit/f33734c))
* test: make `wheelZoomRatio` test check less strict (round up to tenths) (#814) ([b5b9a4f](https://github.com/fengyuanchen/cropperjs/commit/b5b9a4f)), closes [#814](https://github.com/fengyuanchen/cropperjs/issues/814)
* feat(types): add TypeScript declarations for the events ([68200c0](https://github.com/fengyuanchen/cropperjs/commit/68200c0))
* perf: simplify max zoom ratio computing ([6039b12](https://github.com/fengyuanchen/cropperjs/commit/6039b12))
* chore: add notes ([46d4d4f](https://github.com/fengyuanchen/cropperjs/commit/46d4d4f))
* chore: update external links ([02dc521](https://github.com/fengyuanchen/cropperjs/commit/02dc521))
* refactor: export additional types (#715) ([9fa2d00](https://github.com/fengyuanchen/cropperjs/commit/9fa2d00)), closes [#715](https://github.com/fengyuanchen/cropperjs/issues/715)



## 2.0.0-alpha.1 (2019-11-09)

* build: move to root ([5a0c068](https://github.com/fengyuanchen/cropperjs/commit/5a0c068))
* build: release 2.0.0-alpha ([a334dd3](https://github.com/fengyuanchen/cropperjs/commit/a334dd3))
* build: release 2.0.0-alpha.1 ([0ad96bb](https://github.com/fengyuanchen/cropperjs/commit/0ad96bb))
* build: update dependencies ([cd3fc8e](https://github.com/fengyuanchen/cropperjs/commit/cd3fc8e))
* build: update dependencies ([1999357](https://github.com/fengyuanchen/cropperjs/commit/1999357))
* build(deps): bump lodash.template from 4.4.0 to 4.5.0 (#601) ([66da1fc](https://github.com/fengyuanchen/cropperjs/commit/66da1fc)), closes [#601](https://github.com/fengyuanchen/cropperjs/issues/601)
* test: add test suties for new options ([259359e](https://github.com/fengyuanchen/cropperjs/commit/259359e))
* test: update some suites ([2b4a528](https://github.com/fengyuanchen/cropperjs/commit/2b4a528))
* fix: drop limited property ([d04b9c8](https://github.com/fengyuanchen/cropperjs/commit/d04b9c8))
* fix: improve crop box changing ([ea86afb](https://github.com/fengyuanchen/cropperjs/commit/ea86afb))
* fix: improve first cropping when there is aspect ratio ([99e6b54](https://github.com/fengyuanchen/cropperjs/commit/99e6b54))
* refactor: improve crop experience ([a71b38e](https://github.com/fengyuanchen/cropperjs/commit/a71b38e))
* refactor: simplify styles ([5de75a1](https://github.com/fengyuanchen/cropperjs/commit/5de75a1))
* feat: add 4 new options for the canvas and crop box ([e2273fd](https://github.com/fengyuanchen/cropperjs/commit/e2273fd))
* docs: add crossOrigin attribute to links ([48f653a](https://github.com/fengyuanchen/cropperjs/commit/48f653a))



## <small>1.5.6 (2019-10-04)</small>

* build: release 1.5.6 ([89f0b50](https://github.com/fengyuanchen/cropperjs/commit/89f0b50))
* style: fix eslint errors ([70918dc](https://github.com/fengyuanchen/cropperjs/commit/70918dc))
* fix: improve event type determining for iOS 13+ ([7f7422c](https://github.com/fengyuanchen/cropperjs/commit/7f7422c)), closes [#571](https://github.com/fengyuanchen/cropperjs/issues/571)
* docs: improve comments ([8fa586f](https://github.com/fengyuanchen/cropperjs/commit/8fa586f))



## <small>1.5.5 (2019-08-04)</small>

* build: release 1.5.5 ([819bff4](https://github.com/fengyuanchen/cropperjs/commit/819bff4))
* fix: clone the image's `crossOrigin` attribute always ([8d89392](https://github.com/fengyuanchen/cropperjs/commit/8d89392)), closes [#535](https://github.com/fengyuanchen/cropperjs/issues/535) [#552](https://github.com/fengyuanchen/cropperjs/issues/552)
* fix: improve browser detecting (#554) ([54b30e5](https://github.com/fengyuanchen/cropperjs/commit/54b30e5)), closes [#554](https://github.com/fengyuanchen/cropperjs/issues/554)



## <small>1.5.4 (2019-07-20)</small>

* build: release 1.5.4 ([6f9218d](https://github.com/fengyuanchen/cropperjs/commit/6f9218d))
* fix: add `alt` attribute to all internal images for better accessibility ([5036473](https://github.com/fengyuanchen/cropperjs/commit/5036473)), closes [#548](https://github.com/fengyuanchen/cropperjs/issues/548)
* fix: avoid removing the events of the original image ([76d5949](https://github.com/fengyuanchen/cropperjs/commit/76d5949))
* fix: avoid requesting Data URLs by XMLHttpRequest for better performance ([1eae10c](https://github.com/fengyuanchen/cropperjs/commit/1eae10c)), closes [#526](https://github.com/fengyuanchen/cropperjs/issues/526)
* fix: transform the TS types for the drag mode, smoothing quality and view mode options (#550) ([f4e306f](https://github.com/fengyuanchen/cropperjs/commit/f4e306f)), closes [#550](https://github.com/fengyuanchen/cropperjs/issues/550)
* fix: transform the ViewMode enum too ([153f9e3](https://github.com/fengyuanchen/cropperjs/commit/153f9e3))



## <small>1.5.3 (2019-07-10)</small>

* build: fix vulnerabilities ([64e9a9e](https://github.com/fengyuanchen/cropperjs/commit/64e9a9e))
* build: release 1.5.3 ([abc0c2a](https://github.com/fengyuanchen/cropperjs/commit/abc0c2a))
* style: improve comment ([a034294](https://github.com/fengyuanchen/cropperjs/commit/a034294))
* chore: update ignoring rules ([ecfa89f](https://github.com/fengyuanchen/cropperjs/commit/ecfa89f))
* fix: check all browsers use WebKit as the layout engine in iOS devices ([c9a83d3](https://github.com/fengyuanchen/cropperjs/commit/c9a83d3)), closes [#544](https://github.com/fengyuanchen/cropperjs/issues/544) [#545](https://github.com/fengyuanchen/cropperjs/issues/545)
* docs: add lossy compression description ([921aaf5](https://github.com/fengyuanchen/cropperjs/commit/921aaf5))
* docs: fix typos ([da5cc9c](https://github.com/fengyuanchen/cropperjs/commit/da5cc9c))



## <small>1.5.2 (2019-06-30)</small>

* build: release 1.5.2 ([006cc50](https://github.com/fengyuanchen/cropperjs/commit/006cc50))
* docs: fix typos ([38e24ac](https://github.com/fengyuanchen/cropperjs/commit/38e24ac))
* docs: update the version of the dependencies ([6101952](https://github.com/fengyuanchen/cropperjs/commit/6101952))
* test: update test for cross origin image ([8c937ff](https://github.com/fengyuanchen/cropperjs/commit/8c937ff))
* fix: alway add a timestamp to the url of a cross origin image ([f4b22b4](https://github.com/fengyuanchen/cropperjs/commit/f4b22b4)), closes [#519](https://github.com/fengyuanchen/cropperjs/issues/519)
* Update Changelog (#493) ([4e3634e](https://github.com/fengyuanchen/cropperjs/commit/4e3634e)), closes [#493](https://github.com/fengyuanchen/cropperjs/issues/493)



## <small>1.5.1 (2019-03-10)</small>

* build: release 1.5.1 ([a45ff7b](https://github.com/fengyuanchen/cropperjs/commit/a45ff7b))
* fix: revert the min container width and height ([3184327](https://github.com/fengyuanchen/cropperjs/commit/3184327))
* docs: update travis badge url ([6b0bc56](https://github.com/fengyuanchen/cropperjs/commit/6b0bc56))



## 1.5.0 (2019-03-10)

* build: add stylelint ([0f7e746](https://github.com/fengyuanchen/cropperjs/commit/0f7e746))
* build: merge config ([4ed2e5f](https://github.com/fengyuanchen/cropperjs/commit/4ed2e5f))
* build: merge config into package.json ([12b1970](https://github.com/fengyuanchen/cropperjs/commit/12b1970))
* build: release 1.5.0 ([2df11cc](https://github.com/fengyuanchen/cropperjs/commit/2df11cc))
* build: update dependencies ([f5424ef](https://github.com/fengyuanchen/cropperjs/commit/f5424ef))
* docs: add v2.x link ([ab1a2ba](https://github.com/fengyuanchen/cropperjs/commit/ab1a2ba))
* docs: fix assets links ([24325ab](https://github.com/fengyuanchen/cropperjs/commit/24325ab))
* docs: improve ([c78d938](https://github.com/fengyuanchen/cropperjs/commit/c78d938))
* docs: improve demo code ([6759d59](https://github.com/fengyuanchen/cropperjs/commit/6759d59))
* docs: improve GitHub templates ([e314fd6](https://github.com/fengyuanchen/cropperjs/commit/e314fd6))
* docs: move examples into docs folder ([8eb84de](https://github.com/fengyuanchen/cropperjs/commit/8eb84de))
* docs: update dependencies ([ee4adf5](https://github.com/fengyuanchen/cropperjs/commit/ee4adf5))
* docs: update issue templates ([3f254cf](https://github.com/fengyuanchen/cropperjs/commit/3f254cf))
* docs: update pull request template ([c5f07fb](https://github.com/fengyuanchen/cropperjs/commit/c5f07fb))
* fix: avoid typed array spreading error in IE or Safari 9 ([fff0a8d](https://github.com/fengyuanchen/cropperjs/commit/fff0a8d))
* fix: correct Safari detecting ([9db59b9](https://github.com/fengyuanchen/cropperjs/commit/9db59b9)), closes [#478](https://github.com/fengyuanchen/cropperjs/issues/478)
* fix: ignore the pointer events are not triggered by the primary button ([a0e1e32](https://github.com/fengyuanchen/cropperjs/commit/a0e1e32))
* perf: add options to wheel event for better performance ([4cbf6e4](https://github.com/fengyuanchen/cropperjs/commit/4cbf6e4))
* perf: improve utilities ([61738ec](https://github.com/fengyuanchen/cropperjs/commit/61738ec))
* perf: simplify url checking ([c8182db](https://github.com/fengyuanchen/cropperjs/commit/c8182db))
* refactor: improve code ([b78625f](https://github.com/fengyuanchen/cropperjs/commit/b78625f))
* refactor: sort properties ([746f98d](https://github.com/fengyuanchen/cropperjs/commit/746f98d))
* test: add test suites for class and static methods ([04bd847](https://github.com/fengyuanchen/cropperjs/commit/04bd847))
* test: improve helpers ([d537060](https://github.com/fengyuanchen/cropperjs/commit/d537060))
* ci: cache dependencies ([1826ecc](https://github.com/fengyuanchen/cropperjs/commit/1826ecc))



## <small>1.4.3 (2018-10-24)</small>

* build: release 1.4.3 ([ed45be1](https://github.com/fengyuanchen/cropperjs/commit/ed45be1))
* refactor: move `try...catch` into utility function ([3bb44c7](https://github.com/fengyuanchen/cropperjs/commit/3bb44c7))
* fix: avoid range error ([5fb1774](https://github.com/fengyuanchen/cropperjs/commit/5fb1774))
* fix: ignore range error when the image has incorrect Exif information ([2ca48d4](https://github.com/fengyuanchen/cropperjs/commit/2ca48d4))



## <small>1.4.2 (2018-10-15)</small>

* build: add test coverage and upgrde Babel to 7 ([7df905c](https://github.com/fengyuanchen/cropperjs/commit/7df905c))
* build: release 1.4.2 ([b795bb9](https://github.com/fengyuanchen/cropperjs/commit/b795bb9))
* fix: add missing static methods ([78a0ba5](https://github.com/fengyuanchen/cropperjs/commit/78a0ba5))
* fix: fall back first parameter to empty object to avoid error ([dcfc79c](https://github.com/fengyuanchen/cropperjs/commit/dcfc79c)), closes [#432](https://github.com/fengyuanchen/cropperjs/issues/432)
* fix: improve cropper instance storage to avoid side effect ([9f30bc7](https://github.com/fengyuanchen/cropperjs/commit/9f30bc7)), closes [#394](https://github.com/fengyuanchen/cropperjs/issues/394)
* fix: remove useless modifier ([f218cb8](https://github.com/fengyuanchen/cropperjs/commit/f218cb8))
* fix: reset abort event handler before abort ([bf938d1](https://github.com/fengyuanchen/cropperjs/commit/bf938d1))
* test: simplify config ([1aa00b6](https://github.com/fengyuanchen/cropperjs/commit/1aa00b6))
* chore: change request method to upper case ([7bbb8b5](https://github.com/fengyuanchen/cropperjs/commit/7bbb8b5))
* docs: add donate on patron badge ([c1a98fd](https://github.com/fengyuanchen/cropperjs/commit/c1a98fd))
* docs: add download note for outdated browsers ([313c56b](https://github.com/fengyuanchen/cropperjs/commit/313c56b))
* docs: add filename to form data to aviod side effect ([47b7654](https://github.com/fengyuanchen/cropperjs/commit/47b7654)), closes [#425](https://github.com/fengyuanchen/cropperjs/issues/425)
* docs: add minimum and maximum cropped dimensions example ([23b2e6c](https://github.com/fengyuanchen/cropperjs/commit/23b2e6c))
* docs: add more explanation for `checkCrossOrigin` option ([d274c4e](https://github.com/fengyuanchen/cropperjs/commit/d274c4e)), closes [#413](https://github.com/fengyuanchen/cropperjs/issues/413)
* docs: add reason for cache busting ([c5dcb87](https://github.com/fengyuanchen/cropperjs/commit/c5dcb87))
* refactor: use more semantic function name ([bebd89d](https://github.com/fengyuanchen/cropperjs/commit/bebd89d)), closes [#422](https://github.com/fengyuanchen/cropperjs/issues/422)
* perf: add characters in chunks in dataURLToArrayBuffer ([ac54c61](https://github.com/fengyuanchen/cropperjs/commit/ac54c61))
* perf: check mime type in progress event insted of load event ([dc1da14](https://github.com/fengyuanchen/cropperjs/commit/dc1da14))
* perf: don't recompute the DataUrl if it is already known (#422) ([af3a300](https://github.com/fengyuanchen/cropperjs/commit/af3a300)), closes [#422](https://github.com/fengyuanchen/cropperjs/issues/422)
* perf: grow chunk size and reduce typed array ([d51a7c1](https://github.com/fengyuanchen/cropperjs/commit/d51a7c1))
* perf: read orientation only when it is a JPEG image ([c644e0b](https://github.com/fengyuanchen/cropperjs/commit/c644e0b))
* perf: simplify code ([aa0ea3d](https://github.com/fengyuanchen/cropperjs/commit/aa0ea3d))
* revert: always generate a new Data URL to avoid side effect ([089f9b3](https://github.com/fengyuanchen/cropperjs/commit/089f9b3)), closes [#422](https://github.com/fengyuanchen/cropperjs/issues/422)



## <small>1.4.1 (2018-07-15)</small>

* build: release 1.4.1 ([f8a2da3](https://github.com/fengyuanchen/cropperjs/commit/f8a2da3))
* build: update ([152dd88](https://github.com/fengyuanchen/cropperjs/commit/152dd88)), closes [#376](https://github.com/fengyuanchen/cropperjs/issues/376)
* docs: add 1:1 crop box example ([9bc1716](https://github.com/fengyuanchen/cropperjs/commit/9bc1716))
* docs: improve examples styles ([e57cb0b](https://github.com/fengyuanchen/cropperjs/commit/e57cb0b))
* docs: only handle key down events of self ([93ab538](https://github.com/fengyuanchen/cropperjs/commit/93ab538))
* docs: update ([aa78728](https://github.com/fengyuanchen/cropperjs/commit/aa78728))
* fix: correct calc usage ([eee2153](https://github.com/fengyuanchen/cropperjs/commit/eee2153))
* fix: crop box overflows in "viewMode" 1 and 2 (#381) ([44f50a3](https://github.com/fengyuanchen/cropperjs/commit/44f50a3)), closes [#381](https://github.com/fengyuanchen/cropperjs/issues/381)
* fix: not to restrict the canvas position when it is not croppe ([e1b015b](https://github.com/fengyuanchen/cropperjs/commit/e1b015b))
* fix: revert missing case of #381 ([21e14ea](https://github.com/fengyuanchen/cropperjs/commit/21e14ea)), closes [#381](https://github.com/fengyuanchen/cropperjs/issues/381)
* perf: simplify code from #381 ([086a568](https://github.com/fengyuanchen/cropperjs/commit/086a568)), closes [#381](https://github.com/fengyuanchen/cropperjs/issues/381)
* perf: use native `forEach` first for better performance ([e2ae655](https://github.com/fengyuanchen/cropperjs/commit/e2ae655))
* Fix a typo in a classname (#383) ([d88d757](https://github.com/fengyuanchen/cropperjs/commit/d88d757)), closes [#383](https://github.com/fengyuanchen/cropperjs/issues/383)
* refactor: simplify styles ([8251882](https://github.com/fengyuanchen/cropperjs/commit/8251882))
* refactor: update code examples to es6 (#382) ([e436780](https://github.com/fengyuanchen/cropperjs/commit/e436780)), closes [#382](https://github.com/fengyuanchen/cropperjs/issues/382)
* style: improve ([8ea8549](https://github.com/fengyuanchen/cropperjs/commit/8ea8549))
* style: remove comment ([785f479](https://github.com/fengyuanchen/cropperjs/commit/785f479))
* feat: add scss files ([37c998a](https://github.com/fengyuanchen/cropperjs/commit/37c998a)), closes [#360](https://github.com/fengyuanchen/cropperjs/issues/360)
* test: fix wrong file name ([87e2f68](https://github.com/fengyuanchen/cropperjs/commit/87e2f68))
* test: improve style ([ab096d6](https://github.com/fengyuanchen/cropperjs/commit/ab096d6))



## 1.4.0 (2018-06-01)

* build: release 1.4.0 ([26a1268](https://github.com/fengyuanchen/cropperjs/commit/26a1268))
* fix: improve the smoothness of crop box resizing ([2b606c9](https://github.com/fengyuanchen/cropperjs/commit/2b606c9))
* feat: add new option `initialAspectRatio` ([cc35974](https://github.com/fengyuanchen/cropperjs/commit/cc35974))
* perf: unnecessary to compute ratio again ([5fde17e](https://github.com/fengyuanchen/cropperjs/commit/5fde17e))



## <small>1.3.6 (2018-05-20)</small>

* build: improve banner generating ([243056b](https://github.com/fengyuanchen/cropperjs/commit/243056b))
* build: release 1.3.6 ([1b1a0c0](https://github.com/fengyuanchen/cropperjs/commit/1b1a0c0))
* build: simplify config ([ebbb6dd](https://github.com/fengyuanchen/cropperjs/commit/ebbb6dd))
* MIT ([665cc77](https://github.com/fengyuanchen/cropperjs/commit/665cc77))
* fix: cancel enums exporting ([92331e8](https://github.com/fengyuanchen/cropperjs/commit/92331e8)), closes [#336](https://github.com/fengyuanchen/cropperjs/issues/336)
* fix: check orientation only when it is rotatable and scalable ([b277a18](https://github.com/fengyuanchen/cropperjs/commit/b277a18))
* fix: rounding off problem of getData ([1e19cd2](https://github.com/fengyuanchen/cropperjs/commit/1e19cd2)), closes [#343](https://github.com/fengyuanchen/cropperjs/issues/343)
* fix: set checkOrientation to false when it is unnecessary ([d828952](https://github.com/fengyuanchen/cropperjs/commit/d828952))
* test: improve ([2e8d15e](https://github.com/fengyuanchen/cropperjs/commit/2e8d15e))
* test: refactor test suite for rounded data ([10fe559](https://github.com/fengyuanchen/cropperjs/commit/10fe559))
* style: reference related issue in comment ([3abaa2f](https://github.com/fengyuanchen/cropperjs/commit/3abaa2f))



## <small>1.3.5 (2018-04-15)</small>

* build: release 1.3.5 ([a5f8f3f](https://github.com/fengyuanchen/cropperjs/commit/a5f8f3f))
* build: set timeout value ([4ca670b](https://github.com/fengyuanchen/cropperjs/commit/4ca670b))
* test: change the cross origin image url ([c1a9cfe](https://github.com/fengyuanchen/cropperjs/commit/c1a9cfe))
* test: fix dataset property keys ([ead1fa7](https://github.com/fengyuanchen/cropperjs/commit/ead1fa7))
* refactor: add namespace to data attribute names ([ad20faf](https://github.com/fengyuanchen/cropperjs/commit/ad20faf)), closes [#319](https://github.com/fengyuanchen/cropperjs/issues/319)
* fix: ensure the cloned image loads completely before ready ([acfa14c](https://github.com/fengyuanchen/cropperjs/commit/acfa14c)), closes [#303](https://github.com/fengyuanchen/cropperjs/issues/303)



## <small>1.3.4 (2018-03-31)</small>

* build: release 1.3.4 ([bc201ff](https://github.com/fengyuanchen/cropperjs/commit/bc201ff))
* style: improve ([34c24ea](https://github.com/fengyuanchen/cropperjs/commit/34c24ea))
* Revert "fix: export const enum for runtime" ([1edfd73](https://github.com/fengyuanchen/cropperjs/commit/1edfd73))
* fix: compute destination size with image's aspect ratio ([3dbbbf4](https://github.com/fengyuanchen/cropperjs/commit/3dbbbf4)), closes [#326](https://github.com/fengyuanchen/cropperjs/issues/326)



## <small>1.3.3 (2018-03-18)</small>

* build: release 1.3.3 ([08c517d](https://github.com/fengyuanchen/cropperjs/commit/08c517d))
* fix: add browser env checking for using in node.js ([f2f1172](https://github.com/fengyuanchen/cropperjs/commit/f2f1172))
* fix: add missing pivot to zoomTo (#320) ([de843e1](https://github.com/fengyuanchen/cropperjs/commit/de843e1)), closes [#320](https://github.com/fengyuanchen/cropperjs/issues/320)
* fix: avoid a `TypeError` in strict mode ([a456d69](https://github.com/fengyuanchen/cropperjs/commit/a456d69))
* fix: export const enum for runtime ([58e3c3c](https://github.com/fengyuanchen/cropperjs/commit/58e3c3c)), closes [#308](https://github.com/fengyuanchen/cropperjs/issues/308)
* docs: update ([260a431](https://github.com/fengyuanchen/cropperjs/commit/260a431))
* style: add comment for timeout ([5db0ebe](https://github.com/fengyuanchen/cropperjs/commit/5db0ebe))
* perf: improve event utils ([8d005d0](https://github.com/fengyuanchen/cropperjs/commit/8d005d0))



## <small>1.3.2 (2018-03-03)</small>

* build: release 1.3.2 ([26a9287](https://github.com/fengyuanchen/cropperjs/commit/26a9287))
* fix: draw with image's natural sizes ([2c13262](https://github.com/fengyuanchen/cropperjs/commit/2c13262)), closes [#313](https://github.com/fengyuanchen/cropperjs/issues/313)
* docs: fix vars name of mask-an-image example: (#314) ([64d8a82](https://github.com/fengyuanchen/cropperjs/commit/64d8a82)), closes [#314](https://github.com/fengyuanchen/cropperjs/issues/314)



## <small>1.3.1 (2018-02-28)</small>

* build: lint code before commit ([88ee482](https://github.com/fengyuanchen/cropperjs/commit/88ee482))
* build: release 1.3.1 ([204e19f](https://github.com/fengyuanchen/cropperjs/commit/204e19f))
* test: fix typo ([8a3117e](https://github.com/fengyuanchen/cropperjs/commit/8a3117e))
* docs: fix typos ([cbb3150](https://github.com/fengyuanchen/cropperjs/commit/cbb3150))
* fix: add missing `width` and `height` definitions ([06f6b36](https://github.com/fengyuanchen/cropperjs/commit/06f6b36)), closes [#302](https://github.com/fengyuanchen/cropperjs/issues/302)
* fix: correct view mode 2 ([38f418f](https://github.com/fengyuanchen/cropperjs/commit/38f418f)), closes [#304](https://github.com/fengyuanchen/cropperjs/issues/304)
* fix: should only trigger start handler once ([0090b1e](https://github.com/fengyuanchen/cropperjs/commit/0090b1e)), closes [#306](https://github.com/fengyuanchen/cropperjs/issues/306)
* fix(package): remove browser field (#307) ([d679bc3](https://github.com/fengyuanchen/cropperjs/commit/d679bc3)), closes [#307](https://github.com/fengyuanchen/cropperjs/issues/307)



## 1.3.0 (2018-02-25)

* build: add commit message linter ([83786bf](https://github.com/fengyuanchen/cropperjs/commit/83786bf))
* build: add indexes files ([9b7b151](https://github.com/fengyuanchen/cropperjs/commit/9b7b151))
* build: add the `root` field ([e3afb11](https://github.com/fengyuanchen/cropperjs/commit/e3afb11))
* build: change enum properties to PascalCase ([49d7e88](https://github.com/fengyuanchen/cropperjs/commit/49d7e88))
* build: release 1.3.0 ([ae88c17](https://github.com/fengyuanchen/cropperjs/commit/ae88c17))
* build: simplify banner sharing ([23d059e](https://github.com/fengyuanchen/cropperjs/commit/23d059e))
* refactor: change the second parameter name of `replace` method ([8f25400](https://github.com/fengyuanchen/cropperjs/commit/8f25400))
* refactor: crop after ready ([4a0c638](https://github.com/fengyuanchen/cropperjs/commit/4a0c638))
* refactor: not allow to crop again when it is already cropped ([56fc9d2](https://github.com/fengyuanchen/cropperjs/commit/56fc9d2))
* refactor: optimize image sizing ([92f1f88](https://github.com/fengyuanchen/cropperjs/commit/92f1f88))
* refactor: optimize the build process ([2d48734](https://github.com/fengyuanchen/cropperjs/commit/2d48734))
* refactor: trigger `crop` event before `ready` event when auto crop ([63ed4b5](https://github.com/fengyuanchen/cropperjs/commit/63ed4b5))
* style: add comment ([61fc266](https://github.com/fengyuanchen/cropperjs/commit/61fc266))
* style: fix eslint errors ([bdd239f](https://github.com/fengyuanchen/cropperjs/commit/bdd239f))
* test: fix typos ([2fd7fcc](https://github.com/fengyuanchen/cropperjs/commit/2fd7fcc))
* test: refactor test suites ([ef8fd5e](https://github.com/fengyuanchen/cropperjs/commit/ef8fd5e))
* perf: improve async process ([375cd51](https://github.com/fengyuanchen/cropperjs/commit/375cd51))
* perf: improve some methods ([a89e0f5](https://github.com/fengyuanchen/cropperjs/commit/a89e0f5))
* perf: improve utilities ([a0777bd](https://github.com/fengyuanchen/cropperjs/commit/a0777bd))
* perf: improve XMLHTTPRequest abort ([4495b31](https://github.com/fengyuanchen/cropperjs/commit/4495b31))
* docs: add description for timestamp ([8068a0e](https://github.com/fengyuanchen/cropperjs/commit/8068a0e))
* docs: add example for uploading cropped image to server ([b8bf1a2](https://github.com/fengyuanchen/cropperjs/commit/b8bf1a2))
* docs: add note for `data` option ([5ac334d](https://github.com/fengyuanchen/cropperjs/commit/5ac334d))
* docs: add notes for `crop` event ([3daf2b0](https://github.com/fengyuanchen/cropperjs/commit/3daf2b0))
* docs: change parameter name ([e0af88a](https://github.com/fengyuanchen/cropperjs/commit/e0af88a))
* docs: detail cropper class arguments ([5a1eddf](https://github.com/fengyuanchen/cropperjs/commit/5a1eddf))
* docs: keep the same image name when download ([0068a67](https://github.com/fengyuanchen/cropperjs/commit/0068a67))
* docs: perfect contributing documentations ([0e9735f](https://github.com/fengyuanchen/cropperjs/commit/0e9735f))
* docs: upgrade Bootstrap stable version ([a2a80ce](https://github.com/fengyuanchen/cropperjs/commit/a2a80ce))
* docs: upgrade Bootstrap to v4.0.0-beta.3 ([7edf9cb](https://github.com/fengyuanchen/cropperjs/commit/7edf9cb))
* feat: add type definitions file for TypeScript ([3a079ad](https://github.com/fengyuanchen/cropperjs/commit/3a079ad))
* feat: enhance the `preview` option ([9f235ff](https://github.com/fengyuanchen/cropperjs/commit/9f235ff))
* fix: correct cropped sizes when provide max/min sizes ([187fa61](https://github.com/fengyuanchen/cropperjs/commit/187fa61))
* fix: the `setDragMode` method only available when it is ready ([2b70af4](https://github.com/fengyuanchen/cropperjs/commit/2b70af4))
* pref: improve regexps ([0902077](https://github.com/fengyuanchen/cropperjs/commit/0902077))
* Added touch-action attribute to template to accomodate pointer event polyfills (#299) ([7a4a705](https://github.com/fengyuanchen/cropperjs/commit/7a4a705)), closes [#299](https://github.com/fengyuanchen/cropperjs/issues/299)



## <small>1.2.2 (2018-01-03)</small>

* release: 1.2.2 ([583b763](https://github.com/fengyuanchen/cropperjs/commit/583b763))
* build: upgrade rollup ([553fe5b](https://github.com/fengyuanchen/cropperjs/commit/553fe5b))
* MIT ([cb4f3a9](https://github.com/fengyuanchen/cropperjs/commit/cb4f3a9))
* fix: incorrect image natual sizes in iOS Safari ([5e3cdc4](https://github.com/fengyuanchen/cropperjs/commit/5e3cdc4)), closes [#279](https://github.com/fengyuanchen/cropperjs/issues/279)
* fix: override `max-*` and `min-*` styles ([2ff231e](https://github.com/fengyuanchen/cropperjs/commit/2ff231e))
* docs: add example for cross origin image ([6e298d6](https://github.com/fengyuanchen/cropperjs/commit/6e298d6))



## <small>1.2.1 (2017-12-17)</small>

* release: 1.2.1 ([b9de338](https://github.com/fengyuanchen/cropperjs/commit/b9de338))
* feat: add style field to package.json ([98abdd2](https://github.com/fengyuanchen/cropperjs/commit/98abdd2))
* fix: append image to dom to get correct size ([4ec5062](https://github.com/fengyuanchen/cropperjs/commit/4ec5062)), closes [#256](https://github.com/fengyuanchen/cropperjs/issues/256)
* fix: fall back to documentElement if body is not existing ([fea4b72](https://github.com/fengyuanchen/cropperjs/commit/fea4b72))



## 1.2.0 (2017-12-17)

* chore: release 1.2.0 ([0d66566](https://github.com/fengyuanchen/cropperjs/commit/0d66566))
* build: update scripts and dependencies ([0508d18](https://github.com/fengyuanchen/cropperjs/commit/0508d18))
* build(rollup): add external helpers ([e33e595](https://github.com/fengyuanchen/cropperjs/commit/e33e595))
* fix: correct rotated size computing ([572c0e2](https://github.com/fengyuanchen/cropperjs/commit/572c0e2)), closes [#260](https://github.com/fengyuanchen/cropperjs/issues/260)
* fix: fallback for deleting property in element ([c84d3ce](https://github.com/fengyuanchen/cropperjs/commit/c84d3ce))
* fix: improve event binding ([662c945](https://github.com/fengyuanchen/cropperjs/commit/662c945))
* fix: simplify event binding ([6fdfcb4](https://github.com/fengyuanchen/cropperjs/commit/6fdfcb4))
* Changed document to element.ownerDocument. This so cropper will work within an iframe (#201) ([1930e2b](https://github.com/fengyuanchen/cropperjs/commit/1930e2b)), closes [#201](https://github.com/fengyuanchen/cropperjs/issues/201)
* Grammar correction (#271) ([6c64c31](https://github.com/fengyuanchen/cropperjs/commit/6c64c31)), closes [#271](https://github.com/fengyuanchen/cropperjs/issues/271)
* use bidirectional resize cursor (#169) ([e1f8ddc](https://github.com/fengyuanchen/cropperjs/commit/e1f8ddc)), closes [#169](https://github.com/fengyuanchen/cropperjs/issues/169)
* docs: add angular-cropperjs project ([1f6275f](https://github.com/fengyuanchen/cropperjs/commit/1f6275f)), closes [#230](https://github.com/fengyuanchen/cropperjs/issues/230)
* docs: add some badges ([9c048cb](https://github.com/fengyuanchen/cropperjs/commit/9c048cb))
* docs: improve demo ([c1cdd71](https://github.com/fengyuanchen/cropperjs/commit/c1cdd71))
* feat: add pivot to zoomTo method ([2d99d2c](https://github.com/fengyuanchen/cropperjs/commit/2d99d2c)), closes [#144](https://github.com/fengyuanchen/cropperjs/issues/144)
* style: fix eslint error ([565f4db](https://github.com/fengyuanchen/cropperjs/commit/565f4db))
* style: remove redundant space ([382dc08](https://github.com/fengyuanchen/cropperjs/commit/382dc08))



## <small>1.1.3 (2017-10-21)</small>

* build: release 1.1.3 ([f6aff44](https://github.com/fengyuanchen/cropperjs/commit/f6aff44))
* fix: error when disable one of rotatable and scalable options ([bdbc456](https://github.com/fengyuanchen/cropperjs/commit/bdbc456)), closes [#241](https://github.com/fengyuanchen/cropperjs/issues/241)
* refactor: simplify window reference ([4da21d1](https://github.com/fengyuanchen/cropperjs/commit/4da21d1))



## <small>1.1.2 (2017-10-18)</small>

* build: add release script ([fe6ad77](https://github.com/fengyuanchen/cropperjs/commit/fe6ad77))
* build: release 1.1.2 ([fa03501](https://github.com/fengyuanchen/cropperjs/commit/fa03501))
* build: use files field instead of .npmignore file ([595d027](https://github.com/fengyuanchen/cropperjs/commit/595d027))
* ci: add scripts ([adffe3e](https://github.com/fengyuanchen/cropperjs/commit/adffe3e))
* fix: normalize decimal numbers when crop an image ([43df5f3](https://github.com/fengyuanchen/cropperjs/commit/43df5f3))



## <small>1.1.1 (2017-10-11)</small>

* build: release 1.1.1 ([d80c92d](https://github.com/fengyuanchen/cropperjs/commit/d80c92d))
* docs: improve close button accessiblity ([91ba743](https://github.com/fengyuanchen/cropperjs/commit/91ba743))
* docs: update author name ([4447625](https://github.com/fengyuanchen/cropperjs/commit/4447625))
* fix: event listener should be a function ([0fe0c8f](https://github.com/fengyuanchen/cropperjs/commit/0fe0c8f)), closes [#238](https://github.com/fengyuanchen/cropperjs/issues/238)
* fix: fix the originalUrl when src is not present (#234) ([2498140](https://github.com/fengyuanchen/cropperjs/commit/2498140)), closes [#234](https://github.com/fengyuanchen/cropperjs/issues/234)
* fix: supports to load in node environment ([86a42c6](https://github.com/fengyuanchen/cropperjs/commit/86a42c6)), closes [#237](https://github.com/fengyuanchen/cropperjs/issues/237)



## 1.1.0 (2017-10-08)

* build: add banner with plugin ([39f0a90](https://github.com/fengyuanchen/cropperjs/commit/39f0a90))
* build: format generated css ([e66bbdb](https://github.com/fengyuanchen/cropperjs/commit/e66bbdb)), closes [#231](https://github.com/fengyuanchen/cropperjs/issues/231)
* build: release 1.1.0 ([779ffd8](https://github.com/fengyuanchen/cropperjs/commit/779ffd8))
* build: remove bower.json file ([c7d7355](https://github.com/fengyuanchen/cropperjs/commit/c7d7355))
* build: remove external helpers ([a6aba19](https://github.com/fengyuanchen/cropperjs/commit/a6aba19))
* build: update config ([c386793](https://github.com/fengyuanchen/cropperjs/commit/c386793))
* docs: add parameter to getCroppedCanvas ([24740bd](https://github.com/fengyuanchen/cropperjs/commit/24740bd))
* docs: add steps to crop on server-side ([a146f74](https://github.com/fengyuanchen/cropperjs/commit/a146f74))
* docs: improve layout and styles ([5ec5f80](https://github.com/fengyuanchen/cropperjs/commit/5ec5f80))
* docs: improve rotate behaviour ([bde0d35](https://github.com/fengyuanchen/cropperjs/commit/bde0d35))
* docs: improve style and layout ([50e6633](https://github.com/fengyuanchen/cropperjs/commit/50e6633))
* docs: remove blank lines ([93bff67](https://github.com/fengyuanchen/cropperjs/commit/93bff67))
* perf: remove window detecting as window is required ([5a86608](https://github.com/fengyuanchen/cropperjs/commit/5a86608))
* perf: simplify element query ([c2a6bb5](https://github.com/fengyuanchen/cropperjs/commit/c2a6bb5))
* test: enable orientation checking ([0fbec21](https://github.com/fengyuanchen/cropperjs/commit/0fbec21))
* test: improve event dispatching ([f4afb4e](https://github.com/fengyuanchen/cropperjs/commit/f4afb4e))
* built: add eslint rules ([618c373](https://github.com/fengyuanchen/cropperjs/commit/618c373))
* refactor: separate contants and simplify utilities ([f17a7cb](https://github.com/fengyuanchen/cropperjs/commit/f17a7cb))
* fix: improve action changing condition ([5a7c4f2](https://github.com/fengyuanchen/cropperjs/commit/5a7c4f2))
* fix: improve event adding and removing ([720f3a9](https://github.com/fengyuanchen/cropperjs/commit/720f3a9))
* fix: improve resizing condition ([ad379ce](https://github.com/fengyuanchen/cropperjs/commit/ad379ce)), closes [#229](https://github.com/fengyuanchen/cropperjs/issues/229)
* fix: output clone to avoid side effect ([3d99679](https://github.com/fengyuanchen/cropperjs/commit/3d99679))
* fix: set the default value of imageSmoothingEnabled ([2f3a5d4](https://github.com/fengyuanchen/cropperjs/commit/2f3a5d4)), closes [#232](https://github.com/fengyuanchen/cropperjs/issues/232)
* fix: throw error is the first argument is invalid ([04cbf0a](https://github.com/fengyuanchen/cropperjs/commit/04cbf0a)), closes [#227](https://github.com/fengyuanchen/cropperjs/issues/227)
* style: fix eslint errors ([3cb8677](https://github.com/fengyuanchen/cropperjs/commit/3cb8677))
* style: remove unused variable ([eddb57e](https://github.com/fengyuanchen/cropperjs/commit/eddb57e))
* feat: add 4 new options to `getCroppedCanvas` method ([2e8f7a5](https://github.com/fengyuanchen/cropperjs/commit/2e8f7a5))
* feat: enhance scale ([cbfe15d](https://github.com/fengyuanchen/cropperjs/commit/cbfe15d))
* Improved crop box resizing ([b15aa83](https://github.com/fengyuanchen/cropperjs/commit/b15aa83)), closes [#222](https://github.com/fengyuanchen/cropperjs/issues/222)



## 1.0.0 (2017-09-03)

* build: release 1.0.0 ([2365789](https://github.com/fengyuanchen/cropperjs/commit/2365789))
* build: rename file and update config ([2479ef6](https://github.com/fengyuanchen/cropperjs/commit/2479ef6))
* build: simplify configs ([ed396c0](https://github.com/fengyuanchen/cropperjs/commit/ed396c0))
* build: update dependencies ([6d75a95](https://github.com/fengyuanchen/cropperjs/commit/6d75a95))
* perl: simplify calculation ([85c508b](https://github.com/fengyuanchen/cropperjs/commit/85c508b))
* fix: improve crop box resizing ([9257e06](https://github.com/fengyuanchen/cropperjs/commit/9257e06)), closes [#222](https://github.com/fengyuanchen/cropperjs/issues/222)
* fix: zoom out bug after clear in view mode 1, 2, 3 ([7276d7b](https://github.com/fengyuanchen/cropperjs/commit/7276d7b)), closes [#209](https://github.com/fengyuanchen/cropperjs/issues/209)
* test: upgrade QUnit to v2.4.0 ([4b4edcf](https://github.com/fengyuanchen/cropperjs/commit/4b4edcf))
* style: fix eslint errors ([39befb9](https://github.com/fengyuanchen/cropperjs/commit/39befb9))
* style: sort css properties ([67ee879](https://github.com/fengyuanchen/cropperjs/commit/67ee879))
* style: sort css properties ([8ceb5af](https://github.com/fengyuanchen/cropperjs/commit/8ceb5af))
* docs:  add notes to `getCroppedCanvas` method ([cab3f2a](https://github.com/fengyuanchen/cropperjs/commit/cab3f2a))
* docs: upgrade to Bootstrap v4.0.0-beta ([1bc877f](https://github.com/fengyuanchen/cropperjs/commit/1bc877f))
* Add ember-cropperjs in the related projects ([86901dd](https://github.com/fengyuanchen/cropperjs/commit/86901dd))



## 1.0.0-rc.3 (2017-07-07)

* add related - iron-coropper (web component) ([1969fa9](https://github.com/fengyuanchen/cropperjs/commit/1969fa9))
* Added a new option to `getCroppedCanvas` method ([2e0eea0](https://github.com/fengyuanchen/cropperjs/commit/2e0eea0))
* Added new options to `getCroppedCanvas` method ([fa409c3](https://github.com/fengyuanchen/cropperjs/commit/fa409c3))
* Demo using cropper to mask an image ([4c8230c](https://github.com/fengyuanchen/cropperjs/commit/4c8230c))
* Fix REGEXP_DATA_URL_JPEG using ([f38ba8a](https://github.com/fengyuanchen/cropperjs/commit/f38ba8a))
* Fix typo ([00fd364](https://github.com/fengyuanchen/cropperjs/commit/00fd364))
* Fixed boolean assigning ([b8cd3bb](https://github.com/fengyuanchen/cropperjs/commit/b8cd3bb))
* Improved playground demo ([5dd1174](https://github.com/fengyuanchen/cropperjs/commit/5dd1174))
* Release v1.0.0-rc.3 ([ddd2c2c](https://github.com/fengyuanchen/cropperjs/commit/ddd2c2c))
* Rephrase documentation on viewMode in README ([1bd7118](https://github.com/fengyuanchen/cropperjs/commit/1bd7118))



## 1.0.0-rc.2 (2017-05-30)

* Improved canvas box initialization ([ddfdbda](https://github.com/fengyuanchen/cropperjs/commit/ddfdbda)), closes [#179](https://github.com/fengyuanchen/cropperjs/issues/179)
* Release v1.0.0-rc.2 ([39a0659](https://github.com/fengyuanchen/cropperjs/commit/39a0659))
* Sort properties ([9d01a09](https://github.com/fengyuanchen/cropperjs/commit/9d01a09))



## 1.0.0-rc.1 (2017-04-30)

* Release v1.0.0-rc.1 ([00dc42b](https://github.com/fengyuanchen/cropperjs/commit/00dc42b))



## 1.0.0-rc (2017-03-25)

* Change event name ([43fcf85](https://github.com/fengyuanchen/cropperjs/commit/43fcf85))
* Fixed #161 ([be0ea20](https://github.com/fengyuanchen/cropperjs/commit/be0ea20)), closes [#161](https://github.com/fengyuanchen/cropperjs/issues/161)
* Fixed #162 ([f950e71](https://github.com/fengyuanchen/cropperjs/commit/f950e71)), closes [#162](https://github.com/fengyuanchen/cropperjs/issues/162)
* Ignores double click when dragMode is set to none ([19d0d53](https://github.com/fengyuanchen/cropperjs/commit/19d0d53))
* Improve code ([4d279a3](https://github.com/fengyuanchen/cropperjs/commit/4d279a3))
* Improve code style ([93dc2ca](https://github.com/fengyuanchen/cropperjs/commit/93dc2ca))
* Release v1.0.0-rc ([5d2388f](https://github.com/fengyuanchen/cropperjs/commit/5d2388f))
* Remove source map when publish ([1268465](https://github.com/fengyuanchen/cropperjs/commit/1268465)), closes [#159](https://github.com/fengyuanchen/cropperjs/issues/159)



## 1.0.0-beta.2 (2017-02-25)

* Changed variable name ([2c91371](https://github.com/fengyuanchen/cropperjs/commit/2c91371))
* Fixed #155 ([314f275](https://github.com/fengyuanchen/cropperjs/commit/314f275)), closes [#155](https://github.com/fengyuanchen/cropperjs/issues/155)
* Fixed #155 ([2d79294](https://github.com/fengyuanchen/cropperjs/commit/2d79294)), closes [#155](https://github.com/fengyuanchen/cropperjs/issues/155)
* Fixed #156 ([d7749fe](https://github.com/fengyuanchen/cropperjs/commit/d7749fe)), closes [#156](https://github.com/fengyuanchen/cropperjs/issues/156)
* Fixed wrong reference ([584db79](https://github.com/fengyuanchen/cropperjs/commit/584db79))
* Release v1.0.0-beta.2 ([e803308](https://github.com/fengyuanchen/cropperjs/commit/e803308))
* Simplify extend function ([c5113fd](https://github.com/fengyuanchen/cropperjs/commit/c5113fd))
* Update ([fce963c](https://github.com/fengyuanchen/cropperjs/commit/fce963c))



## 1.0.0-beta.1 (2017-01-21)

* Added lost info ([c46479c](https://github.com/fengyuanchen/cropperjs/commit/c46479c))
* Comment tests ([b2fe8be](https://github.com/fengyuanchen/cropperjs/commit/b2fe8be))
* Improved code ([7cbf82d](https://github.com/fengyuanchen/cropperjs/commit/7cbf82d))
* Improved examples ([35c6ce5](https://github.com/fengyuanchen/cropperjs/commit/35c6ce5))
* Improved object assign ([78b0ee0](https://github.com/fengyuanchen/cropperjs/commit/78b0ee0))
* Release v1.0.0-beta.1 ([73b08f4](https://github.com/fengyuanchen/cropperjs/commit/73b08f4))
* Set `withCredentials` attribute if it is required ([b213574](https://github.com/fengyuanchen/cropperjs/commit/b213574)), closes [#141](https://github.com/fengyuanchen/cropperjs/issues/141)
* Update README.md ([496fd38](https://github.com/fengyuanchen/cropperjs/commit/496fd38))
* Use CSS3 2D Transforms for better performance ([0cfc109](https://github.com/fengyuanchen/cropperjs/commit/0cfc109)), closes [#138](https://github.com/fengyuanchen/cropperjs/issues/138)



## 1.0.0-beta (2017-01-01)

* Added ignored files ([a8eced3](https://github.com/fengyuanchen/cropperjs/commit/a8eced3))
* Fixed #128 ([0e2a1a1](https://github.com/fengyuanchen/cropperjs/commit/0e2a1a1)), closes [#128](https://github.com/fengyuanchen/cropperjs/issues/128)
* Handle Pointer Events ([e68dc2d](https://github.com/fengyuanchen/cropperjs/commit/e68dc2d)), closes [#127](https://github.com/fengyuanchen/cropperjs/issues/127)
* Happy New Year ([4c7aa8f](https://github.com/fengyuanchen/cropperjs/commit/4c7aa8f))
* Improved code ([7f57912](https://github.com/fengyuanchen/cropperjs/commit/7f57912))
* Improved setCropBoxData method ([5c26499](https://github.com/fengyuanchen/cropperjs/commit/5c26499)), closes [#109](https://github.com/fengyuanchen/cropperjs/issues/109)
* Ipmoved "round image" example. Added corners smoothing ([7811037](https://github.com/fengyuanchen/cropperjs/commit/7811037))
* Release v1.0.0-beta ([b7c5f4e](https://github.com/fengyuanchen/cropperjs/commit/b7c5f4e))
* Simplify code ([76ccb58](https://github.com/fengyuanchen/cropperjs/commit/76ccb58))
* Specify image extensions ([b17e05e](https://github.com/fengyuanchen/cropperjs/commit/b17e05e))
* Support to set a element for preview ([30ec6b3](https://github.com/fengyuanchen/cropperjs/commit/30ec6b3)), closes [#113](https://github.com/fengyuanchen/cropperjs/issues/113)
* Update dependencies ([2697166](https://github.com/fengyuanchen/cropperjs/commit/2697166))



## 1.0.0-alpha (2016-12-04)

* Added .babelrc file ([7f74f48](https://github.com/fengyuanchen/cropperjs/commit/7f74f48))
* Added a link to vue-cropperjs ([ae9b853](https://github.com/fengyuanchen/cropperjs/commit/ae9b853))
* Added build script for add banner and copy files ([2b7124f](https://github.com/fengyuanchen/cropperjs/commit/2b7124f))
* Added postcss.config.json file ([66fa255](https://github.com/fengyuanchen/cropperjs/commit/66fa255))
* Added rollup.config.js ([cbd74f7](https://github.com/fengyuanchen/cropperjs/commit/cbd74f7))
* Disable default touch action to avoid side effect ([9c9e9cc](https://github.com/fengyuanchen/cropperjs/commit/9c9e9cc)), closes [#101](https://github.com/fengyuanchen/cropperjs/issues/101)
* Fix typos ([b37aa89](https://github.com/fengyuanchen/cropperjs/commit/b37aa89))
* Fixed `replace()` without `autoCrop` crash ([0f3161e](https://github.com/fengyuanchen/cropperjs/commit/0f3161e))
* Fixed class names ([e2f16f0](https://github.com/fengyuanchen/cropperjs/commit/e2f16f0))
* Improved demo ([fb83bf2](https://github.com/fengyuanchen/cropperjs/commit/fb83bf2)), closes [#103](https://github.com/fengyuanchen/cropperjs/issues/103)
* Improved doc ([83a3ebf](https://github.com/fengyuanchen/cropperjs/commit/83a3ebf))
* Improved examples ([3b69c23](https://github.com/fengyuanchen/cropperjs/commit/3b69c23)), closes [#95](https://github.com/fengyuanchen/cropperjs/issues/95)
* Merged test html files ([9a0edd4](https://github.com/fengyuanchen/cropperjs/commit/9a0edd4))
* Move from Less to PostCSS ([a723642](https://github.com/fengyuanchen/cropperjs/commit/a723642))
* Moved images to docs folder ([9b528a8](https://github.com/fengyuanchen/cropperjs/commit/9b528a8))
* Release v1.0.0-alpha ([3d931f7](https://github.com/fengyuanchen/cropperjs/commit/3d931f7))
* Removed assets ([aa113b8](https://github.com/fengyuanchen/cropperjs/commit/aa113b8))
* Removed demo ([734ac50](https://github.com/fengyuanchen/cropperjs/commit/734ac50))
* Removed docs LICENSE ([ea99713](https://github.com/fengyuanchen/cropperjs/commit/ea99713))
* Removed gulpfile.js ([9ce981d](https://github.com/fengyuanchen/cropperjs/commit/9ce981d))
* Revoke existing Blob URL ([d141660](https://github.com/fengyuanchen/cropperjs/commit/d141660))
* Simplify code ([eb3ca54](https://github.com/fengyuanchen/cropperjs/commit/eb3ca54))
* Update config files ([61ecee7](https://github.com/fengyuanchen/cropperjs/commit/61ecee7))
* Updated related projects ([d512d07](https://github.com/fengyuanchen/cropperjs/commit/d512d07))



## <small>0.8.1 (2016-09-03)</small>

* Fixed #82 ([1da3fca](https://github.com/fengyuanchen/cropperjs/commit/1da3fca)), closes [#82](https://github.com/fengyuanchen/cropperjs/issues/82)
* Fixed the bug of calling `ready` event twice ([f6d84b9](https://github.com/fengyuanchen/cropperjs/commit/f6d84b9)), closes [#81](https://github.com/fengyuanchen/cropperjs/issues/81)
* Fixed the bug of cropping ([364f6ac](https://github.com/fengyuanchen/cropperjs/commit/364f6ac)), closes [#80](https://github.com/fengyuanchen/cropperjs/issues/80)
* Improved demo and docs ([f68ef17](https://github.com/fengyuanchen/cropperjs/commit/f68ef17))
* Improved dependencies ([05421c3](https://github.com/fengyuanchen/cropperjs/commit/05421c3))
* Release v0.8.1 ([903925f](https://github.com/fengyuanchen/cropperjs/commit/903925f))
* Update ([b415fdd](https://github.com/fengyuanchen/cropperjs/commit/b415fdd))
* Updated TetherJS ([50cd87e](https://github.com/fengyuanchen/cropperjs/commit/50cd87e))



## 0.8.0 (2016-08-18)

* Added .eslintrc file ([9157cd6](https://github.com/fengyuanchen/cropperjs/commit/9157cd6))
* Added ISSUE_TEMPLATE.md file ([4c23ab1](https://github.com/fengyuanchen/cropperjs/commit/4c23ab1))
* Added note for getCroppedCanvas ([e1b2d52](https://github.com/fengyuanchen/cropperjs/commit/e1b2d52))
* Deleted .htmlcombrc file ([e961b9f](https://github.com/fengyuanchen/cropperjs/commit/e961b9f))
* Deleted useless files ([3385490](https://github.com/fengyuanchen/cropperjs/commit/3385490))
* Fixed the error of orientation transform ([2d3cd63](https://github.com/fengyuanchen/cropperjs/commit/2d3cd63))
* Fixed the error of orientation transform ([7eb2f16](https://github.com/fengyuanchen/cropperjs/commit/7eb2f16))
* Improved RegExps ([f48421f](https://github.com/fengyuanchen/cropperjs/commit/f48421f))
* Move from SASS to LESS ([81eec0a](https://github.com/fengyuanchen/cropperjs/commit/81eec0a))
* Ported code to ES6 ([6b73030](https://github.com/fengyuanchen/cropperjs/commit/6b73030))
* Release v0.8.0 ([59a9325](https://github.com/fengyuanchen/cropperjs/commit/59a9325))
* Remove "build" event and rename "built" to ready ([1e0867f](https://github.com/fengyuanchen/cropperjs/commit/1e0867f))
* Removed FAQ.md file ([bb1df8c](https://github.com/fengyuanchen/cropperjs/commit/bb1df8c))
* Removed unnecessary escape characters ([29315dc](https://github.com/fengyuanchen/cropperjs/commit/29315dc))
* Removed unnecessary rules ([b1411ed](https://github.com/fengyuanchen/cropperjs/commit/b1411ed))
* Simplify class constants ([4d254c0](https://github.com/fengyuanchen/cropperjs/commit/4d254c0))
* Update ([16ec8b1](https://github.com/fengyuanchen/cropperjs/commit/16ec8b1))
* Update ([41fa0a6](https://github.com/fengyuanchen/cropperjs/commit/41fa0a6))
* Update ([fda04c0](https://github.com/fengyuanchen/cropperjs/commit/fda04c0))
* Update docs and demo ([2290a23](https://github.com/fengyuanchen/cropperjs/commit/2290a23))
* Update README.md ([451ffd6](https://github.com/fengyuanchen/cropperjs/commit/451ffd6))
* Updated assets ([5306016](https://github.com/fengyuanchen/cropperjs/commit/5306016))
* Updated docs and demo ([aeb81dd](https://github.com/fengyuanchen/cropperjs/commit/aeb81dd))
* Updated docs and demo ([c65a4ff](https://github.com/fengyuanchen/cropperjs/commit/c65a4ff))
* Updated examples ([9b84e57](https://github.com/fengyuanchen/cropperjs/commit/9b84e57))
* Updated links ([72d41bb](https://github.com/fengyuanchen/cropperjs/commit/72d41bb))
* Updated paths and links ([5b5d650](https://github.com/fengyuanchen/cropperjs/commit/5b5d650))



## <small>0.7.2 (2016-06-08)</small>

* Console event type directly ([1e42c5c](https://github.com/fengyuanchen/cropperjs/commit/1e42c5c))
* Convert data attribute name to hypen case ([61dd740](https://github.com/fengyuanchen/cropperjs/commit/61dd740))
* Fixed the order of scale and rotate ([d0f185c](https://github.com/fengyuanchen/cropperjs/commit/d0f185c))
* Improve ([073d5ec](https://github.com/fengyuanchen/cropperjs/commit/073d5ec))
* Improve browser detection ([5ad736c](https://github.com/fengyuanchen/cropperjs/commit/5ad736c))
* Release v0.7.2 ([59076d7](https://github.com/fengyuanchen/cropperjs/commit/59076d7))



## <small>0.7.1 (2016-05-28)</small>

* Add note for incorrect Orientation value ([ef6b110](https://github.com/fengyuanchen/cropperjs/commit/ef6b110))
* Add note for using cropper in modal ([1551592](https://github.com/fengyuanchen/cropperjs/commit/1551592))
* Added cdnjs link ([f272356](https://github.com/fengyuanchen/cropperjs/commit/f272356))
* Added https ([54edc50](https://github.com/fengyuanchen/cropperjs/commit/54edc50))
* Change link ([6295ebf](https://github.com/fengyuanchen/cropperjs/commit/6295ebf))
* Change order to avoid wrong behavior ([8cc4e7d](https://github.com/fengyuanchen/cropperjs/commit/8cc4e7d))
* Check cross origin setting when load image by xhr ([e9d3c9f](https://github.com/fengyuanchen/cropperjs/commit/e9d3c9f))
* Improve some descriptions ([74d6179](https://github.com/fengyuanchen/cropperjs/commit/74d6179))
* Release v0.7.1 ([af85df2](https://github.com/fengyuanchen/cropperjs/commit/af85df2))
* Removed icons ([5db61ac](https://github.com/fengyuanchen/cropperjs/commit/5db61ac))
* Replace dot with hash ([2e1f085](https://github.com/fengyuanchen/cropperjs/commit/2e1f085))
* Return the whole canvas if not cropped ([2b969ad](https://github.com/fengyuanchen/cropperjs/commit/2b969ad))
* Update assets ([1990fe6](https://github.com/fengyuanchen/cropperjs/commit/1990fe6))
* Use https ([c32c271](https://github.com/fengyuanchen/cropperjs/commit/c32c271))



## 0.7.0 (2016-03-20)

* Added !default ([80c5186](https://github.com/fengyuanchen/cropperjs/commit/80c5186))
* Added CSS settings for usage example ([212a8f9](https://github.com/fengyuanchen/cropperjs/commit/212a8f9))
* Added custom events ([3c39b4b](https://github.com/fengyuanchen/cropperjs/commit/3c39b4b))
* Added tests for events ([d3c59e1](https://github.com/fengyuanchen/cropperjs/commit/d3c59e1))
* CC BY 4.0 ([1e3adad](https://github.com/fengyuanchen/cropperjs/commit/1e3adad))
* Improve demo ([15e0f36](https://github.com/fengyuanchen/cropperjs/commit/15e0f36))
* Improve docs ([de9a590](https://github.com/fengyuanchen/cropperjs/commit/de9a590))
* Improve styles ([0e89821](https://github.com/fengyuanchen/cropperjs/commit/0e89821))
* Optimize ([113780b](https://github.com/fengyuanchen/cropperjs/commit/113780b))
* Release v0.7.0 ([4b56274](https://github.com/fengyuanchen/cropperjs/commit/4b56274))
* Simplify ([c988ed1](https://github.com/fengyuanchen/cropperjs/commit/c988ed1))
* Update data reference ([38cebe0](https://github.com/fengyuanchen/cropperjs/commit/38cebe0))
* Update demo ([63bdd63](https://github.com/fengyuanchen/cropperjs/commit/63bdd63))
* Update dependencies ([9d64e7c](https://github.com/fengyuanchen/cropperjs/commit/9d64e7c))
* Update docs ([449337d](https://github.com/fengyuanchen/cropperjs/commit/449337d))
* Update jQuery ([1938064](https://github.com/fengyuanchen/cropperjs/commit/1938064))
* Update options and styles ([fb57160](https://github.com/fengyuanchen/cropperjs/commit/fb57160))
* Update QUnit ([6bcc040](https://github.com/fengyuanchen/cropperjs/commit/6bcc040))



## 0.6.0 (2016-02-22)

* Add notes for minCropBoxWidth/Height ([3603289](https://github.com/fengyuanchen/cropperjs/commit/3603289))
* Added a new parameter to the `replace` method ([f3bf720](https://github.com/fengyuanchen/cropperjs/commit/f3bf720))
* Avoid to use the natualWidth/Height in Safari ([913d9ce](https://github.com/fengyuanchen/cropperjs/commit/913d9ce))
* Cache the image in the view box ([3bc7f07](https://github.com/fengyuanchen/cropperjs/commit/3bc7f07))
* Fix incorrect cropped canvas when scaleX/Y > 1 ([5f89114](https://github.com/fengyuanchen/cropperjs/commit/5f89114))
* Fix incorrent size limitation of the crop box ([9e33cce](https://github.com/fengyuanchen/cropperjs/commit/9e33cce)), closes [#30](https://github.com/fengyuanchen/cropperjs/issues/30)
* Fixed timestamp ([5383534](https://github.com/fengyuanchen/cropperjs/commit/5383534))
* Improve replace method ([2297459](https://github.com/fengyuanchen/cropperjs/commit/2297459))
* Not to override Orientation value to avoid side effect ([94328c9](https://github.com/fengyuanchen/cropperjs/commit/94328c9))
* Override the Orientation value for Safari ([97c59f3](https://github.com/fengyuanchen/cropperjs/commit/97c59f3))
* Release v0.6.0 ([712af0f](https://github.com/fengyuanchen/cropperjs/commit/712af0f))
* Removed Gitter badge ([bccbb38](https://github.com/fengyuanchen/cropperjs/commit/bccbb38))
* Typo ([d074ecd](https://github.com/fengyuanchen/cropperjs/commit/d074ecd))
* Update jQuery ([fdd28dc](https://github.com/fengyuanchen/cropperjs/commit/fdd28dc))



## <small>0.5.6 (2016-01-18)</small>

* Added link of an advanced example ([455a659](https://github.com/fengyuanchen/cropperjs/commit/455a659))
* Added links ([9cd66a4](https://github.com/fengyuanchen/cropperjs/commit/9cd66a4))
* Defined crossOriginUrl when exists `crossOrigin` ([7ad2ff2](https://github.com/fengyuanchen/cropperjs/commit/7ad2ff2))
* Fixed #24 ([3b61201](https://github.com/fengyuanchen/cropperjs/commit/3b61201)), closes [#24](https://github.com/fengyuanchen/cropperjs/issues/24)
* Optimize description ([7c82a26](https://github.com/fengyuanchen/cropperjs/commit/7c82a26))
* Optimized tests ([ba79c37](https://github.com/fengyuanchen/cropperjs/commit/ba79c37))
* Release v0.5.6 ([0da5c74](https://github.com/fengyuanchen/cropperjs/commit/0da5c74))
* Remove misdescription ([65dccb7](https://github.com/fengyuanchen/cropperjs/commit/65dccb7))



## <small>0.5.5 (2016-01-01)</small>

* Add related projects ([59b966b](https://github.com/fengyuanchen/cropperjs/commit/59b966b))
* Added an example for cropping round image ([967a48d](https://github.com/fengyuanchen/cropperjs/commit/967a48d))
* Floor canvas width/height instead of round ([e5dcf65](https://github.com/fengyuanchen/cropperjs/commit/e5dcf65))
* Happy Year of the Monkey :monkey: ([3e2e8d0](https://github.com/fengyuanchen/cropperjs/commit/3e2e8d0))
* Release v0.5.5 ([d5daeef](https://github.com/fengyuanchen/cropperjs/commit/d5daeef))
* Update banner ([4476f4a](https://github.com/fengyuanchen/cropperjs/commit/4476f4a))
* Updated "getByTag/Class" utilities ([9d30741](https://github.com/fengyuanchen/cropperjs/commit/9d30741))



## <small>0.5.4 (2015-12-28)</small>

* Optimize "toArray" utility ([c453071](https://github.com/fengyuanchen/cropperjs/commit/c453071))
* Release v0.5.4 ([5c2a88c](https://github.com/fengyuanchen/cropperjs/commit/5c2a88c))
* Supports to zoom from event triggering point ([35b8924](https://github.com/fengyuanchen/cropperjs/commit/35b8924))
* Update ([81ac363](https://github.com/fengyuanchen/cropperjs/commit/81ac363))
* Updated demo ([597b998](https://github.com/fengyuanchen/cropperjs/commit/597b998))
* Updated docs ([787a47e](https://github.com/fengyuanchen/cropperjs/commit/787a47e))
* Use prototype directly ([e49dfff](https://github.com/fengyuanchen/cropperjs/commit/e49dfff))



## <small>0.5.3 (2015-12-24)</small>

* Cancel to check property value ([533e708](https://github.com/fengyuanchen/cropperjs/commit/533e708)), closes [#22](https://github.com/fengyuanchen/cropperjs/issues/22)
* Fix parameter for getCroppedCanvas ([1f9fe21](https://github.com/fengyuanchen/cropperjs/commit/1f9fe21))
* Fixed #21: Limit wheel zoom speed ([7a28cef](https://github.com/fengyuanchen/cropperjs/commit/7a28cef)), closes [#21](https://github.com/fengyuanchen/cropperjs/issues/21)
* Improve class utilities ([7230754](https://github.com/fengyuanchen/cropperjs/commit/7230754))
* Improve utilities ([b3c6bed](https://github.com/fengyuanchen/cropperjs/commit/b3c6bed))
* Inserts cropper after to target image ([1cbc7d7](https://github.com/fengyuanchen/cropperjs/commit/1cbc7d7))
* Release v0.5.3 ([9383b78](https://github.com/fengyuanchen/cropperjs/commit/9383b78))
* Rename "wheeled" to "wheeling" ([0264f59](https://github.com/fengyuanchen/cropperjs/commit/0264f59))
* Simplify prototype assignment ([7510870](https://github.com/fengyuanchen/cropperjs/commit/7510870))



## <small>0.5.2 (2015-12-15)</small>

* Add csscomb task ([2cee121](https://github.com/fengyuanchen/cropperjs/commit/2cee121))
* Add homepage ([5e54a0e](https://github.com/fengyuanchen/cropperjs/commit/5e54a0e))
* Added .csscomb.json ([0d987e9](https://github.com/fengyuanchen/cropperjs/commit/0d987e9))
* Fix event handlers ([8c9b2d9](https://github.com/fengyuanchen/cropperjs/commit/8c9b2d9))
* Release v0.5.2 ([4a77ca1](https://github.com/fengyuanchen/cropperjs/commit/4a77ca1))



## <small>0.5.1 (2015-12-12)</small>

* Add ads ([bc22b6c](https://github.com/fengyuanchen/cropperjs/commit/bc22b6c))
* Add dests ([b79ab6f](https://github.com/fengyuanchen/cropperjs/commit/b79ab6f))
* Add QUnit for test ([dfad684](https://github.com/fengyuanchen/cropperjs/commit/dfad684))
* Add reference of CORS ([b9c5c39](https://github.com/fengyuanchen/cropperjs/commit/b9c5c39))
* Add styles by function ([4baeefd](https://github.com/fengyuanchen/cropperjs/commit/4baeefd))
* Add trim ([923e368](https://github.com/fengyuanchen/cropperjs/commit/923e368))
* Added .travi.yml ([e331abd](https://github.com/fengyuanchen/cropperjs/commit/e331abd))
* Added Google Analytics tracking code ([2390187](https://github.com/fengyuanchen/cropperjs/commit/2390187))
* Added hash links ([25c0c1e](https://github.com/fengyuanchen/cropperjs/commit/25c0c1e))
* Added Travi CI badge ([ffc1559](https://github.com/fengyuanchen/cropperjs/commit/ffc1559))
* Assign "this" to  "_this" ([0c4815c](https://github.com/fengyuanchen/cropperjs/commit/0c4815c))
* Continue clone when ajax error ([f85585e](https://github.com/fengyuanchen/cropperjs/commit/f85585e))
* Fix typo ([1d4d4c5](https://github.com/fengyuanchen/cropperjs/commit/1d4d4c5))
* Fix typo ([40a3994](https://github.com/fengyuanchen/cropperjs/commit/40a3994))
* Forward the calling of the "build" option ([973f289](https://github.com/fengyuanchen/cropperjs/commit/973f289))
* Handle Data URL ([08ce34f](https://github.com/fengyuanchen/cropperjs/commit/08ce34f))
* Improve "trim" function ([113cb0d](https://github.com/fengyuanchen/cropperjs/commit/113cb0d))
* Improve utilities ([d88bd06](https://github.com/fengyuanchen/cropperjs/commit/d88bd06))
* Improve utilities ([210934a](https://github.com/fengyuanchen/cropperjs/commit/210934a))
* Improved RegExps ([085af83](https://github.com/fengyuanchen/cropperjs/commit/085af83))
* Only handle 90-degree rotation when init canvas ([d334766](https://github.com/fengyuanchen/cropperjs/commit/d334766))
* Only handle Orientation great than 1 ([8981630](https://github.com/fengyuanchen/cropperjs/commit/8981630))
* Optimize code style ([46fdf87](https://github.com/fengyuanchen/cropperjs/commit/46fdf87))
* Release v0.5.1 ([b0f7280](https://github.com/fengyuanchen/cropperjs/commit/b0f7280))
* Remove unnecessary proxy ([53604ba](https://github.com/fengyuanchen/cropperjs/commit/53604ba))
* Rename "loaded" to "ready" ([725d9a8](https://github.com/fengyuanchen/cropperjs/commit/725d9a8))
* Reset "isCompleted" to "false" for re-rendering ([12d7d1d](https://github.com/fengyuanchen/cropperjs/commit/12d7d1d))
* Rollback each function ([6299e44](https://github.com/fengyuanchen/cropperjs/commit/6299e44))
* Simplify code ([9251b9c](https://github.com/fengyuanchen/cropperjs/commit/9251b9c))
* Simplify description ([77160fa](https://github.com/fengyuanchen/cropperjs/commit/77160fa))
* Simplify styles ([d2effbb](https://github.com/fengyuanchen/cropperjs/commit/d2effbb))
* Simplify variables and properties ([48257ed](https://github.com/fengyuanchen/cropperjs/commit/48257ed))
* Sort dev dependencies ([b651bf8](https://github.com/fengyuanchen/cropperjs/commit/b651bf8))
* Split test files ([4d5d096](https://github.com/fengyuanchen/cropperjs/commit/4d5d096))
* Update homepage link ([44837bc](https://github.com/fengyuanchen/cropperjs/commit/44837bc))
* Update variables ([7f8d7d3](https://github.com/fengyuanchen/cropperjs/commit/7f8d7d3))
* Use defined "imageData" ([a2ae59c](https://github.com/fengyuanchen/cropperjs/commit/a2ae59c))



## 0.5.0 (2015-12-05)

* Add a timestamp to preview image url ([f570a61](https://github.com/fengyuanchen/cropperjs/commit/f570a61))
* Add http to url ([814124f](https://github.com/fengyuanchen/cropperjs/commit/814124f))
* Add notes ([378c4a1](https://github.com/fengyuanchen/cropperjs/commit/378c4a1))
* Added  a new option: "checkOrientation" ([4a350df](https://github.com/fengyuanchen/cropperjs/commit/4a350df))
* Added a new image with the Exif Orientation ([87dda27](https://github.com/fengyuanchen/cropperjs/commit/87dda27))
* Added Gitter badge ([96d4cd1](https://github.com/fengyuanchen/cropperjs/commit/96d4cd1))
* Added html5-boilerplate ([c857014](https://github.com/fengyuanchen/cropperjs/commit/c857014))
* Added table of contents for quick view ([393930e](https://github.com/fengyuanchen/cropperjs/commit/393930e))
* Ignores undefined values ([87eb147](https://github.com/fengyuanchen/cropperjs/commit/87eb147))
* Improved .gitattributes ([6ce22df](https://github.com/fengyuanchen/cropperjs/commit/6ce22df))
* Only set defined values ([0ad6c54](https://github.com/fengyuanchen/cropperjs/commit/0ad6c54))
* Release v0.5.0 ([a8a3019](https://github.com/fengyuanchen/cropperjs/commit/a8a3019))
* Remove comment ([9bceced](https://github.com/fengyuanchen/cropperjs/commit/9bceced))
* Removed .csscomb.json ([3e7ee3f](https://github.com/fengyuanchen/cropperjs/commit/3e7ee3f))
* Update tasks ([dbcff1c](https://github.com/fengyuanchen/cropperjs/commit/dbcff1c))
* Update versions ([83250aa](https://github.com/fengyuanchen/cropperjs/commit/83250aa))



## 0.4.0 (2015-12-02)

* Add "restore" option ([0fe878c](https://github.com/fengyuanchen/cropperjs/commit/0fe878c))
* Added full crop box example ([46468a3](https://github.com/fengyuanchen/cropperjs/commit/46468a3))
* Added new "restore" option ([70c74bd](https://github.com/fengyuanchen/cropperjs/commit/70c74bd))
* Fix links ([397030b](https://github.com/fengyuanchen/cropperjs/commit/397030b))
* Fixed #12: Added vendor prefixes ([cdb658d](https://github.com/fengyuanchen/cropperjs/commit/cdb658d)), closes [#12](https://github.com/fengyuanchen/cropperjs/issues/12)
* Release v0.4.0 ([0c15da0](https://github.com/fengyuanchen/cropperjs/commit/0c15da0))
* The image should be full width ([16b70cd](https://github.com/fengyuanchen/cropperjs/commit/16b70cd))
* Update Bootstrap from v3.3.5 to v3.3.6 ([81a0f7c](https://github.com/fengyuanchen/cropperjs/commit/81a0f7c))
* Update dev dependencies ([3f89838](https://github.com/fengyuanchen/cropperjs/commit/3f89838))
* Update Font Awesome from v4.4.0 to v4.4.5 ([6bba180](https://github.com/fengyuanchen/cropperjs/commit/6bba180))
* Update QUnit from v1.19.0 to v1.20.0 ([4ffee9e](https://github.com/fengyuanchen/cropperjs/commit/4ffee9e))



## <small>0.3.3 (2015-11-30)</small>

* Add "cropper" as keyword ([3829018](https://github.com/fengyuanchen/cropperjs/commit/3829018))
* Change document title ([6d4db9c](https://github.com/fengyuanchen/cropperjs/commit/6d4db9c))
* Change the position of .cropper-bg ([a73208d](https://github.com/fengyuanchen/cropperjs/commit/a73208d))
* Floor the numerical parameters for `drawImage` ([ee056cf](https://github.com/fengyuanchen/cropperjs/commit/ee056cf))
* Release v0.3.3 ([b65292d](https://github.com/fengyuanchen/cropperjs/commit/b65292d))
* Remove optional extension ([d4267b1](https://github.com/fengyuanchen/cropperjs/commit/d4267b1))



## <small>0.3.2 (2015-11-18)</small>

* Fix version ([defb91f](https://github.com/fengyuanchen/cropperjs/commit/defb91f))
* Improved ([ef4da9d](https://github.com/fengyuanchen/cropperjs/commit/ef4da9d))
* Improved new crop box creating ([ef44621](https://github.com/fengyuanchen/cropperjs/commit/ef44621)), closes [#10](https://github.com/fengyuanchen/cropperjs/issues/10)
* Release v0.3.2 ([bbba734](https://github.com/fengyuanchen/cropperjs/commit/bbba734))
* Remove trailing spaces ([222328a](https://github.com/fengyuanchen/cropperjs/commit/222328a))
* Update html head ([8febe78](https://github.com/fengyuanchen/cropperjs/commit/8febe78))



## <small>0.3.1 (2015-11-11)</small>

* Add `overflow: hidden` to preview element ([f2fae76](https://github.com/fengyuanchen/cropperjs/commit/f2fae76))
* Add a wrap box for canvas ([0a2cafd](https://github.com/fengyuanchen/cropperjs/commit/0a2cafd))
* Add links ([ee669b8](https://github.com/fengyuanchen/cropperjs/commit/ee669b8))
* Add replace button ([96c28da](https://github.com/fengyuanchen/cropperjs/commit/96c28da))
* Added end semicolons to css text ([591ae02](https://github.com/fengyuanchen/cropperjs/commit/591ae02))
* Added example of aspect ratio range ([22e6e57](https://github.com/fengyuanchen/cropperjs/commit/22e6e57))
* Added examples ([e5a46cd](https://github.com/fengyuanchen/cropperjs/commit/e5a46cd))
* Added footer ([c3f2016](https://github.com/fengyuanchen/cropperjs/commit/c3f2016))
* Added the `is` prefix  to all boolean variables ([916b039](https://github.com/fengyuanchen/cropperjs/commit/916b039))
* Added the new `mode` option ([39c29d2](https://github.com/fengyuanchen/cropperjs/commit/39c29d2))
* Changed ([496b029](https://github.com/fengyuanchen/cropperjs/commit/496b029))
* Fix error comment ([984b8a1](https://github.com/fengyuanchen/cropperjs/commit/984b8a1))
* Fix property ([8baa5f2](https://github.com/fengyuanchen/cropperjs/commit/8baa5f2))
* Fix typo ([4b8ab46](https://github.com/fengyuanchen/cropperjs/commit/4b8ab46))
* Fixed #7: Always set the "crossOrigin" value ([a757b3e](https://github.com/fengyuanchen/cropperjs/commit/a757b3e)), closes [#7](https://github.com/fengyuanchen/cropperjs/issues/7)
* Improve "typeOf" utility function ([21eccdb](https://github.com/fengyuanchen/cropperjs/commit/21eccdb))
* Improve test ([5dc4d68](https://github.com/fengyuanchen/cropperjs/commit/5dc4d68))
* Improved ([6bd806a](https://github.com/fengyuanchen/cropperjs/commit/6bd806a))
* Improved demo ([0388fb7](https://github.com/fengyuanchen/cropperjs/commit/0388fb7))
* MIT ([9468b70](https://github.com/fengyuanchen/cropperjs/commit/9468b70))
* Optimized docs ([c70cd41](https://github.com/fengyuanchen/cropperjs/commit/c70cd41))
* Release v0.3.1 ([f217b0f](https://github.com/fengyuanchen/cropperjs/commit/f217b0f))
* Released v0.3.0 ([bb0b212](https://github.com/fengyuanchen/cropperjs/commit/bb0b212))
* Remove `overflow: hidden` from preview element ([e6eb119](https://github.com/fengyuanchen/cropperjs/commit/e6eb119))
* Remove jQuery reference ([e3e8aee](https://github.com/fengyuanchen/cropperjs/commit/e3e8aee))
* Remove jQuery reference from tests ([3d5e288](https://github.com/fengyuanchen/cropperjs/commit/3d5e288))
* Remove jQuery usage ([4771cec](https://github.com/fengyuanchen/cropperjs/commit/4771cec))
* Remove link ([1f0cfcf](https://github.com/fengyuanchen/cropperjs/commit/1f0cfcf))
* Remove test ([175fa74](https://github.com/fengyuanchen/cropperjs/commit/175fa74))
* Removed old "dragCrop" option ([18bb5d3](https://github.com/fengyuanchen/cropperjs/commit/18bb5d3))
* Rename "checkImageOrigin" to "checkCrossOrigin" ([24ab029](https://github.com/fengyuanchen/cropperjs/commit/24ab029))
* Rename "doubleClickToggle" ([d780b92](https://github.com/fengyuanchen/cropperjs/commit/d780b92))
* Rename "mode" option to "viewMode" ([04e3856](https://github.com/fengyuanchen/cropperjs/commit/04e3856))
* Rename "mouseWheelZoom" to "zoomOnWheel" ([dc7aadc](https://github.com/fengyuanchen/cropperjs/commit/dc7aadc))
* Rename "toggleDragModeOnDoubleClick" ([81ad239](https://github.com/fengyuanchen/cropperjs/commit/81ad239))
* Rename "touchDragZoom" to "zoomOnTouch" ([519f8df](https://github.com/fengyuanchen/cropperjs/commit/519f8df))
* Rename `dragCrop` option to `dragMode` ([93d8a34](https://github.com/fengyuanchen/cropperjs/commit/93d8a34))
* Renamed and improved `strict` option to `mode` ([60edabe](https://github.com/fengyuanchen/cropperjs/commit/60edabe))
* Restore `preview` option ([c2b0724](https://github.com/fengyuanchen/cropperjs/commit/c2b0724))
* Simplify ([2752d66](https://github.com/fengyuanchen/cropperjs/commit/2752d66))
* Update changed options ([219291f](https://github.com/fengyuanchen/cropperjs/commit/219291f))
* Update styles ([aa542ac](https://github.com/fengyuanchen/cropperjs/commit/aa542ac))
* Updated changelog of v0.3.0 ([3ae0ad9](https://github.com/fengyuanchen/cropperjs/commit/3ae0ad9))
* Updated demo code ([3512a56](https://github.com/fengyuanchen/cropperjs/commit/3512a56))



## <small>0.2.1 (2015-10-28)</small>

* Fix typo ([2a1f21f](https://github.com/fengyuanchen/cropperjs/commit/2a1f21f))
* Released v0.2.1 ([0dbf95d](https://github.com/fengyuanchen/cropperjs/commit/0dbf95d))
* remove jQuery reference in getCanvasData using existing each method ([ffde250](https://github.com/fengyuanchen/cropperjs/commit/ffde250))



## 0.2.0 (2015-10-25)

* Add tests for new methods ([83b19de](https://github.com/fengyuanchen/cropperjs/commit/83b19de))
* Added `move/zoom/rotateTo` and `scaleX/Y` ([9bd6b4e](https://github.com/fengyuanchen/cropperjs/commit/9bd6b4e))
* Added `naturalWidth/Height` to `canvasData` ([f5f94eb](https://github.com/fengyuanchen/cropperjs/commit/f5f94eb))
* Added CSS files ([3367262](https://github.com/fengyuanchen/cropperjs/commit/3367262))
* Export `naturalWidth/Height` with `getCanvasData` ([d6ae1d2](https://github.com/fengyuanchen/cropperjs/commit/d6ae1d2))
* Fix variable mistake ([fb57e5a](https://github.com/fengyuanchen/cropperjs/commit/fb57e5a))
* Improved the experience of cropping ([1dc67e4](https://github.com/fengyuanchen/cropperjs/commit/1dc67e4))
* Optimized tests ([76bbdbc](https://github.com/fengyuanchen/cropperjs/commit/76bbdbc))
* Parse numeric string by `Number` constructor ([bda377f](https://github.com/fengyuanchen/cropperjs/commit/bda377f))
* Released v0.2.0 ([6d959df](https://github.com/fengyuanchen/cropperjs/commit/6d959df))
* Round canvas size ([6a1aaed](https://github.com/fengyuanchen/cropperjs/commit/6a1aaed))
* The `aspectRatio` should be a positive number ([3d97343](https://github.com/fengyuanchen/cropperjs/commit/3d97343))
* Update ([c0cc90f](https://github.com/fengyuanchen/cropperjs/commit/c0cc90f))
* Update demo ([a580e1e](https://github.com/fengyuanchen/cropperjs/commit/a580e1e))
* Update tests with new changes ([e4a0893](https://github.com/fengyuanchen/cropperjs/commit/e4a0893))



## <small>0.1.1 (2015-10-10)</small>

* Add crossOrigin to preview images ([a94065d](https://github.com/fengyuanchen/cropperjs/commit/a94065d))
* Fix code styles ([c3e4695](https://github.com/fengyuanchen/cropperjs/commit/c3e4695))
* Fix date ([7d7e294](https://github.com/fengyuanchen/cropperjs/commit/7d7e294))
* Fix image path ([cb7d9a4](https://github.com/fengyuanchen/cropperjs/commit/cb7d9a4))
* Improve canvas limitation ([8a0bfc0](https://github.com/fengyuanchen/cropperjs/commit/8a0bfc0))
* Improve crop box limitation ([be8844c](https://github.com/fengyuanchen/cropperjs/commit/be8844c))
* Make crop box borders visible when full width ([2f042ed](https://github.com/fengyuanchen/cropperjs/commit/2f042ed))
* Released v0.1.1 ([d425f3b](https://github.com/fengyuanchen/cropperjs/commit/d425f3b))
* Restore `overflow: hidden` ([82dcfd0](https://github.com/fengyuanchen/cropperjs/commit/82dcfd0))



## 0.1.0 (2015-09-25)

* Added .gitattributes & .gitignore files ([3d5f69d](https://github.com/fengyuanchen/cropperjs/commit/3d5f69d))
* Released v0.1.0 ([7d34674](https://github.com/fengyuanchen/cropperjs/commit/7d34674))



