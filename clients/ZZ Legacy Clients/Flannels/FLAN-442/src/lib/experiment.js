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

const productIDs = ["71263999", "64580899", "64569499", "64988499", "64569199", "64759606", "64546912", "64526218", "64629406", "64485999", "64823524", "98311406", "64629412", "64629424", "64988599", "99229799", "64799015", "57533906", "70175815", "39069399", "64857601", "39178305", "35402010", "22311301", "64861118", "23176506", "23176518", "64848112", "64817201", "57304501", "54158112", "71044504", "71129804", "23118104", "54091499", "23100901", "64528899", "64462918", "35193499", "64552599", "64423213", "64849006", "65403001", "54098006", "57309508", "65317367", "64988699", "57538818", "64988318", "57519506", "57529615", "54094106", "57539213", "57277799", "57415401", "57295608", "57317199", "57292803", "64837618", "64555501", "64751918", "64544818", "65703901", "65353501", "57293312", "64539206", "23179904", "23329807", "23159169", "23132303", "23180969", "23180004", "23148504", "23190104", "23194369", "23485005", "23484701", "22322405", "22301403", "27598230", "27546001", "27570701", "64539206", "57293312", "75771006", "75952703", "75069090", "75661405", "75937890", "75605424", "75069990", "75924190", "80609003", "75720369", "75605903", "75978463", "71126918", "70775799", "70074704", "70033401", "71419004", "70774908", "71409803", "70215201", "71620615", "70901505", "76814613", "70167808", "71603001", "70616312", "70782501", "39022224", "39000202", "39059303", "99116810", "39604904", "75264506", "91442010", "75637318", "57530569", "71409212", "64823615", "57524804", "35058918", "35051003", "35025612", "35065206", "35067006", "35020908", "35065215", "35067015", "35021208", "35027312", "35020418", "75637303", "64823703", "64823901", "64823805", "64823499", "23269315", "23148111", "23141703", "23324106", "23410824", "35029399", "35029303", "35029312", "35028815", "35051015", "35029601", "57530599", "35020715", "57530515", "35050001", "35050003", "35029603", "35020518", "23184006", "23183703", "23184203", "23183705", "35430869", "35431099", "35431006", "35410099", "35189099", "35430899", "35431106", "98111603", "64528899", "23100901", "54158112", "23118103", "98103912", "71050503", "54157212", "64528702", "23118104", "54091499", "71050018", "64528912", "71044504", "71129804", "71129803", "99028810", "75384701", "75356315", "81405310", "99116910", "39069299", "70561810", "35271299", "39069399", "64836599", "32114299", "35271199", "64836499", "67260099", "57319399", "64836799", "64836899", "64558199", "70561811", "99116810", "23132303", "23191399", "23162603", "64799299", "64681618", "64301418", "23484701", "23484705", "23484403", "23485005", "23481301", "23484369", "23848515", "22309803", "23102469", "64526113", "32022613", "75301110", "91411810", "22349407", "88083999", "64553403", "75311310", "57167599", "64503299", "23179824", "64958399", "23179706", "57031499", "23161716", "71905706", "39013806", "64550206", "57295318", "64551318", "75760003", "75759903", "65831699", "35074401", "57095006", "65830601", "57104401", "35432706", "35432703", "64870701", "67270001", "32153401", "75605401", "57536715", "64899104", "64621999", "64647399", "64647310", "64781711"];
const heatwaveAlertHTML = `<span class="${ID}-heatwave-alert-icon">HEATWAVE ALERT!</span>`;

const getPageData = () => {

  let dataObject;
  for (let i = 0; i < window.dataLayer.length; i += 1) {
    const data = window.dataLayer[i];
    if (typeof data === 'object' && data.event && data.event === 'FLAN_onLoad') {
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
        item.querySelector('.s-productthumbbox').insertAdjacentHTML('afterbegin', heatwaveAlertHTML);

      }

    })

    if(document.querySelector(`.${ID}-heatwave-alert-icon`)) {
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
    }
    

  }, 500);

  

  


}

const updatePDP = () => {

  pollerLite(['#productImageContainer'], () => {

    let insertionPoint = document.getElementById('productImageContainer');

    var prodID = getPageData().colourVariantId;

    if(productIDs.includes(prodID)) {

      insertionPoint.insertAdjacentHTML('afterbegin', heatwaveAlertHTML);

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
          updatePLPItems();
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
