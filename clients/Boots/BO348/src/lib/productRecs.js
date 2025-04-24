import shared from '../../../../../core-files/shared';
const { ID } = shared;

// const starSVG = `
// <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
//   <path d="M7.14282 0.702083L9.25255 4.92154L9.31113 5.0387L9.4408 5.05722L13.6272 5.65528L10.6285 8.80399L10.5327 8.90449L10.5674 9.03887L11.7683 13.6924L7.24854 11.5832L7.14282 11.5338L7.0371 11.5832L2.51731 13.6924L3.71822 9.03887L3.7529 8.90449L3.65719 8.80399L0.658423 5.65528L4.84484 5.05722L4.97452 5.0387L5.0331 4.92154L7.14282 0.702083Z" fill="#FFCC00" stroke="#767676" stroke-width="0.5"/>
// </svg>`;

// const emptyStarSVG = `
// <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
//   <path d="M7.14282 0.702083L9.25255 4.92154L9.31113 5.0387L9.4408 5.05722L13.6272 5.65528L10.6285 8.80399L10.5327 8.90449L10.5674 9.03887L11.7683 13.6924L7.24854 11.5832L7.14282 11.5338L7.0371 11.5832L2.51731 13.6924L3.71822 9.03887L3.7529 8.90449L3.65719 8.80399L0.658423 5.65528L4.84484 5.05722L4.97452 5.0387L5.0331 4.92154L7.14282 0.702083Z" fill="#E6E6ED" stroke="#767676" stroke-width="0.5"/>
// </svg>`;

// const formatNumberWithCommas = (number) => {
//   if (!number) return '';
//   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// };

const productRecs = (product) => {
  const productData = product;
  //console.log('🚀 ~ productRecs ~ productData:', productData);
  const isDesktop = window.outerWidth >= 992;

  const productCard = () => {
    let r_string = '';

    productData.forEach((product) => {
      const isOffer = product?.promotionalText?.length > 0;
      const inStock = product.inStock;
      //const reviewsCount = formatNumberWithCommas(product.numberOfReviews);
      const ctaBtn =
        product.variants && product.variants.length > 0
          ? `<a href="${product.actionURL}" class="${ID}-personalised--product--add ${ID}-primary " data-model="${product.model}" data-name="${product.offerName}" data-object="${product.model}">VIEW PRODUCT</a>`
          : `<a class="${ID}-personalised--product--add ${ID}-primary ${ID}-atb" data-model="${product.model}" data-name="${product.offerName}" data-object="${product.model}">ADD TO BAG</a>`;
      if (!inStock) {
        return;
      }
      let currPrice = parseFloat(product.currentPrice);
      let wasPrice = parseFloat(product.regularPrice);
      let volume = product.ppuVolume;
      let pricePerUnit = product.pricePerUnit;
      pricePerUnit = pricePerUnit.replaceAll('�', '£');
      let productName = product.offerName;
      productName = productName.replaceAll('�', '');
      // "�"
      currPrice = currPrice.toFixed(2);
      wasPrice = wasPrice.toFixed(2);
      let wasPriceDisplayed = false;
      if (wasPrice !== currPrice) {
        wasPriceDisplayed = true;
      }
      const saving = wasPrice - currPrice;

      // Floor value of rating
      const rating = product.roundedReviewScore;

      const reviewUrl = `${product.actionURL}#criteoSpContainer`;

      r_string += `<div target="_blank" class="${ID}-personalised--product swiper-slide">
        <div class="${ID}-personalised--product--image">
          <a class='${ID}-personalised--product--link' href="${product.actionURL}">
            ${
              isOffer
                ? `<div class="${ID}-roundel_section">
              <span class="${ID}-offer_notify">Offer</span>		
            </div>`
                : ''
            }
            <img src="${product.referenceImageURL}" alt="${productName} image" />
          </a>
        </div>
        <div class="${ID}-personalised--product--content">
          <h4>${productName}</h4>
          <a href="${reviewUrl}" class="${ID}-personalised--product--rating" data-rating="${rating}">
            <div data-bv-show="inline_rating" data-bv-product-id="${product.parentProduct}"></div>  
          </a>
          <div ${wasPriceDisplayed ? ` class="${ID}-price-saving ${ID}-priceContainer"` : `class="${ID}-priceContainer"`}>
            £${currPrice} 
            ${wasPriceDisplayed ? `<span class="${ID}-saving-calc">Save £${saving.toFixed(2)}</span>` : ``}
            ${wasPriceDisplayed ? `<span class="${ID}-wasprice-mobile">(Was £${wasPrice})</span>` : ``}
          </div>
          ${wasPriceDisplayed ? `<span class="${ID}-wasprice">(Was £${wasPrice})</span>` : ``}
        
          ${volume ? `<p class="${ID}-volume">${volume} | ${pricePerUnit}</p> ` : `<p class="${ID}-empty"></p>`}
            ${ctaBtn}
        </div>
      </div>`;
    });

    return r_string;
  };

  const htmlStr = `
  <div class="${ID}-product-recs-container">
      <div class="${ID}-product-recs-swiper ${ID}-swiper" id="${ID}-swiper">
        <div class="${ID}-product-wrapper swiper-wrapper">
            ${productCard()} 
        </div>
      ${isDesktop ? `<div class="${ID}-product-recs-swiper-scrollbar swiper-scrollbar"></div>` : ''}  
      </div>
      ${isDesktop ? `<div class="${ID}-product-recs-swiper-button-prev swiper-button-prev ${ID}-carousel--arrow"></div>` : ''}
      ${isDesktop ? `<div class="${ID}-product-recs-swiper-button-next swiper-button-next ${ID}-carousel--arrow"></div>` : ''}
  </div>
`;

  return htmlStr.trim();
};

export default productRecs;
