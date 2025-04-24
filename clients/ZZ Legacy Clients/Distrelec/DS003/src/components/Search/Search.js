import settings from '../../lib/settings';

const {
  ID
} = settings;

export default class Search {
  /**
   * @param {object} options
   * @param {function} options.render Function to render component
   */
  constructor(options) {
    const opts = options || {};
    this.getCategoryIDs();

    // Get recent search terms
    this.recentSearches = (() => {
      const item = localStorage.getItem(`${ID}_search`);
      return item ? JSON.parse(item) : [];
    })();

    this.create();
    this.bindEvents();
    if (opts.render) opts.render(this.component);
  }

  create() {
    const countryCode = document.querySelector('html').getAttribute('lang').toUpperCase();
    let strings = [];
    let searcFor;
    let recentSearches;
    switch (countryCode) {
      case 'EN':
        strings = ['Components', 'Tools', 'Supplies', 'Instruments', 'Components'];
        searcFor = 'Search for';
        recentSearches = 'Your recent searches';
        break;
      case 'DE':
        strings = ['Bauelementen', 'Werkzeug', 'Betriebsmitteln', 'Messgeräte', 'Bauelementen'];
        searcFor = 'Suchen Sie nach';
        recentSearches = 'Ihre letzten Suchanfragen';
        break;
      case 'CH':
        strings = ['Bauelementen', 'Werkzeug', 'Betriebsmitteln', 'Messgeräte', 'Bauelementen'];
        searcFor = 'Suchen Sie nach';
        recentSearches = 'Ihre letzten Suchanfragen';
        break;
      case 'FR':
        strings = ['Composants', 'Outils', 'Alimentations', 'Instruments de mesure', 'Composants'];
        searcFor = 'Rechercher';
        recentSearches = 'Vos dernières recherches';
        break;
      case 'SV':
        strings = ['Komponenter', 'Verktyg', 'Aggregat', 'Instrument', 'Komponenter'];
        searcFor = 'Sök efter';
        recentSearches = 'Dina senaste sökningar';
        break;
      default:
        break;
    }
    let words = '';
    for (let i = 0; i < strings.length; i += 1) {
      words += `<div class="element">${strings[i]}</div>`;
    }
    const element = document.createElement('div');
    element.classList.add(`${ID}_Search`);
    element.innerHTML = `
    <div class="${`${ID}_SearchWrap`}">
      <div class="${ID}_wordCarouselWrap">
        <div class="${ID}_wordCarousel">
          <div class="frame">
            <div class="center">
              <div class="carousel">
                <div class="pre">${searcFor} </div>
                  <div class="change_outer">
                    <div class="change_inner">
                      ${words}
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="${ID}_Search__formContainer">
        <div class="${ID}_Search__form">
          <div class="${ID}_Search__formBlock">
            <div class="${ID}_Search__bar"></div>
          </div>
        </div>
      </div>

      <div class="${ID}_recentSrcWrap">
        <div class="${ID}_recentSrc">
          ${this.recentSearches.length ? `<span>${recentSearches}:</span>` : ''}
          ${this.recentSearches.map(search => `
            <div class="${ID}_recentSrc__button">
              <span class="${ID}_recentSrc__buttonLink">${search}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    `;

    // Inject search bar already on page
    const searchBar = element.querySelector(`.${ID}_Search__bar`);
    const originalSearchBar = document.querySelector('.skin-metahd-item-search');
    const originalSuggestions = document.querySelector('.mod-metahd-suggest');
    searchBar.appendChild(originalSearchBar);
    searchBar.appendChild(originalSuggestions);
    //https://aws-p2-lb00.distrelec.com/FACT-Finder/Suggest.ff?query=test&filtercategoryCodePathROOT=&channel=distrelec_7350_de_de&format=json
    // Move the overlay
    const newOverlay = document.createElement('div');
    newOverlay.classList.add('overlay-suggest');
    document.querySelector('body').insertAdjacentElement('afterbegin', newOverlay);


    // Move search bar to header when user scrolls past it
    const getUserScrollDistance = () => window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    window.addEventListener('scroll', () => {
      const scrollDistance = getUserScrollDistance();
      const searchEl = document.querySelector(`.${ID}_Search__form`);
      if (scrollDistance >= 210) {
        document.querySelector('.stickySearch').insertAdjacentElement('afterbegin', searchEl);
        document.body.classList.add(`${ID}--stickySearch`);
      } else if (scrollDistance < 210) {
        document.querySelector(`.${ID}_Search__formContainer`).insertAdjacentElement('afterbegin', searchEl);
        document.body.classList.remove(`${ID}--stickySearch`);
      }
    });

    this.component = element;
  }

  bindEvents() {
    const searchInput = this.component.querySelector(`.${ID}_Search__bar .input-search`);
    const searchForm = this.component.querySelector('form.searchForm');

    // Save search term on form submit
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const term = searchInput.value;
      this.saveRecentSearch(term);
      const url = this.buildSearchURL();
      window.location.href = url;
    });

    // Recent search quick links
    const quickLinks = this.component.querySelectorAll(`.${ID}_recentSrc__buttonLink`);
    Array.from(quickLinks).forEach((node) => {
      node.addEventListener('click', () => {
        // Submit form on click
        searchInput.value = node.innerText.trim();
        searchForm.submit();
      });
    });
  }

  /**
   * Gets unique IDs for each category to use in search filters
   */
  getCategoryIDs() {
    this.categoryIDs = [];
    const categories = document.querySelectorAll('#menu > ul > li');
    Array.from(categories).forEach((node) => {
      const link = node.querySelector('.link_l1');
      const catID = link.href.match(/cat-[\w_]+/);
      if (catID) {
        this.categoryIDs.push({
          name: link.getAttribute('title'),
          ID: catID,
        });
      }
    });
  }

  /**
   * Stores most recent search term in local storage
   * @param {string} term Search term to save
   */
  saveRecentSearch(term) {
    const data = this.recentSearches;
    if (term) {
      while (data.length >= 3) data.pop(); // Limit recent searches to 3
      data.push(term);
      this.recentSearches = data;
      localStorage.setItem(`${ID}_search`, JSON.stringify(data));
    }
  }

  /**
   * Returns a URL for the search term and category filter
   * @returns {string}
   */
  buildSearchURL() {
    const searchTerm = this.component.querySelector(`.${ID}_Search__bar .input-search`).value;
    const filter = this.component.querySelector(`.${ID}_Search__filter`).selectedOptions[0].value;
    const URL = `${window.location.origin}/search?q=${searchTerm}${filter ? `&filter_categoryCodePathROOT=${filter}` : ''}`;
    return URL;
  }
}
