import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if (!document.body.classList.contains('TP144')) {
  pollerLite([
    '.price_info_holder .price_UOM',
    '.attrib',
  ], () => {
    // Check if product is labelled as a pack
    const isPack = (() => {
      let value;
      const priceLabels = document.querySelectorAll('.price_info_holder .price_UOM');

      for (let i = 0; i < priceLabels.length; i += 1) {
        const name = priceLabels[i].innerText.replace(/\s/g, ' ');
        switch (name) {
          case 'per pack':
            value = true;
            break;

          default:
            break;
        }
      }

      return value;
    })();

    // Check if 'coverage' exists in technical specs
    const hasCoverage = (() => {
      let value;
      const techSpecs = document.querySelectorAll('.attrib');

      for (let i = 0; i < techSpecs.length; i += 1) {
        const name = techSpecs[i].innerText.trim().toLowerCase();
        switch (name) {
          case 'pack coverage':
          case 'coverage':
            value = true;
            break;

          default:
            break;
        }
      }

      return value;
    })();

    if (isPack && hasCoverage) {
      activate();
    }
  });
}
