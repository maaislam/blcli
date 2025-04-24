const initMainForWishQuick = (product, fireEvent) => {
  const wishListFunction = () => {
    const findWishEl = product.querySelector('.product-rollup-container .hotspotwishlist');
    if (findWishEl) {
      findWishEl.remove();
    }

    const whishList = `<div class="hotspotbuy hotspotwishlist">
      <span class="WishIcon"></span>
      <span class="WishText">Wish list</span>
      </div>`;

    if (product.querySelector('.rollUpQuickBuyWrap .product-rollup-list')) {
      product.querySelector('.product-rollup-list').insertAdjacentHTML('beforebegin', whishList);
    }
  };

  const quickViewFunction = () => {
    const findQuickEl = product.querySelector('.product-rollup-container .hotspotquickbuy');
    if (findQuickEl) {
      findQuickEl.remove();
    }

    const quickView = `<div class="hotspotbuy hotspotquickbuy">
      <span class="QuickLookIcon"></span>
      <span class="QuickLookText">Quick view</span>
      </div>`;

    if (product.querySelector('.rollUpQuickBuyWrap .product-rollup-list')) {
      product.querySelector('.product-rollup-list').insertAdjacentHTML('beforebegin', quickView);
    }
  };
  wishListFunction();
  quickViewFunction();
  product.addEventListener('click', (e) => {
    if (e.target.parentNode == product.querySelector('.product-rollup-container .hotspotquickbuy')) {
      product.querySelector('.productimage .hotspotbuy.hotspotquickbuy').click();
      fireEvent('user interacts with quick view');
    } else if (e.target.parentNode == product.querySelector('.product-rollup-container .hotspotwishlist')) {
      product.querySelector('.productimage .hotspotbuy.hotspotwishlist').click();
      fireEvent('user interacts with wishlist');
    }
  });
};

export default initMainForWishQuick;
