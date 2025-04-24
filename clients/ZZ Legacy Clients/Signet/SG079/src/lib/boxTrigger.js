import shared from "./shared";
import { events } from "../../../../../lib/utils";
import { getSiteFromHostname } from "./services";

const { ID, VARIATION } = shared;

export default () => {

    const addBanner = () => {
        const topBanner = document.createElement('div');
        topBanner.classList.add(`${ID}-engagementBanner`);
        topBanner.innerHTML = `
        <div class="${ID}-container">
            <div class="${ID}__colLeft">
            <div class="${ID}__blockInner">
                <div class="${ID}-blockBack">
                    <div class="${ID}__block"></div>
                </div>
            </div>
            </div>
            <div class="${ID}__colRight">
                <h3>Looking for the perfect ring?</h3>
                <p>Our ring finder will help you narrow down your search and help you find that perfect ring for the perfect proposal.</p>
                <div class="${ID}-button">Ring Finder</div>
            </div>
        `;
       

        document.querySelector('#js-header').insertAdjacentElement('afterend', topBanner);
    }

    const addInGrid = () => {
        const inGridBanner = document.createElement('div');
        inGridBanner.className = `${ID}-inGrid product-tile-list__item`;
        inGridBanner.innerHTML = `
        <div class="${ID}-container">
          <div class="${ID}-image"></div>
          <div class="${ID}-wrapper">
            <div class="${ID}-inGrid-content">
              <div class="${ID}-icon"></div>
              <h3>Find your perfect ring</h3>
              <p>Our ring finder will help you find that perfect ring.</p>
              <div class="${ID}-button">Ring Finder</div>
            </div>
          </div>
        </div>`

        document.querySelectorAll('.product-tile-list__item')[3].insertAdjacentElement('afterend', inGridBanner);
    }


    const removeAllActiveAnswers = () => {

        const questionsActive = document.querySelectorAll(`.${ID}-options.${ID}-question.${ID}-question--active`);
        if(questionsActive) {
            for (let i = 0; i < questionsActive.length; i += 1) {
                const element = questionsActive[i];
                element.classList.remove(`${ID}-question--active`);
            }
        }

        // remove all the active answers
        const answersActive = document.querySelectorAll(`.${ID}-innerOptions .${ID}-answer--selected`);
        if(answersActive) {
            for (let x = 0; x < answersActive.length; x += 1) {
                const element = answersActive[x];
                element.classList.remove(`${ID}-answer--selected`);
            }
        }

        // remove all classes from the steps
       const activeSteps = document.querySelectorAll(`.${ID}-steps .${ID}-step`);
       for (let index = 0; index < activeSteps.length; index += 1) {
           const element = activeSteps[index];

           if(element.classList.contains(`${ID}-step--complete`)) {
               element.classList.remove(`${ID}-step--complete`);
           }
           if(element.classList.contains(`${ID}-step--active`)) {
               element.classList.remove(`${ID}-step--active`);
           }
       }
    }
    const triggerFinder = () => {
        const finderBox = document.querySelector(`.${ID}-finderBox-wrapper`);
        
        document.body.classList.add(`${ID}-noScroll`);
        finderBox.classList.add(`${ID}_boxActive`);
        finderBox.querySelector(`.${ID}-step.${ID}-question1`).classList.add(`${ID}-step--active`);
        finderBox.querySelector(`.${ID}-options.${ID}-question1`).classList.add(`${ID}-question--active`);
    }

    const closeFinder = () => {

        const finderBox = document.querySelector(`.${ID}-finderBox-wrapper`);
        
        removeAllActiveAnswers();

        document.body.classList.remove(`${ID}-noScroll`);

        document.querySelector(`.${ID}-finderBox-wrapper`).classList.remove(`${ID}_boxActive`);
        
        if(finderBox.querySelector(`.${ID}-step.${ID}-step--active`)) {
            finderBox.querySelector(`.${ID}-step.${ID}-step--active`).classList.remove(`${ID}-step--active`);
        }
        if(finderBox.querySelector(`.${ID}-step.${ID}-step--active`)) {
            finderBox.querySelector(`.${ID}-step.${ID}-step--active`).classList.remove(`${ID}-step--active`);
        }
        //if(window.innerWidth >= 1024) {
          //  document.querySelector(`.${ID}-finderBox-wrapper`).style.top = 'unset';
        //} 
    }

    const openCloseEvents = () => {
        document.querySelector(`.${ID}-button`).addEventListener('click', () => {
            triggerFinder(); 

            events.send(`${ID} variation:${VARIATION}`, 'click', 'ring finder in banner');
        });

        if(VARIATION === '1') {
            document.querySelector(`.${ID}-inGrid-content .${ID}-button`).addEventListener('click', () => {
                triggerFinder();
                events.send(`${ID} variation:${VARIATION}`, 'click', 'ring finder in grid');
            });
        }

        const finderBox = document.querySelector(`.${ID}-finderBox-wrapper`);
        finderBox.querySelector(`.${ID}-closeFinder`).addEventListener('click', () => {
            document.querySelector(`.${ID}-finderBox-wrapper`).removeAttribute('style');
            closeFinder();
            events.send(`${ID} variation:${VARIATION}`, 'click', 'closed ring finder');
        });
    }

    if(VARIATION === '1') {
        addInGrid();      
    } else if(VARIATION === '2') {
        addBanner();  
    }
    openCloseEvents();
}
