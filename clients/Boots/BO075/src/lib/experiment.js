/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { events, pollerLite } from '../../../../../lib/utils';
import { cookieOpt, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  if(VARIATION === 'control') {
  
  cookieOpt();
  
  }
  
  else {
  
  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Accordian Tabs
  ------------------ */
  const accHeadings = ['Product Details', 'Delivery Options', 'Reviews'];

  const createAccordion = () => {

    const accordionBlock = `<div class="${ID}-accordion"></div>`;
    document.querySelector('.row.template_row_spacer').insertAdjacentHTML('afterbegin', accordionBlock);
    
    // create the headings
    for (let index = 0; index < accHeadings.length; index += 1) {
      const element = accHeadings[index];

      const accordianContent = document.createElement('div');
      accordianContent.classList.add(`${ID}-accordionItem`);
      accordianContent.classList.add(`${ID}-close`);
      accordianContent.innerHTML = `
      <div class="${ID}-accordionHeading ${ID}-block-${element.toLowerCase().replace(/\s/g,'')}"><span></span>${element}</div>
      <div class="${ID}-accordionContent ${ID}-${element.toLowerCase().replace(/\s/g,'')}"></div>`;

      document.querySelector(`.${ID}-accordion`).appendChild(accordianContent);
    }

    // move content to accordion
    const descriptionContent = document.querySelector(`.${ID}-accordionContent.${ID}-productdetails`);
    const deliveryContent = document.querySelector(`.${ID}-accordionContent.${ID}-deliveryoptions`);
    const reviewContent = document.querySelector(`.${ID}-accordionContent.${ID}-reviews`);

    const description = document.querySelector('#estore_pdp_blcol #estore_product_longdesc');
    descriptionContent.innerHTML = description.innerHTML;

    // add icons for V2
    if(VARIATION === '2') {
      descriptionContent.parentNode.querySelector(`.${ID}-accordionHeading span`).style = `background-image: url(https://service.maxymiser.net/cm/images-eu/new-boots-com/3DF554A7D4DB1E5DCA532CC0900844A227A34FFCF86A71E0B3C432D28E0BC7F1.png?meta=/BO075---PDP-Accordions/Description.png)`;
      deliveryContent.parentNode.querySelector(`.${ID}-accordionHeading span`).style = `background-image: url(https://service.maxymiser.net/cm/images-eu/new-boots-com/319E87FE4098978E9AD471F80E6C33EF4497C08728B38CDFA21A5CE4DCDEC536.png?meta=/BO075---PDP-Accordions/Van.png)`;
      reviewContent.parentNode.querySelector(`.${ID}-accordionHeading span`).style = `background-image: url(https://service.maxymiser.net/cm/images-eu/new-boots-com/6450FB0E0AF757251212FBFF295A8E3A37574F35104CCE178694B2358EE11A2A.png?meta=/BO075---PDP-Accordions/Star.png)`;
    }

    const deliveryInfo = document.querySelector('#estore_pdp_brcol_1 .left_espot');
    deliveryContent.innerHTML = deliveryInfo.innerHTML;

    // if reviews, append them
    pollerLite(['#BVRRContainer .bv-content-list-container .bv-content-header'], () => {
      const reviews = document.querySelector('#BVRRContainer');
      reviewContent.appendChild(reviews);
      document.querySelector(`.${ID}-accordionHeading.${ID}-block-reviews`).classList.add(`${ID}-showreviews`);
    });

 

    // open, close accordions
    const accItem = document.getElementsByClassName(`${ID}-accordionItem`);
    const accHeading = document.getElementsByClassName(`${ID}-accordionHeading`);

   /* if(window.innerWidth > 767) {
        document.querySelector(`.${ID}-accordionItem`).classList.add(`${ID}-open`);
    }*/

    for (let index = 0; index < accHeading.length; index += 1) {
        const el = accHeading[index];
        el.addEventListener('click', toggleItem, false);
    }

    function toggleItem() {
      
        const itemClass = this.parentNode.className;
        for (let i = 0; i < accItem.length; i += 1) {
            const accEl = accItem[i];
            accEl.className = `${ID}-accordionItem ${ID}-close`;
        }

        if (itemClass == `${ID}-accordionItem ${ID}-close`) {
            this.parentNode.className =  `${ID}-accordionItem ${ID}-open`;
            const name = this.innerText;
            events.send(`Experimentation`, `Boots - ${ID} V${VARIATION}`, `ClickedAccordion${name}`);
            document.documentElement.scrollTop += this.getBoundingClientRect().top
        }
    }
  }

  createAccordion();
}

};
