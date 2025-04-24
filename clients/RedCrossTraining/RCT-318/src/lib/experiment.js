import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

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

  pollerLite(
    [
      'main .component.rich-text',
      () => document.querySelector('[src*="widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"]'),
      () => window.Trustpilot && typeof window.Trustpilot.loadFromElement === 'function',
    ],
    () => {
      const widgetHtml = `
    <div class="${ID}-trustpilot-container">
      <div class="wrapper">
        <div id="trustbox-carousel" 
          class="trustpilot-widget" 
          data-locale="en-GB" 
          data-template-id="53aa8912dec7e10d38f59f36" 
          data-businessunit-id="561babcf0000ff000584409b" 
          data-style-height="140px" data-style-width="100%" 
          data-tags="CT-FA1" 
          data-stars="4,5" 
          data-review-languages="en">
              <a href="https://uk.trustpilot.com/review/redcrossfirstaidtraining.co.uk" 
              target="_blank" rel="noopener">Trustpilot</a>
          </div> 
      </div>
    </div>`;

      document.querySelector('main .component.rich-text').insertAdjacentHTML('beforebegin', widgetHtml);
      var widgetElement = document.getElementById('trustbox-carousel');
      window.Trustpilot.loadFromElement(widgetElement);
    }
  );
};

export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-2N7DXLH3YG';

  setup();
  fireEvent('Conditions Met');

  pollerLite(['#form-course-finder'], () => {
    const formElement = document.querySelector('#form-course-finder');
    if (formElement) {
      formElement.addEventListener('submit', (event) => {
        const inputElement = event.target.querySelector('input#location');
        if (inputElement.value) {
          fireEvent(`user clicks show search results CTA to see results`);
        }
      });
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  init();

  const handleIntersection = (entry) => {
    if (entry.isIntersecting) {
      if (!document.body.classList.contains(`${ID}__trustpilot-seen`)) {
        const eventText = 'user sees trust pilot module';
        fireEvent(eventText);
        document.body.classList.add(`${ID}__trustpilot-seen`);
      }
    }
  };

  const handleIntersectionBelowTpModule = (entry) => {
    if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
      if (!document.body.classList.contains(`${ID}__below-tp-module`)) {
        const eventText = 'user scrolls below trust pilot module';
        fireEvent(eventText);
        document.body.classList.add(`${ID}__below-tp-module`);
      }
    }
  };

  const handleObserver = (selector, flag) => {
    const intersectionAnchor = document.querySelector(selector);
    if (intersectionAnchor && flag === 'tp-module') {
      obsIntersection(intersectionAnchor, 0.2, handleIntersection);
    } else if (intersectionAnchor && flag === 'below-tp-modult') {
      obsIntersection(intersectionAnchor, 1, handleIntersectionBelowTpModule);
    }
  };

  handleObserver('#trustbox-carousel', 'tp-module');
  handleObserver(`.${ID}-trustpilot-container`, 'below-tp-modult');
};
