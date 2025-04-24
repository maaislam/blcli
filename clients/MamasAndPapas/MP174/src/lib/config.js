import { events } from '../../../../../lib/utils';

let htmlArr = [];
let ajaxCount = 0;

export const config = {
  cot: {
    "/en-gb/mia-sleigh-convertible-cot-to-toddler-bed-ivory/p/cbms03304": {
        copy: 'This cot is designed to fit any Mamas & Papas cot bed mattress.',
        colour: 'green',
    },
    "/en-gb/mia-sleigh-convertible-cot-toddler-bed-pebble-grey/p/cbms46800": {
      copy: 'This cot is designed to fit any Mamas & Papas cot bed mattress.',
      colour: 'green',
    },
    "/en-gb/lawson-convertible-cot-toddler-bed-natural-white/p/cblwc6000": {
      copy: 'This cot is designed to fit any Mamas & Papas cot bed mattress.',
      colour: 'green',
    },
    "/en-gb/atlas-convertible-cot-toddler-bed-3-in-1-nimbus-white-wood/p/cbatay601": {
      copy: 'This cot is designed to fit any Mamas & Papas cot bed mattress.',
      colour: 'green',
    },
    "/en-gb/atlas-3-height-adjustable-cot-to-toddler-bed-pale-oak/p/cbatl5101": {
      copy: 'This cot is designed to fit any Mamas & Papas cot bed mattress.',
      colour: 'green',
    },
    "/en-gb/lucca-adjustable-cot-to-toddler-bed-ivory-oak/p/cblcy1200": {
      copy: 'This cot is designed to fit any Mamas & Papas cot bed mattress.',
      colour: 'green',
    },
    "/en-gb/lucca-3-height-adjustable-cot-to-toddler-bed-stone-grey-oak/p/cblcbb600": {
      copy: 'This cot is designed to fit any Mamas & Papas cot bed mattress.',
      colour: 'green',
    },
    "/en-gb/dover-adjustable-cot-to-toddler-bed-white/p/cbdo02700": {
      copy: 'This cot is designed to fit any Mamas & Papas cot bed mattress.',
      colour: 'green',
    },
    "/en-gb/dover-adjustable-height-cot-to-toddler-bed-grey/p/cbdo46800": {
      copy: 'This cot is designed to fit any Mamas & Papas cot bed mattress.',
      colour: 'green',
    },
    "/en-gb/franklin-convertible-cot-toddler-bed-3-in-1-white/p/cbfr02701": {
      copy: 'This cot is designed to fit any Mamas & Papas cot bed mattress.',
      colour: 'green',
    },
    "/en-gb/franklin-convertible-cot-toddler-bed-3-in-1-grey-wash/p/cbfrx6602": {
      copy: 'This cot is designed to fit any Mamas & Papas cot bed mattress.',
      colour: 'green',
    },
    "/en-gb/oxford-wooden-cot-toddler-bed-with-storage-white/p/cbox02721": {
      copy: 'This cot is designed to fit any Mamas & Papas cot bed mattress.',
      colour: 'green',
    },
    "/en-gb/brooke-pine-toddler-bed-ivory/p/tdwh02700": {
      copy: 'This cot is designed to fit any Mamas & Papas cot bed mattress.',
      colour: 'green',
    },
    "/en-gb/oxford-wooden-cot-toddler-bed-with-storage-grey/p/cbox46820": {
      copy: 'This cot is designed to fit any Mamas & Papas cot bed mattress.',
      colour: 'green',
    },
    "/en-gb/mia-sleigh-adjustable-height-cot-ivory/p/ctms03304": {
      copy: 'This cot is designed to fit any Mamas & Papas cot mattress.',
      colour: 'red',
    },
    "/en-gb/mia-sleigh-adjustable-height-cot-pebble-grey/p/ctms46804": {
      copy: 'This cot is designed to fit any Mamas & Papas cot mattress.',
      colour: 'red',
    },
    "/en-gb/dover-adjustable-height-cot-white/p/ctdo02701": {
      copy: 'This cot is designed to fit any Mamas & Papas cot mattress.',
      colour: 'red',
    },
    "/en-gb/dover-adjustable-height-cot-grey/p/ctdo46800": {
      copy: 'This cot is designed to fit any Mamas & Papas cot mattress.',
      colour: 'red',
    },
    "/en-gb/petite-compact-cot-for-baby-to-1-year-pebble-grey/p/ctpe46800": {
      copy: 'This cot is designed to fit any Mamas & Papas small cot mattress.',
      colour: 'blue',
    },
    "/en-gb/petite-compact-cot-for-baby-to-1-year-white-pine/p/ctpe02700": {
      copy: 'This cot is designed to fit any Mamas & Papas small cot mattress.',
      colour: 'blue',
    },
    "/en-gb/breeze-wooden-swinging-crib-for-baby-to-6-months-white-pine/p/crbz02700": {
      copy: 'This cot is designed to fit Mamas & Papas crib mattresses.',
      colour: 'yellow',
    },
    "/en-gb/chicco-next-2-me-crib-dream/p/612247700": {
      copy: 'Mattress included',
      colour: 'none',
    },
    "/en-gb/snuzpod-3-bedside-crib-dusk/p/264486600": {
      copy: 'Mattress included! Quilted mattress included (OEKO-Tex 100 Certified materials)',
      colour: 'none',
    },
    "/en-gb/snuzpod-3-bedside-crib-dove-grey/p/264420600": {
      copy: 'Mattress included! Quilted mattress included (OEKO-Tex 100 Certified materials)',
      colour: 'none',
    },
    "/en-gb/chicco-next2me-magic-side-sleeping-crib-cool-grey/p/3418cgg00": {
      copy: 'Mattress Included! Chicco Next 2 Me Magic mattress included ',
      colour: 'none',
    },
    "/en-gb/snuzpod-3-bedside-crib-natural/p/264402800": {
      copy: 'Mattress included! Quilted mattress included (OEKO-Tex 100 Certified materials)',
      colour: 'none',
    },
    "/en-gb/snuzpod-3-bedside-crib-white/p/264402700": {
      copy: 'Mattress included! Quilted mattress included (OEKO-Tex 100 Certified materials)',
      colour: 'none',
    },
  },
  mattress: {
    "/en-gb/silentnight-safenights-comfort-air-mattress/p/sncamcb00": {
      copy: 'Need the perfect cotbed? This mattress is designed to fit any Mamas & Papas cotbed. See compatible cotbeds.',
      colour: 'green',
    },
    "/en-gb/silentnight-safenights-luxury-wool-mattress/p/snlwmcb01": {
      copy: 'Need the perfect cotbed? This mattress is designed to fit any Mamas & Papas cotbed. See compatible cotbeds.',
      colour: 'green',
    },
    "/en-gb/essential-pocket-spring-cotbed/p/espsmcb01": {
      copy: 'Need the perfect cotbed? This mattress is designed to fit any Mamas & Papas cotbed. See compatible cotbeds.',
      colour: 'green',
    },
    "/en-gb/premium-pocket-spring-cotbed-mattress/p/prpsmcb01": {
      copy: 'Need the perfect cotbed? This mattress is designed to fit any Mamas & Papas cotbed. See compatible cotbeds.',
      colour: 'green',
    },
    "/en-gb/essential-fibre-mattress/p/esfbmcb01": {
      copy: 'Need the perfect cotbed? This mattress is designed to fit any Mamas & Papas cotbed. See compatible cotbeds.',
      colour: 'green',
    },
    "/en-gb/premium-dual-core-mattress/p/prdnmcb01": {
      copy: 'Need the perfect cotbed? This mattress is designed to fit any Mamas & Papas cotbed. See compatible cotbeds.',
      colour: 'green',
    },
    "/en-gb/luxury-twin-spring-cotbed-mattress/p/lxtwmcb01": {
      copy: 'Need the perfect cotbed? This mattress is designed to fit any Mamas & Papas cotbed. See compatible cotbeds.',
      colour: 'green',
    },
    "/en-gb/premium-pocket-spring-cot-mattress/p/prpsmmc01": {
      copy: 'Need the perfect cot? This mattress is designed to fit any Mamas & Papas cot. See compatible cots.',
      colour: 'red',
    },
    "/en-gb/essential-pocket-spring-cot-mattress/p/espsmmc01": {
      copy: 'Need the perfect cot? This mattress is designed to fit any Mamas & Papas cot. See compatible cots.',
      colour: 'red',
    },
    "/en-gb/essential-fibre-cot-mattress/p/esfbmmc01": {
      copy: 'Need the perfect cot? This mattress is designed to fit any Mamas & Papas cot. See compatible cots.',
      colour: 'red',
    },
    "/en-gb/small-fibre-cot-mattress/p/esfbmsc01": {
      copy: 'Need the perfect small cot? This mattress is designed to fit any Mamas & Papas small cot. See compatible small cots.',
      colour: 'blue',
    },
    "/en-gb/crib-fibre-mattress/p/esfbmcr01": {
      copy: 'Need the perfect crib? This mattress is designed to fit Mamas & Papas cribs. See compatible cribs.',
      colour: 'yellow'
    },
    "/en-gb/premium-pocket-spring-large-cot-mattress/p/prpsmlc01": {
      copy: '',
      colour: 'none'
    },
    "/en-gb/small-moses-mattress/p/esfbmmo01": {
      copy: '',
      colour: 'none'
    },
    "/en-gb/large-moses-mattress/p/esfbmwm01": {
      copy: '',
      colour: 'none'
    },
    "/en-gb/carry-cot-mattress/p/esfbmcc01": {
      copy: '',
      colour: 'none'
    },
  },
  ajaxProduct(url, cb) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        const data = this.response;
        const  html = document.createElement('div');
        html.insertAdjacentHTML('beforeend', data);

        const img = html.querySelector('.pdp_gallery .pdp__gallery__main #js-container > img');
        const namePrice = html.querySelector('.pdp__header');
        if (namePrice.classList.contains('pdp-mobile')) {
          namePrice.classList.remove('pdp-mobile');
        }
        
        // Build product object
        const dataObj = {
          img,
          namePrice,
          url,
        }
        
        cb(dataObj);
        
      } else {
        // We reached our target server, but it returned an error

      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
  },
  /**
   * @desc Returns an array of elements.
   * @param {String} otherCategory 
   * @param {String} colour 
   */
  fetchProducts(otherCategory, colour, fetchProductsCallback) {

    if (this[otherCategory]) {
      const otherCategoryUrlArr = this[otherCategory];
      
      if (otherCategoryUrlArr) {

        // Turn into array
        const result = Object.keys(otherCategoryUrlArr).map((key) => {
          return [key, otherCategoryUrlArr[key]];
        });
        
        // Fetch the matched colour URLS
        const colourProducts = result.map((prodArr) => {
          if (prodArr[1] && prodArr[1].colour && prodArr[1].colour == colour) {
            return prodArr[0];
          }
        });

        // Remove undefined elements
        const filteredProductUrls = colourProducts.filter((el) => {
          return el != null;
        });

        const numberOfRequests = filteredProductUrls.length;

        // Request the product details, wait 1000 ms every 3 requests
        const ajaxCallback = (objToAdd, Arr) => {
          if (objToAdd && Arr) {
            Arr.push(objToAdd);
          }

          // Call final callback if passed.

          if (ajaxCount == numberOfRequests - 1) {
            
            fetchProductsCallback(htmlArr);
          }

          ajaxCount += 1;
        };

        // Fetch the product objects
        filteredProductUrls.map((prodUrl, index) => {
          this.ajaxProduct(prodUrl, (result) => ajaxCallback(result, htmlArr));
        });


      }
    }
  },
  init(pathname, category, docRef) {
    if (!pathname || !category || !docRef) return;

    // Store other category for later.
    let otherCategory = '';
    if (category == 'cot') {
      otherCategory = 'mattress';
    } else if (category == 'mattress') {
      otherCategory = 'cot';
    } else {
      return;
    }
    
    // Get colour & copy
    if (this[category] && this[category][pathname]) {
      const thisProduct = this[category][pathname];
      const { colour } = thisProduct;
      const { copy } = thisProduct;
      

      // Fetch the oposite categories colour coded products.
      this.fetchProducts(otherCategory, colour, (productArray) => {

        // Remove loader
        const loader = document.querySelector('.MP174-loader');
        if (loader) {
          loader.parentNode.removeChild(loader);
        }

        // Build and add slider
        docRef.insertAdjacentHTML('afterend', `
        <div id="scrollTo" class="MP174-related pdp__carousel">
          <div class="title">
            <span>Compatible ${otherCategory}</span>
          </div>
          <div class="text-center" role="toolbar">
              <ul class="p-0 slick-slider" data-scroll-type="ONE_BY_ONE">
                ${productArray.map((prod) => {
                  return `
                  <li class="py-2" data-slick-index="-2" aria-hidden="true" tabindex="-1" style="width: 223px;">
                    <div class="border">
                        ${prod.img ? `<div class="image">
                            <a href="${prod.url}" class="" tabindex="-1">
                                ${prod.img.outerHTML}
                            </a>
                        </div>` : ''}
                        ${prod.namePrice ? prod.namePrice.outerHTML : ''}
                        
                        <div class="cta">
                            <a href="${prod.url}" tabindex="-1">
                                <div class="border">
                                    MORE INFO
                                </div>
                            </a>
                        </div>
                    </div>
                  </li>   
                  `;
                }).join(' ')}  
              </ul>
          </div>
        </div>
        `);

        // Check for slider
        if (document.querySelector('.MP174-related')) {
          // Get slick.
          window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
            const $slider = window.jQuery('.MP174-related ul')
            window.jQuery($slider).slick({
              arrows: true,
              slidesToShow: 2,
              dots: false,
              infinite:false,
              prevArrow: '<div class="MP174-prev relatedItems_control relatedItems_control-prev ml-3 slick-arrow" style="display: block;"><i class="ico ico-chevronLeft"></i></div>',
              nextArrow: '<div class="MP174-next relatedItems_control relatedItems_control-next mr-3 slick-arrow" style="display: block;"><i class="ico ico-chevronRight"></i></div>',
              responsive: [
                {
                  breakpoint: 479,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                  }
                },
              ],
            });

            
          });
        }
      });
      

    } else {  
      // Product not in config, bail out.
      return;
    }

  }
}