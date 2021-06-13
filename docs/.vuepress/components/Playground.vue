<template>
  <div
    v-if="loading"
    class="loading"
  />
  <div
    v-else
    class="playground"
  >
    <aside>
      <section>
        <button
          type="button"
          class="btn btn-outline-primary btn-sm btn-block"
          @click="resetAll"
        >
          Reset All
        </button>
      </section>
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
            <label for="canvasOutlined">outlined</label>
            <input
              id="canvasOutlined"
              v-model="canvas.outlined"
              type="checkbox"
              name="outlined"
            >
          </li>
          <li>
            <label for="canvasScale">scale</label>
            <input
              id="canvasScale"
              v-model="canvas.scale"
              type="number"
              name="scale"
              min="0.1"
              max="1"
              step="0.1"
            >
          </li>
          <li>
            <label for="canvasThemeColor">theme-color</label>
            <input
              id="canvasThemeColor"
              v-model="canvas.themeColor"
              type="color"
              class="form-control form-control-color form-control-sm"
              name="themeColor"
            >
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
              v-model="canvas.image.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label for="imageRotatable">rotatable</label>
            <input
              id="imageRotatable"
              v-model="canvas.image.rotatable"
              type="checkbox"
              name="rotatable"
            >
          </li>
          <li>
            <label for="imageScalable">scalable</label>
            <input
              id="imageScalable"
              v-model="canvas.image.scalable"
              type="checkbox"
              name="scalable"
            >
          </li>
          <li>
            <label for="imageSkewable">skewable</label>
            <input
              id="imageSkewable"
              v-model="canvas.image.skewable"
              type="checkbox"
              name="skewable"
            >
          </li>
          <li>
            <label for="imageTranslatable">translatable</label>
            <input
              id="imageTranslatable"
              v-model="canvas.image.translatable"
              type="checkbox"
              name="translatable"
            >
          </li>
          <li>
            <label for="imageSrc">src</label>
            <input
              id="imageSrc"
              v-model="canvas.image.src"
              type="text"
              class="form-control form-control-sm"
              name="src"
            >
          </li>
          <li>
            <label for="imageAlt">alt</label>
            <input
              id="imageAlt"
              v-model="canvas.image.alt"
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
              @click="output.image.matrix = $refs.cropperImage.$getTransform()"
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
              @click="output.image.matrix = $refs.cropperImage.$setTransform(output.image.matrix)"
            >
              $setTransform()
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
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-up-left"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H3.707l10.147 10.146a.5.5 0 0 1-.708.708L3 3.707V8.5a.5.5 0 0 1-1 0v-6z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$move(0, -1)"
                  @click="$refs.cropperImage.$move(0, -1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-up"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$move(1, -1)"
                  @click="$refs.cropperImage.$move(1, -1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-up-right"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"
                    />
                  </svg>
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
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-left"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  disabled
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrows-move"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$move(1, 0)"
                  @click="$refs.cropperImage.$move(1, 0)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-right"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
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
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-down-left"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0v6z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$move(0, 1)"
                  @click="$refs.cropperImage.$move(0, 1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-down"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="image.$move(1, 1)"
                  @click="$refs.cropperImage.$move(1, 1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-down-right"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"
                    />
                  </svg>
                </button>
              </div>
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
                title="image.$center()"
                @click="$refs.cropperImage.$center()"
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-align-center"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 1a.5.5 0 0 1 .5.5V6h-1V1.5A.5.5 0 0 1 8 1zm0 14a.5.5 0 0 1-.5-.5V10h1v4.5a.5.5 0 0 1-.5.5zM2 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7z" />
                </svg>
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$fit()"
                @click="$refs.cropperImage.$fit()"
              >
                <svg
                  width="1.0625em"
                  height="1em"
                  viewBox="0 0 17 16"
                  class="bi bi-image-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15.002 9.5V13a1 1 0 0 1-1 1h-12a1 1 0 0 1-1-1v-1zm5-6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                  />
                </svg>
              </button>
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
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-zoom-in"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                  />
                  <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                  <path
                    fill-rule="evenodd"
                    d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$zoom(-0.1)"
                @click="$refs.cropperImage.$zoom(-0.1)"
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-zoom-out"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                  />
                  <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                  <path
                    fill-rule="evenodd"
                    d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
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
                title="image.$rotate('-45deg')"
                @click="$refs.cropperImage.$rotate('-45deg')"
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-arrow-counterclockwise"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                </svg>
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$rotate('45deg')"
                @click="$refs.cropperImage.$rotate('45deg')"
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-arrow-clockwise"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                </svg>
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
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-arrow-up-left"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H3.707l10.147 10.146a.5.5 0 0 1-.708.708L3 3.707V8.5a.5.5 0 0 1-1 0v-6z"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-toggle="tooltip"
                data-placement="top"
                title="image.$skew('-45deg')"
                @click="$refs.cropperImage.$skew('-45deg')"
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-arrow-up-right"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"
                  />
                </svg>
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
              v-model="canvas.shade.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label for="shadeThemeColor">theme-color</label>
            <input
              id="shadeThemeColor"
              v-model="canvas.shade.themeColor"
              type="text"
              class="form-control form-control-sm"
            >
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
              v-model="canvas.handle.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label for="handleAction">action</label>
            <select
              id="handleAction"
              v-model="canvas.handle.action"
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
            <label for="handleThemeColor">theme-color</label>
            <input
              id="handleThemeColor"
              v-model="canvas.handle.themeColor"
              type="text"
              class="form-control form-control-sm"
            >
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
              v-model="canvas.selection.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label for="selectionAspectRatio">aspect-ratio</label>
            <select
              id="selectionAspectRatio"
              v-model.number="canvas.selection.aspectRatio"
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
              v-model.number="canvas.selection.initialAspectRatio"
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
              v-model.number="canvas.selection.initialCoverage"
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
              v-model="canvas.selection.movable"
              type="checkbox"
              name="movable"
            >
          </li>
          <li>
            <label for="selectionResizable">resizable</label>
            <input
              id="selectionResizable"
              v-model="canvas.selection.resizable"
              type="checkbox"
              name="resizable"
            >
          </li>
          <li>
            <label for="selectionZoomable">zoomable</label>
            <input
              id="selectionZoomable"
              v-model="canvas.selection.zoomable"
              type="checkbox"
              name="zoomable"
            >
          </li>
          <li>
            <label for="selectionOutlined">outlined</label>
            <input
              id="selectionOutlined"
              v-model="canvas.selection.outlined"
              type="checkbox"
              name="outlined"
            >
          </li>
          <li>
            <label for="selectionPrecision">precise</label>
            <input
              id="selectionPrecision"
              v-model="canvas.selection.precise"
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
                  title="selection.$move(-1, -1)"
                  @click="$refs.cropperSelection.$move(-1, -1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-up-left"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H3.707l10.147 10.146a.5.5 0 0 1-.708.708L3 3.707V8.5a.5.5 0 0 1-1 0v-6z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$move(0, -1)"
                  @click="$refs.cropperSelection.$move(0, -1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-up"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$move(1, -1)"
                  @click="$refs.cropperSelection.$move(1, -1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-up-right"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"
                    />
                  </svg>
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
                  title="selection.$move(-1, 0)"
                  @click="$refs.cropperSelection.$move(-1, 0)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-left"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  disabled
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrows-move"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$move(1, 0)"
                  @click="$refs.cropperSelection.$move(1, 0)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-right"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
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
                  title="selection.$move(-1, 1)"
                  @click="$refs.cropperSelection.$move(-1, 1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-down-left"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0v6z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$move(0, 1)"
                  @click="$refs.cropperSelection.$move(0, 1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-down"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$move(1, 1)"
                  @click="$refs.cropperSelection.$move(1, 1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-down-right"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
          <li>
            <div class="btn-groups">
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
                  title="selection.$resize('nw-resize', -1, -1)"
                  @click="$refs.cropperSelection.$resize('nw-resize', -1, -1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-up-left-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M10.828 10.828a.5.5 0 0 1-.707 0L6.025 6.732V9.5a.5.5 0 0 1-1 0V5.525a.5.5 0 0 1 .5-.5H9.5a.5.5 0 0 1 0 1H6.732l4.096 4.096a.5.5 0 0 1 0 .707z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('n-resize', 0, -1)"
                  @click="$refs.cropperSelection.$resize('n-resize', 0, -1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-up-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('ne-resize', 1, -1)"
                  @click="$refs.cropperSelection.$resize('ne-resize', 1, -1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-up-right-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M5.172 10.828a.5.5 0 0 0 .707 0l4.096-4.096V9.5a.5.5 0 1 0 1 0V5.525a.5.5 0 0 0-.5-.5H6.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"
                    />
                  </svg>
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
                  title="selection.$resize('w-resize', -1, 0)"
                  @click="$refs.cropperSelection.$resize('w-resize', -1, 0)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-left-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$zoom(0.1)"
                  @click="$refs.cropperSelection.$zoom(0.1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-zoom-in"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                    />
                    <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                    <path
                      fill-rule="evenodd"
                      d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('e-resize', 1, 0)"
                  @click="$refs.cropperSelection.$resize('e-resize', 1, 0)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-right-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z"
                    />
                  </svg>
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
                  title="selection.$resize('sw-resize', -1, 1)"
                  @click="$refs.cropperSelection.$resize('sw-resize', -1, 1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-down-left-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M10.828 5.172a.5.5 0 0 0-.707 0L6.025 9.268V6.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H9.5a.5.5 0 0 0 0-1H6.732l4.096-4.096a.5.5 0 0 0 0-.707z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('s-resize', 0, 1)"
                  @click="$refs.cropperSelection.$resize('s-resize', 0, 1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-down-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('se-resize', 1, 1)"
                  @click="$refs.cropperSelection.$resize('se-resize', 1, 1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-down-right-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M5.172 5.172a.5.5 0 0 1 .707 0l4.096 4.096V6.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H6.5a.5.5 0 0 1 0-1h2.768L5.172 5.879a.5.5 0 0 1 0-.707z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="btn-groups">
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
                  title="selection.$resize('nw-resize', 1, 1)"
                  @click="$refs.cropperSelection.$resize('nw-resize', 1, 1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-down-right-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M5.172 5.172a.5.5 0 0 1 .707 0l4.096 4.096V6.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H6.5a.5.5 0 0 1 0-1h2.768L5.172 5.879a.5.5 0 0 1 0-.707z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('n-resize', 0, 1)"
                  @click="$refs.cropperSelection.$resize('n-resize', 0, 1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-down-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('ne-resize', -1, 1)"
                  @click="$refs.cropperSelection.$resize('ne-resize', -1, 1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-down-left-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M10.828 5.172a.5.5 0 0 0-.707 0L6.025 9.268V6.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H9.5a.5.5 0 0 0 0-1H6.732l4.096-4.096a.5.5 0 0 0 0-.707z"
                    />
                  </svg>
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
                  title="selection.$resize('w-resize', 1, 0)"
                  @click="$refs.cropperSelection.$resize('w-resize', 1, 0)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-right-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$zoom(-0.1)"
                  @click="$refs.cropperSelection.$zoom(-0.1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-zoom-out"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                    />
                    <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                    <path
                      fill-rule="evenodd"
                      d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('e-resize', -1, 0)"
                  @click="$refs.cropperSelection.$resize('e-resize', -1, 0)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-left-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                    />
                  </svg>
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
                  title="selection.$resize('sw-resize', 1, -1)"
                  @click="$refs.cropperSelection.$resize('sw-resize', 1, -1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-up-right-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M5.172 10.828a.5.5 0 0 0 .707 0l4.096-4.096V9.5a.5.5 0 1 0 1 0V5.525a.5.5 0 0 0-.5-.5H6.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('s-resize', 0, -1)"
                  @click="$refs.cropperSelection.$resize('s-resize', 0, -1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-up-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="selection.$resize('se-resize', -1, -1)"
                  @click="$refs.cropperSelection.$resize('se-resize', -1, -1)"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-arrow-up-left-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M10.828 10.828a.5.5 0 0 1-.707 0L6.025 6.732V9.5a.5.5 0 0 1-1 0V5.525a.5.5 0 0 1 .5-.5H9.5a.5.5 0 0 1 0 1H6.732l4.096 4.096a.5.5 0 0 1 0 .707z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
          <li>
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
        </ul>
      </section>
      <section>
        <h6>&lt;cropper-grid&gt;</h6>
        <ul>
          <li>
            <label for="selectionGridHidden">hidden</label>
            <input
              id="selectionGridHidden"
              v-model="canvas.selection.grid.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label for="selectionGridRows">rows</label>
            <input
              id="selectionGridRows"
              v-model.number="canvas.selection.grid.rows"
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
              v-model.number="canvas.selection.grid.columns"
              type="number"
              class="form-control form-control-sm"
              name="columns"
              min="0"
              max="9"
            >
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
              v-model="canvas.selection.crosshair.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label for="selectionCrosshairThemeColor">theme-color</label>
            <input
              id="selectionCrosshairThemeColor"
              v-model="canvas.selection.crosshair.themeColor"
              type="color"
              class="form-control form-control-color form-control-sm"
              name="themeColor"
            >
          </li>
        </ul>
      </section>
      <section
        v-for="(handle, index) in canvas.selection.handles"
        :key="handle.action"
      >
        <h6>&lt;cropper-handle action="{{ handle.action }}"&gt;</h6>
        <ul>
          <li>
            <label :for="`selectionHandleHidden${index}`">hidden</label>
            <input
              :id="`selectionHandleHidden${index}`"
              v-model="handle.hidden"
              type="checkbox"
              name="hidden"
            >
          </li>
          <li>
            <label :for="`selectionHandleAction${index}`">action</label>
            <select
              :id="`selectionHandleAction${index}`"
              v-model="handle.action"
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
            <input
              :id="`selectionHandleThemeColor${index}`"
              v-model="handle.themeColor"
              type="color"
              class="form-control form-control-color form-control-sm"
              name="themeColor"
            >
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
        :outlined="canvas.outlined"
        :scale="canvas.scale"
        :theme-color="canvas.themeColor"
      >
        <cropper-image
          ref="cropperImage"
          v-bind="canvas.image"
          @transform="onImageTransform"
        />
        <cropper-shade
          :hidden="canvas.shade.hidden"
          :theme-color="canvas.shade.themeColor"
        />
        <cropper-handle
          :action="canvas.handle.action"
          :hidden="canvas.handle.hidden"
          :plain="canvas.handle.plain"
        />
        <cropper-selection
          id="cropperSelection"
          ref="cropperSelection"
          :aspect-ratio="canvas.selection.aspectRatio"
          :initial-coverage="canvas.selection.initialCoverage"
          :hidden="canvas.selection.hidden"
          :initial-aspect-ratio="canvas.selection.initialAspectRatio"
          :movable="canvas.selection.movable"
          :resizable="canvas.selection.resizable"
          :zoomable="canvas.selection.zoomable"
          :outlined="canvas.selection.outlined"
          :precise="canvas.selection.precise"
          @change="onSelectionChange"
        >
          <!-- <cropper-viewer v-bind="canvas.selection.viewer"></cropper-viewer> -->
          <cropper-grid v-bind="canvas.selection.grid" />
          <cropper-crosshair
            :hidden="canvas.selection.crosshair.hidden"
            :centered="canvas.selection.crosshair.centered"
            :theme-color="canvas.selection.crosshair.themeColor"
          />
          <cropper-handle
            v-for="handle in canvas.selection.handles"
            :key="handle.action"
            :action="handle.action"
            :hidden="handle.hidden"
            :theme-color="handle.themeColor"
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

export default {
  data(): Record<string, any> {
    return {
      loading: true,
      ready: false,
      initialCanvas: '',
      canvas: {
        hidden: false,
        background: true,
        disabled: false,
        outlined: false,
        scale: 0.1,
        themeColor: '#3399ff',
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
          action: 'select',
          themeColor: 'rgba(0, 0, 0, 0.65)',
        },
        handle: {
          hidden: false,
          action: 'select',
          plain: true,
        },
        selection: {
          hidden: false,
          aspectRatio: NaN,
          initialAspectRatio: NaN,
          initialCoverage: 0.8,
          movable: true,
          resizable: true,
          zoomable: true,
          outlined: false,
          precise: false,
          grid: {
            hidden: false,
            covered: true,
            columns: 3,
            rows: 3,
          },
          crosshair: {
            hidden: false,
            centered: true,
            themeColor: '#eeeeee',
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
        },
      },
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
          matrix: 'matrix(1, 0, 0, 1, 0, 0)',
        },
      },
    };
  },
  created(): void {
    this.initialCanvas = JSON.stringify(this.canvas);
  },
  mounted(): void {
    Promise.all([
      new Promise((resolve, reject) => {
        const link = document.createElement('link');

        link.id = 'bootstrap';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/bootstrap@5/dist/css/bootstrap.min.css';
        link.onload = resolve;
        link.onerror = reject;
        link.onabort = reject;
        document.head.appendChild(link);
      }),
      new Promise((resolve, reject) => {
        const script = document.createElement('script');

        script.id = 'bootstrap';
        script.src = 'https://unpkg.com/bootstrap@5/dist/js/bootstrap.bundle.min.js';
        script.onload = resolve;
        script.onerror = reject;
        script.onabort = reject;
        document.head.appendChild(script);
      }),
    ]).then(() => {
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
    resetAll(): void {
      this.canvas = JSON.parse(this.initialCanvas);
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
    padding-top: .7rem;
    padding-bottom: .7rem;

    a {
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
    background-color: #fafafa;
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
    border: 1px solid #ddd;
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
    top: 0;

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
  background-color: #fff;
  bottom: 0;
  display: flex;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;

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
