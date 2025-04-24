import { fullStory, events } from '../../../../lib/utils';
// import flicker from './flickerprevention';

/**
 * {{TP094}} - {{Desktop Product Listing Page Information}}
 */
// flicker();
const run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP094',
      VARIATION: '1',
    },
    cache: (() => {
      // Store selectors and content used throughout the code
      const bodyVar = document.body;
      const TP094Markup = (`
      <div class="TP094-Wrapper">
        <div class="TP094-TopButtons-Wrapper">
          <span class="TP094-Show-Offers-Button">Show Offers</span>
        </div>

        <div class="TP094-Offers-Trade-container TP094-Hide-Offers TP094-Hide-Trade">
            <div class="TP094-Top-Offers-Wrapper">
                <p class="TP094-Top-Offers-Header">Top Offers</p>
                
                <div class="TP094-Top-Offers-Container TP094-Top-Offers-1 clearfix">

                  <a class="TP094-Top-Offers-Link TP094-Top-Offer-1" href="/Product/Doors%2C-Windows+Joinery/Doors%2C-Joinery+Ironmongery-Offers/c/1580024">
                    <span class="TP094-Offer-Text">Doors & Ironmongery</span>
                  </a>

                  <a class="TP094-Top-Offers-Link TP094-Top-Offer-1" href="/Product/Building-Materials/Building-Materials-Offers/c/1580021">
                    <span class="TP094-Offer-Text">Building Materials</span>
                  </a>

                  <a class="TP094-Top-Offers-Link TP094-Top-Offer-1" href="/Product/Gardens+Landscaping/Gardens+Landscaping-Offers/c/1580022">
                    <span class="TP094-Offer-Text">Landscaping</span>
                  </a>

                  <a class="TP094-Clearance-Link TP094-Top-Offers-Link TP094-Top-Offer-2" href="/Product/Clearance/c/1574000">
                    <span class="TP094-Clearance-Text">Clearance Deals</span>
                  </a>

                  <a class="TP094-Top-Offers-Link TP094-Top-Offers-Link TP094-Top-Offer-1" href="/Product/Timber/Timber-Offers/c/1580023">
                    <span class="TP094-Clearance-Text">Timber</span>
                  </a>

                  <a class="TP094-Top-Offers-Link TP094-Top-Offers-Link TP094-Top-Offer-1" href="/Product/Plumbing+Heating/Plumbing+Heating-Offers/c/1580027">
                    <span class="TP094-Clearance-Text">Plumbing & Heating</span>
                  </a>

                  <a class="TP094-Top-Offers-Link TP094-Top-Offer-1" href="/Product/Tools+Workwear/Tools+Workwear-Offers/c/1580028">
                    <span class="TP094-Offer-Text">Tools and Workwear</span>
                  </a>

                  <a class="TP094-Top-Offers-Link TP094-Top-Offer-1" href="/Product/Kitchens/Kitchen-Offers/c/1580025">
                    <span class="TP094-Offer-Text">Kitchens & Worktops</span>
                  </a>

                  <a class="TP094-Top-Offers-Link TP094-Top-Offer-1" href="/Product/Timber/Timber-Offers/c/1580023?q=%3Arelevance%3Acategory%3A1500188&text=#">
                    <span class="TP094-Offer-Text">Flooring</span>
                  </a>

                  <a class="TP094-Top-Offers-Link TP094-Top-Offer-1" href="/Product/Plumbing+Heating/Plumbing+Heating-Offers/c/1580027">
                    <span class="TP094-Offer-Text">Bathrooms</span>
                  </a>

                  <a class="TP094-Top-Offers-Link TP094-Top-Offer-1" href="/Product/Decorating+Interiors/Decorating+Interiors-Offers/c/1580029">
                    <span class="TP094-Offer-Text">Decorating & Interiors</span>
                  </a>

                  <a class="TP094-Top-Offers-Link TP094-Top-Offer-1" href="/Product/Electrical+Lighting/Electrical+Lighting-Offers/c/1580031">
                    <span class="TP094-Offer-Text">Electrical & Lighting</span>
                  </a>

                  <a class="TP094-Top-Offers-Link TP094-Top-Offer-1" href="/Product/Fixings+Adhesives/Fixing+Adhesives-Offers/c/1580030">
                    <span class="TP094-Offer-Text">Fixings & Adhesives</span>
                  </a>
                </div>


              
                 

                  
                </div>

                <div class="TP094-Top-Offers-View-More-Wrapper">
                  <a class="TP094-Top-Offers-View-More" href="/tradeoffers">View more offers...</a>
                </div>

              </div>

            <div class="TP094-Trade-Account-Area-Wrapper">
              <div class="TP094-Login-Form-Wrapper"></div>
            </div>
        </div>

        <div class="TP094-Top-Categories-Wrapper">
          <p class="TP094-Top-Categories-Header">Top Categories</p>

          <div class="TP094-Top-Category-Block-First">

            <div class="TP094-Top-Category-Large">
              <a class="TP094-Category-Building-Materials-Link" href="/Product/Building-Materials/c/1500029">
                <img class="TP094-Top-Category-Building-Materials-Image" src="http://sb.monetate.net/img/1/581/1815728.png" alt="Building Materials" />
                <span class="TP094-Top-Category-Builing-Materials-Text">Building Materials</span>
              </a>
            </div>

            <div class="TP094-Top-Category-Small-Wrapper">

              <div class="TP094-Top-Category-Small-Container TP094-Timber">
                <a class="TP094-Small-Link TP094-Timber-Link" href="/Product/Timber/c/1500000">
                  <img class="TP094-Small-Image TP094-Timber-Image" src="//sb.monetate.net/img/1/581/1557615.png" alt="Timber" />
                  <span class="TP094-Small-Text TP094-Timber-Text">Timber</span>
                </a>
              </div>

              <div class="TP094-Top-Category-Small-Container TP094-Kitchens">
                <a class="TP094-Small-Link TP094-Kitchens-Link" href="/Product/Kitchens/c/1509005">
                  <img class="TP094-Small-Image TP094-Kitchens-Image" src="//sb.monetate.net/img/1/581/1557614.png" alt="Kitchens" />
                  <span class="TP094-Small-Text TP094-Kitchens-Text">Kitchens</span>
                </a>
              </div>

              <div class="TP094-Top-Category-Small-Container TP094-Doors-Windows-Joinery">
                <a class="TP094-Small-Link TP094-Doors-Windows-Joinery-Link" href="/Product/Doors%2C-Windows+Joinery/c/1500152">
                  <img class="TP094-Small-Image TP094-Doors-Windows-Joinery-Image" src="//sb.monetate.net/img/1/581/1557609.png" alt="Doors, Windows & Joinery" />
                  <span class="TP094-Small-Text TP094-Doors-Windows-Joinery-Text">Doors, Windows & Joinery</span>
                </a>
              </div>

              <div class="TP094-Top-Category-Small-Container TP094-Tools-Workwear">
                <a class="TP094-Small-Link TP094-Tools-Workwear-Link" href="/Product/Tools+Workwear/c/1500450">
                  <img class="TP094-Small-Image TP094-Tools-Workwear-Image" src="//sb.monetate.net/img/1/581/1571068.png" alt="Tools & Workwear" />
                  <span class="TP094-Small-Text TP094-Tools-Workwear-Text">Tools & Workwear</span>
                </a>
              </div>
              

            </div>
          </div>


          <div class="TP094-Category-Block-Second TP094-Category-Hide">
            <div class="TP094-Top-Category-Small-Wrapper">

            <div class="TP094-Top-Category-Small-Container TP094-Gardens-Landscaping">
                <a class="TP094-Small-Link TP094-Gardens-Landscaping-Link" href="/Product/Gardens+Landscaping/c/1500098">
                  <img class="TP094-Small-Image TP094-Gardens-Landscaping-Image" src="//sb.monetate.net/img/1/581/1557612.png" alt="Gardens & Landscaping" />
                  <span class="TP094-Small-Text TP094-Gardens-Landscaping-Text">Gardens & Landscaping</span>
                </a>
              </div>
              

              <div class="TP094-Top-Category-Small-Container TP094-Plumbing-Heating">
                <a class="TP094-Small-Link TP094-Plumbing-Heating-Link" href="/Product/Plumbing+Heating/c/1500282">
                  <img class="TP094-Small-Image TP094-Plumbing-Heating-Image" src="//sb.monetate.net/img/1/581/1573348.png" alt="Plumbing & Heating" />
                  <span class="TP094-Small-Text TP094-Plumbing-Heating-Text">Plumbing & Heating</span>
                </a>
              </div>

              <div class="TP094-Top-Category-Small-Container TP094-Bathrooms">
                <a class="TP094-Small-Link TP094-Bathrooms-Link" href="/Product/Bathrooms/c/1500376">
                  <img class="TP094-Small-Image TP094-Bathrooms-Image" src="//sb.monetate.net/img/1/581/1571058.png" alt="Bathrooms" />
                  <span class="TP094-Small-Text TP094-Bathrooms-Text">Bathrooms</span>
                </a>
              </div>


              <div class="TP094-Top-Category-Small-Container TP094-Decorating-Interiors">
                <a class="TP094-Small-Link TP094-Decorating-Interiors-Link" href="/Product/Decorating+Interiors/c/1500538">
                  <img class="TP094-Small-Image TP094-Decorating-Interiors-Image" src="//sb.monetate.net/img/1/581/1571061.png" alt="Decorating & Interiors" />
                  <span class="TP094-Small-Text TP094-Decorating-Interiors-Text">Decorating & Interiors</span>
                </a>
              </div>

            </div>
          </div>


          <div class="TP094-Category-Block-Third TP094-Category-Hide">
            <div class="TP094-Top-Category-Small-Wrapper">

            <div class="TP094-Top-Category-Small-Container TP094-Fixings-Adhesives">
              <a class="TP094-Small-Link TP094-Fixings-Adhesives-Link" href="/Product/Fixings+Adhesives/c/1500237">
                <img class="TP094-Small-Image TP094-Fixings-Adhesives-Image" src="//sb.monetate.net/img/1/581/1571064.png" alt="Fixings & Adhesives" />
                <span class="TP094-Small-Text TP094-Fixings-Adhesives-Text">Fixings & Adhesives</span>
              </a>
            </div>

            <div class="TP094-Top-Category-Small-Container TP094-Electrical-Lighting">
              <a class="TP094-Small-Link TP094-Electrical-Lighting-Link" href="/Product/Electrical+Lighting/c/1500571">
                <img class="TP094-Small-Image TP094-Electrical-Lighting-Image" src="//sb.monetate.net/img/1/581/1571063.png" alt="Electrical & Lighting" />
                <span class="TP094-Small-Text TP094-Electrical-Lighting-Text">Electrical & Lighting</span>
              </a>
            </div>

            <div class="TP094-Top-Category-Small-Container TP094-Tool-Hire">
              <a class="TP094-Small-Link TP094-Tool-Hire-Link" href="/Product/Tool-Hire/c/1571000">
                <img class="TP094-Small-Image TP094-Tool-Hire-Image" src="//sb.monetate.net/img/1/581/1571065.png" alt="Tool Hire" />
                <span class="TP094-Small-Text TP094-Tool-Hire-Text">Tool Hire</span>
              </a>
            </div>

            </div>
          </div>


          <div class="TP094-Top-Categories-View-More-Wrapper">
            <span class="TP094-Top-Categories-View-More">View more categories...</span>
          </div>
        </div>

        <div class="TP094-Carousel-Wrapper">
        </div>

      </div>
      `);
      const dataRequestFailMarkup = (`
      <div class="TP094-Login-Form-Error">
        <span class="TP094-Error-Message">We were unable to request the login form, please click here to try again</span> 
      </div>
      `);
      // const locationIcon = (`
      // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/></svg>`);
      const USPBar = bodyVar.querySelector('.yCmsContentSlot.header_buttons');
      const miniCart = bodyVar.querySelector('.tpMiniCart');
      const topLinks = bodyVar.querySelector('.tpHeaderLinks');
      const navigationBranch = bodyVar.querySelectorAll('#header > .tpHeaderContent_holder .nav > li > .button_image');
      const whCarousel = bodyVar.querySelector('.mt_endcap.mt_horizontal');
      let showOffers;
      let tradeAccount;
      let topContainer;
      let moreCategories;
      let categoriesTwo;
      let categoriesThree;
      let offersContainer;
      let tradeAreaContainer;
      let loginFormContainer;
      return {
        bodyVar,
        TP094Markup,
        USPBar,
        miniCart,
        topLinks,
        showOffers,
        tradeAccount,
        topContainer,
        moreCategories,
        categoriesThree,
        categoriesTwo,
        offersContainer,
        tradeAreaContainer,
        loginFormContainer,
        dataRequestFailMarkup,
        navigationBranch,
        // locationIcon,
        whCarousel,
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
      components.setupFunctions();
      // const hide = document.getElementById('TP094_flickerPrevention');
      // hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        Exp.cache.bodyVar.classList.add(Exp.settings.ID);
        // Add markup
        Exp.cache.USPBar.insertAdjacentHTML('afterend', Exp.cache.TP094Markup);
        // Exp.cache.topLinks.insertAdjacentElement('afterbegin', Exp.cache.miniCart);
        // Move What's hot carousel if it exists
        if (Exp.cache.whCarousel) {
          Exp.cache.bodyVar.querySelector('.TP094-Carousel-Wrapper').insertAdjacentElement('afterbegin', Exp.cache.whCarousel);
        }
        // Assign selectors for added elements
        Exp.cache.showOffers = $('.TP094-Show-Offers-Button');
        Exp.cache.topContainer = $('.TP094-Offers-Trade-container');
        Exp.cache.moreCategories = $('.TP094-Top-Categories-View-More');
        Exp.cache.categoriesTwo = $('.TP094-Category-Block-Second');
        Exp.cache.categoriesThree = $('.TP094-Category-Block-Third');
        Exp.cache.offersContainer = $('.TP094-Top-Offers-Wrapper');
        Exp.cache.tradeAreaContainer = $('.TP094-Trade-Account-Area-Wrapper');
        Exp.cache.loginFormContainer = Exp.cache.bodyVar.querySelector('.TP094-Login-Form-Wrapper');
        // Login check - Different markup rendered and trade account functionality added
        if (Exp.cache.bodyVar.querySelector('ul.nav > li >  div.button_text > a').textContent.trim().toUpperCase().indexOf('LOG IN / REGISTER') > -1) {
          // Insert locator icon
          // Exp.cache.navigationBranch[1].insertAdjacentHTML('afterbegin', Exp.cache.locationIcon);
          // Exp.cache.navigationBranch[1].classList.add('TP094-Location-Icon');
          // User logged out, request login form
          this.requestLogin();
          // Client amend to logged in trade account area - render initial functionality
          Exp.cache.showOffers[0].insertAdjacentHTML('afterend', `
            <span class="TP094-Trade-Account-Area-Button">Trade Account Area</span>
          `);
          // Assign selector
          Exp.cache.tradeAccount = $('.TP094-Trade-Account-Area-Button');
          // Add functionality to trade account button
          this.tradeAccountLoggedOut();
        } else {
          // User is logged in
          // Amends made - Render link to account dashboard
          Exp.cache.showOffers[0].insertAdjacentHTML('afterend', `
            <a class="TP094-Trade-Account-Area-Button TP094-View-Account-Link" href="/accountDashboard">View Account</a>
          `);
          // Assign selector
          Exp.cache.tradeAccount = $('.TP094-Trade-Account-Area-Button');
          // Insert locator icon
          // Exp.cache.navigationBranch[0].insertAdjacentHTML('afterbegin', Exp.cache.locationIcon);
          // Exp.cache.navigationBranch[0].classList.add('TP094-Location-Icon');
          // Take their name and remove the word "Welcome"
          // Next line exceeds length
          // eslint-disable-next-line
          // let userName = Exp.cache.bodyVar.querySelector('ul.nav > li >  div.button_text > a').textContent.trim();
          // userName = userName.replace(/Welcome /g, '');
          // Exp.cache.loginFormContainer.insertAdjacentHTML('afterbegin', `
          // <div class="TP094-Logged-In-User-Wrapper">
          //   <a class="TP094-View-Account-Button" href="/accountDashboard">View Account</a>
          // </div>
          // `);
          // Adds funcitonality to trade account link when logged in
          this.tradeAccountLoggedIn();
        }
      },
      setupFunctions() {
        // Offers Button Functionality
        Exp.cache.showOffers.on('click', () => {
          events.send('TP094', 'Click', 'Show Offers', { sendOnce: true });
          // Check if section is visible, hide if it is visible, show if not visible
          if (!Exp.cache.offersContainer.is(':visible')) {
            // Remove button class to change visuals if it exists
            if (Exp.cache.showOffers.hasClass('TP094-Fade-Out')) {
              Exp.cache.showOffers.toggleClass('TP094-Fade-Out');
            }
            // Slide up container and change other button's visuals
            Exp.cache.tradeAreaContainer.slideUp();
            Exp.cache.tradeAccount.toggleClass('TP094-Fade-Out');
            Exp.cache.offersContainer.slideDown();
            document.querySelector('.TP094-Top-Offers-View-More-Wrapper').style.display = 'block';
          } else {
            // Reset style of other button
            Exp.cache.offersContainer.slideUp();
            if (Exp.cache.tradeAccount.hasClass('TP094-Fade-Out')) {
              Exp.cache.tradeAccount.toggleClass('TP094-Fade-Out');
            }
            document.querySelector('.TP094-Top-Offers-View-More-Wrapper').style.display = 'none';
          }
        });
        // More Categories Button
        Exp.cache.moreCategories.on('click', () => {
          // Reveal more categories on link click, when all categories are visible hide link
          if (!Exp.cache.categoriesTwo.is(':visible')) {
            // Tracking view more categories
            events.send('TP094', 'Click', 'More Categories', { sendOnce: true });
            Exp.cache.categoriesTwo.slideDown();
          } else {
            // Track second click of view more category
            events.send('TP094', 'Click', 'All Categories Visible', { sendOnce: true });
            Exp.cache.categoriesThree.slideDown();
            Exp.cache.bodyVar.querySelector('.TP094-Top-Categories-View-More-Wrapper').classList.add('TP094-Hide-More-Categories-Link');
          }
        });
        // Build tracking
        this.setupTracking();
      },
      tradeAccountLoggedOut() {
        // Trade Account Functionality - Same as above but for trade account button
        Exp.cache.tradeAccount.on('click', () => {
          events.send('TP094', 'Click', 'Trade Account Area', { sendOnce: true });
          if (!Exp.cache.tradeAreaContainer.is(':visible')) {
            if (Exp.cache.tradeAccount.hasClass('TP094-Fade-Out')) {
              Exp.cache.tradeAccount.toggleClass('TP094-Fade-Out');
            }
            Exp.cache.offersContainer.slideUp();
            Exp.cache.showOffers.toggleClass('TP094-Fade-Out');
            Exp.cache.tradeAreaContainer.slideDown();
          } else {
            Exp.cache.tradeAreaContainer.slideUp();
            if (Exp.cache.showOffers.hasClass('TP094-Fade-Out')) {
              Exp.cache.showOffers.toggleClass('TP094-Fade-Out');
            }
          }
        });
      },
      tradeAccountLoggedIn() {
        // send event when loggedin and clicked trade account area
        Exp.cache.tradeAccount.on('click', () => {
          events.send('TP094', 'Click', 'View Account', { sendOnce: true });
        });
      },
      requestLogin() {
        const loginRequest = new XMLHttpRequest();
        loginRequest.open('GET', '/login');
        loginRequest.onload = () => {
          if (loginRequest.status === 200) {
            // Create a div to query and store the login form
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = loginRequest.responseText;
            const requestedForm = tempDiv.querySelector('#autorizationForm');
            // If login form exists add it
            if (requestedForm != null) {
              Exp.cache.loginFormContainer.insertAdjacentElement('afterbegin', requestedForm);
              // Add text "Register" above register section of form
              Exp.cache.loginFormContainer.querySelector('#autorizationForm > .yCmsComponent.description_message > .registration-info > h2').textContent = 'Register';
              // Tracking login and register buttons
              Exp.cache.bodyVar.querySelector('#loginForm > .bottom-content  .login_button').addEventListener('click', () => {
                events.send('TP094', 'Click', 'Login', { sendOnce: true });
              });
              Exp.cache.bodyVar.querySelector('#registerAccountLink > a').addEventListener('click', () => {
                events.send('TP094', 'Click', 'Register', { sendOnce: true });
              });
            }
          } else {
            // Add error message on AJAX fail
            Exp.cache.loginFormContainer.insertAdjacentHTML('afterbegin', Exp.cache.dataRequestFailMarkup);
            // Send data request again on click
            Exp.cache.bodyVar.querySelector('.TP094-Error-Message').addEventListener('click', () => {
              Exp.cache.tradeAreaContainer.slideUp();
              // Remove error message and make request again
              $(Exp.cache.bodyVar.querySelector('.TP094-Login-Form-Error')).remove();
              this.requestLogin();
              Exp.cache.tradeAreaContainer.slideDown();
            });
          }
          loginRequest.onerror = () => {
            // Add error message on AJAX fail
            Exp.cache.loginFormContainer.insertAdjacentHTML('afterbegin', Exp.cache.dataRequestFailMarkup);
            // Send data request again on click
            Exp.cache.bodyVar.querySelector('.TP094-Error-Message').addEventListener('click', () => {
              Exp.cache.tradeAreaContainer.slideUp();
              // Remove error message and make request again
              $(Exp.cache.bodyVar.querySelector('.TP094-Login-Form-Error')).remove();
              this.requestLogin();
              Exp.cache.tradeAreaContainer.slideDown();
            });
          };
        };
        loginRequest.send();
      },
      setupTracking() {
        // Add tracking to elements on page
        // Menu click and hover
        $('#categories-menu-item').hover(() => {
          events.send('TP094', 'Hover', 'Menu', { sendOnce: true });
        });
        $('#categories-menu-item').click(() => {
          events.send('TP094', 'Click', 'Menu', { sendOnce: true });
        });
        // Nav click and hover
        $('#alphabetical-list').hover(() => {
          events.send('TP094', 'Hover', 'Navigation', { sendOnce: true });
        });
        $('#alphabetical-list').click(() => {
          events.send('TP094', 'Click', 'Navigation', { sendOnce: true });
        });
        // Search use
        $('.siteSearch.search > form').submit(() => {
          events.send('TP094', 'Search', 'Search Submitted', { sendOnce: true });
        });
        // View more offers
        Exp.cache.bodyVar.querySelector('.TP094-Top-Offers-View-More').addEventListener('click', () => {
          events.send('TP094', 'Click', 'View More Offers Link', { sendOnce: true });
        });
        // Top offers
        $('.TP094-Top-Offers-Link').click((e) => {
          const TP094OfferTracking = $(e.target).text().trim();
          events.send('TP094', 'Click', `View More Offers: ${TP094OfferTracking}`, { sendOnce: true });
        });
        // Categories
        // Large category
        Exp.cache.bodyVar.querySelector('a.TP094-Category-Building-Materials-Link').addEventListener('click', () => {
          events.send('TP094', 'Click', 'Category: Building-Materials', { sendOnce: true });
        });
        // Smaller Categories
        $('.TP094-Small-Link').click((e) => {
          const TP094SmallCategoryTracking = $(e.target).closest('.TP094-Small-Link').find('.TP094-Small-Text').text()
            .trim();
          events.send('TP094', 'Click', `Category: ${TP094SmallCategoryTracking}`, { sendOnce: true });
        });
      },
    },
  };
  if (!document.querySelector('.TP094-Wrapper')) {
    Exp.init();
  }
};

export default run;
