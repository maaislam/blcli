/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

let hotelsWithBarCafe = ["GB0783", "GB0913", "GB0965", "GB0785", "GB2102", "GB0914", "GB2018", "GB2023", "GB2026", "GB0788", "GB0854", "GB2025", "GB2029", "GB0789", "GB0912", "GB0798", "GB0920", "GB0113", "GB2021", "GB0727", "GB0852", "GB0949", "GB0799", "GB0769", "GB0926", "GB0857", "GB0953", "GB0797", "GB0891", "GB0617", "GB0916", "GB0877", "GB0915", "GB0880", "GB0755", "GB0524", "GB0875", "GB0770", "GB0960", "GB0860", "GB0784", "GB0446", "GB0720", "GB0896", "GB0781", "GB0761", "GB0779", "GB0248", "GB0866", "GB0766", "GB0255", "GB0137", "GB0872", "GB0837", "GB0786", "GB0934", "GB0836", "GB0332", "GB0921", "GB0832", "GB2020", "GB0616", "GB0972", "GB0615", "GB0879", "GB0677", "GB0922", "GB0584", "GB0795", "GB0237", "GB2075", "GB2035", "GB0862", "GB0791", "GB0840", "GB0368", "GB0419", "GB0213", "GB2073", "GB0856", "GB2033", "GB0131", "GB0927", "GB2070", "GB0242", "GB0304", "GB0809", "GB0859", "GB0581", "GB0732", "GB0778", "GB1253", "GB0869", "GB0246", "GB0831", "GB0892", "GB0956", "GB0885", "GB0978", "GB1425", "GB0863", "GB0846", "GB0962", "GB0571", "GB0819", "GB0721", "GB0834", "GB0850", "GB0568", "GB0941", "GB0101", "GB0562", "GB0228", "GB0618", "GB0111", "GB0830", "GB0937", "GB0243", "GB0115", "GB0933", "GB2004", "GB2034", "GB2006", "GB0955", "GB0804", "GB2016", "GB2045", "GB0932", "GB0569", "GB0563", "GB0930", "GB0796", "GB2013", "GB0942", "GB0825", "GB0874", "GB0959", "GB0239", "GB0756", "GB0112", "GB0341", "GB0247", "GB0870", "GB0887", "GB0833", "GB0867", "GB0315", "GB0371", "GB2051", "GB2052", "GB0792", "GB2090", "GB2046", "GB0320", "GB0974", "GB0935", "GB0952", "GB0951", "GB1254", "GB0231", "GB0717", "GB0911", "GB0257", "GB0979", "GB0843", "GB0787", "GB0333", "GB0580", "GB0340", "GB2048", "GB0576", "GB2049", "GB0678", "GB2002", "GB0944", "GB0893", "GB0209", "GB0790", "GB0945", "GB1256", "GB2081", "GB0250", "GB2012", "GB0620", "GB0425", "GB0898", "GB0780", "GB0674", "GB0133", "GB0847", "GB0256", "GB2087", "GB1255", "GB0138", "GB0234", "GB0883", "GB0925", "GB0418", "GB2047", "GB0307", "GB2036", "GB2041", "GB0582", "GB0236", "GB0140", "GB0876", "GB0946", "GB0233", "GB0561", "GB2015", "GB0574", "IE1011", "IE1002", "GB2014", "IE1007", "IE1006", "IE1009", "IE1004"];


const startExperiment = () => {

  // DEBUG - use default dataLayer
  let debug = false;
  let dataLayer = window.globalDataLayer || [];
  if(debug == true) {
    let debugDataLayer = {
      "domain": "NW1",
      "site": "NW1",
      "funnelStep": "9",
      "purposeOfStay": "Leisure",
      "customerType": "leisure",
      "bookerEmail": "andyseaton@gmail.com",
      "bookerEmailPermit": "",
      "newsLetterSignUp": "",
      "smsMarketingConsent": "",
      "title": "",
      "firstName": "Andy",
      "lastName": "Seaton",
      "stayerEmail": "andyseaton@gmail.com",
      "customerReference": "",
      "hotelCode": "GB0255",
      "basketHotelName": "Manchester Piccadilly",
      "hotelsPurchased": "1",
      "basketRoomCheckIn": "01/06/2023",
      "basketCheckInDay": "Thursday",
      "basketRoomCheckOut": "04/06/2023",
      "basketCheckOutDay": "Sunday",
      "eventType": "p",
      "confirmationID": "1566564393",
      "invoiceNo": "WB47844220",
      "paymentTotal": "609.94",
      "transactionFee": "0",
      "bookingID": "43932070",
      "invoiceDate": "05/31/2023",
      "bookingTime": "14:16:04",
      "roomCost": "579.97",
      "extrasCost": "29.97",
      "roomType": "BRDN",
      "rateType": "SAVER",
      "roomNights": "3",
      "siteNumber": "581",
      "paymentType": "PayPal",
      "wifi": "1",
      "breakfast": "1",
      "dinner": "0",
      "insurance": "0",
      "lateOut": "0",
      "earlyIn": "0",
      "pets": "0",
      "sms": "0",
      "bookWindow": "1",
      "discountAmount": "0",
      "roomDiscountAmount": "",
      "discountCode": "",
      "discountValue": "0",
      "discountSuccess": "0",
      "twinOccupancy": "0",
      "tripleOccupancy": "0",
      "funnelComplete": "1",
      "adults": "1",
      "children": "0",
      "adultsPerRoom": "1",
      "childrenPerRoom": "0",
      "accessiblePerRoom": "0",
      "basketRoomCodePerRoom": "BRDN",
      "userType": "",
      "funnelLogin": "Guest",
      "customerRole": "stayer",
      "funnelName": "BFA",
      "referer": "www.sandbox.paypal.com",
      "ga4Cid": "1376050288.1670244668",
      "domInteractiveTime": 6.981800001144409
    }
    dataLayer = debugDataLayer; 
  }
  
  logMessage("initial datalayer data: ");
  logMessage(dataLayer);

  if(dataLayer !== []) {

    if (window.location.href.indexOf('/confirmation') > -1 || debug == true) {

      // Room Type Metrics

      let userMadeOneRoomBooking, 
      userMadeMultipleRoomBooking, 
      userBookingIncludesSuperroom,
      userBookingIncludesStandardRoomPlus,
      userBookingIncludesStandardRoomFridge,
      userBookingIncludesStandardRoom,
      userBookingIncludesChild;

      userMadeOneRoomBooking=
      userMadeMultipleRoomBooking=
      userBookingIncludesSuperroom=
      userBookingIncludesStandardRoomPlus=
      userBookingIncludesStandardRoomFridge=
      userBookingIncludesStandardRoom=
      userBookingIncludesChild = false;

      if(dataLayer.roomType.indexOf(';') == -1) {
        userMadeOneRoomBooking = true;
        window.DY.API("event", {
          name: "Room Type Metrics - userMadeOneRoomBooking",
        });
      }

      if(dataLayer.roomType.indexOf(';') > -1) {
        userMadeMultipleRoomBooking = true;
        window.DY.API("event", {
          name: "Room Type Metrics - userMadeMultipleRoomBooking",
        });
      }

      if(dataLayer.roomType.indexOf('BR') > -1) {
        userBookingIncludesSuperroom = true;
        window.DY.API("event", {
          name: "Room Type Metrics - userBookingIncludesSuperroom",
        });
      }

      if(dataLayer.roomType.indexOf('CPDN') > -1) {
        userBookingIncludesStandardRoomPlus = true;
        window.DY.API("event", {
          name: "Room Type Metrics - userBookingIncludesStandardRoomPlus",
        });
      }

      if(dataLayer.roomType.indexOf('DNFM') > -1) {
        userBookingIncludesStandardRoomFridge = true;
        window.DY.API("event", {
          name: "Room Type Metrics - userBookingIncludesStandardRoomFridge",
        });
      }

      if(dataLayer.roomType == "DN" || dataLayer.roomType.indexOf(';DN;') > -1 || dataLayer.roomType.startsWith('DN;') || dataLayer.roomType.endsWith(';DN')) {
        userBookingIncludesStandardRoom = true;
        window.DY.API("event", {
          name: "Room Type Metrics - userBookingIncludesStandardRoom",
        });
      }

      if(parseInt(dataLayer.children) > 0) {
        userBookingIncludesChild = true;
        window.DY.API("event", {
          name: "Room Type Metrics - userBookingIncludesChild",
        });
      }


      fireEvent(`Interaction - Room Type Metrics - userMadeOneRoomBooking: ${userMadeOneRoomBooking} | userMadeMultipleRoomBooking: ${userMadeMultipleRoomBooking} | userBookingIncludesSuperroom: ${userBookingIncludesSuperroom} | userBookingIncludesStandardRoomPlus: ${userBookingIncludesStandardRoomPlus} | userBookingIncludesStandardRoomFridge: ${userBookingIncludesStandardRoomFridge} | userBookingIncludesStandardRoom: ${userBookingIncludesStandardRoom} | userBookingIncludesChild: ${userBookingIncludesChild}`, true);

      // Extras Type Metrics

      let userMadeBookingContainingBreakfast,
        userMadeBookingContainingUnlimitedBreakfast,
        userMadeBookingContainingBreakfastToGo,
        userMadeBookingIncludesOneWifiAccess,
        userBookingIncludesOneEarlyCheckIn,
        userBookingIncludesOneLateCheckOut,
        userBookingIncludesOnePet;

      userMadeBookingContainingBreakfast=
        userMadeBookingContainingUnlimitedBreakfast=
        userMadeBookingContainingBreakfastToGo=
        userMadeBookingIncludesOneWifiAccess=
        userBookingIncludesOneEarlyCheckIn=
        userBookingIncludesOneLateCheckOut=
        userBookingIncludesOnePet=false;

      if(dataLayer.breakfast.indexOf(';') > -1) {
        let bookingBreakfast = dataLayer.breakfast.split(';'); 
        bookingBreakfast.map((breakfastOption) => {

          if(breakfastOption !== "0") {
            userMadeBookingContainingBreakfast = true;
            window.DY.API("event", {
              name: "Extras Type Metrics - userMadeBookingContainingBreakfast",
            });
          }

        });
      } else {
        if (dataLayer.breakfast !== "0") {
          userMadeBookingContainingBreakfast = true;
          window.DY.API("event", {
            name: "Extras Type Metrics - userMadeBookingContainingBreakfast",
          });
        }
      }

      

      if (userMadeBookingContainingBreakfast == true) {

        if(dataLayer.breakfast.indexOf(';') > -1) {

          let hotelCodes = dataLayer.hotelCode.split(';');
          hotelCodes.map((code) => {

            if(hotelsWithBarCafe.includes(code)) {
              userMadeBookingContainingUnlimitedBreakfast = true;
              window.DY.API("event", {
                name: "Extras Type Metrics - userMadeBookingContainingUnlimitedBreakfast",
              });
            } else {
              userMadeBookingContainingBreakfastToGo = true;
              window.DY.API("event", {
                name: "Extras Type Metrics - userMadeBookingContainingBreakfastToGo",
              });
            }

          })

        } else {

          if (hotelsWithBarCafe.includes(dataLayer.hotelCode)) {
            userMadeBookingContainingUnlimitedBreakfast = true;
            window.DY.API("event", {
              name: "Extras Type Metrics - userMadeBookingContainingUnlimitedBreakfast",
            });
          } else {
            userMadeBookingContainingBreakfastToGo = true;
            window.DY.API("event", {
              name: "Extras Type Metrics - userMadeBookingContainingBreakfastToGo",
            });
          }

        }
      }

      if (dataLayer.wifi !== "0") {
        userMadeBookingIncludesOneWifiAccess = true;
        window.DY.API("event", {
          name: "Extras Type Metrics - userMadeBookingIncludesOneWifiAccess",
        });
      }

      if (dataLayer.earlyIn !== "0") {
        userBookingIncludesOneEarlyCheckIn = true;
        window.DY.API("event", {
          name: "Extras Type Metrics - userBookingIncludesOneEarlyCheckIn",
        });
      }

      if (dataLayer.lateOut !== "0") {
        userBookingIncludesOneLateCheckOut = true;
        window.DY.API("event", {
          name: "Extras Type Metrics - userBookingIncludesOneLateCheckOut",
        });
      }

      if (dataLayer.pets !== "0") {
        userBookingIncludesOnePet = true;
        window.DY.API("event", {
          name: "Extras Type Metrics - userBookingIncludesOnePet",
        });
      }

      fireEvent(`Interaction - Extras Type Metrics - userMadeBookingContainingBreakfast: ${userMadeBookingContainingBreakfast} | userMadeBookingContainingUnlimitedBreakfast: ${userMadeBookingContainingUnlimitedBreakfast} | userMadeBookingContainingBreakfastToGo: ${userMadeBookingContainingBreakfastToGo} | userMadeBookingIncludesOneWifiAccess: ${userMadeBookingIncludesOneWifiAccess} | userBookingIncludesOneEarlyCheckIn: ${userBookingIncludesOneEarlyCheckIn} | userBookingIncludesOneLateCheckOut: ${userBookingIncludesOneLateCheckOut} | userBookingIncludesOnePet: ${userBookingIncludesOnePet}`, true);


      // Hotel Type Booking goals

      let userBookedHotelWithBarCafe,
        userBookedHotelWithoutBarCafe,
        userBookedHotelInLondon,
        userBookedHotelOutsideLondon;

      userBookedHotelWithBarCafe=
        userBookedHotelWithoutBarCafe=
        userBookedHotelInLondon=
        userBookedHotelOutsideLondon=false;

      let hotelCodes = dataLayer.hotelCode.split(';');

      hotelCodes.map((code) => {
        if (hotelsWithBarCafe.includes(code)) {
          userBookedHotelWithBarCafe = true;
          window.DY.API("event", {
            name: "Hotel Type Metrics - userBookedHotelWithBarCafe",
          });
        }

        if (!hotelsWithBarCafe.includes(code)) {
          userBookedHotelWithoutBarCafe = true;
          window.DY.API("event", {
            name: "Hotel Type Metrics - userBookedHotelWithoutBarCafe",
          });
        }

      });

      if (dataLayer.basketHotelName.toLowerCase().indexOf('london') > -1) {
        userBookedHotelInLondon = true;
        window.DY.API("event", {
          name: "Hotel Type Metrics - userBookedHotelInLondon",
        });
      }

      if (dataLayer.basketHotelName.toLowerCase().indexOf('london') === -1) {
        userBookedHotelOutsideLondon = true;
        window.DY.API("event", {
          name: "Hotel Type Metrics - userBookedHotelOutsideLondon",
        });
      }

      fireEvent(`Interaction - Hotel Type Metrics - userBookedHotelWithBarCafe: ${userBookedHotelWithBarCafe} | userBookedHotelWithoutBarCafe: ${userBookedHotelWithoutBarCafe} | userBookedHotelInLondon: ${userBookedHotelInLondon} | userBookedHotelOutsideLondon: ${userBookedHotelOutsideLondon}`, true);

      // Date type metrics

      let userBookedHotelSameDay,
      userBookedHotelFollowingDay,
      userBookedHotelSevenDayLeadTime,
      userBookedHotelGreaterThanSevenDayLeadTime,
      userBookedOneNightStay,
      userBookedMultipleNightStay,
      userBookedHotelForWeekend;

      userBookedHotelSameDay=
      userBookedHotelFollowingDay=
      userBookedHotelSevenDayLeadTime=
      userBookedHotelGreaterThanSevenDayLeadTime=
      userBookedOneNightStay=
      userBookedMultipleNightStay=
      userBookedHotelForWeekend=false;

      if(dataLayer.bookWindow == "0") {
        userBookedHotelSameDay = true;
        window.DY.API("event", {
          name: "Date Type Metrics - userBookedHotelSameDay",
        });
      }

      if(dataLayer.bookWindow == "1") {
        userBookedHotelFollowingDay = true;
        window.DY.API("event", {
          name: "Date Type Metrics - userBookedHotelFollowingDay",
        });
      }

      if(parseInt(dataLayer.bookWindow) < 7) {
        userBookedHotelSevenDayLeadTime = true;
        window.DY.API("event", {
          name: "Date Type Metrics - userBookedHotelSevenDayLeadTime",
        });
      }

      if(parseInt(dataLayer.bookWindow) >= 7) {
        userBookedHotelGreaterThanSevenDayLeadTime = true;
        window.DY.API("event", {
          name: "Date Type Metrics - userBookedHotelGreaterThanSevenDayLeadTime",
        });
      }

      if (dataLayer.roomNights == "1" || (dataLayer.roomNights.indexOf(';') > -1 && dataLayer.roomNights.split(';').forEach(night => night == "1"))) {
        userBookedOneNightStay = true;
        window.DY.API("event", {
          name: "Date Type Metrics - userBookedOneNightStay",
        });
      }

      if (dataLayer.roomNights !== "1" || (dataLayer.roomNights.indexOf(';') > -1 && dataLayer.roomNights.split(';').forEach(night => night !== "1"))) {
        userBookedMultipleNightStay = true;
        window.DY.API("event", {
          name: "Date Type Metrics - userBookedMultipleNightStay",
        });
      }

      if ((dataLayer.basketCheckInDay == "Thursday" || dataLayer.basketCheckInDay == "Friday" || dataLayer.basketCheckInDay == "Saturday") && (dataLayer.basketCheckOutDay == "Sunday" || dataLayer.basketCheckOutDay == "Monday" || dataLayer.basketCheckOutDay == "Tuesday") && parseInt(dataLayer.roomNights) < 7) {
        userBookedHotelForWeekend = true;
        window.DY.API("event", {
          name: "Date Type Metrics - userBookedHotelForWeekend",
        });
      }

      fireEvent(`Interaction - Date Type Metrics - userBookedHotelSameDay: ${userBookedHotelSameDay} | userBookedHotelFollowingDay: ${userBookedHotelFollowingDay} | userBookedHotelSevenDayLeadTime: ${userBookedHotelSevenDayLeadTime} | userBookedHotelGreaterThanSevenDayLeadTime: ${userBookedHotelGreaterThanSevenDayLeadTime} | userBookedOneNightStay: ${userBookedOneNightStay} | userBookedMultipleNightStay: ${userBookedMultipleNightStay} | userBookedHotelForWeekend: ${userBookedHotelForWeekend}`, true);

      // Payment Metrics

      let userBookedTotalUnder100,
      userBookedTotalOver100,
      userBookedRoomNightUnder100,
      userBookedRoomNightOver100;

      userBookedTotalUnder100=
      userBookedTotalOver100=
      userBookedRoomNightUnder100=
      userBookedRoomNightOver100=false;

      if(parseFloat(dataLayer.paymentTotal) < 100) {
        userBookedTotalUnder100 = true;
        window.DY.API("event", {
          name: "Payment Metrics - userBookedTotalUnder100",
        });
      }

      if(parseFloat(dataLayer.paymentTotal) >= 100) {
        userBookedTotalOver100 = true;
        window.DY.API("event", {
          name: "Payment Metrics - userBookedTotalOver100",
        });
      }

      let roomNightCost = parseFloat(dataLayer.roomCost) / parseInt(dataLayer.roomNights);

      if (roomNightCost < 100) {
        userBookedRoomNightUnder100 = true;
        window.DY.API("event", {
          name: "Payment Metrics - userBookedRoomNightUnder100",
        });
      }

      if (roomNightCost >= 100) {
        userBookedRoomNightOver100 = true;
        window.DY.API("event", {
          name: "Payment Metrics - userBookedRoomNightOver100",
        });
      }

      fireEvent(`Interaction - Payment Metrics - userBookedTotalUnder100: ${userBookedTotalUnder100} | userBookedTotalOver100: ${userBookedTotalOver100} | userBookedRoomNightUnder100: ${userBookedRoomNightUnder100} | userBookedRoomNightOver100: ${userBookedRoomNightOver100}`, true);

      // Value Metrics

      let roomNightsBooked,
      spentPerNight,
      spentPerRoomNight;

      roomNightsBooked=
      spentPerNight=
      spentPerRoomNight=0;

      // Room Nights Booked

      let roomNights = dataLayer.roomNights.split(';');
      let roomNightsValue = 0;
      roomNights.filter((night) => {
        roomNightsValue += parseInt(night);
      })

      roomNightsBooked = roomNightsValue;
      window.DY.API("event", {
        name: "Value Metrics - roomNightsBooked",
        properties: {
          value: roomNightsBooked,
        }
      });

      // Spent Per Night

      spentPerNight = parseFloat(dataLayer.paymentTotal) / roomNights[0];
      spentPerNight = spentPerNight.toFixed(2);
      window.DY.API("event", {
        name: "Value Metrics - spentPerNight",
        properties: {
          value: spentPerNight,
        }
      });

      // Spent Per Room Night

      spentPerRoomNight = parseFloat(dataLayer.paymentTotal) / roomNightsValue;
      spentPerRoomNight = spentPerRoomNight.toFixed(2);
      window.DY.API("event", {
        name: "Value Metrics - spentPerRoomNight",
        properties: {
          value: spentPerRoomNight,
        }
      });

      fireEvent(`Interaction - Value Metrics - roomNightsBooked: ${roomNightsBooked} | spentPerNight: ${spentPerNight} | spentPerRoomNight: ${spentPerRoomNight}`, true);

    }

  } else {

    fireEvent('Interaction - data layer not found', true);
    
  }

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
