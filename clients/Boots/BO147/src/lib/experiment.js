/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met', true);

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if(VARIATION === '1') {

    // Loop through the tiles and change NHS
    const allTiles = document.querySelectorAll('[class*="styles__grid"] [class*="styles__labelledIcon"]');

    for (let index = 0; index < allTiles.length; index += 1) {
      const element = allTiles[index];
      
      // Change NHS login 
      if(element.querySelector('[class*="styles__label"]').textContent.indexOf('NHS Login') > -1) {
        element.querySelector('img').setAttribute('src', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCI+DQogICAgPGRlZnM+DQogICAgICAgIDxwYXRoIGlkPSJ1cmc4czA5MDNhIiBkPSJNMjQuOTM4IDkuMzMzYy43MzYgMCAxLjMzMy41OTYgMS4zMzMgMS4zMzN2My42ODVoMi4zNzJjLjM5NiAwIC43NzEuMTc2IDEuMDI0LjQ4bDQuNjkgNS42MzJjLjIuMjQuMzA5LjU0MS4zMDkuODU0djUuNjMyYzAgLjczNi0uNTk2IDEuMzMzLTEuMzMzIDEuMzMzaC0uNTY3Yy0uMzgyIDEuOTI4LTIuMDg1IDMuMzg2LTQuMTIzIDMuMzg2LTIuMDM5IDAtMy43NDItMS40NTgtNC4xMjMtMy4zODZoLTcuMzZjLS4zODEgMS45MjgtMi4wODMgMy4zODYtNC4xMiAzLjM4Ni0yLjA0IDAtMy43NDItMS40NTgtNC4xMjMtMy4zODZINi42NjZjLS43MzcgMC0xLjMzMy0uNTk3LTEuMzMzLTEuMzMzVjEwLjY2NmMwLS43MzcuNTk2LTEuMzMzIDEuMzMzLTEuMzMzek0xMy4wNCAyNS45MjdjLS44NDggMC0xLjUzNy42OS0xLjUzNyAxLjUzNyAwIC44NDguNjkgMS41MzggMS41MzcgMS41MzhzMS41MzctLjY5IDEuNTM3LTEuNTM4YzAtLjg0Ny0uNjktMS41MzctMS41MzctMS41Mzd6bTE1LjYwNCAwYy0uODQ4IDAtMS41MzcuNjktMS41MzcgMS41MzcgMCAuODQ4LjY5IDEuNTM4IDEuNTM3IDEuNTM4czEuNTM3LS42OSAxLjUzNy0xLjUzOGMwLS44NDctLjY5LTEuNTM3LTEuNTM3LTEuNTM3ek0yMy42MDMgMTJIOHYxMy42MTZoMS4yN2MuNjg0LTEuMzkzIDIuMTE2LTIuMzU2IDMuNzctMi4zNTYgMS42NTMgMCAzLjA4Mi45NjMgMy43NjggMi4zNTZoNi43OTVWMTJ6bTQuNDE1IDUuMDE4SDI2LjI3djYuOThjLjY3NS0uNDY1IDEuNDkzLS43MzggMi4zNzItLjczOCAxLjM3MiAwIDIuNTkuNjY1IDMuMzU3IDEuNjg1di0zLjE0NmwtMy45ODItNC43OHoiLz4NCiAgICA8L2RlZnM+DQogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPG1hc2sgaWQ9InY3bXFucTQ0dWIiIGZpbGw9IiNmZmYiPg0KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjdXJnOHMwOTAzYSIvPg0KICAgICAgICA8L21hc2s+DQogICAgICAgIDx1c2UgZmlsbD0iIzU4NTg1OCIgeGxpbms6aHJlZj0iI3VyZzhzMDkwM2EiLz4NCiAgICAgICAgPGcgZmlsbD0iI0ZGRiIgbWFzaz0idXJsKCN2N21xbnE0NHViKSI+DQogICAgICAgICAgICA8cGF0aCBkPSJNMCAwSDQwVjQwSDB6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtLjQ0NCkiLz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg0K');
        element.querySelector('[class*="styles__label"]').innerHTML = 'Free <br>Delivery*';
      }

      if(element.querySelector('[class*="styles__label"]').textContent.indexOf('Free collection') > -1) {
        element.querySelector('[class*="styles__label"]').innerHTML = 'Free <br>Collection';
      }
    }

    if(window.location.href.indexOf('/online/pharmacy/new-to-boots-triage') > -1) {

      document.querySelector('[class*="styles-module__appContainer"] [class*="tyles__container--"]').style = 'display: none';

      // markup
      const markUp = 
      `<div class="${ID}-triageContainer">
        <div>
          <h1 id="pageTitle-How would you like to proceed?" class="${ID}-title">
            <span class="">How would you like to proceed?</span>
          </h1>
        </div>
        <a href="https://www.boots.com/online/pharmacy/gpsearch" class="${ID}-button ${ID}-key">Order prescription using Linkage Key</a>
        <p class="${ID}-paragraph">Recommended for patients registered with a GP in England*. You'll need a Linkage Key or Passphrase from your GP surgery. It's quicker to get medicines using this method.</p>
        <p class="${ID}-paragraph">You can read more about it <a href="https://www.boots.com/floating-editorial/editorial-legal/editorial-health/frps-faqs" target="_blank" rel="noopener noreferrer">here</a></p>
        <hr class="${ID}-divider">
        <div class="${ID}-prescription">
          <a href="https://www.boots.com/online/pharmacy/prescription" class="${ID}-button ${ID}-prescription">Order prescription</a>
          <p class="${ID}-paragraph">For patients who have not collected their Linkage Key or if your GP is based in Scotland, Wales, or NI.</p>
        </div>
        <p class="styles__disclaimer--2_a_h">*This service is only available through participating GP surgeries</p>
      </div>`;

      document.querySelector('[class*="styles-module__appContainer"]').insertAdjacentHTML('afterbegin', markUp);

    }
  }


  


  // -----------------------------
  // Tracking
  // -----------------------------

    
  if(VARIATION === 'control') {
    document.body.addEventListener('click', e => {
      document.body.classList.add('listener-added')
      if(e.target.closest('#transparentButtonLogin')) {
        fireEvent('Click Login');
      }
      if(e.target.closest('#transparentButtonCreateaccount')) {
        fireEvent('Click Create account', true);
      }
      if(e.target.closest('[data-eventaction="Click order using NHS login"]')) {
        fireEvent('Click NHS Login', true);
      }
      if(e.target.closest('#transparentButtonOrderprescriptionusingLinkageKey')) {
        fireEvent('Click Order with linkage key', true);
      }
      if(e.target.closest('#transparentButtonOrderprescription')) {
        fireEvent('Click Order prescription', true);
      }
    });

  }

  if(VARIATION === '1') {

    document.body.addEventListener('click', e => {
      document.body.classList.add('listener-added')
      if(e.target.closest(`.${ID}-prescription`)) {
        fireEvent('Click Order prescription', true);
      }
      if(e.target.closest(`.${ID}-key`)) {
        fireEvent('Click Order with linkage key', true);
      }
    });
  }

};
