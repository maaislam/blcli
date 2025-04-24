/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import SelfSelectBanner from './bannerModal';
import bannerData from './gridBanners';

const { ID, VARIATION } = shared;

export default () => {
  const gridEvents = () => {
    const gridTiles = document.querySelectorAll(`.home-tile-grid a`);
    for (let index = 0; index < gridTiles.length; index++) {
      const element = gridTiles[index];
      element.addEventListener('click', () => {
        events.send(`${ID} v${VARIATION}`, 'click', 'tile banner');
      });
      
    }
  }

  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
    gridEvents();
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    let storageName;

    if(getSiteFromHostname() == 'ernestjones') {
      storageName = `EJ131-category`;
    }

    if(getSiteFromHostname() == 'hsamuel') {
      storageName = `HS131-category`;
    }


    // once something is selected 
    let chosenCategory;
    
    const createHomepage = () => {
      document.body.classList.add(`${ID}-personalised`);
        
      const selectedBannerData = bannerData[chosenCategory];

      const firstBlockData = selectedBannerData.gridBlock1;
      const secondBlockData = selectedBannerData.gridBlock2;
      const thirdBlockData = selectedBannerData.gridBlock3;
      const fourthBlockData = selectedBannerData.gridBlock4;

      const firstGridBlock = document.querySelector(`.home-tile-grid .home-tile-grid__large-tile`);
      firstGridBlock.innerHTML = `
      <div class="${ID}-block" style="background-image: url(${firstBlockData.image})">
        <a href="${firstBlockData.button1Link}"></a>
        <div class="${ID}-buttons">
          <a class="${ID}-button" href="${firstBlockData.button1Link}">Shop<span>${firstBlockData.button1Text}</span></a>
          ${firstBlockData.button2Link ? `<a class="${ID}-button" href="${firstBlockData.button2Link}">${firstBlockData.button2Text}` : ''}
        </div>
      </div>`;

      const secondGridBlock = document.querySelector(`.home-tile-grid .home-tile-grid__small-tile`);
      secondGridBlock.innerHTML = `
      <div class="${ID}-block" style="background-image: url(${secondBlockData.image})">
      <a href="${secondBlockData.buttonLink}"></a>
        <div class="${ID}-buttons">
          <a class="${ID}-button" href="${secondBlockData.buttonLink}">Shop<span>${secondBlockData.buttonText}</span></a>
        </div>
      </div>`;

      const thirdGridBlock = document.querySelectorAll(`.home-tile-grid .home-tile-grid__small-tile`)[1];
      thirdGridBlock.innerHTML = `
      <div class="${ID}-block" style="background-image: url(${thirdBlockData.image})">
        <a href="${thirdBlockData.buttonLink}"></a>
        <div class="${ID}-buttons">
          <a class="${ID}-button" href="${thirdBlockData.buttonLink}">Shop<span>${thirdBlockData.buttonText}</span></a>
        </div>
      </div>`;

      const fourthGridBlock = document.querySelector(`.home-tile-grid .home-tile-grid__text-tile`);
      fourthGridBlock.innerHTML = `
      <div class="${ID}-block">
        <h3>${fourthBlockData.textHeading}</h3>
        <div class="${ID}-buttons">
          <a class="${ID}-button" href="${fourthBlockData.buttonLink}">${fourthBlockData.buttonText}</a>
        </div>
      </div>`;


      // move navigation link to the front
      const allnavLinks = document.querySelectorAll('.main-nav__item.main-nav__item--top');
      for (let index = 0; index < allnavLinks.length; index++) {
        const element = allnavLinks[index];
        const linkName = element.querySelector('.main-nav__text-wrapper').textContent.trim().toLowerCase();
        if(linkName.indexOf(chosenCategory) >-1) {
          document.querySelector('.main-nav__container').insertAdjacentElement('afterbegin', element);
        }
      }
    }

    const bannerEvents = () => {

      const hideSelectBox = () => {
        const selectBox = document.querySelector(`.${ID}-selectionModal`);
    
        selectBox.classList.add(`${ID}-selectHide`);
        document.body.classList.add(`${ID}-scroll`);
       
      }

      return new Promise((resolve, reject) => {
        const allBanners = document.querySelectorAll(`.${ID}-banner`);
        for (let index = 0; index < allBanners.length; index += 1) {
            const element = allBanners[index];
            element.addEventListener('click', () => {
                const category = element.getAttribute('banner-target');
                chosenCategory = category;
                hideSelectBox();
                document.body.classList.remove(`${ID}-noScroll`);
                resolve(chosenCategory);

                events.send(`${ID} v${VARIATION}`, 'click', `selected category: ${chosenCategory}`);
                localStorage.setItem(storageName, chosenCategory);
            });       
          }  
      });
    }


    // if category has not been selected before
    if (!localStorage.getItem(storageName)) {

      new SelfSelectBanner();

      // wait for option to be clicked then create the new contents
      bannerEvents().then(() => {

        if (chosenCategory !== 'all') {
          createHomepage();
          gridEvents()
        }
      });

    // if category has previously been defined
    } else {
      chosenCategory = localStorage.getItem(storageName);
      if (chosenCategory !== 'all') {
        createHomepage();
        gridEvents();
      }
    }
    

   
  }
};
