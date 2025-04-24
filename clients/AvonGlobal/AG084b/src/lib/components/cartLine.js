import formatPrice from '../helpers/formatPrice';

const renderCartLine = (id, basketProducts) => {
  const header = {
    images: [],
    sku: 1234,
    variations: [
      {
        product: '${basket-header-PRODUCT}',
        quantity: '${basket-header-QUANTITY}',
        unitPrice: '${basket-header-PRICE/UNIT}',
        totalPrice: '${basket-header-TOTAL PRICE}',
        sku: 1234,
      },
    ],
  };
  basketProducts.unshift(header);
  const delBtn = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C11.5977 0 12.9037 1.24892 12.9949 2.82373L13 3H15H17C17.5523 3 18 3.44772 18 4C18 4.51284 17.614 4.93551 17.1166 4.99327L17 5H16V16C16 17.5977 14.7511 18.9037 13.1763 18.9949L13 19H5C3.40232 19 2.09634 17.7511 2.00509 16.1763L2 16V5H1C0.447715 5 0 4.55228 0 4C0 3.48716 0.38604 3.06449 0.883379 3.00673L1 3H3H5C5 1.40232 6.24892 0.0963391 7.82373 0.00509269L8 0H10ZM7 5H5H4V16C4 16.5128 4.38604 16.9355 4.88338 16.9933L5 17H13C13.5128 17 13.9355 16.614 13.9933 16.1166L14 16V5H13H11H7ZM11 3H7L7.00673 2.88338C7.06449 2.38604 7.48716 2 8 2H10L10.1166 2.00673C10.614 2.06449 11 2.48716 11 3ZM11.9933 6.88338C11.9355 6.38604 11.5128 6 11 6C10.4477 6 10 6.44772 10 7V15L10.0067 15.1166C10.0645 15.614 10.4872 16 11 16C11.5523 16 12 15.5523 12 15V7L11.9933 6.88338ZM7 6C7.51284 6 7.93551 6.38604 7.99327 6.88338L8 7V15C8 15.5523 7.55228 16 7 16C6.48716 16 6.06449 15.614 6.00673 15.1166L6 15V7C6 6.44772 6.44772 6 7 6Z" fill="#181818"/>
  </svg>
  `;
  const productInnerLine = (itemData, isHeader, variantIndex) => {
    const quantityWrapper = `
    <div class="quantity_wrapper">
        <button ${itemData.quantity > 1 ? '' : 'disabled'}
                class="btn-quantity ${id}__minus-btn"><i class="vue-pdp-icon-minus"></i></button>
        <input name="quantity"
            type="number"
            readonly="readonly"
            value="${itemData.quantity}"
            class="input-quantity">
        <button class="btn-quantity ${id}__plus-btn"><i class="vue-pdp-icon-plus"></i></button>
    </div>   
    `;

    const htmlStr = `
    <div class="${id}__cartline--product-details ${!isHeader ? 'include' : ''}" data-varindex = "${variantIndex}" data-sku="${
      itemData.sku
    }">
        <div class="${id}__cartline--products-img ${id}__variant--img"></div>
        <div class="${id}__cartline--products-variant-name">${itemData.variantName || ''}</div>
        <div class="${id}__cartline--products-quantity--block">${isHeader ? itemData.quantity : quantityWrapper}</div>
        <div class="${id}__cartline--products-unitPrice">${isHeader ? itemData.unitPrice : formatPrice(itemData.price)}</div>
        <div class="${id}__cartline--products-totalPrice">${
      isHeader ? itemData.totalPrice : formatPrice(itemData.price * itemData.quantity)
    }</div>
        <div class="${id}__cartline--products-deletebtn" >${isHeader ? '' : delBtn}</div>
    </div>
    `;
    return htmlStr;
  };
  const renderLine = (lineData, i) => {
    const header = i === 0;
    const htmlStr = `
        <div class="${id}__cartline ${header ? 'basket-header' : ''}">
            <div class="${id}__cartline--title">
                <span>${lineData.name || ''}</span><span class="${id}__delete--all">${delBtn}</span><span>${formatPrice(
      lineData.price
    )}</span>
            </div>
            <div class="${id}__cartline--${header ? 'header' : 'main-img'}" style="background-image:url(${
      lineData.images.length > 0 && lineData.images[0]
    })">${header ? lineData.variations[0].product : ''}</div>
            <div class="${id}__cartline--products">
                    ${lineData.variations.map((item, i) => productInnerLine(item, header, i)).join('\n')}
            </div>    
        </div>`;
    return htmlStr;
  };

  return basketProducts.map((product, i) => renderLine(product, i)).join('\n');
};

export default renderCartLine;
