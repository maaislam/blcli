import addToCart from '../helpers/addToCart';
import { manageFavorite } from '../helpers/favorite';

import { localStorageRemove, localStorageSave } from '../helpers/storage';
import updateMinicart from '../helpers/updateMinicart';

const renderProdlist = (fireEvent, data, favResult, parentElm, id) => {
  const productData = JSON.stringify(data.map((product) => product.prodUrl.split('.co.uk')[1]));
  localStorageRemove('hero-product-data');
  localStorageSave('hero-product-data', productData);

  if (data.length <= 0) {
    return;
  }
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
    const isFavorite = favResult.Data.some((item) => item.Id == Id);
    const svgStar = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6.46589 0.289665L7.93705 3.25974C7.97051 3.33513 8.02314 3.40042 8.0897 3.44913C8.15626 3.49783 8.23443 3.52824 8.3164 3.53732L11.5641 4.01845C11.6581 4.03054 11.7467 4.06913 11.8197 4.12972C11.8926 4.19031 11.9468 4.27039 11.9759 4.36062C12.005 4.45085 12.0078 4.5475 11.984 4.63928C11.9603 4.73106 11.9109 4.81419 11.8416 4.87894L9.50073 7.20134C9.44099 7.25716 9.39615 7.32703 9.37029 7.40459C9.34444 7.48216 9.33839 7.56496 9.35269 7.64546L9.9171 10.9116C9.93344 11.0055 9.92311 11.102 9.88729 11.1903C9.85146 11.2786 9.79158 11.355 9.71445 11.4109C9.63733 11.4668 9.54605 11.5 9.45102 11.5066C9.35599 11.5132 9.26101 11.493 9.17689 11.4483L6.25308 9.90309C6.17821 9.86634 6.09591 9.84723 6.01251 9.84723C5.92911 9.84723 5.84681 9.86634 5.77194 9.90309L2.84813 11.4483C2.76401 11.493 2.66903 11.5132 2.574 11.5066C2.47897 11.5 2.38769 11.4668 2.31057 11.4109C2.23344 11.355 2.17356 11.2786 2.13774 11.1903C2.10191 11.102 2.09158 11.0055 2.10792 10.9116L2.67233 7.60845C2.68664 7.52795 2.68058 7.44515 2.65473 7.36758C2.62887 7.29002 2.58403 7.22015 2.52429 7.16433L0.15563 4.87894C0.0855536 4.81241 0.0362719 4.72699 0.013755 4.63302C-0.00876193 4.53905 -0.00354788 4.44057 0.0287654 4.34951C0.0610788 4.25844 0.119105 4.1787 0.195815 4.11994C0.272525 4.06119 0.364627 4.02593 0.460965 4.01845L3.70862 3.53732C3.7906 3.52824 3.86876 3.49783 3.93532 3.44913C4.00188 3.40042 4.05452 3.33513 4.08798 3.25974L5.55913 0.289665C5.5992 0.203161 5.66317 0.129924 5.74351 0.0785983C5.82384 0.0272724 5.91718 0 6.01251 0C6.10784 0 6.20118 0.0272724 6.28152 0.0785983C6.36185 0.129924 6.42582 0.203161 6.46589 0.289665Z" fill="#E0E0E0"/>
    </svg>`;

    const renderVariant = (variant, index) => {
      const { Image, IsAvailable, Name, Sku, Type } = variant;
      return `
       <div class="${id}__variant ${
        index === 0 ? 'selected' : ''
      }" data-img="${Image}"  data-varsku="${Sku}" data-avaiability="${IsAvailable}" data-type="${Type}">
          <div class="${id}__shade-img ${
        Type.toLowerCase() !== 'shade' ? `${id}__hide` : ''
      }" style="background-image:url(${Image})"></div>
          <div class="variant-name">${Name}</div>
       </div>

      `;
    };

    return `
            <div class="swiper-slide">
                <div class="${id}__prodcard">
                    <div class="${id}__prodcard--image-container">
                        <a href="${prodUrl}" class="${id}__img--wrapper">
                            <img src="${imgUrl}" alt="${Name}" />
                        </a>
                        <div class="wishlist-heart ${isFavorite ? `${id}__favorite` : ''}" data-id="${Id}">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="20"
                                viewBox="0 0 24 20"
                                fill="none">
                                <path d="M12.4573 19L3.30405 10.709C-1.67054 5.73443 5.6421 -3.81677 12.4573 3.91042C19.2725 -3.81677 26.552 5.7676 21.6105 10.709L12.4573 19Z"
                                        stroke="#212121"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div class="${id}__detail-wrapper">
                    <div class="${id}__prodcard--title"><a href="${prodUrl}">${Name}</a></div>
                    <div class="${id}__prodcard--ratings">
                        <div class="${id}__stars Rating">
                        <div class=" RatingStars">
                            <div class="EmptyStars">
                                <span class="Star">${svgStar}</span>
                                <span class="Star">${svgStar}</span>
                                <span class="Star">${svgStar}</span>
                                <span class="Star">${svgStar}</span>
                                <span class="Star">${svgStar}</span>
                            </div>
                            <div class="FullStars" style="width: ${parseFloat(Rating) * (100 / 5)}%;">
                                <span class="Star">${svgStar}</span>
                                <span class="Star">${svgStar}</span>
                                <span class="Star">${svgStar}</span>
                                <span class="Star">${svgStar}</span>
                                <span class="Star">${svgStar}</span>
                            </div>
                        </div>
                        
                        </div>
                        <div class="rating-number">${Rating > 0 ? Rating.toFixed(1) : ''}</div>
                    </div>
                    <div class="${id}__price--container">
                        <div class="price">${IsOnSale ? SalePriceFormatted : ListPriceFormatted}</div>
                        <div class="prev-price ${!IsOnSale ? `${id}__hide` : ''}">${ListPriceFormatted}</div>
                    </div>
                    <div class="${id}__cartbtn--container">
                        <div class="quantity">
                        <div class="variant-selected ${Variants[0].Image ? '' : 'w-100'} ${
      Variants.length <= 1 ? `${id}__hide` : ''
    }"><div class="${id}__shade-img ${Variants[0].Image ? '' : 'size-variant'}" style="background-image:url(${
      Variants[0].Image
    })">${
      !Variants[0].Image ? 'Select Size' : ''
    }</div><svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        <div class="add-to-cart" data-sku="${Variants[0].Sku}">ADD TO BASKET</div>
                    </div>
                    </div>
                </div>
            </div>`;
  };

  const cards = data.map((item) => htmlStr(item)).join('\n');

  parentElm.insertAdjacentHTML('beforeend', ` <div class="${id}__prodcards"><div class="swiper-wrapper">${cards}</div></div>`);

  // plus minus controller

  document.querySelector(`.${id}__prodcards`).addEventListener('click', (e) => {
    const target = e.target;
    console.log(target);

    const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
    const inputBox = target.closest(`.${id}__cartbtn--container`)?.querySelector('input');

    if (targetMatched(`.${id}__plus-btn`)) {
      inputBox.value = parseInt(inputBox.value) + 1;
      fireEvent('Interactions with quantity');
    } else if (targetMatched(`.${id}__minus-btn`)) {
      inputBox.value = parseInt(inputBox.value <= 0 ? 2 : inputBox.value) - 1;
      fireEvent('Interactions with quantity');
    } else if (targetMatched(`.add-to-cart`)) {
      const card = target.closest(`.${id}__prodcard`);
      card.classList.add('adding');
      addToCart(target.getAttribute('data-sku'), parseInt(inputBox.value)).then((res) => {
        fireEvent('Add to bag of hero product from homepage');
        setTimeout(() => {
          card.classList.remove('adding');
          console.log(res);
          const imgSrc = card.querySelector(`.${id}__img--wrapper>img`).getAttribute('src');
          updateMinicart(res, imgSrc);
        }, 1500);
      });
    } else if (targetMatched(`.wishlist-heart`)) {
      const wishlistHeart = target.closest('.wishlist-heart');
      const productId = wishlistHeart.getAttribute('data-id');
      const operation = wishlistHeart.classList.contains(`${id}__favorite`) ? 'delete' : 'add';
      manageFavorite(productId, operation).then((res) => {
        wishlistHeart.classList.toggle(`${id}__favorite`);
      });
    } else if (targetMatched(`.${id}__variant`)) {
      const variantSku = target.closest('[data-varsku]');

      const card = target.closest(`.${id}__prodcard`);
      const selectionBlock = card.querySelector(`.variant-selected .${id}__shade-img`);

      target.closest('.variant-selector').classList.toggle(`${id}__hide`);
      variantSku.getAttribute('data-type') == 'Size'
        ? (selectionBlock.innerText = variantSku.querySelector('.variant-name').innerText)
        : (card.querySelector(`.variant-selected .${id}__shade-img`).style.backgroundImage = `url(${target
            .closest('[data-img]')
            .getAttribute('data-img')})`);
      card.querySelector(`.${id}__variant.selected`)?.classList.remove('selected');
      variantSku.classList.add('selected');
      card.querySelector('.add-to-cart').setAttribute('data-sku', variantSku.getAttribute('data-varsku'));
    } else if (targetMatched(`.variant-selected`)) {
      target.closest(`.${id}__cartbtn--container`).querySelector('.variant-selector').classList.toggle(`${id}__hide`);
    }
    if (targetMatched(`.${id}__img--wrapper`) || targetMatched(`.${id}__prodcard--title`)) {
      localStorageSave('hero-product-user', 'true');
    }
  });
};

export default renderProdlist;
