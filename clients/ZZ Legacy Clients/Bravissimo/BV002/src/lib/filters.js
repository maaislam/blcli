import settings from './settings';
import { addPoller, addObserver } from './winstack';
import { filters, filterChildren, mapDualSizes } from './data';
import { events } from '../../../../../lib/utils';

/**
 * Parse from the URL and make a decision about prepopulating filters
 */
export const markActiveOnLoad = () => {
  const segments = window.location.search.split('&');
  segments.forEach((s) => {
    const backCupRegex = /f_size\[\]=(\d+)(\w+)/i;
    const backSizeRegex = /f_backsize\[\]=(\d+)/i;
    const cupSizeRegex = /f_cupsize\[\]=(\w+)/i;
    const sizeRegex = /f_size\[\]=([\d.-\s]+)/i;
    const clothingCurveyRegex = /f_size\[\]=(\d+)(\w*curvy)/i;

    const backCupMatches = s.match(backCupRegex);
    const backSizeMatches = s.match(backSizeRegex);
    const cupSizeMatches = s.match(cupSizeRegex);
    const sizeMatches = s.match(sizeRegex);
    const clothingCurveyMatches = s.match(clothingCurveyRegex);
    
    if(clothingCurveyMatches) {
      const clothingSize = clothingCurveyMatches[1];
      const curveySize = clothingCurveyMatches[2];

      if(clothingSize && curveySize) {
        const clothingCheckbox = document.querySelector('[data-filter="clothing-size"][data-value="' + clothingSize + '"]');
        if(clothingCheckbox) {
          clothingCheckbox.checked = true;

          clothingCheckbox.closest(`.${settings.ID}_sizeListWrap`).setAttribute('data-selected', true); 
        }

        const curveyCheckbox = document.querySelector('[data-filter="curvy-size"][data-value="' + curveySize + '"]');
        if(curveyCheckbox) {
          curveyCheckbox.checked = true;

          curveyCheckbox.closest(`.${settings.ID}_sizeListWrap`).setAttribute('data-selected', true); 
        }
      }
    } 
    
    if(backCupMatches) {
      const backSize = backCupMatches[1];
      const cupSize = backCupMatches[2];
      
      if(backSize && cupSize) {
        const backCheckbox = document.querySelector('[data-filter="back-size"][data-value="' + backSize + '"]');
        if(backCheckbox) {
          backCheckbox.checked = true;

          backCheckbox.closest(`.${settings.ID}_sizeListWrap`).setAttribute('data-selected', true); 
        }

        const cupCheckbox = document.querySelector('[data-filter="cup-size"][data-value="' + cupSize + '"]');
        if(cupCheckbox) {
          cupCheckbox.checked = true;

          cupCheckbox.closest(`.${settings.ID}_sizeListWrap`).setAttribute('data-selected', true); 
        }
      }
    } else if(backSizeMatches) {
      const backSize = backSizeMatches[1];

      const backCheckbox = document.querySelector('[data-filter="back-size"][data-value="' + backSize + '"]');
      if(backCheckbox) {
        backCheckbox.checked = true;

        backCheckbox.closest(`.${settings.ID}_sizeListWrap`).setAttribute('data-selected', true); 
      }
    } else if(cupSizeMatches) {
      const cupSize = cupSizeMatches[1];

      const cupCheckbox = document.querySelector('[data-filter="cup-size"][data-value="' + cupSize + '"]');
      if(cupCheckbox) {
        cupCheckbox.checked = true;

        cupCheckbox.closest(`.${settings.ID}_sizeListWrap`).setAttribute('data-selected', true); 
      }
    } 
    
    if(sizeMatches) {
      const size = sizeMatches[1];

      const generalCheckbox = document.querySelector('[data-filter][data-value="' + size + '"]');
      if(generalCheckbox) {
        generalCheckbox.checked = true;

        generalCheckbox.closest(`.${settings.ID}_sizeListWrap`).setAttribute('data-selected', true); 
      }
    }
  });
}

/**
 * Helper for generating items within the list
 */
const generateListItems = (val) => {
  let htmlBlock = '';
  filters.forEach(function (filterItem) {
    if (filterItem.name === val) {
      filterItem.values.forEach(function (value) {
        var cleanVal = value.toLowerCase().replace(/\s/g, '');
        htmlBlock += `
        <li class="${settings.ID}_sizeList__item">
        <input type="checkbox" name="trigger-${cleanVal}" id="trigger-${cleanVal}" data-cachedval="${cleanVal}" data-value="${cleanVal}" data-filter="${filterItem.name}">
          <label class="${settings.ID}_sizeList__label" for="trigger-${cleanVal}">${value}</label>
        </li>
        `;
      });
    }
  });
  return htmlBlock;
}

/**
 * This adds items to the facets list modal 'apply filters box'
 */
export const generateList = (option) => {
  let element;
  filterChildren.forEach(function (filterItem) {
    if (filterItem.name === option) {
      filterItem.values.forEach(function (value) {
        if (!document.querySelector(`[data-list="${value}"]`)) {
          element = document.createElement('details');
          element.classList.add(`${settings.ID}_sizeListWrap`);
          element.setAttribute('data-list', value);
          element.innerHTML = `
          <summary class="c-results-facet__header ${settings.ID}_sizeList__header">${value.toUpperCase().replace('-', ' ')}</summary>
          <ul class="${settings.ID}_sizeList">
            ${generateListItems(value)}
          </ul>
        `;
          const titles = document.querySelectorAll('.c-modal .c-results-facet .c-results-facet__title');
          titles.forEach(function (title) {
            if (title.textContent === 'Size') {
              title.closest('details').querySelector('.c-results-facet__main').insertAdjacentElement('beforebegin', element);;
            }
          });
        }

        /**
         * Add a listener to every element of the list
         */
        addListeners();
      });
    }
  });
};

/**
 * Helper add listeners to list items
 */
const addListeners = () => {
  const elements = document.querySelectorAll(`.${settings.ID}_sizeList__item`);
  let dataVal;
  let dataFilter;
  let queryString = '';
  let isSelected;
  let backSizes = [];
  let cupSizes = [];
  let clothingSizes = [];
  let curvySizes = [];

  elements.forEach(function (element) {
    element.querySelector(`.${settings.ID}_sizeList__label`).addEventListener('click', function (e) {
      e.stopPropagation();

      events.send(settings.ID, 'User clicked', 'filter');

      dataVal = e.target.parentElement.querySelector('input').getAttribute('data-value');
      dataFilter = e.target.parentElement.querySelector('input').getAttribute('data-filter');
      isSelected = e.target.closest(`.${settings.ID}_sizeListWrap`).getAttribute('[data-selected]');

      if (!isSelected) {
        e.target.closest(`.${settings.ID}_sizeListWrap`).setAttribute('data-selected', true);
        if (e.target.closest(`.${settings.ID}_sizeListWrap`).open) {
          e.target.closest(`.${settings.ID}_sizeListWrap`).open = false;
        }
      }

      setTimeout(() => {
        const sizeListWrap = e.target.closest(`.${settings.ID}_sizeListWrap`);
        if(!sizeListWrap || sizeListWrap.querySelectorAll(`.${settings.ID}_sizeList__item input[type=checkbox]:checked`).length === 0) {
          sizeListWrap.setAttribute('data-selected', false);
        }
      }, 100);
    });
  });

  closeControlFilters();
};

/**
 * Helper close control filters
 */
const closeControlFilters = () => {
  const filters = document.querySelectorAll('.c-results-facet__check');
  filters.forEach(function (filter) {
    filter.addEventListener('click', function (e) {
      const elParent = e.target.closest('.c-results-facet');
      if (elParent.open) {
        elParent.open = false;
      }
    });
  });
};

/**
 * Helper on apply button clicked...
 */
const handleInjectedButtonClick = () => {
  const trigger = document.querySelector(`.${settings.ID}_button`);
  trigger.addEventListener('click', function () {
    let queryString = '';
    let loc = window.location.href;
    let baseUrlLength = loc.split('?').length;
    let baseQueryString = loc.split('?')[1];
    let baseUrl = loc.split('?')[0];
    if (baseUrlLength > 1) {
      baseUrl += `?${baseQueryString}`;
    } else {
      baseUrl += '?limit=48&page=1&sortBy=default';
    }

    baseUrl = baseUrl.replace(/&f_(back)?(cup)?size\[\]=[^&$]+/gi, '');

    const activeOptions = document.querySelectorAll(`.${settings.ID}_sizeList__item input[type=checkbox]:checked`);
    const results = { 'cup-size': [], 'back-size': [], 'clothing-size': [], 'curvy-size': [] };

    [].forEach.call(activeOptions, (opt) => {
      const filter = opt.dataset['filter'];
      const value = opt.dataset['value'];

      if(results[filter] && value) {
        results[filter].push(value);
      }
    });

    Object.keys(results).forEach((k) => {
      const curList = results[k];

      switch (k) {
        case 'back-size':
          if(!results['cup-size'] || results['cup-size'].length === 0) {
            curList.forEach(function (item) {
              queryString += `&f_backsize[]=${item}`;
            });
          } else {
            curList.forEach(function (item) {
              let pairingList = results['cup-size'];
              pairingList.forEach(function (listItem) {
                if (queryString.indexOf(`&f_size[]=${item}${listItem}`) === -1) {
                  queryString += `&f_size[]=${item}${listItem}`;

                  if(mapDualSizes[item]) {
                    queryString += `&f_size[]=${item}${mapDualSizes[listItem]}`;
                  }
                }
              });
            });
          }
          break;
        case 'cup-size':
          if(!results['back-size'] || results['back-size'].length === 0) {
            curList.forEach(function (item) {
              queryString += `&f_cupsize[]=${item}`;
            });
          } else {
            curList.forEach(function (item) {
              let pairingList = results['back-size'];

              pairingList.forEach(function (listItem) {
                if (queryString.indexOf(`&f_size[]=${listItem}${item}`) === -1) {
                  queryString += `&f_size[]=${listItem}${item}`;

                  if(mapDualSizes[item]) {
                    queryString += `&f_size[]=${listItem}${mapDualSizes[item]}`;
                  }
                }
              });
            });
          }
          break;
        case 'clothing-size':
          if(!results['curvy-size'] || results['curvy-size'].length === 0) {
            curList.forEach(function (item) {
              queryString += `&f_size[]=${item}`;
            });
          } else {
            curList.forEach(function (item) {
              let pairingList = results['curvy-size'];
              pairingList.forEach(function (listItem) {
                if (queryString.indexOf(`&f_size[]=${item}${listItem}`) === -1) {
                  queryString += `&f_size[]=${item}${listItem}`;
                }
              });
            });
          }
          break;
        case 'curvy-size':
          if(!results['clothing-size'] || results['clothing-size'].length === 0) {
            curList.forEach(function (item) {
              queryString += `&f_size[]=${item}`;
            });
          } else {
            curList.forEach(function (item) {
              let pairingList = results['clothing-size'];
              pairingList.forEach(function (listItem) {
                if (queryString.indexOf(`&f_size[]=${listItem}${item}`) === -1) {
                  queryString += `&f_size[]=${listItem}${item}`;
                }
              });
            });
          }

          break;
        default:
          break;
      }
    });

    window.location = baseUrl + queryString;
  });
};


/**
 * Add apply button to filters
 */
export const injectApplyButton = () => {
  if (!document.querySelector(`.${settings.ID}_buttonWrap`)) {
    const buttonBlock = document.createElement('div');
    buttonBlock.classList.add(`${settings.ID}_buttonWrap`);
    buttonBlock.innerHTML = `
      <div class="${settings.ID}_button">Apply Filters</div>
    `;
    document.querySelector('.c-modal__main').insertAdjacentElement('beforeend', buttonBlock);
  }

  /**
   * By fetching the sessionStorage
   * generates a querystring based on what the user selected
   * and updates the page
   */
  handleInjectedButtonClick();
};
