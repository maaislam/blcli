import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

/**
 * @desc Moves existing form.
 * @param {Element} form
 * @param {Element} ref
 */
function moveSearchForm(form, ref) {
  if (form && ref) {
    ref.insertAdjacentHTML('afterbegin', `
      <div class="MP154-form">
        ${form.outerHTML}
      </div>
    `);
  }
}

/**
 * @desc Private function that returns a promise.
 * @param {String} url
 */
const searchRequest = (url) => {
  return new Promise((res, rej) => {
    // Set up our HTTP request
    const xhr = new XMLHttpRequest();
  
    // Setup our listener to process completed requests
    xhr.onload = () => {
      // Process our return data
      if (xhr.status >= 200 && xhr.status < 300) {
        // What do when the request is successful
        res(xhr);
      } else {
        // What do when the request fails
        rej(console.error('Search request failed'));
      }
    };
  
    // Create and send a GET request
    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    xhr.open('GET', url);
    xhr.send();
  });
};

function addToStorage(term) {
  // Get the existing data
  let existing = localStorage.getItem('MP154-recentTerms');

  // If no existing data, create an array
  // Otherwise, convert the localStorage string to an array
  existing = existing ? existing.split(',') : [];

  // Add new data to localStorage Array
  if (existing.length > 3) {
    existing.pop();
  }

  if (existing.indexOf(term) === -1) {
    existing.unshift(term);
  }

  // Save back to localStorage
  localStorage.setItem('MP154-recentTerms', existing);
}

/**
 * @desc Mimic the search form and passes the result to a callback.
 * @param {Element} form
 * @param {Function} cb
 */
function mimicSearch(form, cb) {
  if (form) {
    const input = form.querySelector('#input_SearchBox');
    input.removeAttribute('id');
    const resultsDiv = form.querySelector('#js_searchFormResults .MP154-scrollWrap');
    input.addEventListener('input', (e) => {
      e.preventDefault();
      // Run timeout to give chance to type more.
      setTimeout(() => {
        const { value } = e.target;
        if (value.length === 0) {
          resultsDiv.innerHTML = '';
          form.classList.remove('MP155-hasEls');
        }
        if (value.length > 0) {
          form.classList.add('MP155-hasEls');
          // With value fire request
          searchRequest(`https://www.mamasandpapas.com/en-gb/search/autocomplete/SearchBox?term=${value}`)
            .then((result) => {
              cb(JSON.parse(result.response), value);
            });
        }
      }, 500);
      
      setTimeout(() => {
        const { value } = e.target;
        // Store input value for "Recent Searches"
        addToStorage(value);
      }, 5500);
    });
  }
}

/**
 * @desc Loops over results and returns HTML.
 * @param {Array} results
 */
function buildResults(results) {
  let html;
  if (results) {
    html = results.map((item) => {
      return `
        <div class="col-xs-12 my-2 js_copy MP154-product">
          <a href="${item.url}" class="js_productLink">
            <div class="row">
              <div class="col-xs-4 MP154-search--image">
                <img class="js_productImage" alt="..." src="${item.autocompleteImageUrl}">
              </div>
              <div class="col-xs-8 text-left">
                <span class="js_productTitle">${item.name}</span><br>
                <span class="js_productPrice">${item.price}</span>
                <span class="js_productWasNowPrice text-gray">${item.wasNowPrice ? `Worth ${item.wasNowPrice}` : ''}</span>
              </div>
            </div>
          </a>
        </div>
      `;
    }).join('');
  }
  return html;
}

export { setup, moveSearchForm, mimicSearch, buildResults }; // eslint-disable-line
