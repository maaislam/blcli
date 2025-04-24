/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname, fireEvent, cookieOpt } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import { gridBannerData } from './gridData';
import carousel from './carousel';
import homepageMarkup from './homepageMarkup';

const { ID, VARIATION } = shared;

export default () => {
  const gridBannerTracking = () => {
    const gridTiles = document.querySelectorAll('.home-tile-grid [class^=home-tile-grid__] a');
    for (let index = 0; index < gridTiles.length; index += 1) {
      const element = gridTiles[index];
      element.addEventListener('click', () => {
        fireEvent('Clicked Grid Tile ' + index);
      });
    }

  }

  if(VARIATION == 'control') {
    setup();
    gridBannerTracking();
    cookieOpt();
  } else {
    setup();
    cookieOpt();

    const changeInnerTiles = () => {
      

      let bannerData;
      if(getSiteFromHostname() === 'ernestjones') {
        bannerData = gridBannerData['ernestjones'];
      } else {
        bannerData = gridBannerData['hsamuel'];
      }

      const firstGridBlock = document.querySelector(`.home-tile-grid .home-tile-grid__large-tile`);
      firstGridBlock.innerHTML = `
      <div class="${ID}-block" ${window.innerWidth >= 1024 ? `style="background-image: url(${bannerData.gridBlocklarge.desktopImage})"` : `style="background-image: url(${bannerData.gridBlocklarge.image})"`}>
      <a href="${bannerData.gridBlocklarge.buttonLink}"></a>
        <div class="${ID}-buttons">
          <a class="${ID}-button" href="${bannerData.gridBlocklarge.buttonLink}">Shop<span>${bannerData.gridBlocklarge.buttonText}</span></a>
        </div>
      </div>`;
      
      const secondGridBlock = document.querySelector(`.home-tile-grid .home-tile-grid__small-tile`);
      secondGridBlock.innerHTML = `
      <div class="${ID}-block" style="background-image: url(${bannerData.gridBlock1.image})">
      <a href="${bannerData.gridBlock1.buttonLink}"></a>
        <div class="${ID}-buttons">
          <a class="${ID}-button" href="${bannerData.gridBlock1.buttonLink}">Shop<span>${bannerData.gridBlock1.buttonText}</span></a>
        </div>
      </div>`;

      const thirdGridBlock = document.querySelectorAll(`.home-tile-grid .home-tile-grid__small-tile`)[1];
      thirdGridBlock.innerHTML = `
      <div class="${ID}-block" style="background-image: url(${bannerData.gridBlock2.image})">
      <a href="${bannerData.gridBlock2.buttonLink}"></a>
        <div class="${ID}-buttons">
          <a class="${ID}-button" href="${bannerData.gridBlock2.buttonLink}">Shop<span>${bannerData.gridBlock2.buttonText}</span></a>
        </div>
      </div>`;

      const fourthGridBlock = document.querySelector(`.home-tile-grid .home-tile-grid__text-tile`);
      fourthGridBlock.removeAttribute('style');
      fourthGridBlock.innerHTML = `
      <div class="${ID}-block">
      <a href="${bannerData.gridBlock3.link}"></a>
        <div class="${ID}-inner">
          <div class="${ID}-button">
          ${bannerData.gridBlock3.textHeading}</a>
          </div>
        </div>
      </div>`;
    }


    if(VARIATION === '1') {
      changeInnerTiles();
      gridBannerTracking();
    }

    // load in jQuery
   
    if(VARIATION === '2' || VARIATION === '3') {
    const loadScript = (source, beforeEl, async = true, defer = true) => {
        return new Promise((resolve, reject) => {
          let script = document.createElement('script');
          const prior = beforeEl || document.getElementsByTagName('script')[0];
      
          script.async = async;
          script.defer = defer;
      
          function onloadHander(_, isAbort) {
            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
              script.onload = null;
              script.onreadystatechange = null;
              script = undefined;
      
              if (isAbort) { reject(); } else { resolve(); }
            }
          }
      
          script.onload = onloadHander;
          script.onreadystatechange = onloadHander;
      
          script.src = source;
          prior.parentNode.insertBefore(script, prior);
        });
      }

      const scriptUrl = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
      loadScript(scriptUrl).then(() => {
        if(VARIATION === '2') {
          carousel();
        }
        if(VARIATION === '3') {
          homepageMarkup();
        }
      }, () => {
    });
    setTimeout(function(){
    var offerHeader = document.querySelector('.SG133-offerContainer h3'); 
    if (offerHeader){
    offerHeader.innerText = "OUR HIGHLIGHTS";
  }
  }, 500)
  }
    

    

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
