/**
 * MP149 - Adding 'scope' to site searches
 * @author User Conversion
 */
import { throttle } from '../../../../../lib/uc-lib';
import { setup } from './services';
import settings from './settings';
import { events } from './../../../../../lib/utils';
import { cacheDom } from './../../../../../lib/cache-dom';
import content from './data_content';

const activate = () => {
  setup();
  let resultsShown = false;
  // Create scope results container
  const autocompleteListContainer = `<div class="MP149-autocomplete__wrapper">
    <ul class="MP149-autocomplete">
    </ul>
  </div>`;

  document.querySelector('.bg-grayLight.row.no-gutters').insertAdjacentHTML('afterend', autocompleteListContainer);
  
  const searchInput = document.querySelector('input#input_SearchBox');
  const resultsList = document.querySelector('ul.MP149-autocomplete');

  function removeClass(el, className) {
    if(el.classList) {
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };

  function addClass(el, className) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        el.className += ' ' + className;
      }
      // Press Enter - Click event
      document.querySelector('input#input_SearchBox').addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
          // events.send(settings.ID, `Variation ${settings.VARIATION} - Text entered`, `Clicked - scope result`, { sendOnce: true });
          el.parentNode.click();
        }
    });
  };
  
  // Check input when user types and add results to the list
  searchInput.addEventListener('keyup', (event) => {
    if (event.which === 38 || event.which === 40) {
      return;
    }
    let suggestions = '';

    if (searchInput.value !== '') {
      const results = content(searchInput.value);
      for (const key in results) {
        if (results.hasOwnProperty(key)) {
          suggestions += results[`${key}`].html;
        }
      }
      if (suggestions !== '') {
        resultsList.innerHTML = suggestions;

        const results = document.querySelectorAll('.MP149-autocomplete a');
        [].forEach.call(results, (item) => {
          item.addEventListener('click', () => {
            // events.send(settings.ID, `Variation ${settings.VARIATION} - Text entered`, `Clicked - scope result`, { sendOnce: true });
          });
        });
        
        if (!resultsShown) {
          // events.send(settings.ID, `Variation ${settings.VARIATION} - Text entered`, `Saw scope result`, { sendOnce: true });
          resultsShown = true;
        }
      }
    } else {
      resultsList.innerHTML = '';
    }
    
    // Keyboard arrow selection
    const ul = document.querySelector('ul.MP149-autocomplete');
    let liSelected = document.querySelector('li.MP149-result.selected');
    let index = -1;

    document.addEventListener('keydown', function(event) {
      let next;
      let len = ul.getElementsByTagName('li').length - 1;
      if (len && event.which === 40) {
        index++;
        // Down
        if (liSelected) {
          removeClass(liSelected, 'selected');
          next = ul.getElementsByTagName('li')[index];
          if (typeof next !== undefined && index <= len) {
            liSelected = next;
          } else {
            index = 0;
            liSelected = ul.getElementsByTagName('li')[0];
          }
          addClass(liSelected, 'selected');
        } else {
          index = 0;
          liSelected = ul.getElementsByTagName('li')[0];
          addClass(liSelected, 'selected');
        }
      // Showing only one suggestion
      } else if (len === 0 && event.which === 40) {
        index = 0;
        liSelected = ul.getElementsByTagName('li')[0];
        addClass(liSelected, 'selected');
      } else if (len && event.which === 38) {
        // Up
        if (liSelected) {
          removeClass(liSelected, 'selected');
          index--;
          next = ul.getElementsByTagName('li')[index];
          if(typeof next !== undefined && index >= 0) {
              liSelected = next;
            } else {
              index = len;
              liSelected = ul.getElementsByTagName('li')[len];
            }
            addClass(liSelected, 'selected');
        } else {
          index = 0;
          liSelected = ul.getElementsByTagName('li')[len];
          addClass(liSelected, 'selected');
        }
      // Showing only one suggestion
      } else if (len === 0 && event.which === 38) {
        index = 0;
        liSelected = ul.getElementsByTagName('li')[0];
        removeClass(liSelected, 'selected');
      }
    }, false);
  });
};

export default activate;
