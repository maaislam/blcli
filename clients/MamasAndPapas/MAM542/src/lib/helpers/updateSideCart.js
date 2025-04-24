const updateSideCart = () => {
  const url = '/cart?view=json&_dc=' + btoa(Date.now() + Math.random());

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then(function (cartData) {
      console.log(cartData);

      window.OsGlobals.cartFull = cartData;

      // Update cart total count
      document.querySelector('[data-cart-quantity]').innerHTML = cartData.cart.item_count;

      if (!document.body.classList.contains('template-cart')) {
        //Clear cart container
        document.querySelector('[data-cart-itemlist]').innerHTML = '';

        //render the cart
        window.mpRenderCartHtml(cartData);

        //Update any discount rules
        window.mpUpdateCartDiscountRule(cartData);
      }

      //Update cart's footer
      window.mpUpdateCartFooter(cartData);

      //Verify cartId is correctly set
      window.checkCartId(cartData);
    })
    .catch(function (error) {
      console.error('Error fetching cart data:', error);
    });
};

export default updateSideCart;
