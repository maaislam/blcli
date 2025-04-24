/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import { observer } from '../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

/**
 * Helper get markup
 */
const getMarkup = (podType) => {
  return `
    <div class="is-flex is-align-items-center is-justify-content-space-between ${shared.ID}-wrap">
			<div class="is-flex is-align-items-center is-fullwidth-mobile">

        ${podType == 'wellbeing-pod' ? `

          <span class="is-size-5 is-size-6-mobile has-padding-right-small">£95.00</span>
          <button class="${shared.ID}-add button is-black is-uppercase is-lspaced is-fullwidth-mobile has-text-weight-bold" data-cart-wipe="" data-sticky-btn="">
            <span>Add to Bag</span>
          </button>
          
        ` : `

          <span class="is-size-5 is-size-6-mobile has-padding-right-small">£50.00</span>
          <button class="${shared.ID}-add button is-black is-uppercase is-lspaced is-fullwidth-mobile has-text-weight-bold" data-cart-wipe="" data-sticky-btn="">
            <span>Select Colour</span>
          </button>
        `}
				
			</div>
		</div>
  `;
};

/**
 * Helper get pod type based on url
 */
const getPodType = () => {
  return location.pathname.replace('/pages/', '');
};

/**
 * Handle button clicked for normal pod type
 */
const handleBtnClickNormalPod = () => {
  const btns = document.querySelectorAll(`.${shared.ID}-add`);

  const step1Btn = document.querySelector('.pod-product button.add-product');
  const step2Btn = document.querySelector('.essential-oils.active-carousel .slick-current button.add-product');
  const step3Btn = document.querySelector('.accordion.gift button.add-product');

  const step2Accordion = document.querySelector('.accordion.pod-product + .accordion');
  const step2AccordionToggle = step2Accordion.querySelector('.accordion__toggle');

  if(step1Btn) {
    step1Btn.innerText = 'Add to Bag';

    step1Btn.click();
  }

  [].forEach.call(btns, btn => {
    btn.classList.add(`${shared.ID}-added`);
    btn.querySelector('span').innerText = 'Added';

    setTimeout(() => {
      btn.classList.remove(`${shared.ID}-added`);
      btn.querySelector('span').innerText = 'Add to Bag';
    }, 3000);
  });

  if(step2AccordionToggle) {
    if(!step2AccordionToggle.classList.contains('is-open')) {
      step2AccordionToggle.click();
    }

    setTimeout(() => {
      window.scrollTo({
        top: step2Accordion.getBoundingClientRect().top + window.scrollY - 160,
        behavior: 'smooth'
      });
    }, 200);
  }
};

/**
 * Handle button clicked for mini pod type
 */
const handleBtnClickMiniPod = () => {
  const step1Accordion = document.querySelector('.accordion.pod-product');

  if(step1Accordion) {
    window.scrollTo({
      top: step1Accordion.getBoundingClientRect().top + window.scrollY - 160,
      behavior: 'smooth'
    });
  }

  const stickyCta = document.querySelector('.sticky-cta.is-pods');
  if(stickyCta) {
    stickyCta.parentNode.removeChild(stickyCta);
  }
};

/**
 * Entry point
 */
export default () => {
  setup();

  fireEvent('Did Meet Conditions');

  if(shared.VARIATION == 1) {
    // ----
    // Variation 1 markup
    // ----
    const stickyCta = document.querySelector('.sticky-cta.is-pods');
    if(stickyCta) {
      const markup = getMarkup(getPodType());
      stickyCta.insertAdjacentHTML('afterbegin', markup);
    }
  } else if(shared.VARIATION == 2) {
    // ----
    // Variation 2 markup
    // ----
    const markup = getMarkup(getPodType());

    const benefitsPara = document.querySelector('.reversable-section + h4');
    if(benefitsPara) {
      benefitsPara.insertAdjacentHTML('beforebegin', markup);
    }

    const howItWorks = document.querySelector('.usp + .fact + .reversable-section > .is-size-6');
    if(howItWorks) {
      howItWorks.insertAdjacentHTML('afterend', markup);
    }
  
    // ----
    // They added a CTA to the page, so we scroll to step 2
    // ----
    const primaryCtas = document.querySelectorAll('.pod-info__details .add-product, .pod-product .add-product');
    if(primaryCtas.length && getPodType() == 'wellbeing-pod') {
      [].forEach.call(primaryCtas, primaryCta => {
        primaryCta.addEventListener('click', () => {
          setTimeout(() => {
            const step2Accordion = document.querySelector('.accordion.pod-product + .accordion');
            const step2AccordionToggle = step2Accordion.querySelector('.accordion__toggle');

            if(step2AccordionToggle) {
              if(!step2AccordionToggle.classList.contains('is-open')) {
                step2AccordionToggle.click();
              }

              setTimeout(() => {
                window.scrollTo({
                  top: step2Accordion.getBoundingClientRect().top + window.scrollY - 160,
                  behavior: 'smooth'
                });
              }, 200);
            }
          }, 1000);
        });
      });
    }
  }
  
  // ----
  // Step 2 buttons
  // ----
  setTimeout(() => {
    [].forEach.call(document.querySelectorAll('.accordion.pod-product .add-variant'), btn => {
      if(btn.innerText.match(/add.+collection/i)) {
        btn.innerText = 'Add to Bag';

        observer.connect(btn, (m) => {
          if(btn.innerText.trim().toLowerCase() != 'added') {
            btn.innerText = 'Add to Bag';
          }
        }, {
          throttle: 250,
          config: {
            attributes: true,
            childList: true
          }
        });
      }
    });
    [].forEach.call(document.querySelectorAll('.range__slider .add-product'), btn => {
      if(btn.innerText.match(/add.+routine/i)) {
        btn.innerText = 'Add to Bag';
      }
    });
  }, 1000);

  // ----
  // Handle add click
  // ----
  const btns = document.querySelectorAll(`.${shared.ID}-add`);
  if(btns.length) {
    [].forEach.call(btns, btn => {
      if(getPodType() == 'wellbeing-pod') {
        btn.addEventListener('click', handleBtnClickNormalPod);
      } else if(getPodType() == 'wellbeing-pod-mini') {
        btn.addEventListener('click', handleBtnClickMiniPod);
      }
    });

    // ----
    // Other UI - all pod types and variants
    // ----
    const step1Btn = document.querySelector('.pod-product button.add-product');
    if(step1Btn) {
      step1Btn.innerText = 'Add to Bag';

      observer.connect(step1Btn, () => {
        if(step1Btn.innerText.trim().toLowerCase() != 'added') {
          step1Btn.innerText = 'Add to Bag';
        }
      }, {
        throttle: 250,
        config: {
          attributes: true,
          childList: true
        }
      });

    }
  }
  
};
