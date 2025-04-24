import { addToCart } from '../helpers/addToBasket';

const addToCartHandler = (id, target) => {
  if (target.closest(`.${id}__addtocart-block`)) {
    const atcBtn = target.closest(`.${id}__addtocart-block`);
    const sku = atcBtn.dataset.sku;
    //console.log('🚀 ~ file: experiment.js:45 ~ document.body.addEventListener ~ sku:', sku);
    const quantity = atcBtn.dataset.quantity || '1';
    if (sku) {
      const atcBtnContent = atcBtn.innerHTML;
      //console.log('atcBtnContent:', atcBtnContent);
      atcBtn.innerText = 'Adding...';

      addToCart(sku, quantity).then((res) => {
        console.log(res);
        if (!res.ErrorId) {
          atcBtn.innerText = 'Added';
          setTimeout(() => {
            atcBtn.innerHTML = atcBtnContent;
          }, 1000);
          //fireEvent('Add To Cart');
        }
      });
    }
  }
};

export default addToCartHandler;
