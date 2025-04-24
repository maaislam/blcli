import fetchCart from './getCart';
import { renderLoader } from './renderLoader';

import reRenderDOM from './reRender';

const updateBasket = (data, selectionType, elemClicked) => {
  //check if already in basket
  fetchCart().then((products) => {
    const itemInBasket = products.items.some((product) => product.id == data.id);

    if (!itemInBasket) {
      renderLoader('add', 'added');

      if (selectionType === 'normal') {
        elemClicked.innerHTML = 'Adding to basket';
      }
      //add an item
      addDelItem(data).then((res) => {
        if (selectionType === 'normal') {
          elemClicked.innerHTML = 'Sample Added';
          elemClicked.classList.add('AV095__addedtobasket--btn');
        }
        reRenderDOM();
      });
    } else {
      if (selectionType === 'normal') {
        elemClicked.innerHTML = 'Removing from basket';
      }
      //delete an item
      renderLoader('remove', 'removed');
      setTimeout(() => {
        addDelItem(data, 'change', 'delete').then((res) => {
          if (selectionType === 'normal') {
            elemClicked.innerHTML = 'Removed from basket';
            setTimeout(() => {
              elemClicked.innerHTML = 'Add Sample';
              elemClicked.classList.remove('AV095__addedtobasket--btn');
            }, 1000);
          }
          reRenderDOM();
        });
      }, 1500);
    }
  });
  //if already in basket then delete or else add to basket and update DOM in million places
};

const addDelItem = async (data, url = 'add', action = 'add') => {
  var obj = {};
  if (action == 'delete') {
    obj = { ...obj, ...{ id: data.id, quantity: 0 } };
  } else {
    obj = data;
  }

  const response = await fetch(`/cart/${url}.js`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  return await response.json();
};

export default updateBasket;
