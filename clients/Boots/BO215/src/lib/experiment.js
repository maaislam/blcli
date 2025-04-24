/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { insertAfterElement, pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import { increasinglyCheck, rrEvents, tabbedRichRevelance } from './helpers';
import Swiper from "swiper/bundle";

let testToRun;
const { ID, VARIATION } = shared;

if(VARIATION === '1' || VARIATION === '3'){
  testToRun = (data) => {

    setup();

    fireEvent('Conditions Met');

    if (window.usabilla_live){
      window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
    }

    document.addEventListener("load", function () {
      if (!sessionStorage.getItem(`${ID}-tslv`)){
        function getTimeSinceLastVisit(){if(arguments&&"-v"===arguments[0])return{plugin:"getTimeSinceLastVisit",version:"2.0"};var h=function(){if("undefined"!==typeof window.s_c_il)for(var c=0,b;c<window.s_c_il.length;c++)if(b=window.s_c_il[c],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof h&&(h.contextData.getTimeSinceLastVisit="2.0");window.formatTime=window.formatTime||function(c,b,d){function f(b,d,c,e){if("string"!==typeof d)return!1;if("string"===typeof b)b=b.split(c||",");else if("object"!==typeof b)return!1;c=0;for(a=b.length;c<a;c++)if(1==e&&d===b[c]||d.toLowerCase()===b[c].toLowerCase())return!0;return!1}if(!("undefined"===typeof c||isNaN(c)||0>Number(c))){var e="";"string"===typeof b&&"d"===b||("string"!==typeof b||!f("h,m,s",b))&&86400<=c?(b=86400,e="days",d=isNaN(d)?1:b/(d*b)):"string"===typeof b&&"h"===b||("string"!==typeof b||!f("m,s",b))&&3600<=c?(b=3600,e="hours",d=isNaN(d)?4:b/(d*b)):"string"===typeof b&&"m"===b||("string"!==typeof b||!f("s",b))&&60<=c?(b=60,e="minutes",d=isNaN(d)?2:b/(d*b)):(b=1,e="seconds",d=isNaN(d)?.2:b/d);e=Math.round(c*d/b)/d+" "+e;0===e.indexOf("1 ")&&(e=e.substring(0,e.length-1));return e}};window.cookieWrite=window.cookieWrite||function(c,b,d){if("string"===typeof c){var f=window.location.hostname,e=window.location.hostname.split(".").length-1;if(f&&!/^[0-9.]+$/.test(f)){e=2<e?e:2;var k=f.lastIndexOf(".");if(0<=k){for(;0<=k&&1<e;)k=f.lastIndexOf(".",k-1),e--;k=0<k?f.substring(k):f}}g=k;b="undefined"!==typeof b?""+b:"";if(d||""===b)if(""===b&&(d=-60),"number"===typeof d){var h=new Date;h.setTime(h.getTime()+6E4*d)}else h=d;return c&&(document.cookie=encodeURIComponent(c)+"="+encodeURIComponent(b)+"; path=/;"+(d?" expires="+h.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof cookieRead)?cookieRead(c)===b:!1}};window.cookieRead=window.cookieRead||function(c){if("string"===typeof c)c=encodeURIComponent(c);else return"";var b=" "+document.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);return(c=0>d?"":decodeURIComponent(b.substring(d+2+c.length,0>f?b.length:f)))?c:""};h=new Date;var m=h.getTime(),n=cookieRead("s_tslv")||0,l=Math.round((m-n)/1E3);h.setTime(m+63072E6);cookieWrite("s_tslv",m,h);return n?1800<l||cookieRead("s_inv")?(cookieRead("s_inv")&&(l=cookieRead("s_inv")),cookieWrite("s_inv",l,30),"0"!==l?formatTime(l):"New Visitor"):"":(cookieWrite("s_inv","0",30),"New Visitor")};
        
        var timeSince = getTimeSinceLastVisit();
        
        if (timeSince === "New Visitor") {
          fireEvent("New Customer")
        }
        else if (timeSince.indexOf('minute') > -1){
          fireEvent("Returning: Less Than 1 Day")
        }
        else if (timeSince.indexOf('hour') > -1){
          fireEvent("Returning: Less Than 1 Day")
        }
        else if (/^[1-7]{1}(\s)day(s)?/.test(timeSince)){
          fireEvent("Returning: 1-7 Days")
        }
        else if (/^(8|9|10|11|12|13|14)(\s)(days)/.test(timeSince)){
          fireEvent("Returning: 8-14 Days")
        }
        else {
          fireEvent("Returning: Over 14 Days")
        }
        sessionStorage.setItem(`${ID}-tslv`, '1');
        }
    });
  
    
    // Rich relevance
    if(VARIATION === '1') {
      pollerLite(['#richRelevanceContainer'], () => {
        const richRelevance = document.querySelector('#richRelevanceContainer');
        document.querySelector('#estore_productpage_template_container').appendChild(richRelevance);
        rrEvents();
      });
    }

    // Add similar items

    const card = (image, title, price, oldPrice, url, reviewScore, reviewCount, hasAdvantagePrice, promotionalText) => {
      const card = document.createElement("a");
      card.href = url;
      card.classList.add(`${ID}-card`);
      card.innerHTML = /* html */ `
        <div class="${ID}-card-image ${hasAdvantagePrice ? "has-advantage-price" : ""}">
          <img src="${image}" alt="${title}" />
        </div>
        <div class="${ID}-card-content">
          <h4 class="${ID}-card-title">${title}</h4>
          <div class="${ID}-card-pricing">
            ${oldPrice > price ? /* html */ `<span class="${ID}-card-old-price">£${oldPrice}</span><span class="${ID}-card-price">£${price}</span>` : /* html */ `<span class="${ID}-card-price">£${price}</span>`}
          </div>
          <div class="${ID}-card-reviews">
            <span
              class="${ID}-card-stars"
              style="--rating: ${reviewScore};"
              aria-label="Rating of this product is ${reviewScore} out of 5."
            ></span>
            <span class="${ID}-card-review-count">(${reviewCount})</span>
          </div>
          ${
            promotionalText
              ? /* html */ `
            <p class="${ID}-card-promo">${promotionalText}</p>
          `
              : ""
          }
        </div>
      `;
  
      return card;
    };
  
    let entry;
    if(VARIATION === '1') {
      entry = document.querySelectorAll("#estore_productpage_template_container > .rowContainer > .row")[1];
    } else {
      entry = document.querySelector("#estore_productpage_template_container");
    }
    const root = document.createElement("div");
    root.id = `${ID}-root`;
    root.innerHTML = /* HTML */ `
      <h2>Shop Similar Items</h2>
      <div class="${ID}-carousel-container">
        <div class="swiper" id="${ID}-swiper">
          <div class="swiper-wrapper"></div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    `;
  
    if(VARIATION === '1') {
      insertAfterElement(entry, root);
    } else {
      entry.insertAdjacentElement('beforeend', root);
    }
  
    const slidesContainer = root.querySelector(`.swiper-wrapper`);
  
    data.forEach((product) => {
      if (product) {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.appendChild(
          card(
            product.product_data.referenceimageurl,
            product.product_data.offername,
            product.product_data.currentprice.toFixed(2),
            product.product_data.regularprice.toFixed(2),
            product.product_data.actionurl,
            product.product_data.averagereviewscore || 0,
            product.product_data.numberofreviews || 0,
            product.product_data.haspriceadvantagedeal,
            product.product_data.promotionaltext
          )
        );
  
        // productSlider.appendSlide(slide);
        // productSlider.update();
        slidesContainer.append(slide);
      }
    });
  
  
    new Swiper(`#${ID}-swiper`, {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
      centerInsufficientSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1.5,
          slidesPerGroup: 1,
          spaceBetween: 20,
        },
        540: {
          slidesPerView: 2.5,
          slidesPerGroup: 2,
          spaceBetween: 20,
        },
        760: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 20,
        },
        1020: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 20,
        },
      },
    });
  
    const slides = document.querySelectorAll(`.${ID}-carousel-container .swiper-slide`);
    for (let index = 0; index < slides.length; index += 1) {
      const element = slides[index];
      element.addEventListener("click", () => {
        fireEvent("Clicked similar product " + index);
      });
    }
  };
} else {
  testToRun = () => {
    
    setup();
  
    fireEvent('Conditions Met');
  
    if (window.usabilla_live){
      window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
    }
    
    /**
     * Control = increasingly below the PDP (add with script if doesn't exist) - RichRelevance at the bottom of the page
     */
    
     if(VARIATION == 'control') {
  
      increasinglyCheck();
  
      pollerLite(['#richRelevanceContainer'], () => {
        const richRelevance = document.querySelector('#richRelevanceContainer');
        document.querySelector('#estore_productpage_template_container').appendChild(richRelevance);

        rrEvents();
      });
      
    }
  
    /**
     * V2 = Put all rich relevance in tabs,  increasingly at the bottom of the page
     */
  
     if(VARIATION == '2') {
      increasinglyCheck();
      tabbedRichRevelance();
      rrEvents();
     }
    
    /**
     * V4 = Increasingly at the bottom only
     */
  
     if(VARIATION == '4') {
      increasinglyCheck();
     }
    /**
     * V5 = RichRelevance (tabbed) at the bottom only
     */
     if(VARIATION == '5') {
      tabbedRichRevelance();
      rrEvents();
     }
  };
  
}

export default testToRun;

