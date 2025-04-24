const variantItem = (id, variant, index) => {
  console.log('🚀 ~ variantItem ~ variant:', variant);
  const { Image, Name, Sku } = variant;
  return `<div class="${id}__variant-item ${index === 0 ? 'selected' : ''}" data-Sku="${Sku}">
          <div class="${id}__variant-image">
              <img src="${Image}">
          </div>
          <div class="${id}__variant-name">${Name}</div>
      </div>`;
};

export default variantItem;
