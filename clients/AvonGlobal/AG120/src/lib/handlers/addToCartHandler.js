import { addToCart } from '../helpers/addToBasket';

const addToCartHandler = (id, target) => {
  if (target.closest(`.${id}__addtocart-block`)) {
    const atcBtn = target.closest(`.${id}__addtocart-block`);
    const sku = atcBtn.dataset.sku;
    const quantity = atcBtn.dataset.quantity || '1';
    if (sku) {
      const atcBtnContent = atcBtn.innerHTML;
      //console.log('atcBtnContent:', atcBtnContent);
      atcBtn.innerText = 'Dodawanie...';

      addToCart(sku, quantity).then((res) => {
        if (!res.ErrorId) {
          atcBtn.innerText = 'Dodany';
          setTimeout(() => {
            atcBtn.innerHTML = atcBtnContent;
            window.location.reload();
          }, 1000);
          //fireEvent('Add To Cart');
        }
      });
    }
  }
};

export default addToCartHandler;
