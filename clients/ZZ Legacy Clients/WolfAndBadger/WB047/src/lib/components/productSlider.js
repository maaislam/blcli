const renderprodSlider = (id, data, parentContainer, currency) => {
  console.log(currency);
  document.querySelectorAll(`.${id}__recommendations`).forEach((item) => {
    item?.closest(`.${id}__cart-recommendation-slider`).remove();
  });

  const recommendationCard = (info, index) => {
    const { productName, ProductUrl, brandName, productId, image } = info.staticData;
    const salePrice = info.item.allPrices[currency.country][currency.currencyData.code].salePrice;
    const currencySymbol = currency.currencyData.symbol;
    const newProductPath = '/' + currency.currencyData.region + ProductUrl;

    const card = `
    <div class="${id}__recommendations--card flex flex-col swiper-slide ${
      index === 15 ? `${id}__hide-desktop` : ''
    }" data-id="${productId}">
        <a href="${newProductPath}" class="image" style="background-image:url(${image})">
        </a>
        <a href="${newProductPath}" class="title hover:underline">${productName}</a> 
         <div class="brand text-sm text-gray-500">${brandName}</div>
        <a href="${newProductPath}"class=" price font-sans hover:underline">${currencySymbol + salePrice}</a> 
    </div>  
    `;
    return card;
  };

  const htmlStr = `
    
    <div class="${id}__cart-recommendation-slider swiper py-6 relative border-t border-gray-300 overflow-x-hidden">

    <h2 class="${id}__headline inline-block mb-6 tracking-wider text-center bg-white lg:text-left lg:sticky z-40">LAST MINUTE ADDITIONS</h2>

    <div class="${id}__recommendations swiper-wrapper ">
        ${data.map((item, index) => recommendationCard(item, index)).join('\n')}
    </div>
   
    <div class="${id}__swiper-button-prev">
        <svg width="14" class="transform rotate-180" _css3="" viewBox="0 0 18.071 14.142"><path d="M15.071 7.071L9.5 1.5 11 0l7.071 7.071L11 14.142l-1.5-1.5z"></path><path d="M16 6.071H0v2h16z"></path></svg>
    </div>
    <div class="${id}__swiper-button-next">
        <svg width="14" _css4=""  viewBox="0 0 18.071 14.142"><path d="M15.071 7.071L9.5 1.5 11 0l7.071 7.071L11 14.142l-1.5-1.5z"></path><path d="M16 6.071H0v2h16z"></path></svg>
    </div>

    </div> 
    `;

  parentContainer?.insertAdjacentHTML('afterend', htmlStr);
};

export default renderprodSlider;
