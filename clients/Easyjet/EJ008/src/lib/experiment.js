/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
// uncomment this line if you want to work on v2, comment it when putting code into the platform
// as the siema plugin takes the character limit over for G optimize.
//import Siema from 'siema';

const { ID, VARIATION } = shared;
let mySiema = null;

const RemoveExperiment = () => {

  document.documentElement.classList.remove(`${ID}-experiment-active`);

  if(VARIATION == 1) 
  {

    let allUpdatedCards       = document.querySelectorAll(`.${ID}-updated-fare-card`);
    allUpdatedCards.forEach((card) => 
    {
      card.querySelector('.fare-benefit').classList.remove(`${ID}--fare-benefit--displayed`);
      card.classList.remove(`${ID}-updated-fare-card--expanded`);
    });

    let allCurrBenefitToggles  = document.querySelectorAll(`.${ID}-benefit-toggle`);
    if (allCurrBenefitToggles.length > 0) 
    {
      allCurrBenefitToggles.forEach((toggle) => 
      {
        toggle.remove();
      });
    }

  }

  if(VARIATION == 2) 
  {

    let allCardHolders  = document.querySelectorAll(`.${ID}-select-fare-cards`);
    let allDotHolders   = document.querySelectorAll(`.${ID}-carousel-dots`);

    allCardHolders.forEach((cardHolder) => 
    {
      cardHolder.remove();
    });

    allDotHolders.forEach((dotHolder) => {

      dotHolder.remove();
    });
    mySiema?.destroy(false);
  }
  

}

const StartExperiment = () => 
{

  pollerLite(['.select-fare-type-modal-cards > .fare-card-outer-wrapper'], () => 
  {

    document.documentElement.classList.add(`${ID}-experiment-active`);
    let allFareCards = document.querySelectorAll('.select-fare-type-modal-cards > .fare-card-outer-wrapper');
    if(VARIATION == 1) 
    {
        
        document.querySelector('.select-fare-type-modal-cards').classList.add(`${ID}-updated-fare-cards`);

        allFareCards.forEach((fareCard) => 
        {
          let fareCardType    = fareCard.querySelector('.fare-heading').innerText.toLowerCase();
          let allFareBenefits = fareCard.querySelectorAll('.fare-benefit');
          allFareBenefits.forEach((benefit) => 
          {
            if (fareCardType == 'standard') 
            {
              if (benefit.innerText.indexOf('small under seat cabin bag') > -1) 
              {
                benefit.classList.add(`${ID}-fare-benefit--displayed`);
                benefit.classList.add(`${ID}-underseatcabinbag`);
              }
            } else if (fareCardType == "standard plus") 
            {
              if (benefit.innerText.indexOf('large cabin bag') > -1) 
              {
                benefit.classList.add(`${ID}-fare-benefit--displayed`);
                benefit.classList.add(`${ID}-largecabinbag`);
              }
            } else if (fareCardType == "essentials") 
            {
              if (benefit.innerText.indexOf('hold bag') > -1) 
              {
                benefit.classList.add(`${ID}-fare-benefit--displayed`);
                benefit.classList.add(`${ID}-holdbag`);
              }
            }
          });

          fareCard.classList.add(`${ID}-updated-fare-card`);
          let allBenefits   = fareCard.querySelectorAll('.fare-benefit');
          let benefitCount  = allBenefits.length;

          if (benefitCount > 1) 
          {
            fareCard.querySelector('.fare-card__body').insertAdjacentHTML(`afterend`, `
              <button class="${ID}-benefit-toggle" data-action="hide" data-benefitcount="${benefitCount - 1}">
                View ${benefitCount - 1} more benefit${benefitCount - 1 > 1 ? `s` : ``}
              </button>
            `);
          }
        });
          
    } 
    else if(VARIATION == 2)
    {      
      
      setTimeout(() => {

        document.querySelector('.select-fare-type-modal-cards').classList.add(`${ID}-updated-fare-cards`);

        let allFareCards = document.querySelectorAll(`.${ID}-updated-fare-cards > .fare-card-outer-wrapper`);
        let fareCardsLength = allFareCards.length;
        let maxHeight = 0;

        document.querySelector('.select-fare-type-modal-cards').insertAdjacentHTML('afterend', `
        
          <div class="${ID}-select-fare-cards select-fare-type-modal-cards">
          
          </div>

        `);

        allFareCards.forEach((fareCard) => 
        {
          if(fareCard.offsetHeight > maxHeight) 
          {
            maxHeight         = fareCard.offsetHeight;
          }
          let dupeFareCard    = fareCard.cloneNode(true);
          dupeFareCard.classList.add(`${ID}-farecard--carouselitem`);
          document.querySelector(`.${ID}-select-fare-cards`).insertAdjacentElement('beforeend',dupeFareCard);
        });

        let allDupeFareCards   = document.querySelectorAll(`.${ID}-select-fare-cards > .fare-card-outer-wrapper`);
        allDupeFareCards.forEach((fareCard) => 
        {
          fareCard.removeAttribute('ng-repeat');
          fareCard.querySelector('.ej-button').removeAttribute('ng-click');
          if(!fareCard.classList.contains(`.${ID}-farecard--carouselitem`)) 
          {
            fareCard.classList.add(`${ID}-farecard--carouselitem`);
            if (!fareCard.querySelector('.fare-recommendation')) 
            {
              fareCard.classList.add(`${ID}-farecard--carouselitem--norec`);
            }
            fareCard.style.width = `${window.outerWidth}px`; 
          }
        });

        let carouselDots = document.createElement('div');
        carouselDots.classList.add(`${ID}-carousel-dots`);

        for (let i = 0; i < fareCardsLength; i++) 
        {
          let dot = document.createElement('a');
          dot.classList.add(`${ID}-carousel-dot`);
          dot.setAttribute('data-slide', i);
          if (i == 0) 
          {
            dot.classList.add(`${ID}-carousel-dot--active`);
          }
          carouselDots.appendChild(dot);
        }

        document.querySelector(`.${ID}-select-fare-cards`).insertAdjacentElement('afterend', carouselDots);

      
        mySiema = new Siema(
        {
          selector: `.${ID}-select-fare-cards`,
          perPage: 1,
          startIndex: 0,
          loop: false,
          draggable: true,
          onChange: () => 
          {
            fireEvent(`Interaction - carousel slide changed`, true);
            document.querySelectorAll(`.${ID}-carousel-dot`).forEach((dot) => 
            {
              dot.classList.remove(`${ID}-carousel-dot--active`);
            });
            document.querySelector(`.${ID}-carousel-dot[data-slide="${mySiema.currentSlide}"]`).classList.add(`${ID}-carousel-dot--active`);
          },
          
        });

        mySiema.goTo(0);
      }
      ,500);

    }
  
  });

}

export default () => 
{

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') 
  {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
  if(window.outerWidth < 670) 
  {

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      // do nothing
    } else {
      RemoveExperiment();
      StartExperiment();
    }
    
    

    window["angularEjRootScope"].$on(AngularEj.Events.Names.Funnel.PickFlights.SelectFareTypeModal.Opened, (params, options) => 
    {

      pollerLite(
        [
          () => {

            

            let cardsRegenerated = false;

            if (document.querySelector(`.${ID}-underseatcabinbag`) == null || document.querySelector(`.${ID}-largecabinbag`) == null || document.querySelector(`.${ID}-holdbag`) == null) {
              cardsRegenerated = true;
              
            }

            if (cardsRegenerated == true) {

              return true;
              
            }

          }
        ],
        () => {

          pollerLite([
            () => {

              let allFareCards = document.querySelectorAll(`.${ID}-updated-fare-cards > .fare-card-outer-wrapper`);
              let fareCardsLengthUpdate = allFareCards.length;
              let allFareCardsReady = new Array(fareCardsLengthUpdate).fill(false);
              
              allFareCards.forEach((card, index) => {

                let heading = card.querySelector('.fare-heading').innerText.toLowerCase();

                if(heading == 'standard') {
                  if (card.innerText.indexOf('small under seat cabin bag') > -1) {
                    allFareCardsReady[index] = true;
                  }
                }
                if(heading == 'standard plus') {
                  if (card.innerText.indexOf('large cabin bag') > -1) {
                    allFareCardsReady[index] = true;
                  }
                }
                if(heading == 'essentials') {
                  if (card.innerText.indexOf('hold bag') > -1) {
                    allFareCardsReady[index] = true;
                  }
                }
              });

              if(allFareCardsReady.every((card) => card == true)) {
                return true;
              }

            }
          ], () => {
              
            RemoveExperiment();
            StartExperiment();
  
          });

        })
      
      
      
      
    });

    if(VARIATION == 1) 
    {
      document.body.addEventListener('click', (e) => 
      {

        if (e.target.classList.contains(`${ID}-benefit-toggle`)) 
        {

          if (e.target.getAttribute('data-action') == 'hide') 
          {

            let currCardTitle   = e.target.closest(`.${ID}-updated-fare-card`).querySelector(`.fare-heading`).innerText;
            let numBenefits     = e.target.getAttribute('data-benefitcount');
            e.target.closest(`.${ID}-updated-fare-card`).classList.add(`${ID}-updated-fare-card--expanded`);
            fireEvent(`Click - benefits ${currCardTitle} toggle clicked on to show the benefits`, true);
            e.target.innerHTML  = `Hide ${numBenefits} benefits`;
            e.target.setAttribute('data-action', 'show');
          }
          else 
          {

            let currCardTitle   = e.target.closest(`.${ID}-updated-fare-card`).querySelector(`.fare-heading`).innerText;
            let numBenefits     = e.target.getAttribute('data-benefitcount');
            e.target.closest(`.${ID}-updated-fare-card`).classList.remove(`${ID}-updated-fare-card--expanded`);
            fireEvent(`Click - benefits ${currCardTitle} toggle clicked on to hide the benefits`, true);
            e.target.innerHTML  = `View ${numBenefits} more benefits`;
            e.target.setAttribute('data-action', 'hide');
          }

        }

        if (e.target.classList.contains('modal-close-button') || e.target.closest('.modal-close-button')) 
        {

          RemoveExperiment();

        }
      });
    } else if (VARIATION == 2) {
      
      document.body.addEventListener('click', (e) => 
      {

        if (e.target.classList.contains(`${ID}-carousel-dot`)) 
        {

          let slide = e.target.getAttribute('data-slide');
          mySiema.goTo(slide);
          fireEvent('Click - carousel dot clicked to go to slide ' + slide, true);
          document.querySelectorAll(`.${ID}-carousel-dot`).forEach((dot) => 
          {
            dot.classList.remove(`${ID}-carousel-dot--active`);
          });
          e.target.classList.add(`${ID}-carousel-dot--active`);
        }

        if (e.target.classList.contains('modal-close-button') || e.target.closest('.modal-close-button')) 
        {

          RemoveExperiment();      

        }

        if (e.target.classList.contains('ej-button') && e.target.closest('.fare-card-outer-wrapper')) 
        {
          
          let fareType = e.target.closest('.fare-card-outer-wrapper').querySelector('.fare-heading').innerText.trim().toLowerCase().replaceAll(' ', '-');
          let allHeadings = document.querySelectorAll(`.${ID}-updated-fare-cards .fare-heading`);

          allHeadings.forEach((heading) => 
          {
            if (heading.innerText.trim().toLowerCase().replaceAll(' ', '-') == fareType) 
            {
              heading.closest('.fare-card-outer-wrapper').querySelector('.ej-button').click();
            }
          });
        }
      });

    }
    
  
  }

  // check if phone has been rotated
  window.addEventListener('orientationchange', () =>
  {
    setTimeout(() => 
    {
      if (window.outerWidth < 670) 
      {
        if(VARIATION == 2) 
        {
          StartExperiment();
        }
        document.documentElement.classList.add(`${ID}-experiment-active`);
      } 
      else 
      {
        if(VARIATION == 2) 
        {
          mySiema.destroy(true, () => 
          {
            document.querySelector(`.${ID}-carousel-dots`).remove();
          });
          
        }
        document.documentElement.classList.remove(`${ID}-experiment-active`);
      }
    }, 500);
    
  });
  
}
