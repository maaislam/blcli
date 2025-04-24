/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { h, render } from 'preact';
import MobileSlidingNav from './components/MobileSlidingNav';
import navData from './navData';
import { events } from '../../../../../lib/utils';
import shared from './shared';

const getCustomerName = () => {
  const name = (document.querySelector('.nosto_customer .first_name')?.innerText || '').trim();

  return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : '';
};

export default () => {
  setup();

  // Write experiment code here
  const navigation = document.querySelector('nav.navigation');
  if(navigation) {
    const customerName = getCustomerName();
    let salutation = '';
    if(customerName) {
      salutation = `Hi, ${customerName}!`;
    }

    navigation.innerHTML = '';

    const extraMarkup = (
      <div className="MobileSlidingNav__extra">
        <ul>
          <li>
            <a href="/pages/neom-is-here-for-you">Our story</a>
          </li>
          <li>
            <a href="/pages/contact">Customer services</a>
          </li>
          <li>
            <a href="/pages/sustainability">Sustainability</a>
          </li>
          <li>
            <a href="/pages/postage">Delivery & returns</a>
          </li>
          <li>
            <a href="/blogs/wellbeing">Journal</a>
          </li>
          <li>
            <a href="https://support.neomorganics.com/hc/en-gb">Help & FAQs</a>
          </li>
          <li>
            <a href="/pages/our-locations">Locations</a>
          </li>

        </ul>
        
        <div className="MobileSlidingNav__currency">
        </div>
      </div>
    );

    const extraNavContent = (
      <div className="MobileSlidingNav__extra-nav">
        <h2>Shop by
          <span className="MobileSlidingNav__font-madelyn">Wellbeing Need</span>
        </h2>
        <div class="MobileSlidingNav__wbcircles">
          <div class="MobileSlidingNav__wbcircle">
            <a href="/collections/scent-to-sleep" class="MobileSlidingNav__wbcircle-inner">
              <span className="MobileSlidingNav__font-madelyn">Scent to</span>
              <strong>Sleep</strong>
            </a>
          </div>
          <div class="MobileSlidingNav__wbcircle">
            <a href="/collections/scent-to-de-stress" class="MobileSlidingNav__wbcircle-inner">
              <span className="MobileSlidingNav__font-madelyn">Scent to</span>
              <strong>De-Stress</strong>
            </a>
          </div>
          <div class="MobileSlidingNav__wbcircle">
            <a href="/collections/scent-to-make-you-happy" class="MobileSlidingNav__wbcircle-inner">
              <span className="MobileSlidingNav__font-madelyn">Scent to</span>
              <strong>Make You Happy</strong>
            </a>
          </div>
          <div class="MobileSlidingNav__wbcircle">
            <a href="/collections/scent-to-boost-your-energy" class="MobileSlidingNav__wbcircle-inner">
              <span className="MobileSlidingNav__font-madelyn">Scent to</span>
              <strong>Boost Your Energy</strong>
            </a>
          </div>
        </div>
      </div>
    );

    const handleClose = () => {
      const burger = document.querySelector('.header .header-burger');
      if(burger) {
        burger.click();
      }
    };

    render((
      <MobileSlidingNav extraNavContent={extraNavContent} extraMenuContent={extraMarkup} 
          data={navData} salutation={salutation} handleClose={handleClose}
      >
        <a href="/pages/wellbeing-pod">
          <img className="MobileSlidingNav__more" 
            src="https://ucds.ams3.digitaloceanspaces.com/neomorganics/wellbeing-pod-more.png"/>
        </a>
      </MobileSlidingNav>
    ), navigation);

    // Currency Selector
    const selector = document.querySelector('.header .site-selector');
    const currencyWrap = document.querySelector('.MobileSlidingNav__currency');

    if(selector && currencyWrap) {
      currencyWrap.insertAdjacentElement('afterbegin', selector);

      [].forEach.call(selector.querySelectorAll('option'), opt => {
        if(opt.innerText.match(/UK Store/)) {
          opt.innerText = 'United Kingdom (£ GBP)';
        } else if(opt.innerText.match(/US Store/)) {
          opt.innerText = 'United States ($ USD)';
        }
      });
    }

    // Tracking
    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__level-1 .MobileSlidingNav__listing li a'), l => {
      l.addEventListener('click', (e) => {
        events.send(`${shared.ID} Navigation`, 'Click Level 1', e.currentTarget.innerText.trim());
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__level-2 .MobileSlidingNav__listing li a'), l => {
      l.addEventListener('click', (e) => {
        events.send(`${shared.ID} Navigation`, 'Click Level 2', e.currentTarget.innerText.trim());
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__more'), l => {
      l.addEventListener('click', (e) => {
        events.send(`${shared.ID} Navigation`, 'Click Dicover More', e.currentTarget.innerText.trim());
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__wbcircle'), l => {
      l.addEventListener('click', (e) => {
        events.send(`${shared.ID} Navigation`, 'Click Wellbeing Circle', e.currentTarget.innerText.trim());
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__extra li a'), l => {
      l.addEventListener('click', (e) => {
        events.send(`${shared.ID} Navigation`, 'Click Secondary Nav Link', e.currentTarget.innerText.trim());
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__back'), l => {
      l.addEventListener('click', (e) => {
        events.send(`${shared.ID} Navigation`, 'Click Menu Link Back', e.currentTarget.innerText.trim());
      });
    });
  }
};
