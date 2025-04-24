import PublishSubscribe from './PublishSubscribe';
/* eslint-disable */
// Add to cart functionality
const ajaxAddToBag = (sku) => {
  if (!sku) return false;
  const request = new XMLHttpRequest();
  request.open('POST', '/en-gb/cart/add', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      PublishSubscribe.publish('did-add-to-bag');
    }
  };

  request.onerror = () => {
    PublishSubscribe.publish('error-adding-to-bag', sku);
  };

  const data = `qty=1&productCodePost=${sku}`;
  request.send(data);
}

export default ajaxAddToBag;
