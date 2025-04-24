import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import NH067_content from './NH067_content';
import queryData from './queryData';

export default () => {
  const stepTwoOptions = document.querySelectorAll('.NH067-options__step2 .NH067-option');
  [].forEach.call(stepTwoOptions, (option) => {
    const optionId = option.id;
    if (optionId) {
      option.addEventListener('click', () => {
        if (optionId === 'asapOption') {
          Date.prototype.addMonths = function (m) {
            var d = new Date(this);
            var years = Math.floor(m / 12);
            var months = m - (years * 12);
            if (years) d.setFullYear(d.getFullYear() + years);
            if (months) d.setMonth(d.getMonth() + months);
            return d;
          }

          const minDate = new Date().toISOString().slice(0,10);
          const maxDate = new Date().addMonths(2).toISOString().slice(0,10);

          queryData.minDate = minDate;
          queryData.maxDate = maxDate;
        } else if (optionId === 'easterOption') {
          const minDate = new Date().toISOString().slice(0,10);
          const maxDate = '2019-04-28';
          queryData.minDate = minDate;
          queryData.maxDate = maxDate;
        } else if (optionId === 'summerOption') {
          const minDate = '2019-05-01';
          const maxDate = '2019-09-30';
          queryData.minDate = minDate;
          queryData.maxDate = maxDate;
        }

        // Option Selected
        const stepTwoSelected = document.querySelector('.NH067-options__step2 .NH067-option.selected');
        if (stepTwoSelected) {
          stepTwoSelected.classList.remove('selected');
        }
        option.classList.add('selected');

        // Proceed to Step 3
        document.querySelector('#NH067-inspireMe__step2').classList.remove('active');
        document.querySelector('#NH067-inspireMe__step3').classList.add('active');
        document.querySelector('.NH067-steps .step3').classList.add('active');
      });
    }
  });
};