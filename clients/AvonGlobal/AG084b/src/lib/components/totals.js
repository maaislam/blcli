import formatPrice from '../helpers/formatPrice';

const renderTotal = (id, data) => {
  const htmlStr = `   
        <div class="${id}__totals" >
            <div class="${id}__totals--headline">\${Summary}</div>
            <div class="${id}__totals--itemcount"><span class="left">\${Products}</span><span class="right">${
    data['items_count']
  }</span></div>
            <div class="${id}__totals--subtotal"><span class="left">\${Items subtotal}</span><span class="right">${formatPrice(
    data['subtotal_price']
  )}</span></div>
            <div class="${id}__totals--discount"><span class="left">\${Discount}</span><span class="right">${formatPrice(
    data['discount']
  )}</span></div>
            <div class="${id}__totals--total"><span class="left">\${Total}</span><span class="right">${formatPrice(
    data['total_price']
  )}</span></div>
        </div>

    `;

  //check promotion container

  return htmlStr;
};

export default renderTotal;
