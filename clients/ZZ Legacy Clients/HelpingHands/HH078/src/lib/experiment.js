/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import searchInput from './components/locationSearch';
import phoneNumber from './components/phoneNumber';
import initExternalLib from './helpers/addExternalLib';
import { isBranchPage, updateBranchData } from './helpers/branchData';
import observeDOM from './helpers/observerDOM';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  //fireEvent('Test Code Fired');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const mapsJs1 = 'https://maps.google.com/maps/api/js?language=en&region=gb&key=AIzaSyDghcp4L8xCOOzSylR9V4CJko2NXBLP6g0';

  initExternalLib(mapsJs1);

  document.querySelector('.menu-top').classList.add(`${ID}__menu-top`);
  document.querySelector('.menu-top-logo').classList.add(`${ID}__menu-top-logo`);
  document.querySelector('.find-local')?.classList.add(`${ID}__find-local`);
  document.querySelector('.menu-item-care')?.classList.add(`${ID}__menu-item-care`);

  const init = (showNumber) => {
    const getBranchData = () => {
      return localStorage.getItem(`${ID}_branch`);
    };
    const userClickedCross = localStorage.getItem(`${ID}__clickedCloseBtn`);
    if (isBranchPage() && !userClickedCross) {
      updateBranchData(ID);
    }
    let data = getBranchData();
    data = JSON.parse(data);
    //console.log(data);

    //searchInput(ID, data, fireEvent);
    phoneNumber(ID, data);
    if (showNumber) {
      document.querySelector(`.${ID}__phone-container`).style.visibility = 'visible';
    }
    fireEvent('Conditions Met');
  };
  const callbackFn = (mutation) => {
    //console.log(mutation);
    if (mutation.addedNodes.length > 0)
      mutation.addedNodes.forEach((item) => {
        if (item.nodeName == 'DIV' && (item.matches('.HH067_wrapper') || item.closest('.HH067_wrapper'))) {
          item.classList.add(`${ID}__over-HH067_wrapper`);
          setTimeout(() => {
            init();
          }, 2000);
        }
      });
  };
  const getBranchData = () => {
    return localStorage.getItem(`${ID}_branch`);
  };
  const userClickedCross = localStorage.getItem(`${ID}__clickedCloseBtn`);
  if (isBranchPage() && !userClickedCross) {
    updateBranchData(ID);
  } else {
    localStorage.removeItem(`${ID}__clickedCloseBtn`);
  }
  let data = getBranchData();
  data = JSON.parse(data);
  //console.log(data);

  searchInput(ID, data, fireEvent);

  setTimeout(() => {
    init();
  }, 1500);

  const startTime = new Date().getTime();
  const interval = setInterval(function () {
    if (new Date().getTime() - startTime > 5000) {
      clearInterval(interval);
      return;
    }
    init();
  }, 200);

  observeDOM(`.${ID}__menu-top`, callbackFn);
};
