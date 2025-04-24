/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { h, render } from 'preact';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import StickyNav from './components/StickyNavBar';
import { elementIsInView_custom } from './utils';



const { ID, VARIATION } = shared;


const waitForElm = async (selector) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      resolve(document.querySelector(selector));
      return;
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  });
};

const runChanges = () => {

 
  // Declare container markup for Component to sit inside
  const markup = `
    <div class="${shared.ID}__component">
    
    </div>
  `;

  // Get element from page where the component will sit
  //desktop
  const desktopElement = document.querySelector(".PDPStyles__Section-sc-13stik8-0.kSaqOe");
  
  if(desktopElement){
    //Insert wrapper markup
    desktopElement.insertAdjacentHTML('afterend', markup);
    //Grap wrapper element
    const reactWrapper = document.querySelector(`.${shared.ID}__component`);
    //Render Componnet to wrapper
    if(reactWrapper){      
      render(<StickyNav />, reactWrapper);
      //change header for destop
      if(document.querySelectorAll(".stickyNav--item").length === 3 && document.querySelectorAll(".stickyNav--item")[0].innerText === "Tech Specs" ){
        document.querySelectorAll(".stickyNav--item")[0].style = "order : 2";
        document.querySelectorAll(".stickyNav--item")[2].style = "order : 3"
      }

      //add new attribute
      document.querySelectorAll(".PDPStyles__Section-sc-13stik8-0.gtRHPd")[0].setAttribute("id", `${shared.ID}__overview`);
      document.querySelectorAll(".PDPStyles__Section-sc-13stik8-0.gtRHPd")[1].setAttribute("id", `${shared.ID}__tech-specifications`);
      document.querySelectorAll(".PDPStyles__Section-sc-13stik8-0.gtRHPd")[3].setAttribute("id", `${shared.ID}__review`);     
    }

    //Scroll To to Sticky
    window.addEventListener("scroll", function (e) {
      let targetDom = document.querySelector(`#${shared.ID}__overview`);
      let position = targetDom.getBoundingClientRect();
      if(position.top < 44){
        document.querySelector(`.${shared.ID}__component`).classList.add(`${shared.ID}__stickyHeadPrimary`);
        document.querySelector(`.${shared.ID}__component`).style.width = document.querySelector(`#${shared.ID}__overview`).clientWidth + "px";

        
      }else{
        document.querySelector(`.${shared.ID}__component`).classList.remove(`${shared.ID}__stickyHeadPrimary`);
      }

      //for overview tab grab element and add indicator while scrolling
      let overview = document.getElementById(`${shared.ID}__overview`);
      let techSpecs = document.getElementById(`${shared.ID}__tech-specifications`);
      let review = document.getElementById(`${shared.ID}__review`);
      const scrollOnFirstView = [];
      
      

      if (elementIsInView_custom(overview, false)) {
        scrollOnFirstView.push("overview");
      }

      if(elementIsInView_custom(techSpecs, false)){
        scrollOnFirstView.push("techSpecs");
      }
      
      if(elementIsInView_custom(review, false)){
        scrollOnFirstView.push("review");
      }

      if(scrollOnFirstView.length > 0){
        if(scrollOnFirstView[0] === "techSpecs"){
          document.querySelector(`#${shared.ID}__techSpecs--tab`).classList.add("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__overview--tab`).classList.remove("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__review--tab`).classList.remove("stickyNav--item--clicked--indicator");

          document.querySelector(`#${shared.ID}__overview--tab`).classList.add("stickyNav--item--indicator");
          document.querySelector(`#${shared.ID}__review--tab`).classList.add("stickyNav--item--indicator");

        }else if(scrollOnFirstView[0] === "overview"){
          document.querySelector(`#${shared.ID}__overview--tab`).classList.add("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__techSpecs--tab`).classList.remove("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__review--tab`).classList.remove("stickyNav--item--clicked--indicator");

          document.querySelector(`#${shared.ID}__techSpecs--tab`).classList.add("stickyNav--item--indicator");
          document.querySelector(`#${shared.ID}__review--tab`).classList.add("stickyNav--item--indicator");

        }else if(scrollOnFirstView[0] === "review"){
          document.querySelector(`#${shared.ID}__review--tab`).classList.add("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__overview--tab`).classList.remove("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__techSpecs--tab`).classList.remove("stickyNav--item--clicked--indicator");

          document.querySelector(`#${shared.ID}__overview--tab`).classList.add("stickyNav--item--indicator");
          document.querySelector(`#${shared.ID}__techSpecs--tab`).classList.add("stickyNav--item--indicator");
        }else{
          document.querySelector(`#${shared.ID}__review--tab`).classList.remove("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__overview--tab`).classList.remove("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__techSpecs--tab`).classList.remove("stickyNav--item--clicked--indicator");

        }

      }
    })
    
  }

  

//mobile
  const mobileElement = document.querySelector(`[class^="ProductDetailMobile__OrderButtonsWr"]`);

  if(mobileElement){

    const elementOnPage = document.querySelector(`[data-test-id="tech-specifications"]`);
    if (elementOnPage) {
    // Insert wrapper markup
    elementOnPage.insertAdjacentHTML('beforebegin', markup);
    // Grab wrapper element
    const reactWrapper = document.querySelector(`.${shared.ID}__component`);
    //Render Component to wrapper
    if (reactWrapper) {
      render(<StickyNav />, reactWrapper);
      document.querySelector(`[data-test-id="overview"]`).setAttribute("id", `${shared.ID}__overview`);
      document.querySelector(`[data-test-id="tech-specifications"]`).setAttribute("id", `${shared.ID}__tech-specifications`);
      document.querySelector(`[data-test-id="product-reviews"]`).setAttribute("id", `${shared.ID}__review`);
      
    } 
    
    //Scroll To to Sticky
    window.addEventListener("scroll", function (e) {
      let targetDom = document.querySelector(`[data-test-id="tech-specifications"]`);
      let position = targetDom.getBoundingClientRect();
      if(position.top < 57){
        document.querySelector(`.${shared.ID}__component`).classList.add(`${shared.ID}__stickyHead`);
      }else{
        document.querySelector(`.${shared.ID}__component`).classList.remove(`${shared.ID}__stickyHead`);
      }

      //for overview tab grab element and add indicator while scrolling
      let overview = document.getElementById(`${shared.ID}__overview`);
      let techSpecs = document.getElementById(`${shared.ID}__tech-specifications`);
      let review = document.getElementById(`${shared.ID}__review`);
      const scrollOnFirstView = [];
      
      if(elementIsInView_custom(techSpecs, false)){
        scrollOnFirstView.push("techSpecs");
      }

      if (elementIsInView_custom(overview, false)) {
        scrollOnFirstView.push("overview");
      }
      
      if(elementIsInView_custom(review, false)){
        scrollOnFirstView.push("review");
      }

      if(scrollOnFirstView.length > 0){
        if(scrollOnFirstView[0] === "techSpecs"){
          document.querySelector(`#${shared.ID}__techSpecs--tab`).classList.add("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__overview--tab`).classList.remove("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__review--tab`).classList.remove("stickyNav--item--clicked--indicator");

          document.querySelector(`#${shared.ID}__overview--tab`).classList.add("stickyNav--item--indicator");
          document.querySelector(`#${shared.ID}__review--tab`).classList.add("stickyNav--item--indicator");

        }else if(scrollOnFirstView[0] === "overview"){
          document.querySelector(`#${shared.ID}__overview--tab`).classList.add("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__techSpecs--tab`).classList.remove("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__review--tab`).classList.remove("stickyNav--item--clicked--indicator");

          document.querySelector(`#${shared.ID}__techSpecs--tab`).classList.add("stickyNav--item--indicator");
          document.querySelector(`#${shared.ID}__review--tab`).classList.add("stickyNav--item--indicator");

        }else if(scrollOnFirstView[0] === "review"){
          document.querySelector(`#${shared.ID}__review--tab`).classList.add("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__overview--tab`).classList.remove("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__techSpecs--tab`).classList.remove("stickyNav--item--clicked--indicator");

          document.querySelector(`#${shared.ID}__overview--tab`).classList.add("stickyNav--item--indicator");
          document.querySelector(`#${shared.ID}__techSpecs--tab`).classList.add("stickyNav--item--indicator");
        }else{
          document.querySelector(`#${shared.ID}__review--tab`).classList.remove("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__overview--tab`).classList.remove("stickyNav--item--clicked--indicator");
          document.querySelector(`#${shared.ID}__techSpecs--tab`).classList.remove("stickyNav--item--clicked--indicator");

        }

      }
    })
  }

  }
  

  //
};


const init = () => {
 
  const componentAlreadyExists = false; 

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  setup();

  fireEvent('Conditions Met');
  runChanges();
  fireEvent('Experiment running');

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
}

export default () => {
  init();


  // Poll and re-run init
  pollerLite([
    '#app-container', `[data-test-id="tech-specifications"]`, '.PDPStyles__Section-sc-13stik8-0.kSaqOe'
  ], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          document.body.classList.remove(`${shared.ID}`);

          setTimeout(() => {
            // -----------------------------------
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
            init();
            
           
          }, 2000);
        }
      });
    });

    const config = {
        childList: true,
        subtree: true
    };

    observer.observe(appContainer, config);
  });
};
