/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from "./services";
import shared from "./shared";
import { countdown, pollerLite } from "../../../../../lib/uc-lib";
import { observePageChange } from '../../../../../lib/utils';

const runDesktopChanges = () => {
  
  if (!document.querySelector(`.${shared.ID}--delivery-banner`)) {
    
    // -- Declare banner markup
    const markup = `
      <div class="${shared.ID}--delivery-banner">
        <div class="${shared.ID}--delivery-banner__img">
          <img class="${shared.ID}--delivery-banner__img--van" src="https://ab-test-sandbox.userconversion.com/experiments/delivery-truck.png">
        </div>
        <div class="${shared.ID}--delivery-banner--content">
          You can get this tomorrow through courier delivery
          <span class="${shared.ID}--delivery-banner--content__normal">if you order in the next</span>
          <span id="${shared.ID}-countdown"></span>
        </div>
      </div>
      `;

    // Calculate time:
    const isBST = false;

    let cutoff = new Date();
    cutoff.setUTCHours(13 - (isBST ? 1 : 0), 0, 0);
    cutoff = cutoff.getTime();

    // Add markup:
    pollerLite([
      '.basket_section'
    ], () => {
      const basketSection = document.querySelector(".basket_section");
      if (basketSection) {
        basketSection.insertAdjacentHTML("afterend", markup);
        var result = countdown({
          cutoff,
          element: `#${shared.ID}-countdown`,
          labels: {
            h: "hours",
            m: "mins",
            s: "",
          },
        });
      };
    })
  };
};

const runMobileChanges = () => {
  
  if (!document.querySelector(`.${shared.ID}--delivery-banner`)) {
    
    // -- Declare banner markup
    const markup = `
      <div class="${shared.ID}--delivery-banner">
        <div class="${shared.ID}--delivery-banner__img">
          <img class="${shared.ID}--delivery-banner__img--van" src="https://ab-test-sandbox.userconversion.com/experiments/delivery-truck.png">
        </div>
        <div class="${shared.ID}--delivery-banner--content">
          You can get this tomorrow through courier delivery
          <span class="${shared.ID}--delivery-banner--content__normal">if you order in the next</span>
          <span id="${shared.ID}-countdown"></span>
        </div>
      </div>
      `;

    // Calculate time:
    const isBST = false;

    let cutoff = new Date();
    cutoff.setUTCHours(13 - (isBST ? 1 : 0), 0, 0);
    cutoff = cutoff.getTime();

    pollerLite([
      '.infos_section'
    ], () => {
      const infoSection = document.querySelector('.infos_section');
      if (infoSection) {
        infoSection.insertAdjacentHTML('beforebegin', markup);
        var result = countdown({
          cutoff,
          element: `#${shared.ID}-countdown`,
          labels: {
            h: "hours",
            m: "mins",
            s: "",
          },
        });
      }
    })

  }
};

const init = () => {
  
  setup();

  // Run desktop version
  pollerLite([".v7__pdp_details", ".desktop_version"], () => {
    
    runDesktopChanges();
  }, { multiplier: 1});

  // Run mobile version
  pollerLite([".v7__pdp_details", ".mobile_version"], () => {
    
    runMobileChanges();
  }, { multiplier: 1})

};

export default () => {
  observePageChange(document.body, (p) => {
    
    init();
  });

  init();

};
