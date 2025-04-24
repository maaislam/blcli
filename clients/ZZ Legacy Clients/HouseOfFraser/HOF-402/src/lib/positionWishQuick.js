import middleWishQuick from './middleWishQuick';
import diffWishList from './diffWishList';
import initMainForWishQuick from './normalWishQuick';
const positionWishQuick = (fireEvent) => {
  document.querySelectorAll('#navlist li[li-productid]').forEach((productElem) => {
    const rollupQuickWrap = productElem.querySelector('.rollUpQuickBuyWrap');
    const rollUpMore = productElem.querySelector('div.product-rollup-more');
    let productList;
    if (productElem.querySelector('.product-rollup')) {
      productList = productElem.querySelector('.product-rollup').childElementCount;
    }
    if (rollupQuickWrap && rollUpMore && productList != 0) {
      rollupQuickWrap.classList.add('absoluteRollUp');
      productElem.querySelector('.product-rollup-container').classList.add('absoluteRollUpContainer');
      productElem.querySelector('.s-productthumbtext').classList.add('absoluteThumbText');
      initMainForWishQuick(productElem, fireEvent);
    } else if (rollupQuickWrap && !rollUpMore && productList != 0) {
      rollupQuickWrap.classList.add('absoluteRollUp');
      productElem.querySelector('.product-rollup-container').classList.add('absoluteRollUpContainer');
      productElem.querySelector('.s-productthumbtext').classList.add('absoluteThumbText');
      initMainForWishQuick(productElem, fireEvent);
    } else if (rollupQuickWrap && !rollUpMore && productList == 0) {
      productElem.querySelector('.product-rollup-container').classList.add('hiddenContainer');
      middleWishQuick(productElem, fireEvent);
    } else if (!rollupQuickWrap) {
      diffWishList(productElem, fireEvent);
    }
  });
};
export default positionWishQuick;
