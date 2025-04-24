/**
 * @desc Mobile basket
 */

import settings from '../../settings';
import { pollerLite } from '../../../../../../../lib/uc-lib';

const { ID } = settings;

export default class DesktopBasket {
  constructor() {
    this.render();
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const desktopBasketWrapper = document.querySelector('#customisation_right');
    desktopBasketWrapper.removeAttribute('style');
    document.querySelector('#site_torso').insertAdjacentElement('afterbegin', desktopBasketWrapper);
  }
}
