/**
 * MP173 - Why buy me section
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { fetchExternalJSON } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  const { pathname } = window.location;
  const { stock } = window.universal_variable.product;
  


  const returnUspArr = (prodObj) => {
    let uspArr = [];
    // If we have a matched product object
    if (prodObj) {
      for (let key in prodObj) {
        if (key.match('USP')) {
          uspArr.push(prodObj[key]);
        }
      }
    }
    return uspArr;
  }


  const matchPathname = (configArr) => {
    let productObject = {};
    // Match the pathname to the array
    for (let i = 0, len = configArr.length; i < len; i++) {
      const thisObj = configArr[i];
      if (thisObj) {
        const url = thisObj.FIELD1;
        if (url && pathname.match(url)) {
          // Match
          productObject = configArr[i];
        }
      }
    }

    return productObject;
  }


  const addComponent = (uspArr) => {

    // If we have a new array
    if (uspArr.length && stock > 0) {
      const ref = document.querySelector('.call_to_action');
      ref.insertAdjacentHTML('afterend', `
        <div class="MP173-usp">
          <h2>Why Buy Me:</h2>

          <ul>
            ${uspArr.map((usp) => {
              if (usp.length) {
                return `<li>${usp}</li>`;
              }
            }).join(' ')}
          </ul>

          <button class="scrollToUsps">read more</button>
        </div>
      `);


      function scrollToTargetAdjusted(element, offsetNum){
        
        var headerOffset = offsetNum ? offsetNum : 200;
        var elementPosition = element.getBoundingClientRect().top;
        
        var offsetPosition = elementPosition - headerOffset;
    
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
      }

      const scrollLink = document.querySelector('.scrollToUsps');
      const prodDetails = document.querySelector('li.productDetails a');
      const detailsArea = document.querySelector('.pdp_product_details__body #details');

      if (window.innerWidth < 479) {
        const prodDetailMob = document.querySelector('#details');
        const prodDetailTitle = document.querySelector('.pdpMobileInfoBlockHeader h2');
      
        scrollLink.addEventListener('click', () => {
          detailsArea.classList.add('in');
          detailsArea.classList.add('active');
          prodDetailTitle.classList.add('active');
          // prodDetailMob.click();
          prodDetailMob.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
          // window.scrollBy(0, 300);
        });
        
      } else {
        if (scrollLink) {
          scrollLink.addEventListener('click', () => {
            prodDetails.click();
            detailsArea.classList.add('in');
            detailsArea.classList.add('active');
            // prodDetailMob.click();
            // prodDetails.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            scrollToTargetAdjusted(prodDetails);
          });
        }
      }
    }
  }



  const fetchThisData = fetchExternalJSON();
  fetchThisData.send('https://ucds.ams3.digitaloceanspaces.com/MP173/newConfigV2.json?callback', {
    // callbackName: 'handleStuff',
    onSuccess: function(config){
      const productObject = matchPathname(config);
      const uspArr = returnUspArr(productObject);
      addComponent(uspArr);
    },
    onTimeout: function(){
        console.log('MP173 timeout!');
    },
    timeout: 5
  });
  

};

export default activate;
