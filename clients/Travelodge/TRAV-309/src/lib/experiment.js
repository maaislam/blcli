/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';
import data from './data';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {

  //PLP Code
  pollerLite(['#main .qa-search-page .lead-price', 
    () => typeof window.DY.feedProperties === 'object' && 
    typeof window.DY.ServerUtil === 'object'], () => {
    console.log('Experiment started');

    const searchTerm = document.querySelector('.search-form .search-form--location .qa-location-field').value;
    const searchTermArray = searchTerm.split(' ');

    const todaysDate = new Date();
    let formattedDate = todaysDate.toISOString().slice(0,10);
    // console.log(formattedDate);
    const matchDate = formattedDate.split('-').reverse().join('/');
    // const matchDate = '17/04/2024'
    // console.log(matchDate);


    const findHotelMatches  = () => {

    let hotelSKUS = [];
    searchTermArray.forEach((item) => {
    item = item.replace(/,/g, '');
    console.log(item);
      for(const [key, value] of Object.entries(data)) {
        if(item.toLowerCase() === key.toLowerCase()) {
          // console.log('match');
          // console.log(value);
          Array.from(value).forEach((item) => {
            if(item['GB-Code']) {
              // console.log(item['GB-Code']);
              hotelSKUS.push([item['GB-Code'], item["Hotel-Name"]]);
              // return item['Closing-Date(made-up)'];
            }
          });
          console.log(hotelSKUS);
        }
      }
    });

    console.log(hotelSKUS)
    return hotelSKUS;
    }

    const getHotelData = (hotelSKU) => {
      return new Promise((resolve, reject) => {
        window.DY.ServerUtil.getProductsData([hotelSKU], ['daily', 'twoDays'], 'view', true, (err, res) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            const hotelData = res[hotelSKU].productData;
            // console.log(hotelData);
            resolve(hotelData);
          }
        });
      });
    };


    const findMatchAndQueryAPI = async () => {
      try {
        const skuAndNameArray = await findHotelMatches();
        console.log(skuAndNameArray, 'skuAndNameArray');
        const hotelDataArray = await Promise.all(skuAndNameArray.map(async (sku) => {
          try {
          let retrievedData = await getHotelData(sku[0]);
          retrievedData["Hotel-Name"] = sku[1];
          return retrievedData;
          } catch(error) {
            console.log(error);
          }
        }));
        console.log(hotelDataArray, 'hotelDataArray');
        const hotelDataArrayFiltered = hotelDataArray.filter((item) => {
          return item['go-live-date'] === matchDate;
        });

        console.log(hotelDataArrayFiltered, 'hotelDataArrayFiltered');
        if(hotelDataArrayFiltered.length === 0) {
          return;
        }
        const messagingHTML = `
        <div class="${ID}-messaging">
          <p>
          Travelodge ${hotelDataArrayFiltered.map((item) => {
            return ` ${item["Hotel-Name"].replace('Travelodge', '')}`;
          })} ${hotelDataArrayFiltered.length > 1 ? 'are' : 'is'} currently undergoing essential system maintenance and as a result, 
          we are temporarily unable to accept new reservations at this time. Please return to our website after 11am today.
          </p>
        </div>`;

        const targetContainer = document.querySelector('.qa-search-page .qa-pagination-total');
        targetContainer.insertAdjacentHTML('afterbegin', messagingHTML);
      }
      catch(error) {
        console.log(error);
      }
    }

    findMatchAndQueryAPI();


  });

  // PDP Code
  pollerLite(['.pgHotel .rebaseContainer #hotel-address-content', 
    () => typeof window.DY.feedProperties === 'object' && 
    typeof window.DY.ServerUtil === 'object'], () => {
      console.log('Experiment started');

      const todaysDate = new Date();
      let formattedDate = todaysDate.toISOString().slice(0,10);
      console.log(formattedDate);
      const matchDate = formattedDate.split('-').reverse().join('/');
      // const matchDate = '17/04/2024'
      console.log(matchDate);

      const hotelSKU = window.DY.feedProperties['sku'];

      const getHotelData = (hotelSKU) => {
        return new Promise((resolve, reject) => {
          window.DY.ServerUtil.getProductsData([hotelSKU], ['daily', 'twoDays'], 'view', true, (err, res) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              const hotelData = res[hotelSKU].productData;
              // console.log(hotelData);
              resolve(hotelData);
            }
          });
        });
      };

      const findMatchAndQueryAPI = async () => {
        try {
          const hotelData = await getHotelData(hotelSKU);
          console.log(hotelData, 'hotelData');
          const hotelName = document.querySelector('.pgHotel .rebaseContainer .hotel-name').textContent.trim();
          if(hotelData['go-live-date'] === matchDate) {
            console.log('match');
            const messagingHTML = `
            <div class="${ID}-messaging">
              <p>Travelodge ${hotelName.replace('Travelodge', '')} is currently undergoing essential system maintenance and as a result, we are temporarily unable to accept new reservations at this time. 
              Please return to our website after 11am today.</p>
            </div>`;

            const targetContainer = document.querySelector('.pgHotel .rebaseContainer .c-breadcrumb').closest('section');
            targetContainer.insertAdjacentHTML('afterend', messagingHTML);
          }
        }
        catch(error) {
          console.log(error);
        }
      }

      findMatchAndQueryAPI();
    });
};

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();

};
