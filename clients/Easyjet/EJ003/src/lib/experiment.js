/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getCookie } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {

  setup();

  const test = angular.element(document.body).injector().get("Controls_SearchPodPopUnderService");

  const ctrlUrl = '/en/holidays/mixedresultlist/?departure_airports={departureAirports}&destinations={destinations}&dd={departureDate}&rd={returndate}&dur={duration}&rooms[]={travellersPerRoom}&currency=GBP&rooms_count={roomcount}&shouldOpenRoomsWidget={shouldOpenRoomsWidget}&min_recommendation=-1&utm_source=easyjet&utm_medium=en_homepage&utm_term=Holidays&utm_content=searchpodform&utm_campaign=holidays&request_is_search_widget=true&board_codes=GT06-AO,GT06-SC,GT06-BB,GT06-HB%20GT06-HBP,GT06-FB%20GT06-FBP,GT06-AI%20GT06-AIP%20GT06-AIU%20GT06-AIR';

    const getCountryURL = (value) => {
      let url;

      if(value === 'Antalya (AYT)' || value === 'Bodrum (BJV)' || value === 'Dalaman (DLM)' || value === 'Izmir (ADB)') {
        url = 'https://www.easyjet.com/en/holidays/deals/turkey-deals'
      } else if(value === 'Canary Islands (All Airports)' || value === 'Gran Canaria (LPA)') {
        url = 'https://www.easyjet.com/en/holidays/deals/canary-islands'
      } else if(value === 'Amsterdam (AMS)') {
        url = 'https://www.easyjet.com/en/holidays/deals/amsterdam-deals'
      } else if(value === 'Paris (All Airports)' || value === 'Paris Charles de Gaulle (CDG)') {
        url = 'https://www.easyjet.com/en/holidays/deals/paris-deals'
      } 

      return url;
    }

    const thirtyDaysFromDepart = (departDate, returnDate) => {

      let isLessThanThirtyDays;

      const parseDepartDate = new Date(Date.parse(departDate));
      const parseReturnDate = new Date(Date.parse(returnDate));

      parseReturnDate.setDate(parseReturnDate.getDate() - 30);

      if(parseReturnDate <= parseDepartDate){
        isLessThanThirtyDays = true;
      } else {
        isLessThanThirtyDays = false;
      }

      return isLessThanThirtyDays;  
    }

    if(!getCookie('PopUnder')) {
      const observer = new MutationObserver(function(e) {
        const destinationCountry = document.querySelector('.ej-input.destination');
        const departDate = document.querySelector('.outbound-date-picker .chosen-date').textContent.replace('Departing: ', '').trim();
        const returnDate = document.querySelector('.return-date-picker .chosen-date').textContent.replace('Returning: ', '').trim();

        if(getCountryURL(destinationCountry.value) !== undefined) {
          if(thirtyDaysFromDepart(departDate, returnDate) === true) {
            if(VARIATION === '1') {
              test._packageHolidayDeepLinkService._packageHolidaySettings.PackageHolidayDeepLinkUrl = getCountryURL(destinationCountry.value); 
              document.cookie = "ejOptimizeExperiment=EJ003 v1";
            }     
            else if(VARIATION === 'control'){
              test._packageHolidayDeepLinkService._packageHolidaySettings.PackageHolidayDeepLinkUrl = ctrlUrl;
              document.cookie = "ejOptimizeExperiment=EJ003 control";
            }
            var checkGA = setInterval(function () {
              if (window.ga && window.ga.getAll) {
                  clearInterval(checkGA);
                  var trackerName = window.ga.getAll()[1].get('name');
                         
                  window.ga(trackerName + '.send', 'event', 'Google Optimize', `EJ003 - v${VARIATION}`, 'Conditions Met', {
                      nonInteraction: true
                    }); 
              }
          }, 500)
          
            localStorage.setItem('EJ003', 'included');
          } else {
            if(VARIATION === '1') {
              test._packageHolidayDeepLinkService._packageHolidaySettings.PackageHolidayDeepLinkUrl = '/en/holidays/mixedresultlist/?departure_airports={departureAirports}&destinations={destinations}&dd={departureDate}&rd={returndate}&dur={duration}&rooms[]={travellersPerRoom}&currency=GBP&rooms_count={roomcount}&shouldOpenRoomsWidget={shouldOpenRoomsWidget}&min_recommendation=-1&utm_source=easyjet&utm_medium=en_homepage&utm_term=Holidays&utm_content=searchpodform&utm_campaign=holidays&request_is_search_widget=true&board_codes=GT06-AO,GT06-SC,GT06-BB,GT06-HB%20GT06-HBP,GT06-FB%20GT06-FBP,GT06-AI%20GT06-AIP%20GT06-AIU%20GT06-AIR';
            }
            else if(VARIATION === 'control'){
              test._packageHolidayDeepLinkService._packageHolidaySettings.PackageHolidayDeepLinkUrl = '/en/holidays/mixedresultlist/?departure_airports={departureAirports}&destinations={destinations}&dd={departureDate}&rd={returndate}&dur={duration}&rooms[]={travellersPerRoom}&currency=GBP&rooms_count={roomcount}&shouldOpenRoomsWidget={shouldOpenRoomsWidget}&min_recommendation=-1&utm_source=easyjet&utm_medium=en_homepage&utm_term=Holidays&utm_content=searchpodform&utm_campaign=holidays&request_is_search_widget=true&board_codes=GT06-AO,GT06-SC,GT06-BB,GT06-HB%20GT06-HBP,GT06-FB%20GT06-FBP,GT06-AI%20GT06-AIP%20GT06-AIU%20GT06-AIR';
            }
          }
        } else {
          if(localStorage.getItem('EJ003')) {
            var checkGA = setInterval(function () {
              if (window.ga && window.ga.getAll) {
                  clearInterval(checkGA);
                  var trackerName = window.ga.getAll()[1].get('name');
                         
                  window.ga(trackerName + '.send', 'event', 'Google Optimize', `EJ003 - v${VARIATION}`, 'Destination Changed - Not Matched', {
                      nonInteraction: true
                    });
                  document.cookie = "ejOptimizeExperiment=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; 
              }
          }, 500)
          
          }
          if(VARIATION === '1') {
            test._packageHolidayDeepLinkService._packageHolidaySettings.PackageHolidayDeepLinkUrl = '/en/holidays/mixedresultlist/?departure_airports={departureAirports}&destinations={destinations}&dd={departureDate}&rd={returndate}&dur={duration}&rooms[]={travellersPerRoom}&currency=GBP&rooms_count={roomcount}&shouldOpenRoomsWidget={shouldOpenRoomsWidget}&min_recommendation=-1&utm_source=easyjet&utm_medium=en_homepage&utm_term=Holidays&utm_content=searchpodform&utm_campaign=holidays&request_is_search_widget=true&board_codes=GT06-AO,GT06-SC,GT06-BB,GT06-HB%20GT06-HBP,GT06-FB%20GT06-FBP,GT06-AI%20GT06-AIP%20GT06-AIU%20GT06-AIR';
          }
          else if(VARIATION === 'control'){
            test._packageHolidayDeepLinkService._packageHolidaySettings.PackageHolidayDeepLinkUrl = '/en/holidays/mixedresultlist/?departure_airports={departureAirports}&destinations={destinations}&dd={departureDate}&rd={returndate}&dur={duration}&rooms[]={travellersPerRoom}&currency=GBP&rooms_count={roomcount}&shouldOpenRoomsWidget={shouldOpenRoomsWidget}&min_recommendation=-1&utm_source=easyjet&utm_medium=en_homepage&utm_term=Holidays&utm_content=searchpodform&utm_campaign=holidays&request_is_search_widget=true&board_codes=GT06-AO,GT06-SC,GT06-BB,GT06-HB%20GT06-HBP,GT06-FB%20GT06-FBP,GT06-AI%20GT06-AIP%20GT06-AIU%20GT06-AIR';
          }
        }
      });
      observer.observe(document.querySelector('form.search-pod'), {
        childList: false,
        attributes: true,
        subtree: true,
      });
    }
  
};
