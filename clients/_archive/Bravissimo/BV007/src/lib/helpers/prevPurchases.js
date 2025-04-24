const prevPurchases = (pageNumber) => {
  if (!pageNumber) {
    return new Promise((res, rej) => {
      const request = new XMLHttpRequest();
      request.open('GET', 'https://www.bravissimo.com/api/orders?page=1&endDate=%7B%22years%22%3A%202%7D', true);
  
      request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const resp = JSON.parse(request.responseText);
        console.log('response ,', resp);
        res(resp);
      } else {
        // We reached our target server, but it returned an error
        rej(console.error('failed order request'));
      }
      };
  
      request.onerror = function() {
      // There was a connection error of some sort
      };
  
      request.send();
    });
  } else {
    return new Promise((res, rej) => {
      const request = new XMLHttpRequest();
      request.open('GET', `https://www.bravissimo.com/api/orders?page=${pageNumber}&endDate=%7B%22years%22%3A%202%7D`, true);
  
      request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const resp = JSON.parse(request.responseText);
        res(resp);
      } else {
        // We reached our target server, but it returned an error
        rej(console.error('failed order request'));
      }
      };
  
      request.onerror = function() {
      // There was a connection error of some sort
      };
  
      request.send();
    });
  }
};

export default prevPurchases;
