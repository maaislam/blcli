import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  /*eslint-disable */
  // () => {
  //   const pages = ['/en-gb/bugaboo-fox-pushchair-in-black-with-black-frame/p/781825302',
  //     '/en-gb/bugaboo-fox-pushchair-in-neon-red-with-aluminium-frame/p/781887f02',
  //     '/en-gb/bugaboo-fox-pushchair-in-fresh-white-with-black-frame/p/781888f00',
  //     '/en-gb/bugaboo-fox-pushchair-in-birds-with-black-frame/p/781888d00',
  //     '/en-gb/bugaboo-fox-pushchair-in-grey-melange-with-black-frame/p/7818u7702',
  //     '/en-gb/bugaboo-fox-pushchair-in-blue-melange-with-black-frame/p/7818h0402',
  //     '/en-gb/gb-maris-2-city-pushchair-silver-fox-grey/p/82468w900',
  //     '/en-gb/joolz-geo-earth-mono-hippo-grey/p/5939x7700',
  //     '/en-gb/bugaboo-cameleon-classic-collection-v2-navy/p/302625201',
  //     '/en-gb/bugaboo-cameleon-limited-edition-classic-all-in-one-pushchair-grey/p/3026u7700',
  //     '/en-gb/cybex-priam-trekking-with-lux-seat-autumn-gold/p/5398p7700',
  //     '/en-gb/joolz-day2-earth-pushchair-hippo-grey/p/5847x7700',
  //     '/en-gb/joolz-day2-earth-pushchair-parrot-blue/p/5847t0400',
  //     '/en-gb/bugaboo-beesup5sup-complete-sunrise-yellow/p/5934bk100',
  //     '/en-gb/bugaboo-beesup5sup-complete-grey-melange/p/5934u7700',
  //     '/en-gb/joolz-day-earth-footmuff-hippo-grey/p/6085x7700',
  //     '/en-gb/joolz-day-earth-footmuff-parrot-blue/p/6085t0400',
  //     '/en-gb/joolz-geo2-earth-mono-footmuff-hippo-grey/p/6088x7700',
  //     '/en-gb/joolz-geo-earth-mono-footmuff-parrot-blue/p/6088t0400',
  //     '/en-gb/bugaboo-fox-pushchair-in-grey-melange-with-aluminium-frame/p/7818u7701',
  //     '/en-gb/bugaboo-fox-pushchair-in-blue-melange-with-aluminium-frame/p/7818h0401',
  //     '/en-gb/bugaboo-fox-pushchair-in-black-with-aluminium-frame/p/781825301',
  //     '/en-gb/bugaboo-fox-pushchair-in-yellow-with-black-frame/p/7818bk100',
  //   ];

  //   if (window && window.universal_variable && window.universal_variable.product && window.universal_variable.product.url) {
  //     const currentPageUrl = window.universal_variable.product.url;
  //     for (let i = 0; i < pages.length; i += 1) {
  //       if (currentPageUrl.indexOf(pages[i]) > -1) {
  //         return true;
  //       }
  //     }
  //   }
  // },
  /* eslint-enable */
], Experiment.init);
