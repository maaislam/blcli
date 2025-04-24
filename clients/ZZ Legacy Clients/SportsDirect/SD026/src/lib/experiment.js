/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events, observer } from '../../../../../lib/utils';
import settings from './shared';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  if (VARIATION == 2) {
    events.send(ID, `${ID} Control`, `${ID} Control is active`);
    return false;
  } else {
    events.send(ID, `${ID} Variation ${VARIATION} Active`, `Variation ${VARIATION} is active`);    
  }


  let manAddr = document.querySelector('a.manuallyAddAddress');
  manAddr.click();
  manAddr.classList.add('SD-hide');

  // Observe page for new form
  // const existingAddr = document.querySelector('#AddressChooserWrapper');
  // console.log('exist arr ', existingAddr);
  // observer.connect(existingAddr, () => {
  //   console.log('change');
  //   manAddr = document.querySelector('a.manuallyAddAddress');
  //   manAddr.click();
  //   manAddr.classList.add('SD-hide');
  // }, {
  //   config: {
  //     attributes: true,
  //     childList: true,
  //     subtree: false,
  //   }
  // })

};
