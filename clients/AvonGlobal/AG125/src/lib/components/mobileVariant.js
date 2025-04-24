const mobileVariant = (id, variant) => {
  const isSelected = variant.classList.contains('selected');
  const variantImage = variant.querySelector('img').src;
  const variantName = variant.querySelector(`.${id}__variant-name`).textContent;
  const sku = variant.dataset.sku;

  const htmlString = `<div class="${id}__variant-item-mobile ${isSelected ? 'selected' : ''}" data-sku="${sku}">
      <div class="${id}__variant-item-image-mobile">
        <img src="${variantImage}">
      </div>
      <div class="${id}__variant-item-name-mobile">${variantName}</div>
    </div>`;

  return htmlString;
};

export default mobileVariant;
