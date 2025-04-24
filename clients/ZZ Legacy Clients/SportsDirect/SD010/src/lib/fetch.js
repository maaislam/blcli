export const fetch = new Promise((res, rej) => {

  // Fetch data
  const request = new XMLHttpRequest();
  request.open('GET', '/Cart', true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      const data = this.response;
      const html = document.createElement('div');
      html.innerHTML = data;
      const products = html.querySelectorAll('.AspNet-GridView table tbody > tr');
      const productArr = [];

      if (products) {
        for (let i = 0; products.length > i; i += 1) {
          const thisProd = products[i];

          const singleObject = {
            title: thisProd.querySelector('.productdesc .productTitle'), // Also link attribute
            img: thisProd.querySelector('.productimage img'),
            size: thisProd.querySelector('.productsize span:last-of-type'),
            qty: thisProd.querySelector('input.qtybox') ? thisProd.querySelector('input.qtybox').value : null,
            tPrice: thisProd.querySelector('.itemtotalprice span.money'),
          };

          productArr.push(singleObject);
        }
      }

      res({
        productArr,
        totalPrice: html.querySelector('#TotalValue'),
      });
    } else {
      // We reached our target server, but it returned an error
      rej(console.error('SD010 Server Failure'));
    }
  };

  request.onerror = function() {
    rej(console.error('SD010 Ajax Failure'));
  };

  request.send();

});