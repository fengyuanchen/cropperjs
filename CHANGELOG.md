# [2.0.0-beta.3](https://github.com/fengyuanchen/cropperjs/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2023-06-18)


### Bug Fixes

* blur the removing selection to avoid side-effects ([0a334d9](https://github.com/fengyuanchen/cropperjs/commit/0a334d9877cb25cfddb71c9cfea09e3110f2d8e5)), closes [#1022](https://github.com/fengyuanchen/cropperjs/issues/1022)



# [2.0.0-beta.2](https://github.com/fengyuanchen/cropperjs/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2022-12-04)


### Bug Fixes

* **element-image:** ignore selection move action ([c2aa7d9](https://github.com/fengyuanchen/cropperjs/commit/c2aa7d9557b8364b7426f8ca1ff16110c8ba02c5)), closes [#985](https://github.com/fengyuanchen/cropperjs/issues/985)



# [2.0.0-beta.1](https://github.com/fengyuanchen/cropperjs/compare/v2.0.0-beta...v2.0.0-beta.1) (2022-06-19)


### Bug Fixes

* **element-canvas:** correct the opposite scale direction ([9616427](https://github.com/fengyuanchen/cropperjs/commit/9616427793aa996232ca0fa9e42cd817d81c85ee))
* **element-selection:** correct canvas drawing position ([2604d15](https://github.com/fengyuanchen/cropperjs/commit/2604d155fcdebfee123fe586cf1632b365c09823)), closes [#939](https://github.com/fengyuanchen/cropperjs/issues/939)
* refresh viewer when the source image changed ([ab866e4](https://github.com/fengyuanchen/cropperjs/commit/ab866e4a4171d1fcfacbf5f194b7d222350ebcc1)), closes [#940](https://github.com/fengyuanchen/cropperjs/issues/940)



# [2.0.0-beta](https://github.com/fengyuanchen/cropperjs/compare/v2.0.0-alpha.2...v2.0.0-beta) (2022-05-01)


### Bug Fixes

* **cropperjs:** add missing initial attribute ([81c6d49](https://github.com/fengyuanchen/cropperjs/commit/81c6d49988d5d8f95dc5737f7cc836b489014af5))
* **element-canvas:** add missing attribute to observe ([87fed15](https://github.com/fengyuanchen/cropperjs/commit/87fed15c9af49bd54a71acadd00ca562b74dc839))
* **element-canvas:** fix type and add missing doc ([af831eb](https://github.com/fengyuanchen/cropperjs/commit/af831eb641c1e0b4fc5a77d329f2e63039388eaf))
* **element-selection:** drop incorrect code ([039700f](https://github.com/fengyuanchen/cropperjs/commit/039700f7bf1332e0fe66c881d51694c8c3310652))
* **element-selection:** update `active` when `multiple`  changed ([c36b026](https://github.com/fengyuanchen/cropperjs/commit/c36b0264603f7e615abe5ce3735390c1f43bf048))
* **element-shade:** toggle only when the action is select ([34775ff](https://github.com/fengyuanchen/cropperjs/commit/34775fffaeb8439b4cf0547c469f24e904babca1))
* **element:** drop `$name`'s value to avoid side effects ([97c0c60](https://github.com/fengyuanchen/cropperjs/commit/97c0c60170e03f9e793947fd27f77dcbc8afff34))
* import type only ([590b83e](https://github.com/fengyuanchen/cropperjs/commit/590b83e88e907d41017c0f9099d702bf50f33359))
* improve size adjusting ([abbdb54](https://github.com/fengyuanchen/cropperjs/commit/abbdb541c71f6f06115760d57b632cf31042d607))
* make the focusing in selection actionable ([a20c30b](https://github.com/fengyuanchen/cropperjs/commit/a20c30b53498fd21b7c0f73d6ed57742692af834))
* remove event listeners when disconnected ([d712947](https://github.com/fengyuanchen/cropperjs/commit/d71294773c93738883fd9a8ff39fe7782e2219e7))


### Features

* add `$getTagNameOf` method to get real tag name ([cfc3a41](https://github.com/fengyuanchen/cropperjs/commit/cfc3a41f4f76c4fb06830a52e20f7240f7ef2c35))
* add some methods to Cropper interface ([1428e8c](https://github.com/fengyuanchen/cropperjs/commit/1428e8c6f44a6ae0ae8d1302e129d4b6ddc39530))
* allow to zoom image and selection together ([a8dcbe7](https://github.com/fengyuanchen/cropperjs/commit/a8dcbe74df52851f2d95c9af6631cd16851c5678))
* **cropper-image:** support to rotate by offset ([1993e2e](https://github.com/fengyuanchen/cropperjs/commit/1993e2e65a3009a523c2730f2a4bec1361a58a10))
* **element-canvas:** add 2 options to `$toCanvas` ([8f9e21e](https://github.com/fengyuanchen/cropperjs/commit/8f9e21e1b2f636a5fdc7ad53a2158f61508ffa61))
* **element-selection:** add 2 options to $toCanvas ([e3cdfd9](https://github.com/fengyuanchen/cropperjs/commit/e3cdfd90e62c50dd588e164fb6083e69ba3e756b))
* support two-finger touch rotation ([0b3f262](https://github.com/fengyuanchen/cropperjs/commit/0b3f2625a3a8e2b945d87b25e92c3b90d18ee6e1))
* **types:** add `Selection` interface ([51855c4](https://github.com/fengyuanchen/cropperjs/commit/51855c45d9eec1efbcc111200510a11a5400f203))


### Performance Improvements

* use `transform` for better performance ([23ab36b](https://github.com/fengyuanchen/cropperjs/commit/23ab36b26cfe9c9a4009bc69574579902509906d))



# [2.0.0-alpha.2](https://github.com/fengyuanchen/cropperjs/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2021-12-25)


### Bug Fixes

* add `$cropper-image-path` variable into the SCSS file for Sass users ([#498](https://github.com/fengyuanchen/cropperjs/issues/498)) ([086f260](https://github.com/fengyuanchen/cropperjs/commit/086f2608d575a941a92f6f059e08055027bff8c0))
* check if the preview image is ready ([38c3f67](https://github.com/fengyuanchen/cropperjs/commit/38c3f678980570059f6bbceff4ea10da294ee666)), closes [#654](https://github.com/fengyuanchen/cropperjs/issues/654)
* improve container resizing ([d9e3f76](https://github.com/fengyuanchen/cropperjs/commit/d9e3f76633f0a86614b726fb2cdefd34834c5a33)), closes [#636](https://github.com/fengyuanchen/cropperjs/issues/636)
* improve ratio comparsion for negative value ([a165bf1](https://github.com/fengyuanchen/cropperjs/commit/a165bf13e66ab845e287d32507ad0a5345e8f24b)), closes [#726](https://github.com/fengyuanchen/cropperjs/issues/726)
* IS_TOUCH_DEVICE ([#614](https://github.com/fengyuanchen/cropperjs/issues/614)) ([2ebf9ec](https://github.com/fengyuanchen/cropperjs/commit/2ebf9ece0ea461f2c53eed2ae0679d81917fcec7))
* keep back compatibility ([#799](https://github.com/fengyuanchen/cropperjs/issues/799)) ([2f939db](https://github.com/fengyuanchen/cropperjs/commit/2f939dbf4d2b53e8b79964189d12a77a50391429))
* move initial image data storing to a reasonable place ([bbdc758](https://github.com/fengyuanchen/cropperjs/commit/bbdc7589c87d891b9c5f73608293940b5ba55f83))
* set the request to be asynchronous explicitly ([9ac4738](https://github.com/fengyuanchen/cropperjs/commit/9ac4738afcf7f118a63844535e498aa67374e932)), closes [#682](https://github.com/fengyuanchen/cropperjs/issues/682)
* support to set the minContainerWidth/Height to 0 ([db8b851](https://github.com/fengyuanchen/cropperjs/commit/db8b851c3029cee0a91575b027e35b9e6a76e2af)), closes [#683](https://github.com/fengyuanchen/cropperjs/issues/683)
* **types:** add missing `MouseEvent` to the original event of the `zoom` event ([5018357](https://github.com/fengyuanchen/cropperjs/commit/5018357971e53d269dc80eafa0ec79380608c182))
* typescript typing ([#791](https://github.com/fengyuanchen/cropperjs/issues/791)) ([7db38ce](https://github.com/fengyuanchen/cropperjs/commit/7db38ced9be189ece937256b2b17bf7cd4b15214))
* **types:** improve the types for the `preview` option ([#731](https://github.com/fengyuanchen/cropperjs/issues/731)) ([1f4f3f9](https://github.com/fengyuanchen/cropperjs/commit/1f4f3f9ee1d5e91bb612f456c7ff56312e3bdf8c))
* use the max ratio of the X/Y-axis for resizing ([1c822ef](https://github.com/fengyuanchen/cropperjs/commit/1c822efe6a90d95e334da0475c70fdb763851bdc)), closes [#835](https://github.com/fengyuanchen/cropperjs/issues/835)


### Features

* **types:** add TypeScript declarations for the events ([68200c0](https://github.com/fengyuanchen/cropperjs/commit/68200c0c2cfb8e84f555a049db28323578b14b2a))


### Performance Improvements

* simplify max zoom ratio computing ([6039b12](https://github.com/fengyuanchen/cropperjs/commit/6039b12ea66c91b11d33b3cb332b0922875101b6))



# [2.0.0-alpha.1](https://github.com/fengyuanchen/cropperjs/compare/v1.5.6...v2.0.0-alpha.1) (2019-11-09)


### Bug Fixes

* drop limited property ([d04b9c8](https://github.com/fengyuanchen/cropperjs/commit/d04b9c82c6bd6970d33bc2dda734c3f6c6fa1c4e))
* improve crop box changing ([ea86afb](https://github.com/fengyuanchen/cropperjs/commit/ea86afbe0334670eeccf4707617b6fc32e35fd5e))
* improve first cropping when there is aspect ratio ([99e6b54](https://github.com/fengyuanchen/cropperjs/commit/99e6b5452739f91bc4b1ed14119f48a73c3c6175))


### Features

* add 4 new options for the canvas and crop box ([e2273fd](https://github.com/fengyuanchen/cropperjs/commit/e2273fdb27784b3f428d8c52c87ec7ce59d65601))



## [1.5.6](https://github.com/fengyuanchen/cropperjs/compare/v1.5.5...v1.5.6) (2019-10-04)


### Bug Fixes

* improve event type determining for iOS 13+ ([7f7422c](https://github.com/fengyuanchen/cropperjs/commit/7f7422c291fe8363263eae8ba942da920f049340)), closes [#571](https://github.com/fengyuanchen/cropperjs/issues/571)



## [1.5.5](https://github.com/fengyuanchen/cropperjs/compare/v1.5.4...v1.5.5) (2019-08-04)


### Bug Fixes

* clone the image's `crossOrigin` attribute always ([8d89392](https://github.com/fengyuanchen/cropperjs/commit/8d893924dda14e3e700b2f2d5221af01686235f6)), closes [#535](https://github.com/fengyuanchen/cropperjs/issues/535) [#552](https://github.com/fengyuanchen/cropperjs/issues/552)
* improve browser detecting ([#554](https://github.com/fengyuanchen/cropperjs/issues/554)) ([54b30e5](https://github.com/fengyuanchen/cropperjs/commit/54b30e5b0f4a9b3f05b500a44ac0d26c1174388a))



## [1.5.4](https://github.com/fengyuanchen/cropperjs/compare/v1.5.3...v1.5.4) (2019-07-20)


### Bug Fixes

* add `alt` attribute to all internal images for better accessibility ([5036473](https://github.com/fengyuanchen/cropperjs/commit/50364731a5574df502aeabb24398d515f20fb654)), closes [#548](https://github.com/fengyuanchen/cropperjs/issues/548)
* avoid removing the events of the original image ([76d5949](https://github.com/fengyuanchen/cropperjs/commit/76d594949267423b9fade68a68c7ce2d9172fcbb))
* avoid requesting Data URLs by XMLHttpRequest for better performance ([1eae10c](https://github.com/fengyuanchen/cropperjs/commit/1eae10c375e8fbf014e050bfd648d8e7ce03a419)), closes [#526](https://github.com/fengyuanchen/cropperjs/issues/526)
* transform the TS types for the drag mode, smoothing quality and view mode options ([#550](https://github.com/fengyuanchen/cropperjs/issues/550)) ([f4e306f](https://github.com/fengyuanchen/cropperjs/commit/f4e306f867b833b1487c8157874bb57f2aad9bf1))
* transform the ViewMode enum too ([153f9e3](https://github.com/fengyuanchen/cropperjs/commit/153f9e3f071b4cda287cf6d051b30692c674fd73))



## [1.5.3](https://github.com/fengyuanchen/cropperjs/compare/v1.5.2...v1.5.3) (2019-07-10)


### Bug Fixes

* check all browsers use WebKit as the layout engine in iOS devices ([c9a83d3](https://github.com/fengyuanchen/cropperjs/commit/c9a83d3d3be2e1a7f14d440e7f20d368029ae85e)), closes [#544](https://github.com/fengyuanchen/cropperjs/issues/544) [#545](https://github.com/fengyuanchen/cropperjs/issues/545)



## [1.5.2](https://github.com/fengyuanchen/cropperjs/compare/v1.5.1...v1.5.2) (2019-06-30)


### Bug Fixes

* alway add a timestamp to the url of a cross origin image ([f4b22b4](https://github.com/fengyuanchen/cropperjs/commit/f4b22b4e8625bece67c35e2c70d6c5a2f5466d49)), closes [#519](https://github.com/fengyuanchen/cropperjs/issues/519)



## [1.5.1](https://github.com/fengyuanchen/cropperjs/compare/v1.5.0...v1.5.1) (2019-03-10)


### Bug Fixes

* revert the min container width and height ([3184327](https://github.com/fengyuanchen/cropperjs/commit/31843278712089287403183030192e640e827293))



# [1.5.0](https://github.com/fengyuanchen/cropperjs/compare/v1.4.3...v1.5.0) (2019-03-10)


### Bug Fixes

* avoid typed array spreading error in IE or Safari 9 ([fff0a8d](https://github.com/fengyuanchen/cropperjs/commit/fff0a8d610b0b84c2b61226388d3a3e65c39f5a9))
* correct Safari detecting ([9db59b9](https://github.com/fengyuanchen/cropperjs/commit/9db59b9794a2f53aa090f74b49a8b8fb8e4fa3c8)), closes [#478](https://github.com/fengyuanchen/cropperjs/issues/478)
* ignore the pointer events are not triggered by the primary button ([a0e1e32](https://github.com/fengyuanchen/cropperjs/commit/a0e1e32767386fdd56ab61cd6f46ea1aba721e7a))


### Performance Improvements

* add options to wheel event for better performance ([4cbf6e4](https://github.com/fengyuanchen/cropperjs/commit/4cbf6e45435d9f7cb8a8b856ca97ea33a1e6172b))
* improve utilities ([61738ec](https://github.com/fengyuanchen/cropperjs/commit/61738ec76d6006980ab88bb5e8907baca32bb2bd))
* simplify url checking ([c8182db](https://github.com/fengyuanchen/cropperjs/commit/c8182db75e6ea47e566e5b3d910478b4345eed73))



## [1.4.3](https://github.com/fengyuanchen/cropperjs/compare/v1.4.2...v1.4.3) (2018-10-24)


### Bug Fixes

* avoid range error ([5fb1774](https://github.com/fengyuanchen/cropperjs/commit/5fb1774248f03f860e631c34e8a26413dd108407))
* ignore range error when the image has incorrect Exif information ([2ca48d4](https://github.com/fengyuanchen/cropperjs/commit/2ca48d44569eeac2d11887eef30c53a3110829e6))



## [1.4.2](https://github.com/fengyuanchen/cropperjs/compare/v1.4.1...v1.4.2) (2018-10-15)


### Bug Fixes

* add missing static methods ([78a0ba5](https://github.com/fengyuanchen/cropperjs/commit/78a0ba5bfc69bd54c107f2c319b1660ad9639782))
* fall back first parameter to empty object to avoid error ([dcfc79c](https://github.com/fengyuanchen/cropperjs/commit/dcfc79cf3c5235a37019a6e5e7110a4466bc535d)), closes [#432](https://github.com/fengyuanchen/cropperjs/issues/432)
* improve cropper instance storage to avoid side effect ([9f30bc7](https://github.com/fengyuanchen/cropperjs/commit/9f30bc717abd7a388d49c52573616e90bfe0ac7f)), closes [#394](https://github.com/fengyuanchen/cropperjs/issues/394)
* remove useless modifier ([f218cb8](https://github.com/fengyuanchen/cropperjs/commit/f218cb8d2f1fd6b0c59564ca55ff5f44c45dd520))
* reset abort event handler before abort ([bf938d1](https://github.com/fengyuanchen/cropperjs/commit/bf938d1ed5da2b9daaafd124a7da1eac6ae6b2bb))


### Performance Improvements

* add characters in chunks in dataURLToArrayBuffer ([ac54c61](https://github.com/fengyuanchen/cropperjs/commit/ac54c61f44a78131485ff9415fe0ea3ed03423ed))
* check mime type in progress event insted of load event ([dc1da14](https://github.com/fengyuanchen/cropperjs/commit/dc1da145e0b2ba2b95787ddf75336c260afe9c56))
* don't recompute the DataUrl if it is already known ([#422](https://github.com/fengyuanchen/cropperjs/issues/422)) ([af3a300](https://github.com/fengyuanchen/cropperjs/commit/af3a300cef9f2bd58366c3d7d824450859abac4e))
* grow chunk size and reduce typed array ([d51a7c1](https://github.com/fengyuanchen/cropperjs/commit/d51a7c100e259b2e42f531bee197ce2161e77a7e))
* read orientation only when it is a JPEG image ([c644e0b](https://github.com/fengyuanchen/cropperjs/commit/c644e0b4c48d1c2edb297a4f0fa97e82624d0ee6))
* simplify code ([aa0ea3d](https://github.com/fengyuanchen/cropperjs/commit/aa0ea3de1686f7165196fa1444ae0135a3bf07ca))


### Reverts

* always generate a new Data URL to avoid side effect ([089f9b3](https://github.com/fengyuanchen/cropperjs/commit/089f9b3b4e0039e8ad2fe545ccaf13a5948df35c)), closes [#422](https://github.com/fengyuanchen/cropperjs/issues/422)



## [1.4.1](https://github.com/fengyuanchen/cropperjs/compare/v1.4.0...v1.4.1) (2018-07-15)


### Bug Fixes

* correct calc usage ([eee2153](https://github.com/fengyuanchen/cropperjs/commit/eee2153bb5a0ae0db53d4c0e85c9ee0e83e702be))
* crop box overflows in "viewMode" 1 and 2 ([#381](https://github.com/fengyuanchen/cropperjs/issues/381)) ([44f50a3](https://github.com/fengyuanchen/cropperjs/commit/44f50a33f8b48f0f987955158f524ab6b79a899c))
* not to restrict the canvas position when it is not croppe ([e1b015b](https://github.com/fengyuanchen/cropperjs/commit/e1b015bdbc1947a141fef48f889c2aad00200c93))
* revert missing case of [#381](https://github.com/fengyuanchen/cropperjs/issues/381) ([21e14ea](https://github.com/fengyuanchen/cropperjs/commit/21e14eacd1a6873b12eb23eab3ac7dd5a881df21))


### Features

* add scss files ([37c998a](https://github.com/fengyuanchen/cropperjs/commit/37c998acc0357304d703f0d5d6dfaef5d7429b3c)), closes [#360](https://github.com/fengyuanchen/cropperjs/issues/360)


### Performance Improvements

* simplify code from [#381](https://github.com/fengyuanchen/cropperjs/issues/381) ([086a568](https://github.com/fengyuanchen/cropperjs/commit/086a568d3ffc3c9d2ce3f4ce4b00d4d05afe407a))
* use native `forEach` first for better performance ([e2ae655](https://github.com/fengyuanchen/cropperjs/commit/e2ae655fa00149f21bc52d18276a7b47d5abf2da))



# [1.4.0](https://github.com/fengyuanchen/cropperjs/compare/v1.3.6...v1.4.0) (2018-06-01)


### Bug Fixes

* improve the smoothness of crop box resizing ([2b606c9](https://github.com/fengyuanchen/cropperjs/commit/2b606c9613b4f3483940b65c2a08611b7b13762d))


### Features

* add new option `initialAspectRatio` ([cc35974](https://github.com/fengyuanchen/cropperjs/commit/cc35974c25edabcc28a6f57a3b96b7910e1fb346))


### Performance Improvements

* unnecessary to compute ratio again ([5fde17e](https://github.com/fengyuanchen/cropperjs/commit/5fde17e07af25f247dd1fcc5453b4dd00fd82bfe))



## [1.3.6](https://github.com/fengyuanchen/cropperjs/compare/v1.3.5...v1.3.6) (2018-05-20)


### Bug Fixes

* cancel enums exporting ([92331e8](https://github.com/fengyuanchen/cropperjs/commit/92331e82e547ab6fd09e7b0d476d06db4739df1d)), closes [#336](https://github.com/fengyuanchen/cropperjs/issues/336)
* check orientation only when it is rotatable and scalable ([b277a18](https://github.com/fengyuanchen/cropperjs/commit/b277a18190ae82b9a0d7b2f7c4741f0b4e941f13))
* rounding off problem of getData ([1e19cd2](https://github.com/fengyuanchen/cropperjs/commit/1e19cd2dab59296831fdbe78fd8381ff44660bf0)), closes [#343](https://github.com/fengyuanchen/cropperjs/issues/343)
* set checkOrientation to false when it is unnecessary ([d828952](https://github.com/fengyuanchen/cropperjs/commit/d8289524e91422a305c22b8cafbfa9cc41ebc355))



## [1.3.5](https://github.com/fengyuanchen/cropperjs/compare/v1.3.4...v1.3.5) (2018-04-15)


### Bug Fixes

* ensure the cloned image loads completely before ready ([acfa14c](https://github.com/fengyuanchen/cropperjs/commit/acfa14cc31fd3985ee602de7b69e25a7b1801d9b)), closes [#303](https://github.com/fengyuanchen/cropperjs/issues/303)



## [1.3.4](https://github.com/fengyuanchen/cropperjs/compare/v1.3.3...v1.3.4) (2018-03-31)


### Bug Fixes

* compute destination size with image's aspect ratio ([3dbbbf4](https://github.com/fengyuanchen/cropperjs/commit/3dbbbf4b87510f283a95a4ae654ab29bc1aabcc0)), closes [#326](https://github.com/fengyuanchen/cropperjs/issues/326)


### Reverts

* Revert "fix: export const enum for runtime" ([1edfd73](https://github.com/fengyuanchen/cropperjs/commit/1edfd731dbc5e432cd9bfa718f97c2717820475a))



## [1.3.3](https://github.com/fengyuanchen/cropperjs/compare/v1.3.2...v1.3.3) (2018-03-18)


### Bug Fixes

* add browser env checking for using in node.js ([f2f1172](https://github.com/fengyuanchen/cropperjs/commit/f2f1172ddab27a4caaba394de111f08e081a18a1))
* add missing pivot to zoomTo ([#320](https://github.com/fengyuanchen/cropperjs/issues/320)) ([de843e1](https://github.com/fengyuanchen/cropperjs/commit/de843e17cd2044911fc0d9ba1a876ac1dac55d51))
* avoid a `TypeError` in strict mode ([a456d69](https://github.com/fengyuanchen/cropperjs/commit/a456d6913ec1c3b1021603bf90ba116b97b0bd52))
* export const enum for runtime ([58e3c3c](https://github.com/fengyuanchen/cropperjs/commit/58e3c3c4e5748fb3c85a01ee76977e9fd161d73d)), closes [#308](https://github.com/fengyuanchen/cropperjs/issues/308)


### Performance Improvements

* improve event utils ([8d005d0](https://github.com/fengyuanchen/cropperjs/commit/8d005d0a151303d4c7e0addf99afc7367c0b9fdf))



## [1.3.2](https://github.com/fengyuanchen/cropperjs/compare/v1.3.1...v1.3.2) (2018-03-03)


### Bug Fixes

* draw with image's natural sizes ([2c13262](https://github.com/fengyuanchen/cropperjs/commit/2c132623b04fbb5878869c1a3af718366dade85a)), closes [#313](https://github.com/fengyuanchen/cropperjs/issues/313)



## [1.3.1](https://github.com/fengyuanchen/cropperjs/compare/v1.3.0...v1.3.1) (2018-02-28)


### Bug Fixes

* add missing `width` and `height` definitions ([06f6b36](https://github.com/fengyuanchen/cropperjs/commit/06f6b3624c82ba6dc26b9875eb8ac44af5b625e5)), closes [#302](https://github.com/fengyuanchen/cropperjs/issues/302)
* correct view mode 2 ([38f418f](https://github.com/fengyuanchen/cropperjs/commit/38f418f3e2697d50ccf3658cc728713522154aba)), closes [#304](https://github.com/fengyuanchen/cropperjs/issues/304)
* **package:** remove browser field ([#307](https://github.com/fengyuanchen/cropperjs/issues/307)) ([d679bc3](https://github.com/fengyuanchen/cropperjs/commit/d679bc3b6a7d7453b96187d2c24349eda3457d77))
* should only trigger start handler once ([0090b1e](https://github.com/fengyuanchen/cropperjs/commit/0090b1e3e25d4c0088ccd3821c3a9365bf4bcdb7)), closes [#306](https://github.com/fengyuanchen/cropperjs/issues/306)



# [1.3.0](https://github.com/fengyuanchen/cropperjs/compare/v1.2.2...v1.3.0) (2018-02-25)


### Bug Fixes

* correct cropped sizes when provide max/min sizes ([187fa61](https://github.com/fengyuanchen/cropperjs/commit/187fa6127ea1f86d64fc0bf0dd4feaf24d2f302a))
* the `setDragMode` method only available when it is ready ([2b70af4](https://github.com/fengyuanchen/cropperjs/commit/2b70af462eee8e145c63362c7c516ecd8c0a28a8))


### Features

* add type definitions file for TypeScript ([3a079ad](https://github.com/fengyuanchen/cropperjs/commit/3a079ad3ce1b25e4e7b5882e451fc1148619ec00))
* enhance the `preview` option ([9f235ff](https://github.com/fengyuanchen/cropperjs/commit/9f235ff8bcb969bc449075e9a8339d908cffc77b))


### Performance Improvements

* improve async process ([375cd51](https://github.com/fengyuanchen/cropperjs/commit/375cd51268285d4212ec9f84a8effbedd16120eb))
* improve some methods ([a89e0f5](https://github.com/fengyuanchen/cropperjs/commit/a89e0f5b1247fa6ed7ba2ecbbc232d0d00032f72))
* improve utilities ([a0777bd](https://github.com/fengyuanchen/cropperjs/commit/a0777bd50e003886d01cd66ff09865e3583d6009))
* improve XMLHTTPRequest abort ([4495b31](https://github.com/fengyuanchen/cropperjs/commit/4495b313c3decf57778b2dd6bcb962178b94ee3f))



## [1.2.2](https://github.com/fengyuanchen/cropperjs/compare/v1.2.1...v1.2.2) (2018-01-03)


### Bug Fixes

* incorrect image natual sizes in iOS Safari ([5e3cdc4](https://github.com/fengyuanchen/cropperjs/commit/5e3cdc47a1c336d435a531597459361eba0d0db5)), closes [#279](https://github.com/fengyuanchen/cropperjs/issues/279)
* override `max-*` and `min-*` styles ([2ff231e](https://github.com/fengyuanchen/cropperjs/commit/2ff231e63f80a0e36fcd057e2ee9239e5c34fb5f))



## [1.2.1](https://github.com/fengyuanchen/cropperjs/compare/v1.2.0...v1.2.1) (2017-12-17)


### Bug Fixes

* append image to dom to get correct size ([4ec5062](https://github.com/fengyuanchen/cropperjs/commit/4ec5062c8d7fe5bd8d2a30d8df5b08b2f5ea4423)), closes [#256](https://github.com/fengyuanchen/cropperjs/issues/256)
* fall back to documentElement if body is not existing ([fea4b72](https://github.com/fengyuanchen/cropperjs/commit/fea4b726da3277e4e07b3540191806ff40f0fd93))


### Features

* add style field to package.json ([98abdd2](https://github.com/fengyuanchen/cropperjs/commit/98abdd2ffbc338b2b98dc913312b7f4540a48e0e))



# [1.2.0](https://github.com/fengyuanchen/cropperjs/compare/v1.1.3...v1.2.0) (2017-12-17)


### Bug Fixes

* correct rotated size computing ([572c0e2](https://github.com/fengyuanchen/cropperjs/commit/572c0e2d52f2a427f5f88e88a619d98011d1a220)), closes [#260](https://github.com/fengyuanchen/cropperjs/issues/260)
* fallback for deleting property in element ([c84d3ce](https://github.com/fengyuanchen/cropperjs/commit/c84d3ce7e4807f426c67d277f89008ae55b18293))
* improve event binding ([662c945](https://github.com/fengyuanchen/cropperjs/commit/662c9458d2a0fcacd808da318200c1e9ab00bea8))
* simplify event binding ([6fdfcb4](https://github.com/fengyuanchen/cropperjs/commit/6fdfcb4e9b5511353ba4e548770fbf09a038d28f))


### Features

* add pivot to zoomTo method ([2d99d2c](https://github.com/fengyuanchen/cropperjs/commit/2d99d2ceefde5995d8578904eeebf1b59169172d)), closes [#144](https://github.com/fengyuanchen/cropperjs/issues/144)



## [1.1.3](https://github.com/fengyuanchen/cropperjs/compare/v1.1.2...v1.1.3) (2017-10-21)


### Bug Fixes

* error when disable one of rotatable and scalable options ([bdbc456](https://github.com/fengyuanchen/cropperjs/commit/bdbc456f8ff031da3bec47e0e18827d94789af1d)), closes [#241](https://github.com/fengyuanchen/cropperjs/issues/241)



## [1.1.2](https://github.com/fengyuanchen/cropperjs/compare/v1.1.1...v1.1.2) (2017-10-18)


### Bug Fixes

* normalize decimal numbers when crop an image ([43df5f3](https://github.com/fengyuanchen/cropperjs/commit/43df5f3908a4e542f75730a51804e2e80fe76a81))



## [1.1.1](https://github.com/fengyuanchen/cropperjs/compare/v1.1.0...v1.1.1) (2017-10-11)


### Bug Fixes

* event listener should be a function ([0fe0c8f](https://github.com/fengyuanchen/cropperjs/commit/0fe0c8f44f4aefff79cf1b6b004ffd0506fd54ff)), closes [#238](https://github.com/fengyuanchen/cropperjs/issues/238)
* fix the originalUrl when src is not present ([#234](https://github.com/fengyuanchen/cropperjs/issues/234)) ([2498140](https://github.com/fengyuanchen/cropperjs/commit/2498140cd0f649e545daed03fa220b2e3dbe5773))
* supports to load in node environment ([86a42c6](https://github.com/fengyuanchen/cropperjs/commit/86a42c6838a872e376c7db061137ba2878fccee3)), closes [#237](https://github.com/fengyuanchen/cropperjs/issues/237)



# [1.1.0](https://github.com/fengyuanchen/cropperjs/compare/v1.0.0...v1.1.0) (2017-10-08)


### Bug Fixes

* improve action changing condition ([5a7c4f2](https://github.com/fengyuanchen/cropperjs/commit/5a7c4f2bd8e11991cb13884e89a113eb7d4ac6e8))
* improve event adding and removing ([720f3a9](https://github.com/fengyuanchen/cropperjs/commit/720f3a9d29dbb03f6bc2069784a394605e140a0d))
* improve resizing condition ([ad379ce](https://github.com/fengyuanchen/cropperjs/commit/ad379ce605f0702a42075e4947e19c590223e87b)), closes [#229](https://github.com/fengyuanchen/cropperjs/issues/229)
* output clone to avoid side effect ([3d99679](https://github.com/fengyuanchen/cropperjs/commit/3d996795cd6f228dac20d0db5e376104be45658f))
* set the default value of imageSmoothingEnabled ([2f3a5d4](https://github.com/fengyuanchen/cropperjs/commit/2f3a5d482598d7bba6e0a23774fc158b434a765a)), closes [#232](https://github.com/fengyuanchen/cropperjs/issues/232)
* throw error is the first argument is invalid ([04cbf0a](https://github.com/fengyuanchen/cropperjs/commit/04cbf0a4f8bdeeebcded0bb1b3e5b8c123013914)), closes [#227](https://github.com/fengyuanchen/cropperjs/issues/227)


### Features

* add 4 new options to `getCroppedCanvas` method ([2e8f7a5](https://github.com/fengyuanchen/cropperjs/commit/2e8f7a512179e75a3e9a478224a0e1f1d7435b5c))
* enhance scale ([cbfe15d](https://github.com/fengyuanchen/cropperjs/commit/cbfe15df0ba3e4fb864b9cc5ff31a8d0a11c2e8a))


### Performance Improvements

* remove window detecting as window is required ([5a86608](https://github.com/fengyuanchen/cropperjs/commit/5a86608438ab729cedfadce4f39c8ea9cf53c9a4))
* simplify element query ([c2a6bb5](https://github.com/fengyuanchen/cropperjs/commit/c2a6bb502acc5870f22b9d473910009d24e5bbf5))



# [1.0.0](https://github.com/fengyuanchen/cropperjs/compare/v1.0.0-rc.3...v1.0.0) (2017-09-03)


### Bug Fixes

* improve crop box resizing ([9257e06](https://github.com/fengyuanchen/cropperjs/commit/9257e06bb2811803f59d2aeab7c2db3f736cf7b3)), closes [#222](https://github.com/fengyuanchen/cropperjs/issues/222)
* zoom out bug after clear in view mode 1, 2, 3 ([7276d7b](https://github.com/fengyuanchen/cropperjs/commit/7276d7b19e948ce010a4746b8f5bb46603452779)), closes [#209](https://github.com/fengyuanchen/cropperjs/issues/209)



# [1.0.0-rc.3](https://github.com/fengyuanchen/cropperjs/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2017-07-07)



# [1.0.0-rc.2](https://github.com/fengyuanchen/cropperjs/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2017-05-30)



# [1.0.0-rc.1](https://github.com/fengyuanchen/cropperjs/compare/v1.0.0-rc...v1.0.0-rc.1) (2017-04-30)



# [1.0.0-rc](https://github.com/fengyuanchen/cropperjs/compare/v1.0.0-beta.2...v1.0.0-rc) (2017-03-25)



# [1.0.0-beta.2](https://github.com/fengyuanchen/cropperjs/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2017-02-25)



# [1.0.0-beta.1](https://github.com/fengyuanchen/cropperjs/compare/v1.0.0-beta...v1.0.0-beta.1) (2017-01-21)



# [1.0.0-beta](https://github.com/fengyuanchen/cropperjs/compare/v1.0.0-alpha...v1.0.0-beta) (2017-01-01)



# [1.0.0-alpha](https://github.com/fengyuanchen/cropperjs/compare/v0.8.1...v1.0.0-alpha) (2016-12-04)



## [0.8.1](https://github.com/fengyuanchen/cropperjs/compare/v0.8.0...v0.8.1) (2016-09-03)



# [0.8.0](https://github.com/fengyuanchen/cropperjs/compare/v0.7.2...v0.8.0) (2016-08-18)



## [0.7.2](https://github.com/fengyuanchen/cropperjs/compare/v0.7.1...v0.7.2) (2016-06-08)



## [0.7.1](https://github.com/fengyuanchen/cropperjs/compare/v0.7.0...v0.7.1) (2016-05-28)



# [0.7.0](https://github.com/fengyuanchen/cropperjs/compare/v0.6.0...v0.7.0) (2016-03-20)



# [0.6.0](https://github.com/fengyuanchen/cropperjs/compare/v0.5.6...v0.6.0) (2016-02-22)



## [0.5.6](https://github.com/fengyuanchen/cropperjs/compare/v0.5.5...v0.5.6) (2016-01-18)



## [0.5.5](https://github.com/fengyuanchen/cropperjs/compare/v0.5.4...v0.5.5) (2016-01-01)



## [0.5.4](https://github.com/fengyuanchen/cropperjs/compare/v0.5.3...v0.5.4) (2015-12-28)



## [0.5.3](https://github.com/fengyuanchen/cropperjs/compare/v0.5.2...v0.5.3) (2015-12-24)



## [0.5.2](https://github.com/fengyuanchen/cropperjs/compare/v0.5.1...v0.5.2) (2015-12-15)



## [0.5.1](https://github.com/fengyuanchen/cropperjs/compare/v0.5.0...v0.5.1) (2015-12-12)



# [0.5.0](https://github.com/fengyuanchen/cropperjs/compare/v0.4.0...v0.5.0) (2015-12-05)



# [0.4.0](https://github.com/fengyuanchen/cropperjs/compare/v0.3.3...v0.4.0) (2015-12-02)



## [0.3.3](https://github.com/fengyuanchen/cropperjs/compare/v0.3.2...v0.3.3) (2015-11-30)



## [0.3.2](https://github.com/fengyuanchen/cropperjs/compare/v0.3.1...v0.3.2) (2015-11-18)



## [0.3.1](https://github.com/fengyuanchen/cropperjs/compare/v0.3.0...v0.3.1) (2015-11-11)



## [0.2.1](https://github.com/fengyuanchen/cropperjs/compare/v0.2.0...v0.2.1) (2015-10-28)



# [0.2.0](https://github.com/fengyuanchen/cropperjs/compare/v0.1.1...v0.2.0) (2015-10-25)



## [0.1.1](https://github.com/fengyuanchen/cropperjs/compare/v0.1.0...v0.1.1) (2015-10-10)



# 0.1.0 (2015-09-25)



