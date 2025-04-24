/**
 * PL023 - PLP Key Features Refinement
 * @author User Conversion
 */
import { setup, amendPlpElements, amendPdpElements } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  const urlPathname = window.location.pathname.toLowerCase();
  if (urlPathname.indexOf('printer') > -1) {
    pollerLite(['.content .cell', '.key-features .box'], () => {
      amendPlpElements();
    });
  } else if (urlPathname.indexOf('/product/') > -1) {
    pollerLite(['section.container.product.printer',
     'section.container.product.printer .images',
     'section.container.features', 
     '.feature-content'], () => {
      amendPdpElements();
    });
  }

  /**
   * @desc When content is reloaded, then re-run the experiment
   */
  pollerLite(['#ctl00_ctl00_pnlUpdatestaticWrapper'], () => {
    observer.connect([document.querySelector('#ctl00_ctl00_pnlUpdatestaticWrapper')], () => {
      activate();
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        nodeTree: true,
      },
    });
  });
};

export default activate;
