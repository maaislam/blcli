/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  const allTracking = () => {

    // CTAs
    document.querySelector('#blueButtonOrderNow').addEventListener('click', (e) => {
      const buttonText = e.currentTarget.textContent;
      fireEvent('Clicked CTA ' + buttonText);
    });

    const allWhiteButtons = document.querySelectorAll('[class^="styles-module__transparentButton"]');
    for (let index = 0; index < allWhiteButtons.length; index++) {
      const element = allWhiteButtons[index];
      element.addEventListener('click', (e) => {
        const buttonText = e.currentTarget.textContent;
        fireEvent('Clicked CTA ' + buttonText);
      }); 
    }

    const blocks = document.querySelectorAll('[class^="styles__grid"] [class^="styles__labelledIcon"]');

    const addOrderNow = () => {
     
      const orderButton = `<div class="${ID}-order"><div class="${ID}-cta">Order now</div></div>`;
      document.querySelector('.modal-content').insertAdjacentHTML('beforeend', orderButton);

      document.querySelector(`.${ID}-order .${ID}-cta`).addEventListener('click', () => {
        document.querySelector('#blueButtonOrderNow').click();
      });
    }

    for (let index = 0; index < blocks.length; index++) {
      const element = blocks[index];
      element.addEventListener('click', () => {
        fireEvent('Click one of the squares');
        pollerLite(['.modal-content .modal-body'], () => {
          if(VARIATION !== 'control') {
            addOrderNow();
          }
        });
      
      });
    }

  }

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    allTracking();
  } else {

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...


    const changeHeading = () => {
      const heading = document.querySelector('[class^="styles__container"] [class^="styles__content"] h1');
      heading.parentNode.classList.add(`${ID}-logo`);
      const headingtext = document.querySelector("[class^=styles__subheading]");
      headingtext.textContent = 'Order NHS repeat prescriptions securely for yourself, your family or loved ones.';

    }

    const addSmallText = () => {
      const subtext = `<span>This service is unsuitable for urgent prescriptions. If you need medication straight away, please contact your GP, visit your local pharmacy, or call NHS 111.</span>`;
      document.querySelector('[class^="styles__copy"]').insertAdjacentHTML('beforeend', subtext);
    }

   

    const changeCTAS = () => {
      let orderText;
      let loginText;

      if(VARIATION === '2') {
        orderText = 'Sign up & order';
        loginText = 'Login & Reorder';
      }

      if(VARIATION === '3') {
        orderText = "I'm new";
        loginText = "I've ordered before";
      }

      document.querySelector('#blueButtonOrderNow').childNodes[1].nodeValue = orderText;
      document.querySelector('[class^="styles-module__transparentButton"]').childNodes[1].nodeValue = loginText;
      

      // bottom ctas
      
      document.querySelectorAll('[class^="styles__callToActions"] [class^="styles-module__transparentButton"]')[0].childNodes[1].nodeValue = orderText;
      document.querySelectorAll('[class^="styles__callToActions"] [class^="styles-module__transparentButton"]')[1].childNodes[1].nodeValue = loginText;
      
    }

    const changeIcons = () => {
      const clickCollect = document.querySelector('[class^="styles__labelledIcon"] img[alt^="Click and collect"]');
      const delivery = document.querySelector('[class^="styles__labelledIcon"] img[alt^="Free"]');
      const GP = document.querySelector('[class^="styles__labelledIcon"] img[alt^="Access"]');
      const reminder = document.querySelector('[class^="styles__labelledIcon"] img[alt^="Reminders"]');
      const infoIcon = document.querySelector('[class^="styles__infoBox"] img');
      const faqIcon =  document.querySelector('[class^="styles__faqContainer"] img');
    

      clickCollect.setAttribute('src', 'https://boots.scene7.com/is/image/Boots/shop?scl=1&fmt=png-alpha');
      delivery.setAttribute('src', 'https://boots.scene7.com/is/image/Boots/Standard%2DDelivery?scl=1&fmt=png-alpha');
      GP.setAttribute('src', 'https://boots.scene7.com/is/image/Boots/remind?scl=1&fmt=png-alpha');
      reminder.setAttribute('src', 'https://boots.scene7.com/is/image/Boots/cal?scl=1&fmt=png-alpha');
      infoIcon.setAttribute('src', 'https://boots.scene7.com/is/image/Boots/infor?scl=1&fmt=png-alpha');
      faqIcon.setAttribute('src', 'https://boots.scene7.com/is/image/Boots/faq?scl=1&fmt=png-alpha');

    }

    const changeContent = () => {
      const firstSection = document.querySelector('[class^="styles__description"]');
      firstSection.querySelector('[class^="styles__heading"]').textContent = 'How Boots works with your GP';
      firstSection.querySelector('[class^="styles__image"]').setAttribute('src', 'https://boots.scene7.com/is/image/Boots/image%20%284%29?scl=1&fmt=png-alpha');
      firstSection.querySelector('[class^="styles__copy"]').innerHTML = `
      <p>You can sign up to Boots Online Prescriptions with NHS Login if you are registered with a GP in England. Look out for the NHS Login button, enter your email address and if you do not already have a login set up, you can create one by following the steps on the screen.</p>
      <p>Using NHS Login has several benefits:</p>
      <ul>
        <li>Connect to your GP record to select the prescription item(s) you need from a list of authorised and due items, without worrying about spelling, quantity or strength.</li>
        <li>Prescription requests are directly sent to your GP's system, which means that they're often approved quicker.</li>
        <li>Any changes your GP makes to your repeat medication will be updated in your account so your medicines are always up to date.</li>
      </ul>
      <a target="_blank" href="https://www.boots.com/floating-editorial/editorial-legal/editorial-health/frps-faqs">Find out more in our FAQs</a>`;

      const secondSection = document.querySelectorAll('[class^="styles__description"]')[1];
      secondSection.querySelector('[class^="styles__image"]').setAttribute('src', 'https://boots.scene7.com/is/image/Boots/image%20%285%29?scl=1&fmt=png-alpha');
      secondSection.querySelector('[class^="styles__heading"]').textContent = 'Look after your family members, loved ones, or people you care for from one account';
      secondSection.querySelector('[class^="styles__copy"]').innerHTML = `<p>Do you care for a family member, friend, or loved one? With their consent, you can manage their prescriptions online, order their items when they are due and arrange collection or delivery on their behalf. Follow the steps above and select "someone else" when asked who you are ordering for, search for their item(s), then register your account details and the patient details. We'll take care of the rest.</p>`;

    }

  

    changeHeading();
    changeIcons();
    addSmallText();
    changeContent();

    if(VARIATION === '2' || VARIATION === '3') {
      changeCTAS();
      pollerLite(['a[data-bv-product-id=dpi-reviews]'], () => {
        document.querySelector('a[data-bv-product-id=dpi-reviews]').addEventListener('click', function(){
          fireEvent('Clicked reviews')
        })
      });
    }

    allTracking();
  }

 
  
};
