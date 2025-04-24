import shared from "../../../../../core-files/shared";
import Swiper, { Navigation, Pagination } from "swiper";
import { fireEvent } from "../../../../../core-files/services";

const { ID, VARIATION } = shared;

/**
 * 
 * @param {*} contentData 
 * @param {*} elToAppend 
 * Creates all the inner data for each variation - same across all
 */

export const adCardCTAS = () => {
  let ctas;

  // not logged in
  if(window.userObj.isLoggedIn === 'false') {
   ctas = 
   `<a class="${ID}-cta ${ID}-signUp" href="https://www.boots.com/AdvantageCardApply?catalogId=28501&langId=-1&storeId=11352&krypto=0wp%2B4NX0fuEr5yAnU2OOofuJqq5YJHVhBtzMgm7gqerXoDZb%2BegZXF25ikP%2F%2FNWbUtmCBbHVoPlMlnjlZqFBYg%3D%3D?cm_sp=Advantage-Card-Sign-Up">Sign up</a>
    <a class="${ID}-cta ${ID}-login" href="https://www.boots.com/BootsLogonForm?catalogId=28501&myAcctMain=1&langId=-1&storeId=11352&mfaAdcardLogin=true&krypto=zVyt8c%2FeMHl3xkCpur2RMYhi2fqFTR%2Fskvoc%2BnP1pjoqkFf1ywXQW3wX7BtpnOgp9wYj9A%2FqoHdgBIvZywRTulvwrV9bW60sA5A5PgbLMnSQhpDZQcLo9c5yc5Fg4lrCYP44BpDhmY0Xt6KyKj7vCA%3D%3D?cm_sp=Advantage-Card-Log-In">Login</a>`;
  }

  // logged in with adCard
  if(window.userObj.isLoggedIn === 'true' && window.userObj.advantageCardFlag === 'true') {
    ctas = 
    `<a class="${ID}-cta ${ID}-signUp" href="https://www.boots.com/sitesearch?searchTerm=price%20advantage">Shop savings</a>`;
  }

  // logged in without adCard
  if(window.userObj.isLoggedIn === 'true' && window.userObj.advantageCardFlag === 'false') {
    ctas = 
    `<a class="${ID}-cta ${ID}-signUp" href="https://www.boots.com/sitesearch?searchTerm=price%20advantage">Shop savings</a>
    <a class="${ID}-cta ${ID}-signUp" href="https://www.boots.com/AdvantageCardApply?catalogId=28501&langId=-1&storeId=11352&krypto=0wp%2B4NX0fuEr5yAnU2OOofuJqq5YJHVhBtzMgm7gqerXoDZb%2BegZXF25ikP%2F%2FNWbUtmCBbHVoPlMlnjlZqFBYg%3D%3D?cm_sp=Advantage-Card-Sign-Up">Sign up</a>`;
  }

  return ctas;

}


export const addTabs = (tabData, el) => {
  Object.keys(tabData).forEach((i) => {
    const data = tabData[i];

    const tab = document.createElement('div');
    tab.classList.add(`${ID}-tab`);
    tab.setAttribute('type', data.attr);

    tab.innerHTML = `<span>${data.tabTitle ? data.tabTitle : data.heading }</span>`;

    el.insertAdjacentElement('beforebegin', tab);
  });

}


export const changeOfferColours = () => {

  const offers = document.querySelectorAll(`.${ID}-aboveFold-inner[type="offers"] .items .item`);
  for (let index = 0; index < offers.length; index++) {
    const element = offers[index];
    if(element.getAttribute('bgCol')) {
      element.style.background = element.getAttribute('bgCol');
    }
    
  }
}

export const addInnerContent = (contentData, elToAppend) => {

    Object.keys(contentData).forEach((i) => {
        const data = contentData[i];

        const foldSection = document.createElement('div');
        foldSection.classList.add(`${ID}-aboveFold-inner`);

        if(VARIATION !== '1' || VARIATION !== '2') {
          if(data.tabBg) {
            foldSection.setAttribute('bgCol', data.tabBg);

          }
        }

        foldSection.classList.add(`close`);
        foldSection.setAttribute('type', data.attr);


        let markup = '';
        if(VARIATION === '1' || VARIATION === '2') {
          markup = `<div class="${ID}-sectionHeading"><h3><span>${data.heading}</span></h3></div>`
        }

        markup += '<div class="sectionContent-inner">'
          if(data.title) {
            markup += `<h3 class="${ID}-sectionTitle">${data.title}</h3>`;
          }
          markup += '<div class="sectionContent-container">'
            if(data.carousel) {
              markup += `<div class="${ID}-carousel">`
            }
              markup += '<div class="items swiper-wrapper">'
                for (let index = 0; index < data.inner.length; index += 1) {
                  const innerData =  data.inner[index];

                  if(innerData.html) {
                    markup += '<div class="item is-html">' + innerData.html + '</div>'
      
                    // Build item markup
                  } else {
                    
                      markup += `<div class="item swiper-slide" ${innerData.bgcolour ? `bgCol="${innerData.bgcolour}";` : ''}>`
                      markup += `<a class="fullLink "href="${innerData.link}"></a>`

                      if(innerData.badge) {
                        markup += `<div class="badge ${innerData.badge}"><span>${innerData.badge}</span></div>`;
                      }

                      if(innerData.image) {
                        markup += `<div class="${ID}-image" style="background-image:url(${innerData.image})"></div>`;
                      }
                      
                      markup += `<div class="${ID}-info">`;
                      
                        if(innerData.title) {
                          markup += `<div class="title" ${innerData.titlecolour ? `style="color: ${innerData.titlecolour}";` : ``}>${innerData.title}</div>`;
                        }
                        if(innerData.text) {
                          markup += `<p class="text" ${innerData.textcolour ? `style="color: ${innerData.textcolour}";` : ''}>${innerData.text}</p>`;
                        }
                        if(innerData.linkText) {
                          markup += `<a href="${innerData.link}" class="${ID}-cta">${innerData.linkText}</a>`;
                        }
        
                      markup += '</div>';
                    markup += '</div>';
                  }
                
                }
              markup += '</div>';
              if(data.carousel) {
                 
                  markup += `</div>`
                  markup += `<div class="${ID}-pagination swiper-pagination"></div>`;
                  markup += `<div class="${ID}-swiperNext swiper-button-next"></div>`
                  markup += `<div class="${ID}-swiperPrev swiper-button-prev"></div>`  
              }
              if(data.link) {
                markup += `<a href="${data.link}" class="${ID}-cta">${data.linkText}</a>`;
              }
            markup += '</div>';
          markup += '</div>';
        
        foldSection.innerHTML = markup;

        elToAppend.appendChild(foldSection);
      
    });  

}

export const createCarousel = (carouselEl, tabletSlideNo, desktopSlideNo, centered) => {


   let swiper;


    const initSlider = () => { 
        
        Swiper.use([Navigation, Pagination]);

         swiper = new Swiper(`${carouselEl} .${ID}-carousel`, {
          direction: "horizontal",
          loop: true,
          observer: true,
          observeParents: true,
          centeredSlides: centered,
          observeSlideChildren: true,
          slidesPerView: 1.5,
          spaceBetween: 10,
        
          breakpoints: {
            480: {
              slidesPerView: 1.5,
            },
            640: {
              slidesPerView: 2.5,
            },
            900: {
              slidesPerView: tabletSlideNo,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: desktopSlideNo,
              spaceBetween: 20,
            },
          },
          navigation: {
            loop: true,
            nextEl: `${carouselEl} .swiper-button-next`,
            prevEl: `${carouselEl} .swiper-button-prev`,
            clickable: true,
          },
          paginationClickable: true,
          pagination: {
            el: `${carouselEl} .swiper-pagination`,
            clickable: true,
            type: 'bullets',
          },
          
        });

        if (typeof mySwiper != 'undefined') {  
            swiper.init(); 
            swiper.update();
        }
    }

    let init = false;
    const contentSwiperMode = () => {
      
       let mobile = window.matchMedia('(min-width: 0px) and (max-width: 1023px)');
        let tablet = window.matchMedia('(min-width: 1024px) and (max-width: 1279px)');
        let desktop = window.matchMedia('(min-width: 1280px)');
      


            // Enable (for mobile)
            if(mobile.matches) {

                const allSliders = document.querySelectorAll(`.${ID}-carousel`);
                if(allSliders) {
                    for (let index = 0; index < allSliders.length; index++) {
                        const element = allSliders[index];
                        if(element.querySelector('.swiper-slide.swiper-slide-active')) {
                            element.swiper.destroy(true,true)
                        }
                        
                    }
                }

                if(document.querySelector(`.${ID}-content .${ID}-carousel .swiper-slide.swiper-slide-active`)) {
                    document.querySelector(`.${ID}-content .${ID}-carousel`).swiper.destroy(true, false);
                }
                init = false;
                

            }

            // Disable (for tablet)
            else if(tablet.matches) {
                if (!init) {
                    init = true;
                    initSlider();
                }
            }

            // Disable (for desktop)
            else if(desktop.matches) {
            
                if (!init) {
                    init = true;
                    initSlider();
                }
            }
    }

    //window.addEventListener('load', function() {
        contentSwiperMode();
     // });
      window.addEventListener('resize', function() {
        contentSwiperMode();
        changeOfferColours();
      });
  
}

export const allContentTracking = () => {
  const allCarouselItems = document.querySelectorAll('.items .item');

  for (let index = 0; index < allCarouselItems.length; index++) {
    const element = allCarouselItems[index];
    element.addEventListener('click', () => {
      if(element.querySelector('.title')) {
        fireEvent('Clicked above the fold item ' + element.querySelector('.title').textContent);
      }
    });
   
  }
}