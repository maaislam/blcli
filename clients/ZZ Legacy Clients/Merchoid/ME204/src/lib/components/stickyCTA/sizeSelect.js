/* Functions for the size options */

import settings from '../../settings';

/* Create the new size options */
export const addSize = () => {
  const itemHasSelect = document.querySelectorAll('.variations #pa_size option');
  const sizeWrapper = document.querySelector(`.${settings.ID}-size-options`);

  for (let index = 0; index < itemHasSelect.length; index += 1) {
    const element = itemHasSelect[index];

    // create the new size options
    const newSizeOption = document.createElement('div');
    newSizeOption.classList.add(`${settings.ID}-size`);
    newSizeOption.innerHTML = element.textContent;
    newSizeOption.setAttribute('size-target', element.value);

    sizeWrapper.appendChild(newSizeOption);
  }
};
/* Update the select dropdown in the background */
export const sizeEvents = () => {
  const selectBoxOptions = document.querySelector('.variations #pa_size');
  const allSizes = document.querySelectorAll(`.${settings.ID}-size:not(.${settings.ID}-outOfStock)`);
  for (let index = 0; index < allSizes.length; index += 1) {
    const element = allSizes[index];

    element.addEventListener('click', (e) => {
      const selectedSize = element.getAttribute('size-target');
      selectBoxOptions.value = selectedSize;
      jQuery('#pa_size').change();

      // remove any other active sizes
      const otherActiveSize = document.querySelectorAll(`.${settings.ID}-size_active`);
      for (let i = 0; i < otherActiveSize.length; i += 1) {
        const item = otherActiveSize[i];
        item.classList.remove(`${settings.ID}-size_active`);
      }
      e.currentTarget.classList.add(`${settings.ID}-size_active`);

      // update the price
      const priceText = document.querySelector('.woocommerce-variation-price .price');
      if (priceText) {
        const pricesInLightbox = document.querySelectorAll(`.${settings.ID}-product_price`);
        [].forEach.call(pricesInLightbox, (price) => {
          price.innerHTML = priceText.innerHTML;
        });
      }
    });
  }
};

export const addSizeToBag = () => {
  const addToCartButton = document.querySelector('.single_variation_wrap .single_add_to_cart_button');
  const sizeAddToBag = document.querySelector(`.${settings.ID}-addToCartSize`);
  sizeAddToBag.addEventListener('click', () => {
    if (document.querySelector(`.${settings.ID}-size.${settings.ID}-size_active`)) {
      addToCartButton.click();
    } else {
      document.querySelector(`.${settings.ID}-sizeError`).classList.add(`${settings.ID}-error_show`);
    }
  });
};

