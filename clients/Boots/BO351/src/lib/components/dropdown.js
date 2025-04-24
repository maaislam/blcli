import { dropdownArrow } from '../assets/icons';

const dropdown = (id, variants, sku, varCode) => {
  const initialVariant = variants.find((variant) => variant.varCode === varCode);
  const initialVariantColorImg = `https://boots.scene7.com/is/image/Boots/${sku}${initialVariant.varCode}?wid=114&hei=114&op_sharpen=1`;

  const htmlStr = `
    <div class="custom-dropdown" data-selected="">
        <div class="custom-selected-option" tabindex="0">
            <span class="custom-option-label">
                <img src="${initialVariantColorImg}" alt="" class="custom-image">
                <span class="custom-text">${initialVariant.colour}</span>
            </span>
            <div class="custom-arrow">
                ${dropdownArrow}
            </div>
        </div>
        <div class="custom-menu" style="display: none;">
            ${variants
              .map((variant) => {
                const isSelectedVariant = variant.varCode === initialVariant.varCode;
                const imgSrc = `https://boots.scene7.com/is/image/Boots/${sku}${variant.varCode}?wid=114&hei=114&op_sharpen=1`;

                return `
                ${
                  variant.inStock
                    ? `
                    <div 
                        class="custom-option ${isSelectedVariant ? `${id}__selected` : ''}" 
                        data-color="${variant.colour}" 
                        data-varcode=${variant.varCode} 
                        data-partnumber="${sku}${variant.varCode}"
                        
                    >
                            <img src="${imgSrc}" alt="${variant.colour}" class="custom-image">
                            <span class="custom-text">${variant.colour}</span>
                        </div>`
                    : ''
                }
                `;
              })
              .join('')}
        </div>
    </div>
    `;

  return htmlStr;
};
export default dropdown;
