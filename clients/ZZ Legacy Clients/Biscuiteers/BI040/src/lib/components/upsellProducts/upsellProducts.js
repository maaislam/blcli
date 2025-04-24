import { getUpsellProducts, addProductToBasketById } from '../../../../../lib/helpers';
import { addEventListener } from '../../winstack';
import settings from '../../settings';

export default () => {
  const upsellContainer = document.querySelector(`.${settings.ID}-upsell_content`);

  if (!upsellContainer.querySelector('p')) {
    upsellContainer.insertAdjacentHTML('afterbegin', '<p>add a little extra to make your gift extra special...</p>');

    // get the upsell function from the lib folder
    const upsellProducts = getUpsellProducts();
    // add the upsell items
    Object.keys(upsellProducts).forEach((i) => {
      const data = upsellProducts[i];
      const upsellItem = document.createElement('div');
      upsellItem.classList.add(`${settings.ID}-upsell_product`);
      upsellItem.setAttribute('data-target', data.id);
      upsellItem.innerHTML = `
      <div class="${settings.ID}-image-box">
      <span class="${settings.ID}-upsellPrice">£${data.price}</span>
        <img src="${data.image}"/>
      </div>

      <p>${data.name}</p>
      <div data-id="${data.id}" class="${settings.ID}-upsell_buy ${settings.ID}-button">add</div>`;

      upsellContainer.appendChild(upsellItem);
    });

    const upsellItemButton = document.querySelectorAll(`.${settings.ID}-upsell_buy`);

    let sizeChangeTimeout = null;

    const checkSizeChange = (size, currentTarget) => {
      const currentSize = window.ometria.basket.size;
      if (currentSize === size) {
        sizeChangeTimeout = setTimeout(() => {
          checkSizeChange(size, currentTarget);
        }, 200);
      } else {
        currentTarget.classList.add(`${settings.ID}-added`);
        currentTarget.textContent = 'added';
      }
    };

    for (let index = 0; index < upsellItemButton.length; index += 1) {
      const element = upsellItemButton[index];
      addEventListener(element, 'click', (e) => {
        const size = window.ometria.basket.size;
        const targetID = e.currentTarget.getAttribute('data-id');

        const currentTarget = e.currentTarget;

        if(currentTarget.classList.contains(`${settings.ID}-adding`)) {
          return;
        }

        currentTarget.classList.remove(`${settings.ID}-added`);

        currentTarget.classList.add(`${settings.ID}-adding`);
        currentTarget.textContent = 'adding...';

        checkSizeChange(size, currentTarget);
        addProductToBasketById(targetID);
      });
    }
  }
};
