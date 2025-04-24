import { events } from '../../../../../lib/utils';

export default (cb) => {
  const getLastOrder = () => {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://www.glassesdirect.co.uk/account/orders/', true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const data = request.responseText;
        const div = document.createElement('div');
        div.innerHTML = data;
        const latestOrder = div.querySelector('table#bsk-tbl-od tr.order');
        if (latestOrder) {
          const price = latestOrder.querySelector('td.ord-ct2');
          const productName = latestOrder.querySelector('td:nth-of-type(3)');
          let priceInt;
          let productNameText;
          if (price) {
            const priceText = price.textContent.trim().replace('£', '');
            priceInt = parseFloat(priceText);
          }
          if (productName) {
            productNameText = productName.textContent.replace(/\s+/g, ' ');
            if (!productNameText.match(/Home/g)) {
              cb(priceInt, productNameText);
            } else {
              cb(priceInt);
            }
          }
        } else {
          events.send('GD031', 'Inactive', 'User has no previous orders');
        }
      } else {
        // We reached our target server, but it returned an error
        
      }
    };

    request.onerror = (error) => {
      // There was a connection error of some sort
      console.error(error);
    };

    request.send();
  };
  getLastOrder();
};
