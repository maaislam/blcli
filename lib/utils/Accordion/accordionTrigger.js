/* eslint-disable import/prefer-default-export */
import { slideUp, slideDown } from './slideToggle';

export const accordionToggle = () => {
  const accordionContainer = document.querySelectorAll('.accordion-container');
  const activeAccordion = document.querySelector('.accordion-item.active');
  const accordionContent = document.querySelector('.accordion-content');
  if (activeAccordion) {
    activeAccordion.style.display = '';
  }
  if (accordionContent) {
    accordionContent.style.display = '';
  }

  accordionContainer.forEach((item) => {
    item.addEventListener('click', (event) => {
      const yOffset = -125;
      const element = event.currentTarget;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });

      if (event.currentTarget.querySelector('.accordion-item').classList.contains('active')) {
        slideUp(event.currentTarget.querySelector('.accordion-content'), 1000);
        event.currentTarget.querySelector('.accordion-item').classList.remove('active');
      } else {
        event.currentTarget.querySelector('.accordion-item').classList.add('active');
        slideDown(event.currentTarget.querySelector('.accordion-content'), 1000);
      }
    });
  });
};
