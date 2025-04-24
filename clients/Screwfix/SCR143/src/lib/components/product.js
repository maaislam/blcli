const product = (id, item) => {
  const { sku, url, title, price } = item;
  const convertH1ToH2 = (htmlString) => {
    return htmlString.replace(/<h1([^>]*)>/gi, '<h2$1>').replace(/<\/h1>/gi, '</h2>');
  };
  const html = `
    <div class="swiper-slide ${id}__productWrapper">
    <div class="${id}__productContainer">
        <a href="${url}"
           class="${id}__productLink" tabindex="0">
            <div class="${id}__imageWrapper">
                <img src="https://media.screwfix.com/is/image/ae235/${sku.toLocaleUpperCase()}_P?$fxSharpen$=&wid=257&hei=257&dpr=on"
                     alt="Product Image"
                     class="${id}__productImage" />
            </div>
            <div class="${id}__priceWrapper">
                <div class="${id}__productTitle">${convertH1ToH2(title)}</div>
                <div class="${id}__productFooter">
                    ${price}       
                </div> 
            </div>
                
        </a>
    </div>
</div>
  `;
  return html.trim();
};

export default product;
