const variant = (id, data) => {
  const { modifiedVariantTitle, outOfStock, url } = data;

  const htmlStr = `
    <a href="${url}" class="${id}__variant ${
    window.location.pathname === url ? 'selected' : outOfStock ? 'outofstock' : 'instock'
  }">
        ${
          outOfStock
            ? `<div href="${url}" class="text ${id}__variant--out-of-stock" data-stock="false">
                <span>${modifiedVariantTitle}</span>
                <span>Out of stock</span>
              </div>`
            : `<div href="${url}" class="text ${id}__variant--title">${modifiedVariantTitle}</div>`
        }
    </a>`;
  return htmlStr.trim();
};

export default variant;
