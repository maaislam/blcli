/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import heroBanner from '../components/banner';
import categoryCarousel from '../components/category';
import initSwiper from './helper/initSwiper';
import { addCssToPage, addJsToPage } from './helper/utils';
import { pollerLite } from "../../../../../lib/utils";
import { categoryData } from './categoryData';
import signatureProductsCarousel from '../components/signatureProducts';


const { ID, VARIATION } = shared;
//swiper
const swiperJs = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
const swiperCss = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Activate
 */
export default () => {
  //get target page and filter corresponding dataset 
  const data = categoryData;
  const targetPage = window.location.href.includes("/citizen/")
    ? "citizen"
    : window.location.href.includes("/disney/")
    ? "disney"
    : window.location.href.includes("/chamilia/")
    ? "chamilia"
    : null;
    //console.log(targetPage, 'targetPage')
  const filteredData = data.filter((item) => item.targetPage === targetPage);

 //add swiper js
 addJsToPage(swiperJs, `${ID}__swiperjs`);
 addCssToPage(swiperCss, `${ID}__swipercss`);

  //console.log("SG209 Running...")
  setup();

  fireEvent('Conditions Met');

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

 
  const checkSession = setInterval(function(){
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if(sessionStorage.getItem('analyticsDataSentFor') && sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname) {
      if(typeof s !== 'undefined'){
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }  
      clearInterval(checkSession);
    }
  }, 1000);

  var checkCS = setInterval(function () {
    if (window._uxa) {
       window._uxa = window._uxa || [];
       window._uxa.push(["trackDynamicVariable", {key: `${ID}`, value: `Variation ${VARIATION}`} ]);
       clearInterval(checkCS);
    }
  }, 800)
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if(VARIATION !== 'control') {
    // test code here

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      const heroSection = heroBanner(targetPage);
      const categorySection = categoryCarousel(filteredData);

      // HS-specific JS
      const main_elem = `<main class="${ID}__main_container"></main>`;
      document.querySelector('#access-content').insertAdjacentHTML("afterend", main_elem);
      document.querySelector(`.${ID}__main_container`).insertAdjacentHTML("afterbegin", heroSection);

      //swiper
      pollerLite([() => typeof window.Swiper === 'function'], () => {
        document.querySelector(`.${ID}__banner_container`).insertAdjacentHTML("afterend", categorySection);
        initSwiper(`.${ID}__category_container`,`.${ID}__signature_product_carousel`, fireEvent, shared);

      })

      //sign up section
      const elem = document.querySelector(".email-sign-up__title");
      const signUpScetion = `
                              <div class="${ID}__sign_up_title">Sign-up & Save!</div>
                              <p class="${ID}__sign_up_save_details">Sign up to your news lettter and save <b><i>15%</i></b> of your first order with <b><i>Brand name</i></b></p>

                            `
      elem.insertAdjacentHTML("afterend", signUpScetion);  
      const signUpBackground = `<div class="${ID}__sign_up_background">
                                  <img class="${ID}__background_img" src="https://ucds.ams3.digitaloceanspaces.com/HSamuel/sign_up_img.png"></img>
                                </div>`
                              
      document.querySelector("#skip-to-email-sign-up").insertAdjacentHTML("afterbegin", signUpBackground) ;  
      const dom = `<div class="${ID}__custom_input_wrapper"></div>`;

      //add dom
      document.querySelector(".email-sign-up__email-input").insertAdjacentHTML("afterend", dom) ;

      //wrape control input and add label
      document.querySelector(`.${ID}__custom_input_wrapper`).appendChild(document.querySelector(".email-sign-up__email-input"));               
      const email_lable =`<label class="${ID}__sign_up_input_label">Email</label>`;
      const  signUpBtn = `<div class="${ID}__sign_up_btn_wrapper">
                            <button class="${ID}__sign_up_btn">sign up</button>
                          </div>
                          ` ;
      document.querySelector(".email-sign-up__email-input").insertAdjacentHTML("afterend", signUpBtn);
      document.querySelector(`.${ID}__custom_input_wrapper`).insertAdjacentHTML("beforeend", email_lable);

      //click sign up
      const sign_up_btn = document.querySelector("#js-email-sign-up__submit");
      document.querySelector(`.${ID}__sign_up_btn`).addEventListener("click",()=>{
        sign_up_btn.click();
      });

      //add signature product sections
      document.querySelector("#skip-to-email-sign-up").insertAdjacentHTML("afterend", signatureProductsCarousel(targetPage));

      //adding hover to show view on range section
      document.querySelectorAll(`.${ID}__in_range_brand`).forEach((item, i)=>{
        item.addEventListener("mouseenter",()=>{
          
          item.querySelector(`.${ID}__shop_now_link`).classList.add("display_item");
          item.querySelector(`.${ID}__brand_logo`).classList.add("slide-up");

        })

        item.addEventListener("mouseleave",()=>{
          item.querySelector(`.${ID}__shop_now_link`).classList.remove("display_item");
          item.querySelector(`.${ID}__brand_logo`).classList.remove("slide-up");
        })

      })

      //swiper btn
      let btn_next = document.querySelector(`.${ID}__swiper-button-next`);
      let btn_prev = document.querySelector(`.${ID}__swiper-button-prev`);

        btn_next.addEventListener("click",()=>{
          document.querySelector(`.swiper-button-next`).click();
          document.querySelector(`.${ID}__swiper-button-prev.${ID}__swiper-button-disabled`) ?
          document.querySelector(`.${ID}__swiper-button-prev.${ID}__swiper-button-disabled`).classList.remove(`${ID}__swiper-button-disabled`) :"";
        })


      
        btn_prev.addEventListener("click",()=>{
          document.querySelector(`.swiper-button-prev`).click();  
          document.querySelector(`.${ID}__swiper-button-next.${ID}__swiper-button-disabled`) ?
          document.querySelector(`.${ID}__swiper-button-next.${ID}__swiper-button-disabled`).classList.remove(`${ID}__swiper-button-disabled`) :"";      
      })
      
    }
    
  } else {
    // any control code here
  }
};
