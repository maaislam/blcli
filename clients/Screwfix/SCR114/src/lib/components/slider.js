import { closeIcon } from '../assets/icons';

const slider = (id, data, cloneProductBadge, productName) => {
  const { mainImage, thumbnailImage } = data;
  const html = `
    <div class="${id}__mainSlider ${id}__gallery">
        <div class="${id}__overlay"></div>
         <div class="flickity-fullscreen-container" tabindex="0" role="dialog" aria-label='PRODUCT ZOOM ${productName}' aria-modal="false">
            
            <div class="carousel carousel-main main-carousel" data-flickity='{ "accessibility": false, "fullscreen": true, "lazyLoad": 1, "freeScroll": true, "wrapAround": true }'>
                ${mainImage
                  .map((item, index) => {
                    return `<div class="carousel-cell zoom-container" data-index="${index}">
                      <div class="image-wrapper" style="height: 100%">
                        <img src="${item.img}" alt="${item.alt}" loading="lazy" class="zoomable">
                      </div>
                    </div>`;
                  })
                  .join('\n')}
            </div>
            <div class="${id}__closeWrapper" role="button" tabindex="0" aria-label="Close modal">
                <span class="${id}__text">Close</span> 
                <span class="${id}__icon">
                    ${closeIcon}
                </span>
            </div>
            <p class="${id}__zoomButton">
              <span aria-label="product image zoom" role="button" tabindex="0">Tap to zoom</span>
            </p>
            
            <div class="carousel carousel-nav thumbnail-carousel"
                data-flickity='{ "asNavFor": ".carousel-main", "contain": true, "pageDots": false, "cellAlign": "left", "fullscreen": true, "lazyLoad": 1, "wrapAround": true }'>
                ${thumbnailImage
                  .map((item) => {
                    return `<div class="carousel-cell" aria-label="product image thumb" role="button" tabindex="0">
                        <img src="${item.img}" alt="${item.alt}" loading="lazy">
                    </div>`;
                  })
                  .join('\n')}
            </div>
        </div>
        ${cloneProductBadge ? cloneProductBadge.outerHTML : ''}
    </div>
  `;
  return html.trim();
};

export default slider;
