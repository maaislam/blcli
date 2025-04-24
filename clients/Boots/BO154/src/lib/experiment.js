/**
 * BO154 - PDP AdCard
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import { clickEvents } from './helpers';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
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

  const spendSaveCollect = 'https://service.maxymiser.net/cm/images-eu/new-boots-com/CF31F87F169175B081477909EC4F36737347AE174F12E3BC90E62BAC92961D69.png?meta=/Image-Upload/AdCardPanel-small.png';
  const spendSignInCollect = 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F2D9FF96B1DB3D49A3ADC03DFB5FA625C3B6287170F98571982330EFCF280421.png?meta=/Image-Upload/bootsCollect1.png';

  const createBanner = (image, link, type) => {
   const banner = `<div class="${ID}-adCard__wrapper">
      <a link-target="${type} "href="${link}">
        <div class="${ID}-adCard__container">
          <img src="${image}">
        </div>
      </a>
    </div>`;

    document.querySelector('#estore_adcard_points_to_earn_widget').insertAdjacentHTML('afterend', banner);
  }

  //if user is not logged in and doesn't have Adcard 
  let isLoggedInUser = window.dataLayer[1].user.isLoggedIn;

  if (window.dataLayer[1].user.advantageCardFlag == "false" && isLoggedInUser === 'false') {
    createBanner(spendSaveCollect, 'https://www.boots.com/advantage-card', 'noAdcard');
    fireEvent('Banner shown - not logged in: no adcard');
  }

  // if user not logged in and does have Adcard
  else if (window.dataLayer[1].user.advantageCardFlag == "true" && isLoggedInUser === 'false') {
    createBanner(spendSignInCollect, 'https://www.boots.com/webapp/wcs/stores/servlet/BootsLogonForm', 'hasAdcard');
    fireEvent('Banner shown - not logged in: has adcard');
  }

  // if just logged in with no adcard
  else if (window.dataLayer[1].user.advantageCardFlag == "false" && isLoggedInUser === 'true') {
    createBanner(spendSaveCollect, 'https://www.boots.com/advantage-card', 'noAdcard');
    fireEvent('Banner shown - logged in: no adcard');
  }
  else {
    return;
  }

  document.querySelector(`.${ID}-adCard__wrapper a`).addEventListener('click', (e) => {
    fireEvent('Clicked banner ' + e.currentTarget.getAttribute('link-target'));
  });







/*

  let isLoggedInUser = false;
  let bannerImg = "https://service.maxymiser.net/cm/images-eu/new-boots-com/CF31F87F169175B081477909EC4F36737347AE174F12E3BC90E62BAC92961D69.png?meta=/Image-Upload/AdCardPanel-small.png";
  let userHasAdCard = false;
  if (window.dataLayer[1].user.advantageCardFlag == "true") {
    isLoggedInUser = true;
    bannerImg = "https://service.maxymiser.net/cm/images-eu/new-boots-com/A080A3285D002DED217E55957513CE4AE91392FDBC67922B88CBD74C3364F056.png?meta=/Image-Upload/AdCardPanel-signin-small.png";
  }
  
  // --- User doesn't have Advantage Card
  if (window.dataLayer[1].user.advantageCardFlag == "false") {
    const adCardBanner = `<div class="${ID}-adCard__wrapper">
      <a href="/advantage-card">
        <div class="${ID}-adCard__container">
          <img src="${bannerImg}">
        </div>
      </a>
    </div>`;

    if (!document.querySelector(`.${ID}-adCard__wrapper`)) {
      document.querySelector('.rowContainer section[itemprop="offers"]').insertAdjacentHTML('beforeend', adCardBanner);
      fireEvent(`Visible - Ad Card Banner`);
      // --- Click Events
      clickEvents(isLoggedInUser, userHasAdCard, document.querySelector(`.${ID}-adCard__wrapper`), 'Ad card banner');
      
      // --- Ad Card Points
      pollerLite(['#estore_adcard_points_to_earn_widget'], () => {
        document.querySelector(`.${ID}-adCard__wrapper`).insertAdjacentElement('beforebegin', document.querySelector('#estore_adcard_points_to_earn_widget'));
      });
    }
  } else {
    userHasAdCard = true;
    // --- User is not logged in
    if (window.dataLayer[1].user.isLoggedIn == "false" && !document.querySelector(`.${ID}-adCardPoints__wrapper`)) {
      // --- Ad Card Points
      pollerLite(['#loggedOut_link #signInQuickLink', '#estore_adcard_points_to_earn_widget'], () => {
        const logInPage = document.querySelector('#loggedOut_link #signInQuickLink').getAttribute('href');

        document.querySelector('.rowContainer section[itemprop="offers"]').insertAdjacentHTML('beforeend', `<div class="${ID}-adCardPoints__wrapper"><a href="${logInPage}"></a></div>`);
        
        document.querySelector(`.${ID}-adCardPoints__wrapper a`).insertAdjacentElement('afterbegin', document.querySelector('#estore_adcard_points_to_earn_widget'));

        // --- Click Events
        clickEvents(isLoggedInUser, userHasAdCard, document.querySelector(`.${ID}-adCardPoints__wrapper`), 'Ad card points');
      });
    }
  }*/
  
};
