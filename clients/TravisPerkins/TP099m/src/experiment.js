import { fullStory, events } from '../../../../lib/utils';

/**
 * {{TP099m}} - {{Recently searched options (mobile)}}
 */
const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP099m',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const searchInput = bodyVar.querySelector('#searchForm');
      const searchBar = bodyVar.querySelector('#search');
      const searchSuggestionParent = bodyVar.querySelector('#ui-id-1');
      const searchButton = $(bodyVar.querySelector('#go'));
      let TP099mWrapper;
      let TP099mSearchesWrap;
      // eslint-disable-next-line
      let showHeader = false;
      let TP099SearchTerms = localStorage.getItem('TP099m-Search');
      TP099SearchTerms = JSON.parse(TP099SearchTerms);
      if (!TP099SearchTerms) {
        TP099SearchTerms = [];
      }
      return {
        bodyVar,
        searchInput,
        searchBar,
        searchSuggestionParent,
        TP099SearchTerms,
        TP099mWrapper,
        searchButton,
        TP099mSearchesWrap,
        showHeader,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Add event handler to store the search terms on search input
        Exp.cache.searchInput.addEventListener('submit', () => {
          // Only get the search term if the value is not empty
          if (Exp.cache.searchBar.value.trim()) {
            // Gets the search term
            const searchTerm = Exp.cache.searchBar.value.trim();
            // eslint-disable-next-line
            let alreadyInArray = false;
            let TP099Array;
            // Get the array of searches
            if (localStorage.getItem('TP099m-Search')) {
              TP099Array = localStorage.getItem('TP099m-Search');
              TP099Array = JSON.parse(TP099Array);
            } else {
              TP099Array = [];
            }
            // Checks if search term is not already in array
            for (let i = 0; i < TP099Array.length; i += 1) {
              if (TP099Array[i].search_term.toUpperCase() === searchTerm.toUpperCase()) {
                alreadyInArray = true;
              }
            }
            // Pushes data to array if it is not in the array
            if (alreadyInArray === false) {
              TP099Array.push({ search_term: searchTerm });
              // Shifts the array if it is greater than 3
              if (TP099Array.length > 3) {
                TP099Array.shift();
              }
              // Sets the array to local storage
              TP099Array = JSON.stringify(TP099Array);
              localStorage.setItem('TP099m-Search', TP099Array);
            }
          }
        });
        // event handler for storing previous search term
        Exp.cache.searchSuggestionParent.addEventListener('click', (e) => {
          if (e.target.classList.contains('ui-menu-item')) {
            const searchTerm = e.target.textContent.trim();
            let alreadyInArray = false;
            let TP099Array;
            // Get the array of searches
            if (localStorage.getItem('TP099m-Search')) {
              TP099Array = localStorage.getItem('TP099m-Search');
              TP099Array = JSON.parse(TP099Array);
            } else {
              TP099Array = [];
            }
            // Checks if search term is not already in array
            for (let i = 0; i < TP099Array.length; i += 1) {
              if (TP099Array[i].search_term.toUpperCase() === searchTerm.toUpperCase()) {
                alreadyInArray = true;
              }
            }
            // Pushes data to array if it is not in the array
            if (alreadyInArray === false) {
              TP099Array.push({ search_term: searchTerm });
              // Shifts the array if it is greater than 3
              if (TP099Array.length > 3) {
                TP099Array.shift();
              }
              // Sets the array to local storage
              TP099Array = JSON.stringify(TP099Array);
              localStorage.setItem('TP099m-Search', TP099Array);
            }
          }
        });
        // Build test if search terms exist
        if (Exp.cache.TP099SearchTerms.length > 0) {
          const TP099MarkUp = `
          <div class="TP099m-Wrapper">
            <h3 class="TP099m-Header">Recently Searched</h3>
            <div class="TP099m-Previous-Searches-Wrap">
            </div>
          </div>
          `;
          Exp.cache.searchSuggestionParent.insertAdjacentHTML('afterend', TP099MarkUp);
          Exp.cache.TP099mWrapper = Exp.cache.bodyVar.querySelector('.TP099m-Wrapper');
          Exp.cache.TP099mSearchesWrap = Exp.cache.bodyVar.querySelector('.TP099m-Previous-Searches-Wrap');
          // Loop through array and add previous
          for (let i = 0; i < Exp.cache.TP099SearchTerms.length; i += 1) {
            const TP099PreviousSearchMarkUp = `
            <div class="TP099-Previous-Search-Wrap">
              <span class="TP099m-Previous-Search">${Exp.cache.TP099SearchTerms[i].search_term}</span>
              <span class="TP099m-Remove-Previous-Search">✕</span>
            </div>
          `;
            Exp.cache.TP099mSearchesWrap.insertAdjacentHTML('beforeend', TP099PreviousSearchMarkUp);
          }
          // Show header
          Exp.cache.showHeader = true;
          // elements ready, build functions
          this.setupFunction();
        }
      },
      setupFunction() {
        // When search term is clicked, set the text as search value and conduct search
        $('.TP099m-Previous-Search').click((e) => {
          events.send('TP099m', 'Click', 'Previous Search', { sendOnce: true });
          Exp.cache.searchBar.value = e.target.textContent;
          Exp.cache.searchButton.click();
        });
        // Remove search term function
        $('.TP099m-Remove-Previous-Search').click((e) => {
          // Search Previous-Search is in previous sibling
          const removeItem = $(e.target).prev().text().toUpperCase();
          // Loop through array, find search term and remove from array
          for (let i = 0; i < Exp.cache.TP099SearchTerms.length; i += 1) {
            if (removeItem === Exp.cache.TP099SearchTerms[i].search_term.toUpperCase()) {
              // Item found, remove and set array
              Exp.cache.TP099SearchTerms.splice(i, 1);
              const newTP099SearchTerms = JSON.stringify(Exp.cache.TP099SearchTerms);
              localStorage.setItem('TP099m-Search', newTP099SearchTerms);
              // Remove item from DOM
              $(e.target).closest('.TP099-Previous-Search-Wrap').remove();
              break;
            }
          }
          // Update show header if there are no search suggestions
          if (!Exp.cache.bodyVar.querySelector('.TP099m-Previous-Search')) {
            Exp.cache.showHeader = false;
          }
        });
        // Only display test on searchbar focus
        Exp.cache.searchBar.addEventListener('focus', () => {
          // Add display class if it does not exist and if there are search suggestions
          if (!Exp.cache.TP099mWrapper.classList.contains('TP099m-Show') && Exp.cache.showHeader) {
            Exp.cache.TP099mWrapper.classList.add('TP099m-Show');
          }
        });
        // Hide test when typing, reveals default search suggestions
        Exp.cache.searchBar.addEventListener('input', () => {
          if (!Exp.cache.searchBar.value) {
            // Add display class if it does not exist - no value in serch bar
            // And if there are search options
            if (!Exp.cache.TP099mWrapper.classList.contains('TP099m-Show') && Exp.cache.showHeader) {
              Exp.cache.TP099mWrapper.classList.add('TP099m-Show');
            }
          } else if (Exp.cache.searchBar.value) {
            // Remove display class if it exists - value in search bar
            if (Exp.cache.TP099mWrapper.classList.contains('TP099m-Show')) {
              Exp.cache.TP099mWrapper.classList.remove('TP099m-Show');
            }
          }
        });
        // Hide test on searchbar blur
        Exp.cache.searchBar.addEventListener('blur', () => {
          // Remove display class if it exists
          if (Exp.cache.TP099mWrapper.classList.contains('TP099m-Show')) {
            // Wait as Previous Search/remove Previous Search may be clicked
            setTimeout(() => {
              Exp.cache.TP099mWrapper.classList.remove('TP099m-Show');
            }, 50);
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;

