import settings from '../../lib/settings';
import Lightbox from '../../../../../../lib/components/Lightbox/Lightbox';
import { events } from '../../../../../../lib/utils';

const { ID, VARIATION } = settings;

export default class SizingPopup {
  constructor() {
    this.getFrameData();
    this.createTrigger();
    this.createPopup();
    this.bindEvents();
    this.render();
    this.initCanvas();
  }

  getFrameData() {
    const frameData = (() => {
      const data = {};
      const rows = document.querySelectorAll('.frame-specs__stats__table > tbody > tr');
      for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];
        const rowName = row.querySelector('th').innerText.trim().replace(':', '').toLowerCase();
        const rowValue = row.querySelector('td').innerText.trim();
        data[rowName] = rowValue;
      }
      return data;
    })();

    this.frameData = frameData;
  }

  createTrigger() {
    const { size } = this.frameData;
    const element = document.createElement('div');
    element.className = `${ID}_SizingPopup-trigger-wrap`;
    if (VARIATION === '2' && size) {
      element.innerHTML += `<div class="${ID}_SizingPopup-trigger-size">Size: <em>${size.toUpperCase()}</em></div>`;
    }
    element.innerHTML += `<div class="${ID}_SizingPopup-trigger button button--secondary-alt">Are these the best fit?</div>`;
    this.trigger = element;
  }

  createPopup() {
    const { size } = this.frameData;
    // TODO: Copy needs updating
    const sizeCopy = {
      small: 'These frames are size <em>small</em>. Our small frames measure 125mm and below, and are best suited for those with narrow and petite faces.',
      medium: 'These frames are size <em>medium</em>. Our medium size measures between 126-130mm and are best suited for those with slightly wider faces.',
      large: 'These frames are size <em>large</em>. Our large glasses measure between 131-135mm and are best suited for those with oval faces.',
      'extra large': 'These frames are size <em>extra large</em>. Our extra large frames measure 136mm and above, and are best suited for those with larger faces.',
    };
    const popup = new Lightbox(ID, {
      closeOnClick: true,
      content: `
      <div class="${ID}_SizingPopup">
        <div class="${ID}_SizingPopup-section ${ID}_SizingPopup-section--size">
          <h2>Size (based on frame width)</h2>
          <div class="${ID}_sizeImageWrap">
            <div class="${ID}_SizingPopup-sizeImage">
              <img src="https://dd6zx4ibq538k.cloudfront.net/static/images/2680/25da3577c2957ce009eb0d33adbed417_1200_465.png" />
            </div>
          </div>
          <div class="${ID}_sizeTextWrap">
            <p>${sizeCopy[size.toLowerCase()]}</p>
          </div>
        </div>

        <div class="${ID}_SizingPopup-section">
          <h2>Measurements</h2>
            <p>Our frame measurements (in millimeters) can be found on the inside arms:</p>
            <ul>
              <li><p>The first number refers to the <em>lens width</em></p></li>
              <li><p>The second number refers to the <em>bridge width</em></p></li>
              <li><p>The third number refers to the temple <em>arm length</em></p></li>
            </ul>
            <p>Compare these numbers with those on your glasses. With these you can find similar fitting frames with our <a class="${ID}_bestFitLink" href="/best-fit/">Best Fit Machine.</a></p>
            <canvas id="${ID}_Measurements"></canvas>
        </div>
      </div>
      `,
    });
    this.popup = popup;
  }

  bindEvents() {
    const { trigger, popup } = this;

    // Main CTA
    trigger.querySelector(`.${ID}_SizingPopup-trigger`).addEventListener('click', () => {
      document.cookie = `${ID}_sizing_anxiety=true`;
      events.send(ID, 'Click', 'Worried about the perfect fit');
      popup.open();
    });

    // Text link
    const bestFitLink = popup.cache.component.querySelector(`.${ID}_bestFitLink`);
    if (bestFitLink) {
      bestFitLink.addEventListener('click', () => {
        events.send(ID, 'Click', 'More Sizes');
      });
    }
  }

  render() {
    const { trigger } = this;
    const productGallery = document.querySelector('.product-view');
    productGallery.insertAdjacentElement('afterend', trigger);
  }

  initCanvas() {
    const { popup } = this;
    const { measurements } = this.frameData;
    const scale = window.devicePixelRatio;
    const canvas = popup.cache.component.querySelector(`#${ID}_Measurements`);
    const ctx = canvas.getContext('2d');
    let backgroundHeight;

    // Set canvas dimensions
    canvas.width = 1000 * scale;
    canvas.height = 300 * scale;

    /** Draws a background rect behind text */
    const drawTextBG = (txt, x, y) => {
      ctx.save(); // Save canvas state
      ctx.fillStyle = '#FFF'; // BG colour
      const { width } = ctx.measureText(txt); // get width of text
      ctx.fillRect(x - (25 * scale), y - (20 * scale), width + (50 * scale), 35 * scale); // Draw background rect
      ctx.fillStyle = '#000'; // Text color
      ctx.fillText(txt, x, y); // Draw text on top
      ctx.restore(); // Restore original state
    };

    const drawings = {
      desktop: () => {
        // Measurements text
        ctx.font = `600 ${30 * scale}px "Balto",Helvetica,sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'right';
        ctx.fillText(measurements, 920 * scale, 40 * scale);

        // Draw lines
        ctx.strokeStyle = '#b7b7b7';
        ctx.lineWidth = 2 * scale;

        // Label line 1
        ctx.beginPath();
        ctx.moveTo(775 * scale, 60 * scale);
        ctx.lineTo(775 * scale, 120 * scale);
        ctx.lineTo(470 * scale, 120 * scale);
        ctx.stroke();

        // Label line 2
        ctx.beginPath();
        ctx.moveTo(835 * scale, 60 * scale);
        ctx.lineTo(835 * scale, 170 * scale);
        ctx.lineTo(470 * scale, 170 * scale);
        ctx.stroke();

        // Label line 3
        ctx.beginPath();
        ctx.moveTo(900 * scale, 60 * scale);
        ctx.lineTo(900 * scale, 220 * scale);
        ctx.lineTo(470 * scale, 220 * scale);
        ctx.stroke();

        // Label text
        ctx.textAlign = 'left';
        ctx.font = `400 ${26 * scale}px "Balto",Helvetica,sans-serif`;
        drawTextBG('Lens width', 470 * scale, 120 * scale);
        drawTextBG('Bridge width', 470 * scale, 170 * scale);
        drawTextBG('Temple arm length', 470 * scale, 220 * scale);
      },

      mobile: () => {
        // Measurements text
        ctx.font = `600 ${50 * scale}px "Balto",Helvetica,sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'right';
        ctx.fillText(measurements, 920 * scale, 40 * scale);

        // Draw lines
        ctx.strokeStyle = '#b7b7b7';
        ctx.lineWidth = 2 * scale;

        // Label line 1
        ctx.beginPath();
        ctx.moveTo(680 * scale, 60 * scale);
        ctx.lineTo(680 * scale, 120 * scale);
        ctx.lineTo(470 * scale, 120 * scale);
        ctx.stroke();

        // Label line 2
        ctx.beginPath();
        ctx.moveTo(770 * scale, 60 * scale);
        ctx.lineTo(770 * scale, 190 * scale);
        ctx.lineTo(470 * scale, 190 * scale);
        ctx.stroke();

        // Label line 3
        ctx.beginPath();
        ctx.moveTo(870 * scale, 60 * scale);
        ctx.lineTo(870 * scale, 260 * scale);
        ctx.lineTo(470 * scale, 260 * scale);
        ctx.stroke();

        // Label text
        ctx.textAlign = 'left';
        ctx.font = `400 ${50 * scale}px "Balto",Helvetica,sans-serif`;
        drawTextBG('Lens width', 350 * scale, 120 * scale);
        drawTextBG('Bridge width', 350 * scale, 190 * scale);
        drawTextBG('Temple arm length', 350 * scale, 260 * scale);
      },
    };

    // Set background image
    const background = new Image();
    background.src = 'https://dd6zx4ibq538k.cloudfront.net/static/images/2680/06a61dbf8b4f64e1f00864cd449d827e_1500_307.png';
    background.onload = () => {
      // Calculate correct height image based on 100% width and correct aspect ratio
      backgroundHeight = (canvas.width * (background.height / background.width) * 100) / 100;

      // Set background image
      ctx.drawImage(background, 0, 0, canvas.width, backgroundHeight);

      // Draw canvas
      if (window.innerWidth < 620) {
        drawings.mobile();
      } else {
        drawings.desktop();
      }
    };
  }
}
