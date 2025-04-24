/*eslint-disable no-useless-escape */
import { decrementIcon, incrementIcon } from '../assets/icons';

import { convertToSlug, formatPrice } from '../helpers/utils';
import { star } from './star';

export const product = (ID, data) => {
  const { name, retailPrice, tradePrice, code, averageRating, numberOfReviews, imageUrl, parentCategory } = data;

  const prodURL = `/${convertToSlug(parentCategory)}/${name}/p/${code}`;

  const html = `
    <div class="${ID}__tradeProdItem swiper-slide" data-sku="${code}">
        <a href="${prodURL}" class="content-wrapper">
            <div class="${ID}__image">
            <img src="${imageUrl}" alt="${name}"/>
            </div>
            <div class="${ID}__reviews">
                ${star(averageRating)}
                <div class="${ID}__ratingsContainer">
                    <span class="${ID}__ratings">${averageRating}</span>
                    <span class="${ID}__number">(${numberOfReviews} reviews)</span>
                </div>
            </div>
            <div class="${ID}__title">
                <p>${name}</p>
            </div>
            <div class="${ID}__originalPriceContainer">
                <span class="${ID}__originalPrice">${formatPrice(retailPrice)}</span>
                <span class="${ID}__originalPriceText">Original Price</span>
            </div>
            <div class="${ID}__tradePriceContainer">
                <span class="${ID}__tradePrice">${formatPrice(tradePrice)}</span>
                <span class="${ID}__tradePriceText">Trade Price</span>
            </div>
            
        </a>
        <div class="${ID}__counterContainer" style="display: none;">
                <div class="${ID}__decrement ${ID}__button ${ID}__quantity-minus">${decrementIcon}</div>
                <div><span class="${ID}__quantity-val">1</span> </div>
                <div class="${ID}__increment ${ID}__button ${ID}__quantity-plus">${incrementIcon}</div>
        </div>
        <div class="${ID}__atcContainer">
            <button class="${ID}__atc" style="background-color:#F9AE00EE;">
                <span>Login for trade price</span>
            </button>
        </div>
    </div>
  `;

  return html.trim();
};
