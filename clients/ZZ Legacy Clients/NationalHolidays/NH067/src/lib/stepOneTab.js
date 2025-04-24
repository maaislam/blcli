import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import NH067_content from './NH067_content';
import queryData from './queryData';

export default () => {
  const stepOneOptions = document.querySelectorAll('.NH067-options__step1 .NH067-option');
  [].forEach.call(stepOneOptions, (option) => {
    const optionId = option.id;
    const button = option.querySelector('.button');
    if (optionId && button) {
      button.addEventListener('click', () => {
        const queryParam = NH067_content[`${optionId}`];
        queryData.category = queryParam;

        // Button Selected
        const stepOneSelected = document.querySelector('.NH067-option .button.selected');
        if (stepOneSelected) {
          stepOneSelected.classList.remove('selected');
        }
        button.classList.add('selected');

        // Proceed to Step 2
        document.querySelector('#NH067-inspireMe__step1').classList.remove('active');
        document.querySelector('#NH067-inspireMe__step2').classList.add('active');
        document.querySelector('.NH067-steps .step2').classList.add('active');
      });
    }
  });
};