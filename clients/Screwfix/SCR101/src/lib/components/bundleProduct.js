import isIncludingVat from "../helpers/isIncludingVat";

const bundleProduct = (isFree = false) => {
  const mainProdTitle = window.utag.data.prodName[0];
  const mainProdPriceIncVat = window.utag.data.prodPriceIncVat[0];
  const mainProdPriceExVat = window.utag.data.prodPrice[0];
  const mainProdEan = window.utag.data.prodEan[0];
  const mainProdImg = `https://media.screwfix.com/is/image/ae235/${mainProdEan}_P?$fxSharpen$=&wid=257&hei=257&dpr=on`;

  const freeProdTitle = 'Flomasta White / Chrome Angled Thermostatic Radiator Valve & Lockshield 15mm x M30" <span class="free-prd-title-code">(602HN)</span>';
  const freeProdPriceIncVat = '20.00';
  const freeProdPriceExVat = '16.67'; 
  const freeProdImg = 'https://media.screwfix.com/is/image/ae235/602HN_P?$fxSharpen$=&wid=257&hei=257&dpr=on';

  const prodTitle = isFree ? freeProdTitle : mainProdTitle;
  const prodPriceIncVat = isFree ? freeProdPriceIncVat : mainProdPriceIncVat;
  const prodPriceExVat = isFree ? freeProdPriceExVat : mainProdPriceExVat;
  const prodImg = isFree ? freeProdImg : mainProdImg;

  const prodPrice = isIncludingVat() ? prodPriceIncVat : prodPriceExVat;
 
  const priceParts = prodPrice.split('.');

  const htmlStr = `
    <div class='bundle-product-image'>
        <img src='${prodImg}'  alt='${prodTitle}' />
    </div>
    <div class='bundle-product-details'>
        <p class='product-title'>${prodTitle}</p>
        <div class="bundle-product-price">
        ${
          isFree
            ? `<span class="free-text">FREE</span>
            <span class="price-text">was £${prodPrice}</span>
            `
            : `<span class="currency-symbol">£</span>
            <span class="current-price">${priceParts[0]}</span>
            <span class="price-decimal">.<!-- -->${priceParts[1]}</span>
            <span class="bundle-product-vat">Inc Vat</span>`
        }
        </div>
    </div>`;

  return htmlStr;
};

export default bundleProduct;
