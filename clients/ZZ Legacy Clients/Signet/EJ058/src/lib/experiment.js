/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import Lightbox from './components/lightbox';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  const lightbox = new Lightbox(shared.ID, {
    content: 
      `<div class="${shared.ID}-lightbox_inner">
        <div class="${shared.ID}-rightSide">
          <div class="${shared.ID}-title">
            <h2>Save 15%</h2>
            <p>on full price diamond rings purchased online</p>
          </div>
          <div class="${shared.ID}-codeBox">
            <span>
            <input class="${shared.ID}-popup__success-code-code"
            autocomplete="off" 
            autocorrect="off" 
            autocapitalize="off" 
            spellcheck="false"
            type="text"
            value="DIAMOND15"></span>
          </div>
          <div class="${shared.ID}-codeCopy_success">Code copied!</div>
          <div class="${shared.ID}-terms">
            <p>To redeem please enter your voucher code at basket stage. The code is valid online only. Offer cannot be used in conjunction with any other promotions, cashback or discount. Excludes sale items.</p>
          </div>
        </div>
      </div>`,
  });


  // ----------------------------------------
    // Handle copy-paste button clicked
    // ----------------------------------------
    const copyBtn = document.querySelector(`.${shared.ID}-codeBox`);
    if(copyBtn) {
      copyBtn.addEventListener('click', () => {
        const input = document.querySelector(`.${shared.ID}-popup__success-code-code`);
        if(input) {
          input.select();
          input.setSelectionRange(0, 99999); // For mobile devices

          document.execCommand("copy");

          document.querySelector(`.${shared.ID}-codeCopy_success`).classList.add(`${shared.ID}-codeCopied`);
          
          events.send(`${shared.ID} v${shared.VARIATION}`, 'code copied');
        }
      });
    }


};
