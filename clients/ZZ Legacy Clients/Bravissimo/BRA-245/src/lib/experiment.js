import { setup } from './services';
import { events, pollerLite } from '../../../../../lib/utils';
import settings from './settings';
import { addEventListener } from './winstack';

const { ID, VARIATION } = settings;

let plpInterval = null;
  
const images = {
  1: [
    {
      small: '//images.ctfassets.net/bz0fvtkbk5r1/6NYxAZo9XEuH83PNJO7Euc/c985cf753f79c16b6ff03a5d642efa54/LN553BLK-2.jpg?q=80&w=550',
      large: '//images.ctfassets.net/bz0fvtkbk5r1/6NYxAZo9XEuH83PNJO7Euc/c985cf753f79c16b6ff03a5d642efa54/LN553BLK-2.jpg?q=80&w=1750'
    },
    {
      small: '//images.ctfassets.net/bz0fvtkbk5r1/5Ksdqt2LiVt0NKS1DLqjdo/9e38872fb15684240189cdd78ece79d4/LN553BLK-1.jpg?q=80&w=550',
      large: '//images.ctfassets.net/bz0fvtkbk5r1/5Ksdqt2LiVt0NKS1DLqjdo/9e38872fb15684240189cdd78ece79d4/LN553BLK-1.jpg?q=80&w=1750'
    },
    {
      small: '//images.ctfassets.net/bz0fvtkbk5r1/4w7SDUrKsZl9EVVmLr8v8/298f5b174cb80d395a883e78165513c9/LN553BLK-main.jpg?q=80&w=550',
      large: '//images.ctfassets.net/bz0fvtkbk5r1/4w7SDUrKsZl9EVVmLr8v8/298f5b174cb80d395a883e78165513c9/LN553BLK-main.jpg?q=80&w=1750'
    },
  ],
};

/**
 * Entry point post polling
 */
const activate = () => {
  /**
   * Update PDP images - thumbs, main and zoom
   */
  let winListenerAdded = false;

  const pdp = () => {
    setup();

    const init = () => {
      if(location.hash == '#black-ln553blk') {
        events.send(settings.ID, `${settings.ID} - V${settings.VARIATION}`, 'PDP Image Shown');

        // remove carousel pagination 3 onwards
        if(window.innerWidth < 565) {

          pollerLite(['.c-carousel-pagination'], () => {
            let carouselPaginationItems = document.querySelectorAll('.c-carousel-pagination > li');
            [].slice.call(carouselPaginationItems).forEach((paginationItem, index) => {
              if(index > 2) {
                paginationItem.remove();      
              } 
            }); 
          });

          
        } else {

          pollerLite(['.c-product-gallery__carousel--thumbnails'], () => {
            let thumbContainer = document.querySelector('.c-product-gallery__carousel--thumbnails');
            let thumbSlick = thumbContainer.querySelector('.slick-slider');
            let thumbSlickTrack = thumbContainer.querySelector('.slick-track');

            // remove thumbnail 3 onwards & any cloned nodes
            let thumbImages = thumbContainer.querySelectorAll('.slick-slide');
            let thumbIterator = 0;
            [].slice.call(thumbImages).forEach((thumbImage) => {
              if(parseInt(thumbImage.getAttribute('data-index')) < 0 || parseInt(thumbImage.getAttribute('data-index')) > 2) {
                thumbImage.remove();      
              } 
            }); 
          });

          
        }

        pollerLite(['.c-product-gallery__carousel--feature'], () => {
          const feature = document.querySelector('.c-product-gallery__carousel--feature');

          [].forEach.call(feature.querySelectorAll('.slick-slide'), (t) => {
            const variantImage = images[settings.VARIATION];

            const img = t.querySelector('picture img');
            const source = t.querySelector('source');
            const zoom = t.querySelector('.c-product-gallery-zoom__zoomed-image');
            const zoomMap = t.querySelector('.c-product-gallery-zoom__inner-map-image');

            if(t.dataset.index == 0 || t.dataset.index == 3 || t.dataset.index == 6 || t.dataset.index == 9 || t.dataset.index == 12)  {
              img.setAttribute('src', variantImage[0].small);
              source.setAttribute('srcset', variantImage[0].small);

              if(zoom) {
                zoom.dataset.background = settings.VARIATION + '-0';
              }
              if(zoomMap) {
                zoomMap.setAttribute('src', variantImage[0].large);
              }
            }
            if(t.dataset.index == 1 || t.dataset.index == 4 || t.dataset.index == 7 || t.dataset.index == 10) {
              img.setAttribute('src', variantImage[1].small);
              source.setAttribute('srcset', variantImage[1].small);

              if(zoom) {
                zoom.dataset.background = settings.VARIATION + '-1';
              }
              if(zoomMap) {
                zoomMap.setAttribute('src', variantImage[1].large);
              }
            }
            if(t.dataset.index == 2 || t.dataset.index == 5 || t.dataset.index == 8 || t.dataset.index == 11) {
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

      appContainer.classList.add('xactive');

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
  const plp = () => {
    plpInterval = setInterval(() => {
      const elm = document.querySelector('.c-product-summary--LN553BLK');
      if(elm && !elm.classList.contains('xactive')) {
        const img = elm.querySelector('picture img');
        const source = elm.querySelector('picture source');

        const variantImage = images[settings.VARIATION];

        if(img && source) {
          img.setAttribute('src', variantImage[0].small);
          source.setAttribute('srcset', variantImage[0].small);

          elm.classList.add('xactive');

          events.send(settings.ID, `${settings.ID} - V${settings.VARIATION}`, 'PLP Image Shown');
        }
      }
    }, 200);
  };

  if(plpInterval) {
    clearInterval(plpInterval);
  }

  if(window.location.pathname.match(/products/)) {
    pdp();
  }
  if(document.querySelector('#listing-container')) {
    plp();
  }
};

export default activate;
