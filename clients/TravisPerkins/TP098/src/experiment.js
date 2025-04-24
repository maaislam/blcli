import { fullStory } from '../../../../lib/utils';

/**
 * {{TP098}} - {{Test Description}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP098',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const submitBtn = document.querySelector('.siteSearch input.button');
      const searchTerm = document.getElementById('search');
      let recentlySearchedArr = [];
      let previouslySearched = false;
      let previousWrap;
      /* eslint-disable */
      let preClicked = false;
      /* eslint-enable */

      if (localStorage.getItem('TP098_searched')) {
        previouslySearched = true;
        recentlySearchedArr = JSON.parse(localStorage.getItem('TP098_searched'));
      }

      return {
        bodyVar,
        submitBtn,
        searchTerm,
        recentlySearchedArr,
        previouslySearched,
        previousWrap,
        preClicked,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
      components.elementBindings();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      /* events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`,
         'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      contentBuilder: () => {
        if (Exp.cache.previouslySearched === true) {
          Exp.cache.searchTerm.insertAdjacentHTML('afterend', '<div class="TP098_previous-searches-wrap"><h3>Recently Searched</h3></div>');
          Exp.cache.previousWrap = document.querySelector('.TP098_previous-searches-wrap');

          Exp.cache.recentlySearchedArr.forEach((el) => {
            Exp.cache.previousWrap.insertAdjacentHTML('beforeend', `
            <div class="TP098_search-wrap">
              <a class="TP098_previous-search">${el.search_term}</a>
              <a class="TP098_remove">✕</a>
            </div>`);
          });

          Exp.components.bindPreviousSearchElements();
        }
      },
      elementBindings: () => {
        Exp.cache.submitBtn.addEventListener('click', () => {
          if (Exp.cache.preClicked === false) {
            setTimeout(() => {
              Exp.components.submitSearch(Exp.cache.searchTerm.value);
            }, 50);
          }
        });
        document.querySelector('.siteSearch.search .ui-autocomplete').addEventListener('click', (e) => {
          if (e.target.classList.contains('ui-corner-all')) {
            setTimeout(() => {
              Exp.components.submitSearch(e.target.innerText);
            }, 50);
          }
        });
      },
      bindPreviousSearchElements: () => {
        const previousSearches = document.querySelectorAll('.TP098_search-wrap');

        [].forEach.call(previousSearches, (el) => {
          el.addEventListener('click', (e) => {
            if (e.target.classList.contains('TP098_previous-search')) {
              Exp.cache.searchTerm.value = e.target.innerText;
              Exp.cache.preClicked = true;
              setTimeout(() => {
                Exp.cache.submitBtn.click();
              }, 150);
            } else if (e.target.classList.contains('TP098_remove')) {
              const removeTarget = e.target.previousElementSibling.innerText.toUpperCase();
              Exp.cache.recentlySearchedArr.forEach((ele, index) => {
                if (removeTarget === ele.search_term.toUpperCase()) {
                  Exp.cache.recentlySearchedArr.splice(index, 1);
                  localStorage.setItem('TP098_searched', JSON.stringify(Exp.cache.recentlySearchedArr));
                  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
                }
              });
            }
          });
        });

        Exp.cache.searchTerm.addEventListener('focus', () => {
          // Add display class if it does not exist
          if (!Exp.cache.previousWrap.classList.contains('TP098_show')) {
            Exp.cache.previousWrap.classList.add('TP098_show');
          }
        });

        Exp.cache.searchTerm.addEventListener('keydown', (e) => {
          const activeRecent = Exp.cache.previousWrap.querySelector('.TP098_search-wrap.TP098_active');

          if (!Exp.cache.searchTerm.value) {
            // Add display class if it does not exist - no value in serch bar
            if (!Exp.cache.previousWrap.classList.contains('TP098_show')) {
              Exp.cache.previousWrap.classList.add('TP098_show');
            }
            // If user presses down or up key
            if (e.keyCode === 38 || e.keyCode === 40) {
              // Check for an active highlight
              if (activeRecent) {
                // If the user pressed up and there is a previous link to highlight
                //  move the active class to it
                if (e.keyCode === 38 && activeRecent.previousElementSibling.classList.contains('TP098_search-wrap')) {
                  activeRecent.previousElementSibling.classList.add('TP098_active');
                  activeRecent.classList.remove('TP098_active');
                // If the user pressed down and there is a link after to highlight
                //  move the active class to it
                } else if (e.keyCode === 40 && activeRecent.nextElementSibling) {
                  activeRecent.nextElementSibling.classList.add('TP098_active');
                  activeRecent.classList.remove('TP098_active');
                }
              // If there is not an active highlight, select the first link to active
              } else if (e.keyCode === 40) {
                Exp.cache.previousWrap.querySelector('h3 + .TP098_search-wrap').classList.add('TP098_active');
              }
            // If the user pressed enter and there is a link highlighted, click the link
            } else if (e.keyCode === 13 && activeRecent) {
              e.preventDefault();
              activeRecent.querySelector('.TP098_previous-search').click();
            }
          } else if (Exp.cache.searchTerm.value) {
            // Remove display class if it exists - value in search bar
            if (Exp.cache.previousWrap.classList.contains('TP098_show')) {
              Exp.cache.previousWrap.classList.remove('TP098_show');
            }
          }
        });

        Exp.cache.searchTerm.addEventListener('blur', () => {
          const activeRecent = Exp.cache.previousWrap.querySelector('.TP098_search-wrap.TP098_active');
          // Remove display class if it exists
          if (Exp.cache.previousWrap.classList.contains('TP098_show')) {
            // Wait as suggestion/remove suggestion may be clicked
            setTimeout(() => {
              Exp.cache.previousWrap.classList.remove('TP098_show');
            }, 150);
          }
          if (activeRecent) {
            activeRecent.classList.remove('TP098_active');
          }
        });
      },
      submitSearch: (inputVal) => {
        let alreadySearched = false;
        if (inputVal !== '') {
          for (let i = 0; i < Exp.cache.recentlySearchedArr.length; i += 1) {
            if (Exp.cache.recentlySearchedArr[i].search_term.toUpperCase() ===
            inputVal.toUpperCase()) {
              alreadySearched = true;
            }
          }
          if (alreadySearched === false) {
            Exp.cache.recentlySearchedArr.push({ search_term: inputVal });

            if (Exp.cache.recentlySearchedArr.length > 3) {
              Exp.cache.recentlySearchedArr.shift();
            }
            Exp.cache.recentlySearchedArr = JSON.stringify(Exp.cache.recentlySearchedArr);
            localStorage.setItem('TP098_searched', Exp.cache.recentlySearchedArr);
          }
        }
      },
    },
  };

  Exp.init();
};

export default Run;
