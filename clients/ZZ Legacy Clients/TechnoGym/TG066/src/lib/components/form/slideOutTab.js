import settings from '../../settings';
import { __ } from '../../../helpers';
import { pollerLite } from '../../../../../../../lib/uc-lib';
import formFunctionality from './formFunctionality';

const { ID } = settings;

export default class SlideOutTab {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_slideOutForm`);

    if (settings.VARIATION === '2') {
      // if PDP page
      let productName;
      if (document.body.classList.contains('catalog-product-view')) {
        pollerLite(['.product-name h1'], () => {
          if (document.querySelector('.product-name h1')) {
            productName = document.querySelector('.product-name h1').textContent;
          }
        });
      }

      element.innerHTML =
      `<div class="${ID}-tabContent">
        <div class="${ID}-close"></div>
        <h3>${__('Our Wellness Experts are here to help you meet your fitness goals.')}</h3>
        <h4 class="${ID}-subtext">${__('Call or email for your bespoke consultation, or request a free')} ${productName ? productName : ''} ${__('catalogue for more information')}</h4>
        <div class="${ID}-call">
          <a href="tel:${__('0800 31 62496')}"><span></span>${__('0800 316 2496')}</a>
        </div>
        <div class="${ID}-break"><span>or</span></div>
        <div class="${ID}-button ${ID}-email"><a href="https://www.technogym.com/gb/contacts/?reason=mail">Email us</a></div>
        <div class="${ID}-break"><span>or</span></div>
        ${document.body.classList.contains('catalog-product-view') ? `<div class="${ID}-button ${ID}-download"><a href="#">${__('Download the brochure')}</a></div>` : `<div class="${ID}-button"><a href="https://www.technogym.com/gb/contacts/?reason=catalogue">${__('Request a catalogue')}</a></div<`}`;
    } else { // create form
      element.innerHTML =
      `<div class="${ID}-tabContent">
        <div class="${ID}-close"></div>
        <h3>${__('Our Wellness Experts are here to help you meet your fitness goals.')}</h3>
        <form class="${ID}-sideForm" data-parsley-validate="">
        <input type="hidden" name="reason" value="mail">
        <input type="hidden" name="need" value="">
        <input type="hidden" name="hideIt" value="">
        <input type="hidden" name="telephone" value="07911222333">
        <input type="hidden" name="secure_field_check" value="">
        <input type="hidden" name="campaign" value="1">
        <div class="${ID}-allFields">
          <div class="${ID}-inputField">
            <label>First Name<span>*</span></label>
            <input name="name" id="name" title="First Name" value="" class="input-text" type="text" required="">
          </div>
          <div class="${ID}-inputField">
            <label>Last Name<span>*</span></label>
            <input name="last-name" id="last-name" title="Last Name" value="" class="input-text" type="text" required="">
          </div>
          <div class="${ID}-inputField">
            <label>Email<span>*</span></label>
            <input name="email" id="email" title="Email" value="" class="input-text validate-email" type="text" required="" data-parsley-trigger="change">
          </div>
          <div class="${ID}-inputField">
            <label>Message</label>
            <textarea name="comment" id="comment" title="Message"></textarea>
          </div>
          <p class="${ID}-smallText">Having read and understood the <a href="https://www.technogym.com/gb/privacy-policy/">Privacy Policy</a> and having accepted the Technogym <a href="https://www.technogym.com/gb/terms-of-use/">Terms and Conditions</a><br></br>
          <input type="checkbox" name="consent" required></input><span>I consent to the use of personal data for marketing purposes</span></p>
          <div class="${ID}-radio_buttons">
            <p>I'm interested in equipment for:</p>
            <div class="${ID}-option">
              <label>Home</label>
              <input name="profile" id="private" title="Private individual" value="private_individual" class="input-radio" type="radio" reason-attr="${ID}-home" checked>
            </div>
            <div class="${ID}-option">
              <label>Business</label>
              <input name="profile" id="business" title="Business" value="business" class="input-radio" type="radio" reason-attr="${ID}-business_reason">
            </div>
            <div class="${ID}-option">
              <label>Freelance</label>
              <input name="profile" id="freelance" title="Freelance professional" value="freelance_professional" class="input-radio" type="radio" reason-attr="${ID}-freelance_reason">
            </div>
          </div>
          <div class="${ID}-reasons">
            <div id="${ID}-business_reason" class="${ID}-reason">
            </div>
            <div id="${ID}-freelance_reason" class="${ID}-reason">
            </div>
          </div>
        </div>
          <button type="submit" title="Send" class="button ${ID}-submit_form" value="validate"><span><span>Submit</span></span></button>
          <span class="${ID}-required">* Required field</span>
        </form>
      </div>`;
    }

    this.component = element;
  }

  bindEvents() {
    const { component } = this;
    component.querySelector(`.${ID}-close`).addEventListener('click', () => {
      component.classList.remove(`${ID}-slideOut_active`);
      if (window.innerWidth < 767) {
        document.body.classList.remove(`${ID}_noScroll`);
      }
    });
  }

  render() {
    const { component } = this;
    document.body.appendChild(component);

    // download button on product page

    if (settings.VARIATION === '2') {
      const downloadButton = component.querySelector(`.${ID}-download`);
      if (downloadButton) {
        pollerLite(['.addition-info a'], () => {
          const getBrochureButton = document.querySelector('.addition-info a');
          downloadButton.querySelector('a').setAttribute('href', getBrochureButton.getAttribute('href'));
        });
      }
    }

    const stickyTab = document.querySelector(`.${ID}_stickyTab`);
    stickyTab.addEventListener('click', () => {
      component.classList.add(`${ID}-slideOut_active`);
      if (window.innerWidth < 767) {
        document.body.classList.add(`${ID}_noScroll`);
      }
    });

    // make the form work
    if (settings.VARIATION === '1') {
      formFunctionality();
    }
  }
}
