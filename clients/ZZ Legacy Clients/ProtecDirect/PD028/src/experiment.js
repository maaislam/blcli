import { fullStory, events } from '../../../../lib/utils';
import { countdown } from '../../../../lib/uc-lib';

/**
 * {{PD028}} - {{Homepage Redesign [Mobile]}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'PD028',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const oldNavigationArea = bodyVar.querySelector('.lockhart_mobile_homepage_menu_links.clearfix.cms-collection-component');
      const uspArea = bodyVar.querySelector('#content > .span-24.section1.last');
      const uspBarMarkup = `
      <section class="landing_wrap PD028-USP">
        <div class="PD028-USP-Bar-Wrapper">
          <div class="PD028-USP-Bar PD028-USP-1">
            <img class="PD028-USP-1-Truck" src="//www.sitegainer.com/fu/up/1smo5lzomp18jsz.png" alt="Delivery Truck" />
              <div class="PD028-USP-1-Text">
                <span class="PD028-Top-Timer-Text">Get it by <span id="PD028-delivery-day"></span>*</span>
                <div class="PD028-Countdown-Wrapper">
                </div>
              </div>
          </div>

          <div class="PD028-USP-Bar PD028-USP-2">
            <img class="PD028-USP-2-Truck" src="//www.sitegainer.com/fu/up/1smo5lzomp18jsz.png" alt="Delivery Truck" />
            <div class="PD028-USP-2-Text">
              <h3>
                <b>Free</b> Delivery over £25
              </h3>
              <p class="PD028-USP-2-Text-Content">Free next day delivery as well! Get it tomorrow</p>
            </div>
          </div>

          <div class="PD028-USP-Bar PD028-USP-3">
            <img class="PD028-USP-3-Phone" src="//www.sitegainer.com/fu/up/krk8e45pv29w4so.png" alt="Phone" />
            <div class="PD028-USP3-Text">
              <h3>
              Contact us on <b>0870 333 3081</b>
              </h3>
              <p class="PD028-USP3-Text-Content">Monday to Friday between 8:30am & 5:30pm</p>
            </div>
          </div>
        </div>
      </section>
      `;
      const lowerTimerMarkup = `
        <div class="PD028-Lower-Timer-Wrap">
          <img class="PD028-Lower-Timer-Truck" src="//www.sitegainer.com/fu/up/1smo5lzomp18jsz.png" alt="Delivery Truck" />
          <div class="PD028-Lower-Timer">
            <span class="PD028-Lower-Timer-Text">Place your orders in the next <div class="PD028-Countdown-Wrapper"></div><span class="PD028-Lower-Delivery-Day"> for next day delivery</span>*</span>
          </div>
        </div>
      `;
      const navigationMarkup = `
      <div class="PD028-Navigation-Wrapper">
        <div class="PD028-Navigation-Header">
          <p class="PD028-Navigation-Title">Navigation</p>
          <p class="PD028-Sub-Title">Search over 10,000 products</p>
        </div>

        <div class="PD028-PPE-Wrap PD028-Navigation-Container">
          <div class="PD028-Title-Wrap">
            <p class="PD028-Title">PPE</p>
            <span class="PD028-Arrow"></span>
          </div>
            <div class="PD028-Links">
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Head-Protection~c~AA">Head Protection</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Glasses-and-Goggles~c~AB">Safety Glasses and Goggles</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Glasses-and-Goggles~c~AB">Face Protection</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hearing-Protection~c~AD">Hearing Protection</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment~c~AE">Respiratory Protective Equipment</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection~c~AF">Hand Protection</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear~c~AG">Safety Footwear</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/First-Aid~c~AH">First Aid</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Fall-Arrest-Equipment~c~AI">Fall Arrest Equipment</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Ebola-Protection~c~AK">Ebola Protection</a>
            </div>
        </div>

        <div class="PD028-Gloves-Wrap PD028-Navigation-Container">
          <div class="PD028-Title-Wrap">
          <p class="PD028-Title">Gloves</p>
          <span class="PD028-Arrow"></span>
        </div>
            <div class="PD028-Links">
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Head-Protection~c~AA">Anti-Vibration Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Builders-Grip-Gloves~c~AFB">Builders Grip Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Cotton-Gloves~c~AFC">Cotton Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Cut-Resistant-Gloves~c~AFD">Cut Resistant Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Disposable-Gloves~c~AFE">Disposable Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/General-Handling-Gloves~c~AFF">General Handling Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/General-Purpose-Gloves~c~AFG">General Purpose Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Heat-Resistant-Gloves~c~AFH">Heat Resistant Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Leather-Gloves~c~AFI">Leather Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Nitrile-Latex-Unsupported-Gloves~c~AFJ">Nitrile / Latex Unsupported Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Nitrile-Coated-Gloves~c~AFK">Nitrile Coated Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/PU-Coated-Gloves~c~AFL">PU Coated Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Rigger-Gloves~c~AFM">Rigger Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Single-Double-Dip-PVC-Gloves~c~AFN">Single / Double Dip PVC Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Protective-Sleeves~c~AFO">Protective Sleeves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Specialist-Gloves~c~AFP">Specialist Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Thermal-Gloves~c~AFQ">Thermal Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Thermal-Grip-Gloves~c~AFR">Thermal Grip Gloves</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Trade-Specific-Gloves~c~AFS">Trade Specific Gloves</a>
            </div>
        </div>

        <div class="PD028-Clothing-Wrap PD028-Navigation-Container">
        <div class="PD028-Title-Wrap">
          <p class="PD028-Title">Clothing & Workwear</p>
          <span class="PD028-Arrow"></span>
        </div>
            <div class="PD028-Links">
              <a class="PD028-Link" href="/Clothing-and-Workwear/Hi-Vis-Clothing~c~BA">Hi-Vis Clothing</a>
              <a class="PD028-Link" href="/Clothing-and-Workwear/Protective-Workwear~c~BB">Protective Workwear</a>
              <a class="PD028-Link" href="/Clothing-and-Workwear/Disposable-Workwear~c~BC">Disposable Workwear</a>
              <a class="PD028-Link" href="/Clothing-and-Workwear/Waterproof-PVC-Clothing~c~BD">Waterproof / PVC Clothing</a>
              <a class="PD028-Link" href="/Clothing-and-Workwear/Coats-Jackets-and-Bodywarmers~c~BE">Coats, Jackets & Bodywarmers</a>
              <a class="PD028-Link" href="/Clothing-and-Workwear/Fleeces-and-Softshell-Jackets~c~BF">Fleeces & Softshell Jackets</a>
              <a class="PD028-Link" href="/Clothing-and-Workwear/Polo-Shirts-T-Shirts~c~BH">Polo Shirts / T-Shirts</a>
              <a class="PD028-Link" href="/Clothing-and-Workwear/Sweatshirts-Hooded-Sweatshirts~c~BG">Sweatshirts / Hooded Sweatshirts</a>
              <a class="PD028-Link" href="/Clothing-and-Workwear/Corporate-Workwear~c~BI">Corporate Workwear</a>
              <a class="PD028-Link" href="/Clothing-and-Workwear/Trousers~c~BJ">Trousers</a>
              <a class="PD028-Link" href="/Clothing-and-Workwear/Outdoor-Thermal-Clothing~c~BBI">Outdoor/Thermal Clothing</a>
            </div>
        </div>

        <div class="PD028-Footwear-Wrap PD028-Navigation-Container">
        <div class="PD028-Title-Wrap">
          <p class="PD028-Title">Footwear</p>
          <span class="PD028-Arrow"></span>
        </div>
            <div class="PD028-Links">
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Timberland-Safety-Boots~c~AGA">Timberland Safety Boots</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Dr-Martens-Safety-Footwear~c~AGB">Dr Martens Safety Footwear</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Caterpillar-Safety-Footwear~c~AGC">Caterpillar Safety Footwear</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/DeWalt-Safety-Footwear~c~AGD">DeWalt Safety Footwear</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/JCB-Safety-Footwear~c~AGE">JCB Safety Footwear</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Chukka-Boots~c~AGF">Chukka Boots</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Rigger-Boots~c~AGG">Rigger Boots</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Work-Boots~c~AGH">Work Boots</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Work-Shoes~c~AGI">Work Shoes</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Executive-Safety-Shoes~c~AGJ">Executive Safety Shoes</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Safety-Trainers~c~AGK">Safety Trainers</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Hiker-Boots~c~AGL">Hiker Boots</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Anti-Slip-Safety-Footwear~c~AGN">Anti Slip Safety Footwear</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Ladies-Safety-Footwear~c~AGP">Ladies Safety Footwear</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Specialist-Foundry-Footwear~c~AGQ">Specialist Foundry Footwear</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Wellington-Boots~c~AGR">Wellington Boots</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Snow-Chains~c~AGS">Snow Chains</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Socks~c~AGT">Socks</a>
              <a class="PD028-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Footwear-Accessories~c~AGU">Footwear Accessories</a>
            </div>
        </div>

        <div class="PD028-Site-Consumables-Wrap PD028-Navigation-Container">
        <div class="PD028-Title-Wrap">
          <p class="PD028-Title">Site Consumables</p>
          <span class="PD028-Arrow"></span>
        </div>
            <div class="PD028-Links">
              <a class="PD028-Link" href="/Site-Equipment-and-Consumables/Roadworks-and-Equipment~c~DA">Roadworks & Equipment</a>
              <a class="PD028-Link" href="/Site-Equipment-and-Consumables/Site-Essentials~c~DB">Site Essentials</a>
              <a class="PD028-Link" href="/Site-Equipment-and-Consumables/Site-Materials-and-Supplies~c~DC">Site Materials & Supplies</a>
              <a class="PD028-Link" href="/Site-Equipment-and-Consumables/Site-Equipment-and-Tools~c~DD">Site Equipment & Tools</a>
              <a class="PD028-Link" href="/Site-Equipment-and-Consumables/Ladders-and-Platforms~c~DE">Ladders & Platforms</a>
              <a class="PD028-Link" href="/Site-Equipment-and-Consumables/Temporary-Site-Protection~c~DF">Temporary Site Protection</a>
              <a class="PD028-Link" href="/Site-Equipment-and-Consumables/Fire-Equipment~c~AJ">Fire Equipment</a>
              <a class="PD028-Link" href="/Site-Equipment-and-Consumables/Site-Lighting-Equipment~c~DAG">Site Lighting Equipment</a>
              <a class="PD028-Link" href="/Storage-Solutions~c~F">Storage Solutions</a>
              <a class="PD028-Link" href="/Industrial-Skin-Care-and-Janitorial/Industrial-Skin-Care~c~CA">Industrial Skin Care</a>
              <a class="PD028-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies~c~CB">Janitorial & Cleaning Supplies</a>
              <a class="PD028-Link" href="/Site-Equipment-and-Consumables/Technology~c~DG">Technology</a>
              <a class="PD028-Link" href="/Site-Equipment-and-Consumables/Stationery-and-Equipment~c~DH">Stationery & Equipment</a>
            </div>
        </div>

        <div class="PD028-Offers-Clearance-Wrap PD028-Navigation-Container">
        <div class="PD028-Title-Wrap">
          <p class="PD028-Title">Offers</p>
          <span class="PD028-Arrow"></span>
        </div>
          <div class="PD028-Links">
            <a class="PD028-Link" href="/All-Discounts/Special-Offers~c~special_offers">Special Offers</a>
            <a class="PD028-Link" href="/All-Discounts/Clearance~c~clearance">Clearance</a>
          </div>
        </div>

      </div>
      `;
      const specialOffersMarkup = `
        <section class="landing_wrap PD028-Offers">
          <p class="PD028-Offers-Title">Special Offers</p>
          <p class="PD028-Offers-Sub-Title">While stocks last</p>
          <div class="PD028-Offers-Wrap">
          </div>
        </section>
      `;
      let specialOffersSlidesParent;
      let PD028SlickParentUSP;
      return {
        bodyVar,
        navigationMarkup,
        oldNavigationArea,
        uspArea,
        uspBarMarkup,
        lowerTimerMarkup,
        PD028SlickParentUSP,
        specialOffersMarkup,
        specialOffersSlidesParent,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
        // Insert USP Bar carousel
        // Import slick slider

        const USPCarousel = () => {
          Exp.cache.uspArea.insertAdjacentHTML('beforebegin', Exp.cache.uspBarMarkup);
          // Build countdown timer
          this.buildCountdown();
          Exp.cache.PD028SlickParentUSP = $('.PD028-USP-Bar-Wrapper');
          Exp.cache.bodyVar.querySelector('.landing_wrap.PD028-USP').className = 'PD028_landing_wrap PD028_USP_Carousel';
          Exp.cache.PD028SlickParentUSP.addClass('PD028_landing_slider');
          Exp.cache.bodyVar.querySelector('.PD028-USP-Bar-Wrapper.PD028_landing_slider').classList.remove('landing_slider');
          // Configure Slick
          Exp.cache.PD028SlickParentUSP.slick({
            infinite: false,
            arrows: false,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
          });
        };

        if ($.fn.slick) {
          USPCarousel();
        } else {
          $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', USPCarousel);
        }
        // Insert lower timer
        Exp.cache.oldNavigationArea.insertAdjacentHTML('afterend', Exp.cache.lowerTimerMarkup);
        // Insert new navigation markup
        Exp.cache.bodyVar.querySelector('.PD028-Lower-Timer-Wrap').insertAdjacentHTML('afterend', Exp.cache.navigationMarkup);
        // Navigation elements ready, build navigation functions
        this.setupNavigationFunctions();
        // Build special offers carousel
        this.getSpecialOffers();
      },
      buildCountdown() {
        // Create cutoff date and convert to ms since epoch with getTime
        let cutoff = new Date();
        cutoff.setUTCHours(17, 0, 0);
        cutoff = cutoff.getTime();
        $('.PD028-Countdown-Wrapper').prepend([
          '<div class="PD028-countdown">',
          '<div id="PD028-countdown"></div>',
          '</div>',
        ].join(''));

        // Configure the countdown function
        countdown({
          cutoff,
          element: '#PD028-countdown',
          delivery: {
            deliveryDays: 1, // How long an item takes to arrive
            excludeDays: ['Saturday', 'Sunday'], // Non-working days
            deliveryDayElement: '#PD028-delivery-day',
            tomorrowLabel: true,
          },
        });
        // Amend lower text if delivery is not tomorrow
        if (Exp.cache.bodyVar.querySelector('#PD028-delivery-day').textContent.toUpperCase() !== 'TOMORROW') {
          const amendedDay = Exp.cache.bodyVar.querySelector('#PD028-delivery-day').textContent;
          Exp.cache.bodyVar.querySelector('.PD028-Lower-Delivery-Day').textContent = ` for delivery on ${amendedDay}`;
        }
      },
      setupNavigationFunctions() {
        $('.PD028-Title-Wrap').on('click', (e) => {
          // Assign selectors
          const navigationItem = $(e.target).closest('.PD028-Navigation-Container');
          const linkWrap = navigationItem.find('.PD028-Links');
          // Check if link wrap is visible, if hidden then slide down
          if (!linkWrap.is(':visible')) {
            // Remove active class to hide other accordions
            if ($('.PD028-Active')) {
              $('.PD028-Active').find('.PD028-Links').slideUp();
              $('.PD028-Active').toggleClass('PD028-Active');
            }
            linkWrap.slideDown(() => {
              // Add a class to navigation item if it does not have it
              if (!navigationItem.hasClass('PD028-Active')) {
                navigationItem.toggleClass('PD028-Active');
                // Scroll to active links
                $('html, body').animate({ scrollTop: linkWrap.offset().top - 200 });
              }
            });
            // Slide up if visible
          } else if (linkWrap.is(':visible')) {
            linkWrap.slideUp();
            // If the navigation active class, remove it
            if (navigationItem.hasClass('PD028-Active')) {
              navigationItem.toggleClass('PD028-Active');
            }
          }
        });
      },
      getSpecialOffers() {
        // Request the products from the special offers page
        const requestProducts = new XMLHttpRequest();
        requestProducts.open('GET', '/All-Discounts/Special-Offers~c~special_offers');
        requestProducts.onload = () => {
          if (requestProducts.status === 200) {
            // Request is succesful, create temporary div and get products
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = requestProducts.responseText;
            const specialOfferProducts = tempDiv.querySelectorAll('ul#resultsList > .productlistItem');
            // Check if there are special offer products, check if required elements exist
            if (specialOfferProducts.length > 0 && tempDiv.querySelector('.grid_4 > a') && tempDiv.querySelector('.grid_8 > .productListItemDetails')) {
              const offersCarousel = () => {
                // Add markup
                Exp.cache.bodyVar.querySelector('#content > .span-24.section1.last > .highlights-carousel').insertAdjacentHTML('afterend', Exp.cache.specialOffersMarkup);
                Exp.cache.specialOffersSlidesParent = Exp.cache.bodyVar.querySelector('.PD028-Offers-Wrap');
                // Loop through special offer products and add markup
                for (let i = 0; i < specialOfferProducts.length; i += 1) {
                  // Assign variables from Current product
                  const currentProduct = specialOfferProducts[i];
                  const currentImage = currentProduct.querySelector('.grid_4 > a > .prod_image_main > img');
                  const productImage = currentImage.getAttribute('src');
                  const currentAlt = currentImage.getAttribute('alt');
                  const productLink = currentProduct.querySelector('.grid_4 > a').getAttribute('href');
                  const productName = currentProduct.querySelector('.grid_4 > a > .prod_image_main > img').getAttribute('title').trim();
                  const productCurrentPrice = currentProduct.querySelector('.grid_8 > .productListItemDetails > .price-text > .bold-blue').textContent.trim();
                  let ProductWasPrice = currentProduct.querySelector('.grid_8 > .productListItemDetails > p > strike > span');
                  // Gets product quantity such as "each"
                  let productQuantity = currentProduct.querySelector('.grid_8 > .productListItemDetails > .price-text > .vat').textContent.trim();
                  productQuantity = productQuantity.replace(/\(ex. VAT\)/g, '');
                  // Add variables to markup
                  const carouselProductMarkup = `
                    <div class="PD028-Product-Carousel-Wrapper">
                      <a class="PD028-Offer-Link" href="${productLink}">
                        <img class="PD028-Offer-Product-Image" src="${productImage}" alt="${currentAlt}" />
                        <p class="PD028-Product-Title">${productName}</p>
                        <p class="PD028-Price">${productCurrentPrice} ${productQuantity}</p>
                      </a>
                    </div>
                  `;
                  // Markup for one product ready to add
                  Exp.cache.specialOffersSlidesParent.insertAdjacentHTML('beforeend', carouselProductMarkup);
                  // Add was price if it exists
                  if (ProductWasPrice) {
                    const currentMarkup = Exp.cache.bodyVar.querySelectorAll('.PD028-Product-Carousel-Wrapper > .PD028-Offer-Link')[i];
                    ProductWasPrice = ProductWasPrice.textContent.trim();
                    currentMarkup.insertAdjacentHTML('beforeend', `<p class="PD028-Was-Price">Was: ${ProductWasPrice}</p>
                    `);
                  }
                }
                // Assign selectors
                Exp.cache.specialOffersSlidesParent = $('.PD028-Offers-Wrap');
                Exp.cache.bodyVar.querySelector('.landing_wrap.PD028-Offers').className = 'PD028_landing_wrap PD028_Offers_Carousel';
                Exp.cache.specialOffersSlidesParent.addClass('PD028_landing_slider');
                Exp.cache.bodyVar.querySelector('.PD028-Offers-Wrap.PD028_landing_slider').classList.remove('landing_slider');
                // Confugure slick
                Exp.cache.specialOffersSlidesParent.slick({
                  infinite: false,
                  arrows: true,
                  dots: false,
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  autoplay: false,
                });
                // Hide Slick's default arrows, add styling class
                Exp.cache.bodyVar.querySelector('.PD028-Offers-Wrap.PD028_landing_slider > .slick-prev.slick-arrow').textContent = '';
                Exp.cache.bodyVar.querySelector('.PD028-Offers-Wrap.PD028_landing_slider > .slick-prev.slick-arrow').classList.add('PD028-Prev-Arrow');
                Exp.cache.bodyVar.querySelector('.PD028-Offers-Wrap.PD028_landing_slider > .slick-next.slick-arrow').textContent = '';
                Exp.cache.bodyVar.querySelector('.PD028-Offers-Wrap.PD028_landing_slider > .slick-next.slick-arrow').classList.add('PD028-Next-Arrow');
              };
              if ($.fn.slick) {
                offersCarousel();
              } else {
                $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', offersCarousel);
              }
            }
          }

          // Do nothing if request is unsuccesful
        };
        requestProducts.send();
      },
    },
  };

  Exp.init();
};

export default Run;
