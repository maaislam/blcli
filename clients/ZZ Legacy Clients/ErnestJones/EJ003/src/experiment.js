/**
 * EJ003 - Product Page Restructure
 * @author Lewis Needham - User Conversion
 */
import { setup } from './services';
import ProductImageSlider from './components/ProductImageSlider';
import USPBox from './components/USPBox';
import WillItFit from './components/WillItFit';
import settings from './settings';
import { cacheDom } from './../../../../lib/cache-dom';
import { pollerLite } from './../../../../lib/uc-lib';

const activate = () => {
  setup();

  /* COMPONENTS ------------------------------------------------ */
  const productImageSlider = new ProductImageSlider();
  const USP = new USPBox();
  const willItFit = new WillItFit();


  /* DOM MANIPULATION ------------------------------------------ */
  /** Take description and specification out of accordion */
  const moveDetailsFromAccordion = () => {
    const run = () => {
      const accordion = cacheDom.get('.product-details');
      const toMove = [
        '.product-details__description-container',
        '.product-details__specification-container',
      ];

      // Create elements
      const details = document.createElement('section');
      details.classList.add(`${settings.ID}_details`);

      // Append logo
      const brandStock = cacheDom.get('.brand-stock');
      details.appendChild(brandStock.querySelector('.brand-stock__brand-link'));
      brandStock.style.display = 'none';

      const createDetailsSection = (selector) => {
        const el = accordion.querySelector(selector);
        const title = el.querySelector('h2').innerHTML;
        const content = el.querySelector('div').innerHTML;
        const detailsContent = document.createElement('div');
        detailsContent.classList.add(`${settings.ID}_details__contentBlock`);
        if (title.trim() !== 'Description') {
          detailsContent.innerHTML += `<div class="${settings.ID}_details__title">${title}</div>`;
        }
        detailsContent.innerHTML += `<div class="${settings.ID}_details__content">${content}</div>`;
        details.appendChild(detailsContent);

        // Hide original
        el.style.display = 'none';
      };
      toMove.forEach(createDetailsSection);

      // Render
      accordion.parentElement.insertBefore(details, accordion);
    };

    pollerLite([
      '.product-details',
      '.brand-stock .brand-stock__brand-link',
    ], run);
  };

  /** Move reviews below product title */
  const moveReviewsBelowTitle = () => {
    const run = () => {
      const reviews = cacheDom.get('.ratings-images');
      const productTitle = cacheDom.get('.buying-info__name');
      productTitle.parentElement.insertBefore(reviews, productTitle.nextSibling);
    };

    pollerLite([
      '.ratings-images',
      '.buying-info__name',
    ], run);
  };

  /** Alter CTAS */
  const alterCTAs = () => {
    const run = () => {
      const buy = cacheDom.get('.buying-buttons__buy');
      const finance = cacheDom.get('.buying-buttons-ifc__button');

      // Move finance button above finance info
      finance.parentElement.insertBefore(finance, finance.parentElement.children[0]);

      // Rename CTAs
      if (settings.VARIATION === '1') {
        buy.setAttribute('value', 'Add to cart');
        finance.setAttribute('value', 'Apply for finance');
        finance.innerHTML = 'Apply for finance';
      }
    };

    pollerLite([
      '.buying-buttons__buy',
      '.buying-buttons-ifc__button',
    ], run);
  };


  /* RENDER ----------------------------------------------------- */
  productImageSlider.run();
  USP.run();
  willItFit.run();
  moveDetailsFromAccordion();
  moveReviewsBelowTitle();
  alterCTAs();
};

export default activate;
