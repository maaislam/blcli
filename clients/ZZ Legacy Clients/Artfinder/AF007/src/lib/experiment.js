/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/utils';

export default () => {
  setup();

  const html = `
    <div class="AF007-tabs">
      <div id="AF-one" class="AF-tabcontent AF-activeTab">
        <p><strong>Money back guarantee</strong></p>
        <p>We guarantee satisfaction with our free, no questions asked returns policy.</p>
      </div>

      <div id="AF-two" class="AF-tabcontent">
        <p><strong>Secure Payments</strong></p>
        <p>All payments are 100% secured through our trusted partner Paypal.</p>
      </div>

      <div id="AF-three" class="AF-tabcontent">
        <p><strong>Customer Support</strong></p>
        <p>Have total peace of mind, knowing our Support Team is always here to help.</p>
      </div>

      <div id="AF-four" class="AF-tabcontent">
        <p><strong>Support Independent</strong></p>
        <p>Buy directly from an artist, helping them to make a living doing what they love.</p>
      </div>

      <div class="AF-tab">
        <button class="AF-tablinks" data-tab="AF-one">
          <span class="tab-icon icon-box"></span>
          <p>Free Returns</p>
        </button>
        <button class="AF-tablinks" data-tab="AF-two">
          <span class="tab-icon icon-card"></span>
          <p>Secure Payment</p>
        </button>
        <button class="AF-tablinks" data-tab="AF-three">
          <span class="tab-icon icon-phone"></span>
          <p>Customer Support</p>
        </button>
        <button class="AF-tablinks" data-tab="AF-four">
          <span class="tab-icon icon-man"></span>
          <p>Support Independent</p>
        </button>
      </div>
    </div>
  `;


  const addHTML = (ref, pos) => {
    if (!document.querySelector('.AF007-tabs')) {
      ref.insertAdjacentHTML(pos ? pos : 'beforeend', html)
    }
  };

  const addControls = (wrap) => {
    const contentBlocks = wrap.querySelectorAll('.AF-tabcontent');
    const buttons = wrap.querySelectorAll('button.AF-tablinks');
    for (let i = 0; buttons.length > i; i += 1) {
      let btn = buttons[i];
      const btnData = btn.getAttribute('data-tab');
      const content = wrap.querySelector(`#${btnData}`);

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        for (let j = 0; contentBlocks.length > j; j += 1) {
          contentBlocks[j].classList.remove('AF-activeTab');
        }

        content.classList.add('AF-activeTab')
      });

    }
  }

  pollerLite(['.large-4.medium-12.columns.af-offset-top > .row', '#product-description'], () => { // PDP
    const thisRef = document.querySelector('.large-4.medium-12.columns.af-offset-top > .row');
    addHTML(thisRef, 'afterend');

    const addedTabs = document.querySelector('.AF007-tabs');
    addControls(addedTabs);
  }); 


  // We are removing the PDP version of this test. For AF007. 

  // AF016 will include both PDP and Quick view.


  const bod = document.body;
  pollerLite(['#results-container'], () => { // PLP

    
    observer.connect(bod, () => {
      
      pollerLite(['.af-modal-scroll-wrapper .content.active .row > .column.small-12:last-of-type'], () => {
        const thisRef = document.querySelector('.af-modal-scroll-wrapper .content.active .row > .column.small-12:first-of-type');
      
        addHTML(thisRef, 'beforeend');
    
        const addedTabs = document.querySelector('.AF007-tabs');
        addControls(addedTabs);
      })
    }, {
      config: {
        attributes: true,
        childList: true,
        subtree: true
      }
    });

  }); 


  // General observer for body class
  observer.connect(bod, () => {
    if (!bod.classList.contains('AF007')) {
      bod.classList.add('AF007');
    }
  }, {
    config: {
      attributes: true,
      childList: false,
      subtree: false,
    }
  })

};
