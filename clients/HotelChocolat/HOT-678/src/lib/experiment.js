import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;

const startExperiment = () => {
  pollerLite(['.tab-target-mobile', '.tab-target-desktop'], () => {
    let insertionPoint = document.querySelector('.tab-target-mobile');

    let tabTargetHolder = document.querySelector('.tab-target-desktop');
    tabTargetHolder.classList.add(`${ID}-hidden`);

    let descriptionTabContent = tabTargetHolder.querySelector('#tabDesc')?.innerHTML;
    let ingredientsTabContent = tabTargetHolder.querySelector('#tabIngredients')?.innerHTML;
    let reviewsTabContent = tabTargetHolder.querySelector('#bv-review-container');

    let newAccordionHTML = `
    
      <div class="${ID}-details-accordion">
      
        <div class="${ID}-accordion ${VARIATION == 1 ? `${ID}-description-active` : ``}">
        
          <div class="${ID}-accordion--title" id="${ID}-accordion--title--description">Description</div>

          <div class="${ID}-accordion--content" id="${ID}-accordion--content--description">
            ${descriptionTabContent}
          </div>


          ${
            ingredientsTabContent
              ? `
              <div class="${ID}-accordion--title" id="${ID}-accordion--title--ingredients">Ingredients</div>
              <div class="${ID}-accordion--content" id="${ID}-accordion--content--ingredients">
                ${ingredientsTabContent}
              </div>
            `
              : ''
          }


          <div class="${ID}-accordion--title" id="${ID}-accordion--title--reviews">Reviews</div>
          <div class="${ID}-accordion--content" id="${ID}-accordion--content--reviews">
          </div>
        
        
        </div>
      
      
      </div>
    
    `;

    insertionPoint.insertAdjacentHTML('afterend', newAccordionHTML);

    let accordion = document.querySelector(`.${ID}-accordion`);
    document.getElementById(`${ID}-accordion--content--reviews`).insertAdjacentElement('afterbegin', reviewsTabContent);

    fireEvent(`Interaction - experiment successfully run and accordion added to page: ${window.location.href}`, true);

    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains(`${ID}-accordion--title`)) {
        let target = e.target;
        let tabID = target.id;

        if (tabID == `${ID}-accordion--title--description`) {
          if (accordion.classList.contains(`${ID}-description-active`)) {
            accordion.classList.remove(`${ID}-description-active`);
          } else {
            accordion.classList.add(`${ID}-description-active`);
          }

          accordion.classList.remove(`${ID}-ingredients-active`, `${ID}-reviews-active`);

          fireEvent(`Click - user has clicked on tab: description on product page: ${window.location.href}`, true);
        } else if (tabID == `${ID}-accordion--title--ingredients`) {
          if (accordion.classList.contains(`${ID}-ingredients-active`)) {
            accordion.classList.remove(`${ID}-ingredients-active`);
          } else {
            accordion.classList.add(`${ID}-ingredients-active`);
          }

          accordion.classList.remove(`${ID}-description-active`, `${ID}-reviews-active`);

          fireEvent(`Click - user has clicked on tab: INGREDIENTS on product page: ${window.location.href}`, true);
        } else if (tabID == `${ID}-accordion--title--reviews`) {
          if (accordion.classList.contains(`${ID}-reviews-active`)) {
            accordion.classList.remove(`${ID}-reviews-active`);
          } else {
            accordion.classList.add(`${ID}-reviews-active`);
          }

          accordion.classList.remove(`${ID}-ingredients-active`, `${ID}-description-active`);

          fireEvent(`Click - user has clicked on tab: REVIEWS on product page: ${window.location.href}`, true);
        }
      }

      if (e.target.id == 'add-to-cart' || e.target.closest('#add-to-cart')) {
        fireEvent(`Click - user has clicked on ATC on product page: ${window.location.href}`, true);
      }

      if (e.target.closest('.product-review-links')) {
        accordion.classList.remove(`${ID}-description-active`, `${ID}-ingredients-active`);
        accordion.classList.add(`${ID}-reviews-active`);
        setTimeout(() => {
          document.getElementById(`${ID}-accordion--title--reviews`).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
        fireEvent(`Click - user has clicked on review stars to scroll the reviews into view`, true);
      }
    });
  });
};

const addControlTracking = () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.id == 'add-to-cart' || e.target.closest('#add-to-cart')) {
      fireEvent(`Click - user has clicked on ATC on product page: ${window.location.href}`, true);
    }

    if (e.target.classList.contains('ui-tabs-tab') || e.target.closest('.ui-tabs-tab')) {
      let tabType = e.target.innerText;
      fireEvent(`Click - user has clicked on tab: ${tabType} on product page: ${window.location.href}`, true);
    }
  });
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    addControlTracking();

    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();
};
