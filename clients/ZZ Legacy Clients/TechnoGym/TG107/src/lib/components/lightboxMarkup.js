import shared from "../shared"
import Lightbox from "./lighboxModal";
import journey, { __ } from "../helpers";



const { ID } = shared;

export default () => {


    const lightbox = new Lightbox(ID, {
        content: 
          `<div class="${ID}-lightbox_inner">
            <div class="${ID}_progressBar"> 
              <div class="${ID}-progress-inner">
                <div class="${ID}-step ${ID}-package ${ID}-step_active">
                  <span></span>
                  <p>${__('Packages')}</p>
                </div>
                <div class="${ID}-step ${ID}-classes">
                  <span></span>
                  <p>${__('Classes')}</p>
                </div>
                <div class="${ID}-step ${ID}-accessories">
                  <span></span>
                  <p>${__('Accessories')}</p>
                </div>
              </div>
            </div>
            <div class="${ID}_selectedWrapper"> 
                <p>Selected:</p>
                <div class="${ID}-selectedOptions"></div>
                </div>
            <div class="${ID}_selectionBoxes"></div>
          </div>`,
      });


      // remove all the active classes on elements and restart the box
      const resetBox = () => {

        const selectedOptions = document.querySelector(`.${ID}_selectedWrapper.${ID}-show`);
        if(selectedOptions) {
          selectedOptions.classList.remove(`${ID}-show`);
          selectedOptions.querySelector(`.${ID}-selectedOptions`).innerHTML = '';
        }

        const activeBoxes = document.querySelector(`.${ID}-optionBox_wrapper.${ID}_options-active`);
        if(activeBoxes) {
          activeBoxes.classList.remove(`${ID}_options-active`);
        }
      
        const activeBox = document.querySelectorAll(`.${ID}_box.${ID}-box_active`);
        if(activeBox) {
          for (let index = 0; index < activeBox.length; index += 1) {
            const element = activeBox[index];
            element.classList.remove(`${ID}-box_active`);
          }
        }

        const activeStep = document.querySelector(`.${ID}-step.${ID}-step_active`);
        if(activeStep) {
          activeStep.classList.remove(`${ID}-step_active`);
        }

        const allSteps =  document.querySelector(`.${ID}_progressBar`);
        if(allSteps.classList.contains(`${ID}-accessories_hide`)){
          allSteps.classList.remove(`${ID}-accessories_hide`);
        }
        journey.length = 0;
      }

      // on close of the box, reset it

      const lightboxClose = document.querySelector(`.${ID}_Lightbox__close`);
      const lightboxOverlay = document.querySelector(`.${ID}_Lightbox__overlay`);

      lightboxClose.addEventListener('click', () => {
        resetBox();
      });

      lightboxOverlay.addEventListener('click', () => {
        resetBox();
      });
}

export const activeProgressStage = () => {

  const activeJourneyLength = journey.length;
  // remove all active steps
  const allSteps = document.querySelectorAll(`.${ID}_progressBar .${ID}-step`);
  for (let index = 0; index < allSteps.length; index += 1) {
      const element = allSteps[index];

      // if on the first one, remove any that say complete
      if(activeJourneyLength === 0) {
          element.classList.remove(`${ID}-step_complete`);
          element.classList.remove(`${ID}-step_active`);
      }

      // remove any that are active or complete
      if(element.classList.contains(`${ID}-step_active`)) {            
          element.classList.remove(`${ID}-step_active`);
      }
  }

  const stepToMakeActive = document.querySelectorAll(`.${ID}_progressBar .${ID}-step`)[activeJourneyLength];
  
  //if the user goes back, remove complete class
  if(stepToMakeActive) {
      if(stepToMakeActive.classList.contains(`${ID}-step_complete`)) {
          stepToMakeActive.classList.remove(`${ID}-step_complete`);
      }

      stepToMakeActive.classList.add(`${ID}-step_active`);

      // make the previous one complete
      if(stepToMakeActive.previousElementSibling) {
          stepToMakeActive.previousElementSibling.classList.add(`${ID}-step_complete`);
      }
  }
}  




