/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { events } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  const breadcrumbContainer = document.querySelector('#BreadcrumbGroup .breadcrumb');
  
  const lastLink = document.querySelector('li.MoreFromLinksRow:last-of-type a.MoreFromLink:last-of-type');

  breadcrumbContainer.textContent = "";

  breadcrumbContainer.insertAdjacentHTML('beforeend', `${lastLink.textContent.match(/^view/i) ? `${lastLink.outerHTML}` : `View ${lastLink.outerHTML}`}`);

  events.send(ID, `${ID} Active`, `${ID} Breadcrumbs swapped`);

  breadcrumbContainer.addEventListener('click', () => events.send(ID, `${ID} Click`, `${ID} Breadcrumbs clicked`));
};
