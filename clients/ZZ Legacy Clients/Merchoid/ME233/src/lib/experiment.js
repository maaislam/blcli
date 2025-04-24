import { setup } from './services';
import shared from './shared';

/**
 * Mark container div filters applied
 */
const markFiltersAsApplied = (type) => {
  const wrapper = document.querySelector('.guide-list-wrapper');
  if(wrapper) {
    wrapper.classList.add(`${shared.ID}-filters-applied`);
    wrapper.dataset.filtertype = type;
  }
};

/**
 * Is UK site check?
 */
const isUk = () => {
  return window.location.href.indexOf('/uk/') > -1;
};

/**
 * Unmark container div filters applied
 */
const unmarkFiltersAsApplied = () => {
  const wrapper = document.querySelector('.guide-list-wrapper');
  if(wrapper) {
    wrapper.classList.remove(`${shared.ID}-filters-applied`);
  }
};

/**
 * Helper match content against a word
 *
 * @param {HTMLElement} node
 * @param {RegExp} matchRegex
 * @return {Boolean}
 */
const nodeMatchesRegex = (node, matchRegex) => {
  const textToMatch = node.textContent;
  let result = false;

  if(textToMatch && matchRegex.test(textToMatch)) {
    result = true;
  }

  return result;
}

/**
 * Helper get regex for type
 *
 * @param {String}
 */
const getRegexForType = (type) => {
  let matchRegex = null;

  switch(type) {
    case 'jumper':
      matchRegex = /jumper/igm;
      break;
    case 'calendar':
      matchRegex = /calendar/igm;
      break;
  }

  return matchRegex;
};

/**
 * Helper for running through items and marking them
 * on or off (visible / not visible)
 *
 * @param {NodeList} items
 * @param {String} type
 */
const filterItems = (items, type) => {
  const matchRegex = getRegexForType(type);

  if(matchRegex) {
    // -------------------------------------
    // Mark 'on' or 'off'
    // -------------------------------------
    [].forEach.call(items, (item) => {
      const result = nodeMatchesRegex(item, matchRegex);
      if(result) {
        item.classList.remove(`${shared.ID}-off`);
        item.classList.add(`${shared.ID}-on`);
      } else{
        item.classList.remove(`${shared.ID}-on`);
        item.classList.add(`${shared.ID}-off`);
      }
    });
  }
};

/**
 * Clear all items filters
 *
 * @param {NodeList} items
 */
const clearAllFilters = (items) => {
  // -------------------------------------
  // Reset the items
  // -------------------------------------
  [].forEach.call(items, (item) => {
    item.classList.remove(`${shared.ID}-on`);
    item.classList.remove(`${shared.ID}-off`);
  });
};

/**
 * Helper - scroll to wrapper
 */
const scrollToWrapper = () => {
  const wrapper = document.querySelector('.guide-list-wrapper');
  const toggle = document.querySelector(`.${shared.ID}-toggle`);
  
  if(wrapper) {
    let offset = 150;

    const boundingRect = wrapper.getBoundingClientRect();
    if(boundingRect && boundingRect.top >= 0) {
      offset = boundingRect.top + window.pageYOffset;
    }

    if(toggle) {
      const toggleRect = toggle.getBoundingClientRect();
      const buffer = 105; // Buffer to prevent over-scrolling, arbitrary
      if(toggleRect && toggleRect.height) {
        // -------------------------------------
        // Add more to the offset we want to scroll to
        // -------------------------------------
        offset += toggleRect.height - buffer;
      }
    }

    if(window.jQuery && window.jQuery.fn && window.jQuery.fn.animate) {
      window.jQuery('body,html').animate({
        'scrollTop': offset + 'px'
      });
    } else {
      window.scrollTo(0, offset);
    }
  }
};


/**
 * Entry point for experiment
 */
export default () => {
  setup();

  const items = document.querySelectorAll('.product-item');
  const wrapper = document.querySelector('.guide-list-wrapper');
  
  // -------------------------------------
  // Move Harry Potter above Marvel
  // -> more scope for sale here
  // -------------------------------------
  const harryPotterContainer = document.querySelector('#harry-potter-christmas-sweaters');
  const marvelContainer = document.querySelector('#marvel-christmas-sweaters');

  if(harryPotterContainer && marvelContainer) {
    marvelContainer.insertAdjacentElement('beforebegin', harryPotterContainer);
  }
  
  // -------------------------------------
  // Run through every products grid and see if 
  // advent calendars are included
  // -------------------------------------
  const calendarRegex = getRegexForType('calendar');
  const productGrids = document.querySelectorAll('.guide-list-wrapper .products-grid');
  [].forEach.call(productGrids, (grid) => {
    const gridItems = grid.querySelectorAll('.product-item');

    let hasCalendars = false;

    [].forEach.call(gridItems, (item) => {
      if(nodeMatchesRegex(item, calendarRegex)) {
        hasCalendars = true;
      }
    });

    if(hasCalendars) {
      grid.classList.add(`${shared.ID}-has-calendars`);
    } else{
      grid.classList.add(`${shared.ID}-no-calendars`);
    }
  });
  
  // -------------------------------------
  // Geeks guide banner
  // -------------------------------------
  const pageTitleWrapper = document.querySelector('#maincontent .page-title-wrapper');
  if(pageTitleWrapper) {
    pageTitleWrapper.insertAdjacentHTML('beforeend', `
        <img class="${shared.ID}-geeks-guide-banner" 
          src="//cdn.optimizely.com/img/6087172626/7131c39b89a943c1b86c47d07b980e97.jpg">
    `);
  }
  
  // -------------------------------------
  // Caption text
  // -------------------------------------
  const firstP = document.querySelector('.column.main > p:first-of-type');
  if(firstP && firstP.textContent.indexOf('officially licensed') > -1) {
    firstP.innerHTML = `
      <span>Our officially licensed Christmas ${isUk() ? 'jumpers' : 'sweaters'} for 2019 have arrived!</span>
      <strong>Get yours before they sell out.</strong>
    `;
  }

  // -------------------------------------
  // Add custom markup and link filtering
  // -------------------------------------
  wrapper.insertAdjacentHTML('afterbegin', `
    <div class="${shared.ID}-toggle">
      <div class="clear">
      <div class="${shared.ID}-toggle__col1">
        <a class="${shared.ID}-toggle__jumpers-link">
          <div class="xinner">
            <span>Christmas ${isUk() ? 'Jumpers' : 'Sweaters'}</span>
            <em class="xdesktop">
              Stand out from the crowd with our officially licensed 
              geeky ${isUk() ? 'jumpers' : 'sweaters'}
            </em>
            <em class="xmobile">
              Our officially licensed Christmas ${isUk() ? 'jumpers' : 'sweaters'} for 2019
              have arrived!
              <strong>Get yours before they sell out.</strong>
            </em>
            <div class="${shared.ID}-jumpersButton">Shop all Christmas ${isUk() ? 'jumpers' : 'sweaters'}</div>
          </div>
        </a>
      </div>
      <div class="${shared.ID}-toggle__col2">
        <a class="${shared.ID}-toggle__calendar-link">
          <div class="xinner">
            <span>Advent Calendars</span>
            <em>
              Don't forget to check out our new advent calendars
            </em>
            <strong>Shop Advent Calendars</strong>
          </div>
        </a>
      </div>
      </div>

      <div class="${shared.ID}-toggle__reset">
        <h3 class="${shared.ID}-productFilter_title"></h3>
        <a class="${shared.ID}-toggle__reset-link">
          Show All Christmas Merch
        </a>
      </div>
    </div>
  `);

  const secondJumpersLink = document.createElement('div');
  secondJumpersLink.classList.add(`${shared.ID}-toggle__reset`);
  secondJumpersLink.classList.add(`${shared.ID}-toggle__last`);
  secondJumpersLink.innerHTML = `<a class="${shared.ID}-toggle__reset-link">Show All Christmas Merch</a>`

  secondJumpersLink.style.display = 'none';
  document.querySelector('.columns .column.main').appendChild(secondJumpersLink);

  
  const productTitle = document.querySelector(`.${shared.ID}-productFilter_title`);

  const jumpersLink = document.querySelector(`.${shared.ID}-toggle__jumpers-link`);
  if(jumpersLink) {
    jumpersLink.addEventListener('click', () => {
      filterItems(items, 'jumper');
      markFiltersAsApplied('jumper');

      scrollToWrapper();

      secondJumpersLink.style.display = 'block';
      productTitle.innerHTML = `Showing all Christmas ${isUk() ? 'jumpers' : 'sweaters'}`;
    
    });    
  }

  const calendarLink = document.querySelector(`.${shared.ID}-toggle__calendar-link`);
  if(calendarLink) {
    calendarLink.addEventListener('click', () => {
      filterItems(items, 'calendar');
      markFiltersAsApplied('calendar');

      scrollToWrapper();

      secondJumpersLink.style.display = 'block';
      productTitle.innerHTML = `Showing all Advent Calendars`;
    });
  }

  const resetLink = document.querySelector(`.${shared.ID}-toggle__reset-link`);
  if(resetLink) {
    const allResetLinks = document.querySelectorAll(`.${shared.ID}-toggle__reset-link`);
    for (let index = 0; index < allResetLinks.length; index += 1) {
      const element = allResetLinks[index];
      element.addEventListener('click', () => {
        clearAllFilters(items);
        unmarkFiltersAsApplied();
  
        scrollToWrapper();
  
        secondJumpersLink.style.display = 'none';
      }); 
    }
  }
};
