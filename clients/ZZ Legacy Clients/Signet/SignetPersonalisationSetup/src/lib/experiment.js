/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  // DO NOT CHANGE THE TOP FUNCTIONS!

  // gets the last category from the URL, either PLP or PDP
  const getLastCategory = () => {
    const userData = localStorage.getItem('userArray');
    
    if(userData) {
      const JSONData = JSON.parse(userData);
      const reverseData = JSONData.page.reverse();

      let category;

      for (let index = 0; index < reverseData.length; index += 1) {
        const element = reverseData[index];

        if(element.Page === 'pdp') {
          category = element.Category;
          return category;

        } else if (element.Page === 'plp') {
          category = element.Category;
          return category;
        }
      }
    }
  }

  // adds a new banner to the homepage
  const addBanner = () => {
    const newBanner = document.createElement('div');
    newBanner.classList.add(`${shared.ID}-homeBanner`);
    newBanner.innerHTML = '<a href="#"><img src=""/></a>';

    document.querySelector('.hero-banner').insertAdjacentElement('beforebegin', newBanner);
    document.querySelector('.hero-banner').style.display = 'none';
  }

  // adds the actual image on the new banner
  const changeBannerSrc = (image) => {
    const newBanner = document.querySelector(`.${shared.ID}-homeBanner`);
    newBanner.querySelector('img').setAttribute('src', image);
  }
  const changeBannerLink = (link) => {
    const newBanner = document.querySelector(`.${shared.ID}-homeBanner`);
    newBanner.querySelector('a').setAttribute('href', link);
  }


  // change this to either be index of, or match it exactly
  if(getLastCategory() === 'Watches | Watches') {
    addBanner();
    changeBannerSrc('https://via.placeholder.com/1000x500'); // do this for each if to change the image
    changeBannerLink('#putLinkHere'); // do this for each if to change the link
  }
  
};
