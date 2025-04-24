/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { Fragment, h, render } from 'preact';
import shared from '../../../../../core-files/shared';
import { setup, fireEvent } from '../../../../../core-files/services';

// Components
import { FreeSample } from './components/FreeSample/index';

// Utils

// Data


const runChanges = () => {
  /** ******************************
 ***** App Start *****
 ****************************** */
  const App = () => (
    <Fragment>
      <FreeSample />
    </Fragment>
  );

  /** ******************************
 ***** App End *****
 ****************************** */

  /** ******************************
 ***** Placement On Page Start *****
 ****************************** */

  const idOrNameOfPlacementOnPage = '#basket-main';
  const placementOnPage = document.querySelector(idOrNameOfPlacementOnPage);
  placementOnPage.insertAdjacentHTML('afterbegin', "<div id='root'></div>");

  /** ******************************
 ***** Placement On Page End *****
 ****************************** */

  /** ******************************
 ***** Render App Start *****
 ****************************** */

  render(<App />, document.getElementById('root'));

  /** ******************************
 ***** Render App End *****
 ****************************** */
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    // ...
  };

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION === 'control') {
    const getCart = async () => {
      const result = await fetch('/cart.json');

      if (result.status === 200) {
        return result.json();
      }

      throw new Error(`Failed to get request, Shopify returned ${result.status} ${result.statusText}`);
    };
    const checkForSample = async () => {
      const cart = await getCart();
      cart.items.forEach((item) => {
        if (item.id === 39400972648493) {
          fetch('/cart/update.js', {
            method: 'POST',
            headers: [
              ['Content-Type', 'application/json'],
              ['Content-Type', 'application/csp-report'],
              ['Content-Type', 'application/expect-ct-report+json'],
              ['Content-Type', 'application/xss-auditor-report'],
              ['Content-Type', 'application/ocsp-request'],
            ],
            body: JSON.stringify({
              updates: {
                39400972648493: 0,
              },
            }),
          })
            .then(response => response.json())
            .then(() => {
              window.location.reload();
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      });
    };
    checkForSample();
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  runChanges();
  /**
   * Fire Toggle Js
   * After content is added to page, to grab elements
   */
  init();
};
