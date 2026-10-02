import {
  ACTION_ALL,
  ACTION_CROP,
  ACTION_EAST,
  ACTION_MOVE,
  ACTION_NORTH,
  ACTION_NORTH_EAST,
  ACTION_NORTH_WEST,
  ACTION_SOUTH,
  ACTION_SOUTH_EAST,
  ACTION_SOUTH_WEST,
  ACTION_WEST,
  ACTION_ZOOM,
  CLASS_HIDDEN,
} from './constants';
import {
  forEach,
  getMaxZoomRatio,
  getOffset,
  removeClass,
} from './utilities';
import { zoomWithEvent } from './methods';

function resizeCropBoxFromCenter(action, range, aspectRatio, cropBoxData, bounds) {
  const centerX = cropBoxData.left + (cropBoxData.width / 2);
  const centerY = cropBoxData.top + (cropBoxData.height / 2);
  let isEast = action === ACTION_EAST
    || action === ACTION_NORTH_EAST
    || action === ACTION_SOUTH_EAST;
  let isSouth = action === ACTION_SOUTH
    || action === ACTION_SOUTH_EAST
    || action === ACTION_SOUTH_WEST;
  const isHorizontal = action === ACTION_EAST || action === ACTION_WEST;
  const isVertical = action === ACTION_NORTH || action === ACTION_SOUTH;
  let { width, height } = cropBoxData;

  if (aspectRatio) {
    if (isHorizontal || (!isVertical && isSouth)) {
      width += (isEast ? 2 : -2) * range.x;
      height = width / aspectRatio;
    } else {
      height += (isSouth ? 2 : -2) * range.y;
      width = height * aspectRatio;
    }
  } else {
    width += (isEast ? 2 : -2) * range.x;
    height += (isSouth ? 2 : -2) * range.y;
  }

  if (width < 0) {
    width = -width;

    if (!aspectRatio || isHorizontal || (!isVertical && isSouth)) {
      isEast = !isEast;
    }
  }

  if (height < 0) {
    height = -height;

    if (!aspectRatio || isVertical || (!isVertical && !isSouth)) {
      isSouth = !isSouth;
    }
  }

  const maxWidth = Math.max(0, 2 * Math.min(
    centerX - bounds.minLeft,
    bounds.maxWidth - centerX,
  ));
  const maxHeight = Math.max(0, 2 * Math.min(
    centerY - bounds.minTop,
    bounds.maxHeight - centerY,
  ));
  const minWidth = Math.min(cropBoxData.minWidth, maxWidth);
  const minHeight = Math.min(cropBoxData.minHeight, maxHeight);

  if (aspectRatio) {
    const minScale = Math.max(
      width ? minWidth / width : 0,
      height ? minHeight / height : 0,
      1,
    );
    const maxScale = Math.min(
      width ? maxWidth / width : 0,
      height ? maxHeight / height : 0,
    );
    const scale = Math.min(minScale, maxScale);

    width *= scale;
    height *= scale;
  } else {
    width = Math.min(Math.max(width, minWidth), maxWidth);
    height = Math.min(Math.max(height, minHeight), maxHeight);
  }

  if (isEast) {
    action = isSouth ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
  } else {
    action = isSouth ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
  }

  if (isHorizontal) {
    action = isEast ? ACTION_EAST : ACTION_WEST;
  } else if (isVertical) {
    action = isSouth ? ACTION_SOUTH : ACTION_NORTH;
  }

  return {
    action,
    left: centerX - (width / 2),
    top: centerY - (height / 2),
    width,
    height,
  };
}

export default {
  change(event) {
    const {
      options,
      canvasData,
      containerData,
      cropBoxData,
      pointers,
    } = this;
    let { action } = this;
    let { aspectRatio } = options;
    let {
      left,
      top,
      width,
      height,
    } = cropBoxData;
    let right = left + width;
    let bottom = top + height;
    let minLeft = 0;
    let minTop = 0;
    let maxWidth = containerData.width;
    let maxHeight = containerData.height;
    let renderable = true;
    let offset;

    // Locking aspect ratio in "free mode" by holding shift key
    if (!aspectRatio && event.shiftKey) {
      aspectRatio = width && height ? width / height : 1;
    }

    if (this.limited) {
      ({ minLeft, minTop } = cropBoxData);
      maxWidth = minLeft + Math.min(
        containerData.width,
        canvasData.width,
        canvasData.left + canvasData.width,
      );
      maxHeight = minTop + Math.min(
        containerData.height,
        canvasData.height,
        canvasData.top + canvasData.height,
      );
    }

    const pointer = pointers[Object.keys(pointers)[0]];
    const isCropBoxDrag = options.cropBoxMoveMode === 'dragStart'
      && this.cropBoxDragStartAction && [
      ACTION_ALL,
      ACTION_EAST,
      ACTION_NORTH,
      ACTION_SOUTH,
      ACTION_WEST,
      ACTION_NORTH_EAST,
      ACTION_NORTH_WEST,
      ACTION_SOUTH_EAST,
      ACTION_SOUTH_WEST,
    ].includes(action);

    if (isCropBoxDrag) {
      if (!this.cropBoxDragStartData) {
        this.cropBoxDragStartData = { ...cropBoxData };
      }

      Object.assign(cropBoxData, this.cropBoxDragStartData);
      ({
        left,
        top,
        width,
        height,
      } = cropBoxData);
      right = left + width;
      bottom = top + height;
      action = this.cropBoxDragStartAction;
    }

    const range = {
      x: pointer.endX - pointer.startX,
      y: pointer.endY - pointer.startY,
    };

    if (options.cropBoxResizeAroundCenter && [
      ACTION_EAST,
      ACTION_NORTH,
      ACTION_SOUTH,
      ACTION_WEST,
      ACTION_NORTH_EAST,
      ACTION_NORTH_WEST,
      ACTION_SOUTH_EAST,
      ACTION_SOUTH_WEST,
    ].includes(action)) {
      const cropBox = resizeCropBoxFromCenter(action, range, aspectRatio, cropBoxData, {
        minLeft,
        minTop,
        maxWidth,
        maxHeight,
      });

      cropBoxData.left = cropBox.left;
      cropBoxData.top = cropBox.top;
      cropBoxData.width = cropBox.width;
      cropBoxData.height = cropBox.height;
      this.action = cropBox.action;
      this.renderCropBox();

      if (!isCropBoxDrag) {
        forEach(pointers, (p) => {
          p.startX = p.endX;
          p.startY = p.endY;
        });
      }

      return;
    }

    const check = (side) => {
      switch (side) {
        case ACTION_EAST:
          if (right + range.x > maxWidth) {
            range.x = maxWidth - right;
          }

          break;

        case ACTION_WEST:
          if (left + range.x < minLeft) {
            range.x = minLeft - left;
          }

          break;

        case ACTION_NORTH:
          if (top + range.y < minTop) {
            range.y = minTop - top;
          }

          break;

        case ACTION_SOUTH:
          if (bottom + range.y > maxHeight) {
            range.y = maxHeight - bottom;
          }

          break;

        default:
      }
    };

    switch (action) {
      // Move crop box
      case ACTION_ALL:
        left += range.x;
        top += range.y;
        break;

      // Resize crop box
      case ACTION_EAST:
        if (range.x >= 0 && (right >= maxWidth || (aspectRatio
          && (top <= minTop || bottom >= maxHeight)))) {
          renderable = false;
          break;
        }

        check(ACTION_EAST);
        width += range.x;

        if (width < 0) {
          action = ACTION_WEST;
          width = -width;
          left -= width;

          if (width < cropBoxData.minWidth) {
            width = cropBoxData.minWidth;
            left = cropBoxData.left - width;
          }
        }

        if (aspectRatio) {
          height = width / aspectRatio;
          top += (cropBoxData.height - height) / 2;
        }

        break;

      case ACTION_NORTH:
        if (range.y <= 0 && (top <= minTop || (aspectRatio
          && (left <= minLeft || right >= maxWidth)))) {
          renderable = false;
          break;
        }

        check(ACTION_NORTH);
        height -= range.y;
        top += range.y;

        if (height < 0) {
          action = ACTION_SOUTH;
          height = -height;
          top -= height;

          if (height < cropBoxData.minHeight) {
            height = cropBoxData.minHeight;
            top = bottom;
          }
        }

        if (aspectRatio) {
          width = height * aspectRatio;
          left += (cropBoxData.width - width) / 2;
        }

        break;

      case ACTION_WEST:
        if (range.x <= 0 && (left <= minLeft || (aspectRatio
          && (top <= minTop || bottom >= maxHeight)))) {
          renderable = false;
          break;
        }

        check(ACTION_WEST);
        width -= range.x;
        left += range.x;

        if (width < 0) {
          action = ACTION_EAST;
          width = -width;
          left -= width;

          if (width < cropBoxData.minWidth) {
            width = cropBoxData.minWidth;
            left = right;
          }
        }

        if (aspectRatio) {
          height = width / aspectRatio;
          top += (cropBoxData.height - height) / 2;
        }

        break;

      case ACTION_SOUTH:
        if (range.y >= 0 && (bottom >= maxHeight || (aspectRatio
          && (left <= minLeft || right >= maxWidth)))) {
          renderable = false;
          break;
        }

        check(ACTION_SOUTH);
        height += range.y;

        if (height < 0) {
          action = ACTION_NORTH;
          height = -height;
          top -= height;

          if (height < cropBoxData.minHeight) {
            height = cropBoxData.minHeight;
            top = cropBoxData.top - height;
          }
        }

        if (aspectRatio) {
          width = height * aspectRatio;
          left += (cropBoxData.width - width) / 2;
        }

        break;

      case ACTION_NORTH_EAST:
        if (aspectRatio) {
          if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
            renderable = false;
            break;
          }

          check(ACTION_NORTH);
          height -= range.y;
          top += range.y;
          width = height * aspectRatio;
        } else {
          check(ACTION_NORTH);
          check(ACTION_EAST);

          if (range.x >= 0) {
            if (right < maxWidth) {
              width += range.x;
            } else if (range.y <= 0 && top <= minTop) {
              renderable = false;
            }
          } else {
            width += range.x;
          }

          if (range.y <= 0) {
            if (top > minTop) {
              height -= range.y;
              top += range.y;
            }
          } else {
            height -= range.y;
            top += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = ACTION_SOUTH_WEST;
          height = -height;
          width = -width;
          top -= height;
          left -= width;
        } else if (width < 0) {
          action = ACTION_NORTH_WEST;
          width = -width;
          left -= width;
        } else if (height < 0) {
          action = ACTION_SOUTH_EAST;
          height = -height;
          top -= height;
        }

        break;

      case ACTION_NORTH_WEST:
        if (aspectRatio) {
          if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
            renderable = false;
            break;
          }

          check(ACTION_NORTH);
          height -= range.y;
          top += range.y;
          width = height * aspectRatio;
          left += cropBoxData.width - width;
        } else {
          check(ACTION_NORTH);
          check(ACTION_WEST);

          if (range.x <= 0) {
            if (left > minLeft) {
              width -= range.x;
              left += range.x;
            } else if (range.y <= 0 && top <= minTop) {
              renderable = false;
            }
          } else {
            width -= range.x;
            left += range.x;
          }

          if (range.y <= 0) {
            if (top > minTop) {
              height -= range.y;
              top += range.y;
            }
          } else {
            height -= range.y;
            top += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = ACTION_SOUTH_EAST;
          height = -height;
          width = -width;
          top -= height;
          left -= width;
        } else if (width < 0) {
          action = ACTION_NORTH_EAST;
          width = -width;
          left -= width;
        } else if (height < 0) {
          action = ACTION_SOUTH_WEST;
          height = -height;
          top -= height;
        }

        break;

      case ACTION_SOUTH_WEST:
        if (aspectRatio) {
          if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
            renderable = false;
            break;
          }

          check(ACTION_WEST);
          width -= range.x;
          left += range.x;
          height = width / aspectRatio;
        } else {
          check(ACTION_SOUTH);
          check(ACTION_WEST);

          if (range.x <= 0) {
            if (left > minLeft) {
              width -= range.x;
              left += range.x;
            } else if (range.y >= 0 && bottom >= maxHeight) {
              renderable = false;
            }
          } else {
            width -= range.x;
            left += range.x;
          }

          if (range.y >= 0) {
            if (bottom < maxHeight) {
              height += range.y;
            }
          } else {
            height += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = ACTION_NORTH_EAST;
          height = -height;
          width = -width;
          top -= height;
          left -= width;
        } else if (width < 0) {
          action = ACTION_SOUTH_EAST;
          width = -width;
          left -= width;
        } else if (height < 0) {
          action = ACTION_NORTH_WEST;
          height = -height;
          top -= height;
        }

        break;

      case ACTION_SOUTH_EAST:
        if (aspectRatio) {
          if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
            renderable = false;
            break;
          }

          check(ACTION_EAST);
          width += range.x;
          height = width / aspectRatio;
        } else {
          check(ACTION_SOUTH);
          check(ACTION_EAST);

          if (range.x >= 0) {
            if (right < maxWidth) {
              width += range.x;
            } else if (range.y >= 0 && bottom >= maxHeight) {
              renderable = false;
            }
          } else {
            width += range.x;
          }

          if (range.y >= 0) {
            if (bottom < maxHeight) {
              height += range.y;
            }
          } else {
            height += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = ACTION_NORTH_WEST;
          height = -height;
          width = -width;
          top -= height;
          left -= width;
        } else if (width < 0) {
          action = ACTION_SOUTH_WEST;
          width = -width;
          left -= width;
        } else if (height < 0) {
          action = ACTION_NORTH_EAST;
          height = -height;
          top -= height;
        }

        break;

      // Move canvas
      case ACTION_MOVE:
        this.move(range.x, range.y);
        renderable = false;
        break;

      // Zoom canvas
      case ACTION_ZOOM:
        zoomWithEvent.call(this, getMaxZoomRatio(pointers), event);
        renderable = false;
        break;

      // Create crop box
      case ACTION_CROP:
        if (!range.x || !range.y) {
          renderable = false;
          break;
        }

        offset = getOffset(this.cropper);
        left = pointer.startX - offset.left;
        top = pointer.startY - offset.top;

        if (aspectRatio) {
          width = Math.max(
            Math.abs(range.x),
            Math.abs(range.y) * aspectRatio,
            cropBoxData.minWidth,
            cropBoxData.minHeight * aspectRatio,
          );
          height = width / aspectRatio;
        } else {
          width = Math.max(Math.abs(range.x), cropBoxData.minWidth);
          height = Math.max(Math.abs(range.y), cropBoxData.minHeight);
        }

        if (range.x > 0) {
          action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
        } else if (range.x < 0) {
          left -= width;
          action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
        }

        if (range.y < 0) {
          top -= height;
        }

        // Show the crop box if is hidden
        if (!this.cropped) {
          removeClass(this.cropBox, CLASS_HIDDEN);
          this.cropped = true;

          if (this.limited) {
            this.limitCropBox(true, true);
          }
        }

        break;

      default:
    }

    if (renderable) {
      cropBoxData.width = width;
      cropBoxData.height = height;
      cropBoxData.left = left;
      cropBoxData.top = top;
      this.action = action;
      this.renderCropBox();
    }

    // Override
    forEach(pointers, (p) => {
      if (action !== ACTION_CROP && !isCropBoxDrag) {
        p.startX = p.endX;
        p.startY = p.endY;
      }
    });
  },
};
