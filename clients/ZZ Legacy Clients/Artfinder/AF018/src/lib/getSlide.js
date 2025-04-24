import shared from '../../../../../core-files/shared';
import getLocale from '../../../utils/getLocale';
const { ID, VARIATION } = shared;
import getProductCurrencyRatio from './getProductCurrencyRatio';

const getNewTag = () => {
    return `
    <div class="af-place place-right place-top">
        <label class="${ID}-label">
            <span class="${ID}-label__inner">New</span>
        </label>
    </div>`;
};

const getSlide = (item) => {
    const price = item.product.display_price / 100;
    const productCurrencyRatio = getProductCurrencyRatio(item);
    const currencyPrice = price / productCurrencyRatio;
    const formattedPrice = new Intl.NumberFormat(getLocale(), {
        style: 'currency',
        currency: window.AF?.analyticsData?.currency || 'GBP',
    }).format(currencyPrice);

    const newHTML = item.product.is_new ? getNewTag() : '';
    // Product slug is everything after the '/product/' in URL
    const productSlug = item.product.url.split('/product/')[1];
    return `
    <div class="af-column slide" data-item-id="${item.product._id.original_id}">
        <div class="af-place-container pad pad-xs" show_favourite="true ">
            <div class="af-card af-card-item-variant af-show-element-on-hover af-card-product-variant af-overflow ${ID}-card">
                <div class="af-place-container">
                    ${newHTML}
                    <div class="af-relative af-overflow-hidden ${ID}-card__media" style="padding-top: 86.86%; background-color: rgb(114, 158, 147);">
                        <img src="${item.product.photo}" class="small-12 af-place place-top" style="opacity: 1;">
                    </div>
                </div> 
                <div class="af-card-padding af-white-bg clearfix af-relative ${ID}-card__content">
                    <div class="medium-9 large-10">
                        <p class="af-truncate-text margin margin-xxs">
                            ${item.product.title}
                        </p>
                        <span class="af-bold">${formattedPrice}</span>
                    </div>
                </div>
                <a href="${window.innerWidth >= 768 ? '#/quick-view/' : '/product/'}${productSlug}" class="af-place fit-in" title="${item.product.title} by ${item.product.artist_name}" style="z-index: 0;" tabindex="0"></a>
            </div>
        </div>
    </div>`;
};

export default getSlide;
