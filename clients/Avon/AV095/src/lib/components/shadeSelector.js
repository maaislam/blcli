import { fireEvent } from '../../../../../../core-files/services';

import { fetchSample, fetchSingleSample } from './getSample';
import reRenderDOM from './reRender';
import updateBasket from './updateBasket';

const renderShadeSelector = () => {
  //fetch samples

  fetchSample().then((response) => {
    callback(response.products);
    reRenderDOM();
  });
};

const callback = (samplesArr) => {
  const sampleList = document.querySelectorAll('.AV095__collection-main>.collection-listing>.product-listing');

  sampleList.forEach((item, index) => {
    const idFromPage = item.querySelector('[data-product-id]').getAttribute('data-product-id');

    const itemDetail = samplesArr.filter((sample) => sample.id == idFromPage)[0];

    if (itemDetail?.variants.length > 1) {
      item.insertAdjacentHTML('beforeend', renderVariantOption(itemDetail, index, sampleList.length));
    } else if (itemDetail?.variants.length === 1) {
      item.insertAdjacentHTML('beforeend', renderAddSampleBtn(itemDetail, item.getAttribute('data-product-id')));
    } else if (!itemDetail) {
      const itemHandle = item.querySelector('.product-title>a').getAttribute('href').split(' ').join('-');

      fetchSingleSample(itemHandle).then((res) => {
        if (res.product.variants.length > 1) {
          item.insertAdjacentHTML('beforeend', renderVariantOption(res.product, index, sampleList.length));
        } else {
          item.insertAdjacentHTML('beforeend', renderAddSampleBtn(res.product, item.getAttribute('data-product-id')));
        }
      });
    }
  });
  //attach events
  //document.querySelectorAll('.AV095__var-selectbar__title--container').forEach((item) => {
  document.body.addEventListener('click', (e) => {
    const parentElm = e.target.closest('.AV095__var-selectbar');

    fireEvent('Customer clicked to expand shades');
    document.querySelectorAll('.AV095__var-options').forEach((item) => {
      if (!parentElm?.contains(item)) {
        item.classList.add('AV095-hide');
        item.closest('.AV095__var-selectbar').querySelector('.plus-btn').classList.remove('AV095-hide');
        item.closest('.AV095__var-selectbar').querySelector('.minus-btn').classList.add('AV095-hide');
      }
    });
    const itemsToToggle = ['plus-btn', 'minus-btn', 'AV095__var-options'];
    itemsToToggle.forEach((item) => {
      parentElm?.querySelector(`.${item}`).classList.toggle('AV095-hide');
    });
  });
  //  });

  //event handler for add del

  document.body.addEventListener('click', (e) => {
    const clickedItem = e.target;

    if (
      (clickedItem.classList.contains('var-option__title') ||
        clickedItem.classList.contains('var-option__color') ||
        clickedItem.classList.contains('AV095__normal-prod')) &&
      !clickedItem.classList.contains('no-stock') &&
      !clickedItem.classList.contains('no-stock__normal')
    ) {
      fireEvent('Customer clicks to add a shade to basket');
      const clikedItemParent = clickedItem.closest('.var-option') || clickedItem;
      const id = clikedItemParent.getAttribute('data-var-id');
      const quantity = 1;
      const data = {
        id,
        quantity,
      };
      // if (clikedItemParent.classList.contains('var-option')) {
      // }
      const selectionType = clikedItemParent.classList.contains('var-option') ? 'variant' : 'normal';

      updateBasket(data, selectionType, clikedItemParent);
    }
  });
};

const renderAddSampleBtn = (itemDetail, idFromPage) => {
  const stockInfoContainer = document
    .querySelector(`[data-product-id="${idFromPage}"]`)
    .querySelector('.product-quantity-container-stock');

  const inStock = stockInfoContainer.classList.contains('hide') ? true : false;

  if (inStock) {
    return ` <div class="btn btn-primary AV095__normal-prod" data-var-id="${
      itemDetail ? itemDetail.variants[0].id : idFromPage
    }" >Add Sample</div>`;
  } else {
    return ` <div class="btn btn-primary AV095__normal-prod no-stock__normal" ><a href="/products/${itemDetail?.handle}">Get Notified</a> </div>`;
  }
};

const renderVariantOption = (itemDetail, index, arrLength) => {
  const { variants } = itemDetail;

  const varHtml = (variant) => {
    if (variant.available) {
      return `
        <div class="var-option" data-var-id="${variant.id}" data-var-available="${variant.available}">
            <div class="var-option__color" style="background-image: url(${variant['featured_image'].src});"></div>
            <div class="var-option__title">${variant.title}</div>
        </div>`;
    } else {
      return `
      <div class="var-option" data-var-id="${variant.id}" data-var-available="${variant.available}">
        <div class="var-option__color no-stock" style="background-color: #C1C1C1;"></div>
        <div class="var-option__title">${variant.title}</div>
      </div>
      `;
    }
  };
  const content = `
    <div class="AV095__var-selectbar AV095__var-selectbar--${index}" style="z-index:${arrLength - (index + 1)}">
        <div class="AV095__var-selectbar__title--container">
            <div class="title">Add Shades</div>
            <div class="plus-btn">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.99986 0.859863C8.51384 0.859863 8.11986 1.25386 8.11986 1.73986V8.11989H1.73986C1.25386 8.11989 0.859863 8.51387 0.859863 8.99989C0.859863 9.48591 1.25386 9.87989 1.73986 9.87989H8.11986V16.2599C8.11986 16.7459 8.51384 17.1399 8.99986 17.1399C9.48589 17.1399 9.87986 16.7459 9.87986 16.2599V9.87989H16.2599C16.7459 9.87989 17.1399 9.48591 17.1399 8.99989C17.1399 8.51387 16.7459 8.11989 16.2599 8.11989H9.87986V1.73986C9.87986 1.25386 9.48589 0.859863 8.99986 0.859863Z" fill="black"/>
                </svg>            
            </div>
            <div class="minus-btn AV095-hide">
                <svg width="16" height="3" viewBox="0 0 16 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1="1.72308" x2="15" y2="1.72308" stroke="black" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
        </div>
        <div class="AV095__var-options AV095-hide">
            ${variants.map((variant) => varHtml(variant)).join('\n')}
        </div>
    </div>
    `;

  return content;
};

export default renderShadeSelector;
