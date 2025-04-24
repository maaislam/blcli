import { events } from '../../../../../../lib/utils';

export default () => {
  const newSizes = {
    'Extra Extra Large': 'XXL, 15.5"',
    Large: 'Large, 13.5"',
    Medium: 'Medium, 11.5"',
    Small: 'Small, 9.5"',
  };

  const dropdowns = document.querySelectorAll('.variationDropDown option');
  for (let index = 0; index < dropdowns.length; index += 1) {
    const element = dropdowns[index];
    const sizeRegex = /(Extra Extra Large|Large|Medium|Small)/g;
    /* eslint-disable */
    for(const title in newSizes) {
      if (element.textContent.match(title)) {
        if (element.textContent.indexOf('",') === -1) {
          element.textContent = element.textContent.replace(sizeRegex, newSizes[title]);
          element.parentNode.addEventListener('click', () => { 
            events.send('PJ053', 'Clicked', 'A pizza size', { sendOnce: true});
          });
        }
      }
    }
  }
};
