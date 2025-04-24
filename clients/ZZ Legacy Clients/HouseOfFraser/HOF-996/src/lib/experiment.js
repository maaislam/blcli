/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, getCookie } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';

const { ID } = shared;

function loadScript(url, id = null) {
  const existingScript = document.getElementById(id);

  if (!existingScript) {
    const script = document.createElement("script");
    script.src = url;

    if (id) script.id = id;
    document.body.appendChild(script);
  }
}

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  loadScript("//embed.typeform.com/next/embed.js");

  let theGACookie = getCookie('_ga');

  document.querySelector('.OrderComplete h1').insertAdjacentHTML('afterend', `
  
    <div class="${ID}-typeform">

      <p>Give us your feedback and you could <span class="${ID}-typeform--boldtext">win 1 of 5 £100 Frasers Group gift vouchers!</span></p>
      <button class="${ID}-typeform--button" data-tf-hidden="ga_id=${theGACookie}" data-tf-popup="fXgsP7m5" data-tf-iframe-props="title=Fraser Group - Checkout Success - House of Fraser" data-tf-medium="snippet">Start Survey</button>
    </div>

  `);

  fireEvent(`Visible - user has seen the survey prompt - Cookie ID: ${theGACookie}`);

  let typeformButton = document.querySelector(`.${ID}-typeform--button`);

  typeformButton.addEventListener('click', () => {

    fireEvent(`Clicked - user has clicked the survey start button - Cookie ID: ${theGACookie}`);

  });

};
