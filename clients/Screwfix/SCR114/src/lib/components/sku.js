const sku = (ID, productSku) => {
  const html = `<p class="${ID}__productCode">
    <span class="${ID}__text">Product code:</span> <span class="${ID}__number">${productSku}</span>
  </p>`;
  return html.trim();
};

export default sku;
