import { emitDYAddToCart } from './addToCart';

const clickHandler = (addToCart, getCart, isMobile, id, fireEvent) => {
  document.body.addEventListener('click', (e) => {
    const target = e.target;
    const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);

    // console.log(target);
    const closeDp = () =>
      document.querySelectorAll(`.${id}__variant-selector`).forEach((item) => item.classList.add(`${id}__hide`));
    const mobileOverlay = document.getElementById(`${id}__site-overlay`);
    const mobQuantitySelector = target.closest(`.${id}__prodcards`)?.querySelector(`.${id}__mobilequantity`);
    const inputBox = target.closest(`.${id}__cartbtn--container`)?.querySelector('input');
    const placeMobileQuantity = (selectedQuantity) => {
      const activeSlider = target.closest(`.${id}__prodcards`).querySelector('.swiper-slide-active');
      activeSlider.querySelector('input[name="quantity"]').value = selectedQuantity;
      activeSlider.querySelector(`.${id}__quantity-mobile .quantity-value`).innerText = selectedQuantity;

      mobQuantitySelector.classList.remove('active');
      mobileOverlay.classList.remove(`${id}__active--overlay`);
      fireEvent('Interacts with quantity');
    };

    if (targetMatched(`.${id}__prodcard--title >a`) || targetMatched(`.${id}__prodcard--image-container`)) {
      const sectionType =
        target.closest(`.${id}__prodcards`).dataset.sectiontype.indexOf('it again') !== -1 ? 'buy it again' : 'try a sample';
      fireEvent(`User visits PDP from ${sectionType} section`);
    } else if (targetMatched(`.${id}__plus-btn`)) {
      closeDp();
      inputBox.value = parseInt(inputBox.value) + 1;
      fireEvent('Interactions with quantity');
    } else if (targetMatched(`.${id}__minus-btn`)) {
      closeDp();
      inputBox.value = parseInt(inputBox.value <= 0 ? 2 : inputBox.value) - 1;
      fireEvent('Interactions with quantity');
    } else if (targetMatched(`.add-to-cart`)) {
      const card = target.closest(`.${id}__prodcard`);
      closeDp();
      card.classList.add('adding');
      card.querySelector('.add-to-cart').innerHTML = 'Adding';
      addToCart(target.getAttribute('data-sku'), parseInt(inputBox.value))
        .then((res) => {
          // console.log(res);
          fireEvent('Add to bag of hero product from homepage');
          card.querySelector('.add-to-cart').innerHTML = 'Added';
          setTimeout(() => {
            card.classList.remove('adding');
            card.querySelector('.add-to-cart').innerHTML = 'Add to basket';
            // console.log(res);
          }, 1500);
          return res;
        })
        .then((res) => {
          return emitDYAddToCart(res, parseInt(inputBox.value));
        })
        .then(() => {
          return getCart();
        })
        .then((result) => {
          // console.log(result);
          const cartCount = document.getElementById('header-bag').querySelector('.cart-count');
          cartCount.classList.remove('no-items');
          cartCount.innerText = result['item_count'];
        })
        .catch((err) => console.log(err));
    } else if (targetMatched(`.${id}__variant`) && !targetMatched(`.${id}__cloned-variant-selector`)) {
      const variantSku = target.closest('[data-varsku]');

      const card = target.closest(`.${id}__prodcard`);
      // console.log('card', target);
      const selectionBlock = card.querySelector(`.variant-selected .${id}__shade-img`);

      card.querySelector(`.variant-selected`).click();
      variantSku.getAttribute('data-type') == 'Size'
        ? (selectionBlock.innerText = variantSku.querySelector('.variant-name').innerText)
        : (card.querySelector(`.variant-selected .${id}__shade-img`).style.backgroundImage = `url(${target
            .closest('[data-img]')
            .getAttribute('data-img')})`);
      card.querySelector(`.${id}__variant.selected`)?.classList.remove('selected');
      variantSku.classList.add('selected');
      card.querySelector('.add-to-cart').setAttribute('data-sku', variantSku.getAttribute('data-varsku'));
      fireEvent('Interacts with swatches ');
    } else if (targetMatched(`.variant-selected`)) {
      const variantSelector = target.closest(`.${id}__cartbtn--container`).querySelector(`.${id}__variant-selector`);

      const clonedSelector = variantSelector.cloneNode(true);
      clonedSelector.classList.add(`${id}__cloned-variant-selector`);

      variantSelector.classList.toggle(`${id}__hide`);
      variantSelector.classList.remove(`${id}__invisible`);

      if (!isMobile) return;

      variantSelector.classList.add(`${id}__invisible`);
      if (variantSelector.classList.contains(`${id}__hide`)) {
        const mobVariantSelector = document.querySelector(`.${id}__cloned-variant-selector`);
        mobVariantSelector?.classList.remove('active');
        setTimeout(() => {
          document.querySelectorAll(`.${id}__cloned-variant-selector`)?.forEach((elm) => {
            elm.remove();
          });
        }, 350);

        mobileOverlay.classList.remove(`${id}__active--overlay`);
      } else {
        target.closest('.swiper-wrapper').insertAdjacentElement('beforebegin', clonedSelector);
        const mobVariantSelector = document.querySelector(`.${id}__cloned-variant-selector`);
        mobVariantSelector?.classList.remove(`${id}__hide`);
        setTimeout(() => {
          mobVariantSelector?.classList.add('active');
          variantSelector.classList.add(`${id}__invisible`);
          mobileOverlay.classList.add(`${id}__active--overlay`);
        }, 200);
      }
    } else if (
      targetMatched(`.${id}__cloned-variant-selector`) &&
      targetMatched(`.${id}__variant`) &&
      !targetMatched(`.${id}__prodcard`)
    ) {
      const selectedVariant = target.closest('[data-varsku]');
      const realVariant = document
        .querySelector(`.${id}__prodcards .swiper-wrapper`)
        .querySelector(`[data-varsku="${selectedVariant.getAttribute('data-varsku')}"]`);

      realVariant.click();
    } else if (
      (targetMatched(`.${id}__cloned-variant-selector`) && targetMatched(`.${id}__icon-close`)) ||
      (targetMatched(`.${id}__mobilequantity`) && targetMatched(`.${id}__mobilequantity-close`)) ||
      targetMatched(`#${id}__site-overlay`)
    ) {
      document.querySelector(`.${id}__cloned-variant-selector`)?.querySelector(`.${id}__variant.selected`).click();
      document.querySelector(`.${id}__mobilequantity`)?.classList.remove('active');
      mobileOverlay.classList.remove(`${id}__active--overlay`);
    } else if (targetMatched(`.${id}__mobile-quantity-wrapper`)) {
      mobQuantitySelector.querySelectorAll('li').forEach((li) => li.classList.remove('selected'));
      mobQuantitySelector.querySelector('input').value = '';
      mobQuantitySelector.classList.add('active');
      mobileOverlay.classList.add(`${id}__active--overlay`);
    } else if (targetMatched(`.${id}__mobile-quantity-item`)) {
      const selectedQuantity = target.closest('li').querySelector('.quantity-value').innerText;

      target.closest('li').classList.add('selected');
      //place quantity in desktop quantity input field
      placeMobileQuantity(selectedQuantity);
    } else if (targetMatched(`.${id}__mobile-quantity-btn`)) {
      const selectedQuantity = target.closest('.mobile-quantity-action').querySelector('input').value;
      placeMobileQuantity(selectedQuantity);
    } else if (!targetMatched(`.${id}__variant-selector`)) {
      closeDp();
    }
  });
};

export default clickHandler;
