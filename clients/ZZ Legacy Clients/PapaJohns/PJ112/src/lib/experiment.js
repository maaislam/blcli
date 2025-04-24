/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';
import { dataObj } from './data';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  logMessage(ID + ' Variation: ' + VARIATION);

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') return;

  // Featured offeres
  document.querySelectorAll('.offer--btns a').forEach((element) => {
    const dealid = element.dataset?.dealid;

    if (!dealid || !dataObj[dealid]) return;

    let title = dataObj[dealid];
    if(dealid == 620) {
      title = dataObj[619];
    }

    const textElement =
      element.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.parentElement?.children?.[2]?.children?.[2];

    if (!textElement) return;

    textElement.innerHTML = title;

    element.addEventListener('click', (e) => {
      fireEvent(
        `${ID} - User clicked offer with deal ID: ${dealid} and new title: '${title}'`
      );
    });
  });

  // More offers from your store
  document.querySelectorAll('.more--offers a .text p').forEach((element) => {
    const parentElement =
      element.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement;

    if (
      !parentElement ||
      !parentElement.dataset?.dealid ||
      !dataObj[parentElement.dataset.dealid]
    )
      return;

    const title = dataObj[parentElement.dataset.dealid];

    element.innerHTML = title;

    parentElement.addEventListener('click', (e) => {
      fireEvent(
        `${ID} - User clicked offer with deal ID: ${parentElement.dataset.dealid} and new title: '${title}'`
      );
    });
  });
};
