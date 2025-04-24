import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function addTitleMeasurements(measurementsObject, titleRef) {
  if (measurementsObject && titleRef) {
    const { height } = measurementsObject;
    const { length } = measurementsObject;
    const { width } = measurementsObject;
    if (height && length && width) {
      if (!document.querySelector('.TP134d-measurements--title')) {
        titleRef.insertAdjacentHTML('afterend', `
          <div class="TP134d-measurements--title">
            <p>(L) ${length} x (W) ${width} x (H) ${height}</p>
          </div>
        `);
      }
    }
  }
}

function buildBrickMeasurement(measurementsObject, ref) {
  if (measurementsObject && ref) {
    const { height } = measurementsObject;
    const { length } = measurementsObject;
    const { width } = measurementsObject;
    if (height && length && width) {
      if (!document.querySelector('.TP134d-measurements--image')) {
        ref.insertAdjacentHTML('afterbegin', `
          <div class="TP134d-measurements--image">
            <div class="TP134d-brick">
              <span class="height">
                Height<br />
                <strong>${height}</strong>
              </span>
              <span class="width">
                Width<br />
                <strong>${width}</strong>
              </span>
              <span class="length">
                Length<br />
                <strong>${length}</strong>
              </span>
            </div>
          </div>
        `);
      }
    }
  }
}

function keyInfo(measurementsObject, ref) {
  if (measurementsObject && ref) {
    const { height } = measurementsObject;
    const { length } = measurementsObject;
    const { width } = measurementsObject;
    const { qty } = measurementsObject;

    // Work out how many yards
    const yardAmount = () => {
      const brickLength = parseFloat(length) / 1000;
      const brickHeight = parseFloat(height) / 1000;
      
      const h = brickHeight * qty;
      const a = h * brickLength;
      const yards = a;
      return yards;
    };
    const y = yardAmount();
    const yards = y.toFixed(2);

    if (!document.querySelector('.TP134d-key--info')) {
      ref.insertAdjacentHTML('beforeend', `
        <div class="TP134d-key--info">
          <h3>Key Information:</h3>
  
          <div class="TP134d-info">
            <div class="TP134d-info--img"></div>
            <div class="TP134d-info--data">
              <p><strong>Pack Size</strong></p>
              <p>${qty} bricks per pack</p>
            </div>
          </div>

          <div class="TP134d-info">
            <div class="TP134d-info--img"></div>
            <div class="TP134d-info--data">
              <p><strong>Coverage</strong></p>
              <p>1 pack covers ${yards} m<sup>2</sup></p>
            </div>
          </div>
          
          <div class="TP134d-info">
            <div class="TP134d-info--img"></div>
            <div class="TP134d-info--data">
              <p><strong>Size</strong></p>
              <p><span>L:</span> <span>${length}</span></p>
              <p><span>W:</span> <span>${width}</span></p>
              <p><span>H:</span> <span>${height}</span></p>
            </div>
          </div>
        </div>
      `);
    }
  }
}


function addThumbnails(imgUrl, ref) {
  if (ref && imgUrl) {
    ref.insertAdjacentHTML('beforeend', `
      <div class="TP134d-tabs">
        <div id="image">
          <img src="${imgUrl}" alt="Brick Thumbnail"/>
        </div>
        <div id="measurements">
          <img src="data:image/png;base64,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" alt="Brick measurements"/>
        </div>
      </div>
    `);
  }
}


export { setup, addTitleMeasurements, buildBrickMeasurement, keyInfo, addThumbnails }; // eslint-disable-line
