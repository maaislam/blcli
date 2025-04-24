import { formatNumber } from "../helpers/utils";
import { plusIcon, viewIcon } from '../assets/svg';

const resultCard = (id, data) => {
    const { actionURL, inStock, hasVariants, ppuVolume, pricePerUnit, referenceImageURL, offerName, regularPrice, model, promotionalText } = data;
    // console.log('API data: ', data);

    if (!inStock) return;

    const url = actionURL;
    const sku = model;
    const isOffer = promotionalText.length > 0;

    // let productUnitPrice = '';
    // const { UnitPrice, isOffer } = attributes;

    // if (UnitPrice) {
    //     const unitPriceStr = UnitPrice[0];
    //     const unitPriceFirstPart = unitPriceStr?.includes('|') ? unitPriceStr.split('|')[0] : unitPriceStr;
    //     const unitPriceSecondPart = unitPriceStr?.includes('|') ? unitPriceStr.split('|')[1] : unitPriceStr;
    //     productUnitPrice = unitPriceStr ? `${unitPriceFirstPart} | ${unitPriceSecondPart}` : '';
    // }

    const productUnitPrice = ppuVolume && pricePerUnit ? `${ppuVolume} | ${pricePerUnit}` : '';
    const productUnitText = productUnitPrice ? productUnitPrice?.replace('�', '') : '';

    const promotionalStr = promotionalText.length > 0 ? promotionalText[0] : ''
    const promotionalTextStr = promotionalStr.includes('�') ? promotionalStr?.replaceAll('�', '£') : promotionalStr;
    
    const htmlStr = `<a class="${id}__resultCard" href="${url}">
    ${isOffer ? `<div class='${id}__offer'>Offer</div>` : ''}
    <div class="${id}__prdImg">
            <img src="${referenceImageURL}" alt="" class="${id}__img">
        </div>
        <div class="${id}__content">
            <div class="${id}__title">${offerName}</div>
            <p class="${id}__description">${productUnitText}</p>
            <div class="${id}__priceMobile">
                ${hasVariants ? `From £${formatNumber(regularPrice)}` : `£${formatNumber(regularPrice)}`}
            </div>
            <div class="${id}__badge">
                <span class="${id}__badgeText">${promotionalTextStr}</span>
            </div>
        </div>
        <div class="${id}__action">
            <div class="${id}__price">
                ${hasVariants ? `From £${formatNumber(regularPrice)}` : `£${formatNumber(regularPrice)}`}
            </div>
            ${hasVariants ? `
                <button class="${id}__button" id="${id}__viewBtn" type="button" data-url='${actionURL}'>View Product</button>
                <button class="${id}__buttonMobile ${id}__hasvariantsMobile" id="${id}__viewBtn" data-url='${actionURL}' type="button" data-sku='${sku}'>
                    ${viewIcon}
                </button>
            ` : `
                <button class="${id}__button" type="button" id="${id}__atc" data-sku='${sku}'>Add</button>
                <button class="${id}__buttonMobile" id="${id}__atc" type="button" data-sku='${sku}'>
                    ${plusIcon}
                </button>
            `}
        </div>
    </a>
    `;

    return htmlStr;
};
export default resultCard;
