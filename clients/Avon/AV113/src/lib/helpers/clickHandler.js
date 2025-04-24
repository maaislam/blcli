import { addToCart, emitDYAddToCart, getCart } from './addToCart';

const clickHandler = (id, fireEvent) => {
  document.querySelector(`.${id}__lightbox--wrapper`).addEventListener('click', (e) => {
    const target = e.target;
    const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);

    //console.log(target);

    //const inputBox = target.closest(`.${id}__cartbtn--container`)?.querySelector('input');

    if (targetMatched(`.${id}__product_add-to-cart`)) {
      const lightbox = target.closest(`.${id}__lightbox--wrapper`);
      const isPurchaseAllRunning = lightbox.classList.contains('adding-all');
      const card = target.closest(`.${id}__product--card`);

      card.classList.add('adding');
      const buyBtn = card.querySelector(`.${id}__product_add-to-cart`);
      buyBtn.innerHTML = 'Adding';
      addToCart(target.getAttribute('data-id'), 1)
        .then((res) => {
          // console.log(res);
          //fireEvent('Add to bag of hero product from homepage');
          buyBtn.innerHTML = 'Added';
          setTimeout(() => {
            card.classList.remove('adding');
            buyBtn.innerHTML = 'Add to basket';
            // console.log(res);
          }, 1500);
          return res;
        })
        .then((res) => {
          return emitDYAddToCart(res, 1);
        })
        .then(() => {
          return getCart();
        })
        .then((result) => {
          // console.log(result);
          const cartCount = document.getElementById('header-bag').querySelector('.cart-count');
          cartCount.classList.remove('no-items');
          cartCount.innerText = result['item_count'];
          !isPurchaseAllRunning && fireEvent('Customer clicks a single add to bag');
        })
        .catch((err) => console.log(err));
    } else if (targetMatched(`.${id}__total-add-to-bag`)) {
      const buyBtns = document.querySelectorAll(`.${id}__product_add-to-cart`);
      const lightbox = target.closest(`.${id}__lightbox--wrapper`);

      let i = 1;

      function myLoop() {
        setTimeout(() => {
          if (i < buyBtns.length + 1) {
            myLoop();
            if (i === buyBtns.length) {
              fireEvent('Customer clicks add all products');
            }
          }
          lightbox.classList.add('adding-all');
          buyBtns[i - 1]?.click();
          lightbox.classList.remove('adding-all');
          console.log(i);
          i++;
        }, 1000);
      }
      myLoop();
    } else if (
      targetMatched(`.${id}__variant_info`) ||
      targetMatched(`.${id}__product--img`) ||
      targetMatched(`.${id}__product-title`)
    ) {
      fireEvent('Customer clicks on product to view product page');
    } else if (
      targetMatched(`.${id}__close-btn`) ||
      (targetMatched(`.${id}__lightbox--wrapper`) && !target.closest(`.${id}__lightbox`))
    ) {
      const lightbox = document.querySelector(`.${id}__lightbox--wrapper`);
      lightbox.querySelector(`.${id}__lightbox`).classList.add(`${id}__close-lightbox`);
      setTimeout(() => {
        lightbox.remove();
      }, 500);
    }
  });
};

export default clickHandler;
