import variantItem from './variantOption.js';

const variantOptions = (id, allVariants, firstVariantImage) => {
  // variantData.flatMap((group) => group.Variants);
  console.log(allVariants);

  if (allVariants.length === 1) return '';
  const htmlString = `
    <div class="${id}__variant-dropdown-wrapper" aria-expanded="false">
        <div class="${id}__selected-variatn-image">
            <img src="${firstVariantImage}">
        </div>
        <div class="${id}__variant-list">
            ${allVariants.map((variant, index) => variantItem(id, variant, index)).join('')}
        </div>
    </div>`;
  return htmlString;
};

export default variantOptions;
