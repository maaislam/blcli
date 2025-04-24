/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, logMessage, observePageChange } from '../../../../../lib/utils';
import { addPoller, addObserver, addEventListener } from './winstack';
import { h, render } from 'preact';
import BraSizes from './BraSizes';
import swiper from './swiper';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const tabsToAccordions = () => {

  let prodTabs = document.querySelector('.c-tabs');

  // set up the new accordion buttons

  addPoller(['.c-tabs', '.c-product-details__buttons-container'], () => {

    if(document.querySelector(`.${ID}-accordion-button`)) {

      let allAccordionButtons = document.querySelectorAll(`.${ID}-accordion-button`);
      [].slice.call(allAccordionButtons).forEach((button) => {
        button.remove();
      });

    }

    let buttonsDiv = document.querySelector('.c-product-details__buttons-container');
    let cTabs = document.querySelector('.c-tabs');

    cTabs.classList.add(`${ID}-accordion`);

    buttonsDiv.parentNode.insertBefore(cTabs, buttonsDiv.nextSibling);

    let description = document.getElementById('product-description');
    let prodDetails = document.getElementById('product-details');
    let prodDelivery = document.getElementById('delivery-and-returns');
    let sizingHelp = document.getElementById('sizing-help');

    let reviewsTab = description.cloneNode(true);
    reviewsTab.id = "reviews-tab";
    reviewsTab.innerHTML = "";
    cTabs.appendChild(reviewsTab);

    // let matchingStylesTab = description.cloneNode(true);
    // matchingStylesTab.id = "matchingstyles-tab";
    // matchingStylesTab.innerHTML = "";
    // cTabs.appendChild(matchingStylesTab);

    if (description) {
      description.classList.add(`${ID}-accordion-section`);
      description.insertAdjacentHTML('beforebegin', `
          <button class="${ID}-accordion-button" id="product-description-button"> 

            <span class="button-text">Product Description</span>
            <svg class="plus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect><rect width="32" height="200" x="88" rx="16"></rect></svg>
            <svg class="minus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect></svg>
          </button>
        `);
    }

    if (prodDetails) {
      prodDetails.classList.add(`${ID}-accordion-section`);
      prodDetails.insertAdjacentHTML('beforebegin', `
          <button class="${ID}-accordion-button" id="product-details-button"> 

            <span class="button-text">Product Details</span>
            <svg class="plus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect><rect width="32" height="200" x="88" rx="16"></rect></svg>
            <svg class="minus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect></svg>
          </button>
        `);
    }

    if (prodDelivery) {
      prodDelivery.classList.add(`${ID}-accordion-section`);
      prodDelivery.insertAdjacentHTML('beforebegin', `
          <button class="${ID}-accordion-button" id="product-delivery-button"> 

            <span class="button-text">Delivery &amp; Returns</span>
            <svg class="plus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect><rect width="32" height="200" x="88" rx="16"></rect></svg>
            <svg class="minus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect></svg>
          </button>
        `);
    }

    if (sizingHelp) {
      sizingHelp.classList.add(`${ID}-accordion-section`);
      sizingHelp.insertAdjacentHTML('beforebegin', `
          <button class="${ID}-accordion-button" id="product-sizing-button"> 

            <span class="button-text">Sizing Help</span>
            <svg class="plus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect><rect width="32" height="200" x="88" rx="16"></rect></svg>
            <svg class="minus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect></svg>
          </button>
        `);
    }

    if (reviewsTab) {
      reviewsTab.classList.add(`${ID}-accordion-section`);
      reviewsTab.insertAdjacentHTML('beforebegin', `
          <button class="${ID}-accordion-button" id="reviews-button"> 

            <span class="button-text">Reviews</span>
            <svg class="plus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect><rect width="32" height="200" x="88" rx="16"></rect></svg>
            <svg class="minus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect></svg>
          </button>
        `);
    }

    // if (matchingStylesTab) {
    //   matchingStylesTab.classList.add(`${ID}-accordion-section`);
    //   matchingStylesTab.insertAdjacentHTML('beforebegin', `
    //       <button class="${ID}-accordion-button" id="matching-styles-button"> 

    //         <span class="button-text">Matching Styles</span>
    //         <svg class="plus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect><rect width="32" height="200" x="88" rx="16"></rect></svg>
    //         <svg class="minus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect></svg>
    //       </button>
    //     `);
    // }

    addPoller(['#reviews'], () => {
      let reviews = document.getElementById('reviews');
      reviewsTab.appendChild(reviews);
    });
    
    // addPoller(['#accessories'], () => {
    //   let accessories = document.getElementById('accessories');
    //   matchingStylesTab.appendChild(accessories);
    // });

    // set a poller to listen for when the accordion buttons have been added
    // then add click events for each button

    addPoller([`.${ID}-accordion-button`], () => {

      let accordionButtons = document.querySelectorAll(`.${ID}-accordion-button`);
      let accSections = document.querySelectorAll(`.${ID}-accordion-section`);

      Array.from(accordionButtons).forEach((accButton) => {
        addEventListener(accButton, 'click', (e) => {
          e.preventDefault();
          let currNode = e.target.id;


          if (e.target.classList.contains('active')) {
            // if the classlist contains active, click is to close that accordion section
            Array.from(accordionButtons).forEach((accButton) => {
              accButton.classList.remove('active');
            });

            Array.from(accSections).forEach((accSection) => {
              accSection.classList.remove('active');
            });

          } else {
            // if the classlist doesn't contain active, click is to open that accordion & close all others
            Array.from(accordionButtons).forEach((accButton) => {
              accButton.classList.remove('active');
            });

            Array.from(accSections).forEach((accSection) => {
              accSection.classList.remove('active');
            });

            e.target.classList.add('active');
            if (currNode == "product-details-button") {
              prodDetails.classList.add('active');
            } else if (currNode == "product-delivery-button") {
              prodDelivery.classList.add('active');
            } else if (currNode == "product-sizing-button") {
              sizingHelp.classList.add('active');
            } else if (currNode == "product-description-button") {
              description.classList.add('active');
            } else if (currNode == "reviews-button") {
              reviewsTab.classList.add('active');
            } else if (currNode == "matching-styles-button") {
              matchingStylesTab.classList.add('active');
            }

          }

        });
      });


    });
  });



}

const productCallouts = (method) => {

  let currURL = window.location.href;
  let currProdName, currBrand, calloutProdData, calloutIcon;

  if(document.querySelector(`.${ID}-callout`)) {

    let allCallouts = document.querySelectorAll(`.${ID}-callout`);
    [].slice.call(allCallouts).forEach((callout) => {
      callout.remove();
    });

  }

  const prodData = [

    { url: "https://www.bravissimo.com/products/millie-bra-ln566/", prodName: "Millie Bra", callout: "Really comfortable fit, good level of support while looking delicate, stretchy lace to fit to your individual boob shape.", icon: "heart" },
    { url: "https://www.bravissimo.com/products/millie-body-ln820/", prodName: "Millie Body", callout: "Really comfortable fit, good level of support while looking delicate, stretchy lace to fit to your individual boob shape.", icon: "heart" },
    { url: "https://www.bravissimo.com/products/fusion-bra-fa162/", prodName: "Fusion", callout: "Comfortable all-day wear, stretchy fabric to accommodate your individual boob shape, centred straps which limit shoulder strap slippage!", icon: "daynight" },
    { url: "https://www.bravissimo.com/products/illusion-bra-fa194/", prodName: "Illusion", callout: "Comfortable, soft fabric perfect for all-day wear, centred straps which limit shoulder strap slippage!", icon: "daynight" },
    { url: "https://www.bravissimo.com/products/alexa-bra-ln553/", prodName: "Alexa", callout: "Soft touch fabric, wear-to-be-seen back detail (also great if you find your straps sometimes slip off shoulders!)", icon: "fabric" },
    { url: "https://www.bravissimo.com/products/nova-lounge-bra-ln764/", prodName: "Nova", callout: "Stretchy, super-comfortable fabric, great for lounging, gives more boob separation than other non-wired bras.", icon: "sofa" },
    { url: "https://www.bravissimo.com/products/zara-bralette-ln605/", prodName: "Zara", callout: "Comfortable, great to lounge in or for everyday wear, pretty lace back to show off, stretchy lace and dual sizing means it’s great if you’re between cup sizes!", icon: "sofa" },
    { url: "https://www.bravissimo.com/products/inspire-sports-bra-au27/", prodName: "Inspire", callout: "Ideal for high impact sports, gives good boob separation.", icon: "sportsshoe" },
    { url: "https://www.bravissimo.com/products/wired-sports-bra-pr100/", prodName: "Wired Sports Bra", callout: "Great for high impact sports, J hooks on the straps for extra support.", icon: "sportsshoe" },
    { url: "https://www.bravissimo.com/products/non-wired-sports-bra-pr101/", prodName: "Non Wired Sports Bra", callout: "Great for high impact sports, J hooks on the straps for extra support.", icon: "sportsshoe" },
    { url: "https://www.bravissimo.com/products/idol-bra-fy201/", prodName: "Idol", callout: "Smooth cups, gives you a forward facing shape, provides higher coverage.", icon: "smooth", prodName: "Idol" },
    { url: "https://www.bravissimo.com/products/tango-bra-pn53/", prodName: "Tango", callout: "Firm fit with plenty of support for big boobs.", icon: "heart", prodName: "Tango" },
    { url: "https://www.bravissimo.com/products/tango-plunge-bra-pnb5/", prodName: "Tango", callout: "Firm fit with plenty of support for big boobs.", icon: "heart", prodName: "Tango" },

  ];

  const iconData = [

    { iconName: "heart", iconContent: "<svg width=\"70%\" viewBox=\"0 -1 30 26\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M25.944 2.115C24.592 1.012 22.852.405 21.05.405c-2.08 0-4.096.816-5.525 2.24a8.15 8.15 0 00-.726.83A7.814 7.814 0 007.227.522c-2.401.43-4.29 1.73-5.608 3.862-1.86 3.01-2.014 5.913-.45 8.632.836 1.453 1.92 2.869 3.315 4.33C7.039 20.021 10.06 22.56 14 25.332c.252.177.521.268.802.268.431 0 .725-.216.87-.322 3.552-2.5 6.345-4.803 8.784-7.254 1.363-1.369 2.908-3.048 4.039-5.149.484-.898 1.036-2.105 1.004-3.484-.073-2.967-1.27-5.415-3.555-7.276zm.699 9.793c-1.006 1.868-2.428 3.407-3.684 4.67-2.257 2.267-4.837 4.41-8.162 6.777-3.618-2.578-6.419-4.946-8.786-7.427-1.278-1.338-2.266-2.623-3.018-3.933-1.192-2.07-1.058-4.15.419-6.538.993-1.608 2.404-2.586 4.195-2.906.342-.062.69-.092 1.032-.092 2.121 0 4 1.155 5.06 3.158l.18.335c.184.34.565.535.942.546.395-.007.75-.229.923-.579.373-.749.778-1.33 1.273-1.824 1.04-1.034 2.51-1.626 4.035-1.626 1.315 0 2.578.439 3.557 1.237 1.824 1.484 2.735 3.36 2.795 5.732.02.896-.373 1.751-.761 2.47z\" fill=\"#FFF\" fill-rule=\"evenodd\"/></svg>" },
    { iconName: "fabric", iconContent: "<svg width=\"70%\" viewBox=\"0 0 49 49\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M30.19 50c-.472 0-.893-.158-1.21-.472l-7.784-7.776a1.831 1.831 0 01-.526-1.26c0-.472.21-.893.526-1.26.684-.684 1.84-.735 2.525-.054l7.73 7.723c.527.525.632 1.26.369 1.943-.263.682-.945 1.156-1.63 1.156zm-10.36 0c-.473 0-.894-.158-1.21-.472-.368-.316-.526-.788-.58-1.26 0-.472.159-.946.526-1.26l1.683-1.734a1.835 1.835 0 011.261-.526c.473 0 .894.21 1.262.526.684.683.735 1.838.053 2.522l-1.734 1.679c-.158.158-.368.316-.58.367a1.62 1.62 0 01-.681.158zm16.356-6.042c-.472 0-.894-.158-1.21-.472l-1.736-1.734a1.741 1.741 0 010-2.469c.684-.683 1.84-.735 2.525-.053l1.683 1.68c.525.526.63 1.26.367 1.944-.26.63-.891 1.104-1.629 1.104zm-22.405 0c-.472 0-.893-.158-1.21-.472-.368-.316-.526-.788-.58-1.26 0-.472.159-.946.527-1.26l7.73-7.723a1.835 1.835 0 011.262-.525c.473 0 .894.21 1.262.525.684.684.735 1.84.053 2.523l-7.782 7.667c-.159.158-.368.316-.58.367-.21.105-.419.158-.682.158zm14.727-2.627a1.71 1.71 0 01-1.261-.525l-.054-.053a1.741 1.741 0 010-2.47l5.05-5.044a1.746 1.746 0 012.472 0c.684.684.735 1.839.053 2.522l-5.05 5.045c-.316.314-.737.525-1.21.525zm13.727-3.363c-.473 0-.948-.21-1.262-.526l-7.73-7.722a1.741 1.741 0 010-2.47 1.835 1.835 0 011.26-.525c.473 0 .948.158 1.262.472l7.731 7.723c.526.525.63 1.26.368 1.943-.261.633-.945 1.105-1.63 1.105zm-34.45 0c-.422 0-.894-.158-1.21-.472a1.68 1.68 0 01-.58-1.26c0-.472.158-.947.526-1.314l1.682-1.734a1.835 1.835 0 011.262-.525c.472 0 .947.209 1.261.525.685.683.736 1.839.054 2.522l-1.683 1.68c-.158.159-.368.317-.58.368-.258.158-.521.21-.733.21zm19.723-2.679c-.473 0-.894-.158-1.21-.472l-5.05-5.044a1.741 1.741 0 010-2.469 1.835 1.835 0 011.261-.525c.473 0 .947.158 1.262.472l5.05 5.044c.316.316.526.788.526 1.26s-.21.893-.526 1.26c-.366.263-.839.474-1.313.474zm-12.044 0c-.472 0-.893-.158-1.21-.472l-5.05-5.044a1.831 1.831 0 01-.526-1.26c0-.472.21-.893.526-1.26.684-.684 1.841-.735 2.525-.054l5.05 5.045c.317.316.526.788.526 1.26s-.21.893-.526 1.26c-.367.314-.842.525-1.315.525zm32.768-3.31c-.472 0-.947-.21-1.261-.525l-1.685-1.734a1.831 1.831 0 01-.526-1.26c0-.473.21-.893.526-1.26.684-.684 1.84-.735 2.525-.054l1.683 1.68c.526.526.63 1.26.367 1.944-.263.684-.893 1.21-1.629 1.21zm-46.442 0c-.422 0-.894-.158-1.21-.472a1.68 1.68 0 01-.58-1.26c0-.472.158-.946.526-1.26l7.731-7.723a1.835 1.835 0 011.261-.525c.473 0 .894.21 1.262.525.684.684.735 1.84.053 2.523l-7.782 7.667c-.158.158-.368.316-.58.367a1.62 1.62 0 01-.682.158zm26.719-2.68a1.71 1.71 0 01-1.262-.526l-.053-.053a1.831 1.831 0 01-.526-1.26c0-.472.21-.893.526-1.26l5.05-5.045a1.746 1.746 0 012.471 0c.317.317.526.789.526 1.26 0 .473-.158.947-.472 1.26l-5.05 5.045c-.317.423-.738.579-1.21.579zm-12.046 0a1.71 1.71 0 01-1.261-.526l-.054-.053a1.831 1.831 0 01-.526-1.26c0-.472.21-.893.526-1.26l5.05-5.045a1.746 1.746 0 012.472 0c.316.317.526.789.526 1.26 0 .473-.158.947-.473 1.26l-5.05 5.045c-.316.423-.735.579-1.21.579zm24.09 0c-.473 0-.894-.21-1.262-.526l-.053-.053a1.741 1.741 0 010-2.469l7.73-7.722a1.746 1.746 0 012.472 0 1.741 1.741 0 010 2.469l-7.678 7.776c-.316.316-.737.525-1.21.525zm-37.08-6.042c-.473 0-.948-.158-1.262-.525L.528 21.05a1.741 1.741 0 010-2.469 1.746 1.746 0 012.472 0l1.736 1.68c.317.317.526.789.526 1.26 0 .473-.158.947-.526 1.26-.37.266-.79.475-1.263.475zm11.992 0c-.473 0-.894-.158-1.21-.525l-7.731-7.67a1.741 1.741 0 010-2.469 1.746 1.746 0 012.471 0l7.731 7.672c.317.316.526.788.526 1.26s-.21.893-.526 1.26c-.314.316-.789.472-1.261.472zm12.043 0c-.472 0-.893-.158-1.21-.472l-5.05-5.045a1.831 1.831 0 01-.526-1.26c0-.472.21-.892.526-1.26.684-.683 1.841-.734 2.525-.053l5.05 5.044c.317.317.526.789.526 1.26 0 .473-.21.893-.526 1.26-.368.37-.84.526-1.315.526zm12.046 0c-.473 0-.947-.158-1.262-.472l-5.05-5.045a1.741 1.741 0 010-2.468 1.835 1.835 0 011.262-.526c.472 0 .947.158 1.261.472l5.05 5.045a1.741 1.741 0 010 2.469 1.835 1.835 0 01-1.261.525zm-23.09-5.988a1.71 1.71 0 01-1.262-.526l-.054-.053a1.741 1.741 0 010-2.469l5.05-5.044a1.835 1.835 0 011.262-.526c.472 0 .894.21 1.261.526.684.683.736 1.838.054 2.522l-5.048 5.044c-.37.368-.79.526-1.264.526zm12.045 0c-.473 0-.947-.21-1.262-.526l-.053-.053a1.741 1.741 0 010-2.469l7.73-7.722a1.746 1.746 0 012.472 0 1.741 1.741 0 010 2.468l-7.626 7.777c-.368.316-.789.525-1.261.525zm11.99 0c-.473 0-.894-.21-1.262-.526a1.831 1.831 0 01-.526-1.26c0-.472.21-.892.526-1.26l1.683-1.68a1.746 1.746 0 012.472 0 1.741 1.741 0 010 2.468l-1.63 1.732a1.744 1.744 0 01-1.263.526c.053 0 0 0 0 0zM15.464 11.28a1.71 1.71 0 01-1.261-.525l-1.683-1.68a1.741 1.741 0 010-2.47 1.746 1.746 0 012.472 0l1.736 1.681c.316.316.526.788.526 1.26s-.21.946-.526 1.26c-.316.263-.791.474-1.264.474zm12.044-.053c-.473 0-.894-.158-1.21-.472L18.567 3.03a1.741 1.741 0 010-2.468 1.746 1.746 0 012.471 0l7.731 7.671c.317.316.526.788.526 1.26s-.21.893-.526 1.26c-.314.316-.787.474-1.261.474zm1-5.988c-.472 0-.893-.21-1.261-.526a1.831 1.831 0 01-.526-1.26c0-.472.21-.892.526-1.26l1.682-1.68a1.746 1.746 0 012.472 0 1.741 1.741 0 010 2.468l-1.683 1.735c-.316.312-.737.523-1.21.523z\" fill=\"#FFF\" fill-rule=\"evenodd\"/></svg>" },
    { iconName: "daynight", iconContent: "<svg width=\"65%\" viewBox=\"0 0 47 50\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"#FFF\" fill-rule=\"evenodd\"><path d=\"M16.57 7.377a9.344 9.344 0 00-9.357 9.357 9.344 9.344 0 009.357 9.357 9.344 9.344 0 009.357-9.357 9.344 9.344 0 00-9.357-9.357zm0 16.715a7.328 7.328 0 01-7.358-7.358 7.328 7.328 0 017.358-7.358 7.328 7.328 0 017.358 7.358 7.328 7.328 0 01-7.358 7.358zM16.57 6.559c.545 0 1-.454 1-1V1.472c0-.546-.455-1-1-1-.545 0-1 .454-1 1v4.087c0 .545.455 1 1 1z\"/><path d=\"M7.94 9.557c.181.182.454.273.726.273.273 0 .545-.091.727-.273a.988.988 0 000-1.363L6.486 5.287a.988.988 0 00-1.363 0 .988.988 0 000 1.363L7.94 9.557zM6.395 16.733c0-.545-.454-1-.999-1H1.308c-.545 0-1 .455-1 1 0 .545.455 1 1 1h4.088c.545 0 1-.455 1-1zM7.94 24l-2.907 2.908a.988.988 0 000 1.362c.181.182.454.273.726.273.273 0 .545-.091.727-.273l2.907-2.907a.988.988 0 000-1.362c-.454-.364-1.09-.364-1.453 0zM16.57 26.999c-.545 0-1 .454-1 1v4.087c0 .545.455 1 1 1 .545 0 1-.455 1-1v-4.088c0-.545-.455-1-1-1zM27.38 28.543c.273 0 .545-.09.727-.273a.988.988 0 000-1.362L25.2 24a.988.988 0 00-1.363 0 .988.988 0 000 1.363l2.907 2.906a.825.825 0 00.636.273zM26.835 16.733c0 .545.454 1 1 1h4.087c.545 0 1-.455 1-1 0-.545-.455-1-1-1h-4.088c-.545 0-1 .455-1 1zM24.564 9.83c.272 0 .545-.092.727-.273l2.907-2.907a.988.988 0 000-1.363.988.988 0 00-1.363 0l-2.998 2.816a.988.988 0 000 1.363c.182.272.454.363.727.363zM40.007 26.272a.966.966 0 00-1.09.182.966.966 0 00-.182 1.09c.545 1.272.818 2.634.818 3.997a10.158 10.158 0 01-10.175 10.174c-1.362 0-2.725-.272-3.997-.817a.966.966 0 00-1.09.182.966.966 0 00-.182 1.09c1.908 4.45 6.268 7.358 11.083 7.358 6.722 0 12.082-5.45 12.082-12.082.09-4.906-2.816-9.266-7.267-11.174zM35.283 47.53c-3.27 0-6.177-1.544-8.085-4.088.727.182 1.545.182 2.271.182 6.722 0 12.082-5.45 12.082-12.082 0-.818-.09-1.544-.181-2.271 2.543 1.907 4.088 4.905 4.088 8.085-.091 5.632-4.634 10.174-10.175 10.174z\"/></g></svg>" },
    { iconName: "sleep", iconContent: "<svg width=\"50%\" viewBox=\"0 0 37 49\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"#FFF\" fill-rule=\"evenodd\"><path d=\"M19.765 2.718a3.687 3.687 0 00-3.413-2.28H3.016a2.222 2.222 0 000 4.444h11.526L1.36 18.065a3.695 3.695 0 002.613 6.307h13.578a2.222 2.222 0 000-4.445H5.782L18.966 6.744a3.687 3.687 0 00.798-4.026h.001zM17.179 34.361a3.181 3.181 0 00-2.947-1.968H5.464a2.222 2.222 0 000 4.444h5.89l-7.512 8.097a3.19 3.19 0 002.252 5.447h8.926a2.222 2.222 0 000-4.445H8.972l7.515-8.098a3.186 3.186 0 00.692-3.477zM35.32 32.393h-5.79l7.256-6.92a3.19 3.19 0 00-2.255-5.448h-8.767a2.222 2.222 0 000 4.445h5.634l-7.259 6.922a3.183 3.183 0 00-.692 3.475 3.186 3.186 0 002.947 1.97h8.925a2.222 2.222 0 000-4.444z\"/></g></svg>" },
    { iconName: "sofa", iconContent: "<svg width=\"70%\" viewBox=\"0 0 79 50\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M68.261 49.655a.848.848 0 00.604-.253.87.87 0 00.25-.612v-5.45c2.699-.643 4.607-3.076 4.61-5.884v-6.488c3.596-1.193 5.9-4.748 5.55-8.563-.38-4.15-3.742-7.37-7.855-7.526a9.823 9.823 0 00-2.305.26V7.786C69.115 3.484 65.673 0 61.43 0H17.88c-4.242 0-7.685 3.484-7.685 7.786v7.353a9.823 9.823 0 00-2.305-.26c-4.112.155-7.475 3.376-7.855 7.526-.35 3.815 1.955 7.37 5.55 8.563v6.488c.004 2.808 1.912 5.241 4.61 5.883v5.796c.04.463.4.824.854.865a.848.848 0 00.604-.253.87.87 0 00.25-.612v-5.623h55.504v5.278a.788.788 0 00.22.642c.167.17.4.25.634.223zM11.903 7.786c0-3.345 2.675-6.055 5.977-6.055h43.55c3.302 0 5.977 2.71 5.977 6.055v8.046-.003c-.71.331-1.35.8-1.878 1.386a8.3 8.3 0 00-2.221 3.72H16.003a8.3 8.3 0 00-2.222-3.72 5.86 5.86 0 00-1.878-1.386V7.786zm4.356 14.88h46.792v8.478H16.26v-8.479zm-8.966 14.79V30.28a.862.862 0 00-.683-.865c-3.096-.76-5.17-3.71-4.867-6.921.337-3.264 2.995-5.772 6.23-5.883h.174a6.116 6.116 0 014.44 1.814 6.644 6.644 0 011.965 4.674v8.911c.04.46.397.825.853.865h48.5a.944.944 0 00.854-.865v-8.911a6.643 6.643 0 011.965-4.674 6.12 6.12 0 014.613-1.814c3.235.111 5.894 2.619 6.23 5.883.304 3.21-1.77 6.16-4.866 6.92a.862.862 0 00-.684.866v7.18-.002a4.337 4.337 0 01-1.25 3.058 4.225 4.225 0 01-3.02 1.267H11.564c-2.358 0-4.27-1.936-4.27-4.325z\" fill=\"#FFF\" fill-rule=\"evenodd\"/></svg>" },
    { iconName: "sportsshoe", iconContent: "<svg width=\"70%\" viewBox=\"0 0 69 48\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"#FFF\" fill-rule=\"evenodd\"><path d=\"M24.286 42.634c0-.67-.447-1.116-1.116-1.116H3.75c-.67 0-1.116.447-1.116 1.116 0 .67.446 1.116 1.116 1.116h19.42c.67 0 1.116-.558 1.116-1.116zM8.214 47.099H5.982c-.67 0-1.116.446-1.116 1.116 0 .67.447 1.116 1.116 1.116h2.232c.67 0 1.116-.447 1.116-1.116 0-.67-.446-1.116-1.116-1.116zM13.46 37.054c0-.67-.446-1.117-1.116-1.117H1.518c-.67 0-1.116.447-1.116 1.117 0 .67.447 1.116 1.116 1.116h10.826c.67 0 1.116-.558 1.116-1.116z\"/><path d=\"M68.929 38.95c-.335-.669-1.005-1.227-1.675-1.562l-8.482-3.236-3.46-1.228c-1.004-.447-1.897-1.116-2.455-2.009l-2.902-4.8c.558-.11.893-.557.893-1.115 0-.67-.446-1.116-1.116-1.116h-1.116l-1.34-2.232c.559-.112.894-.558.894-1.117 0-.67-.447-1.116-1.117-1.116h-1.116l-1.116-1.785c.447-.112.782-.558.782-1.005 0-.67-.447-1.116-1.116-1.116h-1.005l-1.45-2.344s0-.111-.112-.111c-1.34-1.563-3.125-2.344-5.023-2.12-1.674.223-3.013 1.227-3.571 2.455-.112.334-.112.67.112 1.004L42.7 30.246c.112.223.335.446.558.446l11.384 4.353h.112l3.348 1.228 8.371 3.236c.223.112.446.223.558.558.446.893.446 1.786-.112 2.679H48.728c-1.116 0-2.232-.335-3.125-1.005L14.465 18.638s.446-.223 1.004-1.004.781-1.786.781-2.79l-1.004-9.375 1.34-2.12c.334-.447 1.004-.559 1.45-.224.335.335 1.674 1.45 4.91 6.697 1.675 2.455 4.354 4.24 7.367 4.687.558.112 1.227-.335 1.339-.893.111-.558-.335-1.228-.893-1.34-2.344-.446-4.576-1.785-5.915-3.794-3.906-6.027-5.022-6.92-5.469-7.254-1.45-1.004-3.46-.67-4.576.781L7.991 12.835c-.446.67-.558 1.45-.446 2.232-.67.223-1.34.558-1.674 1.228l-1.786 2.79c-1.004 1.45-.558 3.46.893 4.464 1.004.782 3.125 2.12 6.25 4.13.223.111.446.223.558.223.335 0 .67-.223.893-.558.335-.558.223-1.228-.335-1.563-3.013-2.009-5.134-3.348-6.139-4.13-.446-.334-.558-.892-.223-1.45l1.674-2.567c.335-.446 1.005-.558 1.451-.223l35.045 26.116c1.339 1.004 2.901 1.45 4.464 1.45h15.401c-2.343 1.116-5.58 2.121-8.37 2.121h-7.143c-1.898 0-3.795-.558-5.357-1.563a6799.54 6799.54 0 01-27.344-17.522c-.558-.335-1.228-.223-1.563.335-.334.558-.223 1.228.335 1.563 8.594 5.58 20.313 13.057 26.897 17.299H12.678c-.67 0-1.116.446-1.116 1.116 0 .67.447 1.116 1.116 1.116h42.857c4.576 0 11.161-2.455 12.835-4.8 1.451-2.008 1.563-3.905.558-5.691zM44.264 28.907l-8.706-14.843c.335-.335.893-.67 1.562-.781.67-.112 1.898 0 3.014 1.227l.67 1.116h-1.005c-.67 0-1.116.447-1.116 1.116 0 .67.446 1.117 1.116 1.117h2.344l1.116 1.785h-.893c-.67 0-1.116.447-1.116 1.116 0 .67.446 1.116 1.116 1.116h2.232l1.34 2.12h-.894c-.67 0-1.116.447-1.116 1.117 0 .67.447 1.116 1.117 1.116h2.232l3.125 4.91-6.138-2.232zM9.889 14.063l3.46-5.469.67 6.473c0 .447-.113.893-.336 1.228-.223.335-.67 1.228-1.674.446 0 0-.558-.334-1.562-1.116-.67-.558-.782-1.116-.558-1.562z\"/></g></svg>" },
    { iconName: "smooth", iconContent: "<svg width=\"70%\" viewBox=\"0 0 69 69\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><path d=\"M48.603 56.62c-.222.153-.337.218-.436.303-1.356 1.175-2.899 1.996-4.678 2.262a8.437 8.437 0 01-3.669-.25c-1.665-.493-3.142-1.33-4.521-2.375-2.515-1.905-4.513-4.283-6.31-6.843-.724-1.03-1.374-2.114-2.057-3.174.04-.03.217-.133.256-.163.085.125.174.249.256.376 1.372 2.13 2.759 4.219 4.51 6.052 1.763 1.846 3.66 3.524 5.977 4.664 2 .985 4.07 1.34 6.25.737 1.2-.331 2.24-.978 3.184-1.764 1.54-1.28 2.884-2.756 4.064-4.368 1.594-2.177 2.93-4.499 3.554-7.158.46-1.959.526-3.927.186-5.93-.447-2.632-1.516-4.965-3.205-7-.857-1.033-1.831-1.977-2.812-2.898a75.596 75.596 0 00-3.453-3.02c-1.112-.924-2.29-1.769-3.402-2.691-2.41-1.997-4.756-4.069-6.937-6.317-2.679-2.76-5.341-5.536-8.011-8.305l-2.191-2.272c-.136-.141-.27-.284-.405-.426.002-.016.18-.16.182-.176.33.26.6.56.898.853 2.431 2.39 4.745 4.87 7.191 7.246a167.69 167.69 0 004.923 4.592 135.23 135.23 0 004.612 3.934c1.205.986 2.498 1.865 3.697 2.858 1.457 1.208 2.871 2.47 4.278 3.738 1.307 1.178 2.483 2.478 3.428 3.974a15.863 15.863 0 012.178 5.53c.556 2.882.255 5.68-.777 8.399-.757 1.99-1.782 3.855-3.135 5.506-1.038 1.267-2.16 2.465-3.257 3.682a.984.984 0 00-.277.788\" fill=\"#FEFEFE\"/><path d=\"M48.603 56.62c-.222.153-.337.218-.436.303-1.356 1.175-2.899 1.996-4.678 2.262a8.437 8.437 0 01-3.669-.25c-1.665-.493-3.142-1.33-4.521-2.375-2.515-1.905-4.513-4.283-6.31-6.843-.724-1.03-1.374-2.114-2.057-3.174.04-.03.217-.133.256-.163.085.125.174.249.256.376 1.372 2.13 2.759 4.219 4.51 6.052 1.763 1.846 3.66 3.524 5.977 4.664 2 .985 4.07 1.34 6.25.737 1.2-.331 2.24-.978 3.184-1.764 1.54-1.28 2.884-2.756 4.064-4.368 1.594-2.177 2.93-4.499 3.554-7.158.46-1.959.526-3.927.186-5.93-.447-2.632-1.516-4.965-3.205-7-.857-1.033-1.831-1.977-2.812-2.898a75.596 75.596 0 00-3.453-3.02c-1.112-.924-2.29-1.769-3.402-2.691-2.41-1.997-4.756-4.069-6.937-6.317-2.679-2.76-5.341-5.536-8.011-8.305l-2.191-2.272c-.136-.141-.27-.284-.405-.426.002-.016.18-.16.182-.176.33.26.6.56.898.853 2.431 2.39 4.745 4.87 7.191 7.246a167.69 167.69 0 004.923 4.592 135.23 135.23 0 004.612 3.934c1.205.986 2.498 1.865 3.697 2.858 1.457 1.208 2.871 2.47 4.278 3.738 1.307 1.178 2.483 2.478 3.428 3.974a15.863 15.863 0 012.178 5.53c.556 2.882.255 5.68-.777 8.399-.757 1.99-1.782 3.855-3.135 5.506-1.038 1.267-2.16 2.465-3.257 3.682a.984.984 0 00-.277.788\" stroke=\"#FCFCFC\" stroke-width=\".8\" stroke-linecap=\"round\"/><path d=\"M33.387 4.203l.828 3.127-.147.05-1.621-4.14.12-.104c1.55.434 3.063.966 4.532 1.612l-.032.102-3.515-.862c.438.409.82.748 1.182 1.106 2.29 2.27 4.558 4.562 6.872 6.81 1.719 1.67 3.486 3.294 5.25 4.92 2.478 2.285 5.127 4.377 7.78 6.469 2.403 1.894 4.693 3.918 6.683 6.226 1.823 2.115 2.938 4.552 3.497 7.248a15.35 15.35 0 01-.32 7.573c-.627 2.126-1.691 4.06-2.962 5.898-1.024 1.482-2.217 2.826-3.506 4.098-.153.151-.224.378-.334.57l.098.1 3.457-1.243.071.16-4.204 1.982-.123-.092c.319-1.499.723-2.977 1.248-4.426l.127.02-.456 2.778c.105-.084.163-.117.204-.164 2.231-2.524 4.09-5.262 5.25-8.395a15.27 15.27 0 00.952-5.56 15.263 15.263 0 00-2.56-8.343c-.672-1.02-1.516-1.948-2.372-2.838-1.845-1.914-3.855-3.663-5.967-5.307-1.474-1.148-2.93-2.323-4.321-3.56-1.753-1.56-3.505-3.13-5.129-4.809-3.225-3.336-6.362-6.751-9.537-10.132-.305-.325-.627-.635-.942-.952l-.103.078\" fill=\"#FEFEFE\"/><path d=\"M33.387 4.203l.828 3.127-.147.05-1.621-4.14.12-.104c1.55.434 3.063.966 4.532 1.612l-.032.102-3.515-.862c.438.409.82.748 1.182 1.106 2.29 2.27 4.558 4.562 6.872 6.81 1.719 1.67 3.486 3.294 5.25 4.92 2.478 2.285 5.127 4.377 7.78 6.469 2.403 1.894 4.693 3.918 6.683 6.226 1.823 2.115 2.938 4.552 3.497 7.248a15.35 15.35 0 01-.32 7.573c-.627 2.126-1.691 4.06-2.962 5.898-1.024 1.482-2.217 2.826-3.506 4.098-.153.151-.224.378-.334.57l.098.1 3.457-1.243.071.16-4.204 1.982-.123-.092c.319-1.499.723-2.977 1.248-4.426l.127.02-.456 2.778c.105-.084.163-.117.204-.164 2.231-2.524 4.09-5.262 5.25-8.395a15.27 15.27 0 00.952-5.56 15.263 15.263 0 00-2.56-8.343c-.672-1.02-1.516-1.948-2.372-2.838-1.845-1.914-3.855-3.663-5.967-5.307-1.474-1.148-2.93-2.323-4.321-3.56-1.753-1.56-3.505-3.13-5.129-4.809-3.225-3.336-6.362-6.751-9.537-10.132-.305-.325-.627-.635-.942-.952l-.103.078z\" stroke=\"#FCFCFC\" stroke-width=\".5\"/><path d=\"M32.554 3.266l1.52 3.884-.789-2.982.18-.138-.226-.211 3.428.84a34.344 34.344 0 00-4.078-1.423l-.035.03zm1.677 1.473c.09.091.18.183.267.276.97 1.033 1.935 2.068 2.901 3.104 2.161 2.316 4.395 4.71 6.635 7.028 1.58 1.634 3.255 3.142 5.123 4.803 1.21 1.075 2.581 2.205 4.317 3.557 2.3 1.791 4.255 3.53 5.976 5.316.83.861 1.693 1.803 2.383 2.85a15.4 15.4 0 012.575 8.391 15.446 15.446 0 01-.957 5.593c-1.029 2.778-2.689 5.463-5.07 8.199 1.232-1.254 2.243-2.459 3.079-3.669 1.45-2.097 2.387-3.963 2.95-5.872.732-2.48.84-5.013.318-7.53-.582-2.81-1.72-5.168-3.477-7.208-1.755-2.035-3.875-4.01-6.67-6.213-2.595-2.046-5.278-4.161-7.785-6.473l-.312-.287c-1.633-1.506-3.323-3.063-4.941-4.636-1.532-1.488-3.069-3.021-4.555-4.503-.772-.77-1.543-1.54-2.318-2.307a19.44 19.44 0 00-.439-.42zm22.862 51.037l.033.025 4.076-1.922-.002-.003-3.432 1.234-.185-.19.033-.058c.034-.06.063-.122.093-.184.07-.143.14-.291.256-.405l.067-.067-.064.05-.182.145.446-2.72a33.214 33.214 0 00-1.14 4.095zm.013.234l-.213-.159.012-.056c.342-1.608.752-3.06 1.252-4.439l.025-.07.29.046-.434 2.64.01-.01c2.473-2.797 4.185-5.534 5.234-8.368.654-1.765.972-3.624.946-5.527-.04-3-.896-5.79-2.545-8.294-.682-1.036-1.539-1.97-2.362-2.825-1.715-1.78-3.664-3.513-5.958-5.3-1.739-1.353-3.113-2.486-4.325-3.563-1.872-1.664-3.55-3.175-5.133-4.813-2.241-2.319-4.476-4.714-6.637-7.03-.966-1.036-1.932-2.071-2.902-3.103-.207-.221-.427-.44-.639-.65l-.232-.233.829 3.132-.309.105-1.675-4.28.204-.177.046.013c1.59.445 3.118.989 4.545 1.617l.073.032-.08.26-3.26-.8.156.144c.271.25.528.486.773.729.774.767 1.546 1.537 2.318 2.306a487.045 487.045 0 004.553 4.502c1.617 1.57 3.305 3.127 4.938 4.632l.312.288c2.502 2.307 5.182 4.42 7.775 6.463 2.804 2.211 4.931 4.193 6.694 6.238 1.753 2.034 2.937 4.487 3.517 7.289a15.51 15.51 0 01-.32 7.617c-.57 1.928-1.516 3.81-2.976 5.924-.935 1.352-2.085 2.697-3.516 4.11-.094.093-.155.22-.22.356l-.067.135.01.01 3.482-1.251.14.317-4.331 2.043z\" fill=\"#FEFEFE\"/><path d=\"M32.554 3.266l1.52 3.884-.789-2.982.18-.138-.226-.211 3.428.84a34.344 34.344 0 00-4.078-1.423l-.035.03zm1.677 1.473c.09.091.18.183.267.276.97 1.033 1.935 2.068 2.901 3.104 2.161 2.316 4.395 4.71 6.635 7.028 1.58 1.634 3.255 3.142 5.123 4.803 1.21 1.075 2.581 2.205 4.317 3.557 2.3 1.791 4.255 3.53 5.976 5.316.83.861 1.693 1.803 2.383 2.85a15.4 15.4 0 012.575 8.391 15.446 15.446 0 01-.957 5.593c-1.029 2.778-2.689 5.463-5.07 8.199 1.232-1.254 2.243-2.459 3.079-3.669 1.45-2.097 2.387-3.963 2.95-5.872.732-2.48.84-5.013.318-7.53-.582-2.81-1.72-5.168-3.477-7.208-1.755-2.035-3.875-4.01-6.67-6.213-2.595-2.046-5.278-4.161-7.785-6.473l-.312-.287c-1.633-1.506-3.323-3.063-4.941-4.636-1.532-1.488-3.069-3.021-4.555-4.503-.772-.77-1.543-1.54-2.318-2.307a19.44 19.44 0 00-.439-.42zm22.862 51.037l.033.025 4.076-1.922-.002-.003-3.432 1.234-.185-.19.033-.058c.034-.06.063-.122.093-.184.07-.143.14-.291.256-.405l.067-.067-.064.05-.182.145.446-2.72a33.214 33.214 0 00-1.14 4.095zm.013.234l-.213-.159.012-.056c.342-1.608.752-3.06 1.252-4.439l.025-.07.29.046-.434 2.64.01-.01c2.473-2.797 4.185-5.534 5.234-8.368.654-1.765.972-3.624.946-5.527-.04-3-.896-5.79-2.545-8.294-.682-1.036-1.539-1.97-2.362-2.825-1.715-1.78-3.664-3.513-5.958-5.3-1.739-1.353-3.113-2.486-4.325-3.563-1.872-1.664-3.55-3.175-5.133-4.813-2.241-2.319-4.476-4.714-6.637-7.03-.966-1.036-1.932-2.071-2.902-3.103-.207-.221-.427-.44-.639-.65l-.232-.233.829 3.132-.309.105-1.675-4.28.204-.177.046.013c1.59.445 3.118.989 4.545 1.617l.073.032-.08.26-3.26-.8.156.144c.271.25.528.486.773.729.774.767 1.546 1.537 2.318 2.306a487.045 487.045 0 004.553 4.502c1.617 1.57 3.305 3.127 4.938 4.632l.312.288c2.502 2.307 5.182 4.42 7.775 6.463 2.804 2.211 4.931 4.193 6.694 6.238 1.753 2.034 2.937 4.487 3.517 7.289a15.51 15.51 0 01-.32 7.617c-.57 1.928-1.516 3.81-2.976 5.924-.935 1.352-2.085 2.697-3.516 4.11-.094.093-.155.22-.22.356l-.067.135.01.01 3.482-1.251.14.317-4.331 2.043z\" stroke=\"#FCFCFC\" stroke-width=\".5\"/><path d=\"M34.72 62.664c-7.524.262-17.974.076-31.1-.556l.028-.719c13.933.67 24.844.84 32.43.5 11.214-.5 12.49-2.026 12.518-2.658l.009-.213c.065-1.472.066-1.487.065-1.593 0-.118 0-.339.059-2.144l.681.028c-.059 1.791-.058 2.011-.058 2.117 0 .124 0 .124-.066 1.628l-.01.213c-.052 1.185-1.474 2.82-13.168 3.341-.45.02-.914.039-1.388.056\" fill=\"#FEFEFE\"/><path d=\"M34.72 62.664c-7.524.262-17.974.076-31.1-.556l.028-.719c13.933.67 24.844.84 32.43.5 11.214-.5 12.49-2.026 12.518-2.658l.009-.213c.065-1.472.066-1.487.065-1.593 0-.118 0-.339.059-2.144l.681.028c-.059 1.791-.058 2.011-.058 2.117 0 .124 0 .124-.066 1.628l-.01.213c-.052 1.185-1.474 2.82-13.168 3.341-.45.02-.914.039-1.388.056z\" stroke=\"#FCFCFC\" stroke-width=\".5\"/><path d=\"M11.145 50.227c-2.05.071-4.342.05-6.922-.046l.03-.692c8.179.307 13.114-.197 16.505-1.686 3.23-1.418 5.214-3.774 6.847-8.132 3.58-9.553 2.021-19.877-4.766-31.561l.63-.34c6.894 11.87 8.469 22.381 4.814 32.134-2.709 7.228-6.764 9.96-17.138 10.323\" stroke=\"#EEE\" stroke-width=\".5\" fill=\"#FEFEFE\"/><path d=\"M11.145 50.227c-2.05.071-4.342.05-6.922-.046l.03-.692c8.179.307 13.114-.197 16.505-1.686 3.23-1.418 5.214-3.774 6.847-8.132 3.58-9.553 2.021-19.877-4.766-31.561l.63-.34c6.894 11.87 8.469 22.381 4.814 32.134-2.709 7.228-6.764 9.96-17.138 10.323z\" stroke=\"#FCFCFC\" stroke-width=\".5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></svg>" },

  ];

  let pageURL = window.location.href;
  let matchedURL = false;
  [].slice.call(prodData).forEach(function (prod) {
    if (pageURL.indexOf(prod['url']) !== -1) {
      matchedURL = true;
    }
  });

  if (matchedURL != true) {
    let callout = document.querySelector(`.${ID}-callout`);
    if (callout) {
      callout.remove();
    }
    return false;
  }

  currProdName = document.querySelector('.c-product-details__name').innerHTML;
  currBrand = document.querySelector('.c-product-details__brand').innerHTML.toLowerCase();

  if (currBrand.indexOf('panache') != -1 && currProdName.indexOf('Sports Bra') != -1) {
    currProdName = "Sports Bra";
  }

  calloutProdData = prodData.filter((data) => {
    if (currProdName.indexOf(data.prodName) != -1) {
      return data;
    }
  });

  calloutIcon = iconData.filter((data) => {
    if (data.iconName == calloutProdData[0].icon) {
      return data;
    }
  });

  if (method == "create") {

    let calloutHTML = `

				<div class="${ID}-callout">

					<h2> Why we love this bra </h2>

					<div class="callout-inner">
						<div class="callout-icon">
							${calloutIcon[0].iconContent}
						</div>
						<div class="callout-content">
							<p> ${calloutProdData[0].callout} </p>
						</div>
					</div>

				</div>

			`;


    addPoller(['.c-product-details__header'], () => {

      let header = document.querySelector('.c-product-details__header');
      header.insertAdjacentHTML('afterend', calloutHTML);

    });


  } else {

    let calloutIconElement = document.querySelector(`${ID}-callout .callout-icon`);
    calloutIconElement.innerHTML = calloutIcon[0].iconContent;

    let calloutContentElement = document.querySelector(`${ID}-callout .callout-content`);
    calloutContentElement.innerHTML = calloutProdData[0].callout;

  }


}

const createMarkup = (container, where = 'beforeend') => {
  if(container) {
    container.insertAdjacentHTML(where, `
      <div class="${ID}-sizes">
      </div>
    `);
  }
};

const colourSizeAmends = () => {

  const containerExisting = document.querySelector(`.${ID}-sizes`);
  if (containerExisting) {
    containerExisting.parentNode.removeChild(container);
  }

  addPoller([
    '.c-product-details .c-field-brasize'
  ], () => {
    const c = document.querySelector('.c-product-details .c-field-brasize');
    createMarkup(c);

    const container = document.querySelector(`.${ID}-sizes`);

    if (container) {
      render(<BraSizes />, container);
    }
  });

  addPoller([
    '.c-product-details__size-grid'
  ], () => {
    const c = document.querySelector('.c-product-details__size-grid');
    c.classList.add(`${ID}-force-hide`);
    createMarkup(c, 'afterend');

    const container = document.querySelector(`.${ID}-sizes`);

    if (container) {
      render(<BraSizes />, container);
    }
  });

}

const additionalPageChanges = () => {

  document.querySelector('.c-product-details__style-colours').insertAdjacentHTML('afterbegin', `<h2 class="${ID}-heading">Select a colour</h2>`);

  let pdpHeader = document.querySelector('.c-product-details__header');
  let imageItem = document.querySelector('.c-product-gallery');

  pdpHeader.appendChild(imageItem);

  swiper();

  let colourHolder = document.querySelector('.c-style-colours__items')

  colourHolder.classList.add(`${ID}-hidden`);

  let allColourOptions = colourHolder.querySelectorAll('.c-style-colours__items .c-style-colour');

  let newHTML = `
    <div class="swiper-container ${ID}-colour-carousel" id="${ID}-colour-carousel">
      <div class="swiper-wrapper">
        
      </div>
    </div>
  `;

  colourHolder.insertAdjacentHTML('afterend', newHTML);

  let carouselTarget = document.getElementById(`${ID}-colour-carousel`);

  [].slice.call(allColourOptions).forEach((option) => {
    let optionHTML = option.outerHTML;
    carouselTarget.querySelector('.swiper-wrapper').insertAdjacentHTML('afterbegin', optionHTML);
  });

  let colourSwiper = new Swiper(carouselTarget, {
    // Optional parameters
    slideClass: 'c-style-colour',
    init: true,
    loop: false,
    // If we need pagination
    slidesPerView: 6,
    slidesPerGroup: 1,
    spaceBetween: 10,
    // Disable preloading of all images
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    
    
    
  });

  // ACCESSORIES UPDATE

  addPoller(['.c-accessories__main', '.c-accessories__main img'], () => {


    let accessories = document.querySelector(`.c-accessories__main`);

    accessories.classList.add(`${ID}-hidden`);

    let allAccessories = accessories.querySelectorAll('.c-product-summary');

    let accessoryHTML = `
      <div class="swiper-container ${ID}-accessories-carousel" id="${ID}-accessories-carousel">
        <div class="swiper-wrapper">
          
        </div>

        <button id="${ID}-accessories-carousel-prev" class="c-carousel-nav c-carousel-nav--prev"><div class="c-carousel-nav__arrow"><span class="c-icon c-icon--right--large"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 120 240"><path d="M116 112c4 4 4 12 0 16L16 228c-4 4-9 3-12 0s-4-8 0-12l96-96L4 24c-4-4-3-9 0-12s8-4 12 0l100 100z"></path></svg></span></div></button>
        <button id="${ID}-accessories-carousel-next" class="c-carousel-nav c-carousel-nav--next"><div class="c-carousel-nav__arrow"><span class="c-icon c-icon--right--large"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 120 240"><path d="M116 112c4 4 4 12 0 16L16 228c-4 4-9 3-12 0s-4-8 0-12l96-96L4 24c-4-4-3-9 0-12s8-4 12 0l100 100z"></path></svg></span></div></button>
      </div>
    `;

    accessories.insertAdjacentHTML('afterend', accessoryHTML);

    let accessoryTarget = document.getElementById(`${ID}-accessories-carousel`);

    [].slice.call(allAccessories).forEach((option) => {
      let optionNode = option;
      option.classList.add('swiper-slide');
      accessoryTarget.querySelector('.swiper-wrapper').insertAdjacentElement('afterbegin', option);
    });

    let accessorySwiper = new Swiper(accessoryTarget, {
      // Optional parameters
      init: true,
      loop: false,
      // If we need pagination
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      // Disable preloading of all images
      // Enable lazy loading
      lazy: false,
      navigation: {
        prevEl: `#${ID}-accessories-carousel-prev`,
        nextEl: `#${ID}-accessories-carousel-next`,
      },
      
    });


  })

  
  

  // const mySiema = new Siema({
  //   selector: `.c-style-colours__items`,
  //   perPage: 6,
  //   loop: false,
  //   draggable: true,
  //   onInit: () => {
  //     const container = document.querySelector(`.c-style-colours__items`);

  //     if(container) {
  //       container.classList.add('xinit');

        
  //     }
  //   }
  // });


  // const myMatchingStylesSiema = new Siema({
  //   selector: `.c-accessories__main`,
  //   perPage: 1,
  //   loop: false,
  //   draggable: true,
  //   onInit: () => {
  //     const MScontainer = document.querySelector(`.c-accessories__main`);

  //     if(MScontainer) {
  //       MScontainer.classList.add('xinit');

        
  //     }
  //   }
  // });


}

const startExperiment = () => {

  logMessage("Showing experiment PDP restyle");

  tabsToAccordions();  

  addPoller(['.c-field-brasize'], () => {
    colourSizeAmends();
  });

  addPoller(['.c-product-details__name', '.c-product-details__brand'], () => {
    productCallouts("create");
  });

  addPoller(['.c-product-details__style-colours', '.c-style-colours__items'], () => {
    additionalPageChanges();
  })


}


export default () => {
  setup();

  fireEvent('Conditions Met');

  logMessage(ID + " Variation: " + VARIATION);

  if (VARIATION == "control") {
    return;
  } 

  startExperiment();

  observePageChange(document.body, (p) => {

		startExperiment();

	});

  // add experiment observer to re-add body classes when megamenu opened
  var body = document.body;
  if(body) {
    addObserver(body, function () {
      
      if(!document.documentElement.classList.contains(ID)) {
        document.documentElement.classList.add(ID);
      }

    }, {
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      }
    });
  }    


};