import formatPrice from '../helpers/formatPrice';

const renderSamplePromo = (id, data, hasRelevantantSample = true) => {
  document.querySelector(`.${id}__samplespromo`)?.remove();

  const titleText = hasRelevantantSample ? 'Need To Try This Product Before You Buy?' : 'Not Sure What to Buy? Try A Sample';
  const productHtml = data
    .map((item) => {
      const { sampleUrl, primaryImage, title, price } = item;
      const htmlStr = `
    <a class="${id}__product" href="${sampleUrl}">
        <div class="${id}__product--img"><img src="${primaryImage}" alt="${title}" /></div>
        <div class="${id}__product--details">
            <div class="name">${title}</div>
            <div class="price">${formatPrice(price)}</div>
        </div>
    </a>    
    `;
      return htmlStr;
    })
    .join('\n');

  const htmlStr = `
    <div class="${id}__samplespromo">
        <div class="title">${titleText}</div>
        <div class="discount-banner">Get 3 for £1 using code: <b>SAMPLES</b></div>
        <div class="products">${productHtml}</div>
        <a href="/collections/sample" class="${id}__view-all view-all">View All Samples</a>
    </div>
    `;

  document.querySelector('#product-detail .product-key-actions ').insertAdjacentHTML('afterend', htmlStr);
};

export default renderSamplePromo;
