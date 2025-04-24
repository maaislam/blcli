/**
 * @desc Markup for all the sections below the fold
 */
import overview from './overview';
import blocks from './blocks';
import contactUSP from './contactUSP';
import mainProduct from './mainProduct';
import { pollerLite } from '../../../../../../../../../lib/uc-lib';

export default () => {
  /**
   * @desc create the main content sections
   */
  const mainContent = () => {
    let sections;
    const header = document.querySelector('.TG103-topContainer');
  sections = ['mainProduct', 'blocks', 'yellowIcons', 'contact', 'overview', 'usps', 'specification', 'article'];

    const belowFold = document.createElement('div');
    belowFold.classList.add('TG103-belowFold_wrapper');

    header.insertAdjacentElement('afterend', belowFold);

    for (let index = 0; index < sections.length; index += 1) {
      const element = sections[index];
      const section = document.createElement('div');
      section.classList.add('TG103-section');
      section.classList.add(`TG103-${element}`);
      section.id = `TG103-${element}`;
      belowFold.append(section);
    }
  };

  const moveNewsroom = () => {
    pollerLite(['.TG040-related-posts'], () => {
      const articleSection = document.querySelector('.TG103-article');
      const TG040News = document.querySelector('.TG040-related-posts');
      articleSection.appendChild(TG040News);
    });
  };

  mainContent();

  /* sections */
  overview();
  blocks();
  contactUSP();
  mainProduct();
  moveNewsroom();
};
