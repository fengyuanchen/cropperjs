<template>
  <div
    v-if="loading && !transitioning"
    class="loading"
  />
  <div
    v-else-if="!transitioning"
    class="playground"
  >
    <aside>
      <section>
        <h6>&lt;cropper-canvas&gt;</h6>
        <ul>
          <li>
            <label for="canvasHidden">hidden</label>
            <input
              id="canvasHidden"
              v-model="canvas.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label for="canvasBackground">background</label>
            <input
              id="canvasBackground"
              v-model="canvas.background"
              type="checkbox"
              name="background"
            >
          </li>
          <li>
            <label for="canvasDisabled">disabled</label>
            <input
              id="canvasDisabled"
              v-model="canvas.disabled"
              type="checkbox"
              name="disabled"
            >
          </li>
          <li>
            <label for="canvasScaleStep">scale-step</label>
            <input
              id="canvasScaleStep"
              v-model="canvas.scaleStep"
              type="number"
              name="scaleStep"
              min="0.1"
              max="1"
              step="0.1"
            >
          </li>
          <li>
            <label for="canvasThemeColor">theme-color</label>
            <color-input
              id="canvasThemeColor"
              v-model="canvas.themeColor"
              type="color"
              class="form-control form-control-color form-control-sm"
              name="themeColor"
            />
          </li>
          <li>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm btn-block"
              data-bs-toggle="modal"
              data-bs-target="#canvasViewerModal"
              @click="cropperCanvasToCanvas"
            >
              $toCanvas()
            </button>
          </li>
        </ul>
      </section>
      <section>
        <h6>&lt;cropper-image&gt;</h6>
        <ul>
          <li>
            <label for="imageHidden">hidden</label>
            <input
              id="imageHidden"
              v-model="image.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label for="imageRotatable">rotatable</label>
            <input
              id="imageRotatable"
              v-model="image.rotatable"
              type="checkbox"
              name="rotatable"
            >
          </li>
          <li>
            <label for="imageScalable">scalable</label>
            <input
              id="imageScalable"
              v-model="image.scalable"
              type="checkbox"
              name="scalable"
            >
          </li>
          <li>
            <label for="imageSkewable">skewable</label>
            <input
              id="imageSkewable"
              v-model="image.skewable"
              type="checkbox"
              name="skewable"
            >
          </li>
          <li>
            <label for="imageTranslatable">translatable</label>
            <input
              id="imageTranslatable"
              v-model="image.translatable"
              type="checkbox"
              name="translatable"
            >
          </li>
          <li>
            <label for="imageSrc">src</label>
            <input
              id="imageSrc"
              v-model="image.src"
              type="text"
              class="form-control form-control-sm"
              name="src"
            >
          </li>
          <li>
            <label for="imageAlt">alt</label>
            <input
              id="imageAlt"
              v-model="image.alt"
              type="text"
              class="form-control form-control-sm"
              name="alt"
            >
          </li>
          <li>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              data-toggle="tooltip"
              data-placement="top"
              title="image.$getTransform()"
              @click="output.image.matrix = JSON.stringify($refs.cropperImage.$getTransform())"
            >
              $getTransform()
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              data-toggle="tooltip"
              data-placement="top"
              title="image.$setTransform()"
              @click="$refs.cropperImage.$setTransform(JSON.parse(output.image.matrix))"
            >
              $setTransform()
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              data-toggle="tooltip"
              data-placement="top"
              title="image.$resetTransform()"
              @click="output.image.matrix = JSON.stringify($refs.cropperImage.$resetTransform().$getTransform())"
            >
              $resetTransform()
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              data-toggle="tooltip"
              data-placement="top"
              title="image.$center()"
              @click="$refs.cropperImage.$center()"
            >
              $center()
            </button>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              data-toggle="tooltip"
              data-placement="top"
              title="image.$center('contain')"
              @click="$refs.cropperImage.$center('contain')"
            >
              $center('contain')
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              data-toggle="tooltip"
              data-placement="top"
              title="image.$center('cover')"
              @click="$refs.cropperImage.$center('cover')"
            >
              $center('cover')
            </button>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              data-toggle="tooltip"
              data-placement="top"
              title="image.$moveTo(0, 0)"
              @click="$refs.cropperImage.$moveTo(0, 0)"
            >
              $moveTo(0, 0)
            </button>
          </li>
          <li>
            <div class="btn-groups">
              <div
                class="btn-group"
                role="group"
                aria-label="Move the cropper image"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$move(-1, -1)"
                  @click="$refs.cropperImage.$move(-1, -1)"
                >
                  <i class="bi-arrow-up-left" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$move(0, -1)"
                  @click="$refs.cropperImage.$move(0, -1)"
                >
                  <i class="bi-arrow-up" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$move(1, -1)"
                  @click="$refs.cropperImage.$move(1, -1)"
                >
                  <i class="bi-arrow-up-right" />
                </button>
              </div>
              <div
                class="btn-group"
                role="group"
                aria-label="Move the cropper image"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$move(-1, 0)"
                  @click="$refs.cropperImage.$move(-1, 0)"
                >
                  <i class="bi-arrow-left" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  disabled
                >
                  <i class="bi-arrows-move" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$move(1, 0)"
                  @click="$refs.cropperImage.$move(1, 0)"
                >
                  <i class="bi-arrow-right" />
                </button>
              </div>
              <div
                class="btn-group"
                role="group"
                aria-label="Move the cropper image"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$move(-1, 1)"
                  @click="$refs.cropperImage.$move(-1, 1)"
                >
                  <i class="bi-arrow-down-left" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$move(0, 1)"
                  @click="$refs.cropperImage.$move(0, 1)"
                >
                  <i class="bi-arrow-down" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$move(1, 1)"
                  @click="$refs.cropperImage.$move(1, 1)"
                >
                  <i class="bi-arrow-down-right" />
                </button>
              </div>
            </div>
            <div class="btn-groups">
              <div
                class="btn-group"
                role="group"
                aria-label="Translate the cropper image"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$translate(-1, -1)"
                  @click="$refs.cropperImage.$translate(-1, -1)"
                >
                  <i class="bi-arrow-up-left" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$translate(0, -1)"
                  @click="$refs.cropperImage.$translate(0, -1)"
                >
                  <i class="bi-arrow-up" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$translate(1, -1)"
                  @click="$refs.cropperImage.$translate(1, -1)"
                >
                  <i class="bi-arrow-up-right" />
                </button>
              </div>
              <div
                class="btn-group"
                role="group"
                aria-label="Translate the cropper image"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$translate(-1, 0)"
                  @click="$refs.cropperImage.$translate(-1, 0)"
                >
                  <i class="bi-arrow-left" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  disabled
                >
                  <i class="bi-arrows-move" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$translate(1, 0)"
                  @click="$refs.cropperImage.$translate(1, 0)"
                >
                  <i class="bi-arrow-right" />
                </button>
              </div>
              <div
                class="btn-group"
                role="group"
                aria-label="Translate the cropper image"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$translate(-1, 1)"
                  @click="$refs.cropperImage.$translate(-1, 1)"
                >
                  <i class="bi-arrow-down-left" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$translate(0, 1)"
                  @click="$refs.cropperImage.$translate(0, 1)"
                >
                  <i class="bi-arrow-down" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$translate(1, 1)"
                  @click="$refs.cropperImage.$translate(1, 1)"
                >
                  <i class="bi-arrow-down-right" />
                </button>
              </div>
            </div>
          </li>
          <li>
            <div
              class="btn-group"
              role="group"
              aria-label="Scale the cropper image"
            >
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$zoom(0.1)"
                @click="$refs.cropperImage.$zoom(0.1)"
              >
                <i class="bi-zoom-in" />
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$zoom(-0.1)"
                @click="$refs.cropperImage.$zoom(-0.1)"
              >
                <i class="bi-zoom-out" />
              </button>
            </div>
            <div
              class="btn-group"
              role="group"
              aria-label="Scale the cropper image"
            >
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$zoom(0.1, 0, 0)"
                @click="$refs.cropperImage.$zoom(0.1, 0, 0)"
              >
                <i class="bi-zoom-in" />
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$zoom(-0.1, 0, 0)"
                @click="$refs.cropperImage.$zoom(-0.1, 0, 0)"
              >
                <i class="bi-zoom-out" />
              </button>
            </div>
            <div
              class="btn-group"
              role="group"
              aria-label="Rotate the cropper image"
            >
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$scale(-1, 1)"
                @click="$refs.cropperImage.$scale(-1, 1)"
              >
                <i class="bi-arrow-left-right" />
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$scale(1, -1)"
                @click="$refs.cropperImage.$scale(1, -1)"
              >
                <i class="bi-arrow-down-up" />
              </button>
            </div>
          </li>
          <li>
            <div
              class="btn-group"
              role="group"
              aria-label="Rotate the cropper image"
            >
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$rotate('-45deg')"
                @click="$refs.cropperImage.$rotate('-45deg')"
              >
                <i class="bi-arrow-90deg-left" />
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$rotate('45deg')"
                @click="$refs.cropperImage.$rotate('45deg')"
              >
                <i class="bi-arrow-90deg-right" />
              </button>
            </div>
            <div
              class="btn-group"
              role="group"
              aria-label="Rotate the cropper image"
            >
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$rotate('-45deg', 0, 0)"
                @click="$refs.cropperImage.$rotate('-45deg', 0, 0)"
              >
                <i class="bi-arrow-90deg-left" />
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$rotate('45deg', 0, 0)"
                @click="$refs.cropperImage.$rotate('45deg', 0, 0)"
              >
                <i class="bi-arrow-90deg-right" />
              </button>
            </div>
            <div
              class="btn-group"
              role="group"
              aria-label="Rotate the cropper image"
            >
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$skew('45deg')"
                @click="$refs.cropperImage.$skew('45deg')"
              >
                <i class="bi-arrow-up-left-square" />
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$skew('-45deg')"
                @click="$refs.cropperImage.$skew('-45deg')"
              >
                <i class="bi-arrow-up-right-square" />
              </button>
            </div>
          </li>
          <li>
            <textarea
              v-model="output.image.matrix"
              class="form-control form-control-sm"
            />
          </li>
        </ul>
      </section>
      <section>
        <h6>&lt;cropper-shade&gt;</h6>
        <ul>
          <li>
            <label for="shadeHidden">hidden</label>
            <input
              id="shadeHidden"
              v-model="shade.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label for="shadeThemeColor">theme-color</label>
            <color-input
              id="shadeThemeColor"
              v-model="shade.themeColor"
              type="color"
              class="form-control form-control-color form-control-sm"
              name="themeColor"
            />
          </li>
        </ul>
      </section>
      <section>
        <h6>&lt;cropper-handle&gt;</h6>
        <ul>
          <li>
            <label for="handleHidden">hidden</label>
            <input
              id="handleHidden"
              v-model="handle.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label for="handleAction">action</label>
            <select
              id="handleAction"
              v-model="handle.action"
              class="form-control form-control-sm"
              name="action"
            >
              <option value="select">
                select
              </option>
              <option value="move">
                move
              </option>
              <option
                value="scale"
                disabled
              >
                scale
              </option>
              <option value="none">
                none
              </option>
              <option
                value="n-resize"
                disabled
              >
                n-resize
              </option>
              <option
                value="e-resize"
                disabled
              >
                e-resize
              </option>
              <option
                value="s-resize"
                disabled
              >
                s-resize
              </option>
              <option
                value="w-resize"
                disabled
              >
                w-resize
              </option>
              <option
                value="ne-resize"
                disabled
              >
                ne-resize
              </option>
              <option
                value="nw-resize"
                disabled
              >
                nw-resize
              </option>
              <option
                value="se-resize"
                disabled
              >
                se-resize
              </option>
              <option
                value="sw-resize"
                disabled
              >
                sw-resize
              </option>
            </select>
          </li>
          <li>
            <label for="handlePlain">plain</label>
            <input
              id="handlePlain"
              v-model="handle.plain"
              type="checkbox"
              name="plain"
            >
          </li>
          <li>
            <label for="handleThemeColor">theme-color</label>
            <color-input
              id="handleThemeColor"
              v-model="handle.themeColor"
              type="color"
              class="form-control form-control-color form-control-sm"
              name="themeColor"
            />
          </li>
        </ul>
      </section>
      <section>
        <h6>&lt;cropper-selection&gt;</h6>
        <ul>
          <li>
            <label for="selectionHidden">hidden</label>
            <input
              id="selectionHidden"
              v-model="selection.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label for="selectionAspectRatio">aspect-ratio</label>
            <select
              id="selectionAspectRatio"
              v-model.number="selection.aspectRatio"
              class="form-control form-control-sm"
              name="aspectRatio"
            >
              <option :value="NaN">
                Free
              </option>
              <option :value="16/9">
                16:9
              </option>
              <option :value="4/3">
                4:3
              </option>
              <option :value="1">
                1:1
              </option>
            </select>
          </li>
          <li>
            <label for="selectionInitialAspectRatio">initial-aspect-ratio</label>
            <input
              id="selectionInitialAspectRatio"
              v-model.number="selection.initialAspectRatio"
              type="number"
              class="form-control form-control-sm"
              name="initialAspectRatio"
              min="0"
              max="10"
            >
          </li>
          <li>
            <label for="selectionAutoSelectArea">initial-coverage</label>
            <input
              id="selectionAutoSelectArea"
              v-model.number="selection.initialCoverage"
              type="range"
              class="form-range form-control-sm"
              name="initialCoverage"
              min="0"
              max="1"
              step="0.1"
            >
          </li>
          <li>
            <label for="selectionMovable">movable</label>
            <input
              id="selectionMovable"
              v-model="selection.movable"
              type="checkbox"
              name="movable"
            >
          </li>
          <li>
            <label for="selectionResizable">resizable</label>
            <input
              id="selectionResizable"
              v-model="selection.resizable"
              type="checkbox"
              name="resizable"
            >
          </li>
          <li>
            <label for="selectionZoomable">zoomable</label>
            <input
              id="selectionZoomable"
              v-model="selection.zoomable"
              type="checkbox"
              name="zoomable"
            >
          </li>
          <li>
            <label for="selectionMultiple">multiple</label>
            <input
              id="selectionMultiple"
              v-model="selection.multiple"
              type="checkbox"
              name="multiple"
            >
          </li>
          <li>
            <label for="selectionKeyboard">keyboard</label>
            <input
              id="selectionKeyboard"
              v-model="selection.keyboard"
              type="checkbox"
              name="keyboard"
            >
          </li>
          <li>
            <label for="selectionOutlined">outlined</label>
            <input
              id="selectionOutlined"
              v-model="selection.outlined"
              type="checkbox"
              name="outlined"
            >
          </li>
          <li>
            <label for="selectionPrecision">precise</label>
            <input
              id="selectionPrecision"
              v-model="selection.precise"
              type="checkbox"
              name="precise"
            >
          </li>
          <li>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              data-toggle="tooltip"
              data-placement="top"
              title="selection.$change(0, 0, 160, 90)"
              @click="$refs.cropperSelection.$change(0, 0, 160, 90)"
            >
              $change(0, 0, 160, 90)
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              data-toggle="tooltip"
              data-placement="top"
              title="selection.$reset()"
              @click="$refs.cropperSelection.$reset()"
            >
              $reset()
            </button>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              data-toggle="tooltip"
              data-placement="top"
              title="selection.$center()"
              @click="$refs.cropperSelection.$center()"
            >
              $center()
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              data-toggle="tooltip"
              data-placement="top"
              title="selection.$moveTo(0, 0)"
              @click="$refs.cropperSelection.$moveTo(0, 0)"
            >
              $moveTo(0, 0)
            </button>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm btn-block"
              data-bs-toggle="modal"
              data-bs-target="#canvasViewerModal"
              @click="cropperSelectionToCanvas"
            >
              $toCanvas()
            </button>
          </li>
          <li>
            <div class="btn-groups">
              <div
                class="btn-group"
                role="group"
                aria-label="Move the cropper selection"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$move(-1, -1)"
                  @click="$refs.cropperSelection.$move(-1, -1)"
                >
                  <i class="bi-arrow-up-left" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$move(0, -1)"
                  @click="$refs.cropperSelection.$move(0, -1)"
                >
                  <i class="bi-arrow-up" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$move(1, -1)"
                  @click="$refs.cropperSelection.$move(1, -1)"
                >
                  <i class="bi-arrow-up-right" />
                </button>
              </div>
              <div
                class="btn-group"
                role="group"
                aria-label="Move the cropper selection"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$move(-1, 0)"
                  @click="$refs.cropperSelection.$move(-1, 0)"
                >
                  <i class="bi-arrow-left" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  disabled
                >
                  <i class="bi-arrows-move" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$move(1, 0)"
                  @click="$refs.cropperSelection.$move(1, 0)"
                >
                  <i class="bi-arrow-right" />
                </button>
              </div>
              <div
                class="btn-group"
                role="group"
                aria-label="Move the cropper selection"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$move(-1, 1)"
                  @click="$refs.cropperSelection.$move(-1, 1)"
                >
                  <i class="bi-arrow-down-left" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$move(0, 1)"
                  @click="$refs.cropperSelection.$move(0, 1)"
                >
                  <i class="bi-arrow-down" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$move(1, 1)"
                  @click="$refs.cropperSelection.$move(1, 1)"
                >
                  <i class="bi-arrow-down-right" />
                </button>
              </div>
            </div>
          </li>
          <li>
            <div class="btn-groups">
              <div
                class="btn-group"
                role="group"
                aria-label="Resize the cropper selection"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('nw-resize', -1, -1)"
                  @click="$refs.cropperSelection.$resize('nw-resize', -1, -1)"
                >
                  <i class="bi-arrow-up-left-square" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('n-resize', 0, -1)"
                  @click="$refs.cropperSelection.$resize('n-resize', 0, -1)"
                >
                  <i class="bi-arrow-up-square" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('ne-resize', 1, -1)"
                  @click="$refs.cropperSelection.$resize('ne-resize', 1, -1)"
                >
                  <i class="bi-arrow-up-right-square" />
                </button>
              </div>
              <div
                class="btn-group"
                role="group"
                aria-label="Resize the cropper selection"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('w-resize', -1, 0)"
                  @click="$refs.cropperSelection.$resize('w-resize', -1, 0)"
                >
                  <i class="bi-arrow-left-square" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$zoom(0.1)"
                  @click="$refs.cropperSelection.$zoom(0.1)"
                >
                  <i class="bi-zoom-in" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('e-resize', 1, 0)"
                  @click="$refs.cropperSelection.$resize('e-resize', 1, 0)"
                >
                  <i class="bi-arrow-right-square" />
                </button>
              </div>
              <div
                class="btn-group"
                role="group"
                aria-label="Resize the cropper selection"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('sw-resize', -1, 1)"
                  @click="$refs.cropperSelection.$resize('sw-resize', -1, 1)"
                >
                  <i class="bi-arrow-down-left-square" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('s-resize', 0, 1)"
                  @click="$refs.cropperSelection.$resize('s-resize', 0, 1)"
                >
                  <i class="bi-arrow-down-square" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('se-resize', 1, 1)"
                  @click="$refs.cropperSelection.$resize('se-resize', 1, 1)"
                >
                  <i class="bi-arrow-down-right-square" />
                </button>
              </div>
            </div>
            <div class="btn-groups">
              <div
                class="btn-group"
                role="group"
                aria-label="Resize the cropper selection"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('nw-resize', 1, 1)"
                  @click="$refs.cropperSelection.$resize('nw-resize', 1, 1)"
                >
                  <i class="bi-arrow-down-right-square" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('n-resize', 0, 1)"
                  @click="$refs.cropperSelection.$resize('n-resize', 0, 1)"
                >
                  <i class="bi-arrow-down-square" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('ne-resize', -1, 1)"
                  @click="$refs.cropperSelection.$resize('ne-resize', -1, 1)"
                >
                  <i class="bi-arrow-down-left-square" />
                </button>
              </div>
              <div
                class="btn-group"
                role="group"
                aria-label="Resize the cropper selection"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('w-resize', 1, 0)"
                  @click="$refs.cropperSelection.$resize('w-resize', 1, 0)"
                >
                  <i class="bi-arrow-right-square" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$zoom(-0.1)"
                  @click="$refs.cropperSelection.$zoom(-0.1)"
                >
                  <i class="bi-zoom-out" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('e-resize', -1, 0)"
                  @click="$refs.cropperSelection.$resize('e-resize', -1, 0)"
                >
                  <i class="bi-arrow-left-square" />
                </button>
              </div>
              <div
                class="btn-group"
                role="group"
                aria-label="Resize the cropper selection"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('sw-resize', 1, -1)"
                  @click="$refs.cropperSelection.$resize('sw-resize', 1, -1)"
                >
                  <i class="bi-arrow-up-right-square" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('s-resize', 0, -1)"
                  @click="$refs.cropperSelection.$resize('s-resize', 0, -1)"
                >
                  <i class="bi-arrow-up-square" />
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('se-resize', -1, -1)"
                  @click="$refs.cropperSelection.$resize('se-resize', -1, -1)"
                >
                  <i class="bi-arrow-up-left-square" />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section>
        <h6>&lt;cropper-grid&gt;</h6>
        <ul>
          <li>
            <label for="selectionGridHidden">hidden</label>
            <input
              id="selectionGridHidden"
              v-model="grid.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label for="selectionGridRows">rows</label>
            <input
              id="selectionGridRows"
              v-model.number="grid.rows"
              type="number"
              class="form-control form-control-sm"
              name="rows"
              min="0"
              max="9"
            >
          </li>
          <li>
            <label for="selectionGridColumns">columns</label>
            <input
              id="selectionGridColumns"
              v-model.number="grid.columns"
              type="number"
              class="form-control form-control-sm"
              name="columns"
              min="0"
              max="9"
            >
          </li>
          <li>
            <label for="selectionGridBordered">bordered</label>
            <input
              id="selectionGridBordered"
              v-model="grid.bordered"
              type="checkbox"
              name="bordered"
            >
          </li>
          <li>
            <label for="selectionGridCovered">covered</label>
            <input
              id="selectionGridCovered"
              v-model="grid.covered"
              type="checkbox"
              name="covered"
            >
          </li>
          <li>
            <label for="selectionGridThemeColor">theme-color</label>
            <color-input
              id="selectionGridThemeColor"
              v-model="grid.themeColor"
              type="color"
              class="form-control form-control-color form-control-sm"
              name="themeColor"
            />
          </li>
        </ul>
      </section>
      <section>
        <h6>&lt;cropper-crosshair&gt;</h6>
        <ul>
          <li>
            <label for="selectionCrosshairHidden">hidden</label>
            <input
              id="selectionCrosshairHidden"
              v-model="crosshair.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label for="selectionCrosshairCentered">centered</label>
            <input
              id="selectionCrosshairCentered"
              v-model="crosshair.centered"
              type="checkbox"
              name="centered"
            >
          </li>
          <li>
            <label for="selectionCrosshairThemeColor">theme-color</label>
            <color-input
              id="selectionCrosshairThemeColor"
              v-model="crosshair.themeColor"
              type="color"
              class="form-control form-control-color form-control-sm"
              name="themeColor"
            />
          </li>
        </ul>
      </section>
      <section
        v-for="(subhandle, index) in handles"
        :key="subhandle.action"
      >
        <h6>&lt;cropper-handle action="{{ subhandle.action }}"&gt;</h6>
        <ul>
          <li>
            <label :for="`selectionHandleHidden${index}`">hidden</label>
            <input
              :id="`selectionHandleHidden${index}`"
              v-model="subhandle.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label :for="`selectionHandleAction${index}`">action</label>
            <select
              :id="`selectionHandleAction${index}`"
              v-model="subhandle.action"
              class="form-control form-control-sm"
              name="action"
              :disabled="index > 0"
            >
              <option value="select">
                select
              </option>
              <option value="move">
                move
              </option>
              <option
                value="scale"
                disabled
              >
                scale
              </option>
              <option value="none">
                none
              </option>
              <option
                value="n-resize"
                disabled
              >
                n-resize
              </option>
              <option
                value="e-resize"
                disabled
              >
                e-resize
              </option>
              <option
                value="s-resize"
                disabled
              >
                s-resize
              </option>
              <option
                value="w-resize"
                disabled
              >
                w-resize
              </option>
              <option
                value="ne-resize"
                disabled
              >
                ne-resize
              </option>
              <option
                value="nw-resize"
                disabled
              >
                nw-resize
              </option>
              <option
                value="se-resize"
                disabled
              >
                se-resize
              </option>
              <option
                value="sw-resize"
                disabled
              >
                sw-resize
              </option>
            </select>
          </li>
          <li>
            <label :for="`selectionHandleThemeColor${index}`">theme-color</label>
            <color-input
              :id="`selectionHandleThemeColor${index}`"
              v-model="subhandle.themeColor"
              type="color"
              class="form-control form-control-color form-control-sm"
              name="themeColor"
            />
          </li>
        </ul>
      </section>
    </aside>
    <article>
      <cropper-canvas
        v-if="ready"
        ref="cropperCanvas"
        :background="canvas.background"
        :disabled="canvas.disabled"
        :hidden="canvas.hidden"
        :scale-step="canvas.scaleStep"
        :theme-color="canvas.themeColor"
      >
        <cropper-image
          ref="cropperImage"
          :hidden="image.hidden"
          :rotatable="image.rotatable"
          :scalable="image.scalable"
          :skewable="image.skewable"
          :translatable="image.translatable"
          :src="image.src"
          :alt="image.alt"
          @transform="onImageTransform"
        />
        <cropper-shade
          :hidden="shade.hidden"
          :theme-color="shade.themeColor"
        />
        <cropper-handle
          :action="handle.action"
          :hidden="handle.hidden"
          :plain="handle.plain"
          :theme-color="handle.themeColor"
        />
        <cropper-selection
          id="cropperSelection"
          ref="cropperSelection"
          :aspect-ratio="selection.aspectRatio"
          :initial-coverage="selection.initialCoverage"
          :hidden="selection.hidden"
          :initial-aspect-ratio="selection.initialAspectRatio"
          :movable="selection.movable"
          :resizable="selection.resizable"
          :zoomable="selection.zoomable"
          :multiple="selection.multiple"
          :keyboard="selection.keyboard"
          :outlined="selection.outlined"
          :precise="selection.precise"
          @change="onSelectionChange"
        >
          <cropper-grid
            :hidden="grid.hidden"
            :rows="grid.rows"
            :columns="grid.columns"
            :bordered="grid.bordered"
            :covered="grid.covered"
            :theme-color="grid.themeColor"
          />
          <cropper-crosshair
            :hidden="crosshair.hidden"
            :centered="crosshair.centered"
            :theme-color="crosshair.themeColor"
          />
          <cropper-handle
            v-for="subhandle in handles"
            :key="subhandle.action"
            :action="subhandle.action"
            :hidden="subhandle.hidden"
            :theme-color="subhandle.themeColor"
          />
        </cropper-selection>
      </cropper-canvas>
    </article>
    <aside>
      <section class="previews clearfix">
        <h6>Preview</h6>
        <cropper-viewer
          v-if="ready"
          class="preview preview-lg"
          selection="#cropperSelection"
        />
        <cropper-viewer
          v-if="ready"
          class="preview preview-md"
          selection="#cropperSelection"
        />
        <cropper-viewer
          v-if="ready"
          class="preview preview-sm"
          selection="#cropperSelection"
        />
        <cropper-viewer
          v-if="ready"
          class="preview preview-xs"
          selection="#cropperSelection"
        />
      </section>
      <section>
        <h6>Image Data</h6>
        <ul>
          <li>
            <span>scaleX</span>
            <span>{{ imageData.matrix[0] }}</span>
          </li>
          <li>
            <span>skewY</span>
            <span>{{ imageData.matrix[1] }}</span>
          </li>
          <li>
            <span>skewX</span>
            <span>{{ imageData.matrix[2] }}</span>
          </li>
          <li>
            <span>scaleY</span>
            <span>{{ imageData.matrix[3] }}</span>
          </li>
          <li>
            <span>translateX</span>
            <span>{{ imageData.matrix[4] }}</span>
          </li>
          <li>
            <span>translateY</span>
            <span>{{ imageData.matrix[5] }}</span>
          </li>
        </ul>
      </section>
      <section>
        <h6>Selection Data</h6>
        <ul>
          <li>
            <span>x</span>
            <span>{{ selectionData.x }}</span>
          </li>
          <li>
            <span>y</span>
            <span>{{ selectionData.y }}</span>
          </li>
          <li>
            <span>width</span>
            <span>{{ selectionData.width }}</span>
          </li>
          <li>
            <span>height</span>
            <span>{{ selectionData.height }}</span>
          </li>
        </ul>
      </section>
    </aside>

    <div
      id="canvasViewerModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="canvasViewerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="canvasViewerModalLabel"
              class="modal-title"
            >
              Canvas
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div
            ref="canvasViewer"
            class="modal-body text-center"
          />
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type CropperCanvas from '@cropper/element-canvas';
import type CropperSelection from '@cropper/element-selection';
import ColorInput from './ColorInput.vue';

export default {
  name: 'CropperPlayground',
  components: {
    ColorInput,
  },
  data(): Record<string, any> {
    return {
      transitionDelay: 350,
      transitioning: true,
      loading: false,
      ready: false,
      initialCanvas: '',
      canvas: {
        hidden: false,
        background: true,
        disabled: false,
        scaleStep: 0.1,
        themeColor: '#3399ff',
      },
      image: {
        hidden: false,
        rotatable: true,
        scalable: true,
        skewable: true,
        translatable: true,
        src: '/picture.jpg',
        alt: 'The image to crop',
      },
      shade: {
        themeColor: 'rgba(0, 0, 0, 0.65)',
      },
      handle: {
        hidden: false,
        action: 'select',
        plain: true,
        themeColor: 'rgba(51, 153, 255, 0.5)',
      },
      selection: {
        hidden: false,
        aspectRatio: undefined,
        initialAspectRatio: undefined,
        initialCoverage: 0.5,
        movable: true,
        resizable: true,
        zoomable: true,
        multiple: false,
        keyboard: false,
        outlined: false,
        precise: false,
      },
      grid: {
        hidden: false,
        rows: 3,
        columns: 3,
        bordered: true,
        covered: true,
        themeColor: 'rgba(238, 238, 238, 0.5)',
      },
      crosshair: {
        hidden: false,
        centered: true,
        themeColor: 'rgba(238, 238, 238, 0.5)',
      },
      handles: [
        {
          hidden: false,
          action: 'move',
          themeColor: 'rgba(255, 255, 255, 0.35)',
        },
        {
          hidden: false,
          action: 'n-resize',
          themeColor: '#3399ff',
        },
        {
          hidden: false,
          action: 'e-resize',
          themeColor: '#3399ff',
        },
        {
          hidden: false,
          action: 's-resize',
          themeColor: '#3399ff',
        },
        {
          hidden: false,
          action: 'w-resize',
          themeColor: '#3399ff',
        },
        {
          hidden: false,
          action: 'ne-resize',
          themeColor: '#3399ff',
        },
        {
          hidden: false,
          action: 'nw-resize',
          themeColor: '#3399ff',
        },
        {
          hidden: false,
          action: 'se-resize',
          themeColor: '#3399ff',
        },
        {
          hidden: false,
          action: 'sw-resize',
          themeColor: '#3399ff',
        },
      ],
      imageData: {
        matrix: [1, 0, 0, 1, 0, 0],
      },
      selectionData: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      output: {
        canvas: {},
        image: {
          matrix: '[1, 0, 0, 1, 0, 0]',
        },
      },
    };
  },
  created() {
    setTimeout(() => {
      this.transitioning = false;
      this.loading = true;
    }, this.transitionDelay);
  },
  mounted(): void {
    const startTime = Date.now();

    Promise.all([
      new Promise((resolve, reject) => {
        const link = document.createElement('link');

        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/bootstrap@5/dist/css/bootstrap.min.css';
        link.onload = resolve;
        link.onerror = reject;
        link.onabort = reject;
        document.head.appendChild(link);
      }),
      new Promise((resolve, reject) => {
        const link = document.createElement('link');

        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/bootstrap-icons@1/font/bootstrap-icons.css';
        link.onload = resolve;
        link.onerror = reject;
        link.onabort = reject;
        document.head.appendChild(link);
      }),
      new Promise((resolve, reject) => {
        const script = document.createElement('script');

        script.src = 'https://unpkg.com/bootstrap@5/dist/js/bootstrap.bundle.min.js';
        script.onload = resolve;
        script.onerror = reject;
        script.onabort = reject;
        document.head.appendChild(script);
      }),
    ]).then(() => new Promise<void>((resolve) => {
      const endTime = Date.now();
      const loadingTime = endTime - startTime;
      const delay = this.transitionDelay - loadingTime;

      if (delay > 0) {
        setTimeout(resolve, delay);
      } else {
        resolve();
      }
    })).then(() => {
      this.loading = false;
      this.$nextTick(() => {
        this.ready = true;
        Array.from(this.$el.querySelectorAll('[data-toggle="tooltip"]')).forEach((element) => {
          new (window as any).bootstrap.Tooltip(element);
        });
      });
    });
  },
  beforeUnmount(): void {
    this.transitioning = true;
    Array.from(document.head.querySelectorAll('[href*="bootstrap"],[src*="bootstrap"]')).forEach((element) => {
      document.head.removeChild(element);
    });
  },
  methods: {
    onImageTransform(event: CustomEvent): void {
      this.imageData = event.detail;
    },
    onSelectionChange(event: CustomEvent): void {
      this.selectionData = event.detail;
    },
    cropperCanvasToCanvas(): void {
      const cropperCanvas = this.$refs.cropperCanvas as CropperCanvas;
      const canvasViewer = this.$refs.canvasViewer as HTMLElement;

      canvasViewer.innerHTML = '';
      cropperCanvas.$toCanvas().then((canvas: HTMLCanvasElement) => {
        canvasViewer.appendChild(canvas);
      });
    },
    cropperSelectionToCanvas(): void {
      const cropperSelection = this.$refs.cropperSelection as CropperSelection;
      const canvasViewer = this.$refs.canvasViewer as HTMLElement;

      canvasViewer.innerHTML = '';
      cropperSelection.$toCanvas().then((canvas: HTMLCanvasElement) => {
        canvasViewer.appendChild(canvas);
      });
    },
  },
};
</script>

<style lang="scss">
.playground-container {
  .navbar {
    position: fixed;
    padding-bottom: var(--navbar-padding-v);
    padding-top: var(--navbar-padding-v);

    a {
      color: var(--c-text);
      text-decoration: none;
    }
  }

  .nav-link {
    padding: 0;
  }

  .form-control-sm {
    min-height: calc(1.5em + .25rem + 2px);
    padding: .125rem .25rem;
    font-size: .75rem;
  }
}

.playground {
  background-color: var(--c-bg);
  color: var(--c-text);

  canvas {
    display: block;
    width: 100%;
  }

  textarea {
    width: 100%;
  }

  > aside {
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1rem;

    > section {
      margin-bottom: 1rem;

      > h6 {
        font-size: 0.875rem;
      }

      > ul {
        padding-left: 1rem;

        > li {
          align-items: center;
          display: flex;
          font-size: 0.875rem;
          justify-content: space-between;
          padding-bottom: 0.25rem;
          padding-top: 0.25rem;

          > label {
            margin-right: 0.5rem;
            white-space: nowrap;
          }

          > input,
          > select {
            max-width: 5rem;
          }

          > input[type="color"] {
            padding-left: .125rem;
            padding-right: .125rem;
          }
        }
      }
    }
  }

  > article {
    background-color: var(-c-bg-light);
    height: 20rem;

    > cropper-canvas {
      height: 100%;
    }
  }

  .btn-groups {
    display: inline-flex;
    flex-direction: column;

    > .btn-group {
      &:first-child {
        > .btn {
          &:first-child {
            border-bottom-left-radius: 0;
          }

          &:last-child {
            border-bottom-right-radius: 0;
          }
        }
      }

      &:nth-child(2) {
        margin-top: -1px;
        margin-bottom: -1px;

        > .btn {
          &:first-child {
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
          }

          &:last-child {
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
          }
        }
      }

      &:last-child {
        > .btn {
          &:first-child {
            border-top-left-radius: 0;
          }

          &:last-child {
            border-top-right-radius: 0;
          }
        }
      }
    }
  }

  .previews {
    margin-bottom: 0;
    margin-right: -1rem;
  }

  .preview {
    border: 1px solid var(--c-border);
    float: left;
    margin-bottom: 1rem;
    margin-right: 1rem;
  }

  .preview-lg {
    height: 9rem;
    width: 16rem;
  }

  .preview-md {
    height: 4.5rem;
    width: 8rem;
  }

  .preview-sm {
    height: 2.25rem;
    width: 4rem;
  }

  .preview-xs {
    height: 1.125rem;
    width: 2rem;
  }
}

@media (min-width: 992px) {
  .playground {
    bottom: 0;
    display: flex;
    left: 0;
    position: absolute;
    right: 0;
    top: var(--navbar-height);

    > aside {
      width: 18rem;
    }

    > article {
      flex: 1;
      height: 100%;
    }
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading {
  background-color: var(--c-bg);
  bottom: 0;
  display: flex;
  left: 0;
  position: fixed;
  right: 0;
  top: var(--navbar-height);
  z-index: 1;

  &::after {
    animation: spinner 1s linear infinite;
    border-radius: 50%;
    border: 4px solid rgba(51, 153, 255, 0.5);
    border-left-color: rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
    content: '';
    display: inline-block;
    height: 40px;
    left: 50%;
    margin-left: -20px;
    margin-top: -20px;
    position: absolute;
    top: 50%;
    width: 40px;
    z-index: 1;
  }
}
</style>
