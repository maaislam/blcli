import { events, pollerLite } from './../../../../../lib/utils';
import shared from './shared';
import data from './data';


/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  // set up events
  events.setDefaultCategory('Experimentation');
  events.setDefaultAction(CLIENT + " - "+ID);

  if(LIVECODE == "true") {
    events.sendEvents = false;
  } else {
    events.sendEvents = true;
  }

  // adds document body classlist 
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);
};

export const fireEvent = (label) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  events.sendAuto(VARIATION, label);

}

/*  ----------------
  Cookie opt in check
  ------------------ */
  export const cookieOpt = () => {
    const { ID, VARIATION } = shared;

    pollerLite([
     () => {
      return !!window.ga
     }], () => {
      fireEvent(`${ID}-${VARIATION} Experiment Fired`);
     });
  }

  export const checkInLocalStorage = (url) => {
    const { ID, VARIATION } = shared;

    let pagesExperimentHasRun = [];
    let checkIfModalHasBeenSeenOnPage = false;

    if (localStorage.getItem(`${ID}-add-to-basket-modal`) !== null) {
      // Get item content
      pagesExperimentHasRun = JSON.parse(localStorage.getItem(`${ID}-add-to-basket-modal`));

      if (pagesExperimentHasRun.indexOf(`${url}`) > -1) {
        checkIfModalHasBeenSeenOnPage = true;
      }
    }

    return checkIfModalHasBeenSeenOnPage;
  }

  export const storeInLocalStorage = (url) => {
    const { ID, VARIATION } = shared;

    let pagesExperimentHasRun = [];
    if (localStorage.getItem(`${ID}-add-to-basket-modal`) == null) {
      pagesExperimentHasRun.push(`${url}`);

      localStorage.setItem(`${ID}-add-to-basket-modal`, JSON.stringify(pagesExperimentHasRun));
    } else {
      // Get item content
      pagesExperimentHasRun = JSON.parse(localStorage.getItem(`${ID}-add-to-basket-modal`));

      if (pagesExperimentHasRun.indexOf(`${url}`) == -1) {
        pagesExperimentHasRun.push(`${url}`);

        localStorage.setItem(`${ID}-add-to-basket-modal`, JSON.stringify(pagesExperimentHasRun));
      }
    }
  }

  export const detectChangeOfDeviceOrientation = () => {
    const { ID, VARIATION } = shared;

    window
    .matchMedia('(orientation: portrait)')
    .addListener(function (m) {
        if (m.matches) {
            // portrait
            // alert('portrait');
            document.querySelector(`.HC060-relatedPopUp__container .HC060-relatedProds__wrapper`).removeAttribute('style');
        } else {
            // landscape
            // alert('landscape');
            document.querySelector(`.HC060-relatedPopUp__container .HC060-relatedProds__wrapper`).setAttribute('style', 'display: none;');
        }
    });
  }

  export const appendModal = (url, prodName) => {
    const { ID, VARIATION } = shared;

    const relatedProds = data[`${url}`].related;
    let relatedProductsPopUp = '';
    let relatedProdsContent = `<div class="${ID}-relatedPopUp__wrapper v${VARIATION}" style="display: none;">
      <div class="${ID}-relatedPopUp__overlay"></div>
      <div class="${ID}-relatedPopUp__container">
        <button type="button" class="${ID}-button__close ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close" title="Close"><span class="ui-button-icon ui-icon ui-icon-closethick"></span><span class="ui-button-icon-space"> </span></button>
        <div class="${ID}-content__wrapper">
          <h2><strong>${prodName}</strong> added to your bag</h3>
          <div class="${ID}-viewBasket__link"><a href="javascript:void(0)">View my bag</a></div>
        </div>
        <div class="${ID}-relatedProds__wrapper">
          <h4>Often bought with...</h4>
          <ul class="${ID}-relatedProds__list"></ul>
        </div>
      </div>
    </div>`;


    document.querySelector('#main').insertAdjacentHTML('afterbegin', relatedProdsContent);

  }

  export const addCtaButtons = () => {
    const { ID, VARIATION } = shared;

    let ctaButtons = '';
    if (VARIATION == '1' || VARIATION == '3') {
      ctaButtons = `<div class="${ID}-ctaBtn__wrapper">
        <button id="${ID}-checkout" type="button" title="Checkout" value="Checkout" class="button-fancy-large add-to-cart">Checkout</button>
        <button id="${ID}-continute-shopping" type="button" title="Continue Shopping" value="Continue Shopping" class="button-fancy-large button-gray">Continue</button>
      </div>`;
    } else if (VARIATION == '2') {
      ctaButtons = `<div class="${ID}-ctaBtn__wrapper">
        <button id="${ID}-continute-shopping" type="button" title="Continue Shopping" value="Continue Shopping" class="button-fancy-large add-to-cart">Continue</button>
        <button id="${ID}-checkout" type="button" title="Checkout" value="Checkout" class="button-fancy-large button-gray">Checkout</button>
      </div>`;
    }
    
    document.querySelector(`.${ID}-relatedPopUp__wrapper h2`).insertAdjacentHTML('afterend', ctaButtons);

  }

  export const closeModal = () => {
    const { ID, VARIATION } = shared;

    const popUpModal = document.querySelector(`.${ID}-relatedPopUp__wrapper`);
    popUpModal.classList.add('hidden');
    document.querySelector('body').classList.remove(`${ID}-noScroll`);

    setTimeout(() => {
      popUpModal.parentElement.removeChild(popUpModal);
    }, 500);  
  }

  export const getProductDetails = (key, url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement('html');
        temp.innerHTML = request.responseText;
        let prodDetails = null;
        if (temp.querySelector('button#add-to-cart')
        && temp.querySelector('#pdpMain img.primary-image')
        && temp.querySelector('.price-wrapper .product-price .price-sales')
        && temp.querySelector('#page_heading h1')) {
          let image = temp.querySelector('#pdpMain img.primary-image').getAttribute('src');
          let price = temp.querySelector('.price-wrapper .product-price .price-sales').innerText.trim();
          let prodName = temp.querySelector('#page_heading h1').innerText.trim();

          prodDetails = {
            'key': key,
            'url': url,
            'name': prodName,
            'img': image,
            'price': price,
          };
        }
        
        callback(prodDetails);
      }
    };
    request.send();
  };
  
  export const populateRelatedProductsList = (prodUrl) => {
    const { ID, VARIATION } = shared;

    let relatedProds = data[`${prodUrl}`].related;
    let prodCount = 0;
    for (var key in relatedProds) {
      if (relatedProds.hasOwnProperty(key)) {
          prodCount += 1;
        /**
         * @desc Gets Product content from PDPs
         * and stores data in object @param prodDetails
         */
          getProductDetails (key, `https://www.hotelchocolat.com${relatedProds[key].url}`, (prodDetails) => {
            if (prodDetails !== null) {
              let listItem = `<a href="${prodDetails.url}" data-id="${prodDetails.key}"><li class="${ID}-relatedProds__item">
                <img src="${prodDetails.img}" style="width: 150px;">
                <p class="${ID}-name">${prodDetails.name}</p>
                <span class="${ID}-price">${prodDetails.price}</span>
              </li></a>`;

              document.querySelector(`ul.${ID}-relatedProds__list`).insertAdjacentHTML('beforeend', listItem);
            }
            
          });
      }

      if (VARIATION == '3'
      && prodCount > 0) {
        break;
      } else if (prodCount > 2) {
        break;
      }
      
    }

  }

  export const modalClickEvents = () => {
    const { ID, VARIATION } = shared;

    // --- Checkout CTA
    const checkoutCta = document.querySelector(`#${ID}-checkout`);
    checkoutCta.addEventListener('click', (e) => {
      fireEvent('Modal close - Click Checkout button');
      
      setTimeout(() => {
        window.location.href = 'https://www.hotelchocolat.com/uk/basket';
      }, 500);
    });
    
    // --- Continue Shopping CTA
    const continueShoppingCta = document.querySelector(`#${ID}-continute-shopping`);
    continueShoppingCta.addEventListener('click', (e) => {
      fireEvent('Modal close - Click Continue button');
      closeModal();
    });

    // --- View My Bag
    const viewBasket = document.querySelector(`.${ID}-viewBasket__link a`);
    viewBasket.addEventListener('click', (e) => {
      closeModal();
      if (window.innerWidth < 960) {
        fireEvent('Clicked - View basket mobile - redirect');
        setTimeout(() => {
          window.location.href = 'https://www.hotelchocolat.com/uk/basket';
        }, 500);
      } else {
        fireEvent('Clicked - View basket desktop - open basket content');
        let miniCartEl = document.querySelector('#main-header div#mini-cart');
        miniCartEl.classList.add('hover');
      }
    });

    
    // --- Close Lightbox CTA
    const closeIcon = document.querySelector(`.${ID}-button__close`);
    closeIcon.addEventListener('click', (e) => {
      fireEvent('Modal close - Click Close X button');
      closeModal();
    });
    // --- Click on background overlay
    const backgroundOverlay = document.querySelector(`.${ID}-relatedPopUp__overlay`);
    backgroundOverlay.addEventListener('click', (e) => {
      fireEvent('Modal close - Click Overlay');
      closeModal();
    });

    // --- Products
    const allRelatedProducts = document.querySelectorAll(`ul.${ID}-relatedProds__list li.${ID}-relatedProds__item`);
    for (let i = 0; i < allRelatedProducts.length; i += 1) {
      let prod = allRelatedProducts[i];
      prod.addEventListener('click', (e) => {
        fireEvent(`Product click - Position ${i + 1}`);
      });
    }

  }
