/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import topContent from './components/TG069/components/aboveTheFold/topContent';
import generalMarkup from './components/TG069/components/belowTheFold/generalMarkup';
import brochureBanner from './components/brochureBanner';
import forms from './components/forms';
import topContentMobile from './components/TG071/components/aboveTheFold/topContentMobile';
import generalMarkupMobile from './components/TG071/components/belowTheFold/generalMarkupMobile';
import { pollerLite } from '../../../../../lib/utils';


export default () => {
  setup();
  
  // TG069
  if(window.innerWidth > 767) {
    // TG069
    topContent();
    generalMarkup();
    
  } else { 
    // TG071
    topContentMobile();
    generalMarkupMobile();
  }

  pollerLite(['#TG103-app'], () => {
    // add the brochure banner
    brochureBanner();

  // contact and brochure forms
    forms();
  });
};
