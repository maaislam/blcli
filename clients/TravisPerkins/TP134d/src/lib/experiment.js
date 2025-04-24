/**
 * TP134d - Brick PDP changes
 * @author User Conversion
 */
import { setup, addTitleMeasurements, buildBrickMeasurement, keyInfo, addThumbnails } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events } from './../../../../../lib/utils';
import { pollerLite } from './../../../../../lib/uc-lib';

const activate = () => {
  setup();

  const cache = (() => {
    const docVar = document;
    const bodyVar = docVar.body;
    const productDetailContainer = bodyVar.querySelector('#ProductDetail .tpProductInfo');
    const quantityInput = docVar.getElementById('qty');
    const addToCartButton = docVar.getElementById('addToCartButton');
    const brickHeight = bodyVar.querySelector('div#tab-techspecs tbody > tr > td:last-child').textContent.trim().replace(/\smm/g, '');
    const quantityError = bodyVar.querySelector('.moqErrorMsg');
    const outofStockError = $('.noStockErrorMsg');
    // Reassigned after markup has rendered, when calculator is initialised
    let wastageCheckbox;
    let slideToggleInput;
    let heightInput;
    let lengthInput;
    let heightLabel;
    let lengthLabel;
    let totalBricksOutput;
    let totalPacksOutput;
    let totalPacksButtonNumber;
    let valuesContainer;
    let TP131ErrorMessageATB;
    let TP131ErrorMessageATBJQ;
    // Maintains state of calculator
    const calculatorState = {
      measurementUnit: 'm',
      includeWaste: true,
      useHeight: 60,
      inputHeight: 1,
      inputLength: 2,
      packQuantity: 0,
      addToBasketQ: 1,
      minimumQuantity: 1,
    };
    // Update brick height if needed (based on DOM attribute)
    if (brickHeight === '73') {
      calculatorState.useHeight = 50;
    }
    // Set minimum pack quantity
    calculatorState.minimumQuantity = parseInt(quantityError.textContent.trim().replace(/Delivery minimum order qty: /g, ''), 10);

    return {
      docVar,
      bodyVar,
      productDetailContainer,
      quantityInput,
      addToCartButton,
      brickHeight,
      wastageCheckbox,
      slideToggleInput,
      valuesContainer,
      heightInput,
      lengthInput,
      heightLabel,
      lengthLabel,
      totalBricksOutput,
      totalPacksOutput,
      totalPacksButtonNumber,
      calculatorState,
      outofStockError,
      TP131ErrorMessageATB,
      TP131ErrorMessageATBJQ,
    };
  })();


  const getPackQuantity = () => {
    const allSpecs = cache.bodyVar.querySelectorAll('div#tab-techspecs tbody tr');
    for (let i = 0, n = allSpecs.length; i < n; i += 1) {
      const currentSpec = allSpecs[i];
      const specTitle = currentSpec.querySelector('.attrib');
      if (specTitle.textContent.toUpperCase().trim() === 'PACK QUANTITY') {
        return parseInt(currentSpec.querySelector('td:last-child').textContent.trim(), 10);
      }
    }
  };
  const packQty = getPackQuantity();

  const findAttribute = (table, name) => {
    if (table && name) {
      const tableRows = table.querySelectorAll('tr');
      for (let i = 0; tableRows.length > i; i += 1) {
        const attr = tableRows[i].querySelector('.attrib');
        if (attr.textContent.toLowerCase() === name.toLowerCase()) {
          const value = tableRows[i].querySelector('td:last-of-type');
          if (value) {
            return value.textContent;
          }
        }
      }
    }
  };

  const specTable = document.querySelector('#tab-techspecs .featureClass table');

  const data = {
    height: findAttribute(specTable, 'height'),
    length: findAttribute(specTable, 'length'),
    width: findAttribute(specTable, 'width'),
    brickCount: cacheDom.get('h1.tpProductTitle'),
    qty: packQty,
  };

  // const brickImage = cacheDom.getAll('#s7ProductDetailsImage_container img');
  const ref = cacheDom.get('#s7ProductDetailsImage');
  const titleRef = cacheDom.get('h1.tpProductTitle');
  const tabRef = cacheDom.get('#productDetailUpdateable > .span-14');
  const atbCta = cacheDom.get('#addToCartForm');
  addTitleMeasurements(data, titleRef);
  buildBrickMeasurement(data, ref);
  keyInfo(data, tabRef);

  // Events
  atbCta.addEventListener('click', (e) => {
    events.send('TP134d', 'Click', 'Add to cart', { sendOnce: true });
  });

  // Move login link above price
  const loginLink = document.querySelector('.TP134d.feature-design .tpInfoWrapper > .yCmsComponent');
  const priceContainer = document.querySelector('.feature-design .tpProductView .tpProductInfo.logged_out.guest .tpInfoWrapper');
  const priceValueEl = document.querySelector('.TP134d #tpPdpRightPanelComponent .productEQPrice > .price_value');
  const measurementEl = document.querySelector('.productEQPrice .price_info_holder .price_UOM');
  let measurementText = 'per brick';
  if (measurementEl) {
    measurementText = measurementEl.textContent;
  }
  let moved = false;
  if (loginLink && priceContainer) {
    if (moved === false) {
      priceContainer.insertAdjacentElement('beforebegin', loginLink);
      moved = true;
    }
  }
  if (priceValueEl) {
    const currentText = priceValueEl.textContent;
    priceValueEl.textContent = `${currentText}`;
  }

  // Swap prices Inc vat for Ex vat (per brick)
  const incVat = document.querySelector('.prices_holder .price_inc_vat_section');
  const perBrick = document.querySelector('.tpInfoWrapper .productEQPrice');
  // let movedTwo = false;
  // if (incVat && perBrick) {
  //   if (movedTwo === false) {
  //     incVat.insertAdjacentElement('beforebegin', perBrick);
  //     movedTwo = true;
  //   }
  // }

  const multiImages = () => {
    // PDP already has thumbnails so just add a new one with the brick measurements.
    const thumbnails = document.querySelectorAll('#s7ProductDetailsImage_swatches .s7thumbcell');
    const existingImages = document.getElementById('s7ProductDetailsImage');
    thumbnails[0].parentElement.parentElement.insertAdjacentHTML('beforeend', `
      <div id="TP134d-thumb" class="s7thumbcell"></div>
    `);
    for (let i = 0; thumbnails.length > i; i += 1) {
      thumbnails[i].addEventListener('click', () => {
        existingImages.classList.remove('TP134d-show');
      });
    }
    const addedThumb = document.getElementById('TP134d-thumb');
    addedThumb.addEventListener('click', () => {
      existingImages.classList.add('TP134d-show');
    });
  };
  
  // If just one image
  const oneImage = () => {
    const mainImage = document.querySelector('#s7ProductDetailsImage_container .s7staticimage img');
    const thumbRef = document.querySelector('.s7container');
    if (mainImage) {
      pollerLite([() => {
        let run = false;
        if (mainImage.getAttribute('src')) {
          run = true;
        }
        return run;
      }], () => {
        const mainImageUrl = mainImage.getAttribute('src');
        addThumbnails(mainImageUrl, thumbRef);
        // Toggle images
        const addedThumb = document.querySelector('.TP134d-tabs #measurements');
        const imgContainer = document.getElementById('s7ProductDetailsImage');
        const otherThumb = document.querySelector('.TP134d-tabs #image');
        if (addedThumb) {
          addedThumb.addEventListener('click', () => {
            imgContainer.classList.add('TP134d-show');
          });
        }
        if (otherThumb) {
          otherThumb.addEventListener('click', () => {
            imgContainer.classList.remove('TP134d-show');
          });
        }
      })
      // mainImage.addEventListener('load', () => {
      // });
    }
  };

  if (document.readyState === 'loading') { // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', () => {
      const swatches = document.getElementById('s7ProductDetailsImage_swatches');
      if (swatches.children.length === 0) {
        oneImage();
      } else {
        multiImages();
      }
    });
  } else { // `DOMContentLoaded` has already fired
    const swatches = document.getElementById('s7ProductDetailsImage_swatches');
    if (swatches.children.length === 0) {
      oneImage();
    } else {
      multiImages();
    }
  }

};


export default activate;
