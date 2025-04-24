import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{FL025}} - {{Refine and Sort}}
 */
const Run = () => {
  events.analyticsReference = '_gaUAT';
  const doc = document;
  const bodyVar = doc.body;
  let $ = null;
  let slideQ = false;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL025',
      VARIATION: '1',
    },
    cache: (() => {
      const sortByLabels = bodyVar.querySelectorAll('.MobSortSelector .productFilterList label');
      const applyFilters = doc.getElementById('mobappfltrs');

      const brandObject = {
        Num: [],
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        H: [],
        I: [],
        J: [],
        K: [],
        L: [],
        M: [],
        N: [],
        O: [],
        P: [],
        Q: [],
        R: [],
        S: [],
        T: [],
        U: [],
        V: [],
        W: [],
        X: [],
        Y: [],
        Z: [],
      };

      return {
        sortByLabels,
        applyFilters,
        brandObject,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components, eventsBind, jQuery } = Exp;

      bodyVar.classList.add(settings.ID);
      components.getFilters();
      eventsBind.sortButtons();
      eventsBind.filterClick();
      eventsBind.searchFilters();
      eventsBind.searchLoops();
      jQuery.poll();
      services.tracking();

      // pollerLite(['.FL025-remove-filters'], () => {
      //   const removeFilters = document.querySelector('.FL025-remove-filters');
      //   const windowHref = window.location.href;
      //   if (removeFilters) {
      //     removeFilters.addEventListener('click', () => {
      //       if (windowHref && windowHref.match(/&OrderBy=\w+/g)) {
      //         const newHref = windowHref.replace(/&OrderBy=\w+/g, '');
      //         window.location.href = newHref;
      //       }
      //       // const sortLabels = document.querySelectorAll('.FL025_sort-label');
      //       // if (sortLabels.length) {
      //       //   for (let i = 0; sortLabels.length > i; i += 1) {
      //       //     if (sortLabels[i].classList.contains('FL025_sort-active')) {
      //       //       sortLabels[i].classList.remove('FL025_sort-active');
      //       //     }
      //       //   }
      //       // }
      //     });
      //   }
      // });
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
      isActive(element) {
        if (element.classList.contains('FL025_active')) {
          element.classList.remove('FL025_active');
        } else {
          element.classList.add('FL025_active');
        }
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      getFilters() {
        let content = '';
        const filterOptions = bodyVar.querySelectorAll('#filterlist li.productFilter');
        const filterLength = filterOptions.length;
          
        for (let i = 0; i < filterLength; i += 1) {
          const item = filterOptions[i];
          const filterName = item.querySelector('h3.productFilterTitle').textContent.trim();
          const innerFilters = item.querySelectorAll('.productFilterList .FilterListItem');
          const innerFilterLength = innerFilters.length;
          const numString = '0123456789';
          let filterContent = '';
          let filterContentTop = '';

          if (filterName === 'Brand') {
            item.classList.add('FL025_site-brands-wrap');
            let filterHasActive = '';
            let innerFilter = '';
            let activeFilters = '';
            filterContentTop += '<div class="FL025_filter-inner FL025_top-inner">';

            for (let j = 0; j < innerFilterLength; j += 1) {
              const item = innerFilters[j];
              const filterData = item.getAttribute('data-productname');
              const productAmount = item.getAttribute('data-productcount');
              const firstChar = filterData.charAt(0);
              const isActive = item.querySelector('.SelectedFilter');

              
              if (numString.indexOf(firstChar) > -1) {
                // issa Number
                if (isActive) {
                  Exp.cache.brandObject.Num.push(`${filterData},${productAmount},true`);
                } else {
                  Exp.cache.brandObject.Num.push(`${filterData},${productAmount},false`);
                }
              } else {
                // issa not quite a number but bless it, it tried its hardest
                if (isActive) {
                  Exp.cache.brandObject[firstChar].push(`${filterData},${productAmount},true`);
                } else {
                  Exp.cache.brandObject[firstChar].push(`${filterData},${productAmount},false`); 
                }
              }

              if (isActive) {
                filterHasActive = 'FL025_has-active';
                activeFilters += `<span>${filterData}</span>`;
                filterContentTop += `<a class="FL025_brand-filter FL025_active" data-productname="${filterData}" data-productcount="${productAmount}">${filterData}</a>`;
              } else {
                filterContentTop += `<a class="FL025_brand-filter" data-productname="${filterData}" data-productcount="${productAmount}">${filterData}</a>`;
              }
            }

            for (var key in Exp.cache.brandObject) {
              const objArr = Exp.cache.brandObject[key];
              const objLength = objArr.length;
              
              if (objLength > 0) {
                if (key === "Num") {
                  innerFilter += `<div class="FL025_brand-cat">0 - 9</div>`;
                } else {
                  innerFilter += `<div class="FL025_brand-cat">${key}</div>`;
                }
                objArr.sort();

                for (let k = 0; k < objLength; k += 1) {
                  const arrItem = objArr[k].split(',');
                  const name = arrItem[0];
                  const number = arrItem[1];
                  const isActive = arrItem[2];

                  if (isActive === 'true') {
                    innerFilter += `<a class="FL025_brand-filter FL025_active" data-productname="${name}" data-productcount="${number}">${name} <span data-productcount="${number}" class="FL025_extra"></span></a>`;
                  } else {
                    innerFilter += `<a class="FL025_brand-filter" data-productname="${name}" data-productcount="${number}">${name} <span data-productcount="${number}" class="FL025_extra"></span></a>`;
                  }
                }
              }
            }

            filterContent += `
              <a class="FL025_option-title ${filterHasActive} FL025_brand-section">${filterName} <span class="FL025_active-options">${activeFilters}</span></a>
              <div class="FL025_options-section FL025_brand-section">
                <a class="FL025_filter-back">Back</a>
                <h3>${filterName}</h3>
                <div class="FL025_filter-inner FL025_az-inner FL025_active">
                  ${innerFilter}
                </div>
                ${filterContentTop}
              </div>
              <div class="FL025_search-brands">
                <a class="FL025_filter-az FL025_active">A-Z</a>
                <a class="FL025_filter-top">Top Brands</a>
                <input class="FL025_search-input" type="text" placeholder="Search" />
                <a class="FL025_search-clear"></a>
              </div>
              <div class="FL025_apply_filter-wrap clearfix">
                <a class="FL025_clear_filters">Clear All</a>
                <a class="FL025_apply_filters">Apply Filters</a>
              </div>  
            `;
          } else {
            let innerFilterCont = '';
            let filterHasActive = '';
            let activeFilters = '';
            
            for (let j = 0; j < innerFilterLength; j += 1) {
              const item = innerFilters[j];
              const filterData = item.getAttribute('data-productname');
              const productAmount = item.getAttribute('data-productcount');
              const isActive = item.querySelector('.SelectedFilter');

              if (isActive) {
                filterHasActive = 'FL025_has-active';
                activeFilters += `<span>${filterData}</span>`;
                innerFilterCont += `<a class="FL025_brand-filter FL025_active" data-productname="${filterData}" data-productcount="${productAmount}">${filterData} <span class="FL025_extra"></span></a>`;
              } else {
                innerFilterCont += `<a class="FL025_brand-filter" data-productname="${filterData}" data-productcount="${productAmount}">${filterData} <span class="FL025_extra"></span></a>`;
              }
            }

            filterContent += `
              <a class="FL025_option-title ${filterHasActive}">${filterName} <span class="FL025_active-options">${activeFilters}</span></a>
              <div class="FL025_options-section">
                <a class="FL025_filter-back">Back</a>
                <h3>${filterName}</h3>
                <div class="FL025_filter-inner">
                  ${innerFilterCont}
                </div>
                <div class="FL025_apply_filter-wrap clearfix">
                  <a class="FL025_clear_filters">Clear All</a>
                  <a class="FL025_apply_filters">Apply Filters</a>
                </div>  
            `;
          }

          content += filterContent + `
            </div>`;
        }

        Exp.components.render(content);
      },
      getSortByButtons() {
        let content = '';

        [].forEach.call(Exp.cache.sortByLabels, (item, i) => {
          if (item.parentNode.classList.contains('SelectedFilter')) {
            content += `<a class="FL025_sort-label FL025_sort-active" data-filter="${i}">${item.textContent.trim()}</a>`;
          } else {
            content += `<a class="FL025_sort-label" data-filter="${i}">${item.textContent.trim()}</a>`;
          }
        });

        return content;
      },
      render(content) {
        bodyVar.insertAdjacentHTML('beforeend', `
          <div class="FL025_filter-wrap">
            <a class="FL025_refine-btn">Refine</a>
            <a class="FL025_sort-btn">Sort</a>
            <div class="FL025_sort-menu">
              ${this.getSortByButtons()}
            </div>
          </div>
          <div class="FL025_refine-menu">
            <h3>Refine</h3>
            <div class="FL025_options-wrap">
              ${content}
            </div>
            <a class="FL025_close-btn"></a>
            <div class="FL025_apply_filter-wrap clearfix">
              <a class="FL025_clear_all-filters">Clear Filters</a>
              <a class="FL025_view-prod">View Products</a>
            </div>
          </div>
        `);
      },
    },
    eventsBind: {
      sortButtons() {
        const sortWrap = bodyVar.querySelector('.FL025_sort-menu');
        const sortBtns = bodyVar.querySelectorAll('.FL025_sort-label');

        sortWrap.addEventListener('click', (e) => {
          const target = e.target;

          if (target.classList.contains('FL025_sort-label')) {
            const prevSort = bodyVar.querySelector('.FL025_sort-label.FL025_sort-active');
            const index = target.getAttribute('data-filter');

            prevSort.classList.remove('FL025_sort-active');
            target.classList.add('FL025_sort-active');
            Exp.cache.sortByLabels[index].click();
            Exp.cache.applyFilters.click();
          }
          /**
           * Add small white 'x' onto the 'SORT' CTA to remove all sort filters
           */
          // const sortCta = document.querySelector('.FL025_sort-btn');
          // if (sortCta.classList.contains('FL025_active')) {
          //   if (!document.querySelector('.FL025-remove-filters')) {
          //     sortCta.insertAdjacentHTML('beforeend', `
          //       <div class="FL025-remove-filters">
          //         <span></span>
          //         <span></span>
          //       </div>
          //     `);
          //   }
          // }
          
        });

        if (sortBtns.length) {
          for (let i = 0; sortBtns.length > i; i += 1) {
            sortBtns[i].addEventListener('click', () => {
              sortWrap.style.display = 'none';
            });
          }
        }
      },
      filterClick() {
        const optionsWrap = bodyVar.querySelector('.FL025_options-wrap');

        bodyVar.querySelector('.FL025_clear_all-filters').addEventListener('click', () => {
          Exp.eventsBind.clearFilters();
        });

        optionsWrap.addEventListener('click', (e) => {
          const target = e.target;

          if (target.classList.contains('FL025_option-title')) {
            Exp.services.isActive(target);
          } else if (target.classList.contains('FL025_brand-filter')) {
            const prodData = target.getAttribute('data-productname');
            const targetProd = document.querySelectorAll(`.FL025_brand-filter[data-productname="${prodData}"]`);
            Exp.services.isActive(targetProd[0]);
            if (targetProd[1]) {
              Exp.services.isActive(targetProd[1]);
            }
          } else if (target.parentNode.classList.contains('FL025_brand-filter')) {
            const parent = target.parentNode;
            const prodData = parent.getAttribute('data-productname');
            const targetProd = document.querySelectorAll(`.FL025_brand-filter[data-productname="${prodData}"]`);
            Exp.services.isActive(targetProd[0]);
            if (targetProd[1]) {
              Exp.services.isActive(targetProd[1]);
            }
          } else if (target.classList.contains('FL025_filter-back')) {
            const activeTab = target.parentNode.previousElementSibling;
            Exp.services.isActive(activeTab);
            Exp.eventsBind.removeSearchFilters();
          } else if (target.classList.contains('FL025_clear_filters')) {
            Exp.eventsBind.clearFilters(true, target);
          } else if (target.classList.contains('FL025_apply_filters')) {
            Exp.jQuery.applyFilters();
            Exp.jQuery.applyNonBrandFilters();
            events.send(`${Exp.settings.ID}`, 'Clicked', 'Apply Filters', { sendOnce: true });
          } else if (target.classList.contains('FL025_search-clear')) {
            Exp.eventsBind.removeSearchFilters();
          } else if (target.classList.contains('FL025_active-options')) {
            Exp.services.isActive(target.parentNode);
          } else if (target.parentNode.classList.contains('FL025_active-options')) {
            Exp.services.isActive(target.parentNode.parentNode);
          }
        });
      },
      removeSearchFilters() {
        const hiddenSearchItems = bodyVar.querySelectorAll('.FL025_brand-filter.FL025_hide');
        const searchTab = bodyVar.querySelectorAll('.FL025_searching');
        const searchInput = bodyVar.querySelector('.FL025_search-input');

        if (hiddenSearchItems.length > 0) {
          for (let i = 0; hiddenSearchItems.length > i; i += 1) {
            hiddenSearchItems[i].classList.remove('FL025_hide');
          }
        }

        if (searchTab.length > 0) {
          searchTab[0].classList.remove('FL025_searching');
          searchTab[1].classList.remove('FL025_searching');
        }

        if (searchInput) { 
          searchInput.value = '';
        }
      },
      searchFilters() {
        const filterAZBrands = bodyVar.querySelector('.FL025_filter-az');
        const filterAZInner = bodyVar.querySelector('.FL025_az-inner');

        const filterTopBrands = bodyVar.querySelector('.FL025_filter-top');
        const filterTopInner = bodyVar.querySelector('.FL025_top-inner');

        if (filterAZBrands && filterAZInner) {
          filterAZBrands.addEventListener('click', () => {
            if (!filterAZBrands.classList.contains('FL025_active')) {
              filterAZInner.classList.add('FL025_active');
              filterAZBrands.classList.add('FL025_active');
            }

            if (filterTopBrands.classList.contains('FL025_active')) {
              filterTopInner.classList.remove('FL025_active');
              filterTopBrands.classList.remove('FL025_active');
            }

            Exp.eventsBind.removeSearchFilters();
          });

          filterTopBrands.addEventListener('click', () => {
            if (!filterTopBrands.classList.contains('FL025_active')) {
              filterTopInner.classList.add('FL025_active');
              filterTopBrands.classList.add('FL025_active');
            }

            if (filterAZBrands.classList.contains('FL025_active')) {
              filterAZInner.classList.remove('FL025_active');
              filterAZBrands.classList.remove('FL025_active');
            }

            Exp.eventsBind.removeSearchFilters();
          });
        }
      },
      clearFilters(apply, clearBtn) {
        let activeBrandFilters = bodyVar.querySelectorAll('.FL025_brand-filter.FL025_active');
        let activeMirrorFilters = bodyVar.querySelectorAll('.FilterListItem .SelectedFilter[aria-checked="true"]');
        let brandWrap = bodyVar.querySelectorAll('.FL025_options-wrap .FL025_option-title');

        if (apply === true) {
          activeBrandFilters = clearBtn.parentNode.parentNode.querySelectorAll('.FL025_brand-filter.FL025_active');
          brandWrap = clearBtn.parentNode.parentNode.previousElementSibling;
          brandWrap.classList.remove('FL025_has-active');
          brandWrap.querySelector('.FL025_active-options').innerHTML = '';

          for (let j = 0; j < activeBrandFilters.length; j += 1) {
            const attr = activeBrandFilters[j].getAttribute('data-productname');
            const mirrorFilter = bodyVar.querySelector(`.FilterListItem[data-productname="${attr}"] .FilterAnchor`)

            if (mirrorFilter.querySelector('.SelectedFilter[aria-checked="true"]')) {
              mirrorFilter.click();
            }
          }
        } else {
          for (let i = 0; i < brandWrap.length; i += 1) {
            const item = brandWrap[i];
            item.classList.remove('FL025_has-active');
            item.querySelector('.FL025_active-options').innerHTML = '';
          }

          [].forEach.call(activeMirrorFilters, (item) => {
            item.click();
          });
        }

        [].forEach.call(activeBrandFilters, (item) => {
          item.classList.remove('FL025_active');
        });
      },
      stringbuilder() {
        /**
         * String rules:
         * 1. Always use the hash, as that's how the content is ajax'd
         * 2. Always starts with #dcp=1&dppp=99 (Without the Hash)
         * 3. & splits each filter
         * 4. The sort by is OrderBy=${SortOption}
         * 5. Sort by recent as default
         * 6. Remove the active filter class before building and changing the hash
         */
      },
      searchLoops() {
        let userTyping;
        const searchInput = bodyVar.querySelector('.FL025_search-input');
        if (searchInput) {
          searchInput.addEventListener('keyup', () => {
            clearTimeout(userTyping);
            userTyping = setTimeout(() => {
              Exp.eventsBind.filterSearch(searchInput, searchInput.value.trim().toUpperCase());
            }, 400);
          });
        }
      },
      filterSearch(searchInput, value) {
        const activeBrands = bodyVar.querySelector('.FL025_filter-inner.FL025_active');
        const activeBrandsResults = activeBrands.querySelectorAll('.FL025_brand-filter');
        const activeLength = activeBrandsResults.length;

        if (!value || value === '') {
          activeBrands.classList.remove('FL025_searching');
          searchInput.classList.remove('FL025_searching');

          for (let i = 0; activeLength > i; i += 1) {
            const currentItem = activeBrandsResults[i];
            currentItem.classList.remove('FL025_hide');
          }
        } else {
          activeBrands.classList.add('FL025_searching');
          searchInput.classList.add('FL025_searching');

          // loops brother
          for (let i = 0; activeLength > i; i += 1) {
            const currentItem = activeBrandsResults[i];
            const textValue = currentItem.textContent.toUpperCase();

            if (textValue.indexOf(value) === -1) {
              currentItem.classList.add('FL025_hide');
            } else {
              currentItem.classList.remove('FL025_hide');
            }
          }
        }
      },
    },
    jQuery: {
      poll() {
        pollerLite([
          () => {
            let trigger = false;
            if (window.jQuery) trigger = true;
            return trigger;
          },
        ], Exp.jQuery.init);
      },
      init() {
        $ = window.jQuery;
        Exp.jQuery.filterAnimations();
      },
      applyFilters() {
        const filterBtn = bodyVar.querySelector('.FL025_refine-btn');
        const brandActiveOptionsWrap = bodyVar.querySelector('.FL025_options-wrap .FL025_option-title.FL025_brand-section');
        const brandActiveOptions = bodyVar.querySelector('.FL025_options-wrap .FL025_option-title.FL025_brand-section .FL025_active-options');
        const activeBrandFilters = bodyVar.querySelectorAll('.FL025_az-inner .FL025_brand-filter.FL025_active');
        const activeInnerFilters = document.querySelector('.FL025_option-title.FL025_active');
        const activeSiteFilters = document.querySelectorAll('#filterlist .productFilter.FL025_site-brands-wrap .FilterListItem .FilterAnchor .SelectedFilter:not(.MobSortSelectionCheckbox)');
        const removedFilters = [];
        let brandContent = '';

        if (activeBrandFilters.length > 0) {
          brandActiveOptionsWrap.classList.add('FL025_has-active');
        } else if(brandActiveOptionsWrap) {
          brandActiveOptionsWrap.classList.remove('FL025_has-active');
        }

        if (activeBrandFilters.length <= activeSiteFilters.length) {
          for (let i = 0; i < activeSiteFilters.length; i += 1) {
            const siteName = activeSiteFilters[i].querySelector('.FilterName').getAttribute('data-filtername');
            removedFilters.push(siteName);
          }
        }

        [].forEach.call(activeBrandFilters, (item) => {
          const prodAttr = item.getAttribute('data-productname');
          const mirrorFilter = bodyVar.querySelector(`.FilterListItem[data-productname="${prodAttr}"] .FilterAnchor`);
          brandContent += `<span>${prodAttr}</span>`;

          if (!mirrorFilter.querySelector('.SelectedFilter[aria-checked="true"]')) {
            mirrorFilter.click();
          }

          if (removedFilters.length > 0 && removedFilters.indexOf(prodAttr) > -1) {
            const ind = removedFilters.indexOf(prodAttr);
            removedFilters.splice(ind, 1);
          }
        });

        if (brandActiveOptions) {
          brandActiveOptions.innerHTML = brandContent;
        }

        for (let i = 0; i < removedFilters.length; i += 1) {
          const filterToClick = bodyVar.querySelector(`.FilterListItem[data-productname="${removedFilters[i]}"] .FilterAnchor`);
          filterToClick.click();
        }
        
        if (activeInnerFilters.length > 0) {
          [].forEach.call(activeInnerFilters, (item) => {
            item.classList.remove('FL025_active');
          });
        }

        if (brandActiveOptionsWrap) {
          brandActiveOptionsWrap.classList.remove('FL025_active');
        }
        // filterBtn.click();

      },
      applyNonBrandFilters() {
        const otherFilters = bodyVar.querySelectorAll('.FL025_option-title:not(.FL025_brand-section)');
        const mirrorFilterWraps = bodyVar.querySelectorAll('#filterlist .productFilter:not(.FL025_site-brands-wrap)');
        const otherLength = otherFilters.length;

        // Nested Loops Brother
        for (let i = 0; i < otherLength; i += 1) {
          const item = otherFilters[i];
          let mirrorFilter;
          if (bodyVar.querySelector('.FL025_option-title.FL025_brand-section')) {
            mirrorFilter = mirrorFilterWraps[i];
          } else {
            mirrorFilter = mirrorFilterWraps[i];
          }
          const activeItemFilters = item.nextElementSibling.querySelectorAll('.FL025_brand-filter.FL025_active');
          const activeLength = activeItemFilters.length;
          const activeMirrorFilters = mirrorFilter.querySelectorAll('.SelectedFilter');
          const mirrorLength = activeMirrorFilters.length;
          const removedFilters = [];
          let activeContent = '';

          // If there is less filters in the current tab,
          // Make a list of already active filters from the original filters
          if (activeLength < mirrorLength) {
            for (let j = 0; j < mirrorLength; j += 1) {
              const activeAttr = activeMirrorFilters[j].querySelector('.FilterName').getAttribute('data-filtername');
              removedFilters.push(activeAttr);
            }
          }

          // Toggle preview on Refine screen
          if (activeLength > 0) {
            item.classList.add('FL025_has-active');
          } else {
            item.classList.remove('FL025_has-active');
          }

          for (let k = 0; k < activeLength; k += 1) {
            const itemActive = activeItemFilters[k];
            const itemAttr = itemActive.getAttribute('data-productname');
            const mirrorItem = mirrorFilter.querySelector(`.FilterListItem[data-productname="${itemAttr}"] .FilterAnchor`);
            activeContent += `<span>${itemAttr}</span>`;

            if (!mirrorItem.querySelector('.SelectedFilter[aria-checked="true"]')) {
              mirrorItem.click();
            }

            if (removedFilters.length > 0 && removedFilters.indexOf(itemAttr) > -1) {
              const ind = removedFilters.indexOf(itemAttr);

              removedFilters.splice(ind, 1);
            }
          }

          item.querySelector('.FL025_active-options').innerHTML = activeContent;

          for (let i = 0; i < removedFilters.length; i += 1) {
            const filterToClick = mirrorFilter.querySelector(`.FilterListItem[data-productname="${removedFilters[i]}"] .FilterAnchor`);
            filterToClick.click();
          }

          item.classList.remove('FL025_active');
        }
      },
      filterAnimations() {
        const sortBtn = bodyVar.querySelector('.FL025_sort-btn');
        const $sortMenu = $('.FL025_sort-menu');
        const filterBtn = bodyVar.querySelector('.FL025_refine-btn');
        const closeBtn = bodyVar.querySelector('.FL025_refine-menu .FL025_close-btn');
        const refineMenu = bodyVar.querySelector('.FL025_refine-menu');
        const $refineMenu = $(refineMenu);
        const menuBtn = doc.getElementById('trigger');
        const filterWrap = $('.FL025_filter-wrap');
        const menuClose = bodyVar.querySelector('.MenuCloseActive');
        const miniBag = doc.getElementById('divBagTotalLink');

        sortBtn.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Sort Button on PLP', { sendOnce: true });
          if (slideQ === false) {
            slideQ = true;
            if (sortBtn.classList.contains('FL025_active')) {
              sortBtn.classList.remove('FL025_active');
              $sortMenu.fadeOut(() => {
                slideQ = false;
              });
            } else {
              sortBtn.classList.add('FL025_active');
              $sortMenu.fadeIn(() => {
                slideQ = false;
              });
            }
          }
        });

        filterBtn.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Refine Button on PLP', { sendOnce: true });
          if (slideQ === false) {
            slideQ = true;
            if (filterBtn.classList.contains('FL025_active')) {
              filterBtn.classList.remove('FL025_active');
              $refineMenu.fadeOut(() => {
                slideQ = false;
              });
            } else {
              filterBtn.classList.add('FL025_active');
              $refineMenu.fadeIn(() => {
                slideQ = false;
              });
            }

            // Hide sort menu if open
            if (sortBtn.classList.contains('FL025_active')) {
              sortBtn.classList.remove('FL025_active');
              $sortMenu.fadeOut(() => {
                slideQ = false;
              });
            }
          }
        });

        bodyVar.querySelector('.FL025_view-prod').addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'View Products', { sendOnce: true });
          closeBtn.click();
        });

        closeBtn.addEventListener('click', () => {
          const activeInnerFilters = document.querySelectorAll('.FL025_option-title.FL025_active');

          if (activeInnerFilters.length > 0) {
            setTimeout(() => {
              [].forEach.call(activeInnerFilters, (item) => {
                item.classList.remove('FL025_active');
              });
            }, 400);
          }

          Exp.eventsBind.removeSearchFilters();
          filterBtn.click();
        });

        menuBtn.addEventListener('click', () => {
          if ($refineMenu.is(':visible')) {
            slideQ = true;
            $refineMenu.fadeOut(() => {
              slideQ = false;
              filterBtn.classList.remove('FL025_active');
              if (bodyVar.querySelector('.FL025_option-title.FL025_active')) {
                bodyVar.querySelector('.FL025_option-title.FL025_active').classList.remove('FL025_active');
              }
              Exp.eventsBind.removeSearchFilters();
            });
          }

          filterWrap.fadeOut(250);
        });

        menuClose.addEventListener('click', () => {
          setTimeout(() => {
            filterWrap.fadeIn(250);
          }, 450);
        });

        pollerLite([
          () => {
            let trigger = false;
            if (window.jQuery) trigger = true;
            return trigger;
          },
        ], () => {
          miniBag.addEventListener('click', () => {
            setTimeout(() => {
              filterWrap.fadeIn(250);
            }, 450);
          });
        });
      },
    }
  };

  Exp.init();
};

export default Run;
