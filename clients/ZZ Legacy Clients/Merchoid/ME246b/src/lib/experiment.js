/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();
  const { ID } = shared;

  const titleBanner = () => {
    const newBanner = document.createElement('div');
    newBanner.classList.add(`${ID}-titleBanner`);
    newBanner.innerHTML = `
    <div class="${ID}_background">
      <div class="${ID}_title"><span></span></div>
    </div>
    <div class="${ID}_title_subtext">
      <p>Stuck for ideas for the Geek in your life? Let Merchoid help you choose.</p>
    </div>`;

    document.querySelector('.page-title-wrapper').insertAdjacentElement('beforebegin', newBanner);
  }

  titleBanner();

  const newProductTitle = () => {
    const productNameElms = document.querySelectorAll('.product-item-details .product-item-name');
    [].forEach.call(productNameElms, (productNameElm) => {
      const link = productNameElm.querySelector('.product-item-link');

      if (link) {
        const text = link.innerText.trim();
        const regex = /^([^:]+:)/i;
        const regexMatches = text.match(regex);

        if (regexMatches && regexMatches[1]) {
          const newTitle = text.replace(regex, '');
          link.innerHTML = newTitle;
          link.insertAdjacentHTML('afterbegin', `<span class="${ID}-cat-name">${regexMatches[1].replace(/:$/, '')}</span>`);
        }
      }
    });
  }

  newProductTitle();
};
