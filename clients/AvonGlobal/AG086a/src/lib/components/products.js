const renderPlpAddToCart = (data, parentElm, id, position = '') => {
  if (data.length <= 0 || data[0].IsOutOfStock) {
    return;
  }
  //console.log(data);
  const htmlStr = (info) => {
    const {
      DiscountPriceFormatted,
      HasActiveVariant,
      IsOnSale,
      Id,
      IsNew,
      ListPriceFormatted,
      Name,
      Rating,
      SalePriceFormatted,
      VariantGroups,
      imgUrl,
      prodUrl,
    } = info;
    const { Variants } = VariantGroups[0];
    const firstAvaiableVarIndx = Variants.findIndex((variant) => variant.IsAvailable);
    const varImage = Variants[firstAvaiableVarIndx] && Variants[firstAvaiableVarIndx].Image;
    //console.log(firstAvaiableVarIndx);
    //const isFavorite = favResult.Data.some((item) => item.Id == Id);

    const renderVariant = (variant, index) => {
      const { Image, IsAvailable, Name, Sku, Type } = variant;
      return `
       <div class="${id}__variant ${id}__variant--${Type} ${
        index === firstAvaiableVarIndx ? 'selected' : ''
      }" data-img="${Image}"  data-varsku="${Sku}" data-avaiability="${IsAvailable}" data-type="${Type}">
          <div class="${id}__circle1${Type == 'Size' ? '-size' : ''}"><div class="${id}__circle2${
        Type == 'Size' ? '-size' : ''
      }"><div class="${id}__shade-img ${
        Type.toLowerCase() !== 'shade' ? `${id}__hide` : ''
      }" style="background-image:url(${Image})"></div></div></div>
          <div class="variant-name">${Name}</div>
       </div>

      `;
    };

    const selectedVarintType = () => {
      const shadeSelectedDom = `
      <div class="${id}__circle1">
        <div class="${id}__circle2">
          <div class="${id}__shade-img"
              style="background-image:url(${varImage})">
          </div>
        </div>
      </div>
      `;
      const sizeSelectedDom = `
          <div class="${id}__shade-img size-variant" >
              Select Variant
          </div>
      `;

      return varImage ? shadeSelectedDom : sizeSelectedDom;
    };

    return `
            <div class="swiper-slide">
                <div class="${id}__prodcard">
                    
                    <div class="${id}__cartbtn--container">
                        <div class="quantity ${position} ${!varImage && Variants.length > 1 ? 'size-var-fix' : ''}">
                        <div class="variant-selected ${varImage ? '' : 'w-100'} ${
      Variants.length <= 1 ? `${id}__hide` : ''
    }">${selectedVarintType()}<svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9218 0.292855C12.2772 0.653319 12.3045 1.22055 12.0039 1.61286L11.9219 1.70707L6.99422 6.70707C6.63893 7.06757 6.07984 7.09533 5.69317 6.79033L5.60031 6.70715L0.67154 1.70715C0.2866 1.31664 0.286566 0.683478 0.671464 0.292932C1.02675 -0.0675718 1.58584 -0.0953323 1.97252 0.209671L2.06538 0.292855L6.29767 4.585L10.5279 0.292932C10.8832 -0.0675718 11.4423 -0.0953323 11.829 0.209671L11.9218 0.292855Z" fill="#181818"></path>
                      </svg></div>
                        <div class="variant-selector ${id}__hide">${Variants.map((variant, i) => renderVariant(variant, i)).join(
      '\n'
    )}</div>
                    <div class="quantity_wrapper">
                        <button class="btn-quantity ${id}__minus-btn">
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
                        <button class="btn-quantity ${id}__plus-btn">
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="#212121" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.80849 1.5C7.80849 0.947715 7.36077 0.5 6.80849 0.5C6.25621 0.5 5.80849 0.947715 5.80849 1.5V5.5L1.88025 5.5C1.32796 5.5 0.880249 5.94772 0.880249 6.5C0.880249 7.05228 1.32796 7.5 1.88025 7.5L5.80849 7.5V11.5C5.80849 12.0523 6.25621 12.5 6.80849 12.5C7.36077 12.5 7.80849 12.0523 7.80849 11.5V7.5L11.708 7.5C12.2603 7.5 12.708 7.05229 12.708 6.5C12.708 5.94772 12.2603 5.5 11.708 5.5L7.80849 5.5V1.5Z"></path>
                            </svg>
                        </button>
                    </div> 
                        </div>
                        <div class="add-to-cart" data-sku="${Variants[firstAvaiableVarIndx]?.Sku}">ADD TO BASKET</div>
                    </div>
                    </div>
                </div>
            </div>`;
  };

  const cards = data.map((item) => htmlStr(item)).join('\n');
  parentElm.querySelectorAll(`.${id}__prodcards`).forEach((item) => {
    item?.remove();
  });

  parentElm.insertAdjacentHTML('beforeend', ` <div class="${id}__prodcards"><div class="swiper-wrapper">${cards}</div></div>`);
};

export default renderPlpAddToCart;
