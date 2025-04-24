/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import viewElement from './components/viewElement';

const { ID, VARIATION } = shared;

const toggleView = (clickedElement, removeClass, addClass, text) => {
  const paragraph = document.querySelector('.hero-banner--category p.intro');
  paragraph.classList.toggle(`${ID}__text-hide`);
  const textElement = clickedElement.querySelector(`.${ID}__text`);
  textElement.textContent = text;
  clickedElement.classList.remove(removeClass);
  clickedElement.classList.add(addClass);
};

const init = () => {
  const bannerElement = document.querySelector('.hero-banner--category');
  const bannerParagraph = bannerElement.querySelector('p.intro');
  bannerParagraph.classList.add(`${ID}__text-hide`);

  if (!document.querySelector(`.${ID}__viewElement`)) {
    bannerParagraph.insertAdjacentHTML('afterend', viewElement(ID));
  }
};

export default () => {
  setup();

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.${ID}__viewElement.${ID}__more`)) {
      fireEvent('User interacts with view more cta on mobile');
      const clickedElement = target.closest(`.${ID}__viewElement`);
      toggleView(clickedElement, `${ID}__more`, `${ID}__less`, 'View less');
    } else if (target.closest(`.${ID}__viewElement.${ID}__less`)) {
      fireEvent('User interacts with view less cta on mobile');
      const clickedElement = target.closest(`.${ID}__viewElement`);
      toggleView(clickedElement, `${ID}__less`, `${ID}__more`, 'View more');
    } else if (target.closest('.category-selector__list li')) {
      const clickedElement = target.closest('.category-selector__list li');
      const categoryName = clickedElement.querySelector('a').textContent;
      fireEvent(`User interacts with category links - ${categoryName}`);
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  init();
};
