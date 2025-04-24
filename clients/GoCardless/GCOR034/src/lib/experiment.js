import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import observeDOM from './files/observeDOM';
import { faqAccordion } from './files/faqAccordion';
import { stickyBanner } from './files/stickyBanner';
import { makeElementSticky } from './files/stickyHandler';
import clickHandler from './files/clickHandler';
import { checkUrls } from './files/checkUrls';

const { ID, VARIATION } = shared;

const init = () => {

  //console.log(`${ID} is working`);

  if (
    document.querySelector(`.${ID}__new-faq-container`) ||
    document.querySelector(`.${ID}__sticky-banner-container`)
  ) {
    document.querySelector(`.${ID}__new-faq-container`).remove();
    document.querySelector(`.${ID}__sticky-banner-container`).remove();
  }

  if (VARIATION == 'control') {
    return;
  }

  setTimeout(() => {

    //if (!document.querySelector(`.${ID}__new-faq-container`) && checkUrls()) {
    if (!document.querySelector(`.${ID}__new-faq-container`)) {

      const navElements = document.querySelectorAll('nav[aria-labelledby="latestPublications"], nav[aria-labelledby="publicationsShowcaseHeader"]');

      if (navElements.length > 0) {
        navElements.forEach((element) => {
          element.insertAdjacentHTML("beforebegin", faqAccordion(ID));
        });
      }

      document.querySelector('main article>div').insertAdjacentHTML("beforeend", stickyBanner(ID));

      makeElementSticky(`.${ID}__sticky-banner-container`);

      document.querySelector(`.${ID}__sticky-banner-container`)
        .addEventListener("click", () => {

          document.querySelector(`.${ID}__new-faq-container`)
            .scrollIntoView();
          window.scrollBy(0, -50);

          document.querySelector(`.${ID}__sticky-banner-container`)
            .classList.add('clicked-once');

        });
      document.querySelector(`.${ID}__sticky-banner-cross-icon`).addEventListener("click", () => {
        document.querySelector(`.${ID}__sticky-banner-container`)
          .classList.add('hide');
      });

      function handleIntersection(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            //console.log('Element is in viewport!');
            document.querySelector(`.${ID}__sticky-banner-container`).classList.add('faq-visible');
          } else {
            //console.log('Element is NOT in viewport.');
            document.querySelector(`.${ID}__sticky-banner-container`).classList.remove('faq-visible');
          }
        });
      }

      const myElement = document.querySelector('.GCOR034__new-faq-container');
      const observer = new IntersectionObserver(handleIntersection);
      observer.observe(myElement);


      const accordionItems = document.querySelectorAll('.faq-content');
      accordionItems.forEach(item => {

        const header = item.querySelector('.content-header');
        const content = item.querySelector('.content-body');

        header.addEventListener('click', () => {
          const isActive = content.classList.contains('active');
          // Close all open tabs
          accordionItems.forEach(item => {
            const itemContent = item.querySelector('.content-body');
            itemContent.style.maxHeight = 0;
            itemContent.classList.remove('active');
            item.classList.remove('active');
          });
          // Expand the clicked tab
          if (!isActive) {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.classList.add('active');
            item.classList.add('active');
          }
        });
      });
    }
  }, 1500);

};

export default () => {
  setup();
  fireEvent('Conditions Met');
  init();
  observeDOM('body', init);
  document.body.addEventListener('click', clickHandler);
};