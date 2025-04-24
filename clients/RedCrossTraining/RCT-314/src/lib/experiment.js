import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const scrollToSection = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    const offset = window.innerWidth <= 767 ? 0 : 115; // Adjust this value
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
  }
};

const obsIntersection = (target, threshold, callback) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        callback(entry);
      });
    },
    { threshold: threshold }
  );
  if (!target) {
    return;
  }

  observer?.observe(target);
};

const init = () => {
  if (!document.querySelector('[src*="widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"]')) {
    document.head.insertAdjacentHTML(
      'beforeend',
      '<script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></script>'
    );
  }

  pollerLite(['.column-half-row'], () => {
    const widgetHtml = `
    <div class="column-half-container RCT-314-trustpilot-container">
      <div id="trustbox-carousel" class="trustpilot-widget"
        data-locale="en-GB"
        data-template-id="53aa8912dec7e10d38f59f36"
        data-businessunit-id="561babcf0000ff000584409b"
        data-style-height="140px"
        data-style-width="100%"
        data-stars="4,5"
        data-review-languages="en">
        <a href="https://uk.trustpilot.com/review/redcrossfirstaidtraining.co.uk" target="_blank" rel="noopener">Trustpilot</a>
      </div>
    </div>`;

    document.querySelector('.column-half-row').insertAdjacentHTML('afterend', widgetHtml);
    // Load Trustpilot widget
    var widgetElement = document.getElementById('trustbox-carousel');
    window.Trustpilot.loadFromElement(widgetElement);
  });

  if (sessionStorage.getItem(`${ID}__isSubmitted`) && performance.getEntriesByType('navigation')[0]?.type === 'navigate') {
    sessionStorage.removeItem(`${ID}__isSubmitted`);
    pollerLite(['.location-search form'], () => {
      scrollToSection('.location-search');
    });
  }
};

export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-2N7DXLH3YG';

  setup();
  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('.trustpilot-widget iframe')) {
      fireEvent('Click - user clicks trust pilot near header');
      // console.log('user clicks trust pilot near header');
    } else if (target.closest('#trustbox-carousel iframe')) {
      fireEvent('Click - user clicks the first ‘trust pilot’ card');
      // console.log('Click - user clicks the first ‘trust pilot’ card');
    } else if (target.closest('.location-search-button')) {
      fireEvent('Click - user searches');
      // console.log('Click - user searches');
    } else if (target.closest('p.venue-list-link')) {
      fireEvent('Click - user clicks venue details');
      // console.log('Click - user clicks venue details');
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  const handleIntersection = (entry) => {
    if (entry.isIntersecting) {
      if (!document.body.classList.contains(`trustpilot-seen`)) {
        const eventText =
          VARIATION == 'control' ? 'User would have seen trust pilot reviews' : 'User has seen trust pilot reviews';
        fireEvent(eventText);
        document.body.classList.add(`trustpilot-seen`);
      }
    }
  };

  const handleObserver = (selector) => {
    const intersectionAnchor = document.querySelector(selector);
    if (intersectionAnchor) {
      obsIntersection(intersectionAnchor, 0.2, handleIntersection);
    }
  };

  init();

  handleObserver('#trustbox-carousel');

  pollerLite(['.location-search form'], () => {
    const formElement = document.querySelector('.location-search form');
    if (formElement) {
      formElement.addEventListener('submit', () => {
        sessionStorage.setItem(`${ID}__isSubmitted`, true);
      });
    }
  });
};
