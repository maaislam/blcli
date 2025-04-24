import { setup } from './services';
import { events, pollerLite } from '../../../../../lib/utils';
import settings from './settings';
import { addEventListener } from './winstack';
import millie from './data/millie';
import idol from './data/idol';
import jenna from './data/jenna';

const { ID, VARIATION } = settings;

let plpInterval = null;
  
const map = [
  ['#black-ln566blk', 'LN566BLK', millie],
  ['#white-fy201wht', 'FY201WHT', idol],
  ['#black-ln729blk', 'LN729BLK', jenna],
];

/**
 * Entry point post polling
 */
const activate = () => {
  /**
   * Update PDP images - thumbs, main and zoom
   */
  let winListenerAdded = false;

  const pdp = (hash, sku, images) => {
    setup();

    const init = () => {
      if(location.hash == `${hash}`) {
        events.send(settings.ID, `${settings.ID} - V${settings.VARIATION}`, 'PDP Image Shown - ' + sku);

        document.documentElement.classList.add(window.universal_variable?.product?.id || '');

        pollerLite([() => {
          return document.querySelector('.c-product-gallery__thumbnails img') ||
                      document.querySelector('.c-product-gallery__carousel--thumbnails img');
        }], () => {
          let thumbs = document.querySelector('.c-product-gallery__thumbnails');
          if(!thumbs) {
            thumbs = document.querySelector('.c-product-gallery__carousel--thumbnails');
          }

          thumbs.classList.remove('xactive');

          [].forEach.call(thumbs.querySelectorAll('.c-product-gallery__thumbnail'), (t, idx) => {
            const variantImage = images[settings.VARIATION];
            if(variantImage) {
              thumbs.classList.add('xactive');
            }

            let dataIdx = t.parentNode.getAttribute('data-index');
            if(dataIdx == null) {
              dataIdx = idx;
            }

            const img = t.querySelector('picture img');
            const source = t.querySelector('source');
            const link = t.querySelector('a');

            if(dataIdx == 4 || dataIdx == 0) {
              img.setAttribute('src', variantImage[0].small);
              source.setAttribute('srcset', variantImage[0].small);
              link.setAttribute('href', variantImage[0].small);
            }
            if(dataIdx == 5 || dataIdx == 1 || dataIdx == -3) {
              img.setAttribute('src', variantImage[1].small);
              source.setAttribute('srcset', variantImage[1].small);
              link.setAttribute('href', variantImage[1].small);
            }
            if(dataIdx == 6 || dataIdx == 2 || dataIdx == -2) {
              const img = t.querySelector('picture img');
              img.setAttribute('src', variantImage[2].small);
              source.setAttribute('srcset', variantImage[2].small);
              link.setAttribute('href', variantImage[2].small);
            }
            if(dataIdx == 7 || dataIdx == 3 || dataIdx == -1) {
              const img = t.querySelector('picture img');
              img.setAttribute('src', (variantImage[3] || variantImage[0]).small);
              source.setAttribute('srcset', (variantImage[3] || variantImage[0]).small);
              link.setAttribute('href', (variantImage[3] || variantImage[0]).small);
            }
          });
        });

        pollerLite(['.c-product-gallery__carousel--feature'], () => {
          const feature = document.querySelector('.c-product-gallery__carousel--feature');

          feature.classList.remove('xactive');

          [].forEach.call(feature.querySelectorAll('.slick-slide'), (t) => {
            const variantImage = images[settings.VARIATION];

            const img = t.querySelector('picture img');
            const source = t.querySelector('source');
            const zoom = t.querySelector('.c-product-gallery-zoom__zoomed-image');
            const zoomMap = t.querySelector('.c-product-gallery-zoom__inner-map-image');

            if(t.dataset.index == 0 || t.dataset.index == 5) {
              feature.classList.add('xactive');

              img.setAttribute('src', variantImage[0].small);
              source.setAttribute('srcset', variantImage[0].small);

              if(zoom) {
                zoom.dataset.background = settings.VARIATION + '-0';
              }
              if(zoomMap) {
                zoomMap.setAttribute('src', variantImage[0].large);
              }
            }
            if(t.dataset.index == 1 || t.dataset.index == 6) {
              img.setAttribute('src', variantImage[1].small);
              source.setAttribute('srcset', variantImage[1].small);

              if(zoom) {
                zoom.dataset.background = settings.VARIATION + '-1';
              }
              if(zoomMap) {
                zoomMap.setAttribute('src', variantImage[1].large);
              }
            }
            if(t.dataset.index == 2 || t.dataset.index == 7) {
              const img = t.querySelector('picture img');
              img.setAttribute('src', variantImage[2].small);
              source.setAttribute('srcset', variantImage[2].small);

              if(zoom) {
                zoom.dataset.background = settings.VARIATION + '-2';
              }
              if(zoomMap) {
                zoomMap.setAttribute('src', variantImage[2].large);
              }
            }
            if(t.dataset.index == 3 || t.dataset.index == 8) {
              const img = t.querySelector('picture img');
              img.setAttribute('src', variantImage[3].small);
              source.setAttribute('srcset', variantImage[3].small);

              if(zoom) {
                zoom.dataset.background = settings.VARIATION + '-3';
              }
              if(zoomMap) {
                zoomMap.setAttribute('src', variantImage[3].large);
              }
            }
          });
        });
      }
    };

    // ------------------------------------
    // Observe changes
    // + Poller checks for PLP page filtering &c.
    // ------------------------------------
    pollerLite([
      '.c-product-page__content',
    ], () => {
      const appContainer = document.querySelector('.c-product-page__content');
      if(appContainer.classList.contains('xactive')) {
        return;
      }

      let oldHref = document.location.href;
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (oldHref != document.location.href) {
            oldHref = document.location.href;

            document.body.classList.remove(ID);
            document.body.classList.remove(`${ID}-${VARIATION}`);

            setTimeout(() => {
              // -----------------------------------
              // Timeout ensures router has started to rebuild DOM container
              // and we don't fire init() too early
              // -----------------------------------

              appContainer.classList.add('xactive');

              init();
            }, 50);
          }
        });
      });

      const config = {
          childList: true,
          subtree: true
      };

      observer.observe(appContainer, config);
    });

    // -----------------------------------
    // Init on initial page load
    // -----------------------------------
    init();
    
    // -----------------------------------
    // On orientation change, we flip to the desktop
    // mode grid, so reload 
    // -----------------------------------
    if(!winListenerAdded) {
      addEventListener(window, 'orientationchange', () => location.reload());
      winListenerAdded = true;
    }
  };

  /**
   * Update PLP images - poll for existence of specific black sku
   */
  const plp = (hash, sku, images) => {
    plpInterval = setInterval(() => {
      const elm = document.querySelector(`.c-product-summary--${sku}`);
      if(elm && !elm.classList.contains('xactive')) {
        const img = elm.querySelector('picture img');
        const source = elm.querySelector('picture source');

        const variantImage = images[settings.VARIATION];

        if(img && source) {
          img.setAttribute('src', variantImage[0].small);
          source.setAttribute('srcset', variantImage[0].small);

          elm.classList.add('xactive');

          events.send(settings.ID, `${settings.ID} - V${settings.VARIATION}`, 'PLP Image Shown - ' + sku);
        }
      }
    }, 200);
  };

  if(plpInterval) {
    clearInterval(plpInterval);
  }

  if(window.location.pathname.match(/products/)) {
    map.forEach(m => {
      pdp(m[0], m[1], m[2]);
    });
  }
  if(document.querySelector('#listing-container')) {
    map.forEach(m => {
      plp(m[0], m[1], m[2]);
    });
  }
};

export default activate;
