/**
 * UKB009 - Increase Deals Prominence (Homepage)
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import initiateSlick from './initiateSlick';

const activate = () => {
  const device = window.innerWidth > 500 ? 'desktop' : 'mobile';
  setup();

  // ------ Gets Latest Deals from Offers page ------
  const getLatestDeals = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement('html');
        temp.innerHTML = request.responseText;
        const items = temp.querySelectorAll('#lateDeals a');

        const dealsDetails = items;
        callback(dealsDetails);
      }
    };
    request.send();
  };

  // ------ Shuffles Array Elements ------
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  if (!document.querySelector('#UKB009-loader')) {
    const loaderWrapper = `<div class='UKB009-loaderWrapper row1'><div id='UKB009-loader'></div><div class='loader__text'>Loading Last Minute Deals . . .</div></div>`; // eslint-disable-line quotes
    document.querySelector('#ctl00_ContentPane').insertAdjacentHTML('beforebegin', loaderWrapper);

    setTimeout(() => {
      document.querySelector('.UKB009-loaderWrapper').classList.add('hidden');
    }, 5000);
  }

  getLatestDeals(`https://www.ukbreakaways.com/offers`, (dealsDetails) => {
      setTimeout(() => {
        if (dealsDetails.length > 0) {
          /* ------------ Hide Loader ------------ */
          document.querySelector('.UKB009-loaderWrapper').classList.add('hidden');
          // ------ Returns an array of the object's own enumerable property values ------
          const data = Object.values(dealsDetails);
          const shuffledData = shuffle(data);
  
          let dealsList = '';
          let count = 0; 
          shuffledData.forEach(item => {
            if (count <= 4) {
              dealsList += item.outerHTML;
              count += 1;
            }   
          });
  
          let lateDealsHeader = '';
          if (device === 'desktop') {
            lateDealsHeader = '<h2>Last Minute Deals <span>or <a href="https://www.ukbreakaways.com/offers">view all deals</a></span></h2>';
          } else {
            lateDealsHeader = '<h2><a href="https://www.ukbreakaways.com/offers">Last Minute Deals</a></h2>';
          }
  
          const newContainer = `<section class="blue">
            <div class="UKB009-container">
              ${lateDealsHeader}
              <div class="slider-wrap">
                <div id="UKB009-lateDeals" class="featured-carousel price-slider">
                  ${dealsList}
                </div>
              </div>
            </div>
          </section>`;
          
          if (!document.querySelector('#UKB009-lateDeals')) {
            if (device === 'desktop') {
              document.querySelector('.content').insertAdjacentHTML('beforebegin', newContainer);
            } else {
              document.querySelector('.search-panel.home.content').insertAdjacentHTML('afterend', newContainer);
            }  
          }
          
          initiateSlick(device);
        }
      }, 2000);
  });
};

export default activate;
