import settings from './settings';

/**
 * @desc Last slide markup
 */

// fix price issue
const mainProductImage = document.querySelector('.flickity-slider .slide img').getAttribute('src');

const brandName = document.querySelector('.product-title-region .mobile-only-768').textContent;

let priceOnProduct;

if (document.querySelector('.product-info .price ins .woocommerce-Price-amount.amount')) {
  priceOnProduct = document.querySelector('.product-info .price ins .woocommerce-Price-amount.amount').innerHTML;
} else {
  priceOnProduct = document.querySelector('.product-info .price.large .amount').innerHTML;
}
const itemHasSelect = document.querySelector('.variations #pa_size');
const lastSlideMarkup = ` 
  <div class="${settings.ID}-last_slide">
  <div class="${settings.ID}-backgroundImage" style="background-image: url('${mainProductImage}')"></div>
  <div class="${settings.ID}-overlay"></div>  
  <div class="${settings.ID}-lightbox_content">
    <h3>Like the look of our officially licensed ${brandName}?</h3>
      <div class="${settings.ID}-priceBox">
        <div class="${settings.ID}-slide_price"><span class="${settings.ID}-buyTitle">Buy Now</span><p>${priceOnProduct}</p></div>
        <div class="${settings.ID}-slide_select"></div>
      </div>
      <div class="${settings.ID}-official_brand"></div>
      <div class="${settings.ID}-slideCTA">Add to bag</div>
    </div>
  </div>`;

export default lastSlideMarkup;

export const addLastSlideElements = () => {
  const itemBrand = document.querySelector('.merchoid_price_framing img');
  if (itemBrand) {
    const allBrandInLastSlide = document.querySelectorAll(`.${settings.ID}-official_brand`);
    for (let index = 0; index < allBrandInLastSlide.length; index += 1) {
      const element = allBrandInLastSlide[index];
      element.innerHTML = `100% official. Approved by <div class="${settings.ID}-brand" style="background-image:url(${itemBrand.getAttribute('src')})"/>`;
    }
  }

  if (itemHasSelect) {
    const selectOptions = itemHasSelect.innerHTML;

    const allSelectWrappers = document.querySelectorAll(`.${settings.ID}-slide_select`);
    for (let index = 0; index < allSelectWrappers.length; index += 1) {
      const select = allSelectWrappers[index];

      const newSelectBox = document.createElement('select');
      newSelectBox.classList.add(`${settings.ID}-select`);
      newSelectBox.innerHTML = selectOptions;
      select.appendChild(newSelectBox);

      select.querySelector('select').addEventListener('change', () => {
        const selectValue = select.querySelector('select').value;


        const allSelects = document.querySelectorAll(`.${settings.ID}-slide_select select`);
        [].forEach.call(allSelects, (element) => {
          element.value = selectValue;
          jQuery('#pa_size').change();
          // update the price here
        });
        itemHasSelect.value = selectValue;
        jQuery('#pa_size').change();

        // update the prices on the last slide on select change
        const priceText = document.querySelector('.woocommerce-variation-price .price').innerHTML;
        if (priceText) {
          const pricesInLightbox = document.querySelectorAll(`.${settings.ID}-slide_price p`);
          [].forEach.call(pricesInLightbox, (price) => {
            price.innerHTML = priceText;
          });
        }
      });

      itemHasSelect.addEventListener('change', () => {
        select.querySelector('select').value = itemHasSelect.value;
      });
    }
  }
};

