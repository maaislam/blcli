/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite, observer } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const daysOfWeekShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const roomTypes = [
    { name: 'Single Room', code: 'SN' },
    { name: 'Standard Double Room', code: 'DN' },
    { name: 'Double with Sofa Bed', code: 'DNS' },
    { name: 'Standard Twin Room', code: 'S2N' },
    { name: 'Triple Room', code: 'S3N' },
    { name: 'Twin Room Zip & Link with Sofa Bed', code: 'S2ZN' },
    { name: 'Family Room', code: 'DSPN' },
    { name: 'Accessible Family Room', code: 'DAFN' },
    { name: 'Accessible Double Room', code: 'DAMN' },
    { name: 'Double Disabled Room', code: 'DHN' },
    { name: 'Accessible Room', code: 'DHZN' },
    { name: 'Double or Single Room', code: 'DSN' },
    { name: 'Small Family Room', code: 'SFN' },
    { name: 'Single SuperRoom', code: 'BRSN' },
    { name: 'SuperRoom', code: 'BRDN' },
    { name: 'SuperRoom with Sofa Bed', code: 'BRDNS' },
    { name: 'Double SuperRoom', code: 'BRD2N' },
    { name: 'Twin SuperRoom', code: 'BRS2N' },
    { name: 'Triple SuperRoom', code: 'BRS3N' },
    { name: 'Super Twin Zip & Link', code: 'BRS2ZN' },
    { name: 'Super Twin Zip & Link with Sofa Bed', code: 'BRS2ZS' },
    { name: 'Family SuperRoom', code: 'BRDSPN' },
    { name: 'Accessible Family SuperRoom', code: 'BRDAFN' },
    { name: 'Accessible Double SuperRoom', code: 'BRDAMN' },
    { name: 'Super Double Disabled Room', code: 'BRDHN' },
    { name: 'Accessible SuperRoom', code: 'BRDHZN' },
    { name: 'Super Double or Single Room', code: 'BRDSN' },
    { name: 'Standard Room with Fridge & Microwave', code: 'DNFM' },
    { name: 'Standard Room Plus', code: 'CPDN' },
    { name: 'Family Room Plus', code: 'CPDSPN' },
    { name: 'Accessible Room Plus', code: 'CPDHZN' }
];

const updateContentBlockHeight = () => {
  let windowHeight = window.innerHeight;

  let percentageAmount = windowHeight * 0.7;
  if(window.outerWidth < 768) {
    percentageAmount = windowHeight * 0.9;
  }

  let ssBlockHeight = document.querySelector(`.${ID}-content > h2`).offsetHeight;
  let totalsBlockHeight = document.querySelector(`.${ID}-totals-outer`).offsetHeight;
  // calculate the percentage of available space
  let totalSpaceRemoved = ssBlockHeight + totalsBlockHeight + 20;
  let totalsBlockHeightPercentage = (totalSpaceRemoved / percentageAmount) * 100;
  document.querySelector(`.${ID}-content`).style.height = `${percentageAmount}px`;
  document.querySelector(`.${ID}-staysummary`).style.height = `${100 - totalsBlockHeightPercentage}%`;
}

const startExperiment = (dataLayer) => {
    document.documentElement.classList.add(`${ID}-exp-started`);

    // Room Details

    let roomsArray = [];

    let rooms = dataLayer.basketHotelName;

    roomsArray = rooms.split(';');

    roomsArray.filter((item, index) => {
        let roomDetails = {
            roomType: dataLayer.basketRoomCodePerRoom.split(';')[index],
            checkIn: dataLayer.basketRoomCheckIn.split(';')[index],
            checkOut: dataLayer.basketRoomCheckOut.split(';')[index],
            extras: dataLayer.basketRoomExtras.split(';')[index],
            adults: dataLayer.adultsPerRoom.split(';')[index],
            children: dataLayer.childrenPerRoom.split(';')[index],
            nights: dataLayer.nights.split(';')[index],
            roomRateType: dataLayer.basketRoomRateType.split(';')[index]
        };

        roomsArray[index] = roomDetails;
    });

    let uniqueStaysArray = [];

    uniqueStaysArray = roomsArray.map((item) => {
        return { checkIn: item.checkIn, checkOut: item.checkOut, roomsDetails: [] };
    });

    uniqueStaysArray.filter((item, index) => {
        let stayDetails = {
            checkIn: item.checkIn,
            checkOut: item.checkOut,
            roomsDetails: roomsArray.filter((room) => {
                return room.checkIn == item.checkIn;
            })
        };

        uniqueStaysArray[index] = stayDetails;
    });

    let prevCheckIn = '';
    let prevCheckOut = '';
    let staysArray = [];
    uniqueStaysArray.filter((item) => {
        if (item.checkIn != prevCheckIn || item.checkOut != prevCheckOut) {
            let stayDetails = {
                checkIn: item.checkIn,
                checkOut: item.checkOut,
                roomsDetails: roomsArray.filter((room) => {
                    return room.checkIn == item.checkIn || room.checkOut == item.checkOut;
                })
            };

            staysArray.push(stayDetails);
        }

        prevCheckIn = item.checkIn;
        prevCheckOut = item.checkOut;
    });

    let totalNumGuests = 0;

    totalNumGuests = parseInt(dataLayer.adults) + parseInt(dataLayer.children);

    let newShowHideButtonHTML = `
    
      <div class="col-3 col-sm-6 col-md-3 col-lg-3 col-xs-6 ${ID}-showhide--wrapper">
          <button id="${ID}-showhide">View details</button>
      </div>

    `;

    const input = document.querySelector('.miniSearch .input-group.groupLocation');
    input.parentElement.classList.add(`${ID}-hidden`);
    input.parentElement.insertAdjacentHTML('beforebegin', newShowHideButtonHTML);

    document.getElementById(`${ID}-showhide`).addEventListener('click', (e) => {
        document.querySelector(`.${ID}-meta`).classList.toggle(`${ID}-metaactive`);
        document.querySelector(`.${ID}-rooms`).classList.toggle(`${ID}-hidden`);
        fireEvent('Click - show/hide details button clicked on', true);
        if (e.target.innerText == 'View details') {
            e.target.innerText = 'Hide details';
        } else {
            e.target.innerText = 'View details';
        }
    });

    let currencyCode = window.location.href.indexOf('.co.uk') ? '£' : '€';

    if(VARIATION == 1) {

        // VARIANT 1 -----------------------------------------------

        let newHTML = `

        <div class="${ID}-content">
  
          <div class="${ID}-location">
            <div class="${ID}-location--icon"><svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.72392 1.15198C3.69032 1.15198 1.23271 3.50273 1.23271 6.40443C1.23271 6.40443 0.775755 11.745 6.72392 18.048C6.72392 18.048 12.2151 13.846 12.2151 6.40443C12.2151 3.50273 9.75752 1.15198 6.72392 1.15198Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.72398 6.84151C7.22872 6.84151 7.6379 6.45012 7.6379 5.96732C7.6379 5.48452 7.22872 5.09314 6.72398 5.09314C6.21923 5.09314 5.81006 5.48452 5.81006 5.96732C5.81006 6.45012 6.21923 6.84151 6.72398 6.84151Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            <span class="${ID}-location--text">Travelodge ${dataLayer.basketHotelName.split(';')[0]}</span>
          </div>
  
          ${staysArray.map((item) => {
          // Date formatting
  
          let searchedCheckIn = item.checkIn.replaceAll('/', '-');
          let searchedCheckOut = item.checkOut.replaceAll('/', '-');
  
          var searchedCheckoutParts = searchedCheckOut.split('-');
          var searchedCheckoutDate = new Date(searchedCheckoutParts[2], searchedCheckoutParts[1] - 1, searchedCheckoutParts[0]);
  
          var searchedCheckinParts = searchedCheckIn.split('-');
          var searchedCheckinDate = new Date(searchedCheckinParts[2], searchedCheckinParts[1] - 1, searchedCheckinParts[0]);
  
          let searchedCheckinFormatted = daysOfWeek[searchedCheckinDate.getDay()] + ' ' + searchedCheckinDate.getDate() + ' ' + monthsOfYear[searchedCheckinDate.getMonth()];
          let searchedCheckoutFormatted = daysOfWeek[searchedCheckoutDate.getDay()] + ' ' + searchedCheckoutDate.getDate() + ' ' + monthsOfYear[searchedCheckoutDate.getMonth()];
  
          let dlExtras = dataLayer.basketRoomExtras;
          let dlExtraPrices = dataLayer.basketRoomExtrasDetailedCost;

          let allExtras = dlExtras.split(';');
          let allExtraPrices = dlExtraPrices.split(';');          

          allExtras.forEach((item, index) => {
            if(item == '') {
              allExtraPrices.splice(index, 0, '0');
            } 
          });         
          
          return `
              
                <div class="${ID}-dates">
  
                  <div class="${ID}-dates--checkin">
                    
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.4321 3.04919H0.768066V18.6358H18.4321V3.04919Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.4321 3.04919H0.768066V9.28535H18.4321V3.04919Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.06836 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.60254 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.1318 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <div class="${ID}-dates--checkinlabel"><span>Check-in:</span> ${searchedCheckinFormatted} </div>
                  </div>
  
                  <div class="${ID}-dates--checkout">
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.4321 3.04919H0.768066V18.6358H18.4321V3.04919Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.4321 3.04919H0.768066V9.28535H18.4321V3.04919Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.06836 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.60254 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.1318 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <div class="${ID}-dates--checkoutlabel"><span>Check-out:</span> ${searchedCheckoutFormatted} </div>
                  </div>
  
                  
  
                </div>
  
                <div class="${ID}-meta">
  
                    <div class="${ID}-meta--nights">
                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.0603 13.943C10.3525 13.943 6.53554 10.126 6.53554 5.41818C6.53554 3.7017 7.04626 2.10426 7.92178 0.767944C4.03186 1.75098 1.15186 5.26458 1.15186 9.45786C1.15186 14.4153 5.16849 18.4319 10.1259 18.4319C13.6895 18.4319 16.7615 16.3468 18.2091 13.3363C17.2338 13.7241 16.1739 13.943 15.0642 13.943H15.0603Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span>${dataLayer.basketRoomNight.split(';')[0]} Night${dataLayer.basketRoomNight.split(';')[0] > 1 ? 's' : ''}</span>
                  </div>
                
                  <div class="${ID}-meta--rooms">
                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.768066 8.30039V11.7413H18.4321V8.30039C18.4321 8.30039 17.1985 5.51868 9.60007 5.51868C6.17832 5.51868 4.04759 6.08213 2.73742 6.70302C1.14006 7.46068 0.768066 8.30039 0.768066 8.30039Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.61719 6.70031V3.48096C2.61719 3.48096 4.26105 1.03295 9.60018 0.860632C13.7085 0.729342 16.1729 3.48096 16.1729 3.48096V6.57722" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.30322 5.89066C5.30322 5.89066 7.4148 1.76323 9.57288 5.52414" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.7111 5.89066C13.7111 5.89066 11.7308 1.76323 9.57275 5.52414" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.35547 11.7686V13.3797L4.8024 11.7385" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.3207 11.7686V13.3797L14.8765 11.7385" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <div class="${ID}-meta--roomslabel">${item.roomsDetails.length} Room${item.roomsDetails.length > 1 ? `s` : ``}  </div>
                  </div>
  
                  <div class="${ID}-meta--guests">
                    <svg height="18" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5144 9.89803C13.9391 8.88427 14.7877 7.11787 14.469 5.17483C14.1579 3.26251 12.6565 1.67275 10.7595 1.27723C7.6453 0.624426 4.8997 2.98603 4.8997 5.98507C4.8997 7.60171 5.69841 9.03019 6.92337 9.90187C7.25745 10.1399 7.15378 10.6507 6.76978 10.7927C3.49042 11.9947 1.15186 15.1396 1.15186 18.8337H18.2821C18.2821 15.1396 15.9435 11.9908 12.6642 10.7927C12.2802 10.6507 12.1803 10.1399 12.5144 9.90187V9.89803Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <div class="${ID}-meta--guestslabel">${totalNumGuests} Guest${totalNumGuests > 1 ? `s` : ``} </div>
                  </div>
                
                </div>
  
                <div class="${ID}-rooms ${ID}-hidden">
  
                  ${item.roomsDetails.map((item, index) => {
                  let roomType = roomTypes.find((room) => room.code === item.roomType);
      
                  let extras = allExtras[index].split(',');
                  let extraPrices = [];
                  let totalRoomAmount = parseFloat(dataLayer.basketRoomPriceDiscounted.split(';')[index]);
                  if(extras[index] !== '') {
                    extraPrices = allExtraPrices[index].split(',')
                    totalRoomAmount = parseFloat(dataLayer.basketRoomPriceDiscounted.split(';')[index]) + extraPrices.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                  }
                  
                  totalRoomAmount = totalRoomAmount.toFixed(2);
      
                  return `
  
                      <div class="${ID}-rooms--single">
                  
                        <h2>Room ${index + 1}: ${roomType.name}</h2>
                        <div class="${ID}-rooms--singleh2"><span class="${ID}-option">${item.adults > 0 ? `${item.adults} adult${item.adults > 1 ? `s` : ``}` : ``} ${item.children > 0 ? `${item.children} ${item.children > 1 ? `children` : `child`}` : ``} - ${item.roomRateType == 'BARFLEX' ? `Flexible rate` : `Saver rate`}</span><span class="${ID}-price">${currencyCode}${dataLayer.basketRoomPriceDiscounted.split(';')[index]}</span></div>
                        <ul>
                          
                          ${extras.map((item, index) => {
                              if(item === '') {
                                return `<li> No extras selected </li>`
                              } else {
                                let extraName = '';
                                if(item === 'breakfast') {
                                    extraName = 'With breakfast';
                                } else if(item === 'dinner') {
                                    extraName = 'With Dinner - 2 course meal deal';
                                } else if(item === 'earlyIn') {
                                    extraName = 'With early check in from 12pm (12 noon)';
                                } else if(item === 'lateOut') {
                                    extraName = 'With late checkout until 2pm';
                                } else if(item === 'wifi') {
                                    extraName = 'With WiFi access';
                                } else if(item === 'pets') {
                                    extraName = 'With pets';
                                }
                                
                                return `<li> <span class="${ID}-option ${ID}-option--${item}"> ${extraName} </span><span class="${ID}-price"> ${currencyCode}${extraPrices[index]} </span> </li>`
                              }
                              
                              
                          }).join('')}
  
                          
                        </ul>
                        <div class="${ID}-rooms--singletotal"><span class="${ID}-option">Room total</span><span class="${ID}-price">${currencyCode}${totalRoomAmount}</span></div>
                      
                      
                      </div>
  
                    `;
                  }).join('')}
  
                  
                
                </div>
              
              `;
            }).join('')}
  
        </div>
  
      `;
      input.closest('.miniSearch').querySelector('.row').classList.add(`${ID}-baskettotal`);
      input.closest('.miniSearch').insertAdjacentHTML('afterbegin', newHTML);

      if (window.outerWidth < 992) {
          document.querySelector('.colTotal').classList.remove('col-sm-12')
          document.querySelector('.colTotal').classList.remove('col-12');
          document.querySelector('.colTotal').classList.add('col-sm-6');
          document.querySelector('.colTotal').classList.add('col-xs-6');
      } else {
          document.querySelector('.colTotal').classList.remove('col-lg-3');
          document.querySelector('.colTotal').classList.remove('col-md-3');
          document.querySelector('.colTotal').classList.add('col-md-4');
          document.querySelector('.colTotal').classList.add('col-lg-4');
      }


      let allRoomULs = document.querySelectorAll(`.${ID}-rooms ul`);

      let biggest = 0;
      allRoomULs.forEach((item) => {
        if(item.outerHeight > biggest) {
          biggest = item.outerHeight;
        }
      });
      // allRoomULs.forEach((item) => {
      //   item.style.height = biggest + 'px';
      // });



    } else if(VARIATION == 2 || VARIATION == 3) {
      
      // VARIANT 2 -----------------------------------------------

      let currSubTotal = document.getElementById('subTotal').querySelector('dd').innerText.replace(' *', '');
      let currDonationTotal = currencyCode + document.getElementById('customerDetails_charitableDonationAmount')?.getAttribute('value');
      let currDiscountTotal = document.getElementById('discountTotal')?.querySelector('dd')?.innerText;
      let showDonationTotal = false;
      let showDiscount = false;
      if (document.getElementById('donationTotal') && !document.getElementById('donationTotal').classList.contains('hide')) {
        showDonationTotal = true;
      }
      if (document.querySelector('discountTotal') && !document.getElementById('discountTotal').classList.contains('hide')) {
        showDiscount = true;
      }
      let currTotal = document.getElementById('totalToPay').querySelector('dd').innerText;
      
      observer.connect(document.querySelector(`#totalToPay dd`), () => {
        currTotal = document.getElementById('totalToPay').querySelector('dd').innerText;
        document.getElementById(`${ID}-total`).innerText = currTotal;
      },
      {
        attributes: true,
        childList: true,
        subtree: true
      })

      let newHTML = `
        <div class="${ID}-content-outer">
          <div class="${ID}-content">

            <h2 class="${ID}-staysummaryheader"> Stay Summary </h2>

            <div class="${ID}-staysummary">

              

              <div class="${ID}-staydetails">

                <div class="${ID}-stayimage" style="background-image: url(https://media.travelodge.co.uk/image/upload/c_limit,w_300,h_300/Rebase/Checkout/${dataLayer.hotelCode.split(';')[0]}-${dataLayer.basketRoomCodePerRoom.split(';')[0]}.webp)"></div>

                <div class="${ID}-staydetails--inner">
                  <div class="${ID}-location">
                    <div class="${ID}-location--icon"><svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.72392 1.15198C3.69032 1.15198 1.23271 3.50273 1.23271 6.40443C1.23271 6.40443 0.775755 11.745 6.72392 18.048C6.72392 18.048 12.2151 13.846 12.2151 6.40443C12.2151 3.50273 9.75752 1.15198 6.72392 1.15198Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.72398 6.84151C7.22872 6.84151 7.6379 6.45012 7.6379 5.96732C7.6379 5.48452 7.22872 5.09314 6.72398 5.09314C6.21923 5.09314 5.81006 5.48452 5.81006 5.96732C5.81006 6.45012 6.21923 6.84151 6.72398 6.84151Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                    <span>Travelodge ${dataLayer.basketHotelName.split(';')[0]}</span>
                  </div>
    
            
    
                  ${staysArray.map((item) => {
                  // Date formatting
          
                  let searchedCheckIn = item.checkIn.replaceAll('/', '-');
                  let searchedCheckOut = item.checkOut.replaceAll('/', '-');
          
                  var searchedCheckoutParts = searchedCheckOut.split('-');
                  var searchedCheckoutDate = new Date(searchedCheckoutParts[2], searchedCheckoutParts[1] - 1, searchedCheckoutParts[0]);
          
                  var searchedCheckinParts = searchedCheckIn.split('-');
                  var searchedCheckinDate = new Date(searchedCheckinParts[2], searchedCheckinParts[1] - 1, searchedCheckinParts[0]);
          
                  let searchedCheckinFormatted = daysOfWeekShort[searchedCheckinDate.getDay()] + ' ' + searchedCheckinDate.getDate() + ' ' + monthsOfYear[searchedCheckinDate.getMonth()];
                  let searchedCheckoutFormatted = daysOfWeekShort[searchedCheckoutDate.getDay()] + ' ' + searchedCheckoutDate.getDate() + ' ' + monthsOfYear[searchedCheckoutDate.getMonth()];
          
                  
          
                  return `
                      
                        <div class="${ID}-dates">
                          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.4321 3.04919H0.768066V18.6358H18.4321V3.04919Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.4321 3.04919H0.768066V9.28535H18.4321V3.04919Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.06836 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.60254 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.1318 0.967896V6.16342" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg>  
                          <div class="${ID}-dates--info">
                            <p class="${ID}-dates--infolabel"> ${searchedCheckinFormatted} - ${searchedCheckoutFormatted} </p>
                          </div>
          
                        </div>
          
                        <div class="${ID}-meta">
          
                            <div class="${ID}-meta--nights">
                            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.0603 13.943C10.3525 13.943 6.53554 10.126 6.53554 5.41818C6.53554 3.7017 7.04626 2.10426 7.92178 0.767944C4.03186 1.75098 1.15186 5.26458 1.15186 9.45786C1.15186 14.4153 5.16849 18.4319 10.1259 18.4319C13.6895 18.4319 16.7615 16.3468 18.2091 13.3363C17.2338 13.7241 16.1739 13.943 15.0642 13.943H15.0603Z" stroke="white" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            <span>${dataLayer.basketRoomNight.split(';')[0]} Night${dataLayer.basketRoomNight.split(';')[0] > 1 ? 's' : ''}</span>
                          </div>
                        
                        </div>

                    `;

                  }).join('')}

                      
                </div>
                </div>
        
                  ${staysArray.map((item) => {

                    let dlExtras = dataLayer.basketRoomExtras;
                    let dlExtraPrices = dataLayer.basketRoomExtrasDetailedCost;

                    let allExtras = dlExtras.split(';');
                    let allExtraPrices = dlExtraPrices.split(';');          

                    allExtras.forEach((item, index) => {
                      if(item == '') {
                        allExtraPrices.splice(index, 0, '0');
                      } 
                    });

                    return `
                      <div class="${ID}-rooms">
        
                        ${item.roomsDetails.map((item, index) => {
                    let roomType = roomTypes.find((room) => room.code === item.roomType);
        
                    let extras = allExtras[index].split(',');
                    let extraPrices = allExtraPrices[index].split(',');

                    let totalRoomAmount = parseFloat(dataLayer.basketRoomPriceDiscounted.split(';')[index]) + extraPrices.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                    totalRoomAmount = totalRoomAmount.toFixed(2);
        
                    return `
        
                            <div class="${ID}-rooms--single">
                              <div class="${ID}-rooms--singleicon"><svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.879883 12.4901V16.4328H21.1199V12.4901C21.1199 12.4901 19.7064 9.30273 10.9999 9.30273C7.07913 9.30273 4.63767 9.94836 3.13644 10.6598C1.30612 11.5279 0.879883 12.4901 0.879883 12.4901Z" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.99902 10.6565V6.96764C2.99902 6.96764 4.88261 4.16263 11.0004 3.96518C15.7078 3.81474 18.5316 6.96764 18.5316 6.96764V10.5154" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>                            <path d="M6.07617 9.7287C6.07617 9.7287 8.49569 4.99935 10.9685 9.30873" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>                            <path d="M15.7106 9.7287C15.7106 9.7287 13.4416 4.99935 10.9688 9.30873" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.84473 16.4642V18.3101L5.50267 16.4297" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.7007 16.4642V18.3101L17.0459 16.4297" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                              <div class="${ID}-rooms--singlecontent">
                                <h2>Room ${index + 1}: ${roomType.name}</h2>
                                <div class="${ID}-rooms--singleh2"><span class="${ID}-option">${item.adults > 0 ? `${item.adults} adult${item.adults > 1 ? `s` : ``}` : ``} ${item.children > 0 ? `${item.children} ${item.children > 1 ? `children` : `child`}` : ``} - ${item.roomRateType == 'BARFLEX' ? `Flexible rate` : `Saver rate`}</span><span class="${ID}-price">${currencyCode}${dataLayer.basketRoomPriceDiscounted.split(';')[index]}</span></div>
                                <ul>
                                  
                                  ${extras.map((item, index) => {
                                    if(item === '') {
                                      return `<li> No extras selected </li>`
                                    } else {
                                      let extraName = '';
                                      if(item === 'breakfast') {
                                          extraName = 'With breakfast';
                                      } else if(item === 'dinner') {
                                          extraName = 'With Dinner - 2 course meal deal';
                                      } else if(item === 'earlyIn') {
                                          extraName = 'With early check in from 12pm (12 noon)';
                                      } else if(item === 'lateOut') {
                                          extraName = 'With late checkout until 2pm';
                                      } else if(item === 'wifi') {
                                          extraName = 'With WiFi access';
                                      } else if(item === 'pets') {
                                          extraName = 'With pets';
                                      }
                                      
                                      return `<li> <span class="${ID}-option"> ${extraName} </span><span class="${ID}-price"> ${currencyCode}${extraPrices[index]} </span> </li>`
                                    }
                                      
                                      
                                  }).join('')}
        
                                
                                </ul>
                                <div class="${ID}-rooms--singletotal"><span class="${ID}-option">Room total</span><span class="${ID}-price">${currencyCode}${totalRoomAmount}</span></div>
                              </div>
                              
                            
                            </div>
                            
                            
        
                          `;
                        }).join('')}
        
                        
                      
                      </div>
                    
                      `;
                    }).join('')}
        
                </div>
                <div class="${ID}-totals-outer">
                  <div class="${ID}-totals">
                    <div class="${ID}-totals--line1">
                      <span>Booking Subtotal:</span>
                      <span>${currSubTotal}</span>
                    </div>
                    <div class="${ID}-totals--line2 ${showDonationTotal == true ? `visible` : ``}">
                      <span>Charity Donation:</span>
                      <span id="${ID}-donationamount">${currDonationTotal}</span>
                    </div>
                    <div class="${ID}-totals--line2 ${showDiscount == true ? `visible` : ``}">
                      <span>Discount:</span>
                      <span id="${ID}-discountamount">${currDiscountTotal}</span>
                    </div>
                    <div class="${ID}-totals--line3">
                      <span>Total to pay:</span>
                      <span id="${ID}-total">${currTotal}</span>
                    </div>
                  </div>
                </div>
              </div>

            

        </div>

      `;
      input.closest('.miniSearch').querySelector('.row').classList.add(`${ID}-baskettotal`);

      

      document.querySelector('.main.vertical').insertAdjacentHTML('afterbegin', newHTML);
      document.querySelector('.main.vertical').classList.add(`${ID}-tripsummary`);

      // Apple Pay check v2 v3
      if (document.querySelector('.basketApplepay') && (VARIATION == 2 || VARIATION == 3)) {
        let applePayElement = document.querySelector('.basketApplepay').parentElement;
        document.getElementById('checkout').insertAdjacentElement('afterbegin', applePayElement);
      }

      // Google Pay check v2 v3
      if (document.querySelector('.basketGooglepay') && (VARIATION == 2 || VARIATION == 3)) {
        let googlePayElement = document.querySelector('.basketGooglepay').parentElement;
        document.getElementById('checkout').insertAdjacentElement('afterbegin', googlePayElement);
      }

      updateContentBlockHeight();
      window.addEventListener('resize', () => {
        updateContentBlockHeight();
      });

      // Trigger re render on pagniation change
      const wrap = document.getElementById('donationTotal');
      observer.connect(wrap, () => {
      
        document.getElementById(`${ID}-total`).innerText = document.getElementById('totalToPay').querySelector('dd').innerText;
        if(!wrap.classList.contains('hide')) {
          document.querySelector(`.${ID}-totals--line2`).classList.add('visible');
          updateContentBlockHeight();
        } else {
          document.querySelector(`.${ID}-totals--line2`).classList.remove('visible');
          updateContentBlockHeight();
        }

      }, {
        config: {
          attributes: true,
          childList: false,
          subtree: false,
        }
      });

      if(window.outerWidth < 768) {
        input.closest('.miniSearch').insertAdjacentHTML('beforebegin', `
      
              <button class="${ID}-baskettoggle">
              
                  <span class="${ID}-baskettoggle--text">Stay summary</span> 
              
                  <span class="${ID}-baskettoggle--arrow">
                      <svg class="${ID}-up" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Arrow / Chevron_Up"><path id="Vector" d="M5 16L12 9L19 16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                      <svg class="${ID}-down" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Arrow / Chevron_Down"><path id="Vector" d="M19 9L12 16L5 9" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                  </span>
              </button>
        
        `);

        document.querySelector(`.${ID}-baskettoggle`).addEventListener('click', () => {

          document.documentElement.classList.toggle(`${ID}-noscroll`);
          document.querySelector(`.${ID}-content-outer`).classList.toggle(`${ID}-content-outer--open`);
          document.querySelector(`.${ID}-baskettoggle`).classList.toggle(`${ID}-open`);
          fireEvent('Click - user has clicked to toggle the basket summary on mobile', true);
  
        });
      }
      

      

    }

    

    document.querySelector('.loginPayment').classList.add(`${ID}-hidden`);
    document.querySelector('.main.vertical').insertAdjacentHTML('beforebegin', `

          <div class="${ID}-viewbasket">
            <div class="${ID}-viewbasket--inner">
              <p><a href="/basket">View basket</a> to add another stay or amend your current one </p>
            </div>
          </div>

    `);

    fireEvent(`Visible - experiment loaded onto the page`, true);

    


};

const addTracking = () => {

    document.body.addEventListener('click', (e) => {

        if (e.target.classList.contains('btnSubmit')) {
            fireEvent('Click - Proceed to secure payment button clicked', true);
        }
    });



}

export default () => {
    setup();

    logMessage(ID + ' Variation: ' + VARIATION);

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
    if (VARIATION == 'control') {
        return;
    }

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...

    pollerLite(
        [
            '.miniSearch .input-group.groupLocation',
            () => {
                return window.globalDataLayer;
            }
        ],
        () => {
            const dataLayer = window.globalDataLayer;

            function identical(array) {
                for (var i = 0; i < array.length - 1; i++) {
                    if (array[i] !== array[i + 1]) {
                        return false;
                    }
                }
                return true;
            }

            let hotels = dataLayer.basketHotelName.split(';');
            let checkInDates = dataLayer.basketRoomCheckIn.split(';');

            if (identical(hotels) == true && identical(checkInDates)) { // && document.referrer.indexOf('extras') > -1) {
                startExperiment(dataLayer);
            } else {
                fireEvent(`Interaction - conditions not met for the test to run. Reasons: ${identical(checkInDates) == false ? `[multiple checkInDates]` : ``}${identical(hotels) == false ? `[multiple hotels]` : ``}${document.referrer.indexOf('extras') == -1 ? `[referrer not extras]` : ``}`, true);
            }
        }
    );
};
