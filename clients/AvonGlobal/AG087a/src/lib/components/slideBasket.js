import formatPrice from '../helpers/formatPrice';

const slideBasket = (id, variation, parentElm, data) => {
  document.querySelectorAll(`.${id}__slide-basket`)?.forEach((item) => {
    item.remove();
  });
  const isMobile = DY.deviceInfo.type !== 'desktop';
  const isPdp = !!document.querySelector('.v7__pdp__card_add_to_basket_success_overlay');
  const { title, imgSrc, quantity, oldPrice, newPrice, variantImage, variantName } = data;
  console.log('data', data);
  const getTotalPrice = (priceString, qty) => parseFloat(priceString.split('£')[1]) * parseInt(qty);
  const totalNewPrice = isPdp ? newPrice : formatPrice(getTotalPrice(newPrice, quantity));
  const totalOldPrice = oldPrice && formatPrice(getTotalPrice(oldPrice, quantity));

  console.log(totalNewPrice);
  console.log(totalOldPrice);

  const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.2258 0.419409C2.44122 -0.190641 1.30675 -0.135181 0.585786 0.585786C-0.195262 1.36684 -0.195262 2.63317 0.585786 3.41421L9.17157 12L0.585786 20.5858L0.419409 20.7742C-0.190641 21.5588 -0.135181 22.6932 0.585786 23.4142C1.36684 24.1953 2.63317 24.1953 3.41421 23.4142L12 14.8284L20.5858 23.4142L20.7742 23.5806C21.5588 24.1906 22.6932 24.1352 23.4142 23.4142C24.1953 22.6332 24.1953 21.3668 23.4142 20.5858L14.8284 12L23.4142 3.41421L23.5806 3.2258C24.1906 2.44122 24.1352 1.30675 23.4142 0.585786C22.6332 -0.195262 21.3668 -0.195262 20.5858 0.585786L12 9.17157L3.41421 0.585786L3.2258 0.419409Z" fill="#181818"/>
  </svg>`;

  const htmlStr = `<div class="${id}__slidebasket-overlay ${id}__tobe-removed">
  <div class="${id}__sidebasket-wrapper ${isMobile ? `${id}__mobile` : ''}">
        <span class="close-icon ${id}__close-icon">${closeIcon}</span>
        <div class="title">Added to Basket</div>
            <div class="product-detail">
                <div class="prod-img">
                    <img src="${imgSrc}"
                        alt="${title}">
                </div>
                <div class="prod-data">
                    <div class="name">${title}</div>
                    <div class="variant-block ${!variantImage ? `${id}__hide` : ''}">
                        <img src="${variantImage}" alt="${variantName}" />
                        <span>${variantName}</span>
                    </div>
                    <div class="quantity">Qty: <b>${quantity}</b></div>
                    <div class="price">
                        <span class="old-price ${oldPrice ? '' : `${id}__hide`}" style="margin-right:${
    oldPrice ? '10' : '0'
  }px">${totalOldPrice || ''}</span>
                        <span class="new-price">${totalNewPrice}</span>
                    </div>
                    
                </div>
            </div>
            ${variation == 2 ? `<div class="${id}__cartdetail-wrapper"></div>` : ''}
            <div class="button-group">
               ${variation != 2 ? `<div class="view-basket ${id}__slide-basket_btn ${id}__view-basket">VIEW BASKET</div>` : ''} 
                <div class="continue-shop ${id}__slide-basket_btn ${id}__continue-shop">CONTINUE SHOPPING</div>
            </div>
        </div>
    </div>`;

  const anchorElem = DY.deviceInfo.type !== 'desktop' ? document.getElementById('container') : parentElm;

  anchorElem.insertAdjacentHTML('beforebegin', htmlStr);
};
export default slideBasket;
