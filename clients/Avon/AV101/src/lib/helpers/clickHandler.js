import { addToCart, emitDYAddToCart, getCart } from './addToCart';

const clickHandler = (id, VARIATION, fireEvent) => {
  document.querySelector(`.${id}__lightbox--wrapper`).addEventListener('click', (e) => {
    const target = e.target;
    const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);

    //console.log(target);
    const viewCount = sessionStorage.getItem(`${id}__viewcount--variation-${VARIATION}`);
    const ordinalSuffix = (number) => {
      var j = number % 10,
        k = number % 100;
      if (j == 1 && k != 11) {
        return number + 'st';
      }
      if (j == 2 && k != 12) {
        return number + 'nd';
      }
      if (j == 3 && k != 13) {
        return number + 'rd';
      }
      return number + 'th';
    };
    const countPlusSuffix = ordinalSuffix(viewCount) + ' view';

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
          buyBtn.classList.add(`${id}__white-button`);
          setTimeout(() => {
            card.classList.remove('adding');
            buyBtn.innerHTML = 'Add to basket';
            buyBtn.classList.remove(`${id}__white-button`);
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
          !isPurchaseAllRunning && fireEvent(`Customer clicks a single add to bag - ${countPlusSuffix}`);
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
              fireEvent(`Customer clicks add all samples - ${countPlusSuffix}`);
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
      // const addBagBtn = document.querySelector(`.${id}__total-add-to-bag`);
      // addBagBtn.innerText = 'Added all'
      // addBagBtn.classList.add(`${id}__white-button`);
      // setTimeout(() => {
      //   addBagBtn.classList.remove(`${id}__white-button`);
      //   addBagBtn.innerText = ''
      // }, 1500);
    } else if (
      targetMatched(`.${id}__variant_info`) ||
      targetMatched(`.${id}__product--img`) ||
      targetMatched(`.${id}__product-title`)
    ) {
      fireEvent(`Customer clicks on product to view product page - ${countPlusSuffix}`);
    } else if (
      targetMatched(`.${id}__close-btn`) ||
      (targetMatched(`.${id}__lightbox--wrapper`) && !target.closest(`.${id}__lightbox`))
    ) {
      const lightbox = document.querySelector(`.${id}__lightbox--wrapper`);
      lightbox.querySelector(`.${id}__lightbox`).classList.add(`${id}__close-lightbox`);
      setTimeout(() => {
        lightbox.remove();
        // document.documentElement.classList.remove('inc_prevent_scroll');
        // document.documentElement.removeAttribute('style');
        // document.body.removeAttribute('style');
        location.reload();
      }, 500);
    }
  });
};

export default clickHandler;
