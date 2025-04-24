/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const startExperiment = () => {



  pollerLite(['.kr-body-container .container'], () => {


    const badgeHTML = `<div class="row ">
  <div class="col-sm-12 col-lg-8 col-md-12 col-12 hero-banner__section">
  
              <h1 class="hero-banner__title">Help take control of your later life finances</h1>
                          <div class="hero-banner__content"><ul class="list list--chevron">
  <li>
  <p>Unlock some of the property wealth in your&nbsp;home</p>
  </li>
  <li>
  <p>Explore your later life lending options with Key</p>
  </li>
  <li>
  <p>Understand the benefits and drawbacks of our products</p>
  </li>
  </ul>
                      
  </div>
  <div class="row c-v-align">
  <div class="col-md-6 col-lg-6 col-sm-3 col-12 hero-banner__section">
      <p class="help__title">How can we help ?</p>
      <p class="findOut__title_1">Find out how much equity I could release.</p>
      <p class="calc" style="margin-top: 11px;">Use our calculator if you:</p>
      <div class="hero-banner__content" >
          <ul class="list list--chevron">
            <li>
              <p class="list_item">Are a UK homeowner aged 55+ </p>
            </li>
            <li>
               <p class="list_item">Own a property worth 70,000+ </p>
            </li>
  
           </ul>
  <a class="new_Calculator button" href="https://www.keyadvice.co.uk/equity-release/calculator">Try our new Calculator</a>&nbsp; &nbsp; &nbsp;&nbsp;</div>
                      
  </div>
  
  <div class="col-md-6 col-lg-6 col-lg-4 col-12 col-sm-3 hero-banner__image b-lazy b-loaded right_section" style="width: 415px;height: 250px;">
               <p class="findOut_title_2">Find out which Later Life Mortgage options I could be suitable for.</p>
     
                          <div class="hero-banner__content">
                             
 
  <p class="range_1">There are a range of options available to help finances better retirement.</p>
  </li>
  
  
  </ul>
              <a class="new_Calculator_1 button" href=" https://www.keyadvice.co.uk/later-life-mortgage-finder">Find a later life mortgage</a>
          </div>
  
  </div></div>
  </div>
  
          <div class="col-md-12 col-lg-4 col-sm-12 col-12 hero-banner__image b-lazy b-loaded pic"></div>
  
  </div>
  `;
    document.querySelector("body > div.kr-body-container.layout.grid-wrapper > section.hero-banner.grid-wrapper.component > div.container").innerHTML = badgeHTML;

   

  });


}

export default () => {
  setup();
  logMessage(ID + " Variation: " + VARIATION);
  fireEvent('Conditions Met');
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
  startExperiment();
};
