/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { insertAfterElement } from '../../../../../lib/utils';

export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    fireEvent('Conditions Met');

    // -----------------------------
    // Add events that apply to both variant and control
    // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
    // -----------------------------
    // ...

    // -----------------------------
    // If control, bail out from here
    // -----------------------------

    const isHomepage = window.location.href === 'https://www.avon.ro/';

    if (VARIATION === 'control') {
      /* TRACKING START */
      if (isHomepage) {
        fireEvent('User viewed the homepage');
      }

      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      let scrolled;

      const setScrolled = () => {
        scrolled = window.pageYOffset;

        if ((scrolled / scrollHeight) * 100 > 5) {
          fireEvent('User scrolled 5% down the page');
        }
      };

      window.addEventListener('scroll', setScrolled);

      window.addEventListener('scroll', () => {
        if ((scrolled / scrollHeight) * 100 > 5) {
          window.removeEventListener('scroll', setScrolled);
        }
        fireEvent('User has scrolled on the page');
      });
      /* TRACKING END */
    } else {
      const entryElement = document.querySelectorAll(
        '.ContentRow.Columns_2.NormalPadded.MarginSeparation_Thick'
      )[0];
      const entryElement2 = document.querySelectorAll(
        '.ContentRow.Columns_1.NotPadded.MarginSeparation_Normal'
      )[0];

      const root = document.querySelector(`.${ID}-root`);

      if (!root) {
        const rootElement = document.createElement('div');

        rootElement.classList.add(`${ID}-root`);

        rootElement.innerHTML = /* HTML */ `
          <div class="AG088a-container">
            <ul class="AG088a-list">
              <li class="AG088a-card">
                <a
                  href="https://www.shopwithmyrep.co.uk/301-315/make-up/lips?attach=25052968"
                  class="AG088a-card-inner"
                  data-category="lips"
                >
                  <div class="AG088a-card-image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/AG088/Image.png" alt="" />
                  </div>
                  <h4 class="AG088a-card-title">Lips</h4>
                </a>
              </li>
              <li class="AG088a-card">
                <a
                  href="https://www.shopwithmyrep.co.uk/306-571/toiletries/haircare"
                  class="AG088a-card-inner"
                  data-category="haircare"
                >
                  <div class="AG088a-card-image">
                    <img
                      src="https://blcro.fra1.digitaloceanspaces.com/AG088/Image%20%281%29.png"
                      alt=""
                    />
                  </div>
                  <h4 class="AG088a-card-title">Haircare</h4>
                </a>
              </li>
              <li class="AG088a-card">
                <a
                  href="https://www.shopwithmyrep.co.uk/855/fashion"
                  class="AG088a-card-inner"
                  data-category="fashion"
                >
                  <div class="AG088a-card-image">
                    <img
                      src="https://blcro.fra1.digitaloceanspaces.com/AG088/Image%20%282%29.png"
                      alt=""
                    />
                  </div>
                  <h4 class="AG088a-card-title">Fashion</h4>
                </a>
              </li>
              <li class="AG088a-card">
                <a
                  href="https://www.shopwithmyrep.co.uk/301/make-up"
                  class="AG088a-card-inner"
                  data-category="makeup"
                >
                  <div class="AG088a-card-image">
                    <img
                      src="https://blcro.fra1.digitaloceanspaces.com/AG088/Image%20%283%29.png"
                      alt=""
                    />
                  </div>
                  <h4 class="AG088a-card-title">Makeup</h4>
                </a>
              </li>
              <li class="AG088a-card">
                <a
                  href="https://www.shopwithmyrep.co.uk/301-316/make-up/eyes"
                  class="AG088a-card-inner"
                  data-category="eyes"
                >
                  <div class="AG088a-card-image">
                    <img
                      src="https://blcro.fra1.digitaloceanspaces.com/AG088/Image%20%284%29.png"
                      alt=""
                    />
                  </div>
                  <h4 class="AG088a-card-title">Eyes</h4>
                </a>
              </li>
              <li class="AG088a-card">
                <a
                  href="https://www.shopwithmyrep.co.uk/302/skincare "
                  class="AG088a-card-inner"
                  data-category="skincare"
                >
                  <div class="AG088a-card-image">
                    <img
                      src="https://blcro.fra1.digitaloceanspaces.com/AG088/Image%20%285%29.png"
                      alt=""
                    />
                  </div>
                  <h4 class="AG088a-card-title">Skincare</h4>
                </a>
              </li>
            </ul>
          </div>
        `;

        if (entryElement) {
          insertAfterElement(entryElement, rootElement);
        } else {
          insertAfterElement(entryElement2, rootElement);
        }
      }

      /* TRACKING START */
      if (isHomepage) {
        fireEvent('User viewed the homepage');

        const newElement = document.querySelector(`.${ID}-root`);

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              fireEvent('New element is visible to the user');
            }
          });
        });

        observer.observe(newElement);

        window.addEventListener('scroll', () => fireEvent('User has scrolled on the page'));

        const newElementCards = newElement.querySelectorAll(`.${ID}-card-inner`);

        newElementCards.forEach((card) => {
          card.addEventListener('click', (e) => {
            e.preventDefault();
            fireEvent(`User has clicked on the '${card.dataset.category}' card`);
          });
        });
      }
      /* TRACKING END */
    }
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });

  init();
};
