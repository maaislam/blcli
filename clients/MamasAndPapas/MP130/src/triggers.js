
import activate from './lib/experiment';
// import { pollerLite } from '../../../../lib/uc-lib';

activate();

/* Local Triggers */
/* const localTriggers = () => {
  const includedSKUs = [
    'ctmc46800',
    'ctmc03300',
    'pkmc03300',
    'cbmc03300',
    'stmc46800',
    'rcmc03300',
    'stmc03300',
    'cbmc46800',
    'semc03300',
    'pkmc46800',
    'pcmc03300',
    'dcma46801',
    'wrma03300',
    'dcma03300',
    'wrma46801',
    'rcmc46800',
    'ramc03300',
    'semc46800',
    'ramc46800',
    'pcmc46800',
    'ctms03300',
    'ctms46800',
    'cbms03300',
    'pkms03300',
    'sems03300',
    'pcms46800',
    'pcms03300',
    'stms46800',
    'stms03300',
    'sems46800',
    'rams03300',
    'rcms03300',
    'crro03300',
    'cbms46800',
    'dcmad3301',
    'pkms46800',
    'rams46800',
    'rcms46800',
    'cbmsd3300',
    'wrmad3301',
    'semsd3300',
    'ramsd3300',
    '355346800',
    'dcsp98600',
    'stwh02700',
    '770502701',
    '770346800',
    'cbsp98600',
    'wrsp98600',
    'rasp98600',
    'sesp98600',
  ];
  const pageType = window.universal_variable.page.type.toLowerCase();

  const activation = {
    PLP: () => {
      const products = window.universal_variable.listing.items;
      const hasSKU = (() => {
        for (let i = 0; i < products.length; i += 1) {
          const product = products[i];
          const SKU = product.sku_code;
          if (SKU && includedSKUs.indexOf(SKU) > -1) return true;
        }
      })();
      if (hasSKU) {
        pollerLite([
          'body',
          '.productCard_mediaContainer',
        ], () => {
          activate({
            pageType: 'PLP',
            includedSKUs,
          });
        });
      }
    },

    PDP: () => {
      const SKU = window.universal_variable.product.sku_code;
      if (includedSKUs.indexOf(SKU) > -1) {
        pollerLite([
          'body',
          '.productDetail',
        ], () => {
          activate({
            pageType: 'PDP',
            includedSKUs,
          });
        });
      }
    },
  };

  switch (pageType) {
    case 'category':
      activation.PLP();
      break;

    case 'product':
      activation.PDP();
      break;

    default:
      break;
  }
};
localTriggers(); */

/* Qubit Platform Triggers */
/* eslint-disable */

/* const qubitTriggers = (options, cb) => {
  const poller = require('@qubit/poller');
  const includedSKUs = [
    'ctmc46800',
    'ctmc03300',
    'pkmc03300',
    'cbmc03300',
    'stmc46800',
    'rcmc03300',
    'stmc03300',
    'cbmc46800',
    'semc03300',
    'pkmc46800',
    'pcmc03300',
    'dcma46801',
    'wrma03300',
    'dcma03300',
    'wrma46801',
    'rcmc46800',
    'ramc03300',
    'semc46800',
    'ramc46800',
    'pcmc46800',
    'ctms03300',
    'ctms46800',
    'cbms03300',
    'pkms03300',
    'sems03300',
    'pcms46800',
    'pcms03300',
    'stms46800',
    'stms03300',
    'sems46800',
    'rams03300',
    'rcms03300',
    'crro03300',
    'cbms46800',
    'dcmad3301',
    'pkms46800',
    'rams46800',
    'rcms46800',
    'cbmsd3300',
    'wrmad3301',
    'semsd3300',
    'ramsd3300',
    '355346800',
    'dcsp98600',
    'stwh02700',
    '770502701',
    '770346800',
    'cbsp98600',
    'wrsp98600',
    'rasp98600',
    'sesp98600',
  ];
  const pageType = window.universal_variable.page.type.toLowerCase();
  const activation = {
    PLP: () => {
      const isIncludedURL = /^https?:\/\/(www\.)?mamasandpapas\.com\/[\w-]+\/c\/(cots-cribs-cotbeds|nursery-furniture|coordinating-furniture-collections|mia-17)\/?(\?.*)?(\#.*)?$/.test(window.location.href);
      if (isIncludedURL) {
        const products = window.universal_variable.listing.items;
        const hasSKU = (() => {
          for (let i = 0; i < products.length; i += 1) {
            const product = products[i];
            const SKU = product.sku_code;
            if (SKU && includedSKUs.indexOf(SKU) > -1) return true;
          }
        })();
        if (hasSKU) {
          poller([
            '.productCard_mediaContainer',
          ], () => {
            options.state.set('pageType', 'PLP');
            options.state.set('includedSKUs', includedSKUs);
            cb();
          });
        }
      }
    },

    PDP: () => {
      const SKU = window.universal_variable.product.sku_code;
      if (includedSKUs.indexOf(SKU) > -1) {
        poller([
          '.productDetail',
        ], () => {
          options.state.set('pageType', 'PDP');
          cb();
        });
      }
    },
  };

  options.getBrowserState().then(data => {
    const deviceType = data.value.ua.deviceType;
    if (deviceType === 'mobile') {
      switch (pageType) {
        case 'category':
          activation.PLP();
          break;
      
        case 'product':
          activation.PDP();
          break;
      
        default:
          break;
      }
    }
  });
}; */