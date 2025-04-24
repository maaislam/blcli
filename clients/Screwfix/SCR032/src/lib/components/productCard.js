import { closeIconRounded } from '../assets/svg';
import close from './close';

const productCard = (id, data) => {
  const { detailPageUrl, longDescription, imageUrl, skuId } = data;
  const htmlStr = `<div class="${id}__productCard swiper-slide">
        <div class="${id}__cardclose-container" data-sku="${skuId}">${close(id, closeIconRounded, '', `${id}__cardClose`)}</div>
        <div class="${id}__cardcontent-container">
          <a href ="${detailPageUrl}" class="${id}__productCard-image">
            <img src="${imageUrl}" alt="${longDescription}" />
          </a>
          <a href="${detailPageUrl}" class="${id}__productCard-info">
              <div class="${id}__productCard-info-name">${longDescription}</div>
              <div class="${id}__productCard-info-sku">(${skuId})</div>
          </a>
        </div>
    </div>`;
  return htmlStr;
};
export default productCard;
