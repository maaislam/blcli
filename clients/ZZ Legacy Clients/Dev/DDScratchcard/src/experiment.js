import {scratchcard} from '../../../../lib/components/Scratchcard/Scratchcard';

setTimeout(() => {

  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 500;
  canvas.id = 'ddscratchcard';

  document.body.insertAdjacentHTML('afterbegin', `
    <div id="ddmask"></div>
  `);

  document.getElementById('ddmask').insertAdjacentElement('afterbegin', canvas);

  const eraserImage = '<img id="eraser" src="https://toppng.com/public/uploads/preview/eraser-11530936260l73exwruqb.png">';

  document.getElementById('ddmask').insertAdjacentHTML('beforeend', eraserImage);

  const background = new Image();
  background.setAttribute('crossOrigin', '');
  background.onload = () => {
    // canvas element
    // amount at which it fires complete callback
    // complete callback
    // observers
    scratchcard(canvas, 0.7, background, () => {
      console.log("I a 70%+ (threshold=0.7) complete");
    }, {
      'scratchedLine': (x, y) => {
        console.log(`scratched line at x: ${x}, y: ${y}`);

        const eraser = document.getElementById('eraser');
        if(eraser) {
          eraser.style.top = y + 'px';
          eraser.style.left = x + 'px';
        }
      }
    });
  };
  background.src = 'https://www.merchoid.com/wp-content/uploads/2018/09/Merchoid_Batman_Hoodie_1-510x797.jpeg';


}, 500);
