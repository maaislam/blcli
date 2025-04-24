import { setup } from './services';
import settings from './settings';
import { events } from '../../../../../lib/utils';

/**
 * {{GD029}} - {{Second Pair in Basket}}
 */

const basketPage = () => {
  const $ = window.jQuery;
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      // Product with the promotion
      const eligibleProduct = bodyVar.querySelector('.something-free').parentNode;
      // Add styling class to eligible product
      eligibleProduct.classList.add('GD029_Eligible_Product');
      const completePurchaseButton = docVar.getElementById('action-basket-purchase');
      // Used to target the correct product in network requests
      const productCount = bodyVar.querySelectorAll('.basket-product').length + 1;
      const CSRFToken = eligibleProduct.querySelector('input[name="csrfmiddlewaretoken"]').value;
      let visionType = eligibleProduct.querySelector('.product-detail--vision .detail-value').textContent.trim();
      if (visionType.toUpperCase() === 'VARIFOCAL ADVANCED') {
        visionType = 'Varifocal&vision_subtype_name=Advanced';
      } else if (visionType.toUpperCase() === 'VARIFOCAL ELITE HD') {
        visionType = 'Varifocal&vision_subtype_name=Elite+HD';
      }
      // Data structure, [0] = data to send, [1] = Route
      // Prescription defaults to send later, precaution for error retrieveing prescription data
      const POSTRequestData = {
        SKU: [`csrfmiddlewaretoken=${CSRFToken}&sku=`, 'https://www.glassesdirect.co.uk/basket/add/'],
        Vision: [`csrfmiddlewaretoken=${CSRFToken}&vision_type_name=${visionType}`, `https://www.glassesdirect.co.uk/basket/personalise/${productCount}/vision/`],
        Tint: [`csrfmiddlewaretoken=${CSRFToken}&tint_slug=`, `https://www.glassesdirect.co.uk/basket/personalise/${productCount}/tint/`],
        Package: [`csrfmiddlewaretoken=${CSRFToken}&lens_package_group=`, `https://www.glassesdirect.co.uk/basket/personalise/${productCount}/lens-package/`],
        Prescription: [`csrfmiddlewaretoken=${CSRFToken}&form_name=send_prescription_later`, `https://www.glassesdirect.co.uk/basket/personalise/${productCount}/prescription/`],
      };
      // Stores product data for carousel
      const productData = [];
      // Reassigned when markup has rendered
      let continueTop;
      let modalImage;
      let modalProductName;
      let modalProgressContainer;
      return {
        docVar,
        bodyVar,
        eligibleProduct,
        completePurchaseButton,
        continueTop,
        POSTRequestData,
        modalImage,
        modalProductName,
        CSRFToken,
        modalProgressContainer,
        productData,
      };
    })(),
    init: () => {
      setup();
      // Attempt to get products
      Exp.services.getProducts();
    },
    services: {
      /**
       * @desc Retrieves products from the 2 for 1 page
       * on unsuccesful request, test does not activate
       */
      getProducts: () => {
        const productRequest = new XMLHttpRequest();
        productRequest.open('GET', 'https://www.glassesdirect.co.uk/popular/2-for-1-from-49+2-for-1-designer/?page=1&sort=demand-desc&rows=30&aspect=front', true);
        productRequest.onload = () => {
          if (productRequest.status >= 200 && productRequest.status < 400) {
            const div = document.createElement('div');
            div.insertAdjacentHTML('afterbegin', productRequest.responseText);
            // Check for products and details - at least 6 of each should exist
            const allProducts = div.querySelectorAll('li.product');
            const allProductImages = div.querySelectorAll('li.product .product-image');
            const allProductBrand = div.querySelectorAll('li.product .brand-name');
            const allProductNames = div.querySelectorAll('li.product .name');
            const allProductLinks = div.querySelectorAll('li.product .product-link');
            // Next line exceeds length
            // eslint-disable-next-line
            if (allProducts.length > 6 && allProductImages.length > 6 && allProductBrand.length > 6 && allProductNames.length > 6 && allProductLinks.length > 6) {
              // Enough details exist, cache object
              for (let i = 0; i < 6; i += 1) {
                const currentProduct = {
                  sku: allProducts[i].getAttribute('data-sku'),
                  img: allProductImages[i].getAttribute('src'),
                  alt: allProductImages[i].getAttribute('alt'),
                  name: `${allProductBrand[i].textContent.trim()} ${allProductNames[i].textContent.trim()}`,
                  href: allProductLinks[i].getAttribute('href'),
                };
                Exp.cache.productData.push(currentProduct);
              }
              // Data ready start test
              // Populate request object
              Exp.services.createRequestObject();
              // Render test
              Exp.render.renderController();
            }
          }
        };
        productRequest.send();
      },
      /**
       * @desc Formats the product details to match form data:
       * Remove any characters between and including brackets
       * Replace all spaces with hyphens
       * Convert to lower case
       * @param {String} inputTextValue - Expects a string
       * @returns {String} - Returns a formatted string
       */
      parseProductDetail: (inputTextValue) => {
        const tempDetail = inputTextValue.replace(/ *\([^)]*\) */g, '').replace(/\s/g, '-');
        return tempDetail.toLowerCase();
      },
      /**
       * @desc Appends data to the relevant sections of the POSTRequestData object in the cache
       */
      createRequestObject() {
        // Replace any instance of 'tint ' with nothing
        const tintType = Exp.cache.eligibleProduct.querySelector('.product-detail--tint .detail-value').textContent.trim().replace(/tint /gi, '');
        // If BlueReflect is selected, append blue-reflect
        if (tintType.toUpperCase() === 'BLUEREFLECT') {
          Exp.cache.POSTRequestData.Tint[0] += 'blue-reflect';
          // else if other option then parse tint type, no additional data sent with No tints option
        } else if (tintType.toUpperCase() !== 'NO TINTS') {
          Exp.cache.POSTRequestData.Tint[0] += this.parseProductDetail(tintType);
        }
        // Package type
        // If package type is not budget then parse the option data
        const packageOption = Exp.cache.eligibleProduct.querySelector('.product-detail--package .detail-value').textContent.trim();
        if (packageOption.toUpperCase() === 'BUDGET') {
          Exp.cache.POSTRequestData.Package[0] += 'basic';
        } else {
          Exp.cache.POSTRequestData.Package[0] += this.parseProductDetail(packageOption);
        }
        // If prescription data does not contain 'send it later', request data
        // No need to update as defaulted to 'send it later' in POSTRequestData object
        const prescriptionOption = Exp.cache.eligibleProduct.querySelector('.product-detail--prescription .detail-value').textContent.trim().toUpperCase();
        if (prescriptionOption.indexOf('SEND IT LATER') === -1) {
          // Request prescription information
          this.getPrescriptionData();
        }
      },
      /**
       * @desc Makes a request to the prescription page of the product elible for the free pair
       * Finds the prescription with the button text 'Selected'
       * Retrieves the prescription value and overwrite prescription data in POSTRequestData object
       */
      getPrescriptionData() {
        const prescriptionRequest = new XMLHttpRequest();
        prescriptionRequest.open('GET', `https://www.glassesdirect.co.uk/basket/personalise/${Exp.cache.eligibleProduct.getAttribute('data-item-id')}/prescription/`, true);
        prescriptionRequest.onload = () => {
          if (prescriptionRequest.status >= 200 && prescriptionRequest.status < 400) {
            const div = document.createElement('div');
            div.insertAdjacentHTML('afterbegin', prescriptionRequest.responseText);
            const allSavedPrescriptionButtons = div.querySelectorAll('.action-select.btn.btn-action');
            // Iterate over all prescription buttons to find the selected prescription
            let retrievedPrescription;
            // Retrieve prescription ID from parentNode
            for (let i = 0, n = allSavedPrescriptionButtons.length; i < n; i += 1) {
              const currentText = allSavedPrescriptionButtons[i].textContent.trim().toUpperCase();
              if (currentText === 'SELECTED') {
                retrievedPrescription = allSavedPrescriptionButtons[i].parentNode.getAttribute('data-prescription-id');
                // Overwrite prescription data
                Exp.cache.POSTRequestData.Prescription[0] = `csrfmiddlewaretoken=${Exp.cache.CSRFToken}&prescription=${retrievedPrescription}&form_name=personalise_prescription`;
                break;
              }
            }
          }
        };
        prescriptionRequest.send();
      },
    },
    render: {
      /**
       * @desc Controls the rendering of markup
       */
      renderController() {
        // Render markup
        this.markup();
        // Render carousel of products
        if ($.fn.slick) {
          this.productCarousel();
        } else {
          $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', this.productCarousel);
        }
        // Insert a modal to display when adding second pair
        this.requestModal();
      },
      markup() {
        // Copy ClassList of 'Complete Purchase Button'
        const continueClassList = Exp.cache.completePurchaseButton.classList.value;
        // Under the page header - 'Complete Purchase' button
        const renderLocationCP = Exp.cache.bodyVar.querySelector('#content > .page-heading');
        renderLocationCP.insertAdjacentHTML('afterend', `
          <span class="GD029_CP_Button ${continueClassList}">Complete Purchase</span>
        `);
        Exp.cache.continueTop = Exp.cache.bodyVar.querySelector('.GD029_CP_Button');
        // After prescription type of eligible product, insert button to add the extact same pair
        const renderLocationAP = Exp.cache.eligibleProduct.querySelector('.cf > .product-details');
        const productName = Exp.cache.eligibleProduct.querySelector('.cf .product-name').textContent;
        renderLocationAP.insertAdjacentHTML('beforeend', `
          <div class="GD029_BP_Container">
            <span class="GD029_BP_Name">Why not get ${productName} as a back-up pair?</span>
            <span class="GD029_BP_Add_Button btn-flat btn-inverse">+ Add free pair</span>
          </div>
        `);
        // Reminder before sub total - only if a promotion hasn't been redeemed
        if (!Exp.cache.bodyVar.querySelector('.visible-promotion')) {
          const renderLocationST = Exp.cache.docVar.getElementById('basket-subtotal');
          renderLocationST.insertAdjacentHTML('beforebegin', `
            <div class="GD029_ST_Container">
              <a class="GD029_ST_Reminder" href="/price/49:119/?page=1&sort=demand-desc&rows=30&aspect=sun">Don't forget to claim your <span class="GD029_RP_Additional_Styling">free pair</span></a>
            </div>
          `);
          // Track offer reminder link
          Exp.cache.bodyVar.querySelector('.GD029_ST_Reminder').addEventListener('click', () => {
            events.send(`${settings.ID} - ${settings.VARIATION}`, 'Clicked', 'Incomplete Offer Reminder', { sendOnce: true });
          });
        }
        // Full width sticky bar
        Exp.cache.docVar.getElementById('content').insertAdjacentHTML('afterend', `
          <div class="GD029_Checkout_Container">
            <span class="GD029_Sticky_Checkout_Button ${continueClassList}">Proceed to checkout</span>
          </div>
        `);
        // Add event listener to window to control display of sticky bar
        Exp.bindExperimentEvents.stickyScroll();
        // Add event listener to sticky bar
        Exp.cache.bodyVar.querySelector('.GD029_Sticky_Checkout_Button').addEventListener('click', () => {
          // Send event
          events.send(`${settings.ID} - ${settings.VARIATION}`, 'Clicked', 'Proceed to Checkout Sticky', { sendOnce: true });
          // Click existing 'Complete Purchase' button
          Exp.cache.completePurchaseButton.click();
        });
        // Add event listener to top complete purchase
        Exp.cache.continueTop.addEventListener('click', () => {
          // Send event
          events.send(`${settings.ID} - ${settings.VARIATION}`, 'Clicked', 'Complete Purchase Top', { sendOnce: true });
          // Click existing 'Complete Purchase' button
          Exp.cache.completePurchaseButton.click();
        });
        // Add event listener to add the exact same pair to bag
        Exp.cache.bodyVar.querySelector('.GD029_BP_Add_Button').addEventListener('click', () => {
          events.send(`${settings.ID} - ${settings.VARIATION}`, 'Clicked', 'Add Free Pair', { sendOnce: true });
          // Open modal
          Exp.cache.bodyVar.classList.add('GD029_Modal_Display');
          // Append the SKU of the eligible product to POSTRequestData
          Exp.cache.POSTRequestData.SKU[0] += Exp.cache.eligibleProduct.getAttribute('data-sku');
          // Start requests
          Exp.handleSecondProduct.addToBasketPOST();
        });
      },
      productCarousel() {
        // Insert Container
        Exp.cache.eligibleProduct.insertAdjacentHTML('afterend', `
          <div class="GD029_RP_Container">
            <span class="GD029_RP_Header"><span class="GD029_RP_Additional_Styling">Last chance!</span> One-click to add your free pair</span>
              <section class="landing_wrap GD029_RP_Carousel">
              <div class="GD029_Slider_Wrap">
              </div>
              <div class="GD029_View_All_Container">
                <a href="/price/49:119/?page=1&sort=demand-desc&rows=30&aspect=sun" class="GD029_View_All_Button btn-flat btn-inverse">View all frames</a>
              </div>
            </section>
          </div>
        `);
        const GD029SlickParent = Exp.cache.bodyVar.querySelector('.GD029_RP_Carousel > .GD029_Slider_Wrap');
        for (let i = 0, n = Exp.cache.productData.length; i < n; i += 1) {
          GD029SlickParent.insertAdjacentHTML('beforeend', `
            <div class="GD029_Carousel_Product">
              <a class="GD029_Link" href="${Exp.cache.productData[i].href}">
                <span class="GD029_Carousel_Name">${Exp.cache.productData[i].name}</span>
                <img class="GD029_Carousel_Image" src="${Exp.cache.productData[i].img}" alt="${Exp.cache.productData[i].alt}" />
              </a>
              <span class="GD029_Carousel_Add btn-flat btn-inverse" data-gd029-sku="${Exp.cache.productData[i].sku}">+ Add free pair</span>
            </div>
          `);
        }
        GD029SlickParent.classList.add('GD029_landing_slider');
        const GD029SlickParentJQ = $('.GD029_RP_Carousel > .GD029_Slider_Wrap');
        // If on mobile display 1 slide, else 4 slides
        let nSlides = 4;
        if (window.mobileSite) {
          nSlides = 1;
        }
        // Configure slick
        GD029SlickParentJQ.slick({
          dots: false,
          autoplay: false,
          slidesToShow: nSlides,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
          infinite: false,
          arrows: true,
        });
        // Change slick arrows, content from website slick sliders
        GD029SlickParent.querySelector('.slick-prev.slick-arrow').textContent = '❮';
        GD029SlickParent.querySelector('.slick-next.slick-arrow').textContent = '❯';
        // Add event listener for 'Add free pair' buttons in the carousel
        GD029SlickParent.querySelector('.slick-track').addEventListener('click', (e) => {
          // If the element clicked is an add button, determined by classList, start requests
          if (e.target.classList.contains('GD029_Carousel_Add')) {
            // Send event
            events.send(`${settings.ID} - ${settings.VARIATION}`, 'Clicked', 'Add Free Pair', { sendOnce: true });
            // Open modal and update data to display, by default display eligible product data
            const productContainer = e.target.parentNode;
            // Update modal image and text
            const productImage = productContainer.querySelector('.GD029_Carousel_Image');
            Exp.cache.modalProductName.textContent = productContainer.querySelector('.GD029_Carousel_Name').textContent;
            Exp.cache.bodyVar.classList.add('GD029_Modal_Display');
            Exp.cache.modalImage.setAttribute('src', productImage.getAttribute('src'));
            Exp.cache.modalImage.setAttribute('alt', productImage.getAttribute('alt'));
            // Add product SKU to requests data
            Exp.cache.POSTRequestData.SKU[0] += e.target.getAttribute('data-gd029-sku');
            // Start post requests
            Exp.handleSecondProduct.addToBasketPOST();
          }
        });
      },
      /**
       * @desc Render a modal to display to the user whilst the second product is added to basket
       * Add modal as document body last child
       */
      requestModal() {
        // Insert temporary data for modal using eligible product
        const tempName = Exp.cache.eligibleProduct.querySelector('.product-name').textContent;
        Exp.cache.bodyVar.insertAdjacentHTML('beforeend', `
          <div class="GD029_pop_up_modal">
            <div class="GD029_Inner_Container">
              <div class="GD029_Modal_Overflow_Fix">
                <h2 class="GD029_Modal_Header">Adding <span class="GD029_Modal_Product_Name">${tempName}</span> to your basket</h2>
                  <div class="GD029_Modal_Loading_Bar_Container">
                    <span class="GD029_Modal_Progress_Bar"></span>
                  </div>
                  <img class="GD029_Modal_Image" src="${Exp.cache.eligibleProduct.querySelector('.product-image').getAttribute('src')}" alt="${tempName}" />
              </div>
            </div>
          </div>
          `);
        // Store References if a related product is added to basket, modal can be updated
        Exp.cache.modalImage = Exp.cache.bodyVar.querySelector('.GD029_Modal_Image');
        Exp.cache.modalProductName = Exp.cache.bodyVar.querySelector('.GD029_Modal_Product_Name');
        Exp.cache.modalProgress = Exp.cache.bodyVar.querySelector('.GD029_Modal_Progress_Bar');
      },
    },
    bindExperimentEvents: {
      /**
       * @desc Add a scroll event listener to the window
       * Controls when the sticky add to bag should reveal
       * Reveal parameters:
       * When the window top is has passed the bottom of the top 'Complete Purchase' button
       * And window bottom has not passed the container of the bottom 'Complete Purchase' button
       * Toggles styling class to enable revealing or hiding sticky bar
       */
      stickyScroll() {
        // Store references
        const doc = Exp.cache.docVar.documentElement;
        const basketBottomElement = Exp.cache.docVar.getElementById('basket-actions');
        window.addEventListener('scroll', () => {
          // Calculate window top and bottom
          const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
          const bottom = window.scrollY + window.innerHeight;
          // Next line exceeds length
          // eslint-disable-next-line
          if ((top > Exp.cache.continueTop.offsetTop) && (basketBottomElement.offsetTop > bottom)){
            Exp.cache.bodyVar.classList.add('GD029_Sticky');
          } else {
            Exp.cache.bodyVar.classList.remove('GD029_Sticky');
          }
        });
      },
    },
    handleSecondProduct: {
      /* The following: addToBasketPOST, addVisionPOST, addTintPOST, addPackagePOST and
      * addPrescriptionPOST, sends arguments to POSTHandler, after updating modal progress bar
      * arguments passed are the route for posting, data to POST and a
      * function: either the next step in the lens flow or function to end request
      */
      // Add the product to the basket
      addToBasketPOST() {
        // Next line exceeds length
        // eslint-disable-next-line
        Exp.handleSecondProduct.POSTHandler(Exp.cache.POSTRequestData.SKU[1], Exp.cache.POSTRequestData.SKU[0], Exp.handleSecondProduct.addVisionPOST);
      },
      // Send vision type
      addVisionPOST() {
        Exp.cache.modalProgress.style.width = '20%';
        // Next line exceeds length
        // eslint-disable-next-line
        Exp.handleSecondProduct.POSTHandler(Exp.cache.POSTRequestData.Vision[1], Exp.cache.POSTRequestData.Vision[0], Exp.handleSecondProduct.addTintPOST);
      },
      // send lens category
      addTintPOST() {
        Exp.cache.modalProgress.style.width = '40%';
        // Next line exceeds length
        // eslint-disable-next-line
        Exp.handleSecondProduct.POSTHandler(Exp.cache.POSTRequestData.Tint[1], Exp.cache.POSTRequestData.Tint[0], Exp.handleSecondProduct.addPackagePOST);
      },
      // send lens package
      addPackagePOST() {
        Exp.cache.modalProgress.style.width = '60%';
        // Next line exceeds length
        // eslint-disable-next-line
        Exp.handleSecondProduct.POSTHandler(Exp.cache.POSTRequestData.Package[1], Exp.cache.POSTRequestData.Package[0], Exp.handleSecondProduct.addPrescriptionPOST);
      },
      // send prescription data
      addPrescriptionPOST() {
        Exp.cache.modalProgress.style.width = '80%';
        // Next line exceeds length
        // eslint-disable-next-line
        Exp.handleSecondProduct.POSTHandler(Exp.cache.POSTRequestData.Prescription[1], Exp.cache.POSTRequestData.Prescription[0], Exp.handleSecondProduct.endPOSTRequest);
      },
      /**
       * @desc Handles sending data to skip the lens flow, recieves the route to post the data to
       * and the data to post, on success of the post request execute callBack which is either
       * a function call that calls POSTHandler with the details for the next step in the lens flow
       * or to end the request which reloads the page, on any error reload the page as the product
       * should be in the basket as first call to POSTHandler is to add to basket
       * @param {String} postRoute Route of the form where the data is sent
       * @param {String} postData Data to post to the route
       * @param {Function} callBack function to execute on success of POST request
       */
      POSTHandler(postRoute, postData, callBack) {
        const postProductData = new XMLHttpRequest();
        postProductData.open('POST', postRoute, true);
        postProductData.onload = () => {
          if (postProductData.status >= 200 && postProductData.status < 400) {
            // Request successful, execute call back
            callBack();
          } else {
            // Request unsuccessful, end requests
            Exp.handleSecondProduct.endPOSTRequest();
          }
        };
        postProductData.onerror = () => {
          // Error making request, end requests
          Exp.handleSecondProduct.endPOSTRequest();
        };
        postProductData.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        postProductData.send(postData);
      },
      endPOSTRequest() {
        // Set modal progress to 100%, refresh the page
        Exp.cache.modalProgress.style.width = '100%';
        window.location.reload();
      },
    },
  };

  Exp.init();
};

export default basketPage;
