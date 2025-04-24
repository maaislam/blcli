const basketRollover = `
<div id="rollover_cart_popup" class="cart_popup" style="display: none">
  <div class="title">
    <img src="/_ui/desktop/theme-protec/images/basketPageCartImg.png" alt="Your Shopping Basket" title="Your Shopping Basket" class="">
    <h3>Your Quote Basket</h3>
    <a href="#" class="close" id="ajax_cart_close" title="Close" alt="Close"></a>
  </div>
  <div class="entries">
    <div class="cart_modal_popup empty-popup-cart">Empty Basket</div>
  </div>
  <div class="prod_cart-total">
    <div class="links">
    <a href="/cart" class="neutral large autodisable">&lt;&lt; View basket</a>
    <a href="/cart" class="positive large autodisable">Checkout &gt;&gt;</a>
  </div>
</div>
`;

const newBasketItem = `
  <div class="GDXXX_recently-added cart_popup">
    <div class="title">
      <img src="/_ui/desktop/theme-protec/images/basketPageCartImg.png" alt="Add to basket" title="Add to basket" class=""><h3> Added to Your Quote Basket</h3>
      <a class="close" id="add_to_cart_close"></a>
    </div>
    <div class="cart_modal_popup">
      <div class="prod_image">
      </div>
      <div class="prod_info">
        <p class="prod_name"></p>
        <p class="prod_options">
          <span class="prod_size"></span>
        </p>
        <p class="prod_quantity"></p>
      </div>
    </div>
    <div class="links">
      <a href="/cart" class="neutral large autodisable">
        &lt;&lt; View basket</a>
      <a href="/cart" class="positive large autodisable">
        Checkout &gt;&gt;</a>
    </div>
  </div>
`;

const basket = `
  <div id="cart_header">
    <div id="cart_content">
      <h2><a href="/cart">My Quote Basket</a></h2>
      <img src="/_ui/desktop/theme-protec/images/topCartImg.png" alt="My Basket" title="My Basket" class=""><dl id="minicart_data">
        <dt>
          Items: <span class="GDXXX_basket-quan items">0</span></dt>
      </dl>
    </div>
  </div>
`;

export { basket, basketRollover, newBasketItem };
