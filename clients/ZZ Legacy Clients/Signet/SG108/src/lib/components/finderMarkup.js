import { events } from "../../../../../../lib/utils";
import shared from "../shared";
import { attributeSetup, buildTool, clearAllStorage, approveFn, rejectFn } from "./finderFunctionality";


const { ID, VARIATION } = shared;

export default class RingFinderMarkup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
      this.initCardSwipe();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-ringFinder`);
      element.innerHTML = `
        <div class="${ID}-intro">
            <div class="${ID}-finder-close"></div>
            <div class="${ID}-container">
                <div class="${ID}-content">
                    <div class="${ID}-intro-image">
                        <div class="${ID}-image-bg"></div>
                        <div class="${ID}-image swipeAnimate"></div>
                        <div class="${ID}-icon hand"></div>
                    </div>
                    <div class="${ID}-bottom-content">
                        <h1>Engagement Ring Finder</h1>
                        <div class="${ID}-text-block slider">
                            <p>Tap the heart or swipe right on products you like, tap the cross or swipe left on products you don't like.</p>
                        </div>
                        <div class="${ID}-button cta start">Get Started</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="${ID}-swiper-wrapper">
            <div class="${ID}-finder-close"></div>
            <div class="${ID}-container">
                <div class="${ID}-product_container productback"></div>
                
                <div class="${ID}-product_container productback">
                  <div class="${ID}-productback_image" style="background-image: url(https://www.ernestjones.co.uk/d34qiagx43sg99.cloudfront.net/5514738-1490.jpg)" width="250" height="250"></div>
                  <div class="${ID}-product_backInfo">
                      <h2>Vera Wang Love</h2>
                      <p class="${ID}-productBackTitle">Vera Wang 18ct White Gold 0.70ct Diamond Pear Cluster Ring</p>
                      <p class="${ID}-productBackPrice">£1000</p>
                  </div>
                </div>
                <div class="${ID}-mainproduct">
                
                </div>
            </div>
        </div> 
        <div class="${ID}-loading-screen">
            <div class="${ID}-loading-content">
                <div class="${ID}-loader-icon"></div>
                <span>Loading your products...</span>
            </div>
        </div>

      `;
      this.component = element;
    }

    initCardSwipe() {
      const $ = window.jQuery;

      var animating = false;
      var cardsCounter = 0;
      //var numOfCards = 6;
      var decisionVal = 60; // pixels of how far to go left, relative to container
      var pullDeltaX = 0;
      var deg = 0;
      var $card, $cardReject, $cardLike;

      function pullChange() {
          animating = true;
          deg = pullDeltaX / 10;
          $card.css("transform", "translateX("+ pullDeltaX +"px) rotate("+ deg +"deg)");

          var opacity = pullDeltaX / 100;
          var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
          var likeOpacity = (opacity <= 0) ? 0 : opacity;
          $cardReject.css("opacity", rejectOpacity);
          $cardLike.css("opacity", likeOpacity);
      };

      function release() {

          if (pullDeltaX >= decisionVal) {
              $card.addClass("to-right");
              approveFn();
          } else if (pullDeltaX <= -decisionVal) {
              $card.addClass("to-left");
              rejectFn();
          }

          if (Math.abs(pullDeltaX) >= decisionVal) {
              $card.addClass("inactive");

              setTimeout(function() {
                  $card.addClass("below").removeClass("inactive to-left to-right");
                  cardsCounter++;
              }, 300);
          }

          if (Math.abs(pullDeltaX) < decisionVal) {
              $card.addClass("reset");
          }

          setTimeout(function() {
              // Smiley faces stuff.
              $card.attr("style", "").removeClass("reset")
                  .find(`.${ID}-product__card__choice`).attr("style", "");

              pullDeltaX = 0;
              animating = false;
          }, 300);
      };

      $(document).on("mousedown touchstart", `.${ID}-product-card:not(.inactive)`, function(e) {
          if (animating) return;

          $card = $(this);
          $cardReject = $(`.${ID}-product__card__choice.m--reject`, $card);
          $cardLike = $(`.${ID}-product__card__choice.m--like`, $card);
          var startX =  e.pageX || e.originalEvent.touches[0].pageX;

          $(document).on("mousemove touchmove", function(e) {
              var x = e.pageX || e.originalEvent.touches[0].pageX;
              pullDeltaX = (x - startX);
              if (!pullDeltaX) return;
              pullChange();
          });

          $(document).on("mouseup touchend", function() {
              $(document).off("mousemove touchmove mouseup touchend");
              if (!pullDeltaX) return; // prevents from rapid click events
              release();
          });
      });
        
    };
  
    bindEvents() {
      const { component } = this;

      const finderStep = component.querySelector(`.${ID}-swiper-wrapper`);
      const startButton = component.querySelector(`.${ID}-button.cta.start`);

      // open intro
      const openFinder = () => {
          component.classList.add(`${ID}-finderActive`);
          document.body.classList.add(`${ID}-noScroll`);
          events.send(`${ID} V${VARIATION}`, 'click', 'get started');
      }

      //close whole finder
      const closeFinder = () => {
        component.classList.remove(`${ID}-finderActive`);
        finderStep.classList.remove(`${ID}-swiper-active`);
        component.querySelector(`.${ID}-swiper-wrapper .${ID}-mainproduct`).innerHTML = '';
        document.body.classList.remove(`${ID}-noScroll`);
        
        clearAllStorage();
      }

      // show the swipable products
      const showSwiperStep = () => {
        finderStep.classList.add(`${ID}-swiper-active`);
      }

      // open and build products
      document.querySelector(`.${ID}-finderBanner`).addEventListener('click', () => {
        clearAllStorage();
        openFinder();
        attributeSetup();
        buildTool(0);
      });

      startButton.addEventListener("click", showSwiperStep);

      const closeIcon = component.querySelectorAll(`.${ID}-finder-close`);
      for (let index = 0; index < closeIcon.length; index += 1) {
          const element = closeIcon[index];
          element.addEventListener('click', () => {
            closeFinder();
          });
      }

    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);
      
    }
  }
