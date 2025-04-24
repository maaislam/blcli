/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const arrowDownSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="${ID}-faq-item--arrow"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" class=""></path></svg>`;

const items = [
  {
    id: 1,
    title: 'What are the delivery times?',
    descriptions: [
      'Deliveries are made every day except Sundays.',
      'The AM deliveries are between 8am and 12pm, the PM deliveries are between 12pm and 5pm.',
      'If you order before 10am, you will be eligible for same day delivery.',
    ],
  },
  {
    id: 2,
    title: 'Do I need to pay for a deposit?',
    descriptions: [
      `Yes, a deposit equal to two weeks' hire is charged for all equipment.`,
      'This is refunded when the equipment is returned, minus the hire cost.',
      'The deposit will take between 3-5 days to return to your bank.',
    ],
  },
  {
    id: 3,
    title: 'Can I cancel my order?',
    descriptions: [
      `Yes, if you need to cancel your reservation, you won't be charged for this and any deposit taken will be fully reimbursed before the EOP day before delivery.`,
    ],
  },
  {
    id: 4,
    title: 'What are the branch opening times?',
    descriptions: [
      `Most branches are open between:<br>
        <span>- Mon-Fri: <strong>7:30am - 5:30pm</strong></span><br>
        <span>- Sat: <strong>8:00am - 1:00pm</strong></span><br>
        <span>- Sun: <strong>Closed</strong></span><br>
        <span>- Bank holidays: <strong>Closed</strong></span>
      `,
      `To check the opening times for your local branch where this item is available: enter your postcode, select your dates and “check availability”.`,
    ],
  },
];

const getFaqWrapperHtml = () => `
<div class="${ID}-faq-wrapper">
  <h4>Ordering from HSS FAQs</h4>
  ${items.reduce(
    (acc, current) =>
      acc +
      `
      <div class="${ID}-faq-item" data-id=${current.id}>
        ${arrowDownSvg}
        <p class="${ID}-faq-item--title">${current.title}</p>
        <ul class="${ID}-faq-item--description">
        ${current.descriptions.reduce(
          (acc, curr) =>
            acc +
            `
          <li>
            ${curr}
          </li>
        `,
          ``
        )}</ul>
      </div>
  `,
    ``
  )}
</div>
`;

export default () => {
  setup();

  fireEvent('Conditions Met');

  /**
   * If control, bail out from here
   */
  if (VARIATION == 'control') return;

  /**
   * Check if `Have you considered` element exists
   */
  if (!document.querySelector('.similar-prdts .prod_list')) {
    fireEvent(`HSS035 - 'Have you considered' element does not exist.`);
    return;
  }

  /**
   * Find `Have you considered` element
   */
  const haveYouConsideredElement = document.querySelector(
    '#main > div > div.item_row1 > div > div.col-md-4 > div.item_info > div.item_row3'
  );

  if (haveYouConsideredElement) {
    haveYouConsideredElement.insertAdjacentHTML(
      'beforebegin',
      getFaqWrapperHtml()
    );

    for (const faqItem of document.querySelectorAll(`.${ID}-faq-item`)) {
      faqItem.addEventListener('click', () => {
        // Element is visible - close it
        if (faqItem.classList.contains('visible')) {
          fireEvent(
            `HSS035 - User closed FAQ: ${
              items.find((item) => item.id === Number(faqItem.dataset.id)).title
            }`
          );
          faqItem.classList.remove('visible');
          return;
        }

        // Some other element is visible - close it
        if (document.querySelector(`.${ID}-faq-item.visible`)) {
          const elementToClose = document.querySelector(
            `.${ID}-faq-item.visible`
          );
          fireEvent(
            `HSS035 - User closed FAQ: ${
              items.find(
                (item) => item.id === Number(elementToClose.dataset.id)
              ).title
            }`
          );
          elementToClose.classList.remove('visible');
        }

        // Element is not visible - open it
        if (!faqItem.classList.contains('visible')) {
          fireEvent(
            `HSS035 - User opened FAQ: ${
              items.find((item) => item.id === Number(faqItem.dataset.id)).title
            }`
          );
          faqItem.classList.add('visible');
        }
      });
    }
  }
};
