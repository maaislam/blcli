/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from './winstack';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';
const { ID, VARIATION } = shared;

const makeAmends = () => {

  if(shared.VARIATION == 'control') {
    return;
  }

  addPoller(['div[zippy-toggle="product-description.1"]', 'local-product-view', '#reviews .carousel__frame'], () => {

    if(document.querySelector('div[zippy-toggle="product-description.4"]')) {
      document.querySelector('div[zippy-toggle="product-description.4"]').remove();
    }

    if(document.querySelector('div[zippy="product-description.4"]')) {
      document.querySelector('div[zippy="product-description.4"]').remove();
    }

    let visibleMessage = "Visible - amends made to page";
    logMessage(visibleMessage);
    fireEvent(visibleMessage);

    let productDescriptionAccordionHeader = document.querySelector('div[zippy-toggle="product-description.1"]');
    let reviewsHeader = productDescriptionAccordionHeader.cloneNode(true);
    reviewsHeader.setAttribute('zippy-toggle', 'product-description.4');
    reviewsHeader.classList.remove('cursor-pointer');
    reviewsHeader.classList.add(`${ID}-reviews-header`);
    reviewsHeader.querySelector('span').innerHTML = "Reviews";
    reviewsHeader.querySelector('span').setAttribute('ng-bind', '::"Reviews" | ms');
    reviewsHeader.classList.add('b-dotted-t');

    let productDescriptionAccordionContent = document.querySelector('div[zippy="product-description.1"]');
    let reviewsContent = productDescriptionAccordionContent.cloneNode(true);
    reviewsContent.setAttribute('zippy', 'product-description.4');
    reviewsContent.classList.add(`${ID}-reviews-holder`);

    reviewsContent.insertAdjacentHTML('beforeend', `<button class="${ID}-reviews-readmore">Read more reviews</button>`);
    reviewsContent.querySelector('h2').setAttribute('ng-bind', '::"Reviews" | ms');
    reviewsContent.querySelector('h2').innerHTML = '<svg width="200" viewBox="0 0 755 121" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><rect id="reviewsio-logo" x="0" y="0" width="754.167" height="120.833" style="fill:none;"/><g id="reviewsio-logo1" serif:id="reviewsio-logo"><path d="M167.29,59.696c12.27,0 21.037,-6.312 21.037,-16.829l0,-0.233c0,-10.05 -7.717,-16.129 -20.921,-16.129l-25.241,0l0,33.191l25.125,0Zm-34.355,-37.046c0,-2.57 2.105,-4.675 4.559,-4.675l30.616,0c10.046,0 18.113,3.038 23.255,8.18c3.97,3.975 6.308,9.7 6.308,16.129l0,0.229c0,13.442 -9.117,21.271 -21.854,23.725l20.337,26.179c0.934,1.046 1.517,2.1 1.517,3.383c0,2.459 -2.338,4.563 -4.675,4.563c-1.871,0 -3.271,-1.054 -4.321,-2.458l-23.025,-29.913l-23.487,0l0,27.696c0,2.571 -2.105,4.675 -4.671,4.675c-2.454,0 -4.559,-2.104 -4.559,-4.675l0,-73.038Z" style="fill-rule:nonzero;"/><path d="M216.244,95.105l0,-72.454c0,-2.571 2.104,-4.675 4.558,-4.675l50.834,0c2.333,0 4.208,1.871 4.208,4.208c0,2.338 -1.875,4.209 -4.208,4.209l-46.163,0l0,27.925l40.904,0c2.338,0 4.209,1.987 4.209,4.208c0,2.337 -1.871,4.204 -4.209,4.204l-40.904,0l0,28.633l46.746,0c2.338,0 4.204,1.871 4.204,4.205c0,2.337 -1.866,4.208 -4.204,4.208l-51.417,0c-2.454,0 -4.558,-2.104 -4.558,-4.671" style="fill-rule:nonzero;"/><path d="M319.652,96.855l-31.55,-72.805c-0.35,-0.7 -0.471,-1.283 -0.471,-2.104c0,-2.333 2.104,-4.554 4.679,-4.554c2.333,0 3.971,1.517 4.787,3.504l28.284,67.775l28.391,-68.008c0.821,-1.633 2.459,-3.271 4.559,-3.271c2.571,0 4.558,2.104 4.558,4.442c0,0.7 -0.117,1.283 -0.35,1.866l-31.671,73.155c-1.05,2.337 -2.687,3.858 -5.375,3.858l-0.466,0c-2.688,0 -4.442,-1.521 -5.375,-3.858" style="fill-rule:nonzero;"/><path d="M379.94,22.066c0,-2.571 2.105,-4.675 4.559,-4.675c2.566,0 4.671,2.104 4.671,4.675l0,73.621c0,2.571 -2.105,4.675 -4.671,4.675c-2.454,0 -4.559,-2.104 -4.559,-4.675l0,-73.621Z" style="fill-rule:nonzero;"/><path d="M411.955,95.105l0,-72.454c0,-2.571 2.105,-4.675 4.555,-4.675l50.837,0c2.333,0 4.208,1.871 4.208,4.208c0,2.338 -1.875,4.209 -4.208,4.209l-46.162,0l0,27.925l40.9,0c2.341,0 4.208,1.987 4.208,4.208c0,2.337 -1.867,4.204 -4.208,4.204l-40.9,0l0,28.633l46.745,0c2.334,0 4.205,1.871 4.205,4.205c0,2.337 -1.871,4.208 -4.205,4.208l-51.42,0c-2.45,0 -4.555,-2.104 -4.555,-4.671" style="fill-rule:nonzero;"/><path d="M484.16,24.17c-0.233,-0.7 -0.463,-1.4 -0.463,-2.104c0,-2.454 2.217,-4.671 4.788,-4.671c2.337,0 4.092,1.75 4.792,3.85l22.554,64.979l21.383,-65.208c0.7,-2.104 2.104,-3.621 4.558,-3.621l0.588,0c2.333,0 3.854,1.517 4.554,3.621l21.383,65.208l22.671,-65.208c0.704,-2.104 2.221,-3.621 4.442,-3.621c2.454,0 4.675,2.217 4.675,4.554c0,0.7 -0.354,1.521 -0.583,2.221l-26.18,72.683c-0.816,2.338 -2.45,3.975 -4.791,3.975l-0.7,0c-2.334,0 -3.971,-1.637 -4.788,-3.975l-21.271,-62.866l-21.154,62.866c-0.812,2.338 -2.45,3.975 -4.787,3.975l-0.7,0c-2.338,0 -3.975,-1.52 -4.792,-3.975l-26.179,-72.683Z" style="fill-rule:nonzero;"/><path d="M611.638,89.962c-1.05,-0.704 -1.754,-1.992 -1.754,-3.509c0,-2.57 1.991,-4.558 4.446,-4.558c1.166,0 2.22,0.467 2.8,1.05c7.712,6.55 15.429,9.704 25.829,9.704c10.983,0 18.229,-5.846 18.229,-13.908l0,-0.233c0,-7.596 -4.092,-11.917 -21.267,-15.542c-18.816,-4.088 -27.466,-10.167 -27.466,-23.608l0,-0.23c0,-12.854 11.337,-22.32 26.879,-22.32c10.754,0 18.579,2.687 26.058,8.062c0.938,0.704 1.988,1.988 1.988,3.738c0,2.458 -1.988,4.441 -4.438,4.441c-1.054,0 -1.875,-0.233 -2.687,-0.816c-6.896,-5.025 -13.559,-7.13 -21.155,-7.13c-10.633,0 -17.412,5.842 -17.412,13.205l0,0.233c0,7.717 4.208,12.037 22.204,15.896c18.229,3.975 26.642,10.629 26.642,23.133l0,0.238c0,14.02 -11.684,23.137 -27.925,23.137c-11.921,0 -21.854,-3.742 -30.971,-10.983" style="fill-rule:nonzero;"/><path d="M684.355,90.531c1.762,0 3.071,1.304 3.071,3.071l0,1.308c0,1.767 -1.309,3.138 -3.071,3.138c-1.829,0 -3.138,-1.371 -3.138,-3.138l0,-1.308c0,-1.767 1.309,-3.071 3.138,-3.071" style="fill-rule:nonzero;"/><path d="M698.414,66.152c0,-1.371 1.112,-2.55 2.483,-2.55c1.438,0 2.55,1.108 2.55,2.55l0,29.346c0,1.437 -1.046,2.55 -2.487,2.55c-1.434,0 -2.546,-1.113 -2.546,-2.55l0,-29.346Zm-0.459,-12.808c0,-1.638 1.309,-2.684 2.942,-2.684c1.7,0 3.004,1.046 3.004,2.684l0,0.846c0,1.57 -1.304,2.679 -3.004,2.679c-1.633,0 -2.942,-1.109 -2.942,-2.679l0,-0.846Z" style="fill-rule:nonzero;"/><path d="M743.124,80.99l0,-0.13c0,-7.254 -5.425,-13.208 -12.55,-13.208c-7.321,0 -12.354,5.954 -12.354,13.079l0,0.129c0,7.255 5.362,13.134 12.487,13.134c7.317,0 12.417,-5.879 12.417,-13.004m-30.067,0l0,-0.13c0,-9.541 7.454,-17.65 17.65,-17.65c10.129,0 17.579,7.975 17.579,17.521l0,0.129c0,9.542 -7.512,17.646 -17.712,17.646c-10.129,0 -17.517,-7.975 -17.517,-17.516" style="fill-rule:nonzero;"/><g><g><path d="M90.122,25.919c9.794,7.909 14.582,18.125 15.472,30.487c-0.744,23.861 -12.002,39.197 -31.341,45.774c-22.343,6.732 -36.501,1.285 -50.201,-12.674l-2.283,14.192c23.825,15.656 58.427,23.438 80.336,1.831c22.501,-22.19 22.786,-60.732 -4.008,-83.61l-7.975,4Z" style="fill:none;"/><clipPath id="_clip1"><path d="M90.122,25.919c9.794,7.909 14.582,18.125 15.472,30.487c-0.744,23.861 -12.002,39.197 -31.341,45.774c-22.343,6.732 -36.501,1.285 -50.201,-12.674l-2.283,14.192c23.825,15.656 58.427,23.438 80.336,1.831c22.501,-22.19 22.786,-60.732 -4.008,-83.61l-7.975,4Z"/></clipPath><g clip-path="url(#_clip1)"><path d="M86.62,14.515c-19.375,-20.191 -51.498,-20.854 -71.689,-1.478c-20.191,19.375 -20.853,51.498 -1.478,71.689l15.306,15.95c19.375,20.191 51.498,20.854 71.689,1.479c20.191,-19.376 20.854,-51.498 1.478,-71.69l-15.306,-15.95Z" style="fill:#feef7c;"/></g><path d="M17.672,94.293l6.127,-5.351c-13.985,-19.818 -14.571,-48.832 4.568,-64.805c14.187,-11.84 42.337,-17.977 64.858,1.852l3.488,-6.132c-18.414,-20.443 -46.22,-23.018 -64.048,-16.005c-43.748,17.209 -37.007,74.836 -14.993,90.441Z" style="fill:none;"/><clipPath id="_clip2"><path d="M17.672,94.293l6.127,-5.351c-13.985,-19.818 -14.571,-48.832 4.568,-64.805c14.187,-11.84 42.337,-17.977 64.858,1.852l3.488,-6.132c-18.414,-20.443 -46.22,-23.018 -64.048,-16.005c-43.748,17.209 -37.007,74.836 -14.993,90.441Z"/></clipPath><g clip-path="url(#_clip2)"><path d="M89.418,17.312c-19.376,-20.191 -51.498,-20.854 -71.69,-1.478c-20.191,19.375 -20.853,51.498 -1.478,71.689l15.306,15.95c19.375,20.191 51.498,20.854 71.689,1.479c20.191,-19.375 20.854,-51.498 1.478,-71.689l-15.305,-15.951Z" style="fill:#5cd3cb;"/></g></g><path d="M8.333,59.138c0,28.054 22.746,50.8 50.8,50.8c28.059,0 50.804,-22.746 50.804,-50.8c0,-28.059 -22.745,-50.805 -50.804,-50.805c-28.054,0 -50.8,22.746 -50.8,50.805Zm35.359,9.188c0.534,-1.69 -0.06,-3.532 -1.48,-4.593c-3.76,-2.808 -11.173,-8.344 -16.154,-12.064c-0.719,-0.537 -1.013,-1.474 -0.73,-2.326c0.283,-0.852 1.079,-1.426 1.977,-1.426l19.306,0c1.797,0 3.391,-1.152 3.956,-2.857c1.522,-4.597 4.547,-13.733 6.553,-19.789c0.282,-0.851 1.077,-1.427 1.974,-1.428c0.897,-0.001 1.695,0.572 1.979,1.422c2.027,6.061 5.088,15.212 6.625,19.807c0.569,1.699 2.16,2.845 3.952,2.845c4.567,0 13.365,0 19.355,0c0.895,0 1.691,0.572 1.975,1.422c0.284,0.85 -0.006,1.786 -0.722,2.325c-4.966,3.741 -12.383,9.327 -16.135,12.153c-1.412,1.063 -1.999,2.902 -1.466,4.586c1.451,4.582 4.361,13.771 6.327,19.978c0.274,0.867 -0.046,1.813 -0.791,2.335c-0.745,0.522 -1.742,0.501 -2.464,-0.053c-4.989,-3.83 -12.278,-9.425 -16.095,-12.354c-1.501,-1.152 -3.589,-1.149 -5.086,0.009c-3.78,2.922 -10.97,8.482 -15.917,12.307c-0.72,0.557 -1.719,0.582 -2.466,0.06c-0.747,-0.521 -1.069,-1.467 -0.795,-2.335c1.966,-6.225 4.872,-15.43 6.322,-20.024Z" style="fill-rule:nonzero;"/></g></g></svg>';
    reviewsContent.querySelector('.product-description').innerHTML = "";

    // get all reviews

    let allReviews = document.querySelectorAll('#reviews .carousel__frame');

    [].slice.call(allReviews).forEach((review) => {

      let reviewHTML = review.innerHTML;

      reviewsContent.querySelector('.product-description').insertAdjacentHTML('beforeend', reviewHTML);

    });

    let insertionPoint = document.querySelector('div[zippy-group-name="product-description"] > div > div');

    insertionPoint.insertAdjacentElement('beforeend', reviewsHeader);
    insertionPoint.insertAdjacentElement('beforeend', reviewsContent);

    let otherAccordionHeaders = document.querySelectorAll('div[zippy-group-name="product-description"] .cursor-pointer');

    let readMoreButton = document.querySelector(`.${ID}-reviews-readmore`);
    readMoreButton.addEventListener('click', (e) => {
      reviewsContent.scrollTop = 0;
      const box = reviewsContent.querySelector('h2').getBoundingClientRect();
      window.scrollTo({top: box.top + window.scrollY - 100, behavior: 'smooth'});
      readMoreButton.remove();
      reviewsContent.querySelector('.product-description').classList.add('all-reviews-shown');

    });

    [].slice.call(otherAccordionHeaders).forEach((header) => {

      header.addEventListener('click', (e) => {
        reviewsHeader.querySelector('i').classList.add('icon-right-open');
        reviewsHeader.querySelector('i').classList.remove('icon-down-open');
        reviewsContent.classList.add('ng-hide');
      })

    })

    reviewsHeader.addEventListener('click', (e) => {
      if(reviewsContent.classList.contains('ng-hide')) {

        setTimeout(() => {
          reviewsContent.scrollTop = 0;
          const box = reviewsContent.querySelector('h2').getBoundingClientRect();
          window.scrollTo({top: box.top + window.scrollY - 100, behavior: 'smooth'});
        }, 250);
        
        let openReviewTabMessage = "Click - opened review accordion";
        logMessage(openReviewTabMessage);
        fireEvent(openReviewTabMessage);

        reviewsHeader.querySelector('i').classList.remove('icon-right-open');
        reviewsHeader.querySelector('i').classList.add('icon-down-open');
        reviewsContent.classList.remove('ng-hide');

        
        [].slice.call(otherAccordionHeaders).forEach((header) => {
          header.querySelector('i').classList.add('icon-right-open');
          header.querySelector('i').classList.remove('icon-down-open');
          header.nextElementSibling.classList.add('ng-hide');
        });

      } else {
        reviewsHeader.querySelector('i').classList.add('icon-right-open');
        reviewsHeader.querySelector('i').classList.remove('icon-down-open');
        reviewsContent.classList.add('ng-hide');

        let openReviewTabMessage = "Click - closed review accordion";
        logMessage(openReviewTabMessage);
        fireEvent(openReviewTabMessage);
      }
    })




    if(VARIATION == 2) {

      let behindScenesAccordionHeader = document.querySelector('div[zippy-toggle="product-description.3"]');
      let behindScenesAccordionContent = document.querySelector('div[zippy="product-description.3"]');
  
      insertionPoint.appendChild(behindScenesAccordionHeader);
      insertionPoint.appendChild(behindScenesAccordionContent);

      

      behindScenesAccordionHeader.querySelector('i').classList.remove('icon-right-open');
      behindScenesAccordionHeader.querySelector('i').classList.add('icon-down-open');
      behindScenesAccordionContent.classList.remove('ng-hide');

      behindScenesAccordionHeader.addEventListener('click', (e) => {

        let bscenesMessage = "Click - on behind scenes accordion option";
        logMessage(bscenesMessage);
        fireEvent(bscenesMessage);

      });
  
    }


  });

  


}

const addEventTracking = () => {

  let atbButton = document.querySelector('local-add-to-basket .button');
  atbButton.addEventListener('click', (e) => {

    let atbMessage = "Click - add to basket button clicked";
    logMessage(atbMessage);
    fireEvent(atbMessage);

  });

   

    if(VARIATION == "control") {

      addPoller(['#reviews'], () => {

        let reviewsIntersection = document.getElementById('reviews');

        let scrollWatch = new window.IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
              
              let reviewsSeenMessage = "Visible - reviews seen by user";
              logMessage(reviewsSeenMessage);
              fireEvent(reviewsSeenMessage, true);
      
              scrollWatch.unobserve(reviewsIntersection);
            }
          });
          }, { root: null });
        
          
          scrollWatch.observe(reviewsIntersection);

      });
      
    } 
    
  
    


}


export default () => {
  

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  addEventTracking();

  // Write experiment code here
  // ...

  if(VARIATION == "control") {
    return;
  }

  makeAmends();

  let currHref = window.location.href;

  const wrap = document.body;
  addObserver(wrap, () => {
    logMessage(`${ID} observer event triggered`);
    if(currHref !== window.location.href && document.querySelector('product-reviews')) {
      makeAmends();
    } 
  }, {
    config: {
    attributes: true,
    childList: true,
    subtree: false,
    }
  })

  window.addEventListener("orientationchange", function() {
      window.location.reload();
  });
};
