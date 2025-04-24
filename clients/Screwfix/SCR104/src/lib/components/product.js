const product = (id, item) => {
  const { sku, url, title, price, review } = item;
  const html = `
    <div class="swiper-slide ${id}__productWrapper">
    <div class="${id}__productContainer">
        <a href="${url}"
           class="${id}__productLink">
            <div class="${id}__imageWrapper">
                <img src="https://media.screwfix.com/is/image/ae235/${sku.toLocaleUpperCase()}_P?$fxSharpen$=&wid=257&hei=257&dpr=on"
                     alt="Product Image"
                     class="${id}__productImage" />
            </div>
            <div class="${id}__infos">
                <div class="${id}__productTitle">${title.outerHTML}</div>
                <div class="${id}__additionalInfo">
                    <div class="${id}__sku">(${sku.toLocaleUpperCase()})</div>
                    ${review.outerHTML}
                </div>
                <div class="${id}__productFooter">
                    ${price.outerHTML} 
                </div> 
            </div>          
        </a>
    </div>
</div>
  `;
  return html.trim();
};

export default product;
