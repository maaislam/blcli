import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, observer } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  pollerLite(['#wrapper'], () => {

    let wrapper = document.getElementById('wrapper');

    if (wrapper.classList.contains('pt_product-search-result')) {

      fireEvent(`Interaction - user has viewed PLP page ${window.location.href}`, true);

      if (VARIATION !== "control") {
        
        document.documentElement.classList.add(`${ID}-update`);
        fireEvent(`Interaction - category listing changed from 4 to 3`, true);

      }
      pollerLite(['.search-result-content'], () => {
        let scrollWatch = new window.IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
              fireEvent(`Interaction - user has seen the category listing`, true);
              scrollWatch.disconnect();
            }
          });
        }, { root: null });

        scrollWatch.observe(document.querySelector('.search-result-content'));
      });

    } else if (wrapper.classList.contains('pt_product-details')) {

      fireEvent(`Interaction - user has viewed PDP page ${window.location.href}`, true);

      document.body.addEventListener('click', (e) => {

        if (e.target.classList.contains('add-to-cart')) {
          fireEvent(`Interaction - user has added item to basket`, true);
        }

      });

    }

    document.body.addEventListener('click', (e) => {

      if (e.target.closest('#search-form')) {
        fireEvent(`Click - user has clicked into the search field`, true);
      }

    });

    if (window.outerWidth < 960) {

      observer.connect(document.querySelector('#hamburger-menu'), () => {
        fireEvent(`Click - user has clicked the mobile navigation`, true);
        observer.disconnect();
      },
        {
          attributes: true,
          childList: true,
        });

    } else {
      pollerLite([`#desktop-navigation`], () => {

        let nav = document.getElementById('desktop-navigation');
        nav.addEventListener('mouseenter', () => {
          fireEvent(`Interaction - user has entered the navigation`, true);
        });

      });
    }

  })




};
