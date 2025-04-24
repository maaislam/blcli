import { events } from "../../../../../lib/utils";
import shared from "./shared";

const { ID, VARIATION } = shared;

export default () => {

const accordionMarkup = () => {

    const accWrapper = document.querySelector(`.${ID}-accordion`);

    accWrapper.innerHTML = `
    <div class="${ID}-question ${ID}-qactive" acc-target="${ID}-1">Why choose a Velvetiser Gift Card?</div>
    <div class="${ID}-answer ${ID}-active" id="${ID}-1">
        <p>The gift of a Velvetiser always makes a grand statement, especially at Christmas. If you don’t know what colour Velvetiser they would like or whether they would prefer drinking chocolate or lattes, the gift card is the perfect solution as it enables them to choose their perfect combination.</p>
        <p>From time to time, due to huge seasonal demand from our customers, the Velvetiser may temporarily sell out. Whilst further deliveries are never far away, for a time-sensitive gift you can send or give a Velvetiser Gift Card instead.</p>
    </div>
    <div  class="${ID}-question" acc-target="${ID}-2">What’s included with a Velvetiser Gift Card?</div>
    <div class="${ID}-answer" id="${ID}-2">
        <p>The Velvetiser Gift Card is pre-loaded and ready to use with a value of £109.95, allowing your recipient to choose a Velvetiser in their choice of colour from Copper, Matt Charcoal, or White and add in a box of Single Serve sachets in their choice of flavour. We’ll then send the perfect pairing together, with free UK Standard Delivery*. Alternatively, the gift card can be redeemed in one of our Hotel Chocolat stores – <a href="https://www.hotelchocolat.com/uk/chocolate-shops">see store locator</a> – where they can pick their perfect Velvetiser.</p>
        <p class="${ID}-small">*Subject to stock availability and both items being sent together at the same time. Images featured on this page are for illustrative purposes only.</p>
    </div>
    <div  class="${ID}-question" acc-target="${ID}-3">What happens next?</div>
    <div class="${ID}-answer" id="${ID}-3">
        <p>The Velvetiser Gift Card arrives beautifully packaged, ensuring your grand gesture is made! We can either send this straight to you to gift on the day, or in the post straight to your recipient, with free Standard UK delivery. The Velvetiser Gift Card is not currently available by email or SMS. Then, the lucky recipient can visit www.hotelchocolat.com and simply choose a Velvetiser in a colour to suit their décor and select a box of Single Serve sachets in their choice of flavour, all sent with free Standard UK delivery or purchased in any of our UK locations*. The Velvetiser Gift Card is quick and easy to use for payment, with full instructions printed on the reverse of the card. *. Alternatively, the gift card can be redeemed in one of our Hotel Chocolat stores – <a href="https://www.hotelchocolat.com/uk/chocolate-shops">see store locator</a> – where they can pick their perfect Velvetiser.</p>
        <p class="${ID}-small">*Subject to stock availability and both items being sent together at the same time.</p>
    </div>
    <div  class="${ID}-question" acc-target="${ID}-4">What if my recipient doesn’t want a Velvetiser?</div>
    <div class="${ID}-answer" id="${ID}-4">
        <p>The Velvetiser Gift Card is pre-loaded with a spending value of £109.95. Whilst we hope your recipient will be eager to make their Velvetiser and Single Serves purchase, in the unlikely event that they change their mind or wish to purchase something else, they can do so, ether online or in any UK Hotel Chocolat location*. With so much other choice, we hope you’ll agree that the Velvetiser Gift Card won’t fail to delight! They’ll have 2 years to use the Velvetiser Gift Card too.</p>
        <p class="${ID}-small">*when not used for the purchase of a Velvetiser and box of Single-Serves sachets, usual Gift Card Terms and Conditions apply.</p>
    </div>
    <div  class="${ID}-question" acc-target="${ID}-5">What if the Velvetiser is not in stock?</div>
    <div class="${ID}-answer" id="${ID}-5">
        <p>In the event that the Velvetiser is not currently in stock, a new delivery is never far away. When ordering online at www.hotelchocolat.com you can pre-order a Velvetiser and box of Single-Serve sachets, reserving your order from the next available delivery. Alternatively, the gift card can be redeemed in one of our Hotel Chocolat stores – <a href="https://www.hotelchocolat.com/uk/chocolate-shops">see store locator</a>.</p>
    </div>`

}

const triggerAccordion = () => {
    document.querySelector(`.${ID}-accordion`).addEventListener('click', function (event) {

  
        //stop if clicked element doesn't have the class
        if (!event.target.classList.contains(`${ID}-question`)){ 
            return;
        }   
        // Get the target content
        const content = document.querySelector(`#${event.target.getAttribute('acc-target')}`);
        const question = event.target;


        if (!content){ 
            return;
        }

        // If the content is already expanded, collapse it and quit
        if (content.classList.contains(`${ID}-qactive`)) {
          content.classList.remove(`${ID}-qactive`);
          return;
        }
        
        // Get all open accordion content, loop through it, and close it
        const accordions = document.querySelectorAll(`.${ID}-answer.${ID}-active`);
        for (let i = 0; i < accordions.length; i++) {
          accordions[i].classList.remove(`${ID}-active`);
        }

        const accordionQuestion = document.querySelectorAll(`.${ID}-question.${ID}-qactive`);
        for (let i = 0; i < accordionQuestion.length; i++) {
            accordionQuestion[i].classList.remove(`${ID}-qactive`);
        }
        
        // Toggle our content
        content.classList.toggle(`${ID}-active`);
        question.classList.toggle(`${ID}-qactive`);
        events.send(`${ID} variation:${VARIATION}`, 'Click', 'Accordion');
      })
  }


accordionMarkup();
triggerAccordion();

}