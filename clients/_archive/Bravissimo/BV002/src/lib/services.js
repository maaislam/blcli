import {
  fullStory
} from '../../../../../lib/utils';
import {
  filterChildren,
  filters
} from '../data/filters';
import settings from './settings';
import {
  events
} from '../../../../../lib/utils';
const {
  ID,
  VARIATION
} = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function removeDoubles() {
  if (document.querySelector('.c-modal__main .c-results-facet__tokens')) {
    document.querySelector('.c-modal__main .c-results-facet__tokens').remove();
  }
}

function updatePage(url) {
  /**
   * Loop through the remaining filters to generate a new querystring
   * also checks if there are colours and mantains them into the query
   */
  const tokens = document.querySelectorAll(`.${ID}_trigger`);
  const coloursArray = [
    'acqua',
    'black',
    'blue',
    'bronze',
    'brown',
    'cream',
    'gold',
    'green',
    'grey',
    'ivory',
    'multi',
    'nude',
    'orange',
    'pink',
    'print',
    'pourple',
    'red',
    'silver',
    'turquoise',
    'white',
    'yellow'
  ];
  let queryString;
  let content;
  let loc = window.location.href;
  let baseUrl;
  baseUrl = loc.split('?')[0];
  baseUrl += '?limit=48&page=1&sortBy=default';
  tokens.forEach(function (token) {
    content = token.parentElement.querySelector('.c-facet-token__label').textContent.toLowerCase().trim();
    if (coloursArray.indexOf(content) > -1) {
      queryString = `&f_colour[]=${content}`;
    } else {
      queryString = `&f_size[]=${content}`;
    }
    baseUrl += queryString;
  });
  window.location = url;
}

function addFilterAction() {
  const curvyRef = ['curvy', 'reallycurvy', 'supercurvy'];
  const tokens = document.querySelectorAll(`.${ID}_trigger`);
  tokens.forEach(function (token) {
    token.addEventListener('click', (e) => {
      const parentEl = e.target.closest('.c-facet-token');
      const elRef = parentEl.querySelector('.c-facet-token__label').textContent.trim().replace(/\s/g, '').toLowerCase();
      const reg = /(\d+)(.+)/;
      const match = reg.exec(elRef);
      let number;
      let letter;
      if (match) {
        number = match[1];
        letter = match[2];
      }
      let cache;
      curvyRef.forEach(function (el) {
        if (letter === el) {
          document.querySelector(`[data-value="${letter}"]`).click();
          cache = JSON.parse(sessionStorage.getItem('curvysizes'));
          if (cache) {
            cache.forEach(function (el, i) {
              if (el === letter) {
                cache.splice(i, 1);
                sessionStorage.setItem('curvysizes', JSON.stringify(cache));
              }
            });
          }
        } else if (match) {
          document.querySelector(`[data-value="${number}"]`).click();
          cache = ['backsizes', 'clothingsizes'];
          cache.forEach(function (cacheEl) {
            let curCacheEl = JSON.parse(sessionStorage.getItem(cacheEl));
            if (curCacheEl) {
              curCacheEl.forEach(function (el, i) {
                if (el === number) {
                  curCacheEl.splice(i, 1);
                  sessionStorage.setItem(cacheEl, JSON.stringify(curCacheEl));
                }
              });
            }
          });
          document.querySelector(`[data-value="${letter}"]`).click();
          cache = JSON.parse(sessionStorage.getItem('cupsizes'));
          if (cache) {
            cache.forEach(function (el, i) {
              if (el === letter) {
                cache.splice(i, 1);
                sessionStorage.setItem('cupsizes', JSON.stringify(cache));
              }
            });
          }
        }
      });
      let urlToClean;
      let newUrl;
      if (sessionStorage.getItem('updatedUrl')) {
        urlToClean = JSON.parse(sessionStorage.getItem('updatedUrl'));
      } else {
        urlToClean = window.location.href;
        sessionStorage.setItem('updatedUrl', JSON.stringify(urlToClean));
      }
      const queriesArray = [
        '&f_size[]=', 
        '&f_cupsize[]=', 
        '&f_colour[]=', 
        '&f_backsize[]=', 
        '&f_curvysize[]=', 
        '&f_type[]=', 
        '&f_brand[]=', 
        '&f_brieftype[]=', 
        '&f_category[]='
      ];
      queriesArray.forEach(function(queryParameter){
        if(urlToClean.indexOf(queryParameter + elRef) > -1){
          newUrl = urlToClean.replace(queryParameter + elRef, '');
          sessionStorage.setItem('updatedUrl', JSON.stringify(newUrl));
        }
      });
      e.target.parentElement.remove();
      /**
       * There are other filters directly injected by react into the modal
       * to avoind errors we remove those and
       * we keep only the one displayed directly into the page
       */
      removeDoubles();
      updatePage(JSON.parse(sessionStorage.getItem('updatedUrl')));
      events.send(ID, 'User clicked', 'apply-filters');
    });
  });
}

function modifyFilter() {
  const tokens = document.querySelectorAll('.c-results__main .c-results-facets .c-facet-token');
  if (tokens) {
    tokens.forEach((token) => {
      if (!token.querySelector(`.${ID}_trigger`)) {
        const element = document.createElement('div');
        element.classList.add('c-facet-token__action');
        element.classList.add(`${ID}_trigger`);
        element.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 200 200" role="img" data-reactid="954"><path d="M182 42c8-8 8-20 2-26s-18-6-26 2l-58 58-58-58c-8-8-20-8-26-2s-6 18 2 26l58 58-58 58c-8 8-8 20-2 26s18 6 26-2l58-58 58 58c8 8 20 8 26 2s6-18-2-26l-58-58 58-58z" data-reactid="955"></path></svg>
        `;
        token.querySelector('.c-facet-token__label').insertAdjacentElement('afterend', element);
      }
    });
    addFilterAction();
  }
}

function reloadPage() {
  const lists = [
    'backsizes',
    'cupsizes',
    'clothingsizes',
    'curvysizes',
  ];
  const trigger = document.querySelector(`.${ID}_button`);
  trigger.addEventListener('click', function () {
    let curList;
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
    lists.forEach(function (list) {
      if (sessionStorage.getItem(list)) {
        /**
         * checks if there is a matching element for each category
         * Example:
         * If you select only a backsize and you apply the filters, you will see loads of products
         * injected by react or vue that match for example 28, same for cupsize if you only select d or dd
         * once processed you will get:
         * if backsize alone -> &f_backsize[]=28
         * if cupsize alone -> &f_cupsize[]=dd
         * --------
         * If you select both of them, I will generate a querystring for each of the sizes selected.
         * Example:
         * sessionStorage contains {
         *  backsize: ['28']
         *  cupsize: ['d', 'dd']
         * }
         * you will get &f_size[]=28d&f_size[]=28dd
         * --------
         * I check for each cicle if into the querystring there is still a reference to the string
         * that is being created, if not, i push it, otherwise go on.
         */
        switch (list) {
          case 'backsizes':
            if (!sessionStorage.getItem('cupsizes') || sessionStorage.getItem('cupsizes').length === 0) {
              curList = JSON.parse(sessionStorage.getItem(list));
              curList.forEach(function (item) {
                queryString += `&f_backsize[]=${item}`;
              });
            } else {
              curList = JSON.parse(sessionStorage.getItem(list));
              curList.forEach(function (item) {
                let pairingList = JSON.parse(sessionStorage.getItem('cupsizes'));
                pairingList.forEach(function (listItem) {
                  if (queryString.indexOf(`&f_size[]=${item}${listItem}`) === -1) {
                    queryString += `&f_size[]=${item}${listItem}`;
                  }
                });
              });
            }
            break;
          case 'cupsizes':
            if (!sessionStorage.getItem('backsizes') || sessionStorage.getItem('backsizes').length === 0) {
              curList = JSON.parse(sessionStorage.getItem(list));
              curList.forEach(function (item) {
                queryString += `&f_cupsize[]=${item}`;
              });
            } else {
              curList = JSON.parse(sessionStorage.getItem(list));
              curList.forEach(function (item) {
                let pairingList = JSON.parse(sessionStorage.getItem('backsizes'));
                pairingList.forEach(function (listItem) {
                  if (queryString.indexOf(`&f_size[]=${listItem}${item}`) === -1) {
                    queryString += `&f_size[]=${listItem}${item}`;
                  }
                });
              });
            }
            break;
          case 'clothingsizes':
            if (!sessionStorage.getItem('curvysizes') || sessionStorage.getItem('curvysizes').length === 0) {
              curList = JSON.parse(sessionStorage.getItem(list));
              curList.forEach(function (item) {
                queryString += `&f_size[]=${item}`;
              });
            } else {
              curList = JSON.parse(sessionStorage.getItem(list));
              curList.forEach(function (item) {
                let pairingList = JSON.parse(sessionStorage.getItem('curvysizes'));
                pairingList.forEach(function (listItem) {
                  if (queryString.indexOf(`&f_size[]=${item}${listItem}`) === -1) {
                    queryString += `&f_size[]=${item}${listItem}`;
                  }
                });
              });
            }
            break;
          case 'curvysizes':
            if (!sessionStorage.getItem('clothingsizes') || sessionStorage.getItem('clothingsizes').length === 0) {
              curList = JSON.parse(sessionStorage.getItem(list));
              curList.forEach(function (item) {
                queryString += `&f_size[]=${item}`;
              });
            } else {
              curList = JSON.parse(sessionStorage.getItem(list));
              curList.forEach(function (item) {
                let pairingList = JSON.parse(sessionStorage.getItem('clothingsizes'));
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
      }
    });
    window.location = baseUrl + queryString;
  });
}

function injectApplyButton() {
  if (!document.querySelector(`.${ID}_buttonWrap`)) {
    const buttonBlock = document.createElement('div');
    buttonBlock.classList.add(`${ID}_buttonWrap`);
    buttonBlock.innerHTML = `
      <div class="${ID}_button">Apply Filters</div>
    `;
    document.querySelector('.c-modal__main').insertAdjacentElement('beforeend', buttonBlock);
  }
  /**
   * By fetching the sessionStorage
   * generates a querystring based on what the user selected
   * and updates the page
   */
  reloadPage();
}

function closeControlFilters() {
  const filters = document.querySelectorAll('.c-results-facet__check');
  filters.forEach(function (filter) {
    filter.addEventListener('click', function (e) {
      const elParent = e.target.closest('.c-results-facet');
      if (elParent.open) {
        elParent.open = false;
      }
    });
  });
}

function addListeners() {
  const elements = document.querySelectorAll(`.${ID}_sizeList__item`);
  const cachedBackSize = JSON.parse(sessionStorage.getItem('backsizes'));
  const cachedCupSize = JSON.parse(sessionStorage.getItem('cupsizes'));
  const cachedClothingSize = JSON.parse(sessionStorage.getItem('clothingsizes'));
  const cachedCurvySize = JSON.parse(sessionStorage.getItem('curvysizes'));
  let dataVal;
  let dataFilter;
  let queryString = '';
  let isSelected;
  let backSizes = [];
  let cupSizes = [];
  let clothingSizes = [];
  let curvySizes = [];
  if (cachedBackSize) {
    [].forEach.call(cachedBackSize, function (item) {
      backSizes.push(item);
    });
  }
  if (cachedCupSize) {
    [].forEach.call(cachedCupSize, function (item) {
      cupSizes.push(item);
    });
  }
  if (cachedClothingSize) {
    [].forEach.call(cachedClothingSize, function (item) {
      clothingSizes.push(item);
    });
  }
  if (cachedCurvySize) {
    [].forEach.call(cachedCurvySize, function (item) {
      curvySizes.push(item);
    });
  }
  elements.forEach(function (element) {
    element.querySelector(`.${ID}_sizeList__label`).addEventListener('click', function (e) {
      events.send(ID, 'User clicked', 'filter');
      dataVal = e.target.parentElement.querySelector('input').getAttribute('data-value');
      dataFilter = e.target.parentElement.querySelector('input').getAttribute('data-filter');
      isSelected = e.target.closest(`.${ID}_sizeListWrap`).getAttribute('[data-selected]');
      if (!isSelected) {
        e.target.closest(`.${ID}_sizeListWrap`).setAttribute('data-selected', true);
        if (e.target.closest(`.${ID}_sizeListWrap`).open) {
          e.target.closest(`.${ID}_sizeListWrap`).open = false;
        }
      }
      /**
       * Based on the data-filter adds or removes (if clicked again) a size
       * to the sessionStorage
       */
      switch (dataFilter) {
        case 'back-size':
          if (backSizes.indexOf(dataVal) === -1) {
            backSizes.push(dataVal);
          } else {
            backSizes.forEach(function (el, i) {
              if (el === dataVal) {
                backSizes.splice(i, 1);
              }
            });
          }
          sessionStorage.setItem('backsizes', JSON.stringify(backSizes));
          break;
        case 'cup-size':
          if (cupSizes.indexOf(dataVal) === -1) {
            cupSizes.push(dataVal);
          } else {
            cupSizes.forEach(function (el, i) {
              if (el === dataVal) {
                cupSizes.splice(i, 1);
              }
            });
          }
          sessionStorage.setItem('cupsizes', JSON.stringify(cupSizes));
          break;
        case 'clothing-size':
          if (clothingSizes.indexOf(dataVal) === -1) {
            clothingSizes.push(dataVal);
          } else {
            clothingSizes.forEach(function (el, i) {
              if (el === dataVal) {
                clothingSizes.splice(i, 1);
              }
            });
          }
          sessionStorage.setItem('clothingsizes', JSON.stringify(clothingSizes));
          break;
        case 'curvy-size':
          if (curvySizes.indexOf(dataVal) === -1) {
            curvySizes.push(dataVal);
          } else {
            curvySizes.forEach(function (el, i) {
              if (el === dataVal) {
                curvySizes.splice(i, 1);
              }
            });
          }
          sessionStorage.setItem('curvysizes', JSON.stringify(curvySizes));
          break;
        default:
          break;
      }
    });
  });
  closeControlFilters();
}

function getCachedItems() {
  const lists = [
    'backsizes',
    'cupsizes',
    'clothingsizes',
    'curvysizes',
  ];
  lists.forEach(function (listItem) {
    //sessionStorage.removeItem(listItem);
    let curItem = JSON.parse(sessionStorage.getItem(listItem));
    if (curItem) {
      [].forEach.call(curItem, function (item) {
        if (item === document.getElementById(`trigger-${item}`).getAttribute('data-cachedval')) {
          if (document.getElementById(`trigger-${item}`)) {
            document.getElementById(`trigger-${item}`).setAttribute('checked', true);
            document.getElementById(`trigger-${item}`).closest(`.${ID}_sizeListWrap`).setAttribute('data-selected', true);
          }
        }
      });
    }
  });
}

function generateListItems(val) {
  let htmlBlock = '';
  filters.forEach(function (filterItem) {
    if (filterItem.name === val) {
      filterItem.values.forEach(function (value) {
        var cleanVal = value.toLowerCase().replace(/\s/g, '');
        htmlBlock += `
        <li class="${ID}_sizeList__item">
        <input type="checkbox" name="trigger-${cleanVal}" id="trigger-${cleanVal}" data-cachedval="${cleanVal}" data-value="${cleanVal}" data-filter="${filterItem.name}">
          <label class="${ID}_sizeList__label" for="trigger-${cleanVal}">${value}</label>
        </li>
        `;
      });
    }
  });
  return htmlBlock;
}

function generateList(option) {
  let element;
  filterChildren.forEach(function (filterItem) {
    if (filterItem.name === option) {
      filterItem.values.forEach(function (value) {
        if (!document.querySelector(`[data-list="${value}"]`)) {
          element = document.createElement('details');
          element.classList.add(`${ID}_sizeListWrap`);
          element.setAttribute('data-list', value);
          element.innerHTML = `
          <summary class="c-results-facet__header ${ID}_sizeList__header">${value.toUpperCase().replace('-', ' ')}</summary>
          <ul class="${ID}_sizeList">
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
  /**
   * Inject a button to apply filters
   * when you tap it, it fetch the sessionStorage and generate a querystring
   * then calls a function that updates the page
   */
  injectApplyButton();
  /**
   * Inject a fake X on top of the one created by react
   * when you tap it, it removes the right filter created by the test
   * and updates the page
   */
  modifyFilter();
}

export {
  setup,
  generateList,
  modifyFilter,
  getCachedItems,
}; // eslint-disable-line
