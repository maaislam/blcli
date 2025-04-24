/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  console.log('hot-635 experiment started');

  pollerLite(['#main'], () => {
    const newCarouselHTML = `
    <div class="HCN-block HCN-goodchocolate-container">

    <div class="HCN-goodchocolate-wrapper">
      <div class="HCN-goodchocolate-inner">
        <div class="HCN-goodchocolate-container--title"> Gift Chocolate Happiness</div>

        <div class="HCN-goodchocolate-product-carousel slick-initialized slick-slider">


          <!-- Product -->
          <div class="slick-list draggable"><div class="slick-track" style="opacity: 1; width: 5670px; transform: translate3d(-1350px, 0px, 0px);"><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/thank-you/" class="HCN-item slick-slide slick-cloned" data-slick-index="-5" id="" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/thank-you-gifts-320x400-1.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Thank You Gifts </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-couples/" class="HCN-item slick-slide slick-cloned" data-slick-index="-4" id="" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/giftsforcouples.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Gifts For Couples </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/wedding/" class="HCN-item slick-slide slick-cloned" data-slick-index="-3" id="" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/weddinggifts.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Wedding Gifts </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/collections/dietary/vegan-chocolate/" class="HCN-item slick-slide slick-cloned" data-slick-index="-2" id="" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/vegan-gifts.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Vegan Gifts </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-children/" class="HCN-item slick-slide slick-cloned" data-slick-index="-1" id="" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/gifts-for-kids.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Gifts For Children </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/birthday/" class="HCN-item slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" tabindex="0" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/birthday-gifts-2.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Birthday Gifts </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-her/" class="HCN-item slick-slide slick-active" data-slick-index="1" aria-hidden="false" tabindex="0" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/gifts-for-her-2.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Gifts For Her </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-him/" class="HCN-item slick-slide slick-active" data-slick-index="2" aria-hidden="false" tabindex="0" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/gifts-for-him-2.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Gifts For Him </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/thank-you/" class="HCN-item slick-slide slick-active" data-slick-index="3" aria-hidden="false" tabindex="0" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/thank-you-gifts-320x400-1.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Thank You Gifts </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-couples/" class="HCN-item slick-slide slick-active" data-slick-index="4" aria-hidden="false" tabindex="0" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/giftsforcouples.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Gifts For Couples </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/wedding/" class="HCN-item slick-slide" data-slick-index="5" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/weddinggifts.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Wedding Gifts </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/collections/dietary/vegan-chocolate/" class="HCN-item slick-slide" data-slick-index="6" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/vegan-gifts.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Vegan Gifts </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-children/" class="HCN-item slick-slide" data-slick-index="7" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/gifts-for-kids.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Gifts For Children </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/birthday/" class="HCN-item slick-slide slick-cloned" data-slick-index="8" id="" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/birthday-gifts-2.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Birthday Gifts </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-her/" class="HCN-item slick-slide slick-cloned" data-slick-index="9" id="" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/gifts-for-her-2.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Gifts For Her </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-him/" class="HCN-item slick-slide slick-cloned" data-slick-index="10" id="" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/gifts-for-him-2.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Gifts For Him </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/thank-you/" class="HCN-item slick-slide slick-cloned" data-slick-index="11" id="" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/thank-you-gifts-320x400-1.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Thank You Gifts </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-couples/" class="HCN-item slick-slide slick-cloned" data-slick-index="12" id="" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/giftsforcouples.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Gifts For Couples </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/wedding/" class="HCN-item slick-slide slick-cloned" data-slick-index="13" id="" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/weddinggifts.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Wedding Gifts </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/collections/dietary/vegan-chocolate/" class="HCN-item slick-slide slick-cloned" data-slick-index="14" id="" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/vegan-gifts.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Vegan Gifts </h3>
              </div>
            </div>

          </a><a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-children/" class="HCN-item slick-slide slick-cloned" data-slick-index="15" id="" aria-hidden="true" tabindex="-1" style="width: 270px;">

            <div class="HCN-item-wrapper">
              <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/gifts-for-kids.jpg">
              </div>

              <div class="HCN-item--content">
                <h3> Gifts For Children </h3>
              </div>
            </div>

          </a></div></div>
          
          <!-- Product -->
          

          <!-- Product -->
          


          <!-- Product -->
          

          <!-- Product -->
          

          <!-- Product -->
          

          <!-- Product -->
          

          <!-- Product -->
          

          

          
          
        </div>

        

      </div>

      <div class="HCN-progress-bar-container">
          <div class="HCN-progress-bar-wrapper">
            <div class="HCN-progress-bar-goodchocolat">
              <div class="progress-bar-goodchocolat" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="12.5" style="background-size: 12.5% 100%;">
                <span class="slider__label sr-only"></span>
              </div>
    
              <div class="slick_btn">
    
                <div class="slick_btn__item slick_btn__item--prev">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <circle cx="15" cy="15" r="14.3" stroke="black" stroke-width="1.4"></circle>
                  <path d="M16.5 10.5L12 15L16.5 19.5" stroke="black" stroke-width="1.4"></path>
                  </svg>
                </div>
    
                <div class="slick_btn__item slick_btn__item--next">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <circle cx="15" cy="15" r="14.3" transform="rotate(-180 15 15)" stroke="black" stroke-width="1.4"></circle>
                  <path d="M13.5 19.5L18 15L13.5 10.5" stroke="black" stroke-width="1.4"></path>
                  </svg>
                </div>
    
              </div> 
            </div>
            
          </div>    
        </div>
    </div>
  </div>
    `

    const targetContainer = document.querySelector('#main');
    targetContainer.insertAdjacentHTML('afterbegin', newCarouselHTML);


  })
}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

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

  startExperiment();
};
