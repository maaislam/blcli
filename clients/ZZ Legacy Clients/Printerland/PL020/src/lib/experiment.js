/**
 * PL020 - PLP - Desktop Redesign
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

const activate = () => {
  let url = window.location.href;
  if (url.indexOf('?layout=list') === -1) {
    url += '?layout=list';
    window.location.href = url;
  } else {
    setup();
    // Experiment code
    const products = document.querySelectorAll('.grid.list-view .cell');
    [].forEach.call(products, (product) => {
      const pricingContainer = product.querySelector('.pricing-container');
      const compare = product.querySelector('div.compare');

      pricingContainer.insertAdjacentElement('afterbegin', compare);

      const compareLabel = compare.querySelector('strong.small.text-info');
      compare.insertAdjacentElement('afterbegin', compareLabel);
    });
    
    observer.connect([document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlProductList .cell section'), document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_updateProducts')], () => {
      const products = document.querySelectorAll('.grid.list-view .cell');
      [].forEach.call(products, (product) => {
        const pricingContainer = product.querySelector('.pricing-container');
        const compare = product.querySelector('div.compare');
  
        pricingContainer.insertAdjacentElement('afterbegin', compare);
  
        const compareLabel = compare.querySelector('strong.small.text-info');
        compare.insertAdjacentElement('afterbegin', compareLabel);
      });
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        nodeTree: true,
      },
    });
  }
};

export default activate;
