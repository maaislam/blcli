import settings from './settings';
import pubSub from './PublishSubscribe';
import mattressData from './data/mattresses';
import urlMap from './data/url-map';

/**
 * Add body classes
 *
 * @access private
 */
const addBodyClasses = () => {
  document.body.classList.add(settings.ID);

  if (settings.VARIATION > 1) {
    document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
  }
};

/**
 * Get mattress data for product
 *
 * @param {String} pathName
 * @return {Boolean|Object}
 */
const getMattressDataForProduct = (pathName) => {
  let result = false;

  const d = mattressData[pathName];
  if(d && d['Mattress Size Compatibility'] && d['Mattress Size Compatibility'] != '?') {
    result = d;
  }

  return result;
};   

/**
 * Get targeted products
 *
 * @return {Array}
 */
const productsTargeted = () => {
  let result = [];

  for(let p in mattressData) {
    if(mattressData[p]['Mattress Size Compatibility'] && mattressData[p]['Mattress Size Compatibility'] != '?') {
      result.push(p);
    }
  }

  return result;
};

export {productsTargeted};

/**
 * Helper render button markup
 *
 * @param {String} href
 * @param {String} text
 * @return {String}
 */
const getButtonMarkup = (href, text, extraClasses = '') => {
  const html = `
    <div class="mp127-btnwrap">
      <a class="mp127-btnwrap__btn btn btn-gray btn-primary ${extraClasses}" href="${href}">
        ${text}
      </a>
    </div>
  `;

  return html;
};

/**
 * Entry point for running experiment
 *
 * @access public
 */
export default () => {
  // --------------------------------------------
  // Build... only 'run' when product data available
  // for current product
  // --------------------------------------------
  const curPath = window.location.pathname;
  const productData = getMattressDataForProduct(curPath);

  if(productData) {
    // --------------------------------------------
    // Experiment is running
    // and product data exists..
    // --------------------------------------------
    pubSub.publish('experiment-init');

    // --------------------------------------------
    // Add classes to body
    // --------------------------------------------
    addBodyClasses();
    
    // --------------------------------------------
    // Add button
    // --------------------------------------------
    const compat = productData['Mattress Size Compatibility'].toLowerCase().trim();
    const detailPriceDiv = document.querySelector('.productDetail_price');
    const productMeta = document.querySelector('.productDetail > .py-3');

    let html = '';
    if(compat == 'included') {
      html = getButtonMarkup('#PDP-Details', 'Mattress Included', 'mp127-btnwrap__btn--included');

    } else {
      const targetUrl = urlMap[compat];
      if(targetUrl) {
        html = getButtonMarkup(targetUrl, 'View Compatible Mattresses', 'mp127-btnwrap__btn--link');
      }
    }

    if(html && productMeta) {
      productMeta.insertAdjacentHTML('beforebegin', html);

      pubSub.publish('did-show-button', compat);
    }

    // --------------------------------------------
    // Event listeners
    // --------------------------------------------
    const btn = document.querySelector('.mp127-btnwrap__btn');
    if(btn) {
      btn.addEventListener('click', (e) => {
        const type = e.currentTarget.classList.contains('mp127-btnwrap__btn--included') ? 'included': 'link';

        if(type == 'included') {
          e.preventDefault();

          if(window.innerWidth < 768) {
            const panel = document.querySelector('#PDP-Details .productDetailPanel');
            panel.click();
          } else {
            const details = document.querySelector('.details-product-mobile');
            if(details) {
              window.scrollTo(0, details.getBoundingClientRect().top + window.scrollY - 220);
            }
          }
        }

        pubSub.publish('did-click-button', type);
      });
    }
  }

  // --------------------------------------------
  // Bind diagnostics to window...
  //
  // We'll use these to check data or reuse it
  //
  // The targeting in platform should depend on
  // valid mattress data, which is best determined 
  // here! 
  // --------------------------------------------
  window.MP127_diagnostics = {
    products_targeted: productsTargeted,
    current_variation: settings.VARIATION,
  };
  
};
