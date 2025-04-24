/**
 * HC047 - PDP Value Messaging
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import uspData from './data';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  const rightSideProductContent = document.querySelector('#product-content');

  let itemList = '';
  for (let i = 1; i <=4; i += 1) {
    const usp = uspData[i];
    itemList += `<li class="${ID}-usp-msg" id="${ID}-${usp.id}">
      <div class="${ID}-usp__img">
        <div>
          <img alt="${usp.alt}" src="${usp.img}">
        </div>
      </div>
      <div class="${ID}-usp__msg">
        <span>${usp.msg}</span>
      </div>
    </li>`;
  }

  const uspMessagesContainer = `<div class="${ID}-valueMessages__wrapper v${VARIATION}">
    <div class="${ID}-valueMessages__container">
      <ul class="${ID}-valueMessages__content">
        ${itemList}
      </ul>
    </div>
  </div>`;

  rightSideProductContent.querySelector('.product-actions').insertAdjacentHTML('beforebegin', uspMessagesContainer);
};
