/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite, setCookie } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const insertRecs = (data, dataType, title, placement, attachPoint, attachPointType, carouselStyleOverride, addToCartButton, variation) => {

  logMessage("Carousel Recs Data: ");
  logMessage(data);

  let recs;
  let widgetID;
  let feedID;
  if(dataType == "dy") {
    recs = data.slots;
    widgetID = data.wId;
    feedID = data.fId;
  } else {
    recs = data;
  }

  let numSlides = recs.length;
  let slidesToShow = 3;
  if (window.outerWidth < 768) {
    slidesToShow = 2;
  } else if (window.outerWidth < 480) {
    slidesToShow = 1;
  }

  let carouselHTML = `
  
    <div class="${ID}-recs ${dataType == 'cartitems' ? `${ID}-cartitems` : `${ID}-dy`} ${numSlides > slidesToShow ? `${ID}-carousel-active` : `${ID}-carousel-disabled`}" style="${carouselStyleOverride}">
    
      <h2>${title}</h2>
       
      <div class="${ID}-recs--carousel">
        
        <button class="${ID}-recs--progressbar--prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18" fill="none"><path d="M12.1901 5.43986C12.1901 5.52653 12.1568 5.6032 12.0901 5.66986L8.16012 9.59986L12.0901 13.5299C12.1568 13.5965 12.1901 13.6732 12.1901 13.7599C12.1901 13.8465 12.1568 13.9232 12.0901 13.9899L11.5901 14.4899C11.5235 14.5565 11.4468 14.5899 11.3601 14.5899C11.2735 14.5899 11.1968 14.5565 11.1301 14.4899L6.47012 9.82986C6.40345 9.7632 6.37012 9.68653 6.37012 9.59986C6.37012 9.5132 6.40345 9.43653 6.47012 9.36986L11.1301 4.70986C11.1968 4.6432 11.2735 4.60986 11.3601 4.60986C11.4468 4.60986 11.5235 4.6432 11.5901 4.70986L12.0901 5.20986C12.1568 5.27653 12.1901 5.3532 12.1901 5.43986Z" fill="#717171"/></svg></button>
        <button class="${ID}-recs--progressbar--next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none"><path d="M11.7902 9.59986C11.7902 9.68653 11.7569 9.7632 11.6902 9.82986L7.03021 14.4899C6.96355 14.5565 6.88688 14.5899 6.80021 14.5899C6.71355 14.5899 6.63688 14.5565 6.57021 14.4899L6.07021 13.9899C6.00355 13.9232 5.97021 13.8465 5.97021 13.7599C5.97021 13.6732 6.00355 13.5965 6.07021 13.5299L10.0002 9.59986L6.07021 5.66986C6.00355 5.6032 5.97021 5.52653 5.97021 5.43986C5.97021 5.3532 6.00355 5.27653 6.07021 5.20986L6.57021 4.70986C6.63688 4.6432 6.71355 4.60986 6.80021 4.60986C6.88688 4.60986 6.96355 4.6432 7.03021 4.70986L11.6902 9.36986C11.7569 9.43653 11.7902 9.5132 11.7902 9.59986Z" fill="#717171"/></svg></button>
        <div class="${ID}-inner" ${dataType == 'dy' ? `data-dy-widget-id="${widgetID}" data-dy-feed-id="${feedID}"` : ``}>
        ${dataType == 'dy' ? `
          
            ${recs.map((product) => {
              let rec = product.item;

              let recPrice = rec.price;
              let recPriceResult = (recPrice - Math.floor(recPrice)) !== 0;
              if (recPriceResult) {
                recPrice = '£' + recPrice.toFixed(2);
              } else {
                recPrice = '£' + recPrice;
              }

              let compareRecPrice = parseFloat(rec.compare_price);
              let comparePriceResult = (compareRecPrice - Math.floor(compareRecPrice)) !== 0;
              if (comparePriceResult) {
                compareRecPrice = '£' + compareRecPrice.toFixed(2);
              } else {
                compareRecPrice = '£' + compareRecPrice;
              }

              let diff = 0;
              if (rec.compare_price !== '0.00') {
                let checkRecPrice = rec.price;
                let checkWasPrice = rec.compare_price;
                diff = checkWasPrice - checkRecPrice;
                let integerResult = (diff.toFixed(2) - Math.floor(diff.toFixed(2))) !== 0;
                if (integerResult) {
                  diff = '£' + diff.toFixed(2);
                } else {
                  diff = '£' + diff.toFixed(0);
                }
              }

              return `
                    
                      <div data-href="${rec.url}" data-sku="${rec.sku}" data-dy-product-id="${rec.sku}" data-dy-strategy-id="${product.strId}" class="${ID}-recs--carouselitem">

                        <a href="${rec.url}">
                          <div class="${ID}-recs--carouselitem--image">
                            ${diff !== 0 ? `<span class="${ID}-pricediff">Save ${diff}</span>` : ``}
                            <img src="${rec.image_url}" alt="${rec.name} image" />
                          </div>
                          <div class="${ID}-recs--carouselitem--content">
                          
                            <p class="${ID}-recs--carouselitem--contentname" title="${rec.name}">${rec.name}</p>
                            <p class="${ID}-recs--carouselitem--contentprice">${rec.compare_price !== '0.00' ? `<span class="${ID}-recs--carouselitem--contentprice--was">Was ${compareRecPrice}</span>` : ``}${recPrice}</p>
                          
                          </div>
                        </a>
                        ${addToCartButton == true ? `<button class="${ID}-recs--carouselitem--addtocart">Add to cart</button>` : ``}

                      </div>
                    
                    `;

            }).join('')}
          
          ` : `
          
            ${recs.map((product) => {
              let rec = product;
              let recPrice = rec.price;

              let wasPrice = rec.wasPrice;
              let diff = 0;

              if(wasPrice !== "NA") {

                let checkRecPrice = rec.price.replaceAll('£', '').replaceAll(',', '');
                let checkWasPrice = rec.wasPrice.replaceAll('Was&nbsp;', '').replaceAll('£', '').replaceAll(',', '');
                checkRecPrice = parseFloat(checkRecPrice);
                checkWasPrice = parseFloat(checkWasPrice);
                diff = checkWasPrice - checkRecPrice;
                let integerResult = (diff.toFixed(2) - Math.floor(diff.toFixed(2))) !== 0;
                if (integerResult) {
                    diff = '£' + diff.toFixed(2);
                } else {
                    diff = '£' + diff.toFixed(0);
                }
                
                
              }

              return `
                    
                      <div data-href="${rec.url}" class="${ID}-recs--carouselitem">

                        
                          <div class="${ID}-recs--carouselitem--image">
                            ${diff !== 0 ? `<span class="${ID}-pricediff">Save ${diff}</span>` : ``}
                            <img src="${rec.imageURL}" alt="${rec.name} image" />
                          </div>
                          <div class="${ID}-recs--carouselitem--content">
                          
                            <p class="${ID}-recs--carouselitem--contentname" title="${rec.name}">${rec.name}</p>
                            <p class="${ID}-recs--carouselitem--contentprice">${rec.wasPrice !== "NA" ? `<span class="${ID}-recs--carouselitem--contentprice--was">${rec.wasPrice}</span>` : ``}${recPrice}</p>
                          
                          </div>
                        
                      </div>
                    
                    `;

            }).join('')}
          
          
          `
        
        }
      </div>
       

    </div>

    ${dataType == 'cartitems' ? `
      
        <div class="${ID}-recs--checkoutsecurely">
        
          <button class="${ID}-recs--checkoutsecurelybutton">Checkout Securely</button>
          <svg width="150" height="16" viewBox="0 0 150 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M58.4057 13.288V13.048H58.5017V13H58.2537V13.048H58.3497V13.288H58.4057ZM58.8777 13.288V13H58.8057L58.7177 13.2L58.6297 13H58.5577V13.288H58.6057V13.072L58.6857 13.256H58.7417L58.8217 13.072V13.288H58.8777Z" fill="#F79E1B"/>
            <path d="M50.2599 2.40002H43.7639V13.984H50.2599V2.40002Z" fill="#FF5F00"/>
            <path d="M44.1809 8.17609C44.1843 7.06165 44.441 5.96256 44.9316 4.96191C45.4222 3.96127 46.1339 3.08525 47.0129 2.4001C45.9141 1.54829 44.5984 1.02177 43.2154 0.880349C41.8323 0.738932 40.4373 0.988292 39.1889 1.6001C38.2618 2.04949 37.4394 2.6885 36.7749 3.47578C36.1104 4.26307 35.6186 5.18109 35.3313 6.17044C35.044 7.1598 34.9676 8.19846 35.1071 9.2192C35.2465 10.24 35.5987 11.2201 36.1409 12.0961C36.8845 13.2683 37.9399 14.2102 39.1889 14.8161C40.4308 15.4177 41.8167 15.6589 43.1889 15.5121C44.5816 15.3714 45.9067 14.8419 47.0129 13.9841C46.1297 13.2956 45.4154 12.4145 44.9246 11.4079C44.4338 10.4013 44.1794 9.29595 44.1809 8.17609Z" fill="#EB001B"/>
            <path d="M59.01 8.17609C59.0091 9.56269 58.6182 10.9211 57.882 12.0961C57.1384 13.2683 56.083 14.2102 54.834 14.8161C53.5921 15.4177 52.2062 15.6589 50.834 15.5121C49.4413 15.3714 48.1162 14.8419 47.01 13.9841C47.8919 13.2911 48.6057 12.4078 49.098 11.4001C49.5874 10.3958 49.8417 9.29328 49.8417 8.17609C49.8417 7.05891 49.5874 5.95639 49.098 4.95209C48.6005 3.9567 47.8872 3.08486 47.01 2.4001C48.1088 1.54829 49.4245 1.02177 50.8075 0.880349C52.1906 0.738932 53.5856 0.988292 54.834 1.6001C56.0756 2.19578 57.1251 3.12784 57.8634 4.29032C58.6016 5.4528 58.9988 6.79907 59.01 8.17609Z" fill="#F79E1B"/>
            <path d="M149.254 16V13.464H147.246L146.214 12.368L145.174 13.464H138.55V8.344H136.414L139.062 2.576H141.622L142.534 4.552V2.576H145.694L146.214 4.064L146.774 2.576H149.222V0H132.614V16H149.254ZM147.582 12.8H149.254L147.014 10.576L149.222 8.344H147.574L146.214 9.776L144.862 8.344H143.19L145.39 10.584L143.222 12.8H144.822L146.214 11.376L147.574 12.824L147.582 12.8ZM147.974 10.552L149.254 11.856V9.28L147.974 10.576V10.552ZM140.534 11.76V11.064H143.158V10.08H140.534V9.384H143.222V8.344H139.262V12.8H143.222V11.76H140.534ZM147.998 7.672H149.254V3.2H147.294L146.214 6.008L145.214 3.2H143.222V7.68H144.486V4.56L145.678 7.696H146.798L147.99 4.552V7.696L147.998 7.672ZM141.798 7.672H143.222L141.174 3.2H139.574L137.518 7.68H138.918L139.302 6.784H141.414L141.806 7.68L141.798 7.672ZM140.998 5.776H139.734L140.366 4.312L140.998 5.776Z" fill="#0072BB"/>
            <path d="M125.509 12.8001V12.5601H125.605V12.5121H125.357V12.5601H125.453V12.8001H125.509ZM125.981 12.8001V12.5121H125.909L125.821 12.7041L125.733 12.5121H125.661V12.8001H125.709V12.5761L125.789 12.7681H125.845L125.925 12.5761V12.8001H125.981Z" fill="#00A2E5"/>
            <path d="M117.46 2.40002H110.964V14.048H117.46V2.40002Z" fill="#7375CF"/>
            <path d="M111.379 8.21589C111.381 7.0955 111.637 5.99014 112.128 4.98282C112.618 3.97551 113.331 3.09242 114.211 2.39988C113.117 1.53994 111.804 1.00513 110.42 0.856588C109.036 0.708046 107.639 0.951763 106.387 1.55988C104.819 2.3214 103.569 3.61108 102.857 5.20245C102.145 6.79383 102.017 8.58516 102.494 10.2619C102.972 11.9386 104.025 13.3936 105.468 14.3712C106.911 15.3488 108.653 15.7867 110.387 15.6079C111.783 15.4566 113.108 14.9161 114.211 14.0479C113.329 13.3537 112.615 12.468 112.124 11.4577C111.634 10.4475 111.379 9.33897 111.379 8.21589Z" fill="#EB001B"/>
            <path d="M126.213 8.21614C126.213 9.60799 125.822 10.9719 125.084 12.1518C124.345 13.3318 123.29 14.2802 122.038 14.8886C120.786 15.497 119.389 15.7408 118.005 15.5922C116.621 15.4435 115.307 14.9085 114.213 14.0481C115.093 13.3541 115.805 12.4694 116.294 11.4606C116.783 10.4519 117.038 9.3453 117.038 8.22414C117.038 7.10299 116.783 5.99642 116.294 4.98767C115.805 3.97891 115.093 3.09423 114.213 2.40015C115.307 1.53981 116.621 1.00475 118.005 0.856124C119.389 0.707503 120.786 0.951329 122.038 1.55972C123.29 2.16811 124.345 3.11651 125.084 4.29647C125.822 5.47642 126.213 6.8403 126.213 8.23214V8.21614Z" fill="#00A2E5"/>
            <path d="M76.7556 3.99999L72.8676 13.28H70.3316L68.4116 5.87199C68.3929 5.70131 68.3309 5.53823 68.2315 5.39822C68.1321 5.25821 67.9986 5.14592 67.8436 5.07199C67.0802 4.70607 66.2739 4.4373 65.4436 4.27199L65.5316 3.99999H69.6196C69.8862 3.99885 70.1444 4.09355 70.347 4.26683C70.5497 4.4401 70.6833 4.68042 70.7236 4.94399L71.7396 10.312L74.2116 3.99999H76.7556ZM86.7076 10.24C86.7076 7.79199 83.3156 7.65599 83.3396 6.55999C83.3396 6.23199 83.6676 5.87199 84.3556 5.75999C85.1787 5.67476 86.0093 5.81873 86.7556 6.17599L87.1796 4.20799C86.4609 3.93703 85.6997 3.79616 84.9316 3.79199C82.5316 3.79199 80.9316 5.05599 80.8756 6.86399C80.8756 8.19999 82.0676 8.94399 82.9796 9.39199C83.8916 9.83999 84.2276 10.136 84.2276 10.544C84.2276 11.168 83.4756 11.44 82.7876 11.456C81.9291 11.4739 81.0804 11.27 80.3236 10.864L79.8836 12.904C80.7357 13.2332 81.6422 13.3988 82.5556 13.392C85.0836 13.392 86.7316 12.144 86.7396 10.192M93.0037 13.224H95.2277L93.2517 3.99999H91.2036C90.9909 4.00363 90.7838 4.0691 90.6077 4.18843C90.4315 4.30776 90.2939 4.47578 90.2116 4.67199L86.6116 13.272H89.1316L89.6356 11.888H92.7157L93.0037 13.224ZM90.2916 9.98399L91.5557 6.49599L92.2836 9.98399H90.2916ZM80.1876 3.99999L78.2116 13.272H75.8116L77.7876 3.99999H80.1876Z" fill="#1434CB"/>
            <path d="M26.781 0H3.51187C1.98456 0 0.746429 1.23813 0.746429 2.76544V13.2346C0.746429 14.7619 1.98456 16 3.51187 16H26.781C28.3083 16 29.5464 14.7619 29.5464 13.2346V2.76544C29.5464 1.23813 28.3083 0 26.781 0Z" fill="#FFB3C7"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.8501 9.39138C26.4733 9.39138 26.1679 9.69959 26.1679 10.0798C26.1679 10.46 26.4733 10.7683 26.8501 10.7683C27.2269 10.7683 27.5324 10.46 27.5324 10.0798C27.5324 9.69956 27.2269 9.39138 26.8501 9.39138ZM24.6054 8.85912C24.6054 8.33855 24.1645 7.91665 23.6205 7.91665C23.0766 7.91665 22.6356 8.33857 22.6356 8.85912C22.6356 9.37969 23.0765 9.80171 23.6205 9.80171C24.1646 9.80171 24.6054 9.37969 24.6054 8.85912ZM24.6091 7.02731H25.6961V10.6908H24.6091V10.4567C24.302 10.668 23.9313 10.7922 23.5315 10.7922C22.4735 10.7922 21.6158 9.92675 21.6158 8.8591C21.6158 7.79145 22.4735 6.92604 23.5315 6.92604C23.9313 6.92604 24.302 7.05027 24.6091 7.26166V7.02731ZM15.9102 7.50451V7.02736H14.7973V10.6908H15.9127V8.98038C15.9127 8.40332 16.5325 8.09315 16.9626 8.09315C16.967 8.09315 16.9711 8.09358 16.9756 8.09363V7.02765C16.5341 7.02765 16.1281 7.2183 15.9102 7.50451ZM13.138 8.85913C13.138 8.33857 12.697 7.91667 12.153 7.91667C11.6091 7.91667 11.1681 8.33859 11.1681 8.85913C11.1681 9.3797 11.6091 9.80172 12.153 9.80172C12.697 9.80172 13.138 9.3797 13.138 8.85913ZM13.1416 7.02732H14.2286V10.6908H13.1416V10.4567C12.8345 10.668 12.4638 10.7922 12.0641 10.7922C11.006 10.7922 10.1483 9.92676 10.1483 8.85911C10.1483 7.79146 11.006 6.92605 12.0641 6.92605C12.4638 6.92605 12.8345 7.05028 13.1416 7.26167V7.02732ZM19.6843 6.92879C19.2501 6.92879 18.8391 7.06482 18.5644 7.44012V7.02754H17.4821V10.6908H18.5777V8.76565C18.5777 8.20856 18.9479 7.93576 19.3937 7.93576C19.8714 7.93576 20.1461 8.22374 20.1461 8.7581V10.6908H21.2317V8.36117C21.2317 7.50863 20.56 6.92879 19.6843 6.92879ZM8.56493 10.6908H9.70266V5.39477H8.56493V10.6908ZM3.56711 10.6923H4.77184V5.39381H3.56711V10.6923ZM7.78087 5.39381C7.78087 6.54088 7.33787 7.60796 6.54848 8.40111L8.21376 10.6925H6.72576L4.91597 8.20226L5.38305 7.84929C6.15764 7.26379 6.60193 6.36884 6.60193 5.3938L7.78087 5.39381Z" fill="#0A0B09"/>
          </svg>


        </div>
      
      ` : ``} 
  
  `;

  let insertionPoint = document.querySelector(attachPoint);
  insertionPoint.insertAdjacentHTML(attachPointType, carouselHTML);
  

  if(numSlides > slidesToShow) {
    window.jQuery(`.${ID}-inner`).slick({
      
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      spaceBetween: 20,
      dots: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    });

    let carousel = document.querySelector(`.${ID}-inner`);
    if(dataType == "dy") {
      window.DYO.recommendations.registerElements(carousel);
    }

    // carousel progress bar width

    let prevArrow = document.querySelector(`.${ID}-recs--progressbar--prev`);
    let nextArrow = document.querySelector(`.${ID}-recs--progressbar--next`);

    prevArrow.addEventListener('click', () => {
      window.jQuery(`.${ID}-inner`).slick('slickPrev');
      fireEvent(`Click - carousel prev arrow clicked`);
    });

    nextArrow.addEventListener('click', () => {
      window.jQuery(`.${ID}-inner`).slick('slickNext');
      fireEvent(`Click - carousel next arrow clicked`);
    });

  }

  setTimeout(() => {
    document.querySelector(`.${ID}-inner`).classList.add(`${ID}-initialised`);
  }, 2000);

  document.body.addEventListener('click', (e) => {

    if ((e.target.closest(`.${ID}-recs--carouselitem`) || e.target.classList.contains(`${ID}-recs--carouselitem`)) && !e.target.classList.contains(`${ID}-recs--carouselitem--addtocart`)) {
      fireEvent(`Click - product from carousel on [${placement}] clicked to go to ${e.target.closest(`.${ID}-recs--carouselitem > a`).href}`, true);
    }

    if (e.target.classList.contains(`${ID}-recs--carouselitem--addtocart`)) {
      e.preventDefault();
      let atcSKU = e.target.closest(`.${ID}-recs--carouselitem`).getAttribute('data-sku');
      let productHref = e.target.closest(`.${ID}-recs--carouselitem`).getAttribute('data-href');
      checkSKUForAdding(atcSKU, productHref);
      fireEvent(`Click - add to cart button from carousel on [${placement}] clicked for SKU: [${atcSKU}] with href: [${productHref}]`, true);
      
    }

    if(e.target.classList.contains(`${ID}-recs--checkoutsecurelybutton`)) {
      e.preventDefault();
      window.location.href = '/checkout';
      fireEvent(`Click - checkout securely button clicked on [${placement}]`, true);
    }

  });

  fireEvent(`Interaction - modal placed on [${placement}] with items from [${dataType}]`, true);

}

const checkSKUForAdding = (sku, href) => {
  
  
  let productID = sku;
  let variantID = ``;
  let serviceID = ``;
  let cartID = window.getAPISessionId();

  let theData = {};


  window.jQuery.ajax({
    cache: true,
    type: 'GET',
    url: href,
    success: function (returnedData) {
      // add returnedData to an HTML node so I can query with queryselector

      let parser = new DOMParser();
      let returnedPage = parser.parseFromString(returnedData, "text/html");
      let prodTemplate = returnedPage.getElementById('ProductJson-product-template');
      let json = JSON.parse(prodTemplate.innerText);
      let tags = json.tags;
      for (let i = 0; i < tags.length; i++) {
        let tag = tags[i];
        if (tag.indexOf("SHIPPING|cserviceid|") > -1) {
          serviceID = tag.replace('SHIPPING|cserviceid|', '');
          i = tags.length;
        }
      }

      let theProductName = returnedPage.querySelector('.product-single__title').innerText;
      

      if(returnedPage.querySelector('.single-option-selector')) {

        theData = {
          'form_type': 'product',
          'utf8': '✓',
          'size': '',
          'id': variantID,
          'properties[_serviceId]': serviceID,
          'product-id': productID,
          'properties[_cartid]': cartID,
        };

        let allSingleOptionSelectors = [].slice.call(returnedPage.querySelectorAll('.single-option-selector'));

        let sizeModalHTML = `
        
          <div class="${ID}-size-modal">
          
            <div class="${ID}-size-modal--content">

              

              <h2>${theProductName}</h2>

              <p> Choose size </p>

              <div class="${ID}-size-modal--sizes">
                ${allSingleOptionSelectors.map((selector) => {

                  let selectorValue = selector.value;
                  let selectorID = selector.getAttribute('data-variant-id');
                  let selectorDisabled = selector.disabled ? `${ID}-disabled` : '';

                  return `<button class="${ID}-sizebutton ${selectorDisabled}" data-variant-id="${selectorID}">${selectorValue}</button>`;

                }).join('')}

              </div>

              <button class="${ID}-size-modal--atb">Add to Bag</button>

              <button class="${ID}-size-modal--close">Go back</button>

            </div>
          
          </div>
        
        `;

        document.querySelector(`.${ID}-recs`).insertAdjacentHTML('beforeend', sizeModalHTML);

        document.documentElement.addEventListener('click', (e) => {

          if(e.target.classList.contains(`${ID}-sizebutton`) && !e.target.classList.contains(`${ID}-disabled`)) {
            let allSizeButtons = [].slice.call(document.querySelectorAll(`.${ID}-sizebutton`));
            allSizeButtons.forEach((button) => {
              button.classList.remove(`${ID}-selected`);
            });
            e.target.classList.add(`${ID}-selected`);
            fireEvent(`Click - size button clicked for ${e.target.innerText} on ${theProductName}`, true);
          }

          if(e.target.classList.contains(`${ID}-size-modal--atb`)) {
            let selectedSize = document.querySelector(`.${ID}-sizebutton.${ID}-selected`);
            if(selectedSize) {
              variantID = selectedSize.getAttribute('data-variant-id');
              theData = {
                'form_type': 'product',
                'utf8': '✓',
                'size': '',
                'id': variantID,
                'properties[_serviceId]': serviceID,
                'product-id': productID,
                'properties[_cartid]': cartID,
              };
              processAddToBag(theData);
              fireEvent(`Click - add to bag button clicked for ${theProductName} with size ${selectedSize.innerText}`, true);
            }
          }

          if(e.target.closest(`.${ID}-size-modal--close`) || e.target.classList.contains(`${ID}-size-modal`)) {
            document.querySelector(`.${ID}-size-modal`).remove();
            fireEvent(`Click - clicked to close the size modal using the close button`, true);
          }

        });

      } else {

        variantID = returnedPage.getElementById('ProductSelect-product-template').querySelector('option').getAttribute('value');
        theData = {
          'form_type': 'product',
          'utf8': '✓',
          'size': '',
          'id': variantID,
          'properties[_serviceId]': serviceID,
          'product-id': productID,
          'properties[_cartid]': cartID,
        };

        processAddToBag(theData);
        fireEvent(`Click - add to bag button clicked for ${theProductName}`, true);
      }

      // let checkedSizeVariant = returnedPage.querySelector('.single-option-selector:checked') ? returnedPage.querySelector('.single-option-selector:checked') : `NA`;
      // let sizeVariantID = checkedSizeVariant.getAttribute('data-variant-id') ? checkedSizeVariant.getAttribute('data-variant-id') : `NA`;
      // let sizeValue = checkedSizeVariant.value ? checkedSizeVariant.value : `NA`;


      
    },
  
  });

}

const processAddToBag = (theData) => {



  window.jQuery.ajax({
    cache: true,
    type: 'POST',
    url: 'https://www.mamasandpapas.com/cart/add.js',
    data: theData,
    dataType: 'json',
    success: function () {
      window.location.href = '/cart';
    },
  });

}

const getRecs = (strategy) => {
  logMessage("Recs API call made");
  return new Promise((resolve) => {
    window.DYO.recommendationWidgetData(strategy, { maxProducts: 20 }, function (error, data) {
      resolve(data);
    });
  });
}

const createModal = () => {

  let modalHTML = `
  
    <div class="${ID}-modal">

      <button class="${ID}-close" id="${ID}-close"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="29.7102" height="29.7102" rx="14.8551" fill="white"/><rect x="1" y="1" width="29.7102" height="29.7102" rx="14.8551" stroke="#323232" stroke-width="2"/><path d="M8.43918 8.43918C8.72047 8.15797 9.10193 8 9.49968 8C9.89743 8 10.2789 8.15797 10.5602 8.43918L15.8642 13.7432L21.1682 8.43918C21.4511 8.16594 21.83 8.01475 22.2233 8.01817C22.6166 8.02159 22.9928 8.17934 23.2709 8.45745C23.549 8.73556 23.7068 9.11178 23.7102 9.50508C23.7136 9.89837 23.5624 10.2773 23.2892 10.5602L17.9852 15.8642L23.2892 21.1682C23.5624 21.4511 23.7136 21.83 23.7102 22.2233C23.7068 22.6166 23.549 22.9928 23.2709 23.2709C22.9928 23.549 22.6166 23.7068 22.2233 23.7102C21.83 23.7136 21.4511 23.5624 21.1682 23.2892L15.8642 17.9852L10.5602 23.2892C10.2773 23.5624 9.89837 23.7136 9.50508 23.7102C9.11178 23.7068 8.73556 23.549 8.45745 23.2709C8.17934 22.9928 8.02159 22.6166 8.01817 22.2233C8.01475 21.83 8.16594 21.4511 8.43918 21.1682L13.7432 15.8642L8.43918 10.5602C8.15797 10.2789 8 9.89743 8 9.49968C8 9.10193 8.15797 8.72047 8.43918 8.43918Z" fill="#323232"/></svg></button>

      <img src="https://blcro.fra1.digitaloceanspaces.com/MAM-643/MAM-643-banner.jpg" alt="M&P Black Friday Banner" />

      <div class="${ID}-modal--carousel">
      

      
      </div>

    </div>  
  
  `;

  let insertionPoint = document.querySelector('body');
  insertionPoint.insertAdjacentHTML('beforeend', modalHTML);
  document.documentElement.classList.add(`${ID}-noscroll`);

  document.documentElement.addEventListener('click', (e) => {
      if (e.target.classList.contains(`${ID}-close`) || e.target.closest(`.${ID}-close`)) {
        fireEvent(`Click - Close Extras modal using close X`, true);
        document.documentElement.classList.remove(`${ID}-noscroll`);
        document.querySelector(`.${ID}-modal`).remove();
        setCookie(`${ID}-closed`, true);
      }

      if (e.target.classList.contains(`${ID}-noscroll`) && !e.target.closest(`.${ID}-modal`)) {
        fireEvent(`Click - Close Extras modal using outside click`, true);
        document.documentElement.classList.remove(`${ID}-noscroll`);
        document.querySelector(`.${ID}-modal`).remove();
        setCookie(`${ID}-closed`, true);
      }
  })


}

const createCarousel = (strategy, fallback, placement, title, attachPoint, attachPointType, carouselStyleOverride, addToCartButton, variation) => {

  if(strategy == 'CARTITEMS') {

    

    pollerLite(['#sidebar-cart .cart-item'], () => {

      let currCartItems = document.querySelectorAll('#sidebar-cart .cart-item');
      let allItems = [];

      currCartItems.forEach((item) => {

        let newItem = {
          imageURL: item.querySelector('.cart-item__image').getAttribute('src'),
          name: item.querySelector('.cart-item__title a').innerHTML,
          url: item.querySelector('.cart-item__title a').getAttribute('href'),
          price: item.querySelector('.cart-item__price').innerHTML,
          wasPrice: item.querySelector('.cart-item__price.price--save') ? item.querySelector('.cart-item__price.price--save').innerHTML : `NA`,
        }

        allItems.push(newItem);

      });

      insertRecs(allItems, 'cartitems', title, placement, attachPoint, attachPointType, carouselStyleOverride, addToCartButton, variation);

    })

  } else {

    getRecs(strategy).then((data) => {

      if(data.slots.length > 5) {

        insertRecs(data, 'dy', title, placement, attachPoint, attachPointType, carouselStyleOverride, addToCartButton, variation);

      } else {

        getRecs(fallback).then((data) => {

          if (data.slots.length > 5) {

            insertRecs(data, 'dy', title, placement, attachPoint, attachPointType, carouselStyleOverride, addToCartButton, variation);

          } 

        });

      }

    });

  }




}

const checkItemsInCart = () => {
  let recsObject = '';
  let itemsInCart = parseInt(document.getElementById('CartCount').querySelector(`span:first-of-type`).innerText);
  let blackFridayDate = new Date('2023-11-23');
  let currDate = new Date();


  // find difference in hours between the two dates
  let diff = Math.abs(blackFridayDate - currDate);
  let diffHours = Math.ceil(diff / (1000 * 60 * 60));

  if(diffHours < 24 && itemsInCart > 0) {
    recsObject = {
      recsStrategy: 'CARTITEMS', 
      fallbackStrategy: 'CARTITEMS',
      recsTitle: `Black Friday savings are ending soon. Grab a deal now`,
      placement: 'Exit Intent',
      attachPoint: `.${ID}-modal--carousel`,
      attachPointType: 'afterbegin',
      carouselStyleOverride: '',
      addToCartButton: 'true',
    };
  } else if(diffHours > 24 && itemsInCart > 0) {

    recsObject = {
      recsStrategy: 'CARTITEMS',
      fallbackStrategy: 'CARTITEMS',
      recsTitle: `You've left great savings in your bag`,
      placement: 'Exit Intent',
      attachPoint: `.${ID}-modal--carousel`,
      attachPointType: 'afterbegin',
      carouselStyleOverride: '',
      addToCartButton: 'true',
    };

  } else if(diffHours < 24 && itemsInCart == 0) {

    recsObject = {
      recsStrategy: '200104',
      fallbackStrategy: '200359',
      recsTitle: `Black Friday savings are ending soon. Grab a deal now`,
      placement: 'Exit Intent',
      attachPoint: `.${ID}-modal--carousel`,
      attachPointType: 'afterbegin',
      carouselStyleOverride: '',
      addToCartButton: 'true',
    };
    
  } else if(diffHours > 24 && itemsInCart == 0) {

    recsObject = {
      recsStrategy: '200104',
      fallbackStrategy: '200359',
      recsTitle: `Catch a Black Friday deal before you go`,
      placement: 'Exit Intent',
      attachPoint: `.${ID}-modal--carousel`,
      attachPointType: 'afterbegin',
      carouselStyleOverride: '',
      addToCartButton: 'true',
    };

  }

  return recsObject;

}

export default () => {

  setup();

  fireEvent("Conditions Met");

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

  createModal();

  let recsObject = checkItemsInCart();


  window.recsObject = recsObject; 

 

  pollerLite([
    () => {
      return window.recsObject;
    }
  ], () => {
    pollerLite([
      () => { return document.querySelector(window.recsObject.attachPoint); }
    ], () => {

      let recsStrategy = window.recsObject.recsStrategy;
      let fallbackStrategy = window.recsObject.fallbackStrategy;
      let placement = window.recsObject.placement;
      let recsTitle = window.recsObject.recsTitle;
      let attachPoint = window.recsObject.attachPoint;
      let attachPointType = window.recsObject.attachPointType;
      let carouselStyleOverride = window.recsObject.carouselStyleOverride;
      let addToCartButton = window.recsObject.addToCartButton == 'true' ? true : false;
      let variation = window.recsObject.variation;

      fireEvent(`Conditions Met - experiment started on ${placement}`, true);
      
      createCarousel(recsStrategy, fallbackStrategy, placement, recsTitle, attachPoint, attachPointType, carouselStyleOverride, addToCartButton, variation);
    })
    

  })
  


  
  
};
