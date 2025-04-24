/**
 * Parse upsell products from current page
 */
export const getUpsellProducts = () => {
  const upsellProducts = document.querySelectorAll('upsell-products-item');
  let results = [];

  if(upsellProducts) {
    [].forEach.call(upsellProducts, (upsellProduct) => {
      let result = {
        id: null,
        image: null,
        name: null,
        price: null,
      };

      const cb = upsellProduct.querySelector('input[type=checkbox][value]');
      if(cb) {
        result.id = cb.value;
      }

      const img = upsellProduct.querySelector('img');
      if(img) {
        result.image = img.getAttribute('image') 
          ? 
          'https://thumbor-gc.tomandco.uk/unsafe/fit-in/342x256/center/middle/smart/filters:upscale():fill(transparent):format(png):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog' + img.getAttribute('image') 
          : img.src;
      }

      const name = upsellProduct.querySelector('[ng-bind*="name"]');
      if(name) {
        result.name = name.innerText.trim();
      }

      const price = upsellProduct.querySelector('.price-value');
      if(price) {
        result.price = price.innerText.trim();
      }

      results.push(result);
    });
  }

  return results;
};

/**
 * Add product to basket by ID
 */
export const addProductToBasketById = (prodId) => {
  tco.get('customer').basket.add({}, {
    id: prodId,
    qty: 1
  }, {}, {});
};
