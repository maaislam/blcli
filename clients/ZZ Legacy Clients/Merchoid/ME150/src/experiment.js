import { fullStory, events, scrollTo } from '../../../../lib/utils';
import { Marvel, DCComics } from './lib/ME150-content';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME150',
    VARIATION: '{{VARIATION}}',
  },
  globals: {
    brandName: [],
  },
  init: function init() {
    // Setup
    const {
      settings, services, components, globals,
    } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    /**
     * @desc if the ME150 storage exists to anchor the user down to the relevant category
     */
    const URL = window.location.href;
    if (URL.indexOf('brand') > -1) {
      if (settings.VARIATION === '2') {
        if (sessionStorage.getItem('ME150-anchor')) {
          components.anchorToCategory();
        }
      }
    }
    /**
    * @desc on product page check if the brand if marvel or DC,run the prevent add to basket form
    */
    if (URL.indexOf('product') > -1) {
      poller(['.mobile-target-product-title', '.product-image-assoc-brand'], () => {
        const brand = document.querySelector('.mobile-target-product-title').textContent;

        if (brand.match(/(Marvel|Spider-Man|Spiderman|Captain\sAmerica|Black\sPanther|Guardians\sof\sthe\sGalaxy|X-Men|Avengers|Ant-Man|Punisher|Deadpool|Thor|Hulk|Iron\sMan)/)) {
          globals.brandName.push('Marvel');
        } else if (brand.match(/(Batman|Harley\sQuinn|Superman|Justice\sLeague|Wonder\sWoman|Suicide\sSquad|Arrow|DC|Green\sLantern|The\sFlash)/)) {
          globals.brandName.push('DC Comics');
        }

        const pageBrand = globals.brandName[0];
        if (pageBrand === 'Marvel' || pageBrand === 'DC Comics') {
          if (!localStorage.getItem('ME150-closed_lightbox')) {
            services.preventBasketredirect();
          }

          /**
          * @desc checks if the item has been added to basket then fire the popup
          */
          if (URL.indexOf('uc-did-add-to-cart=1') > -1) {
            components.popup();
            components.brandElements();
            components.closePopup();
            components.saveCategoryClicked();

            if (settings.VARIATION === '2') {
              const category = document.querySelectorAll('.ME150_brand-image');
              for (let i = 0; i < category.length; i += 1) {
                const element = category[i];
                element.addEventListener('click', () => {
                  sessionStorage.setItem('ME150-anchor', 1);
                });
              }
            }
          }
        }
      });
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
     * @desc stop add to bag going to basket
     */
    preventBasketredirect: function preventBasketredirect() {
      // add this to form
      const forms = document.querySelectorAll('.variations_form, form.cart');
      [].forEach.call(forms, (form) => {
        form.insertAdjacentHTML('beforeend', `<input type="hidden" name="_add-to-cart-redirect" value="${window.location.pathname}?uc-did-add-to-cart=1"/>`);
      });
    },
  },

  components: {
    /**
     * @desc creates the overlay and popup
     */
    popup: function popup() {
      const { settings, globals } = Experiment;
      const popupOverlay = document.createElement('div');
      popupOverlay.classList.add('ME150_overlay');

      document.body.classList.add('ME150-no_scroll');
      const brandPopup = document.createElement('div');
      brandPopup.classList.add('ME150-brands_popup');
      brandPopup.innerHTML = `<div class="ME150_inner_popup">
        <div class="ME150-close-popup">&times;</div>
        <div class="ME150-add_success">
          <h3>Awesome!</h3>
          <p>Added to your basket</p>
          <div class="ME150-checkout"><a href="https://www.merchoid.com/cart/">Checkout Now</a></div>
        </div>
        <hr class="ME150-hr">
        <h3 class="ME150-brands_title"></h3>
        <div class="ME150-brand_logo"></div>
        <div class="ME150-brands"></div>
        <div class="ME150-allMerch"><a href="#">See all <span></span> Merch</a></div>
      </div>`;

      if (!document.querySelector('.ME150-brands_popup')) {
        document.body.appendChild(brandPopup);
        document.body.appendChild(popupOverlay);

        const brandLogo = document.querySelector('.product-image-assoc-brand').getAttribute('src');
        document.querySelector('.ME150-brand_logo').style.backgroundImage = `url('${brandLogo}')`;

        // change all brand related items e.g link, name
        const pageBrand = globals.brandName[0];
        let brandTitle;
        let brandLink;
        if (pageBrand === 'Marvel') {
          if (settings.VARIATION === '1') {
            brandTitle = 'See more merch from the Marvel Universe';
          } else {
            brandTitle = 'Explore these categories to discover more Marvel merch';
          }
          brandLink = 'https://www.merchoid.com/brand/marvel/';
        } else if (pageBrand === 'DC Comics') {
          if (settings.VARIATION === '1') {
            brandTitle = 'See more merch from the DC Universe';
          } else {
            brandTitle = 'Explore these categories to discover more DC merch';
          }
          brandLink = 'https://www.merchoid.com/brand/dc-comics/';
        }
        // change the pop up title and logo based on the brand
        const popupTitle = document.querySelector('.ME150-brands_title');
        popupTitle.textContent = brandTitle;
        const allbrandLink = document.querySelector('.ME150-allMerch span');
        allbrandLink.textContent = pageBrand;
        document.querySelector('.ME150-allMerch a').setAttribute('href', brandLink);

        // checkout event
        const checkoutButton = document.querySelector('.ME150-checkout');
        checkoutButton.addEventListener('click', () => {
          events.send(`ME150 v${settings.VARIATION}`, 'Checkout clicked', 'Clicked checkout on popup', { sendOnce: true });
        });
      }
    },
    /**
     * @desc add the brands from the object to the popup
     */
    brandElements: function brandElements() {
      const { settings, globals } = Experiment;
      const pageBrand = globals.brandName[0];
      let brandObj;
      if (pageBrand === 'Marvel') {
        brandObj = Marvel;
      } else if (pageBrand === 'DC Comics') {
        brandObj = DCComics;
      }
      // add the title for the pop up here based on which brand it is
      for (let i = 0; i < Object.keys(brandObj).length; i += 1) {
        const data = Object.entries(brandObj)[i];
        const allBrands = data[1];
        const recBrand = document.createElement('div');
        recBrand.classList.add('ME150_inner-brand');
        if (settings.VARIATION === '1') {
          recBrand.innerHTML = `<a class="ME150_brand-link" href="${allBrands.link}"><div class="ME150_brand-image" style="background-image:url('${allBrands.image}')"></div><p>${allBrands.name}</p></a>`;
        } else if (settings.VARIATION === '2') {
          recBrand.innerHTML = `<a class="ME150_brand-link" href="${allBrands.link2}"><div class="ME150_brand-image" style="background-image:url('${allBrands.image2}')"></div><p>${allBrands.name2}</p></a>`;
        }
        const brandWrapper = document.querySelector('.ME150-brands');
        brandWrapper.appendChild(recBrand);
      }
    },
    /**
     * @desc close the pop up on "x" click or overlay click
     */
    closePopup: function closePopup() {
      const { settings } = Experiment;
      const closePopUp = document.querySelector('.ME150-close-popup');
      const lightboxPopup = document.querySelector('.ME150-brands_popup');
      const overlay = document.querySelector('.ME150_overlay');
      closePopUp.addEventListener('click', () => {
        overlay.remove();
        lightboxPopup.remove();
        localStorage.setItem('ME150-closed_lightbox', 1);
        events.send(`ME150 v${settings.VARIATION}`, 'Closed popup', 'Clicked close popup', { sendOnce: true });
        document.body.classList.remove('ME150-no_scroll');
      });
      overlay.addEventListener('click', () => {
        overlay.remove();
        lightboxPopup.remove();
        localStorage.setItem('ME150-closed_lightbox', 1);
        events.send(`ME150 v${settings.VARIATION}`, 'Closed popup', 'Clicked close popup', { sendOnce: true });
        document.body.classList.remove('ME150-no_scroll');
      });
    },
    /**
     * @desc add the brands from the object to the popup
     */
    saveCategoryClicked: function saveCategoryClicked() {
      const { settings } = Experiment;
      const categories = document.querySelectorAll('.ME150_inner-brand');
      for (let i = 0; i < categories.length; i += 1) {
        const element = categories[i];
        element.addEventListener('click', () => {
          const linkName = element.querySelector('p').textContent;
          if (settings.VARIATION === '2') {
            sessionStorage.setItem('ME150-category', linkName);
          }
          events.send(`ME150 v${settings.VARIATION}`, 'Category click', `Clicked on category/character: ${linkName}`, { sendOnce: true });
        });
      }
    },
    /**
     * @desc add the brands from the object to the popup
     */
    anchorToCategory: function anchorToCategory() {
      if (sessionStorage.getItem('ME150-category')) {
        const categoryChosen = sessionStorage.getItem('ME150-category');
        const categoryNames = document.querySelectorAll('.section-category-heading');
        for (let i = 0; i < categoryNames.length; i += 1) {
          const element = categoryNames[i];
          const headingName = element.textContent;
          if (headingName.indexOf(categoryChosen) > -1) {
            const headingVal = element.getBoundingClientRect().y + window.scrollY;
            scrollTo(headingVal - 200);
          }
        }
        sessionStorage.removeItem('ME150-anchor');
      }
    },
  },
};

export default Experiment;
