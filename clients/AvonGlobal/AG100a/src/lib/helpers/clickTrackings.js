const initClickTrackings = (id, fireEvent) => {
  document.body.addEventListener('click', (event) => {
    const target = event.target;
    const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
    const isBasketOpen = window.location.href.indexOf('basket') !== -1;
    if (!isBasketOpen) return;

    if (targetMatched('.page_product_slide') && target.closest('.swiper-slide').querySelector(`.${id}__cartbtn--container`)) {
      fireEvent('user clicks on a product with add to cart button');
    } else if (
      targetMatched('.page_product_slide') &&
      !target.closest('.swiper-slide').querySelector(`.${id}__cartbtn--container`)
    ) {
      fireEvent('user clicks on a product without add to cart button');
    } else if (
      !targetMatched('.swiper-button-disabled') &&
      (targetMatched('.swiper-button-next') || targetMatched('.swiper-button-prev'))
    ) {
      //fireEvent('user scrolls on the product carousel');
    } else if (targetMatched('.btn_add')) {
      fireEvent('user adds a DY recommended product to their basket');
    }
  });
};
export default initClickTrackings;
