/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage, pollerLite, observer } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

const productIDs = ["96569890", "99169308", "98963103", "96927690", "89034690", "96629290", "35478569", "35517299", "35509803", "35801321", "32056991", "AB648800", "65529035", "AL125100", "AN402500", "54853320", "54213546", "54801706", "54011924", "77151469", "99122169", "96062375", "77649969"];
const heatwaveAlertHTML = `<span class="${ID}-heatwave-alert-icon">HEATWAVE</span>`;

const getPageData = () => {

  let dataObject;
  for (let i = 0; i < window.dataLayer.length; i += 1) {
    const data = window.dataLayer[i];
    if (typeof data === 'object' && data.event && data.event === 'HOF_onLoad') {
      dataObject = data;
      break;
    }
  }
  return dataObject;

}

const updatePLPItems = () => {

  setTimeout(() => {

    let allVisibleItems = document.querySelectorAll('#navlist li');

    [].slice.call(allVisibleItems).forEach((item) => {

      let prodID = item.getAttribute('li-productid');

      if(productIDs.includes(prodID)) {
        
        item.classList.add(`${ID}-heatwave-alert-item`);
        item.querySelector('.TextSizeWrap').insertAdjacentHTML('afterbegin', heatwaveAlertHTML);

      }

    })

    let scrollWatch = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          let seenPLPEntryMessage = "Visible - user has viewed heatwave alert message on PLP";
          logMessage(seenPLPEntryMessage);
          fireEvent(seenPLPEntryMessage, true);
  
          scrollWatch.unobserve(document.querySelector(`.${ID}-heatwave-alert-icon`));
        }
      });
    }, { root: null });
  
    scrollWatch.observe(document.querySelector(`.${ID}-heatwave-alert-icon`));

  }, 500);

  

  


}

const updatePDP = () => {

  pollerLite(['.pdpPriceRating'], () => {

    let insertionPoint = document.querySelector('.pdpPriceRating');

    var prodID = getPageData().colourVariantId;

    if(productIDs.includes(prodID)) {

      insertionPoint.insertAdjacentHTML('afterend', `<div class="col-xs-12 ${ID}-heatwave-alert-holder">${heatwaveAlertHTML}</div>`);

      let seenPDPAlertMessage = "Visible - user has seen the icon on PDP";
      logMessage(seenPDPAlertMessage);
      fireEvent(seenPDPAlertMessage, true);

    }

    // event handlers to determine if the colour has been changed
    const colourButtons = document.querySelectorAll('#ulColourImages > li');
    [].slice.call(colourButtons).forEach((colourButton) => {
      colourButton.addEventListener('click', (e) => {
        // grab colour variant of clicked button and re-process
        let colvarID = e.currentTarget.closest('li').getAttribute('data-colvarid');
        
        if(productIDs.includes(colvarID)) {
    
          insertionPoint.insertAdjacentHTML('afterbegin', heatwaveAlertHTML);

          let seenPDPAlertMessage = "Visible - user has seen the icon on PDP";
          logMessage(seenPDPAlertMessage);
          fireEvent(seenPDPAlertMessage, true);
    
        } else {

          if(document.querySelector(`.${ID}-heatwave-alert-icon`)) {
            document.querySelector(`.${ID}-heatwave-alert-icon`).remove();
          }

        }
        
      }, false);
    });

  });

  

}

const startExperiment = () => {

  let pageType = getPageData().pageType;

  if(pageType == "BrowsePL") {

    
    pollerLite(['#navlist li'], () => {

      updatePLPItems();

      const navlist = document.getElementById('navlist');    
      observer.connect(navlist, () => {
        setTimeout(() => {
          if(!document.querySelector(`.${ID}-heatwave-alert-icon`)) {
            updatePLPItems();
          }
          
        }, 500);
      }, {
        config: {
          attibutes: true,
          childList: true,
          subTree: false,
        },
      });


    });
    


  } else {

    updatePDP();

  }


}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

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

  pollerLite([
    () => {
      if(typeof getPageData() !== 'undefined') {
        return true;
      }
    }],
    () => {
      startExperiment();
    });
};
