/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from "./services";
import shared from "./shared";
import { pollerLite, events } from "../../../../../lib/utils";

const runChanges = () => {
  const productDetailPage = document.querySelector("#product-detail-page");
  if (productDetailPage) {
    // const markup = `
    //   <div class="${shared.ID}__routine">
    //     <h3>
    //       Discover more at Avon!
    //     </h3>
    //     <div class="${shared.ID}__routine-wrap">
    //       <div class="${shared.ID}__routine-wrap__item">
    //         <div>

    //         </div>
    //       </div>
    //       <div class="${shared.ID}__routine-wrap__item">

    //       </div>
    //       <div class="${shared.ID}__routine-wrap__item">

    //       </div>
    //     </div>
    //   </div>
    // `;



    const mainContainer = productDetailPage.querySelector('.container-fluid');
    if (mainContainer) {
      const thirdRow = mainContainer.querySelectorAll('.row')[2];
      if (thirdRow) {
        const markup = `
        <h3 class="${shared.ID}__header">Discover more at Avon!</h3>
        <div class="${shared.ID}__wrapper">
          <div class="${shared.ID}__card">
            <div class="${shared.ID}__left">
              <h3>Hair Routines</h3>
              <p>Keep happy hair with the perfect hair serums, treatments, shampoos and more!</p>
              <a href="/collections/hair-care/" class="${shared.ID}__cta">Shop now</a>
            </div>
            <div class="${shared.ID}__right">
              <img class="${shared.ID}__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/531BAA5DA7957EC733475E07FFA76E90AF03F157540D1B05693D68D3A94A93A8.png?meta=/AV076---Covid-New-Lander-Persuasion/PBDGD_PSPA_014_MO_1164619AUG2518_RGB.png" />
            </div>
          </div>
            <div class="${shared.ID}__card">
            <div class="${shared.ID}__left">
              <h3>Bubble baths</h3>
              <p>We're sure you'll find your new favourite way to relax and unwind.</p>
              <a href="/collections/discover-bath-body/" class="${shared.ID}__cta">Shop now</a>
            </div>
            <div class="${shared.ID}__right">
              <img class="${shared.ID}__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/7B6B552CE961009BA8CE582FCE6120D4E7668090F6D8EC1EF155B7A192F8DA4E.png?meta=/AV076---Covid-New-Lander-Persuasion/PPCEU_BBATH_005_MO_1196040DEC2217_CMYK.png" />
            </div>
          </div>
            <div class="${shared.ID}__card">
            <div class="${shared.ID}__left">
              <h3>Hand care</h3>
              <p>The best products to finish off that special skincare routine</p>
              <a href="/collections/handcare/" class="${shared.ID}__cta">Shop now</a>
            </div>
            <div class="${shared.ID}__right">
              <img class="${shared.ID}__img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/93D8AB1957E647CD39AF8DA9B808190A4066B682058B78B89990C624DD88A74A.png?meta=/AV076---Covid-New-Lander-Persuasion/1222942-MO-002-GD-AUG1320-CMYK.png" />
            </div>
          </div>
        </div>
      `;

      const testMarkup = `
        <h3 class="${shared.ID}__header">Discover more at Avon!</h3>
        <div class="${shared.ID}__wrapper">
          <div class="banner-card">
            <a href="/collections/hair-care/" class="card-link">
              <div class="card-image">
                <img class="card-image-img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/531BAA5DA7957EC733475E07FFA76E90AF03F157540D1B05693D68D3A94A93A8.png?meta=/AV076---Covid-New-Lander-Persuasion/PBDGD_PSPA_014_MO_1164619AUG2518_RGB.png" />
              </div>
              <div class="card-content">
                <h3 class="card-title">
                  Hair routines
                </h3>
                <div class="card-para">
                  Keep happy hair with the perfect hair serums, treatments, shampoos and more!
                </div>
                <div class="card-cta">
                  Shop now
                </div>
              </div>
            </a>
          </div>
          <div class="banner-card">
            <a href="/collections/discover-bath-body/" class="card-link">
              <div class="card-image">
              <img class="card-image-img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/7B6B552CE961009BA8CE582FCE6120D4E7668090F6D8EC1EF155B7A192F8DA4E.png?meta=/AV076---Covid-New-Lander-Persuasion/PPCEU_BBATH_005_MO_1196040DEC2217_CMYK.png"/>
              </div>
              <div class="card-content">
                <h3 class="card-title">
                  Bubble baths
                </h3>
                <p class="card-para">
                  We're sure you'll find your new favourite way to relax and unwind.
                </p>
                <div class="card-cta">
                  Shop now
                </div>
              </div>
            </a>
          </div>
          <div class="banner-card">
            <a href="/collections/handcare/" class="card-link">
              <div class="card-image">
                <img class="card-image-img" src="https://service.maxymiser.net/cm/images-eu/avon-mas/93D8AB1957E647CD39AF8DA9B808190A4066B682058B78B89990C624DD88A74A.png?meta=/AV076---Covid-New-Lander-Persuasion/1222942-MO-002-GD-AUG1320-CMYK.png"/>
              </div>
              <div class="card-content">
                <h3 class="card-title">
                  Hand care
                </h3>
                <p class="card-para">
                  The best products to finish off that special skincare routine.
                </p>
                <div class="card-cta">
                  Shop now
                </div>
              </div>
            </a>
          </div>
        </div>
      `;


      // thirdRow.insertAdjacentHTML('beforebegin', markup);
      thirdRow.insertAdjacentHTML('beforebegin', testMarkup);

        const links = document.querySelectorAll('.card-link');
        if (links) {
          [].forEach.call(links, (link) => {
            link.addEventListener('click', () => {
              events.send(`${shared.ID}`, 'link-click', link.href);
            })
          })
        }
      }
    }
  }
};

export default () => {
  setup();

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    runChanges();
  };

  // Make device specific changes when layout changes
  // rootScope.$on('App_LayoutChanged', () => {
  //   setTimeout(init, 500);
  // });

  init();
};
