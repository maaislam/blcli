const slide = (id, item) => {
  return `
          <div class="swiper-slide ${id}-upsell-slide">
            <a href="${item.url}" class='${id}__productDetails' target="_blank">
              <div class="${id}_product-image">
                <img src="${item.image}" alt="${item.title}" />
              </div>
              <div class="${id}_product-title">${item.title}</div>
            </a>
            <div class="${id}_product-price">${item.price}</div>
            <div class="NE-761_quantity-selector">
              <div class="NE-761_decrease NE-761_quantity-btn">
                <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2H0V0H10V2Z" fill="black"/>
                </svg>
              </div>
              <div class="NE-761_quantity">1</div>
              <div class="NE-761_increase NE-761_quantity-btn">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99976 5.71429H5.71404V10H4.28547V5.71429H-0.000244141V4.28571H4.28547V0H5.71404V4.28571H9.99976V5.71429Z" fill="black"/>
                </svg>
              </div>
            </div>
            <form method="post" action="/cart/add" id="product_form_${item.productId}" accept-charset="UTF-8" class="installment"
              enctype="multipart/form-data" data-cart-submit=""><input type="hidden" name="form_type" value="product"><input
                type="hidden" name="utf8" value="✓">
              <div class="field selector-wrapper no-js">
                <div class="select is-fullwidth">
                  <select name="id" data-product-select="" aria-label="Select No Javascript Fallback">
                    <option selected="selected" value="${item.variantId}">
                      Full
                    </option>
                  </select>
                </div>
              </div>
              <div class="product__actions-container">
                <label for="Quantity" class="label is-hidden">Quantity</label>
                <span class="select product__quantity" hidden>
                  <select id="Quantity" class="input quantity-num is-radiusless is-shadowless has-text-centered"
                    data-quantity-num="" name="quantity" value="1" min="1" title="Quantity Select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </span>
                <button type="submit" name="add"
                  class="${id}__addToBag product__add-to-cart button is-black is-uppercase is-lspaced-wide has-text-weight-semibold is-fullwidth is-size-9"
                  data-add-to-cart="">
                  <span data-add-to-cart-text="">Add to Bag
                  </span>
                </button>
              </div>
              <input type="hidden" name="product-id" value="${item.productId}">
              <input type="hidden" name="section-id" value="template--14597278761062__main">
            </form>
          </div>
        `;
}

export default slide;