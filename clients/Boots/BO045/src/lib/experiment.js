/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { runNav } from './navigation/triggerNav';
import roundelMarkup from './roundels/roundelMarkup';
import shared from './shared';


export default () => {
  setup();
  runNav();
  roundelMarkup();

  // move title in to roundels on V2
  if(shared.VARIATION === '2') {
    if(document.body.classList.contains(`${shared.ID}-beauty`) || document.body.classList.contains(`${shared.ID}-baby`)) {
      const title = document.querySelector('#estore_category_heading h1');
      document.querySelector(`.${shared.ID}_categoryBar`).insertAdjacentElement('afterbegin', title);

      // move category outside of it
      document.querySelector(`#estore_coremedia_template_container`).insertAdjacentElement('beforebegin', document.querySelector(`.${shared.ID}_categoryBar`));
    }
  }
};
