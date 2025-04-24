import { getUpsellProducts, addProductToBasketById } from '../../../../../lib/helpers';

export default () => {
  const upsellContainer = document.querySelector('.BI039-2-upsell_content');

  if (!upsellContainer.querySelector('p')) {
    upsellContainer.insertAdjacentHTML('afterbegin', '<p>add a little extra to make your gift extra special...</p>');
    // get the upsell function from the lib folder
    const upsellProducts = getUpsellProducts();
    // add the upsell items
    Object.keys(upsellProducts).forEach((i) => {
      const data = upsellProducts[i];
      const upsellItem = document.createElement('div');
      upsellItem.classList.add('BI039-2-upsell_product');
      upsellItem.setAttribute('data-target', data.id);
      upsellItem.innerHTML = `
      <div class="BI039-2-image-box">
      <span class="BI039-2-upsellPrice">£${data.price}</span>
        <img src="${data.image}"/>
      </div>

      <p>${data.name}</p>
      <div data-id="${data.id}" class="BI039-2-upsell_buy BI039-2-button">add</div>`;

      upsellContainer.appendChild(upsellItem);
    });

    const upsellItemButton = document.querySelectorAll('.BI039-2-upsell_buy');
    let sizeChangeTimeout = null;
    for (let index = 0; index < upsellItemButton.length; index += 1) {
      const element = upsellItemButton[index];
      element.addEventListener('click', (e) => {
        const size = window.ometria.basket.size;
        const targetID = e.currentTarget.getAttribute('data-id');


        const currentTarget = e.currentTarget;

        if(currentTarget.classList.contains('BI039-2-adding')) {
          return;
        }

        currentTarget.classList.remove('BI039-2-added');

        currentTarget.classList.add('BI039-2-adding');
        currentTarget.textContent = 'adding...';

        const checkSizeChange = () => {
          const currentSize = window.ometria.basket.size;
          if (currentSize === size) {
            sizeChangeTimeout = setTimeout(() => {
              checkSizeChange();
            }, 200);
          } else {
            currentTarget.classList.add('BI039-2-added');
            currentTarget.textContent = 'added';
          }
        };

        checkSizeChange();
        addProductToBasketById(targetID);
      });
    }
  }
};
