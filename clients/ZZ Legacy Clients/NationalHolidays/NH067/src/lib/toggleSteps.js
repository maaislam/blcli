import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import settings from './settings';

export default () => {
  const steps = document.querySelectorAll('.NH067-steps .step');

  [].forEach.call(steps, (step) => {
    step.addEventListener('click', () => {
      const currentlyActiveStepContent = document.querySelector('.NH067-step.active');
      if (currentlyActiveStepContent) {
        currentlyActiveStepContent.classList.remove('active');
      }
      
      if (step.classList.contains('step1')) {
        document.querySelector('#NH067-inspireMe__step1').classList.add('active');
        // Deactivate step 2 and step 3 bullet
        document.querySelector('.NH067-steps .step2').classList.remove('active');
        document.querySelector('.NH067-steps .step3').classList.remove('active');
      } else if (step.classList.contains('step2')) {
        document.querySelector('#NH067-inspireMe__step2').classList.add('active');
        step.classList.add('active');
        // Deactivate step 3 bullet
        document.querySelector('.NH067-steps .step3').classList.remove('active');
      } else if (step.classList.contains('step3')) {
        document.querySelector('#NH067-inspireMe__step3').classList.add('active');
        document.querySelector('.NH067-steps .step2').classList.add('active');
        step.classList.add('active');
      } 
    });
    
  });
};