export const getRatings = (prodPrimaryId) => {
  const options = {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  };

  return fetch(`https://api.yotpo.com/products/wLzCgzI3qtYaGL8IebLnz3ZEkclM5g2BAA6PvG6L/${prodPrimaryId}/bottomline`, options);
};

export const ratingStars = (id, ratingData) => {
  const { average_score, total_reviews } = ratingData;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const rounderRating = Math.floor(average_score);
    if (i <= rounderRating) {
      stars.push(`<span class="${id}__yotpo-icon"></span>`);
    } else if (i === rounderRating + 1 && (average_score * 10) % 5) {
      stars.push(`<span class="${id}__yotpo-icon half-star"></span>`);
    } else {
      stars.push(`<span class="${id}__yotpo-icon empty-star"></span>`);
    }
  }

  const htmlStr = `
          <div class="${id}__yotpo-bottomline ">
              <div class="${id}__yotpo-stars">
                 ${stars.map((star) => star).join('\n')}
              </div>
              <span class="${id}__total-review">${total_reviews} Reviews</span>
          </div>
      `;

  return htmlStr;
};

export const addToCart = (id, quantity) => {
  const payload = {
    id,
    quantity,
  };

  const response = fetch(`/cart/add.js`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    const res = response.json();

    return res;
  });
  return response;
};

export const getCart = () => {
  const response = fetch(`/cart.js`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
  return response;
};
export const emitDYAddToCart = (res, quantity) => {
  const eventTotal = (res['final_price'] / 100) * quantity;

  const atcJson = {
    name: 'Add to Cart',
    properties: {
      dyType: 'add-to-cart-v1',
      value: eventTotal,
      currency: 'GBP',
      productId: res.sku,
      quantity: quantity,
    },
  };
  //emit DY event
  DY.API('event', atcJson);
};

export const formatPrice = (amount, code = 'en-GB', currency = 'GBP') => {
  return new Intl.NumberFormat(code, {
    style: 'currency',
    currency,
  }).format(amount);
};
/**********STRATEGY DATA FROM DYNAMIC YIELD***************/
export const getStrategyData = (strategyId, pageType = 'HOMEPAGE', prodData = [], numberOfProducts = 50) => {
  const styles = {
    fail: ['color: white', 'background: red'],
    pass: ['color: white', 'background: green'],
    data: ['color: white', 'font-size: 16px', 'font-weight:700'],
    error: ['color: red', 'font-size: 16px', 'font-weight:700'],
  };
  const payload = {
    data: [
      {
        wId: strategyId,
        fId: '',
        maxProducts: numberOfProducts,
        rules: [],
        filtering: [],
      },
    ],
    ctx: {
      data: prodData,
      type: pageType,
    },
  };
  return fetch(`https://rcom-eu.dynamicyield.com/v3/recommend/${window.DY.section}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const errMsg = data.errorMessage;
      if (errMsg) {
        console.log('%c FAILED ', styles.fail.join(';'));
        console.log('%cError Message: ', styles.error.join(';'), errMsg);
        return;
      }
      console.log('%c PASSED ', styles.pass.join(';'));
      console.log('%cRecommendation Data: ', styles.data.join(';'), data.response[0]);
      return data.response[0].slots;
    });
};

/**********STRATEGY DATA FROM DYNAMIC YIELD***************/

/**********RECOMMENDED PRODUCT FROM SHOPIFY***************/

export const recommendedProducts = () => {
  return fetch(`/recommendations/products.json?product_id=${window.product.id}&limit=15`)
    .then((response) => response.json())
    .then(({ products }) => {
      console.log(products);
    });
};

/**********RECOMMENDED PRODUCT FROM SHOPIFY***************/
