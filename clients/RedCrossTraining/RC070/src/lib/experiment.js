/**
 * RC070 - Course Search Exit Light Box
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.redcrossfirstaidtraining.co.uk/where-we-train/course-search
 */
import { setup, generateLightbox } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  // console.log(`>>> ${shared.ID} is   RUNNING.`);
  if (document.referrer.indexOf("course-search") > -1 
  && window.location.pathname.indexOf("course-search") === -1) {
    // console.log('yes');
    if (localStorage.getItem(`${shared.ID}-lightboxShown`) == null) {
      generateLightbox();
    }
    
    
  }

  
};


export default activate;
