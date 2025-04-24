import shared from "./shared";
import { timeToCutoff, isNextDayPossible, addDaysToCurrentDate, getFriendlyDateString } from "./delivery";
import { events } from "../../../../../lib/utils";

const { ID } = shared;

export default class Dropdowns {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {  
      const element = document.createElement('div');
      element.classList.add(`${ID}-dropdowns`);

      let timeToCutoffHtml = '';
      if(timeToCutoff() !== 0) {
        timeToCutoffHtml = '* order in the next ' + timeToCutoff().hours +  ' ' + timeToCutoff().minutes;
      }

      let dateStandardDelivery = isNextDayPossible() ? addDaysToCurrentDate(5) : addDaysToCurrentDate(6);
      if(dateStandardDelivery.getDay() == 6) {
        dateStandardDelivery = isNextDayPossible() ? addDaysToCurrentDate(7) : addDaysToCurrentDate(8);
      } else if(dateStandardDelivery.getDay() == 0) {
        dateStandardDelivery = isNextDayPossible() ? addDaysToCurrentDate(6) : addDaysToCurrentDate(7);
      }

      const dateStandardDeliveryFormatted = getFriendlyDateString(dateStandardDelivery);

    
      element.innerHTML = `
        <div class="${ID}-dropdown ${ID}-deliveryInfo prod-info ${ID}-active">
            <h4 class="tab-mobile-title active">When will your order arrive?</h4>
            <div class="${ID}-dropdownContent">
                <div class="${ID}-textBlock">
                    <h5>Delivery to a UK address</h5>
                    <span class="${ID}-smallPrint">(current situation whilst our logistics are impacted by COVID-19. Last update July 2020)</span>
                    <p>Choose your exact delivery date from just £4.95 - select up to 6 months in advance 
                        ${isNextDayPossible() === true ? `
                            <span class="${ID}-countdownDay">including <span>tomorrow*</span></span>
                        ` : ''}
                    </p>
                    ${timeToCutoffHtml ? `
                        <div class="${ID}-countdown">${timeToCutoffHtml}</div>
                    ` : ''}
                    <p>In the past 6 months, we delivered over 95% of all items on the day they were due to be delivered.</p>
                    <p class="${ID}-countdownText">Or, from just £3.95, your order will arrive by <span class="${ID}-futureDate">${dateStandardDeliveryFormatted}</span> using Standard Delivery at the latest (we cautiously allow up to 7 days, but over 95% of the time we deliver sooner than this)</p>
                    <p>You can send to multiple addresses within the checkout, too, if you want to!</p>
                    <p>Need the item today? Check out our gift by text service <a href="/about-gift-by-text.html" target="_blank">here</a></p>
                </div>
                <div class="${ID}-textBlock ${ID}-other">
                    <h5>Other delivery options</h5>
                    <ul class="${ID}-bullets">
                        <li>Click and collect - Sorry, Click & Collect is not available currently. <a href="/help/delivery.html" target="_blank">Read More</a></li>
                        <li>Some items are eligible for international delivery only <a href="/help/delivery.html" target="_blank">Read More</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="${ID}-dropdown ${ID}-gifting prod-info">
            <h4 class="tab-mobile-title">Gifting options</h4>
            <div class="${ID}-dropdownContent">
                <ul class="${ID}-bullets">
                    <li><h5>Personalised Message</h5><p>Add personalised gift messages complimentary with every order (add in checkout)</p></li>
                    <li><h5>Gift Bag & Gift Box</h5><p>Add a gift box (+£5) or concierge gift bag (+£2.50) individually trimmed with a seasonal red ribbon (add in checkout)</p></li>
                    <li><h5>Gift by text</h5><p>You can send this gift by text today! You can select and pay for a gift you wish to send; and the lucky recipient will receive the details of the gift via their phone. <a href="/about-gift-by-text.html">Read More</a></p></li>
                </ul>
            </div>
        </div>
        <div class="${ID}-dropdown ${ID}-deliveryInfo prod-info">
            <h4 class="tab-mobile-title">How is it delivered?</h4>
            <div class="${ID}-dropdownContent">
                <p>All items are delivered and tracked by courier - you’ll receive an estimated delivery date via email and a text on the day.</p>
                <p>In these current times, our couriers all practice and encourage contact-free delivery. If the recipient isn’t in at that time, the courier will leave a “sorry we missed you card” and your order will be left at the local Post Office depot.</p>
            </div>
        </div>
        <div class="${ID}-dropdown ${ID}-transit prod-info">
            <h4 class="tab-mobile-title">Our chocolate in transit</h4>
            <div class="${ID}-dropdownContent">
                <p>Our chocolate comes with a minimum 4 week expiry date from the date that it’s dispatched (it differs by product, and each product is stamped with a best before date) - no need to worry about when you order (or when you eat!)</p>
                <p>Did you know all our chocolate goes through transit testing? So our specially designed outer and inner packaging ensures there are no breakages or heat issues whilst being delivered. All packaging is also Ecoflo; it can be re-used, composted or recycled.</p>
            </div>
        </div>
        <div class="${ID}-dropdown ${ID}-guarantee prod-info">
            <h4 class="tab-mobile-title">Returns and our 100% Happiness Promise</h4>
            <div class="${ID}-dropdownContent">
                <p>All of your purchases are covered by our No Excuses Guarantee, so if you're not 100% happy with our products or in the rare instance that we miss an important delivery date, we guarantee that we'll immediately put it right for you – refunding, replacing or issuing you with a Gift Card as appropriate. In addition, we guarantee to make good any mistakes with honesty and a positive solution that works for you.</p>
            </div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      // show/hide dropdowns
      const allDropdowns = component.querySelectorAll(`.${ID}-dropdown`);

      for (let index = 0; index < allDropdowns.length; index += 1) {
          const element = allDropdowns[index];

          element.querySelector('h4').addEventListener('click', () => {
            const elName = element.querySelector('h4').textContent.trim();
            if(element.classList.contains(`${ID}-active`)) {
                element.classList.remove(`${ID}-active`);
                element.querySelector('h4').classList.remove(`active`);
                events.send(`${ID} V1`, 'accordian close', `${elName}`);
            } else {
                element.classList.add(`${ID}-active`);
                element.querySelector('h4').classList.add(`active`);
                events.send(`${ID} V1`, 'accordian open', `${elName}`);
            }
        });   
      }
    }
  
    render() {
      const { component } = this;
        document.querySelector('.product-detail .prod-info.prod-info-b').insertAdjacentElement('beforebegin',component);
    }
  }