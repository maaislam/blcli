import { fullStory, events } from '../../../../lib/utils';

/**
 * {{NH027}} - {{Insurance Test}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH027',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID + 'V' + settings.VARIATION);
    services.infoChange();
    services.rehome();
    services.confirmationText();
    services.scrollBox();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    // Re arrange elements
    rehome: function rehome() {
      // const insuranceWrap = document.createElement('div');
      const insuranceElements = document.querySelectorAll('.main-content .content span#paxList .field-row-wide span.fr');
      // Amend all elements
      let number = 1;
      [].forEach.call(insuranceElements, (element) => {
        // Top level
        // const tickBox = element.children[0];
        const label = element.children[1];
        // Add class to new label
        // label.classList.add('nh27-label');
        const link = element.children[2];
        // Second level
        const price = label.children[0];
        // Amend Label text
        // label.textContent = `National Holidays Insurance (Inc. IPT) + ${price.textContent}`;
        // New element
        const newInsuranceElement = `
          <div class="nh27-insurance-input">
            <label>Insurance for Passenger ${number} <span>(optional)</span></label>
            <span id="nh27-insurance-input" class="insur-cb">
              <input type="radio">
              <label>National Holidays Insurance (Inc. IPT) + £${price.outerHTML}</label>
            </span>
            <span class="nh27-add-later">
              <input type="radio" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
              <label>Add later</label>
            </span>
            ${link.outerHTML}
            <a class="NH027-insurance-doc" href="https://www.nationalholidays.com/images/pdfs/NH_IPID_18.pdf" target="_blank">View our Insurance Product Information Document</a>
          </div>
        `;
        // Move below "Same for all passengers"
        const ref = element.parentElement.nextElementSibling.nextElementSibling;
        ref.insertAdjacentHTML('beforeend', newInsuranceElement);
        // Number of passengers
        number += 1;
        // Control inputs
        const newInputElement = element.parentElement.nextElementSibling.nextElementSibling.querySelector('.nh27-insurance-input #nh27-insurance-input > input[type="radio"]');
        // Control 'Add Own'
        const addOwnInput = element.parentElement.nextElementSibling.nextElementSibling.querySelector('.nh27-insurance-input .nh27-add-later > input[type="radio"]');
        let hasAddOwnText = false;
        let hasNhText = false;
        if (newInputElement) {
          // NH Insurance text
          const newInputHtml = `
            <div class="nh27-nh-text">
              <p>See below for terms</p>
            </div>
          `;
          newInputElement.addEventListener('click', () => {
            // Send Event
            events.send('NH027', 'Click', 'User chose National Holidays insurance option', { sendOnce: false });
            // Old radio input
            element.children[0].children[0].click();
            addOwnInput.checked = false;
            // Remove add later text
            if (hasAddOwnText === true) {
              addOwnInput.parentElement.querySelector('.nh27-add-own').remove();
            }
            // add NH insurance option text
            if (hasNhText === false) {
              newInputElement.parentElement.insertAdjacentHTML('beforeend', newInputHtml);
            }
            hasNhText = true;
            hasAddOwnText = false;
          });
        }
        if (addOwnInput) {
          // const addOwnHtml = `
          //   <div class="nh27-add-own">
          //     <p>Please contact us within 7 days of your booking date to provide your name of insurance provider, policy number and medical assistance telephone number. Please call our holiday advisors on <a href="tel:01603886767">01603 88 67 67</a>.</p>
          //   </div>
          // `;
          const addOwnHtml = `
          `;
          addOwnInput.addEventListener('click', () => {
            events.send('NH027', 'Click', 'User chose the add own insurance option', { sendOnce: false });
            newInputElement.checked = false;
            if (hasAddOwnText === false) {
              addOwnInput.parentElement.insertAdjacentHTML('beforeend', addOwnHtml);
            }
            if (hasNhText === true) {
              newInputElement.parentElement.querySelector('.nh27-nh-text').remove();
              hasNhText = false;
            }
            hasAddOwnText = true;
          });
        }
        // Re word 'Same for all passengers'
        const samePassengerInput = document.querySelector('.field-row-wide:nth-of-type(3n) > span > label');
        samePassengerInput.textContent = 'Check to apply to all passengers';
      });
    },
    // Confirmation Text
    confirmationText: function confirmationText() {
      const confirmElement = document.querySelector('.main-content .left .box-with-border.orange input[type="submit"]');
      if (confirmElement) {
        const html = `
          <div class="nh27-confirm-help">
            <p>If you need any help please call us on <a href="tel:08444779990">0844 477 9990</a> between 8am and 8pm 7 days a week</p>

            <p class="nh27-req--info">** All insurance premiums quoted include IPT at 20%. Registered VAT no. 734240263
            National Holidays Tours Limited is and Appointed Representative of ITC Compliance Limited which is authorised and regulated by the Financial Conduct Authority (Reference Number 313486) and which is permitted to advise on and arrange general insurance contracts</p>
          </div>
        `;
        confirmElement.insertAdjacentHTML('afterend', html);
      }
    },
    // Amend scrolling info box
    scrollBox: function scrollBox() {
      const element = document.querySelector('.main-content .content .left > .box-with-border.white');
      // Append chevron down to titles
      if (element) {
        const titles = element.querySelectorAll('h4');
        [].forEach.call(titles, (title) => {
          title.insertAdjacentHTML('beforeend', '<span class="nh27-chev-down"></span>');
        });
      }
      // Create accordion with content
      const downArrows = document.querySelectorAll('.main-content .content .left > .box-with-border.white > h4');
      [].forEach.call(downArrows, (element2) => {
        element2.addEventListener('click', () => {
          const activeEl = element2.nextElementSibling.querySelector('.nh27-show-down');
          if (activeEl) {
            activeEl.classList.remove('nh27-show-down');
          }

          element2.nextElementSibling.classList.toggle('nh27-show-down');

          // If this accordion is open and clicked, close.
          // const siblingElement = element2.nextElementSibling;
          // if (siblingElement.classList.contains('nh27-show-down')) {
          //   siblingElement.classList.remove('nh27-show-down');
          // }
        });
      });
    },
    infoChange: function infoChange() {
      const infoBoxOne = document.querySelector('.main-content .content .left .box-with-border.white p:first-of-type');
      const infoTable = document.querySelector('.main-content .content .left .box-with-border.white .table-resp');
      const infoForOne = `
        <ul>
          <li>All ages are considered with no premium loadings over the age of 65.</li>
          <li>24 Hour English speaking emergency assistance.</li>
          <li>No need to declare medical conditions if travelling in the UK, Channel Islands or Eire<sup>*</sup></li>
        </ul>
      `;
      const infoForTwo = `
        <ul>
          <li>Where a claim is equal to or less than the excess.</li>
          <li>Travelling against the advice of your GP.</li>
          <li>Any medical conditions that have not been declared where the policy holder of travelling outside of the UK, Channel Islands &amp; Eire.</li>
          <li>Maximum Excess for all claims is £50.</li>
          <li>You have the right to cancel your policy within 14 days, with a full refund if you decide this policy does not meet your requirements.</li>
          <li>Please refer to full T&C or see the <a href="https://www.nationalholidays.com/images/pdfs/NHInsurance2016.pdf" target="_blank">full policy here.</a></li>
        </ul>
      `;
      if (infoBoxOne && infoTable) {
        infoBoxOne.insertAdjacentHTML('afterend', infoForOne);
        infoBoxOne.remove();
        infoTable.innerHTML = infoForTwo;
      }
      // Change H4 titles
      const titleOne = document.querySelector('.main-content .content .left .box-with-border.white > h4:first-of-type');
      const titleTwo = document.querySelector('.main-content .content .left .box-with-border.white > h4:last-of-type');
      if (titleOne && titleTwo) {
        titleOne.textContent = 'Key benefits per person';
        titleTwo.textContent = 'Key exclusions per person';
      }
    },
  },

  components: {},
};

export default Experiment;
