/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { countdown, pollerLite } from '../../../../../lib/uc-lib';

// ----------------------------------------
// VARIATION 1 = AV064a
// VARIATION 2 = AV064b
// ----------------------------------------

let cutoffDate = 21;
let cutoffHours = 0;
if(shared.VARIATION == 2) {
  cutoffDate = 22;
  cutoffHours = 13;
}

export default () => {
  setup();
  const { rootScope, ID } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {

    // -- Declare banner markup
    const markup = `
      <div class="${shared.ID}--delivery-banner">
        <div class="${shared.ID}--delivery-banner--content">
          Guaranteed Christmas Delivery
          <span class="${shared.ID}--delivery-banner--content__normal">if you order 
            ${shared.VARIATION == 2 ? 'with <b>express delivery</b>' : ''}
            in the next</span>
          <span id="${shared.ID}-countdown"></span>
        </div>
      </div>
    `;

    const isBST = false;
    
    let cutoff = new Date();
    cutoff.setUTCHours(cutoffHours - (isBST ? 1 : 0), 0, 0);
    cutoff.setDate(cutoffDate);
    cutoff.setMinutes(0);
    cutoff.setSeconds(0);

    cutoff = cutoff.getTime();

    pollerLite([
      '.RightPanel',
    ],
    () => {
        const rightPanel = $( ".RightPanel" );
        if (rightPanel) {
          rightPanel.append(markup);
    
        var result = countdown({
          cutoff,
          element: `#${shared.ID}-countdown`,
          labels: {
            d: 'days,',
            h: 'hours,',
            m: 'mins',
            s: '',
          },
        });
      };
    }); 


    if(window.innerWidth < 417) {

      pollerLite([
        '.MobileImages',
        '.AddToCart'
      ],
      () => {
        const mobileImages = $( ".MobileImages");
        if (mobileImages) {
          const addToCart = $( ".AddToCart" );
          if (addToCart) {
            addToCart.append(markup);
  
            var result = countdown({
              cutoff,
              element: `#${shared.ID}-countdown`,
              labels: {
                h: 'hours',
                m: 'mins',
                s: '',
              },
            });
          }
        }
      });
    }
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });

  init();
};
