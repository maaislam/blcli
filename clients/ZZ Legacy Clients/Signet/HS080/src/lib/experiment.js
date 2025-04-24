/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite, events } from '../../../../../lib/utils';

export default () => {
  setup();

  if(shared.VARIATION === 'control') {

    /**
     * Events
     */
    const popUp = document.querySelector('#js-emailSignUpPopup');
    if(popUp) {
      pollerLite(['.email-sign-up-popup.email-sign-up-popup--is-active'],
      () => {
        events.send(`${shared.ID}`, 'pop up shown', `${shared.ID} pop up shown`);

        popUp.querySelector('#js-cancel').addEventListener('click', () => {
          events.send(`${shared.ID}`, 'click', `close email popup`);
        });

        popUp.querySelector('.button.email-sign-up-popup__submit').addEventListener('click', () => {
          events.send(`${shared.ID}`, 'click', `email sign up`);
        });
      });
    }
  }
};
