/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import mobileHeader from './mobileHeader';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  const url = window.location.pathname;

  const jumperName = () => {
    let jumperText;
    if(url.indexOf('/uk/') > -1) {
      jumperText = "jumper";
    } else {
      jumperText = "sweater";
    }

    return jumperText;
  }

  const getCountryName = () => {
    let countryName;
    if(url.indexOf('/uk/') > -1) {
      countryName = "shipped direct from the UK";
    }
    if(url.indexOf('/eu/') > -1) {
      countryName = "shipped direct from Europe";
    }
    if(url.indexOf('/world/') > -1) {
      countryName = "shipped worldwide";
    }
    if(url.indexOf('/us/') > -1) {
      countryName = "shipped direct from the USA";
    }

    return countryName;
  }
  
  const getCountryText = () => {
    let countryText;
    if(url.indexOf('/uk/') > -1) {
      countryText = "The United Kingdom's";
    }
    if(url.indexOf('/eu/') > -1) {
      countryText = "Europe's";
    }
    if(url.indexOf('/world/') > -1) {
      countryText = "A Worldwide";
    }
    if(url.indexOf('/us/') > -1) {
      countryText = "The USA's";
    }

    return countryText;
  }

  const getContent = () => {
    let content;
    if(VARIATION === '1' || VARIATION === '3') {
      if(url.indexOf('/geeks-guide-to-ugly-christmas') > -1 || url.indexOf('/christmas-jumpers/') > -1 ) {
        content = `<span>Welcome to Merchoid.</span> The place to get your officially licensed christmas ${jumperName()} to keep you festive this year.`;
      } else {
        content = "<span>Welcome to Merch Nerdvana.</span> Merchoid stock officially licensed merch to satisfy all your geeky needs.";
      }
    } 
    else if(VARIATION === '2') {
      if(url.indexOf('/geeks-guide-to-ugly-christmas') > -1 || url.indexOf('/christmas-jumpers/') > -1 ) {
        content = `<span>Welcome to Merchoid.</span> Get your officially licensed christmas ${jumperName()} ${getCountryName()}.`
      } else {
        content = `<span>Welcome to Merchoid.</span> ${getCountryText()} officially licensed merch store, to satisfy all your geeky needs.`;
      }
    }

    return content;
  }

  const createBanner = () => {
    const welcomeBanner = document.createElement('div');
    welcomeBanner.classList.add(`${ID}-contentBanner`);
    welcomeBanner.innerHTML = `<p>${getContent()}</p>`;

    if(window.innerWidth > 767) {
      document.querySelector('.sections.nav-sections').insertAdjacentElement('afterend', welcomeBanner);
    } else {
      document.querySelector('.header.content').appendChild(welcomeBanner);
    }

    if(VARIATION === '3') {
      window.addEventListener("scroll", function() {
        const elementTarget = document.querySelector(`.${ID}-contentBanner`);
        if (window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight)) {

          elementTarget.remove();
          localStorage.setItem(`${ID}-bannerShow`, true);
        }
      });
    }

  }

  mobileHeader();
  if(VARIATION === '3') {
    if(!localStorage.getItem(`${ID}-bannerShow`, true)) {
      createBanner();
    }
  } else {
    createBanner();
  }

};
