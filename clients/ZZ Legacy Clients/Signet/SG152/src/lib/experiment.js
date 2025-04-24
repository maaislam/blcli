/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

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
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if(VARIATION !== 'control') {

  


    const url = document.location.href.toLowerCase();
    let content = {};

    let gridMessageAll = '';
    let gridMessageAll2 = '';
    let gridMessageOne = '';
    let gridMessageTwo = '';
    let expertMsg = '';
    let clearpayMsg = '';


  
   /**
    * 
    * @returns In grid data
    */
    const inGridData = () => {
      content = {

        // //H Samuel

        // 'pricePromise': {
        //   link: 'https://www.hsamuel.co.uk/webstore/price-promise/',
        //   title: 'Price Promise',
        //   text: 'We won\'t be beaten on price',
        //   linktext: 'Learn More',
        //   image:'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/979cc82a-9884-11ec-93e5-3a18bdcdad96' 
        // }, 
        // 'clickCollect': {
        //   link: 'https://www.hsamuel.co.uk/delivery/',
        //   title: 'Collect In Store',
        //   text: 'Same day Click and Collect available.',
        //   linktext: 'Learn More',
        //   image:'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/9713cbe2-9884-11ec-805c-2220d2f7e6d8' 
        // },
        // 'appointmentBooking' : {
        //   link: 'https://www.hsamuel.co.uk/webstore/content/appointment-booking/',
        //   title: 'Shopping Made Easy',
        //   text: 'Book an In-Store Appointment',
        //   linktext: 'Book Now',
        //   image:'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/9666b092-9884-11ec-b0ee-6af1655c3647' 
        // },
        // 'freeDelivery' : {
        //   link: 'https://www.hsamuel.co.uk/delivery/',
        //   title: 'Gifts With Style',
        //   text: 'Free Standard Delivery',
        //   linktext: 'Learn More',
        //   image:'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/95b57368-9884-11ec-9c7a-0663f27d9103' 
        // },
        // 'clearPay' : {
        //   link: 'https://www.hsamuel.co.uk/webstore/clearpay.cdo',
        //   title: 'Shop Now. Pay Later.',
        //   text: 'Using Clearpay',
        //   linktext: 'Learn More',
        //   image:'https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/ef2369d4-77a3-11ec-a76e-3e9132a36c70' 
        // },

        //Ernest Jones

        'expert' : {
          link: 'https://www.ernestjones.co.uk/webstore/content/live-chat/',
          title: 'Talk To An Expert',
          text: 'Start a live chat with our team today',
          linktext: 'Learn More',
          image:'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/b9556fbe-7ec4-11ec-b52e-c693a946f1f3' 
        },
        'appointment' : {
          link: 'https://www.ernestjones.co.uk/webstore/in-store-appointment.cdo?icid=ej-fn-appointment',
          title: ' Book An Appointment',
          text: 'In Store and Virtual Appointment Available',
          linktext: 'Book Now',
          image:'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/b81eaed0-7ec4-11ec-a805-c23d00351688' 
        },
        'clickCol' : {
          link: 'https://www.ernestjones.co.uk/delivery-information/?icid=ej-fn-ess-delivery',
          title: 'Same Day Click and Collect',
          text: 'Some products available within 2 hours',
          linktext: 'Learn More',
          image:'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/b8be6934-7ec4-11ec-8ed5-c693a946f1f3' 
        },
        'bridal' : {
          link: 'https://www.ernestjones.co.uk/webstore/l/bridal-set-engagement-rings/',
          title: 'Bridal Sets',
          text: 'Shop our collection today',
          linktext: 'Shop Now',
          image:'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9ce732fc-a388-11ec-be3a-4e2ceb7f68ed' 
        },
        'eternity' : {
          link: 'https://www.ernestjones.co.uk/webstore/l/jewellery-new/',
          title: 'New In Jewellery',
          text: 'From coloured gemstones to Eternity Rings',
          linktext: 'Shop Now',
          image:'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9d72a6c0-a388-11ec-8159-76906cb18ee5' 
        },
        'watchGift' : {
          link: 'https://www.ernestjones.co.uk/webstore/l/watches/?current_price=1500%3a',
          title: 'Free Gift',
          text: 'Free Watch Roll for purchases over £1500 & Free Winder for purchases over £2000',
          linktext: 'Shop Now',
          image:'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/9e09744c-a388-11ec-b485-02a3e426f98d' 
        },
        'watchTag' : {
          link: 'https://www.ernestjones.co.uk/webstore/l/tag-heuer-watches/',
          title: 'Tag Heuer Watches',
          text: 'Shop our collection',
          linktext: 'Shop Now',
          image:'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a51e33f8-a388-11ec-a862-4e2ceb7f68ed' 
        },
        'watchBremont' : {
          link: 'https://www.ernestjones.co.uk/webstore/l/bremont-watches/',
          title: 'Bremont Watches',
          text: 'Shop our latest and upcoming Bremont Watches',
          linktext: 'Shop Now',
          image:'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/a63ca210-a388-11ec-96ac-76906cb18ee5' 
        },
      }

      return content;
    }


    /**
     * 
     * @param {*} data 
     * @returns Markup for the in grid block
     */
    const messageMarkup = (data) => {

      const elImage = data.image;
      const elTitle = data.title;
      const elText = data.text;
      const elLink = data.link;
      const elLinkTitle = data.linktext;

      const message = `
      <div>
        <div class="${ID}-inGrid product-listing__item">
          <div class="${ID}-container">
          <div class="${ID}-image" style="background-image: url(${elImage})"></div>
          <div class="${ID}-wrapper">
            <div class="${ID}-inGrid-content">
              <h3>${elTitle}</h3>
              <p>${elText}</p>
              <a target="_blank" href="${elLink}" class="${ID}-button">${elLinkTitle}</a>
            </div>
          </div>
          </div>
        </div>
        </div>`;

      return message;
    }  


    /**
     * 
     * @param {*} el 
     * @param {*} messageNo 
     * @returns Where to place the message
     */
    const messageToAdd = (el, messageNo) => {
      return el.insertAdjacentHTML('afterend', messageNo);
    }

    const gridData = inGridData();

      // //Ernest Jones
      // watches
      if(url.indexOf('webstore/l/mens-watches') > -1 || url.indexOf('webstore/l/ladies-watches') > -1 || url.indexOf('webstore/l/luxury-watches') > -1 || url.indexOf('webstore/l/watches') > -1) {
        gridMessageOne = messageMarkup(gridData.watchGift);
        gridMessageTwo = messageMarkup(gridData.watchBremont);
        gridMessageAll = messageMarkup(gridData.watchTag);
      }

      // bridal sets
      if(url.indexOf('webstore/l/engagement-rings') > -1 || url.indexOf('webstore/l/rings') > -1 || url.indexOf('webstore/l/engagement-rings-sale') > -1 || url.indexOf('webstore/l/rings-sale') > -1) {
        gridMessageOne = messageMarkup(gridData.bridal);
        gridMessageTwo = messageMarkup(gridData.eternity);
        gridMessageAll = messageMarkup(gridData.bridal);
      }

      // jewellery
      if(url.indexOf('webstore/l/jewellery') > -1 || url.indexOf('webstore/l/ladies-sale-jewellery') > -1 || url.indexOf('webstore/l/ladies-jewellery') > -1 || url.indexOf('webstore/l/jewellery') > -1) {
        gridMessageOne = messageMarkup(gridData.eternity);
        gridMessageAll = messageMarkup(gridData.eternity);
      }

      // //H Samuel
      // // all
      // if(url.indexOf('webstore/l/') > -1) {
      //   gridMessageAll = messageMarkup(gridData.appointmentBooking);
      //   gridMessageAll2 = messageMarkup(gridData.freeDelivery);
      //   expertMsg = messageMarkup(gridData.clickCollect);
      //   clearpayMsg = messageMarkup(gridData.clearPay);
      // }

      // // watches
      // if(url.indexOf('l/citizen-watches') > -1||url.indexOf('l/tissot-watches') > -1||url.indexOf('l/hamilton-watches') > -1||url.indexOf('l/casio-watches') > -1||url.indexOf('l/bulova-watches') > -1||url.indexOf('l/sekonda-watches') > -1||url.indexOf('l/swatch-watches') > -1) {
      //   gridMessageOne = messageMarkup(gridData.pricePromise);
      // }
    
    const addMessage = () => {
      const products = document.querySelectorAll('.product-listing__grid-container > div');
      for (let index = 0; index < products.length; index += 1) {
        const element = products[index];
        
        //Ernest Jones

        if(window.innerWidth < 767) {
          // insert content after 3rd and 15th - mobile
          if(index === 2) {
            if(gridMessageOne !== '') {
              messageToAdd(element, gridMessageOne);
            }
            else{
              messageToAdd(element, expertMsg);
            }
          }
  
          if(index === 6) {
            if(gridMessageTwo !== '') {
              messageToAdd(element, gridMessageTwo);
            }
            else{
              messageToAdd(element, gridMessageOne);
            }
          }

          if(index === 9) {
              messageToAdd(element, gridMessageAll);
          }

          if(index === 14) {
              messageToAdd(element, gridMessageOne);
          }
        } 
        
        else { // insert content after 5th and 16th - desktop

          if(index === 4) {
            if(gridMessageOne !== '') {
              messageToAdd(element, gridMessageOne);
            }
            else{
              messageToAdd(element, gridMessageAll);
            }
          }

          if(index === 8) {
            if(gridMessageTwo !== '') {
              messageToAdd(element, gridMessageTwo);
              }
            else {
              messageToAdd(element, gridMessageOne);
            }
          }

          if(index === 12) {
              messageToAdd(element, gridMessageAll);
          }
        }
        // // H Samuel


        // if(window.innerWidth < 767) {
        //   // insert content after 3rd and 15th - mobile
        //   if(index === 2) {
        //     if(gridMessageOne !== '') {
        //       messageToAdd(element, gridMessageOne);
        //     }
        //     else{
        //       messageToAdd(element, expertMsg);
        //     }
        //   }
  
        //   if(index === 6) {
        //     if(gridMessageTwo !== '') {
        //       messageToAdd(element, gridMessageTwo);
        //     }
        //     else{
        //       messageToAdd(element, gridMessageAll2);
        //     }
        //   }

        //   if(index === 9) {
        //       messageToAdd(element, gridMessageAll);
        //   }

        //   if(index === 14) {
        //       messageToAdd(element, clearpayMsg);
        //   }
        // } else { // insert content after 5th and 16th - desktop

        //   if(index === 4) {
        //     if(gridMessageOne !== '') {
        //       messageToAdd(element, gridMessageOne);
        //     }
        //     else{
        //       messageToAdd(element, gridMessageAll2);
        //     }
        //   }

        //   if(index === 8) {
        //     if(gridMessageTwo !== '') {
        //       messageToAdd(element, gridMessageTwo);
        //       }
        //     else {
        //       messageToAdd(element, gridMessageAll);
        //     }
        //   }

        //   if(index === 12) {
        //       messageToAdd(element, expertMsg);
        //   }
        // }

      }
      
    }

    const removeMessage = () => {
     const allIngridContent = document.querySelectorAll(`.${ID}-inGrid`);
      if(allIngridContent) {
        
        for (let index = 0; index < allIngridContent.length; index += 1) {
          const element = allIngridContent[index];
          element.parentNode.remove();
        }
      }
    }

    const buttonEvent = () => {
      const inGridContent = document.querySelectorAll(`.${ID}-inGrid`);
      if(inGridContent) {
        for (let index = 0; index < inGridContent.length; index += 1) {
          const element = inGridContent[index];
          element.querySelector('a').addEventListener('click', () => {
            fireEvent('Click in grid content');
          });
        }
      }
    }

     addMessage();
    buttonEvent();

    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observeEl = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    
                    removeMessage();
                    

                    if(url.indexOf('ernestjones') > -1) {
                      if(window.digitalData.page.pageInfo.pageType === 'PLP') { 
                        addMessage();
                        buttonEvent();
                      }
                      
                    } else if(url.indexOf('hsamuel') > -1) {
                      if(url.indexOf('/webstore/l/engagement-rings/') > -1 || url.indexOf('/webstore/l/jewellery/') > -1 || url.indexOf('webstore/l/watches') > -1 || url.indexOf('webstore/l/earrings-for-ladies/') > -1 || url.indexOf('webstore/l/womens-rings') > -1) {
                        addMessage();
                        buttonEvent();
                      }
                    }
                  }
            });
      });
    const config = {
        childList: true,
        subtree: true
    };
    
    observeEl.observe(bodyList, config);

    if(document.querySelector('.product-listing__more-button')) {
      document.querySelector('.product-listing__more-button').addEventListener('click', () => {
        removeMessage();
        addMessage();
        buttonEvent();
      });
    }
  }
  else {

  }
};
