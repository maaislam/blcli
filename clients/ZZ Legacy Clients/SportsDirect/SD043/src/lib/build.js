import settings from './shared';

const { ID } = settings; 

export const buildWidget = (data) => {
    if (!data) return;

    return `
        <div class="SD043-widget">
            <div id="dy-recommendations-${ID}">
            <div class="dy-recommendations__title-container">
            <p class="dy-recommendations__title">You May</p>
            </div>
            <div class="dy-recommendations__title-bar">  </div>
            <div class="dy-recommendations__slider-conatiner swiper-container">
            <div class="dy-recommendations__slider">
                <div class="dy-recommendations-slider-pagination"></div>
                <div class="dy-recommendations__slider-wrapper swiper-wrapper">
                
                ${data.map((prod) => {
                    return`<div class="dy-recommendation-product swiper-slide"  data-dy-sku="${prod.item.sku}">
                        <div class="dy-recommendation-product__image-container">
                        <div class="dy-recommendation-product__brand"><a class="dy-recomendation-product__brandlink" href="${prod.item.brand_url}">See more ${prod.item.brand}</a></div>
                        <a href="${prod.item.url}">
                        <img class="dy-recommendation-product__image" src="${prod.item.image_url}" /></a>
                        </div>
                
                        <a class="dy-recommendation-product__details" href="${prod.item.url}">
                        <p class="dy-recommendation-product__detail dy-recommendation-product__detail--brand">${prod.item.brand}</p>
                        <p class="dy-recommendation-product__detail dy-recommendation-product__detail--name">${prod.item.name}</p>
                        <p class="dy-recommendation-product__detail dy-recommendation-product__detail--price">${prod.item.price}</p>
                        </a>
                    </div>`;
                    
                }).join(' ')}
                
                </div>
            </div>
            
            <div class="dy-recommendations-slider-arrows">
                <div class="dy-recommendations-slider-button dy-recommendations-slider-button--prev">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 25" width="65" height="25"><defs><style>.cls-1{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:1.5px;}</style></defs><title>SD ArrowAsset 1</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="Layer_1-3" data-name="Layer 1"><line class="cls-1" y1="12.33" x2="59.3" y2="12.33"/><polyline class="cls-1" points="48.7 0.53 60.2 12.03 48.7 23.43"/></g></g></g></svg>
                </div>
                <div class="dy-recommendations-slider-button dy-recommendations-slider-button--next">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 25" width="65" height="25"><defs><style>.cls-1{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:1.5px;}</style></defs><title>SD ArrowAsset 1</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="Layer_1-3" data-name="Layer 1"><line class="cls-1" y1="12.33" x2="59.3" y2="12.33"/><polyline class="cls-1" points="48.7 0.53 60.2 12.03 48.7 23.43"/></g></g></g></svg>
                </div>
            </div>
            </div>
        </div>
        </div>
    `;
};