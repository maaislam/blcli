const renderDiscount = (id, data, discountNum, anchorElm) => {
  //console.log(data);
  const [currentPrice, prevPrice, discount] = data;

  const htmlStr = `
    <div class="${id}__discount-block ${currentPrice.indexOf('NaN') !== -1 ? `${id}__invisible` : ''}" >
        <div class="row ${id}__current-price">${currentPrice}</div>
        ${
          discountNum >= 0
            ? `<div class="${id}__discount-info ">
                <div class="${id}__discount advertised-price">Adviesprijs ${prevPrice}</div>
               </div>`
            : ''
        }
        
    </div>
    `;

  anchorElm.insertAdjacentHTML('beforebegin', htmlStr);
};
export default renderDiscount;
