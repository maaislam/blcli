/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import settings from './settings';

const activate = () => {
  const hideFinder = document.querySelector('.hide_finder');
  if(hideFinder) {
    setup();

    events.send(`${settings.ID}`, 'did-unhide-finder', '', {
      sendOnce: true
    });

    hideFinder.classList.add(`${settings.ID}-finderwrap`);

    // Append button for show / hide
    const button = document.createElement('a');
    button.classList.add(`${settings.ID}-init`);
    button.innerHTML = `
      <span class="${settings.ID}-init__title"><span>Product Finder</span><b>Hide &times;</b></span>
    `;

    hideFinder.insertAdjacentElement('afterbegin', button);

    button.addEventListener('click', (e) => {
      if(e.currentTarget.classList.contains(`${settings.ID}-init--active`)) {
        e.currentTarget.classList.remove(`${settings.ID}-init--active`)
        hideFinder.classList.remove(`${settings.ID}-finderwrap--active`)

        events.send(`${settings.ID}`, 'did-close-finder-clicked-button', '', {
          sendOnce: true
        });
      } else {
        e.currentTarget.classList.add(`${settings.ID}-init--active`)
        hideFinder.classList.add(`${settings.ID}-finderwrap--active`)

        events.send(`${settings.ID}`, 'did-open-finder-clicked-button', '', {
          sendOnce: true
        });

        // If unopened, aut-open first item after small delay
        setTimeout(() => {
          const firstItem = document.querySelector('#ctl00_ctl00_productFinderHorizontal_lblProductType');
          if(firstItem && !firstItem.classList.contains('opened')) {
            firstItem.click();
          }
        }, 500);
      }
    });

    // Other event tracking
    const filterContainer = hideFinder.querySelector('.filter-container');
    if(filterContainer) {
      filterContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('filter-option') || e.target.nodeName.toLowerCase() == 'select') {
          const dataTarget = (e.target.dataset || {}).target;
          let eventLabel = e.target.nodeName.toLowerCase();
          if(dataTarget) {
            eventLabel = dataTarget.replace('#', '');
          }

          events.send(`${settings.ID}`, 'did-interact-with-dropdowns', eventLabel);
        }
        if(e.target.classList.contains('filter-submit')) {
          events.send(`${settings.ID}`, 'did-click-search-now', '', {
            sendOnce: true  
          });
        }
      });
    }
  }

};

export default activate;
