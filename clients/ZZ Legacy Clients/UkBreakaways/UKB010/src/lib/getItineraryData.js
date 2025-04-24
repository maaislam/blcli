import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {
  const itineraryHeader = document.querySelector('.destination-box h1.itin-title-h');
  if (itineraryHeader) {
    const itineraryTitle = itineraryHeader.innerText.trim();
    // const itineraryData = {
    //   title: `${itineraryTitle}`,
    // };
    const itineraryData = itineraryTitle;

    let itineraries = [];

    if (!localStorage.getItem('UKB010-visitedItineraries')) {
      itineraries.push(itineraryData);
      localStorage.setItem('UKB010-visitedItineraries', JSON.stringify(itineraries));
    } else {
      itineraries = JSON.parse(localStorage.getItem('UKB010-visitedItineraries'));

      // Check if Itinerary Page already exists in localStorage item
      let itineraryExistsInCookie = false;
      itineraries.forEach(item => {
        if (item.title === itineraryTitle) {
          itineraryExistsInCookie = true;
        }
      });

      if (!itineraryExistsInCookie) {
        itineraries.push(itineraryData);
        localStorage.setItem('UKB010-visitedItineraries', JSON.stringify(itineraries));
      }
    }
  }
};