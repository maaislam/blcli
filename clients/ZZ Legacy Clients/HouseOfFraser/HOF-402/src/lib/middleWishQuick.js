const middleWishQuick = (product, fireEvent) => {
  const wishListFunction = () => {
    const findWishEl = product.querySelector('.product-rollup-container .hotspotwishlist');
    if (findWishEl) {
      findWishEl.remove();
    }
    const whishListMiddle = `<div class="hotspotbuy hotspotwishlist wishMiddle">
      <span class="WishIcon"></span>
      <span class="WishText">Wish list</span>
      </div>`;
    if (product.querySelector('.rollUpQuickBuyWrap .product-rollup-list')) {
      product.querySelector('.product-rollup-list').insertAdjacentHTML('beforebegin', whishListMiddle);
    }
  };

  const quickViewFunction = () => {
    const findQuickEl = product.querySelector('.product-rollup-container .hotspotquickbuy');
    if (findQuickEl) {
      findQuickEl.remove();
    }

    const quickViewMiddle = `<div class="hotspotbuy hotspotquickbuy quickMiddle">
      <span class="QuickLookIcon"></span>
      <span class="QuickLookText">Quick view</span>
      </div>`;

    if (product.querySelector('.rollUpQuickBuyWrap .product-rollup-list')) {
      product.querySelector('.product-rollup-list').insertAdjacentHTML('beforebegin', quickViewMiddle);
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

export default middleWishQuick;
