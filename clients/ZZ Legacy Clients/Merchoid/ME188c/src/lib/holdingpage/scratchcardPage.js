import { scratchcard } from '../../../../../../lib/components/Scratchcard/Scratchcard';

export default () => {
  const scratchcardText = document.createElement('div');
  scratchcardText.classList.add('ME188c-scratch_text');
  scratchcardText.innerHTML = 'Move your finger around the screen for a sneak peak..';

  document.querySelector('.ME188c-holding_wrapper h3').insertAdjacentElement('afterend', scratchcardText);

  setTimeout(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.id = 'ddscratchcard';

    document.querySelector('.ME188c-main_image').insertAdjacentHTML('afterbegin', ` 
      <div id="ME188c-ddmask"></div>
    `);

    document.getElementById('ME188c-ddmask').insertAdjacentElement('afterbegin', canvas);

    const eraserImage = '<img id="ME188c-eraser" src="//cdn.optimizely.com/img/6087172626/5f00b61d29c245e18362cf895f0528f8.png">';

    document.getElementById('ME188c-ddmask').insertAdjacentHTML('beforeend', eraserImage);

    const background = new Image();
    background.setAttribute('crossOrigin', '');
    background.onload = () => {
      // canvas element
      // amount at which it fires complete callback
      // complete callback
      // observers
      scratchcard(canvas, 0.7, background, () => {
        canvas.getContext('2d').globalCompositeOperation = 'destination-in';
      }, {
        'scratchedLine': (x, y) => {
          const eraser = document.getElementById('ME188c-eraser');
          if (eraser) {
            eraser.style.top = y + 'px';
            eraser.style.left = x + 'px';
          } 
        }
      }, 120);
    };
    background.src = 'https://www.merchoid.com/wp-content/uploads/2019/02/stars.jpeg';
  }, 500);
};
