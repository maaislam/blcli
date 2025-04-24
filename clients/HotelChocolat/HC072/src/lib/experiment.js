/**
 * HC072 - PDP Video Testing
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import { addSlideToCarousel } from './helpers';
import { addAndPlayVideo } from './videoSetUp';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if (VARIATION == '1') {
    // Play button over PDP image with Lightbox
    const videoPlayIcon = `<div class="${ID}-video-play__wrapper ${ID}-video-btn">
      <a href="javascript:void(0)" class="${ID}-video-play"><svg height='50px' width='50px'  fill="#000000" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path style="color:#000000;enable-background:accumulate;" d="m 70.000015,1002.3622 -40.00003,23 0,-46.00004 z" fill="#000000" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"></path></g></svg></a>
    </div>`;
    document.querySelector('.product-image-container').insertAdjacentHTML('afterbegin', videoPlayIcon);

    document.querySelector(`a.${ID}-video-play`).addEventListener('click', (e) => {
      addAndPlayVideo();
    });
    
  } else if (VARIATION == '2') {
    // Add video as last slide in carousel
    addAndPlayVideo();
   
  } else if (VARIATION == '3') {
    // Add link below the price & reviews
    const videoLink = `<div class="${ID}-video-link__wrapper ${ID}-video-btn">
      <a href="javascript:void(0)" class="${ID}-video-link">Learn More. Watch our Video<svg height='20px' width='25px'  fill="#000000" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path style="color:#000000;enable-background:accumulate;" d="m 70.000015,1002.3622 -40.00003,23 0,-46.00004 z" fill="#000000" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"></path></g></svg></a>
    </div>`;
    document.querySelector('.product-review-links.product-review-links-top').insertAdjacentHTML('afterend', videoLink);

    document.querySelector(`a.${ID}-video-link`).addEventListener('click', (e) => {
      addAndPlayVideo();
    });
    
  }
  

};
