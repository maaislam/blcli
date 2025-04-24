const checkStores = (id, productSku, quantity = 1) => {
  const html = `
        <a class="${id}__checkStores" href="/checkstock?product_id=${productSku}&amp;quantity=${quantity}">Check stock in your local store</a>
    `;
  return html;
};

export default checkStores;
