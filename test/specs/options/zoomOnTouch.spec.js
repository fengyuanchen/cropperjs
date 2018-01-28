describe('zoomOnTouch (option)', () => {
  it('should zoom on touch by default', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        if (window.PointerEvent) {
          const pointerDownEvent1 = window.createEvent('pointerdown');
          const pointerDownEvent2 = window.createEvent('pointerdown');
          const pointerMoveEvent1 = window.createEvent('pointermove');
          const pointerMoveEvent2 = window.createEvent('pointermove');

          pointerDownEvent1.pointerId = 1;
          pointerDownEvent1.pageX = 100;
          pointerDownEvent1.pageY = 100;
          pointerDownEvent2.pointerId = 2;
          pointerDownEvent2.pageX = 200;
          pointerDownEvent2.pageY = 200;
          pointerMoveEvent1.pointerId = 1;
          pointerMoveEvent1.pageX = 125;
          pointerMoveEvent1.pageY = 125;
          pointerMoveEvent2.pointerId = 2;
          pointerMoveEvent2.pageX = 175;
          pointerMoveEvent2.pageY = 175;
          cropper.cropper.dispatchEvent(pointerDownEvent1);
          cropper.cropper.dispatchEvent(pointerDownEvent2);
          cropper.cropper.dispatchEvent(pointerMoveEvent1);
          cropper.cropper.dispatchEvent(pointerMoveEvent2);
        } else {
          const touchStartEvent1 = window.createEvent('touchstart');
          const touchStartEvent2 = window.createEvent('touchstart');
          const touchMoveEvent1 = window.createEvent('touchmove');
          const touchMoveEvent2 = window.createEvent('touchmove');

          touchStartEvent1.changedTouches = {
            0: {
              identifier: 1,
              pageX: 100,
              pageY: 100,
            },
            length: 1,
          };
          touchStartEvent2.changedTouches = {
            0: {
              identifier: 2,
              pageX: 200,
              pageY: 200,
            },
            length: 1,
          };
          touchMoveEvent1.changedTouches = {
            0: {
              identifier: 1,
              pageX: 125,
              pageY: 125,
            },
            length: 1,
          };
          touchMoveEvent2.changedTouches = {
            0: {
              identifier: 2,
              pageX: 175,
              pageY: 175,
            },
            length: 1,
          };
          cropper.cropper.dispatchEvent(touchStartEvent1);
          cropper.cropper.dispatchEvent(touchStartEvent2);
          cropper.cropper.dispatchEvent(touchMoveEvent1);
          cropper.cropper.dispatchEvent(touchMoveEvent2);
        }
      },

      zoom() {
        done();
      },
    });

    expect(cropper.options.zoomOnTouch).to.be.true;
  });

  it('should not zoom on touch', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      zoomOnTouch: false,

      ready() {
        if (window.PointerEvent) {
          cropper.cropper.dispatchEvent(new PointerEvent('pointerdown', {
            pointerId: 1,
            pageX: 100,
            pageY: 100,
          }));
          cropper.cropper.dispatchEvent(new PointerEvent('pointerdown', {
            pointerId: 2,
            pageX: 200,
            pageY: 200,
          }));
          cropper.cropper.dispatchEvent(new PointerEvent('pointermove', {
            pointerId: 1,
            pageX: 125,
            pageY: 125,
          }));
          cropper.cropper.dispatchEvent(new PointerEvent('pointermove', {
            pointerId: 2,
            pageX: 175,
            pageY: 175,
          }));
          cropper.cropper.dispatchEvent(new PointerEvent('pointerup', {
            pointerId: 1,
            pageX: 125,
            pageY: 125,
          }));
          cropper.cropper.dispatchEvent(new PointerEvent('pointerup', {
            pointerId: 2,
            pageX: 175,
            pageY: 175,
          }));
        } else {
          cropper.cropper.dispatchEvent(new TouchEvent('touchstart', {
            changedTouches: {
              0: {
                identifier: 1,
                pageX: 100,
                pageY: 100,
              },
              1: {
                identifier: 2,
                pageX: 200,
                pageY: 200,
              },
              length: 2,
            },
          }));
          cropper.cropper.dispatchEvent(new TouchEvent('touchmove', {
            changedTouches: {
              0: {
                identifier: 1,
                pageX: 125,
                pageY: 125,
              },
              1: {
                identifier: 2,
                pageX: 175,
                pageY: 175,
              },
              length: 2,
            },
          }));
          cropper.cropper.dispatchEvent(new TouchEvent('touchend', {
            changedTouches: {
              0: {
                identifier: 1,
                pageX: 125,
                pageY: 125,
              },
              1: {
                identifier: 2,
                pageX: 175,
                pageY: 175,
              },
              length: 2,
            },
          }));
        }

        done();
      },

      zoom() {
        expect.fail(1, 0);
      },
    });

    expect(cropper.options.zoomOnTouch).to.be.false;
  });
});
