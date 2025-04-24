import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import inputHandlers from './helpers/inputHandlers';
import hideOptionalInputFields from './helpers/hideOptionalInputFields';
import setOrderSummary from './helpers/setOrderSummary';
import passwordVisibility from './helpers/passwordVisibility';
import changeFieldLayout from './helpers/changeFieldLayout';
import { isMobile } from './helpers/utils';

const { ID, VARIATION } = shared;

const init = () => {
  const main = document.querySelector('#main');
  const paymentIconElem = document.querySelector('#payments-and-security-icon');

  if (!isMobile()) {
    const container = document.createElement('div');
    container.classList.add(`${ID}__container`);
    container.appendChild(main);
    paymentIconElem.insertAdjacentElement('beforebegin', container);
  }

  const headingTexts = `<div class='${ID}__headingTexts'>
    <div class='${ID}__headingText'>Tell us about yourself</div>
    <div>We’ll send your order confirmation to these details.</div>
  </div>`;
  const slotContainer = document.querySelector('.html-slot-container p');
  slotContainer.insertAdjacentHTML('afterend', headingTexts);

  //firstname, lastname in a single row
  // const firstName = document.querySelector('#dwfrm_profile_customer_firstname');
  // const lastName = document.querySelector('#dwfrm_profile_customer_lastname');

  // const firstNameRow = firstName.closest('.form-row');
  // const lastNameRow = lastName.closest('.form-row');

  // const newNameRow = `<div class='${ID}__newNameRow'>
  //   <div class='${ID}__firstName'>
  //     ${firstNameRow.outerHTML}
  //   </div>
  //   <div class='${ID}__lastName'>
  //     ${lastNameRow.outerHTML}
  //   </div>
  // </div>`;

  // lastNameRow.insertAdjacentHTML('afterend', newNameRow);
  // firstNameRow.remove();
  // lastNameRow.remove();

  setOrderSummary(ID);
  hideOptionalInputFields(ID);
  changeFieldLayout(ID);
  // inputHandlers(ID);
};

export default () => {

  setup();

  fireEvent('Conditions Met');

  inputHandlers(ID, VARIATION);

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    const accordionHeader = target.closest(`.${ID}__accordion-header`);

    if (accordionHeader) {
      const content = accordionHeader.nextElementSibling;

      accordionHeader.classList.toggle('open');
      content.classList.toggle('open');

      if (content.classList.contains('open')) {
        content.style.maxHeight = `${content.scrollHeight}px`; //Set height to content height
      } else {
        content.style.maxHeight = '0'; //Collapse the content
      }
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  document.body.addEventListener('pointerup', (e) => {
    const { target } = e;

    if (target.closest('#revealPasswordIcon') || target.closest('#hidePasswordIcon')) {
      passwordVisibility(ID);
    }
  })

  init();

  // observeDOM('.complete-address', () => {
  //   handleBillingAddress();
  // }, {
  //   childList: true,
  //   subtree: false,
  //   attributes: true,
  //   characterData: true,
  //   characterDataOldValue: true
  // });
};
