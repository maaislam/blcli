import { fullStory, events } from '../../../../lib/utils';
import { pollerLite, observer } from '../../../../lib/uc-lib';

/**
 * {{EJ017}} - {{Test Description}}
 */
const Run = () => {
  let eventCheck = true;
  const isMobile = window.innerWidth < 1024;
  // Queue filter names here (without numbers) for when multiple of them should be clicked
  const clickQueue = [];
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'EJ017',
      VARIATION: '1',
    },

    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;

      const mainWrap = doc.getElementById('content-webnav');
      const sideBar = bodyVar.querySelector('.browse__sidebar');
      const results = bodyVar.querySelector('.browse__total-result-container').textContent.replace('Showing', '').replace('items', '').trim();

      return {
        doc,
        bodyVar,
        mainWrap,
        sideBar,
        results,
      };
    })(),

    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
      components.stickyNav();
      components.applied();
      components.checkActive();
      components.bindClicks();
      pollerLite([() => components.openMobileFilters()], () => false, { wait: 100, timeout: 8000 }); // call openMobileFilters until filters exist
    },

    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },

    components: {
      contentBuilder() {
        Exp.cache.mainWrap.insertAdjacentHTML('beforebegin', `
          <section class="EJ017_filter-wrap">
            <div class="EJ017_banner">
              <div class="EJ017_banner-background"></div>
              <div class="EJ017_banner-content">
                <h2>Diamond Engagement Rings</h2>
                <p>Showing <span id="EJ017_product-count">${Exp.cache.results}</span> Rings</p>
              </div>
            </div>
            <div class="EJ017_filter-selection container">
              <h3>Finding the perfect one</h3>
              <div class="EJ017_half-block EJ017_filter-shape">
                <h4>Select by Diamond Shape:</h4>
                <div class="EJ017_filter-options">
                  <a data-class="round" class="EJ017_filter EJ017_shape-round">
                    <img src="//service.maxymiser.net/cm/images-us/1/1/2/BE78FBE73ABEAEF04F84E3ECF56AB15385AA226D803392042C75EE8022D39E5E/ernestjones-co-uk/EJ017---Diamonds-Page-Filters/round-cut.png" alt="Round Diamond" />
                    <span class="EJ017_filter-content">Round</span>
                    <span class="EJ017_filter-hover">View all <br />Round</span>
                  </a>
                  <a data-class="oval" class="EJ017_filter EJ017_shape-oval">
                    <img src="//service.maxymiser.net/cm/images-us/1/1/2/F802C8B3DED5CE1DE976700D2EE5F730D704A437CCB00DE45DE0A050354F949C/ernestjones-co-uk/EJ017---Diamonds-Page-Filters/ovalSquare.png" alt="Oval Diamond" />
                    <span class="EJ017_filter-content">Oval</span>
                    <span class="EJ017_filter-hover">View all <br />Oval</span>
                  </a>
                  <a data-class="princess" class="EJ017_filter EJ017_shape-princess">
                    <img src="//service.maxymiser.net/cm/images-us/1/1/2/B6A98B8B7FF5A2CBD7D1CC76D0A5E5743057A9CC01FA8A95FDAB0AADC17C1D58/ernestjones-co-uk/EJ017---Diamonds-Page-Filters/princess-cut.png" alt="Princess Diamond" />
                    <span class="EJ017_filter-content">Princess</span>
                    <span class="EJ017_filter-hover">View all <br />Princess</span>
                  </a>
                  <a data-class="pear" class="EJ017_filter EJ017_shape-pear">
                    <img src="//service.maxymiser.net/cm/images-us/1/1/2/0140049A99FD3F46B2FE39BB7E5B5BE5E65432006DD46E678F9C4E0CD0C73A24/ernestjones-co-uk/EJ017---Diamonds-Page-Filters/tear-1.png" alt="Pear Diamond" />
                    <span class="EJ017_filter-content">Pear</span>
                    <span class="EJ017_filter-hover">View all <br />Pear</span>
                  </a>
                </div>
              </div>
              <div class="EJ017_half-block EJ017_filter-metal">
                <h4>Select by Metal:</h4>
                <div class="EJ017_filter-options">
                  <a data-class="white" class="EJ017_filter EJ017_metal-white">
                    <img src="//service.maxymiser.net/cm/images-us/1/1/2/C1B8357F6482601F3133A9918060DE1CE54079BD0E7C7B8ED983490340CA5A68/ernestjones-co-uk/EJ017---Diamonds-Page-Filters/white-gold-highres.png" alt="White Gold Ring" />
                    <span class="EJ017_filter-content">White Gold</span>
                    <span class="EJ017_filter-hover">View all <br />White Gold</span>
                  </a>
                  <a data-class="yellow" class="EJ017_filter EJ017_metal-yellow">
                    <img src="//service.maxymiser.net/cm/images-us/1/1/2/393C2310CAFCF4CA39ADC5BBD5C433C93ACB421C4718672B5CFA52237E496175/ernestjones-co-uk/EJ017---Diamonds-Page-Filters/yellow-gold-highres.png" alt="Yellow Gold Ring" />
                    <span class="EJ017_filter-content">Yellow Gold</span>
                    <span class="EJ017_filter-hover">View all <br />Yellow Gold</span>
                  </a>
                  <a data-class="rose" class="EJ017_filter EJ017_metal-rose">
                    <img src="//service.maxymiser.net/cm/images-us/1/1/2/DCC6DA8D6148CAB9B56182A36C7A42D913A902CC4503EA2995F23C0951BCDB93/ernestjones-co-uk/EJ017---Diamonds-Page-Filters/rose-goldhighres.png" alt="Rose Gold Ring" />
                    <span class="EJ017_filter-content">Rose Gold</span>
                    <span class="EJ017_filter-hover">View all <br />Rose Gold</span>
                  </a>
                  <a data-class="platinum" class="EJ017_filter EJ017_metal-platinum">
                    <img src="//service.maxymiser.net/cm/images-us/1/1/2/36243F5777F34941922685079B5FC47786B709FE43A2A291C522C5C50025F07B/ernestjones-co-uk/EJ017---Diamonds-Page-Filters/platinum-highres.png" alt="Platinum Ring" />
                    <span class="EJ017_filter-content">Platinum</span>
                    <span class="EJ017_filter-hover">View all <br />Platinum</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        `);

        // <a data-class="emerald" class="EJ017_filter EJ017_shape-emerald">
        //   <img src="//service.maxymiser.net/cm/images-us/1/1/2/537AB9B63D12E221CD769EC0631733040407901F95DB509D6D508C134103704B/ernestjones-co-uk/EJ017---Diamonds-Page-Filters/noun_emerald_109056_000000.png" alt="Emerald Diamond" />
        //   <span class="EJ017_filter-content">Emerald</span>
        //   <span class="EJ017_filter-hover">View all <br />Emerald</span>
        // </a>

        // <a data-class="silver" class="EJ017_filter EJ017_metal-silver">
        //   <img src="//service.maxymiser.net/cm/images-us/1/1/2/8A0A7FF76F5EF22CD45F7219B32A7FC8E55C41E79837CFDCD8DCD99D97C8E658/ernestjones-co-uk/EJ017---Diamonds-Page-Filters/silver-highres.png" alt="Silver Ring" />
        //   <span class="EJ017_filter-content">Silver</span>
        //   <span class="EJ017_filter-hover">View all <br />Silver</span>
        // </a>
      },

      stickyNav() {
        window.addEventListener('scroll', () => {
          const windowTop = window.pageYOffset;
          const windowBottom = (windowTop + window.innerHeight) - 20;
          const containerFromTop = Exp.cache.mainWrap.getBoundingClientRect().top;
          const containerOffsetFromTop = Exp.cache.mainWrap.offsetTop;
          const containerBottom = containerOffsetFromTop + Exp.cache.mainWrap.clientHeight;
          const elHeight = Exp.cache.sideBar.clientHeight;

          // 105 is equal to the sticky header height plus spacing
          if (containerFromTop < 105) {
            if (containerBottom < windowBottom) {
              Exp.cache.bodyVar.classList.add('EJ017_sticky-bottom');
              Exp.cache.bodyVar.classList.remove('EJ017_sticky');
            } else if (windowTop <= containerBottom - elHeight) {
              Exp.cache.bodyVar.classList.add('EJ017_sticky');
              Exp.cache.bodyVar.classList.remove('EJ017_sticky-bottom');
            }
          } else {
            Exp.cache.bodyVar.classList.remove('EJ017_sticky');
            Exp.cache.bodyVar.classList.remove('EJ017_sticky-bottom');
          }
        });
      },

      applied() {
        const appliedFilters = Exp.cache.bodyVar.querySelectorAll('.browse__applied-filters .browse__applied-filters__item');

        /**
         * Check if page is still relevant to experiment
         * If not, hide the new component until it is then rebind events to the filters
         */
        let isDiamond;
        let isEngagement;
        let isRings;

        [].forEach.call(appliedFilters, (item) => {
          const itemText = item.textContent.trim();
          const normalisedItemText = itemText.toLowerCase();

          if (itemText.indexOf('Diamond') > -1) {
            isDiamond = true;
          } else if (itemText.indexOf('Engagement') > -1) {
            isEngagement = true;
          } else if (itemText.indexOf('Rings') > -1) {
            isRings = true;
          } else if (normalisedItemText.indexOf('white gold') > -1) {
            item.classList.add('EJ017_btn-white');
            Exp.cache.bodyVar.querySelector('.EJ017_filter.EJ017_metal-white').classList.add('EJ017_active');
          } else if (normalisedItemText.indexOf('yellow gold') > -1) {
            item.classList.add('EJ017_btn-yellow');
            Exp.cache.bodyVar.querySelector('.EJ017_filter.EJ017_metal-yellow').classList.add('EJ017_active');
          } else if (normalisedItemText.indexOf('rose gold') > -1) {
            item.classList.add('EJ017_btn-rose');
            Exp.cache.bodyVar.querySelector('.EJ017_filter.EJ017_metal-rose').classList.add('EJ017_active');
          } else if (normalisedItemText.indexOf('platinum') > -1) {
            item.classList.add('EJ017_btn-platinum');
            Exp.cache.bodyVar.querySelector('.EJ017_filter.EJ017_metal-platinum').classList.add('EJ017_active');
          // } else if (normalisedItemText.indexOf('silver') > -1) {
          //   item.classList.add('EJ017_btn-silver');
          //   Exp.cache.bodyVar.querySelector('.EJ017_filter.EJ017_metal-silver').classList.add('EJ017_active');
          } else if (normalisedItemText.indexOf('round') > -1 && normalisedItemText.indexOf('brilliant') === -1) {
            item.classList.add('EJ017_btn-round');
            Exp.cache.bodyVar.querySelector('.EJ017_filter.EJ017_shape-round').classList.add('EJ017_active');
          } else if (normalisedItemText.indexOf('oval') > -1) {
            item.classList.add('EJ017_btn-oval');
            Exp.cache.bodyVar.querySelector('.EJ017_filter.EJ017_shape-oval').classList.add('EJ017_active');
          } else if (normalisedItemText.indexOf('princess') > -1) {
            item.classList.add('EJ017_btn-princess');
            Exp.cache.bodyVar.querySelector('.EJ017_filter.EJ017_shape-princess').classList.add('EJ017_active');
          } else if (normalisedItemText.indexOf('pear') > -1) {
            item.classList.add('EJ017_btn-pear');
            Exp.cache.bodyVar.querySelector('.EJ017_filter.EJ017_shape-pear').classList.add('EJ017_active');
          // } else if (normalisedItemText.indexOf('emerald') > -1) {
          //   item.classList.add('EJ017_btn-emerald');
          //   Exp.cache.bodyVar.querySelector('.EJ017_filter.EJ017_shape-emerald').classList.add('EJ017_active');
          }
        });

        if (!isEngagement || !isRings) {
          // Hide component if not Engagement or Rings
          Exp.cache.bodyVar.querySelector('.EJ017_filter-wrap').style.display = 'none';
        } else {
          // Show component if Engagement or Rings
          Exp.cache.bodyVar.querySelector('.EJ017_filter-wrap').style.display = 'block';
        }

        // Set hover state text
        const filters = Exp.cache.bodyVar.querySelectorAll('.EJ017_filter');
        [].forEach.call(filters, (item) => {
          const active = item.classList.contains('EJ017_active');
          const filterName = item.querySelector('.EJ017_filter-content').innerHTML.trim();
          const stateText = active ? 'Remove' : 'View all';
          const hover = item.querySelector('.EJ017_filter-hover');
          hover.innerHTML = `${stateText} <br />${filterName}`;
        });

        // Update ring count
        Exp.cache.results = Exp.cache.bodyVar.querySelector('.browse__total-result-container').textContent.replace('Showing', '').replace('items', '').trim();
        Exp.cache.bodyVar.querySelector('#EJ017_product-count').innerText = Exp.cache.results;

        // Trigger clicks on any more queued filters
        if (clickQueue.length) {
          // Wait for loader to disappear before applying new filter
          pollerLite([
            () => document.querySelector('.full-page-loader') === null,
          ], () => {
            const category = Exp.cache.bodyVar.querySelector(`#${clickQueue[0].filterCategoryID}`);
            if (category) {
              const originalFilters = category.querySelectorAll('.filters-panel__refinement-section-container .filters-panel__refinement-selector');
              [].forEach.call(originalFilters, (item) => {
                const itemText = item.textContent.trim().toLowerCase().replace(/ (.+)/, '');
                if (itemText.indexOf(clickQueue[0].filterName) > -1) {
                  const bindBtn = item.querySelector('.filters-panel__refinement-link');
                  bindBtn.click();
                }
              });
            }
            clickQueue.shift();
          });
        }
      },

      checkActive() {
        console.log('adding classes');
        const filters = isMobile ? Exp.cache.bodyVar.querySelector('#filter-modal') : Exp.cache.bodyVar.querySelector('#filters-panel');

        // Mobile filters don't exist yet, force open filters modal
        if (isMobile && !filters.querySelector('.filters-panel__refinement-link')) {
          // Open
          document.querySelector('.filter-toggle').click();
          // Close
          document.querySelector('.filters-panel__inline-button-container.mobile-and-tablet-only button[value="submit"]').click();
        }

        const filterBtns = filters.querySelectorAll('.filters-panel__refinement-section-container .filters-panel__refinement-selector');
        [].forEach.call(filterBtns, (item) => {
          const itemText = item.textContent.trim().toLowerCase();
          const bindBtn = item.querySelector('.filters-panel__refinement-link');
          let isColour;
          let isShape;
          let name;

          // Get filter name and type
          switch (true) {
            case itemText.indexOf('white gold') > -1:
              name = 'white';
              isColour = true;
              break;

            case itemText.indexOf('yellow gold') > -1:
              name = 'yellow';
              isColour = true;
              break;

            case itemText.indexOf('rose gold') > -1:
              name = 'rose';
              isColour = true;
              break;

            case itemText.indexOf('platinum') > -1:
              name = 'platinum';
              isColour = true;
              break;

            case itemText.indexOf('round') > -1 || itemText.indexOf('brilliant (round)') > -1:
              name = 'round';
              isShape = true;
              break;

            case itemText.indexOf('princess') > -1 && itemText.indexOf('pearl') === -1:
              name = 'princess';
              isShape = true;
              break;

            case itemText.indexOf('oval') > -1:
              name = 'oval';
              isShape = true;
              break;

            case itemText.indexOf('pear') > -1:
              name = 'pear';
              isShape = true;
              break;

            default:
              break;
          }

          if (name) {
            bindBtn.classList.add(`EJ017_btn-${name}`);
            bindBtn.addEventListener('click', () => {
              if (item.parentElement.classList.contains('filters-panel__sub-refinement')) {
                // Is subfilter, re-run experiment
                console.log('is subfilter');
                if (item.querySelector('.filters-panel__refinement-link').classList.contains('checked')) {
                  /**
                   * PROGRESS: Was thinking of writing something here to check if the unchecked filter
                   * is the last one in this group - if it is, remove the active class from the new filter
                   */
                  console.log('unchecking');
                  setTimeout(() => {
                    Exp.components.runBindPoller();
                  }, 2000);
                } else {
                  console.log('checking');
                  setTimeout(() => {
                    Exp.components.applied();
                    Exp.components.checkActive();
                    console.log('applied changes');
                  }, 2000);
                }
              } else {
                console.log('is NOT subfilter');
                const newFilter = Exp.cache.bodyVar.querySelector(`.EJ017_${isColour ? 'metal' : 'shape'}-${name}`);
                if (newFilter.classList.contains('EJ017_active')) {
                  newFilter.classList.remove('EJ017_active');
                } else {
                  newFilter.classList.add('EJ017_active');
                }
              }
            });
          }

          // If mobile, refresh content on click of filter
          if (!isMobile) {
            bindBtn.addEventListener('click', Exp.components.runBindPoller);
          }
        });

        if (isMobile) {
          const content = filters.querySelector('#filters-panel');
          if (content) content.classList.add('EJ017--modified');
        }

        if (Exp.cache.bodyVar.querySelector('.EJ017_btn-pear')) {
          Exp.cache.bodyVar.querySelector('.EJ017_shape-pear').classList.remove('EJ017_hide');
        } else {
          Exp.cache.bodyVar.querySelector('.EJ017_shape-pear').classList.add('EJ017_hide');
        }

        if (Exp.cache.bodyVar.querySelector('.EJ017_btn-princess')) {
          Exp.cache.bodyVar.querySelector('.EJ017_shape-princess').classList.remove('EJ017_hide');
        } else {
          Exp.cache.bodyVar.querySelector('.EJ017_shape-princess').classList.add('EJ017_hide');
        }

        if (Exp.cache.bodyVar.querySelector('.EJ017_btn-oval')) {
          Exp.cache.bodyVar.querySelector('.EJ017_shape-oval').classList.remove('EJ017_hide');
        } else {
          Exp.cache.bodyVar.querySelector('.EJ017_shape-oval').classList.add('EJ017_hide');
        }

        if (Exp.cache.bodyVar.querySelector('.EJ017_btn-round')) {
          Exp.cache.bodyVar.querySelector('.EJ017_shape-round').classList.remove('EJ017_hide');
        } else {
          Exp.cache.bodyVar.querySelector('.EJ017_shape-round').classList.add('EJ017_hide');
        }

        if (Exp.cache.bodyVar.querySelector('.EJ017_btn-white')) {
          Exp.cache.bodyVar.querySelector('.EJ017_metal-white').classList.remove('EJ017_hide');
        } else {
          Exp.cache.bodyVar.querySelector('.EJ017_metal-white').classList.add('EJ017_hide');
        }

        if (Exp.cache.bodyVar.querySelector('.EJ017_btn-yellow')) {
          Exp.cache.bodyVar.querySelector('.EJ017_metal-yellow').classList.remove('EJ017_hide');
        } else {
          Exp.cache.bodyVar.querySelector('.EJ017_metal-yellow').classList.add('EJ017_hide');
        }

        if (Exp.cache.bodyVar.querySelector('.EJ017_btn-rose')) {
          Exp.cache.bodyVar.querySelector('.EJ017_metal-rose').classList.remove('EJ017_hide');
        } else {
          Exp.cache.bodyVar.querySelector('.EJ017_metal-rose').classList.add('EJ017_hide');
        }

        if (Exp.cache.bodyVar.querySelector('.EJ017_btn-platinum')) {
          Exp.cache.bodyVar.querySelector('.EJ017_metal-platinum').classList.remove('EJ017_hide');
        } else {
          Exp.cache.bodyVar.querySelector('.EJ017_metal-platinum').classList.add('EJ017_hide');
        }
      },

      bindClicks() {
        const newFilters = Exp.cache.bodyVar.querySelectorAll('.EJ017_filter');

        [].forEach.call(newFilters, (item) => {
          item.addEventListener('click', () => {
            const filters = isMobile ? Exp.cache.bodyVar.querySelector('#filter-modal') : Exp.cache.bodyVar.querySelector('#filters-panel');
            const dataClass = item.dataset.class;
            const btn = filters.querySelectorAll(`.filters-panel__refinement-section-container > .filters-panel__refinement-selector > .filters-panel__refinement-link.EJ017_btn-${dataClass}`);

            events.send(`${Exp.settings.ID}`, 'Click', `User clicked on new filter ${dataClass}`, { sendOnce: true });
            eventCheck = false;
            if (btn.length) {
              [].forEach.call(btn, (el, idx) => {
                if (idx === 0) {
                  el.click();
                } else {
                  const filterName = el.childNodes[0].textContent.trim().toLowerCase();
                  const filterCategoryID = el.parentElement.parentElement.parentElement.id;
                  clickQueue.push({
                    filterCategoryID,
                    filterName,
                  });
                }
              });
            }
          });

          const hover = item.querySelector('.EJ017_filter-hover');
          item.addEventListener('mouseover', () => {
            hover.classList.add('EJ017_filter-hover--show');
          });

          item.addEventListener('mouseleave', () => {
            hover.classList.remove('EJ017_filter-hover--show');
          });
        });

        Exp.cache.bodyVar.addEventListener('click', (e) => {
          if (eventCheck === true) {
            if (e.target && e.target.classList && e.target.classList.contains('filters-panel__refinement-link')) {
              const text = e.target.textContent;
              events.send(`${Exp.settings.ID}`, 'Click', `User clicked on old filter ${text}`, { sendOnce: true });
            }
          } else {
            eventCheck = true;
          }

          if (e.target && e.target.classList && (e.target.classList.contains('clearRefinement') || e.target.classList.contains('cta--reset'))) {
            const currentActive = Exp.cache.bodyVar.querySelectorAll('.EJ017_filter.EJ017_active');

            [].forEach.call(currentActive, (item) => {
              item.classList.remove('EJ017_active');
            });

            Exp.components.runBindPoller();
          }
        });

        if (isMobile) {
          // Re-run when mobile filter is clicked
          const mobileFilters = Exp.cache.bodyVar.querySelector('#filter-modal');
          if (mobileFilters) {
            mobileFilters.addEventListener('click', (e) => {
              if (e.target && e.target.classList && e.target.classList.contains('filters-panel__refinement-link')) {
                Exp.components.runBindPoller();
              }
            });
          }

          // Re-run when mobile filters are opened (content is rebuilt)
          observer.connect(mobileFilters, () => {
            const content = mobileFilters.querySelector('#filters-panel');
            if (content && !content.classList.contains('EJ017--modified')) {
              Exp.components.checkActive();
            }
          }, {
            config: { attirbutes: false, childList: true, subtree: true },
          });
        }
      },

      openMobileFilters() {
        let toReturn;

        // Mobile filters don't exist yet, force open filters modal
        if (isMobile && !Exp.cache.bodyVar.querySelector('#filter-modal .filters-panel__refinement-link')) {
          // Open
          Exp.cache.bodyVar.querySelector('.filter-toggle').click();
          // Close
          Exp.cache.bodyVar.querySelector('.filters-panel__inline-button-container.mobile-and-tablet-only button[value="submit"]').click();

          // Return true if filters exist
          const filtersExist = !!document.querySelector('#filter-modal .filters-panel__refinement-section-container .filters-panel__refinement-selector');
          if (filtersExist) {
            toReturn = true;
          }
        }

        return toReturn;
      },

      runBindPoller() {
        const filterLength = Exp.cache.bodyVar.querySelectorAll('.browse__applied-filters .browse__applied-filters__item').length;
        pollerLite([
          () => {
            let trigger = false;
            if (Exp.cache.bodyVar.querySelectorAll('.browse__applied-filters .browse__applied-filters__item').length > 0 && (Exp.cache.bodyVar.querySelectorAll('.browse__applied-filters .browse__applied-filters__item').length !== filterLength)) {
              trigger = true;
            }
            return trigger;
          },
        ], () => {
          console.log('passed poller');
          Exp.components.applied();
          Exp.components.checkActive();

          // Remove all active hover states
          const activeHovers = document.querySelectorAll('.EJ017_filter-hover--show');
          for (let i = 0; i < activeHovers.length; i += 1) {
            activeHovers[i].classList.remove('EJ017_filter-hover--show');
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
