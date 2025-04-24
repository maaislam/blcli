import fetchCart from './getCart';

import updateDiscountBlock from './discountBlock';
import miniCart from './miniCart';
import reRenderDOM from './reRender';

import { renderLoader } from './renderLoader';

export const deleteItem = (ID) => {
  document.body.addEventListener('click', (e) => {
    if (e.target.closest(`.${ID}__btn--remove`)) {
      const itemId = e.target.closest(`.${ID}__btn--remove`).getAttribute('data-variant-id');

      //  fireEvent('Customer clicks to delete a sample from the summary View');
      const obj = {
        id: itemId,
        quantity: 0,
      };
      const delItem = async () => {
        const response = await fetch(`/cart/change.js`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        });
        if (response) {
          renderLoader('remove', 'removed');
          setTimeout(() => {
            reRenderDOM();

            fetchCart().then((cart) => {
              cartCount(cart['item_count']);
              updateDiscountBlock(cart);

              const itemClicked = document
                .querySelectorAll('.AV095__collection-main')[1]
                .querySelector(`[data-var-id = "${itemId}"]`);
              if (itemClicked && itemClicked.classList.contains('AV095__normal-prod')) {
                itemClicked.innerHTML = 'Add Sample';
                itemClicked.classList.remove('AV095__addedtobasket--btn');
              }

              document.querySelectorAll('.AV095__cart--dropdown').forEach((elem) => {
                if (cart['item_count'] >= 1) {
                  elem.innerHTML = miniCart(cart.items, 'AV095');
                } else {
                  elem.closest('.AV095-pg-header__cart').innerHTML = '';
                }
              });
            });
          }, 1500);
        }
      };

      delItem();
    }
  });
};

export const renderDelBtn = (id) => {
  const delBtn = `
    <div
    class="btn btn-plain btn-remove AV095__btn--remove"
    data-variant-id="${id}"><svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.07992 15.4C7.43992 15.4 7.73992 15.1 7.73992 14.74V8.16C7.73992 7.8 7.43992 7.5 7.07992 7.5C6.71992 7.5 6.41992 7.8 6.41992 8.16V14.74C6.41992 15.1 6.71992 15.4 7.07992 15.4Z" fill="black"/>
    <path d="M10.9197 15.4C11.2797 15.4 11.5797 15.1 11.5797 14.74V8.16C11.5797 7.8 11.2797 7.5 10.9197 7.5C10.5597 7.5 10.2597 7.8 10.2597 8.16V14.74C10.2397 15.1 10.5397 15.4 10.9197 15.4Z" fill="black"/>
    <path d="M16.8999 3.39997H11.6999V3.19997C11.6999 1.71997 10.4799 0.499969 8.99994 0.499969C7.51994 0.499969 6.29994 1.71997 6.29994 3.19997V3.39997H1.09994C0.739942 3.39997 0.439941 3.69997 0.439941 4.05997C0.439941 4.41997 0.739942 4.71997 1.09994 4.71997H2.21994V15.2C2.21994 17.56 4.13994 19.5 6.51994 19.5H11.4799C13.8399 19.5 15.7799 17.58 15.7799 15.2V4.73997H16.8999C17.2599 4.73997 17.5599 4.43997 17.5599 4.07997C17.5599 3.69997 17.2599 3.39997 16.8999 3.39997ZM7.61994 3.19997C7.61994 2.43997 8.23994 1.81997 8.99994 1.81997C9.75994 1.81997 10.3799 2.43997 10.3799 3.19997V3.39997H7.61994V3.19997ZM14.4399 15.2C14.4399 16.84 13.0999 18.18 11.4599 18.18H6.51994C4.87994 18.18 3.53994 16.84 3.53994 15.2V4.73997H14.4399V15.2Z" fill="black"/>
    </svg></div>`;

  return delBtn;
};
