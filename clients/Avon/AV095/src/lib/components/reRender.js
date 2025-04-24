import fetchCart from './getCart';
import renderTopRow from './topRow';
import updateDiscountBlock from './discountBlock';
import { resetLoader } from './renderLoader';

const reRenderDOM = async () => {
  const cart = await fetchCart();
  if (cart) {
    renderTopRow('AV095', cart);
    updateDiscountBlock(cart);
    resetLoader();
    renderAddedToCartRing(cart);
    renderBtnText(cart);
  }
};

const renderBtnText = (cart) => {
  const cartNormals = cart.items.filter(
    (item) => item['product_has_only_default_variant'] && item.title.split(' ').includes('Sample')
  );

  cartNormals.forEach((item) => {
    const idInCart = item.id;

    const itemInPage = document.querySelectorAll(`[data-var-id="${idInCart}"]`);

    itemInPage.forEach((item) => {
      item.innerHTML = 'Sample Added';
      item.classList.add('AV095__addedtobasket--btn');
    });
  });
};

const renderAddedToCartRing = (cart) => {
  document.querySelectorAll('.var-option__color').forEach((elem) => {
    elem.classList.remove('AV095__added-ring');
  });

  const cartVariants = cart.items.filter(
    (item) => !item['product_has_only_default_variant'] && item.title.split(' ').includes('Sample')
  );

  cartVariants.forEach((item) => {
    const idInCart = item.id;

    const itemInPage = document.querySelectorAll(`[data-var-id="${idInCart}"]`);
    itemInPage.forEach((item) => {
      item.querySelectorAll('.var-option__color').forEach((item) => {
        item.classList.add('AV095__added-ring');
      });
    });
  });
};

export default reRenderDOM;
