const priceBanner = (id, tradePrice, vatText) => {
  const htmlStr = `<div class="${id}__prices-banner">
        <div class="${id}__special-price">
            <span class="${id}__special-price__label">TRADE ACCOUNT</span>
            <span class="${id}__special-price__price">${tradePrice}</span>
            <span class="${id}__special-price__vat">${vatText}</span>
        </div>
    </div>`;

  return htmlStr;
};

export default priceBanner;
