/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { activeRadioButton } from './assets/icons';
import variantDropDown from './components/variantDropDown';
import variantsWrapper from './components/variatntsWrapper';
import mainProductData from './data/data';
import { getProductsData, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'product page'; //add page check conditions here based on experiment requirement

  if (!pageCondition) {
    //remove DOM element added by the experiment
    const variantsWrapper = document.querySelectorAll(`.${ID}__variantWrapper`);
    if (variantsWrapper && variantsWrapper.length > 0) {
      variantsWrapper.forEach((wrapper) => wrapper.remove());
    }

    const variantsDropdown = document.querySelectorAll(`.${ID}__variantDropDown`);
    if (variantsDropdown && variantsDropdown.length > 0) {
      variantsDropdown.forEach((dropdown) => dropdown.remove());
    }

    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  /*****add experiment specific code here*****/

  const currentSKU = window.utag.data.prodSku[0];
  const selectedProduct = mainProductData[currentSKU];
  const currentPageUrl = window.location.href;
  const dimension = new Set();

  if (!selectedProduct) {
    return;
  }

  fireEvent('Conditions Met');
  if (VARIATION === 'control') return;
  setup();

  // Loop through the referenced data to collect unique widths and heights with URLs
  if (selectedProduct && selectedProduct.reference) {
    const referenceData = selectedProduct.reference;

    for (const sku in referenceData) {
      //eslint-disable-next-line no-prototype-builtins
      if (referenceData.hasOwnProperty(sku)) {
        const { width, height, url } = referenceData[sku];
        dimension.add({
          widthValue: `${width}`,
          heightValue: `${height}`,
          url,
        });
      }
    }
  }

  // Convert the sets to arrays
  const uniqueDimension = Array.from(dimension);

  const activeHeight = selectedProduct.height;
  const activeWidth = selectedProduct.width;

  // Arrays to hold results
  const heightsForActiveWidth = new Map();
  const widthsForActiveHeight = new Map();

  // Populate arrays based on activeHeight and activeWidth
  uniqueDimension.forEach(({ widthValue, heightValue, url }) => {
    if (heightValue === activeHeight) {
      if (!widthsForActiveHeight.has(widthValue) || url === currentPageUrl) {
        widthsForActiveHeight.set(widthValue, { width: parseInt(widthValue, 10), url });
      }
    }
    if (widthValue === activeWidth) {
      if (!heightsForActiveWidth.has(heightValue) || url === currentPageUrl) {
        heightsForActiveWidth.set(heightValue, { height: parseInt(heightValue, 10), url });
      }
    }
  });

  // Convert maps to arrays and sort them
  const uniqueWidthsForActiveHeight = Array.from(widthsForActiveHeight.values()).sort((a, b) => a.width - b.width);
  const uniqueHeightsForActiveWidth = Array.from(heightsForActiveWidth.values()).sort((a, b) => a.height - b.height);

  //for v2
  // Final permutation array
  const permutations = [];

  uniqueWidthsForActiveHeight.forEach(({ width, url: widthUrl }) => {
    const isSelected = activeHeight === selectedProduct.height && width === selectedProduct.width;
    const combination = {
      height: `${activeHeight}mm`,
      width: `${width}mm`,
      URL: widthUrl,
      description: `H: ${activeHeight}mm x W: ${width}mm`,
      isSelected,
    };
    permutations.push(combination);
  });

  uniqueHeightsForActiveWidth.forEach(({ height, url: heightUrl }) => {
    const isSelected = height === selectedProduct.height && activeWidth === selectedProduct.width;
    const combination = {
      height: `${height}mm`,
      width: `${activeWidth}mm`,
      URL: heightUrl,
      description: `H: ${height}mm x W: ${activeWidth}mm`,
      isSelected,
    };
    permutations.push(combination);
  });

  const uniquePermutations = permutations.filter(
    (item, index, self) => index === self.findIndex((i) => i.height === item.height && i.width === item.width)
  );

  // Ensure selected product combination is placed first
  const selectedCombination = uniquePermutations.find(
    (item) => item.height === `${selectedProduct.height}mm` && item.width === `${selectedProduct.width}mm`
  );

  const sortedPermutations = uniquePermutations.filter(
    (item) => item !== selectedCombination // Remove selected combination temporarily
  );

  // Add the selected combination to the beginning if it exists
  if (selectedCombination) {
    sortedPermutations.unshift(selectedCombination);
  }

  const quantityElement = document.querySelector('[data-qaid="pdp-product-quantity"]');
  const quantityWrapper = quantityElement.closest('div');

  const priceElement = document.querySelector('[data-qaid="product-price"]');
  const priceWrapper = priceElement.closest('div');

  const isMobile = window.innerWidth <= 640;

  if (!document.querySelector(`.${ID}__variantWrapper`) && VARIATION === '1') {
    !isMobile &&
      quantityWrapper.insertAdjacentHTML(
        'afterend',
        variantsWrapper(ID, uniqueHeightsForActiveWidth, uniqueWidthsForActiveHeight)
      );
    isMobile &&
      priceWrapper.insertAdjacentHTML('afterend', variantsWrapper(ID, uniqueHeightsForActiveWidth, uniqueWidthsForActiveHeight));
  }

  if (!document.querySelector(`.${ID}__variantDropDown`) && VARIATION === '2') {
    !isMobile &&
      quantityWrapper.insertAdjacentHTML('afterend', variantDropDown(ID, sortedPermutations, activeHeight, activeWidth));
    isMobile && priceWrapper.insertAdjacentHTML('afterend', variantDropDown(ID, sortedPermutations, activeHeight, activeWidth));

    const collectUrls = sortedPermutations.map((item) => item.URL);

    getProductsData(collectUrls)
      .then((products) => {
        products.forEach((item) => {
          const link = item.url;
          if (document.querySelector(`.${ID}__optionsContainer a[href="${link}"]`)) {
            const targetElement = document.querySelector(`.${ID}__optionsContainer a[href="${link}"]`);
            targetElement.insertAdjacentElement('beforeend', item.price);
          }
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const inputHandler = () => {
    fireEvent('user interacts with quantity ');
  };

  quantityElement.removeEventListener('input', inputHandler);
  quantityElement.addEventListener('input', inputHandler);
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }
  /*****Request from Screwfix*****/

  const clickHandler = (e) => {
    const pageCondition = window.utag.data.basicPageId === 'product page';
    if (!pageCondition) return;
    const { target } = e;
    if (target.closest(`.${ID}__selectedItem`)) {
      const clickedItem = target.closest(`.${ID}__selectedItem`);
      const wrapper = clickedItem.closest(`.${ID}__variantDropDownContainer`);
      wrapper.classList.toggle('open');
    } else if (target.closest(`.${ID}__optionsContainer a`)) {
      fireEvent('user interacts with size variant');
      const clickedItem = target.closest(`.${ID}__optionsContainer a`);
      const { height, width } = clickedItem.dataset;
      const wrapper = clickedItem.closest(`.${ID}__variantDropDownContainer`);
      wrapper.querySelector(`.${ID}__selectedText`).textContent = ` Select size: ${height} x ${width}`;
      clickedItem.querySelector(`.${ID}__icon`).innerHTML = activeRadioButton;
      wrapper.classList.toggle('open');
    } else if (target.closest(`.${ID}__option`) && target.closest(`.${ID}__heightWrapper`)) {
      fireEvent('user interacts with height');
    } else if (target.closest(`.${ID}__option`) && target.closest(`.${ID}__widthWrapper`)) {
      fireEvent('user interacts with width');
    } else if (target.closest('.slick-track')) {
      fireEvent('user interacts with carousel');
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
