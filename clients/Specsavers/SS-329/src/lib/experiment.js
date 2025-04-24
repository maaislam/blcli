/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { elementIsInView } from '../../../../../lib/utils';
import { checkIntersection } from '../../../../../evelyn/scrolling';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

/**
 * Helper function insert button
 */
const render = () => {
  const ctaDiv = document.querySelector(".cta-btn-set");
  const ctaButtons = ctaDiv.querySelectorAll('.cta-btn');

  // ---------
  // Tracking
  // ---------
  [].forEach.call(ctaButtons, b => {
    b.addEventListener("click", (e)=>{
      fireEvent(`Click CTA - ${e.target.textContent}`)
    })
  });

  // Hero content
  if(VARIATION != 'control') {
    const caption = document.querySelector('.sib-home h1 + p');
    if(caption) {
      caption.innerText = 'With complete glasses from £19';
    }
  }

  // Why choose
  const content = [
    [
      '850 local nationwide businesses',
      'https://content.specsavers.com/sib/img/icons/localstores.svg',
      'Find your store',
      'https://www.specsavers.co.uk/book/location',
    ],
    [
      'Advanced OCT eye tests',
      'https://content.specsavers.com/sib/img/icons/eyecare.svg',
      'Find out more',
      'https://www.specsavers.co.uk/eye-health/oct-scan',
    ],
    [
      'Free contact lens trial',
      'https://ucds.ams3.digitaloceanspaces.com/SS-329/cl.svg',
      'Find out more',
      'https://www.specsavers.co.uk/offers/try-contact-lenses-free',
    ],
    [
      '2 for 1 from £69',
      'https://ucds.ams3.digitaloceanspaces.com/SS-329/2for1.svg',
      'Find out more',
      'https://www.specsavers.co.uk/offers/2-for-1-glasses-from-gbp69',
    ],
  ];

  const ctaCardsWrap = document.querySelector('[data-module="cta-cards"]'); 
  const ctaCards = document.querySelectorAll('[data-module="cta-cards"] .carousel-cell');

  if(ctaCardsWrap) {
    if(elementIsInView(ctaCardsWrap)) {
      fireEvent('In View Cards', true);
    } else {
      checkIntersection(ctaCardsWrap).then(e => {
        fireEvent('In View Cards', true);
      });
    }
  }

  [].forEach.call(ctaCards, (card, idx) => {
    const a = card.querySelector('.description > p');
    const b = card.querySelector('.icon img');
    const c = card.querySelector('.description span span');

    if(VARIATION != 'control') {
      a.innerText = content[idx][0];
      b.setAttribute('src', content[idx][1]);
      c.innerText = content[idx][2];
      card.setAttribute('href', content[idx][3]);
    }

    card.addEventListener('click', e => {
      fireEvent('Click Card - ' + a.innerText);
    });

  });

};

export default () => {

  setup();

  fireEvent('Conditions Met');

  render();
};
