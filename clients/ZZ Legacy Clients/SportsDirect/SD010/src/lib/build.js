export const build = (productData) => {
  if (!productData) return;

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }

  if (!isEmpty(productData)) {
    // console.log('prd data ', productData);
    const link = productData.title ? productData.title.getAttribute('href') : null;

    const html = `
      <div class="SD010-product">
        <a href="${link}"></a>
    
        <div class="SD-img ib">
          ${productData.img.outerHTML}
        </div>

        <div class="SD-info ib">
          <p class="SD-title">${productData.title.outerHTML}</p>

          <p class="SD-data ib">Qty: ${productData.qty}</p>
          <p class="SD-data SD-centre ib">Size: ${productData.size.outerHTML}</p>
          <p class="SD-data ib">${productData.tPrice.outerHTML}</p>

        </div>
      </div>
    `;

    return html;
  }

};