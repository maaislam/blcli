 /**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite, observer, setCookie } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;
let multipleRooms = false;
let multipleRoomsDetail = [];
let kidsBooking = false;

const openModal = () => {
  document.querySelector(`.${ID}-extrasmodal`).classList.add(`${ID}-visible`);
  document.documentElement.classList.add(`${ID}-noscroll`);
}

const closeModal = () => {
  document.querySelector(`.${ID}-extrasmodal`).classList.remove(`${ID}-visible`);
  document.documentElement.classList.remove(`${ID}-noscroll`);
}

const updateTotalPrice = () => {
  console.log('UPDATE TOTAL PRICE');
  let currTotalPrice = document.querySelector(`.total-price .value`).innerText;
  // console.log('currTotalPrice', currTotalPrice);
  if (multipleRooms == true) {
    // console.log('multipleRooms');
    currTotalPrice = '£' + document.querySelector(`.js-room-total-amount`).innerText;
  }
  document.querySelector(`.${ID}-totalamount`).innerText = currTotalPrice;

}

const checkForExtrasInRate = () => {
  const roomsInBooking = document.querySelectorAll('#bookingSummary .well');
  const numberOfRooms = roomsInBooking.length; 
  // console.log('roomsInBooking', roomsInBooking);

  let extrasArrayWifi = [];
  let extrasArrayBreakfast = [];
  roomsInBooking.forEach((room, index) => {
    //check for breakfast or wifi included in the rate
    const potentialExtras = room.querySelectorAll('.price-breakdown-info .night-breakdown .label');
    potentialExtras.forEach((extra) => {
      const extraText = extra.innerText.toLowerCase();
      if (extraText.includes('breakfast')) {
        extrasArrayBreakfast.push(extra.innerText);
      } else if (extraText.includes('wifi')) {
        extrasArrayWifi.push(extra.innerText);
      }
    });
    // console.log('extrasArray', extrasArray);
  });
  // do all rooms have wifi?
  const allRoomsHaveWifi = extrasArrayWifi.length == numberOfRooms;
  const someRoomsHaveWifi = extrasArrayWifi.length > 0;
  // do all rooms have breakfast?
  const allRoomsHaveBreakfast = extrasArrayBreakfast.length == numberOfRooms;
  
  if(allRoomsHaveWifi) {
    const roomWifi = document.querySelector(`.${ID}-extra-wifi`);
    roomWifi.classList.add(`${ID}-hidden`);
  } else if (someRoomsHaveWifi) {
    const roomWifi = document.querySelector(`.${ID}-extra-wifi`);
    roomWifi.querySelector('button').innerHTML = `
    <span class="${ID}-addedtext">Added</span>
    <span class="${ID}-addtext">Add wifi to remaining rooms</span>
    `;

    roomWifi.querySelector(`.${ID}-extra--multiplerooms`).classList.add(`${ID}-hidden`);
  }

  if(allRoomsHaveBreakfast) {
    const roomUnlimitedBreakfast = document.querySelector(`.${ID}-extra-unlimitedbreakfast`);
    if (roomUnlimitedBreakfast) {
      roomUnlimitedBreakfast.classList.add(`${ID}-hidden`);
    }
    const roomBreakfastToGo = document.querySelector(`.${ID}-extra-breakfasttogo`);
    if (roomBreakfastToGo) {
      roomBreakfastToGo.classList.add(`${ID}-hidden`);
    }

    //check to see if standard room plus && wifi included
    const roomTypes = document.querySelectorAll('#bookingSummary .well .room-type');
    const wifiIncluded = document.querySelector('#rebase .rateGroups div:last-child .img-pad ')
    const roomTypeText = [];
    roomTypes.forEach((room) => {
      roomTypeText.push(room.innerText.toLowerCase());
    });

  }
}

const getDYData = (hotelSKU) => {
  return new Promise((resolve, reject) => {
    pollerLite([() => { return window.DY }, () => { return window.DY.ServerUtil }], () => {
      window.DY.ServerUtil.getProductsData([hotelSKU], ['daily', 'twoDays'], 'view', true, function (err, res) {
        if (err) {
          reject(err);
        } else {
          const allData = res[hotelSKU];
          resolve(allData);
        }
      });
    });
  })
}

const setupModal = (currentPrices) => {

  pollerLite([
    `.total-price .value`,
    () => { return window.globalDataLayer }
  ], () => {

    let numDays = parseInt(window.globalDataLayer.night);
    let numAdults = parseInt(window.globalDataLayer.adults);
    let numRooms = parseInt(window.globalDataLayer.rooms);

    // Kids booking
    if (parseInt(window.globalDataLayer.children) > 0) {
      kidsBooking = true;
    }

    // Multiple Room bookings
    if (parseInt(window.globalDataLayer.rooms) > 1) {
      multipleRooms = true;
      let roomAdults = window.globalDataLayer.adultsPerRoom.split(';');
      let roomChildren = window.globalDataLayer.childrenPerRoom.split(';');
      for(let i = 0; i < numRooms; i++) {



        let roomObj = {
          roomNum: i + 1,
          roomAdults: roomAdults[i],
          roomChildren: roomChildren[i],
        }

        multipleRoomsDetail.push(roomObj);

      }

    }

    // Total Current Price

    let roomCurrTotalPrice = document.querySelector(`.total-price .value`).innerText;
    if(multipleRooms == true) {
      roomCurrTotalPrice = '£' + document.querySelector(`.js-room-total-amount`).innerText;
    }

    

    let breakfastType = window.globalDataLayer.hotelFacilities.indexOf('bar cafe') > -1 ? 'unlimitedbreakfast' : 'breakfasttogo'

    

    // Unlimited Breakfast
    let individualBreakfastPriceString = '£' + (currentPrices.breakfast).toFixed(2);
    let totalBreakfastPriceString = '£' + (currentPrices.breakfast * numAdults * numDays).toFixed(2);
    let breakfastPriceString = `${numAdults} adult${numAdults > 1 ? `s` : ``} x ${numDays} morning${numDays > 1 ? `s` : ``} = ${totalBreakfastPriceString}`;

    if(breakfastType == 'breakfasttogo') {
      individualBreakfastPriceString = '£' + (currentPrices.breakfasttogo).toFixed(2);
      totalBreakfastPriceString = '£' + (currentPrices.breakfasttogo * numAdults * numDays * numRooms).toFixed(2);
      breakfastPriceString = `${numAdults} adult${numAdults > 1 ? `s` : ``} x ${numDays} morning${numDays > 1 ? `s` : ``} = ${totalBreakfastPriceString}`;
    }

    // Wifi
    let currWifiPrice = currentPrices.wifi;
    let currWifiTotal = currWifiPrice * numDays;
    let totalWifiPriceString = '£' + (currWifiTotal).toFixed(2);
    let wifiPriceString = `${numDays} day${numDays > 1 ? `s` : ``} x £${currentPrices.wifi} = ${totalWifiPriceString}`;
    if(numDays > 4 && numDays <= 7) {
      currWifiPrice = 12;
      currWifiTotal = currWifiPrice;
      totalWifiPriceString = '£' + (currWifiTotal).toFixed(2);
      if(multipleRooms) {
        totalWifiPriceString = '£' + (currWifiTotal * numRooms).toFixed(2);
      }
      wifiPriceString = `1 week WiFi access at £${currWifiPrice}${multipleRooms == true ? ` x ${numRooms} room${numRooms > 1 ? `s` : ``}` : ``} = ${totalWifiPriceString}`;
    } else if (numDays > 7 && numDays <= 14) {
      currWifiPrice = 20;
      currWifiTotal = currWifiPrice;
      totalWifiPriceString = '£' + (currWifiTotal).toFixed(2);
      if (multipleRooms) {
        totalWifiPriceString = '£' + (currWifiTotal * numRooms).toFixed(2);
      }
      wifiPriceString = `2 weeks WiFi access at £${currWifiPrice}${multipleRooms == true ? ` x ${numRooms} room${numRooms > 1 ? `s` : ``}` : ``} = ${totalWifiPriceString}`;
    } else if (numDays > 14 && numDays < 31) {
      currWifiPrice = 35;
      currWifiTotal = currWifiPrice;
      totalWifiPriceString = '£' + (currWifiTotal).toFixed(2);
      if (multipleRooms) {
        totalWifiPriceString = '£' + (currWifiTotal * numRooms).toFixed(2);
      }
      wifiPriceString = `1 month WiFi access at £${currWifiPrice}${multipleRooms == true ? ` x ${numRooms} room${numRooms > 1 ? `s` : ``}` : ``} = ${totalWifiPriceString}`;
    }
    
    

    // Dinner
    let totalDinnerPriceString = '£' + (currentPrices.dinner * numAdults * numDays).toFixed(2);
    let individualDinnerPriceString = '£' + (currentPrices.dinner).toFixed(2);
    let dinnerPriceString = `${numAdults} adult${numAdults > 1 ? `s` : ``} x ${numDays} evening${numDays > 1 ? `s` : ``} = ${totalDinnerPriceString}`;

    // Early Check In
    let totalEarlyCheckInPriceString = '£' + (currentPrices.earlycheckin).toFixed(2);
    if(multipleRooms) {
      totalEarlyCheckInPriceString = '£' + (currentPrices.earlycheckin * numRooms).toFixed(2);
    }
    
    // Late Check Out
    let totalLateCheckOutPriceString = '£' + (currentPrices.latecheckout).toFixed(2);
    if (multipleRooms) {
      totalLateCheckOutPriceString = '£' + (currentPrices.latecheckout * numRooms).toFixed(2);
    }
    
    // Pets
    let totalPetsPriceString = '£' + (currentPrices.pets).toFixed(2);
    let individualPetPriceString = '£' + (currentPrices.pets).toFixed(2);
    let petsPriceString = `1 pet = ${totalPetsPriceString}`;

    //check for breakfast availability (kitchen closed)
    const extrasAvailable = window.checkExtras();
    // console.log('extrasAvailable', extrasAvailable);
    const breakfastAvailable = extrasAvailable[0].includes('breakfast');
    // console.log('breakfastAvailable', breakfastAvailable);

    let freeBreakfast = false;
			if (document.querySelector('.disc-rate-btn')) {
				if (document.querySelector('.disc-rate-btn').closest('.discount-row').querySelector('.disc-percent')) {
					freeBreakfast = true;
				}
			}

    let modalHTML = `
      <div class="${ID}-extrasmodal ${multipleRooms === true ? `${ID}-multipleroomsactive` : ``}">
      
        <div class="${ID}-extrasmodal--subnav">
          <div class="${ID}-subnav">
            <div class="${ID}-subnav--links">
              <p>1. Your room</p>
            </div>
            <div class="${ID}-subnav--links ${ID}-active">
              <p>2. Your extras</p>
            </div>
            <div class="${ID}-subnav--links">
              <p>3. Review &amp; Pay</p>
            </div>

            <div class="${ID}-subnav--progressbar"></div>
          </div>

        </div>
    
        <div class="${ID}-extrasmodal--content">
          <div class="${ID}-extras ${breakfastType}">
          
            <div class="${ID}-extras--header">
              <h2>Choose your extras<span class="${ID}-skip">Skip</span></h2>
              <p> Enhance your stay with our great value extras. </p>
            </div>

            <div class="${ID}-extras--holder">


              ${breakfastType == 'unlimitedbreakfast' ? `

                <!-- HERO EXTRA - Unlimited Breakfast -->

                <div id="${ID}-extra-unlimitedbreakfast" class="${ID}-extra ${ID}-hero ${ID}-extra-unlimitedbreakfast ${breakfastAvailable ? '' : `${ID}-hidden`} ${freeBreakfast ? `${ID}-hidden` : ''}">
                
                  <div class="${ID}-extra--header">
                    
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.6796 23.0401V1.44006C15.1763 3.62103 14.29 11.7158 14.4098 15.4905L17.1645 17.2731L16.4459 23.0401H19.6796Z" stroke="#464646" stroke-width="1.92" stroke-linejoin="round"/><path d="M6.01719 2.08892C6.01719 1.402 6.96546 1.23026 7.4396 1.23026C7.91373 1.23026 8.86198 1.402 8.86198 2.08892M6.01719 2.08892C6.01719 2.77584 6.01719 6.15321 6.01719 7.75603V2.08892ZM6.01719 2.08892C5.54306 1.45924 2.63897 -0.100984 2.63898 2.08892C2.639 5.64416 1.21658 11.8776 5.30599 11.8776V21.4945C5.306 22.0097 5.73272 23.0401 7.4396 23.0401C9.14647 23.0401 9.57318 22.0097 9.57318 21.4945V11.8776C13.6626 11.8776 12.2402 4.6056 12.2402 2.08892C12.2402 -0.100984 9.33612 1.45924 8.86198 2.08892M8.86198 2.08892V7.75603" stroke="#464646" stroke-width="1.92"/></svg>
                    <h3>Unlimited Breakfast</h3>


                      <span class="${ID}-breakfastprice">${individualBreakfastPriceString}<span>pp</span></span>
                    
                  </div>

                  <div class="${ID}-extra--content">
                  
                    <div class="${ID}-extra--contentleft" style="height: 160px;">
                      <img src="https://media.travelodge.co.uk/image/upload/c_scale,w_360/c_crop,g_south,h_150,w_360,y_30/extras/BreakfastImage_RT.webp" class="${ID}-unlimited-breakfast" alt="Unlimited Breakfast" />
                    </div>

                    <div class="${ID}-extra--contentinner">
                      <p>Wake up to Lavazza coffee, <span class="${ID}-bold">our cooked breakfast items from the grill, pastries from the bakery, plant based delights</span> and lots more.</p>

                      <div class="${ID}-menus">View 
                        <a target="_blank" href="https://travelodge.wpengine.com/wp-content/uploads/2023/06/Breakfast-Menu_web.pdf">breakfast menu</a>
                      </div>

                      <p> Unlimited breakfast: <span id="${ID}-breakfast-total">${breakfastPriceString}</span></p>

                      <button class="${ID}-button" data-extratype="breakfast"><span class="${ID}-addedtext">Added</span>${multipleRooms == true ? `<span class="${ID}-addtext">Add to all</span>` : `<span class="${ID}-addtext">Add</span>`} unlimited breakfast</button>
                    </div>
                  
                  </div>
                 

                </div>

              ` : `
              
                <!-- EXTRA - Breakfast To Go -->

                <div id="${ID}-extra-breakfasttogo" class="${ID}-extra ${ID}-extra-breakfasttogo">
                
                  <div class="${ID}-extra--header">
                    
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.6796 23.0401V1.44006C15.1763 3.62103 14.29 11.7158 14.4098 15.4905L17.1645 17.2731L16.4459 23.0401H19.6796Z" stroke="#464646" stroke-width="1.92" stroke-linejoin="round"/><path d="M6.01719 2.08892C6.01719 1.402 6.96546 1.23026 7.4396 1.23026C7.91373 1.23026 8.86198 1.402 8.86198 2.08892M6.01719 2.08892C6.01719 2.77584 6.01719 6.15321 6.01719 7.75603V2.08892ZM6.01719 2.08892C5.54306 1.45924 2.63897 -0.100984 2.63898 2.08892C2.639 5.64416 1.21658 11.8776 5.30599 11.8776V21.4945C5.306 22.0097 5.73272 23.0401 7.4396 23.0401C9.14647 23.0401 9.57318 22.0097 9.57318 21.4945V11.8776C13.6626 11.8776 12.2402 4.6056 12.2402 2.08892C12.2402 -0.100984 9.33612 1.45924 8.86198 2.08892M8.86198 2.08892V7.75603" stroke="#464646" stroke-width="1.92"/></svg>
                    <h3>Breakfast to Go</h3>
                    
                  </div>

                  <div class="${ID}-extra--content">

                    <div class="${ID}-extra--contentinner">
                      <p style="margin-bottom: 10px">NEW breakfast to go includes breakfast favourites cornflakes, apple juice, a pain au chocolat and an oaty flapjack snack to keep you powered until lunch. </p>

                      <p> Breakfast to Go: <span id="${ID}-wifi-total">${breakfastPriceString}</span></p>

                      <button class="${ID}-button" data-extratype="breakfast"><span class="${ID}-addedtext">Added</span>${multipleRooms == true ? `<span class="${ID}-addtext">Add to all</span>` : `<span class="${ID}-addtext">Add</span>`} breakfast</button>
                    </div>
                  
                  </div>
                
                </div>
              
              ` }

              ${breakfastType == 'unlimitedbreakfast' ? `
              <!-- EXTRA - Dinner -->

              <div id="${ID}-extra-dinner" class="${ID}-extra ${ID}-extra-dinner">
              
                <div class="${ID}-extra--header">
                  
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.6796 23.0401V1.44006C15.1763 3.62103 14.29 11.7158 14.4098 15.4905L17.1645 17.2731L16.4459 23.0401H19.6796Z" stroke="#464646" stroke-width="1.92" stroke-linejoin="round"/><path d="M6.01719 2.08892C6.01719 1.402 6.96546 1.23026 7.4396 1.23026C7.91373 1.23026 8.86198 1.402 8.86198 2.08892M6.01719 2.08892C6.01719 2.77584 6.01719 6.15321 6.01719 7.75603V2.08892ZM6.01719 2.08892C5.54306 1.45924 2.63897 -0.100984 2.63898 2.08892C2.639 5.64416 1.21658 11.8776 5.30599 11.8776V21.4945C5.306 22.0097 5.73272 23.0401 7.4396 23.0401C9.14647 23.0401 9.57318 22.0097 9.57318 21.4945V11.8776C13.6626 11.8776 12.2402 4.6056 12.2402 2.08892C12.2402 -0.100984 9.33612 1.45924 8.86198 2.08892M8.86198 2.08892V7.75603" stroke="#464646" stroke-width="1.92"/></svg>
                  <h3>Dinner</h3>
                  
                </div>

                <div class="${ID}-extra--content">

                  <div class="${ID}-extra--contentinner">
                    <p style="margin-bottom: 19px">Only ${individualDinnerPriceString} per person, per evening. </p>

                    <div class="${ID}-menus">View 
                      <a target="_blank" href="https://media.travelodge.co.uk/image/upload/extras/menus/Food-Menu.pdf">dinner menu${kidsBooking == true ? `,` : ``}</a>
                      ${kidsBooking == true ? `<a target="_blank" href="https://media.travelodge.co.uk/image/upload/extras/menus/Kids-Menu.pdf">kids menu, </a>` : ``}
                      <a target="_blank" href="https://www.travelodge.co.uk/about/allergen-information/">or allergen charts</a>
                    </div>

                    <p> Dinner: <span id="${ID}-dinner-total">${dinnerPriceString}</span></p>

                    <button class="${ID}-button" data-extratype="dinner"><span class="${ID}-addedtext">Added</span>${multipleRooms == true ? `<span class="${ID}-addtext">Add to all</span>` : `<span class="${ID}-addtext">Add</span>`} dinner</button>
                  </div>
                
                </div>
              
              </div>

              ` : ``}

              <!-- EXTRA - Early Check In -->

              <div id="${ID}-extra-earlycheckin" class="${ID}-extra ${ID}-extra-earlycheckin">
              
                <div class="${ID}-extra--header">
                  
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Group"><path id="Vector" d="M12 23.04C18.0972 23.04 23.04 18.0972 23.04 12C23.04 5.9028 18.0972 0.960022 12 0.960022C5.9028 0.960022 0.960022 5.9028 0.960022 12C0.960022 18.0972 5.9028 23.04 12 23.04Z" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/><path id="Vector_2" d="M12.0001 4.45001V12.4356" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/><path id="Vector_3" d="M16.1723 16.6078L12.0001 12.4356" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                  <h3>Early Check in</h3>
                  
                </div>

                <div class="${ID}-extra--content">

                  <div class="${ID}-extra--contentinner">
                    <p>Check in from 12 noon for only £10 per room. </p>

                    <button class="${ID}-button" data-extratype="earlyIn"><span class="${ID}-addedtext">Added</span>${multipleRooms == true ? `<span class="${ID}-addtext">Add to all</span>` : `<span class="${ID}-addtext">Add</span>`} early check in</button>
                  
                  </div>
                
                </div>
              
              </div>


              <!-- EXTRA - WiFi -->

              <div id="${ID}-extra-wifi" class="${ID}-extra ${ID}-extra-wifi">
              
                <div class="${ID}-extra--header">
                  
                  <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Group"><path id="Vector" d="M19.8669 12.0056C18.3874 8.9189 15.4209 6.80853 12 6.80853C8.5791 6.80853 5.61257 8.9189 4.13306 12.0056" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/><path id="Vector_2" d="M16.5551 15.3251C15.6989 13.5377 13.9828 12.3173 12.0001 12.3173C10.0174 12.3173 8.30135 13.5377 7.44519 15.3251" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/><path id="Vector_3" d="M23.04 8.68606C20.9635 4.35267 16.8028 1.38989 12 1.38989C7.19725 1.38989 3.03659 4.35267 0.960022 8.68606" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/><path id="Vector_4" d="M12.278 18.8549C12.4688 18.8549 12.6235 18.6868 12.6235 18.4794C12.6235 18.272 12.4688 18.1039 12.278 18.1039C12.0872 18.1039 11.9326 18.272 11.9326 18.4794C11.9326 18.6868 12.0872 18.8549 12.278 18.8549Z" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                  <h3>WiFi</h3>
                  
                </div>

                <div class="${ID}-extra--content">

                  <div class="${ID}-extra--contentinner">
                    <p style="margin-bottom: 32px">Our best ever WiFi powered by Virgin Media. Stream your favourite shows and sports with no limits. </p>

                    <p> Wifi: <span id="${ID}-wifi-total">${wifiPriceString}</span></p>

                    <button class="${ID}-button" data-extratype="wifi"><span class="${ID}-addedtext">Added</span>${multipleRooms == true ? `<span class="${ID}-addtext">Add to all</span>` : `<span class="${ID}-addtext">Add</span>`} wifi</button>
                  </div>
                
                </div>
              
              </div>














              <!-- EXTRA - Late Check Out -->

              <div id="${ID}-extra-latecheckout" class="${ID}-extra ${ID}-extra-latecheckout">
              
                <div class="${ID}-extra--header">
                  
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Group"><path id="Vector" d="M12 23.04C18.0972 23.04 23.04 18.0972 23.04 12C23.04 5.9028 18.0972 0.960022 12 0.960022C5.9028 0.960022 0.960022 5.9028 0.960022 12C0.960022 18.0972 5.9028 23.04 12 23.04Z" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/><path id="Vector_2" d="M12.0001 4.45001V12.4356" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/><path id="Vector_3" d="M16.1723 16.6078L12.0001 12.4356" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                  <h3>Late Check out</h3>
                  
                </div>

                <div class="${ID}-extra--content">

                  <div class="${ID}-extra--contentinner">
                    <p>Keep your room until 2pm for only £10 per room. </p>

                    <button class="${ID}-button" data-extratype="lateOut"><span class="${ID}-addedtext">Added</span>${multipleRooms == true ? `<span class="${ID}-addtext">Add to all</span>` : `<span class="${ID}-addtext">Add</span>`} late check out</button>
                  
                  </div>
                
                </div>
              
              </div>




              <!-- EXTRA - Pets -->

              <div id="${ID}-extra-pets" class="${ID}-extra ${ID}-extra-pets">
              
                <div class="${ID}-extra--header">
                
                  <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Group"><path id="Vector" d="M12.1613 21.2926C12.0131 21.2679 11.1976 21.3873 8.9159 21.7415C4.68615 22.3963 4.17545 18.8256 5.341 17.0711C6.50655 15.3166 7.60208 15.9055 8.25693 13.422C8.91178 10.9385 12.1243 10.7244 12.1243 10.7244H12.3467C12.3467 10.7244 15.555 10.9426 16.214 13.422C16.8729 15.9014 17.9644 15.3207 19.1299 17.0711C20.2955 18.8214 19.7848 22.3963 15.555 21.7415C13.1168 21.3626 12.4249 21.2885 12.2725 21.2885H12.1613V21.2926Z" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/><path id="Vector_2" d="M18.9873 6.0527C19.4012 4.08501 18.6306 2.25719 17.2662 1.97015C15.9017 1.68311 14.46 3.04554 14.0461 5.01323C13.6321 6.98092 14.4027 8.80874 15.7672 9.09579C17.1316 9.38283 18.5733 8.02039 18.9873 6.0527Z" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/><path id="Vector_3" d="M22.8188 12.1524C23.299 10.6248 22.8299 9.11653 21.7709 8.78367C20.712 8.45081 19.4643 9.41935 18.9841 10.947C18.5039 12.4746 18.9731 13.9829 20.032 14.3157C21.0909 14.6486 22.3386 13.68 22.8188 12.1524Z" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/><path id="Vector_4" d="M8.40845 9.08539C9.77292 8.79835 10.5435 6.97053 10.1295 5.00284C9.71559 3.03515 8.27391 1.67271 6.90944 1.95976C5.54497 2.2468 4.77441 4.07462 5.18835 6.04231C5.60229 8.01 7.04398 9.37243 8.40845 9.08539Z" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/><path id="Vector_5" d="M4.13628 14.3162C5.19521 13.9833 5.66437 12.4751 5.18417 10.9475C4.70398 9.41983 3.45627 8.45128 2.39734 8.78414C1.33841 9.117 0.869256 10.6252 1.34945 12.1529C1.82965 13.6805 3.07736 14.6491 4.13628 14.3162Z" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                  <h3>Pets</h3>
                  
                </div>

                <div class="${ID}-extra--content">

                  <div class="${ID}-extra--contentinner">
                    <p>Only ${individualPetPriceString} per pet, per stay </p>

                    <button class="${ID}-button" data-extratype="pets"><span class="${ID}-addedtext">Added</span>${multipleRooms == true ? `<span class="${ID}-addtext">Add</span>` : `<span class="${ID}-addtext">Add</span>`} pets</button>
                  
                  </div>
                
                </div>
              
              </div>


          
            </div>

          </div>
        
        </div>

        <div class="${ID}-extrasmodal--footer">
          <div class="${ID}-extrasmodal--footertotal">
            <p>Total:</p>
            <p class="${ID}-totalamount">${roomCurrTotalPrice}</p>
          </div>
          <div class="${ID}-extrasmodal--footerbutton">
            <button id="${ID}-reviewbutton" class="${ID}-reviewbutton">Proceed to booking summary</button>
          </div>
        </div>

      </div>

    `;

    document.body.insertAdjacentHTML('afterbegin', modalHTML);

    document.getElementById('formBookRoom').insertAdjacentHTML('afterbegin', `<input type="hidden" name="blSkipExtras" value="true" id="${ID}-skipExtras" />`);

    if(multipleRooms == true) {

      let multipleRoomsHTML = `

        <div class="${ID}-extra--multiplerooms">
                  
          <button class="${ID}-extra--multipleroomsbutton">Apply to specific rooms <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 6.98668C14.0002 7.10668 13.9535 7.22668 13.8602 7.32002C13.6802 7.50002 13.3802 7.50002 13.2002 7.32002L7.20017 1.31335L1.19351 7.32002C1.01351 7.50002 0.720174 7.50002 0.533507 7.32002C0.346841 7.14002 0.353507 6.84002 0.533507 6.66002L7.20017 1.71661e-05L13.8668 6.66002C13.9535 6.75335 14.0002 6.87335 14.0002 6.98668Z" fill="black"/></svg></button>
          <div class="${ID}-multiplerooms">
          
            ${multipleRoomsDetail.map((room) => {

              return `
              
                <div class="${ID}-multiplerooms--room ${ID}-active">
                  <button class="${ID}-multiplerooms--roombutton" data-roomnum="${room.roomNum}" data-extratype>
                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Tick"><path id="Vector 23" d="M1.64014 10.9415L5.65468 14.855L16.3601 2.375" stroke="#464646" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                  </button>
                  <div class="${ID}-multiplerooms--roominner">
                    <h3>Room ${room.roomNum}</h3>
                    <p>Adults: ${room.roomAdults}, Children: ${room.roomChildren}</p>
                  </div>
                </div>
              
              `;

            }).join('')}
          
          
          </div>


        </div>

      `;

      let allCurrExtras = document.querySelectorAll(`.${ID}-extra`);

      allCurrExtras.forEach((currExtra) => {
        currExtra.insertAdjacentHTML('beforeend', multipleRoomsHTML);
      });

    }

    fireEvent(`Interaction - extras modal loaded and ready for use`, true);

    // Trigger re render on pagniation change
    // const wrap = document.getElementById('bookingSummary');
    // observer.connect(wrap, () => {

    //   updateTotalPrice();

    // }, {
    //   config: {
    //     attributes: true,
    //     childList: true,
    //     subtree: true,
    //   }
    // });

        // update total price if price changes
        let currTotalPrice = 0;
        setInterval(() => {
          if (document.querySelector(`.total-price .value`).innerText !== currTotalPrice) {
            updateTotalPrice();
            currTotalPrice = document.querySelector(`.total-price .value`).innerText;
          }
        }, 100);

    document.documentElement.addEventListener('click', (e) => {

      if (e.target.classList.contains(`${ID}-close`) || e.target.closest(`.${ID}-close`)) {
        fireEvent('Click - Close Extras modal using close X', true);
        // closeModal();
      }

      if (e.target.classList.contains(`${ID}-noscroll`) && !e.target.closest(`.${ID}-extrasmodal`)) {
        fireEvent('Click - Close Extras modal using outside click', true);
        // closeModal();
      }

      if(e.target.classList.contains(`${ID}-skip`) || e.target.closest(`.${ID}-skip`)) {
        fireEvent('Click - Skip Extras modal', true);
        setCookie(`${ID}-skip-extras`, true);
        document.querySelector(`.${ID}-original-review-button`).click();
      }

      if(e.target.classList.contains(`.${ID}-button`) || e.target.closest(`.${ID}-button`)) {
        

        let currButton = e.target.classList.contains(`.${ID}-button`) ? e.target : e.target.closest(`.${ID}-button`);
        let currExtra = currButton.getAttribute('data-extratype');

        if (currButton.classList.contains(`${ID}-active`)) {
          let removeProductResult = window.removeProduct(currExtra);
          if (removeProductResult) {
            currButton.classList.remove(`${ID}-active`);
            currButton.classList.remove(`${ID}-remove`);
            if(multipleRooms == true) {
              currButton.closest(`.${ID}-extra`).querySelectorAll(`.${ID}-multiplerooms--roombutton`).forEach((currRoomButton) => {
                currRoomButton.classList.remove(`${ID}-active`);
              });
            }
            updateTotalPrice();
          }

          fireEvent(`Click - Remove Extras ${currExtra}`, true);

        } else {
          let addProductResult = window.addProduct(currExtra);
          if (addProductResult) {
            console.log('ADD PRODUCT RESULT', addProductResult);
            currButton.classList.add(`${ID}-active`);
            currButton.classList.add(`${ID}-remove`);
            if (multipleRooms == true && currExtra !== 'pets') {
              currButton.closest(`.${ID}-extra`).querySelectorAll(`.${ID}-multiplerooms--roombutton`).forEach((currRoomButton) => {
                currRoomButton.classList.add(`${ID}-active`);
              });
            }
            if(multipleRooms == true && currExtra == 'pets') {
              currButton.closest(`.${ID}-extra`).querySelector(`.${ID}-multiplerooms--roombutton`).classList.add(`${ID}-active`);
            }
            updateTotalPrice();
          }

          fireEvent(`Click - Add Extras ${currExtra}`, true);
        }
      }

      if (e.target.id == `${ID}-reviewbutton`) {
        setCookie(`${ID}-skip-extras`, true);
        document.querySelector(`.${ID}-original-review-button`).click();
        fireEvent(`Click - user clicked review booking, will be taken to checkout page`, true);
      }

      if(e.target.classList.contains(`${ID}-extra--multipleroomsbutton`) || e.target.closest(`.${ID}-extra--multipleroomsbutton`)) {

        let currButton = e.target.classList.contains(`${ID}-extra--multipleroomsbutton`) ? e.target : e.target.closest(`.${ID}-extra--multipleroomsbutton`);
        let currExtra = currButton.getAttribute('data-extratype');

        if(currButton.classList.contains(`${ID}-active`)) {
          currButton.classList.remove(`${ID}-active`);
          currButton.closest(`.${ID}-extra--multiplerooms`).classList.remove(`${ID}-active`);
        } else {
          currButton.classList.add(`${ID}-active`);
          currButton.closest(`.${ID}-extra--multiplerooms`).classList.add(`${ID}-active`);
        }

        fireEvent(`Click - user has clicked to see multiple room options for ${currExtra}`, true);

      }

      if(e.target.classList.contains(`${ID}-multiplerooms--roombutton`) || e.target.closest(`.${ID}-multiplerooms--roombutton`)) {

        let currButton = e.target.classList.contains(`${ID}-multiplerooms--roombutton`) ? e.target : e.target.closest(`.${ID}-multiplerooms--roombutton`);
        let roomNum = currButton.getAttribute('data-roomnum');
        let currExtra = currButton.closest(`.${ID}-extra`).querySelector(`.${ID}-button`).getAttribute('data-extratype');
        let numRooms = multipleRoomsDetail.length;

        if(currButton.classList.contains(`${ID}-active`)) {
          let removeProductResult = window.removeProduct(currExtra, parseInt(roomNum-1));
          if (removeProductResult) {
            currButton.classList.remove(`${ID}-active`);
            updateTotalPrice();
          }
          fireEvent(`Click - Remove Single Room Extra ${currExtra}`, true);
        } else {
          let addProductResult = window.addProduct(currExtra, parseInt(roomNum-1));
          if (addProductResult) {
            currButton.classList.add(`${ID}-active`);
            updateTotalPrice();
          }
          fireEvent(`Click - Add Single Room Extra ${currExtra}`, true);
        }

        if (currButton.closest(`.${ID}-extra`).querySelectorAll(`.${ID}-multiplerooms--roombutton.${ID}-active`).length == numRooms) {
          currButton.closest(`.${ID}-extra`).querySelector(`.${ID}-button`).classList.add(`${ID}-active`);
          currButton.closest(`.${ID}-extra`).querySelector(`.${ID}-button`).classList.add(`${ID}-remove`);
        }

        if (currButton.closest(`.${ID}-extra`).querySelectorAll(`.${ID}-multiplerooms--roombutton.${ID}-active`).length == 0) {
          currButton.closest(`.${ID}-extra`).querySelector(`.${ID}-button`).classList.remove(`${ID}-active`);
          currButton.closest(`.${ID}-extra`).querySelector(`.${ID}-button`).classList.remove(`${ID}-remove`);
        }

      }

    });


  });

  

}

const checkForStandardRoomPlusAndWifi = () => {
  let standardPlusAndWifi = false;

  const roomType = document.querySelector('#bookingSummary .well .room-type').innerText.trim();


}

const startExperiment = () => {

  pollerLite(['.bookNow'], () => {
    let currBookNows = document.querySelectorAll('.bookNow');
    currBookNows.forEach((currBookNow) => {
      currBookNow.classList.add(`${ID}-hidden`);
      currBookNow.classList.add(`${ID}-original-review-button`)
      let newBookNowButtonHTML = `
        <button id="${ID}-booknow" class="${ID}-booknow btn btn-primary stickyButton bookNow btn-block sticky-rebase selectAnimation">Proceed to Extras</button>
      `;
      currBookNow.insertAdjacentHTML('afterend', newBookNowButtonHTML);
    });

    let newBookNowButtons = document.querySelectorAll(`.${ID}-booknow`);
    newBookNowButtons.forEach((newBookNowButton) => {
      newBookNowButton.addEventListener('click', (e) => {
        e.preventDefault();
        fireEvent('Click - Proceed to Extras modal', true);
        //check for rate selected = Standard Room Plus and Wifi
        checkForExtrasInRate();
        openModal();
      })
    });

  })

}


const addTracking = () => {

  document.body.addEventListener('click', (e) => {

    if(e.target.classList.contains(`bookNow`) || e.target.closest(`.bookNow`) && VARIATION == "control") {

      fireEvent('Click - user has clicked on the original book now button button', true);

    }


  });


}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  addTracking();

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



  if(window.location.href.indexOf('checkIn') > -1) {
    // console.log('checkIn present');
    pollerLite([() => { return window.globalDataLayer.hotelCode != undefined && window.checkExtras != undefined }], () => {
      let dyData;
      getDYData(window.globalDataLayer.hotelCode).then((res) => {
        dyData = res;
        
        let currentPrices = {
          breakfast: parseFloat(dyData.productData['Brkfst-£']),
          breakfasttogo: parseFloat(dyData.productData['Brkfst-Box-£']),
          wifi: 3,
          dinner: parseFloat(dyData.productData['Dinner-£']),
          earlycheckin: 10,
          latecheckout: 10,
          pets: 20,
        }

        setupModal(currentPrices);
        startExperiment();

      });
    });
  } else {
    fireEvent(`Interaction - user has hit the page without entering dates, nothing happens`, true);
  }

  
  
};