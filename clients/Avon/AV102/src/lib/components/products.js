import renderMobileQuantity from './mobileQuantity';

const renderProdlist = (data, parentElm, testId, headlineText) => {
  const mobileQuantitySelect = `<div class="${testId}__quantity-mobile ">
  <div class="current-quantity">
      <span class="quantity-value">1</span>
      <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon--wide icon-chevron-down" viewBox="0 0 10 6"><path d="M5 6L0 1.203 1.254 0 5 3.602 8.746 0 10 1.203 5 6z"></path></svg>
  </div></div>`;
  const mobileShadeSelectorTitle = `<div class="${testId}__varselect--title">
  <svg aria-hidden="true" focusable="false" role="presentation" class="icon ${testId}__icon-close" viewBox="0 0 12 12"><path d="M12 .978L11.022 0 6 5.029.978-.001 0 .98l5.029 5.02L0 11.023.978 12 6 6.97 11.022 12l.978-.978L6.971 6 12 .978z" fill="#000"></path></svg>
  <span class="label">Select a Shade</span>
</div>`;
  const htmlStr = (info, index) => {
    const { available, type, compare_at_price, featured_image, id, images, price, title, url, variants } = info;
    const renderVariant = (variant, index) => {
      const { available, featured_image, id, public_title } = variant;
      return `
       <div class="${testId}__variant ${index === 0 ? 'selected' : ''}" data-img="${
        featured_image?.src
      }"  data-varsku="${id}" data-avaiability="${available}" data-type="${!featured_image ? 'Size' : ''}">
          <div class="${testId}__shade-img" style="background-image:url(${featured_image?.src})"></div>
          <div class="variant-name">${public_title}</div>
       </div>

      `;
    };
    const formatPrice = (amount, code = 'en-GB', currency = 'GBP') => {
      return new Intl.NumberFormat(code, {
        style: 'currency',
        currency,
      }).format(amount / 100);
    };
    const currentPrice = formatPrice(price);
    const prevPrice = formatPrice(compare_at_price);

    return `
            <div class="swiper-slide">
                
                <div class="${testId}__prodcard">
                    <div class="${testId}__prodcard--image-container ${
      index === 0 && headlineText.indexOf('it again') === -1 ? 'first-item' : ''
    }">
                        <a href="${url}" class="${testId}__img--wrapper">
                            <img width="365" height="365" src="${featured_image}" alt="${title}" />
                        </a>
                    </div>
                    <div class="${testId}__detail-wrapper">
                    <div class="${testId}__prodcard--title"><a href="${url}">${title}</a></div>
       
                    <div class="${testId}__price--container">
                        <div class="price">${currentPrice}</div>
                        <div class="prev-price ${!compare_at_price ? `${testId}__hide` : ''}">${prevPrice}</div>
                    </div>
                    <div class="${testId}__cartbtn--container">
                        <div class="quantity">
                        <div class="variant-selected ${variants[0]['featured_image'] ? '' : 'w-100'} ${
      variants.length <= 1 ? `${testId}__hide` : ''
    }"><div class="${testId}__shade-img ${variants[0]['featured_image'] ? '' : 'size-variant'}" style="background-image:url(${
      variants[0]['featured_image']?.src
    })">${
      !variants[0]['featured_image'] ? 'Select Type' : ''
    }</div><svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9218 0.292855C12.2772 0.653319 12.3045 1.22055 12.0039 1.61286L11.9219 1.70707L6.99422 6.70707C6.63893 7.06757 6.07984 7.09533 5.69317 6.79033L5.60031 6.70715L0.67154 1.70715C0.2866 1.31664 0.286566 0.683478 0.671464 0.292932C1.02675 -0.0675718 1.58584 -0.0953323 1.97252 0.209671L2.06538 0.292855L6.29767 4.585L10.5279 0.292932C10.8832 -0.0675718 11.4423 -0.0953323 11.829 0.209671L11.9218 0.292855Z" fill="#181818"></path>
                      </svg></div>
                        <div class="${testId}__variant-selector ${testId}__hide ">
                        ${mobileShadeSelectorTitle}
                        ${variants.map((variant, i) => renderVariant(variant, i)).join('\n')}</div>
                    <div class="${testId}__mobile-quantity-wrapper">
                      ${mobileQuantitySelect}
                    </div>
                    <div class="quantity_wrapper ${type.indexOf('Bundle') !== -1 ? `${testId}__invisible` : ''}">
                        <button class="btn-quantity ${testId}__minus-btn">
                            <svg width="13" height="3" viewBox="0 0 13 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line style="stroke: #212121;" x1="1.28723" y1="1.5" x2="11.115" y2="1.5" stroke-width="2" stroke-linecap="round"></line>
                            </svg>
                        </button>
                        <input name="quantity"
                            type="number"
                            min="1"
                            max="999"
                            value="1"
                            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                            class="input-quantity">
                        <button class="btn-quantity ${testId}__plus-btn">
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="#212121" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.80849 1.5C7.80849 0.947715 7.36077 0.5 6.80849 0.5C6.25621 0.5 5.80849 0.947715 5.80849 1.5V5.5L1.88025 5.5C1.32796 5.5 0.880249 5.94772 0.880249 6.5C0.880249 7.05228 1.32796 7.5 1.88025 7.5L5.80849 7.5V11.5C5.80849 12.0523 6.25621 12.5 6.80849 12.5C7.36077 12.5 7.80849 12.0523 7.80849 11.5V7.5L11.708 7.5C12.2603 7.5 12.708 7.05229 12.708 6.5C12.708 5.94772 12.2603 5.5 11.708 5.5L7.80849 5.5V1.5Z"></path>
                            </svg>
                        </button>
                    </div> 
                        </div>
                        <div class="add-to-cart" data-sku="${variants[0].id}">${
      type.indexOf('Bundle') !== -1 ? `Buy it Now` : 'Add to basket'
    }</div>
                    </div>
                    </div>
                </div>
            </div>`;
  };

  const cards = data.map((item, i) => htmlStr(item, i)).join('\n');

  parentElm.insertAdjacentHTML(
    'beforeend',
    `<div class="${testId}__prodcards swiper" data-sectiontype="${headlineText}"><h2 class="${testId}__section-title">${headlineText}</h2>${renderMobileQuantity(
      testId
    )}<div class="swiper-wrapper">${cards}</div></div>`
  );
};

export default renderProdlist;
