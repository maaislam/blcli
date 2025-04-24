/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { renderElements } from './data';
import { events, logMessage } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);
  
  const basketValue = document.querySelector('#hdnBasketValue');
  events.send(
    'Experimentation',
    'PapaJohns - PJ111',
    'Test ID: PJ111 Variation: ' + VARIATION + ' Label: Conditions Met',
    {
      opts: {'dimension38' : basketValue?.value }
    }
  );

  if (VARIATION == 'control') return;

  localStorage.setItem(ID, -1);

  renderElements();
};
