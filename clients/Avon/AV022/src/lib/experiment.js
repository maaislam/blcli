/**
 * AV022 - Rep Contact pre and post checkout
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import ContactBox from './components/ContactBox/ContactBox';

export default () => {
  setup();
  const { rootScope } = shared;

  /** Make changes to the page */
  const makeChanges = () => {
    const contactBox = new ContactBox();
  };

  // Rebuild nav if layout changes and it's removed
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(makeChanges, 250);
  });

  // Init
  makeChanges();
};
