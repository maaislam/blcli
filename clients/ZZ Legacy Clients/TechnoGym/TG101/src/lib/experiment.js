/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import TopContent from './components/topContent';
import BottomContent from './components/bottomContent';
import shared from './shared';
import { createLoader } from './components/loader';

export default () => {
  setup(); 
  const { ID } = shared;

  createLoader();

  // move contact to the header
  const contactSection = document.querySelector('.contact');
  document.querySelector('.header').appendChild(contactSection);

  const topSection = new TopContent();
  const bottomSection = new BottomContent();

  // on click of top content, show the bottom
  const scrollTo = (element) => {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.getBoundingClientRect().top + window.scrollY,
    });
  }
  
  const scrollToBottom = () => {
    scrollTo(document.querySelector(`.${ID}_bottomContent`));
  }
 
  // on button click
  document.querySelector(`.${ID}-download_brochure_link`).addEventListener('click', () => {
    scrollToBottom();
    document.body.style = 'overflow: visible';
  });
  document.querySelector(`.${ID}-anchor_link`).addEventListener('click', () => {
    scrollToBottom();
    document.body.style = 'overflow: visible';
  });
  
};
