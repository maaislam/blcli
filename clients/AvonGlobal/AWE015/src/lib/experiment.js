/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { h, render } from 'preact';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { deliverySection as variationOne } from './components/deliverySection';
import { deliveryTab } from './components/variationTwo';
import { VariationThree } from './components/variationThree';
import { elementIsInView } from '../../../../../lib/utils';
import { waitUntilElementExists } from '../../../../../lib/utils/waitUntilElementExists';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  let mobileDevices =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  fireEvent('Test Code Fired');

  if (VARIATION == 'control') {
    if (
      document
        .querySelector('body')
        .classList.contains('Action_ProductDetailPage')
    ) {
      waitUntilElementExists('#MarketingTextBar', (e) => {
        window.addEventListener(
          'scroll',
          () => {
            if (!elementIsInView(e, false)) {
              fireEvent('Conditions Met', true);
            }
          },
          true
        );
      });
    }
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if (VARIATION == 1) {
    variationOne();
  }
  if (VARIATION == 2) {
		deliveryTab();
  }
  if (VARIATION == 3) {
    window.addEventListener(
      'scroll',
      () => {
        if (elementIsInView(document.querySelector('#root'), false)) {
          fireEvent('Conditions Met', true);
        }
      },
      true
    );
    if (!mobileDevices) {
      const idOrNameOfPlacementOnPage = '.add-to-cart-container';
      waitUntilElementExists('.inc_pdp_block', () => {
        const placementonPage = document.querySelector(
          idOrNameOfPlacementOnPage
        );
        placementonPage.insertAdjacentHTML('afterend', "<div id='root'></div>");
        render(<VariationThree />, document.getElementById('root'));
      });
    } else {
      const idOrNameOfPlacementOnPage = '.add-to-cart-container';
      waitUntilElementExists(idOrNameOfPlacementOnPage, () => {
        const placementonPage = document.querySelector(
          idOrNameOfPlacementOnPage
        );
        placementonPage.insertAdjacentHTML('afterend', "<div id='root'></div>");
        render(<VariationThree />, document.getElementById('root'));
      });
    }
  }
};
