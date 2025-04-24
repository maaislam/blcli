const product = (id, item) => {
  const { sku, title, productImage, RatingsNumber, sellPrice, comparePrice, save, productUrl } = item;
  const html = `
    <div class="swiper-slide ${id}__productWrapper">
    <div class="${id}__productContainer">
        <a href="${productUrl}"
           class="${id}__productLink">
            <div class="${id}__imageWrapper">
                <img src="${productImage}"
                     alt="Product Image"
                     class="${id}__productImage" />
            </div>
            <div class="${id}__additionalInfo">
                <div class="${id}__sku">(${sku})</div>
                <div class="${id}__ratings">
                    <span class="${id}__icon"></span>
                    <span class="${id}__reviewNumber">(${RatingsNumber})</span>
                </div>
            </div>
            <div class="${id}__productTitle">${title}</div>

            <div class="${id}__productPriceWrapper">  
                    <div data-qaid="productCard-save-price"
                         class="${id}__savePrice">
                        <span aria-hidden="true">-</span>
                        ${save}
                    </div>

                    <div class="${id}__priceContainer">
                        <span data-qaid="price" class="${id}__price">
                        ${sellPrice}
                        <span data-qaid="vat-status"
                            class="${id}__vatStatus">Inc Vat</span>
                        </span>
                        <div data-qaid="productCard-was-price"
                            class="${id}__comparePrice"> 
                                ${comparePrice}
                        </div> 
                    </div>         
            </div>
            <button type="button"
                    class="${id}__button">shop</button>

        </a>
    </div>
</div>
  `;
  return html.trim();
};

export default product;
