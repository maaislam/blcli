/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  if (document.querySelector(`.${shared.ID}_wrapper`)) return;

  let designerUrl = document.querySelector('.product-details-container .accordion a[href*="/designers/"]');
  let categoryUrl = designerUrl.nextElementSibling;

  if (!designerUrl || !categoryUrl) return;
  const category = categoryUrl.textContent;
  designerUrl = designerUrl.getAttribute('href');
  categoryUrl = categoryUrl.getAttribute('href');

  const relatedProducts = document.querySelector('.related-products-container');
  relatedProducts.insertAdjacentHTML('beforebegin', `
    <div class="${shared.ID}_wrapper">
      <div class="${shared.ID}_textWrapper">
        <p>Not quite found the product for you?</p>
      </div>
      <div class="${shared.ID}_linkWrapper">
        <a href="${designerUrl}" class="large button ${shared.ID}_linkDesigner">View more from this designer</a>
        <a href="${categoryUrl}" class="large button ${shared.ID}_linkCategory">View more ${category}</a>
      </div>
    </div>
  `);

  // Track events.
  document.querySelector(`.${shared.ID}_linkDesigner`).addEventListener('click', () => {
    events.send(shared.ID, 'Click', 'Designer link clicked');
  });

  document.querySelector(`.${shared.ID}_linkCategory`).addEventListener('click', () => {
    events.send(shared.ID, 'Click', 'Category link clicked');
  });
};
