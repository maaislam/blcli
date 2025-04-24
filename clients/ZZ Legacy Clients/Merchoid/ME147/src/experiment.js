import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ME147}} - {{Product Page Mystery Bundles}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME147',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    /**
     * @desc Experiment runs for UK and US sites only and on Product Pages that are in Stock
     */
    if ((window.merchoidDetectedCountry === 'GB' || window.merchoidDetectedCountry === 'US') && document.querySelector('[property="og:price:availability"]') !== null) {
      // Setup
      const { settings, services } = Experiment;
      services.tracking();
      document.body.classList.add(settings.ID);

      let currency;
      if (window.merchoidDetectedCountry === 'GB') {
        currency = '£';
      } else if (window.merchoidDetectedCountry === 'US') {
        currency = '$';
      }

      const productImageUrl = document.querySelector('.product-image a').href;
      const productName = document.querySelector('.mobile-target-product-title').textContent;
      let productPrice = parseFloat(dataLayer[0].ecommerce.detail.products[0].price);
      let productSku;
      let mysteryBundle;
      let sizes;
      let formData;
      let stockData;

      // If current product has Select Size
      if (document.querySelector('.variations_form.cart')) {
        formData = JSON.parse(document.querySelector('.variations_form.cart').getAttribute('data-product_variations'));
        stockData = JSON.parse(document.querySelector('.row.product-page').getAttribute('data-merchoid-dispatch-info')).variation_stock;

        // Gets Current Product SKU
        if (document.querySelector('.woocommerce-variation-add-to-cart.variations_button.woocommerce-variation-add-to-cart-enabled > input') !== null) {
          productSku = document.querySelector('.woocommerce-variation-add-to-cart.variations_button.woocommerce-variation-add-to-cart-enabled > input').value;
        }
      } else {
        productSku = document.querySelector('form.cart .radical-variations-wrapper>input').value;
      }

      // Products Content
      // Format Product JSON
      /*eslint-disable */
      /**
       * @desc UK Store Content
       */
      if (window.merchoidDetectedCountry === 'GB') {
        switch (settings.VARIATION) {
          case '1':
            mysteryBundle = [
              {
                name: 'Merchoid Mega Mystery T-shirt',
                price: '7.99',
                img: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2016/01/listing-510x510.jpg',
                sku: '718291',
                sizes: ['s', 'm', 'l', 'xl'],
              },
            ];
            sizes = [
              {
                small: ['s', 'S (Fits 34-36" chest)'],
                medium: ['m', 'M (Fits 38-40" chest)'],
                large: ['l', 'L (Fits 42-44" chest)'],
                xlarge: ['xl', 'XL (Fits 46-48" chest)'],
                // xxlarge: ['xxl', 'XXL (Fits 50-52" chest)'],
              },
            ];
            break;
          case '2':
            mysteryBundle = [
              {
                name: 'Merchoid Mega Mystery T-Shirt x3 Bundle',
                price: '17.99',
                img: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2016/10/t-shirtx3-510x510.jpg',
                sku: '718311',
                sizes: ['s', 'm', 'l', 'xl'],
              },
            ];
            sizes = [
              {
                small: ['s', 'S (Fits 34-36" chest)', '718293'],
                medium: ['m', 'M (Fits 38-40" chest)', '718294'],
                large: ['l', 'L (Fits 42-44" chest)', '718295'],
                xlarge: ['xl', 'XL (Fits 46-48" chest)', '718296'],
                // xxlarge: ['xxl', 'XXL (Fits 50-52" chest)'],
              },
            ];
            break;
          // case '3':
          //   mysteryBundle = [
          //     {
          //       name: 'Mystery T-Shirt x5',
          //       price: '27.99',
          //       img: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/02/5x-510x510.png',
          //       sku: '202562',
          //       sizes: ['s', 'm', 'l', 'xl', 'xxl'],
          //     },
          //   ];
          //   sizes = [
          //     {
          //       small: ['s', 'S (Fits 34-36" chest)'],
          //       medium: ['m', 'M (Fits 38-40" chest)'],
          //       large: ['l', 'L (Fits 42-44" chest)'],
          //       xlarge: ['xl', 'XL (Fits 46-48" chest)'],
          //       xxlarge: ['xxl', 'XXL (Fits 50-52" chest)'],
          //     },
          //   ];
          //   break;
          // case '4':
          //   mysteryBundle = [
          //     {
          //       name: 'Mystery Hoodie',
          //       price: '24.99',
          //       img: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2016/03/hoodie-510x510.jpg',
          //       sku: '85621',
          //       sizes: ['s', 'm', 'l', 'xl', 'xxl'],
          //     },
          //   ];
          //   sizes = [
          //     {
          //       small: ['s', 'S (Fits 36-38" chest)'],
          //       medium: ['m', 'M (Fits 38-40" chest)'],
          //       large: ['l', 'L (Fits 40-42" chest)'],
          //       xlarge: ['xl', 'XL (Fits 42-46" chest)'],
          //       xxlarge: ['xxl', 'XXL (Fits 46-50" chest)'],
          //     },
          //   ];
          //   break;
        }
      /**
       * @desc US Store Content
       */
      } else {
        switch (settings.VARIATION) {
          case '1':
            mysteryBundle = [
              {
                name: 'Merchoid Mega Mystery T-shirt',
                price: '8.99',
                img: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2016/01/listing-510x510.jpg',
                sku: '718291',
                sizes: ['s', 'm', 'l', 'xl'],
              },
            ];
            sizes = [
              {
                small: ['s', 'S (Fits 34-36" chest)'],
                medium: ['m', 'M (Fits 38-40" chest)'],
                large: ['l', 'L (Fits 42-44" chest)'],
                xlarge: ['xl', 'XL (Fits 46-48" chest)'],
                // xxlarge: ['xxl', 'XXL (Fits 50-52" chest)'],
              },
            ];
            break;
          case '2':
            mysteryBundle = [
              {
                name: 'Merchoid Mega Mystery T-Shirt x3 Bundle',
                price: '21.99',
                img: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2016/10/t-shirtx3-510x510.jpg',
                sku: '718311',
                sizes: ['s', 'm', 'l', 'xl'],
              },
            ];
            sizes = [
              {
                small: ['s', 'S (Fits 34-36" chest)', '718293'],
                medium: ['m', 'M (Fits 38-40" chest)', '718294'],
                large: ['l', 'L (Fits 42-44" chest)', '718295'],
                xlarge: ['xl', 'XL (Fits 46-48" chest)', '718296'],
                // xxlarge: ['xxl', 'XXL (Fits 50-52" chest)'],
              },
            ];
            break;
          // case '3':
          //   mysteryBundle = [
          //     {
          //       name: 'Mystery T-Shirt x5',
          //       price: '27.99',
          //       img: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/02/5x-510x510.png',
          //       sku: '202562',
          //       sizes: ['s', 'm', 'l', 'xl', 'xxl'],
          //     },
          //   ];
          //   sizes = [
          //     {
          //       small: ['s', 'S (Fits 34-36" chest)'],
          //       medium: ['m', 'M (Fits 38-40" chest)'],
          //       large: ['l', 'L (Fits 42-44" chest)'],
          //       xlarge: ['xl', 'XL (Fits 46-48" chest)'],
          //       xxlarge: ['xxl', 'XXL (Fits 50-52" chest)'],
          //     },
          //   ];
          //   break;
          // case '4':
          //   mysteryBundle = [
          //     {
          //       name: 'Mystery Hoodie',
          //       price: '34.99',
          //       img: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2016/03/hoodie-510x510.jpg',
          //       sku: '85621',
          //       sizes: ['s', 'm', 'l', 'xl', 'xxl'],
          //     },
          //   ];
          //   sizes = [
          //     {
          //       small: ['s', 'S (Fits 36-38" chest)'],
          //       medium: ['m', 'M (Fits 38-40" chest)'],
          //       large: ['l', 'L (Fits 40-42" chest)'],
          //       xlarge: ['xl', 'XL (Fits 42-46" chest)'],
          //       xxlarge: ['xxl', 'XXL (Fits 46-50" chest)'],
          //     },
          //   ];
          //   break;
        }
      }

      const bundleObj = mysteryBundle[0];
      const bundleSizeObj = sizes[0];

      // Gets Mystery Product SKU
      const mysterySku = bundleObj.sku;
      // Calculates Bunlde Total Price
      const bundlePrice = Math.round((productPrice + parseFloat(bundleObj.price)) * 100) / 100;

      let productSelectSizeOptions;
      let bundleSelectSizeOptions = `<option value='' selected='selected'>Select Size</option>`;
      let productSelect;
      let bundleSelect;

      /**
       * @desc Creates Select Options in Bundle
       */
      if (document.querySelector('.variations')) {
        // Select Options for Product
        productSelectSizeOptions = document.querySelector('.variations select').innerHTML;
        productSelectSizeOptions = productSelectSizeOptions.replace('Choose an option', 'Select Size');
        productSelectSizeOptions = productSelectSizeOptions.replace('selected="selected"', '');
        // Select Options for Mystery Product
        for (const key in bundleSizeObj) {
          if (bundleSizeObj.hasOwnProperty(key)) {
            const element = bundleSizeObj[key];
            bundleSelectSizeOptions = bundleSelectSizeOptions.concat(`<option value='${element[0]}' size-id='${element[2]}' class='attached enabled'>${element[1]}</option>`);
          }
        }
        productSelect = `<select id='bundle_pa_size' class='' name='attribute_pa_size' data-attribute_name='attribute_pa_size'>${productSelectSizeOptions}</select>`;
        bundleSelect = `<select id='bundle_mystery_size' class='' name='attribute_pa_size' data-attribute_name='attribute_pa_size'>${bundleSelectSizeOptions}</select>`;
      } else {
        // Select Options for Product
        productSelect = '';
        // Select Options for Mystery Product
        for (const key in bundleSizeObj) {
          if (bundleSizeObj.hasOwnProperty(key)) {
            const element = bundleSizeObj[key];
            bundleSelectSizeOptions = bundleSelectSizeOptions.concat(`<option value='${element[0]}' size-id='${element[2]}' class='attached enabled'>${element[1]}</option>`);
          }
        }
        bundleSelect = `<select id='bundle_mystery_size' class='' name='attribute_pa_size' data-attribute_name='attribute_pa_size'>${bundleSelectSizeOptions}</select>`;
      }
      /* eslint-enable */

      const bundleWrapper = `<div class='ME147-bundleWrapper'>
        <div class='row'>
          <div class='large-12 columns'>
            <div class='ME147-bundleContainer__top mobile-only-768 product-information-mobile'>
              <h2>Predictability is Boring…</h2>
              <div class='product-information__content'>
                <p>You need a little mystery in your life and thankfully for you, we’ve just the thing.</p>
                <p>T-Shirts, Jumpers and Hoodies are up for grabs.</p>
              </div>
            </div>
      <div class='ME147-bundleContainer mobile-only-768 product-information-mobile'>
        <div class='ME147-bundleProducts'>
        <div class='ME147-bundleItem bundle-product'><img src='${productImageUrl}'><p class='ME147-productName'>${productName}</p>
        ${productSelect}</div>
        <div class='ME147-bundleItem' id='ME147-plus'>+</div>
        <div class='ME147-bundleItem bundle-product'><img id='ME147-mysteryImage' src='${bundleObj.img}'><p class='ME147-productName'>${currency}${bundleObj.price} ${bundleObj.name}</p>
        ${bundleSelect}</div>
        </div>
      <div id='ME147-out-of-stock-msg'>*Size Temporarily Out of Stock</div>
      <div class='ME147-addToCart'>
        <button type='submit' class='bundle_add_to_cart_button single_add_to_cart_button button secondary'>Buy Both - ${currency}${bundlePrice}</button>
      </div>
      <div id='ME147-error-msg'><p>*Please Select Sizes</p></div>
      </div>
      </div>
      </div>
      </div>`;

      document.querySelector('.product-details.tabs-style').insertAdjacentHTML('beforebegin', bundleWrapper);

      /**
       * @desc Bundle Sizes Selection - Gets Selected sizes
       */
      let productSize = null;
      let bundleSize = null;
      let bundleSizeId = null;
      let variationId;
      // Product Select
      if (document.querySelector('.variations_form.cart')) {
        document.querySelector('select#bundle_pa_size').addEventListener('change', (e) => {
          if (document.querySelector('#ME147-error-msg.error-msg')) {
            document.querySelector('#ME147-error-msg').classList.remove('error-msg');
          }
          if (document.querySelector('#ME147-out-of-stock-msg.out-of-stock-msg')) {
            document.querySelector('#ME147-out-of-stock-msg').classList.remove('out-of-stock-msg');
          }
          const select = e.currentTarget;
          const sizeOptions = select.options;
          const selectedIndex = select.selectedIndex;// eslint-disable-line prefer-destructuring
          productSize = sizeOptions[selectedIndex].value;
          [].forEach.call(formData, (data) => {
            if (productSize === data.attributes.attribute_pa_size) {
              variationId = data.variation_id;
              if (stockData[variationId] === 0) {
                document.querySelector('#ME147-out-of-stock-msg').classList.add('out-of-stock-msg');
                productSize = null;
              }
            }
          });
        });
      }
      // Mystery Product Select
      document.querySelector('select#bundle_mystery_size').addEventListener('change', (e) => {
        if (document.querySelector('#ME147-error-msg.error-msg')) {
          document.querySelector('#ME147-error-msg').classList.remove('error-msg');
        }
        const select = e.currentTarget;
        const sizeOptions = select.options;
        const selectedIndex = select.selectedIndex;// eslint-disable-line prefer-destructuring
        bundleSize = sizeOptions[selectedIndex].value;
        bundleSizeId = sizeOptions[selectedIndex].getAttribute('size-id');
      });
      /**
       * @desc Add Event Listener on Bundle Add to Cart
       */
      /*eslint-disable */
      document.querySelector('.bundle_add_to_cart_button').addEventListener('click', () => {
        // Checks if there are two Select inputs
        if (document.querySelector('.variations_form.cart')) {
          if (productSize === null || productSize === '' || bundleSize === null || bundleSize === '') {
            document.querySelector('#ME147-error-msg').classList.add('error-msg');
          } else {
            if (settings.VARIATION === '1') {
              // Show Loader
              services.showLoader();
              // Add Bundle Product
              services.ajaxAddToCart(productSku, {
                size: productSize,
              }, () => {
                // Add Mystery Product
                services.ajaxAddToCart(bundleObj.sku, {
                  size: bundleSize,
                }, () => {
                  events.send(settings.ID, 'Clicked Buy Both button', `Variation ${settings.VARIATION}`, { sendOnce: true });
                  window.location.href = 'https://www.merchoid.com/cart/';
                });
              });
            } else if (settings.VARIATION === '2') {
              services.showLoader();
              // Add Bundle Product
              services.ajaxAddToCart(productSku, {
                size: productSize,
              }, () => {
                // Add Mystery Product x3 Bundle
                services.ajaxAddToCart(bundleObj.sku, {
                  size: bundleSize,
                  customSizeName: `bundle_attribute_pa_size_718291`,
                  extendString: `&bundle_variation_id_718291=${bundleSizeId}&bundle_quantity_718291=3`,
                }, () => {
                  events.send(settings.ID, 'Clicked Buy Both button', `Variation ${settings.VARIATION}`, { sendOnce: true });
                  window.location.href = 'https://www.merchoid.com/cart/';
                });
              });
            } else if (settings.VARIATION === '3') {
              services.showLoader();
              // Add Bundle Product
              services.ajaxAddToCart(productSku, {
                size: productSize,
              }, () => {
                // Add Mystery Product x5 Bundle
                services.ajaxAddToCart(bundleObj.sku, {
                  size: bundleSize,
                  customSizeName: `bundle_attribute_pa_size_72622`,
                  extendString: `&bundle_variation_id_72622=72623&bundle_quantity_72622=5`,
                }, () => {
                  events.send(settings.ID, 'Clicked Buy Both button', `Variation ${settings.VARIATION}`, { sendOnce: true });
                  window.location.href = 'https://www.merchoid.com/cart/';
                });
              });
            }
          }
        // If there is only one Select input for Mystery Product
        } else {
          if (bundleSize === null || bundleSize === '') {
            document.querySelector('#ME147-error-msg').classList.add('error-msg');
          } else {
            if (settings.VARIATION === '1') {
              services.showLoader();
              // Add Bundle Product
              services.ajaxAddToCart(productSku, {
              }, () => {
                // Add Mystery Product
                services.ajaxAddToCart(bundleObj.sku, {
                  size: bundleSize,
                }, () => {
                  events.send(settings.ID, 'Clicked Buy Both button', `Variation ${settings.VARIATION}`, { sendOnce: true });
                  window.location.href = 'https://www.merchoid.com/cart/';
                });
              });
            } else if (settings.VARIATION === '2') {
              // Add Bundle Product
              services.ajaxAddToCart(productSku, {
              }, () => {
                services.showLoader();
                // Add Mystery Product x3 Bundle
                services.ajaxAddToCart(bundleObj.sku, {
                  size: bundleSize,
                  customSizeName: `bundle_attribute_pa_size_72622`,
                  extendString: `&bundle_variation_id_72622=72623&bundle_quantity_72622=3`,
                }, () => {
                  events.send(settings.ID, 'Clicked Buy Both button', `Variation ${settings.VARIATION}`, { sendOnce: true });
                  window.location.href = 'https://www.merchoid.com/cart/';
                });
              });
            } else if (settings.VARIATION === '3') {
              // Add Bundle Product
              services.showLoader();
              services.ajaxAddToCart(productSku, {
              }, () => {
                // Add Mystery Product x5 Bundle
                services.ajaxAddToCart(bundleObj.sku, {
                  size: bundleSize,
                  customSizeName: `bundle_attribute_pa_size_72622`,
                  extendString: `&bundle_variation_id_72622=72623&bundle_quantity_72622=5`,
                }, () => {
                  events.send(settings.ID, 'Clicked Buy Both button', `Variation ${settings.VARIATION}`, { sendOnce: true });
                  window.location.href = 'https://www.merchoid.com/cart/';
                });
              });
            }
          }
        }
      });
      /* eslint-enable */
      /**
       * @desc Create Loader for Add to Cart, appears when the user clicks on the Mystery Bundle CTA button
       */
      const loaderContent = `<div class='ME147-loader'><p class='ME147-loadingText'>Adding to Cart...</p></div>`;// eslint-disable-line quotes
      document.querySelector('body').insertAdjacentHTML('beforeend', loaderContent);
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Shows Loader
     */
    showLoader() {
      document.querySelector('.ME147-loader').style.display = 'block';
    },
    /**
     * @description
     * @param {String} sku SKU code for product to add to cart
     * @param {Object} options Optional data (size and qty)
     * @param {Function} cb Callback
     */
    ajaxAddToCart(sku, options, cb) {
      const request = new XMLHttpRequest();
      const opts = options || {};
      request.open('POST', '/wp-admin/admin-ajax.php', true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.onload = function () { // eslint-disable-line func-names
        if (request.status >= 200 && request.status < 400) {
          cb(); // POST success
        }
      };
      // Build data string
      const data = (() => {
        let string = `add-to-cart=${sku}`;
        const sizeString = opts.customSizeName ? opts.customSizeName : 'attribute_pa_size';
        if (opts.size) {
          string += `&${sizeString}=${opts.size}`;
        }
        if (opts.qty) {
          string += `&quantity=${opts.qty}`;
        } else {
          string += '&quantity=1';
        }

        if (opts.extendString) {
          string += opts.extendString;
        }
        return string;
      })();
      // Make POST request
      request.send(data);
    },
  },

  components: {},
};

export default Experiment;
