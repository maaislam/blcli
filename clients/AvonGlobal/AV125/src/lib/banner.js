const banner = (id, variation) => {
  const data = {
    title: 'SPECIAL OFFER',
    subTitle: 'Try before you buy with our curated sample pack',
    bannerProducts: [
      {
        productTitle: 'Splendoria sample 1.5ml',
        productImage: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1227294_2_613x613.jpg',
      },
      {
        productTitle: 'Beyond sample 0.5ml',
        productImage: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1223772_2_613x613.jpg',
      },
      {
        productTitle: 'Aurora sample 0.5ml',
        productImage: 'https://www.shopwithmyrep.co.uk//assets/en-gb/images/product/prod_1224086_2_613x613.jpg',
      },
    ],
    bannerStyles: {
      titleColor: '#ffffff',
      titleBackcolor: '#755eb6',
      backColor: '#ffffff',
    },
    bundleSku: '18664-212398426180,19244-212398427387,19550-212398428399',
  };
  const { title, subTitle, bundleSku, bannerStyles, bannerProducts } = window.bannerData || data;

  const productHtml = bannerProducts
    .map((data) => {
      const words = data.productTitle
        .split(' ')
        .map((item) => {
          return `<span>${item}</span>`;
        })
        .join('\n');
      return `
        <li>
            <span class="${id}__productImg">
                <img src="${data.productImage}" alt="${data.productTitle}">
            </span>
            <span class="${id}__productTitle">
                ${variation === '2' ? words : data.productTitle}
            </span>
        </li>
    `;
    })
    .join('\n');

  const htmlStr = `
    <div class="${id}__banner" style="background-color:${bannerStyles.backColor};">
        <div class="${id}__banner--col1">
            <div class="title" style="background-color:${bannerStyles.titleBackcolor}">
                ${title}
            </div>
            <div class="subtitle">${subTitle}</div>
        </div>
        <div class="${id}__banner--col2">
            <ul>
                ${productHtml}
            </ul>
        </div>
        <div class="${id}__banner--col3">
            <div class="${id}__productprice">
                +£1.00
            </div>
            <div class="${id}__pricedetail">
                <span class="productprice-mobile">+£1.00</span> 
                <span class="productdetail-mobile">(3 x 0.15ml Samples)</span>
                <span>(£0.35 per ml)</span>   
            </div>
            <div class="${id}__addtobag" data-sku="${bundleSku}">
                Add To Bag
            </div>
        </div>
    </div>`;

  return htmlStr;
};

export default banner;
