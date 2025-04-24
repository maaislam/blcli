import { fullStoryMap, eventsMap } from '../../../../../lib/utils';
import { mapPoller } from '../../../../../lib/uc-lib';

/**
 * {{FL030}} - {{Quick Size Filter Options}}
 */
const Run = (cache) => {
  eventsMap.analyticsReference = '_gaUAT';

  const doc = document;
  const bodyVar = doc.body;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL030',
      VARIATION: '1',
    },
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      bodyVar.classList.add(settings.ID);
      components.render();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStoryMap(settings.ID, `Variation ${settings.VARIATION}`);
        eventsMap.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
      isActive(el) {
        if (el.classList.contains('FL030_active')) {
          el.classList.remove('FL030_active');
        } else {
          el.classList.add('FL030_active');
        }
      },
    },
    components: {
      render() {
        // const sizeFilters = bodyVar.querySelectorAll('.productFilter .productFilterList .FilterListItem.ACSIZE');
        const URL = window.location.pathname;
        let sizes;
        let content = '';

        if (URL.indexOf('/men/clothing/underwear') > -1 || 
        URL.indexOf('/men/clothing/t-shirts') > -1 || 
        URL.indexOf('/men/clothing/sweatshirts') > -1 ||
        URL.indexOf('/men/clothing/shorts-and-swimwear') > -1 ||
        URL.indexOf('/men/clothing/shirts') > -1 ||
        URL.indexOf('/men/clothing/polo-shirts') > -1 ||
        URL.indexOf('/men/clothing/loungewear') > -1 ||
        URL.indexOf('/men/clothing/jackets-and-coats') > -1 ||
        URL.indexOf('/women/clothing/jackets-and-coats') > -1) {
          sizes = ['XS','S','M','L','XL'];
        } else if (URL.indexOf('/women/clothing/dresses') > -1 ||
        URL.indexOf('/women/clothing/jeans') > -1 ||
        URL.indexOf('/women/clothing/jumpsuits-and-playsuits') > -1 ||
        URL.indexOf('/women/clothing/knitwear') > -1 ||
        URL.indexOf('/women/clothing/shorts-and-skirts') > -1 ||
        URL.indexOf('/women/clothing/swimwear') > -1 ||
        URL.indexOf('/women/clothing/tops') > -1 ||
        URL.indexOf('/women/clothing/trousers') > -1) {
          sizes = ['6','8','10','12','14'];
        } else if (URL.indexOf('/men/clothing/trousers') > -1 ||
        URL.indexOf('/men/clothing/jeans') > -1) {
          sizes = ['30','32','34','36','38'];
        } else if (URL.indexOf('/men/clothing/suits') > -1 ||
        URL.indexOf('/men/clothing/knitwear') > -1) {
          sizes = ['S','M','L','XL','2XL'];
        } else if (URL.indexOf('/women/shoes/') > -1) {
          sizes = ['3','4','5','6','7'];
        } else if (URL.indexOf('/men/shoes/') > -1) {
          sizes = ['7','8','9','10','11'];
        } else {
          sizes = false;
        }

        if (sizes) {
          const sizeLength = sizes.length;

          for (let i = 0; i < sizeLength; i += 1) {
            const sizeFilter = bodyVar.querySelector(`.FilterName[data-filtername="${sizes[i]}"]`);

            if (sizeFilter && sizeFilter.parentNode.classList.contains('SelectedFilter')) {
              content += `<a data-filter="${sizes[i]}" class="FL030_size-link FL030_active">${sizes[i]}</a>`;
            } else if (sizeFilter) {
              content += `<a data-filter="${sizes[i]}" class="FL030_size-link">${sizes[i]}</a>`;
            }
          }

          cache.get('plpHeader').insertAdjacentHTML('afterend', `
            <div class="FL030_overflow-wrap">
              <div class="FL030_size-wrap">
                <span class="FL030_ds-info">Shop by Size</span>
                ${content}
                <a class="FL030_size-link FL030_more">MORE...</a>
              </div>
            </div>
          `);

          mapPoller([
            () => {
              let trigger = false;
              if (window.jQuery) trigger = true;
              return trigger;
            },
          ], () => {
            Exp.components.quickSizeBindings();
            Exp.services.tracking();
          });
        }
      },
      quickSizeBindings () {
        const sizeWrap = bodyVar.querySelector('.FL030_size-wrap');
        const mobMenu = doc.getElementById('filterByMob');
        const clearFilters = doc.getElementById('clrallfltrs');
        const ACSIZE = bodyVar.querySelectorAll('.FilterListItem.ACSIZE .FilterAnchor');
        const ACLength = ACSIZE.length;

        sizeWrap.addEventListener('click', (e) => {
          const target = e.target;
          const desktopSizeWrap = $(bodyVar.querySelector('.FilterListItem.ACSIZE:first-child').parentNode);
          const jBody = $('html, body');

          if (target.classList.contains('FL030_more')) {
            if (window.innerWidth < 1022) {
              mobMenu.click();
            } else {
              setTimeout(() => {
                bodyVar.querySelector('.hiddenMenuOpen').classList.add('DesktopHide');
                doc.getElementById('ToggleFiltersContainer').classList.remove('DesktopHide');
                bodyVar.querySelector('.toggleFilters').classList.add('filtersOpen');
              }, 100);
            }
            eventsMap.send(Exp.settings.ID, 'Clicked', 'More Sizes...');
          } else if (target.classList.contains('FL030_size-link')) {
            bodyVar.querySelector(`.FilterName[data-filtername="${target.getAttribute('data-filter')}"]`).parentNode.parentNode.click();
            eventsMap.send(Exp.settings.ID, 'Clicked', 'Size Option');
          }
        });

        clearFilters.addEventListener('click', () => {
          const activeQuickFilters = bodyVar.querySelectorAll('.FL030_size-link.FL030_active');
          const activeLength = activeQuickFilters.length;

          if (activeLength > 0) {
            for (let i = 0; i < activeLength; i += 1) {
              activeQuickFilters[i].classList.remove('FL030_active');
            }
          }
        });

        for (let i = 0; i < ACLength; i += 1) {
          ACSIZE[i].addEventListener('click', () => {
            const attr = ACSIZE[i].querySelector('.FilterName').getAttribute('data-filtername');
            const FL0Filter = bodyVar.querySelector(`.FL030_size-link[data-filter="${attr}"]`);

            if (FL0Filter) {
              Exp.services.isActive(FL0Filter);
            }
          });
        }
      },
    },
  };

  Exp.init();
};

export default Run;
