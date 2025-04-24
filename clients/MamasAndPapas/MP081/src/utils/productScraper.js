/**
 * Run this is the console to automatically scrape product data to add to
 * ./data/products.js.
 */
const scrapeVariationData = () => {
  const UV = window.universal_variable.product;
  const sku = UV.sku_code;
  const name = (() => {
    const select = document.querySelector('.variant-selector select');
    return select.selectedOptions[0].innerText.replace(/ bundle/gi, '').replace(/ \(out of stock\)/gi, '').trim();
  })();
  const h1 = UV.name;
  const url = window.location.href;
  const img = (() => {
    const imgs = document.querySelectorAll('.js-container img');
    const array = [];
    [].forEach.call(imgs, (el) => {
      array.push(el.src);
    });
    return array;
  })();
  const price = (() => {
    const el = document.querySelector('.price-block > .price') || document.querySelector('.price-block > strong');
    return el.innerText.replace('£', '');
  })();
  const worthPrice = (() => {
    let toReturn;
    const el = document.querySelector('.worth-price');
    if (el) {
      toReturn = el.innerText.match(/[\d,.]+/)[0]; // eslint-disable-line
    } else {
      toReturn = '';
    }
    return toReturn;
  })();
  const wasPrice = !worthPrice && UV.unit_sale_price ? UV.unit_price.toString() : '';

  return {
    sku,
    name,
    h1,
    url,
    img,
    price,
    wasPrice,
    worthPrice,
  };
};

JSON.stringify(scrapeVariationData());
