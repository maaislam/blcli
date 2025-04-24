import updateMiniCart from './updateMiniCart';
import { manageBasket } from './utils';

const addFreeProduct = (id, checkBoxContainerElem, prdQty) => {
  checkBoxContainerElem.classList.add(`${id}__disabled`);

  const titleElem = document.querySelector('[data-qaid="add-to-basket-overlay"] #title');

  const deliveryType = titleElem && titleElem.textContent.includes('delivery') ? 'Delivery' : 'Collection';

  manageBasket('Add', '602HN', prdQty, deliveryType) // Adds an item
    .then((data) => {
      checkBoxContainerElem.classList.remove(`${id}__disabled`);
      updateMiniCart(data.mainview.totalNumberOfItems);
    })
    .catch((error) => {
      console.error('Error managing the basket:', error);
      checkBoxContainerElem.classList.remove(`${id}__disabled`);
    });
};
export default addFreeProduct;
