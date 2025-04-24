import settings from '../../settings';
import scrollToElement from './scrollTo';

export default () => {
  const { ID } = settings;

  const typeLinks = document.querySelectorAll(`.${ID}-categoryLink`);
  for (let index = 0; index < typeLinks.length; index += 1) {
    const element = typeLinks[index];
    const sectionLink = element.getAttribute('cat-target');
    element.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToElement(document.querySelector(sectionLink));
    });
  }
};
