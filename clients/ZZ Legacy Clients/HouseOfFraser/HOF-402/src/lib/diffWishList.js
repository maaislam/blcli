const diffWishList = (product, fireEvent) => {
  const wishListFunction = () => {
    const findEmpty = product.querySelector('.s-productthumbtext .emptyDiv');
    const findWishEl = product.querySelector('.s-productthumbtext .hotspotwishlist');
    const findQuick = product.querySelector('.s-productthumbtext .hotspotquickbuy');

    if (findWishEl) {
      findEmpty.remove();
      findWishEl.remove();
      findQuick.remove();
    }
    const whishQuickMiddle = `<div class='emptyDiv'></div>
      <div class="hotspotbuy hotspotwishlist wishListMiddle">
      <span class="WishIcon"></span>
      <span class="WishText">Wish list</span>
      </div>
      <div class="hotspotbuy hotspotquickbuy quickViewMiddle">
      <span class="QuickLookIcon"></span>
      <span class="QuickLookText">Quick view</span>
      </div>`;
    if (product.querySelector('.s-productthumbtext')) {
      product.querySelector('.s-producttext-price').insertAdjacentHTML('afterend', whishQuickMiddle);
    }
  };
  product.addEventListener('click', (e) => {
    if (e.target.parentNode == product.querySelector('.s-productthumbtext .hotspotquickbuy')) {
      product.querySelector('.productimage .hotspotbuy.hotspotquickbuy').click();
      fireEvent('user interacts with quick view');
    } else if (e.target.parentNode == product.querySelector('.s-productthumbtext .hotspotwishlist')) {
      product.querySelector('.productimage .hotspotbuy.hotspotwishlist').click();
      fireEvent('user interacts with wishlist');
    }
  });

  wishListFunction();
  function IsMobileView() {
    var $divMobileView = $('#divMobileView');
    return $divMobileView.length > 0 && $divMobileView.is(':visible');
  }

  if (IsMobileView() == true) {
    product.querySelector('.s-productthumbtext .emptyDiv').style.display = 'none';
  }
};

export default diffWishList;
