import { fullStory, events } from '../../../../../lib/utils';
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

function whatPage() {
  let page = null;
  if (window.dataLayer && window.dataLayer[1].pageType === 'Basket') {
    page = 'basket';
  }
  if (window.dataLayer && window.dataLayer[1].pageType === 'ProductDetail') {
    page = 'pdp';
  }
  return page;
}

function toggle(container) {
  if (container) {
    const tabOne = container.querySelector('#FL051-similar');
    const tabTwo = container.querySelector('#FL051-recently');
    container.addEventListener('click', (e) => {
      // Tab controls
      if (e.target.classList.contains('FL051-tabs--title')) {
        e.preventDefault();
        const tabButtons = container.querySelectorAll('button.FL051-tabs--title');
        for (let i = 0; tabButtons.length > i; i += 1) {
          tabButtons[i].classList.remove('FL051-active');
        }
        // One of the tab buttons container
        const tabButton = e.target;
        if (tabButton.getAttribute('id') === 'tab-1') {
          // Event
          events.send(settings.ID, 'Click', 'User clicked on "You may like"');

          // Hide Recently Viewed and Show Similar
          if (!tabTwo.classList.contains('FL051-hide')) {
            tabTwo.classList.add('FL051-hide');
          }
          if (tabOne.classList.contains('FL051-hide')) {
            tabOne.classList.remove('FL051-hide');
          }

          tabButton.classList.add('FL051-active');

          // Re init slick
          const $sim = $('#FL051-similar .slick');
          if ($sim) {
            $($sim).slick('setPosition');
          }
        }

        if (tabButton.getAttribute('id') === 'tab-2') {
          // Event
          events.send(settings.ID, 'Click', 'User clicked on "Recently Viewed"');

          // Hide Recently Viewed and Show Similar
          if (!tabOne.classList.contains('FL051-hide')) {
            tabOne.classList.add('FL051-hide');
          }
          if (tabTwo.classList.contains('FL051-hide')) {
            tabTwo.classList.remove('FL051-hide');
          }

          tabButton.classList.add('FL051-active');
          
          // Re init slick
          const $rec = $('#FL051-recently .slick');
          if ($rec) {
            $($rec).slick('setPosition');
          }
        }
      }
    });
  }
}

export { setup, whatPage, toggle }; // eslint-disable-line
