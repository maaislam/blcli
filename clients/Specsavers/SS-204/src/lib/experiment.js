/**
 * SS-204 - Home Page Banner Wording Exclamation Mark
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  const data = {
    '1': {
      title: 'Book your appointment today!',
      button1: 'Book an eye test',
      button2: 'Book a hearing test',
    },
    // '2': {
    //   title: 'Your eye and ear health matters',
    //   button1: 'Book an eye test',
    //   button2: 'Book a hearing test',
    // },
    // '3': {
    //   title: 'Noticed a change in your vision or hearing?',
    //   button1: 'Book an eye test',
    //   button2: 'Book a hearing test',
    // },
    // '4': {
    //   title: 'Caring for your vision & hearing for over 30 years',
    //   button1: 'Book an eye test',
    //   button2: 'Book a hearing test',
    // },
  };

  setup();

  const title = document.querySelector('.sib-home h1');
  const btn1 = document.querySelector('.sib-home .cta-btn-set .cta-btn:first-child');
  const btn2 = document.querySelector('.sib-home .cta-btn-set .cta-btn:last-child');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  
  fireEvent('Conditions Met');

  title.addEventListener('click', e => {
    fireEvent('Click - Title');
  });
  btn1.addEventListener('click', e => {
    fireEvent('Click - Button 1');
  });
  btn2.addEventListener('click', e => {
    fireEvent('Click - Button 2');
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  title.innerHTML = data[VARIATION]['title'];
  btn1.innerHTML = data[VARIATION]['button1'];
  btn2.innerHTML = data[VARIATION]['button2'];
};
