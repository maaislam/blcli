import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { observeIntersection } from './helpers/utils';

const { ID, VARIATION } = shared;

const onUrlChange = (callback, onError = null) => {
  if (typeof callback !== 'function') {
    throw new Error('Callback function must be provided');
  }
  const mutationConfig = {
    childList: true,
    subtree: true,
  };
  //Create a new MutationObserver instance to observe changes to the document body
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      //Store the current URL in a separate variable to make the code more concise
      const currentUrl = window.location.href;
      //Check if the URL has changed since the last observation
      if (observer.previousUrl !== currentUrl) {
        const oldHref = observer.previousUrl;
        //Update the previous URL and execute the callback function
        observer.previousUrl = currentUrl;
        //console.log('URL changed!');
        observer.disconnect();
        try {
          setTimeout(() => {
            callback(oldHref, mutation);
          }, 1000);
        } catch (error) {
          console.log(`Error in callback function: ${error}`);
        }
        observer.observe(document.documentElement, mutationConfig);
      }
    });
  });
  //Initialize the previous URL to the current URL
  try {
    observer.previousUrl = window.location.href;
    //Start observing changes to the document documentElement to detect URL changes
    observer.observe(document.documentElement, mutationConfig);
  } catch (error) {
    if (onError && typeof onError === 'function') {
      onError(error);
    } else {
      console.log(`Error starting onUrlChange observer: ${error}`);
    }
  }
};

const startExperiment2 = () => {
  function implementLoadMoreButton() {
    const hotelsAvailability = Number(window.globalDataLayer.hotelsReturned);
    if (hotelsAvailability < 10) return;

    fireEvent('Conditions Met');

    if (VARIATION == 'control') {
      return;
    }

    setup();

    pollerLite(['.main .search-page .hotel-card', () => typeof window.globalDataLayer === 'object'], () => {
      const hotelsAvailable = window.globalDataLayer.hotelsReturned;
      let hotelsVisible = 10;


      function findAndClickSearchLoadMoreButton() {
        const searchLoadMore = document.querySelector('.qa-load-more-button');
        searchLoadMore.click();
        updateHotelsVisible();
      }

      function updateHotelsVisible() {
        const hotelCards = document.querySelectorAll('.hotel-card');

        hotelsVisible += 10;
        if (hotelsAvailable - hotelsVisible <= 0) {
          document.querySelector(`.${ID}-load-more-button`).remove();
          hotelsVisible = hotelsAvailable;
        } else if (hotelsAvailable - hotelsVisible <= 5) {
          document.querySelector(`.${ID}-load-more-button`).remove();
          hotelsVisible = hotelsAvailable;
        }
        else if (hotelsAvailable - hotelsVisible < 10) {
          const hotelsLeft = hotelsAvailable - hotelsVisible;
          document.querySelector(`.${ID}-load-more-button`).textContent = `Load ${hotelsLeft} more hotels on map`;
          // hotelsVisible = hotelsAvailable;
        }
        document.querySelector(`.${ID}-load-more-container p`).textContent = `Displaying ${hotelCards.length} out of ${hotelsAvailable} hotels`;
      }

      const mapContainer = document.querySelector('.qa-search-page .map');

      // Function to create and configure the MutationObserver
      function createMutationObserver(container) {
        // Callback function to handle mutations
        const mutationCallback = function (mutationsList, observer) {
          for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
              // Perform your logic based on changes
              if (document.querySelector('.qa-search-page .map.map--open')) {
                const hotelCards = document.querySelectorAll('.hotel-card');
                //if no search more then all hotels loaded
                const searchLoadMore = document.querySelector('.qa-load-more-button');
                if (!searchLoadMore) {
                  const loadMoreHtml = `
                    <div class="${ID}-load-more-container">
                      <p>Displaying ${hotelsAvailable} out of ${hotelsAvailable} hotels</p>
                    </div>
                  `;
                  if (!document.querySelector(`.${ID}-load-more-container`)) {
                    const target = document.querySelector('.map .qa-map-close');
                    target.insertAdjacentHTML('beforebegin', loadMoreHtml);
                  }

                }
                //else if search load more is present
                const loadMoreHtml = `
                  <div class="${ID}-load-more-container">
                    <p>Displaying ${hotelCards.length} out of ${hotelsAvailable} hotels</p>
                    <button class="${ID}-load-more-button">Load 10 more hotels on map</button>
                  </div>
                `;
                const loadMoreContainer = document.querySelector(`.${ID}-load-more-container`);
                if (!loadMoreContainer) {
                  const target = document.querySelector('.map .qa-map-close');
                  target.insertAdjacentHTML('beforebegin', loadMoreHtml);
                  const loadMoreButton = document.querySelector(`.${ID}-load-more-button`);
                  loadMoreButton.addEventListener('click', findAndClickSearchLoadMoreButton);
                }
                // console.log('Map is open');
              } else if (!document.querySelector('.qa-search-page .map.map--open')) {
                console.log('Map is closed');
                const loadMoreContainer = document.querySelector(`.${ID}-load-more-container`);
                if (loadMoreContainer) {
                  loadMoreContainer.remove();
                }
              }

              // Disconnect the observer temporarily
              observer.disconnect();

              // Reconnect the observer after a short delay
              setTimeout(() => {
                observer.observe(container, config);
                console.log('Observer reconnected.');
              }, 1000); // Adjust the delay as needed
            }
          }
        };

        // Configuration for the observer (configuring it to watch for childList changes)
        const config = { attributes: false, childList: true, subtree: false };

        // Create an observer instance
        const observer = new MutationObserver(mutationCallback);

        // Start observing the target node for configured mutations
        observer.observe(container, config);

        return observer;
      }

      createMutationObserver(mapContainer);

      let scrollTimer;
      const intersectionAnchor = document.querySelector('.footer.qa-footer');
      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
              const hotelCards = document.querySelectorAll('.hotel-card');
              const hotelCardLength = hotelCards.length;
              const loadMoreText = document.querySelector(`.${ID}-load-more-container p`);
              if (loadMoreText) loadMoreText.textContent = `Displaying ${hotelCardLength} out of ${hotelsAvailable} hotels`;
            }, 1000);
          }
        });
      };
      observeIntersection(intersectionAnchor, 0, handleIntersection);
    });
  }

  const addTracking = () => {
    document.body.addEventListener('click', (e) => {
      if (e.target.closest(`.${ID}-load-more-button`)) {
        fireEvent('Click - User clicked on load more button');
      }

      if (e.target.closest('.qa-map-popover-hotel-link')) {
        fireEvent('Click - User clicked on hotel from map');
      }
    });
  };

  implementLoadMoreButton();
  addTracking();

  onUrlChange(() => {
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);
    
    implementLoadMoreButton();
  });
}

export default () => {
  startExperiment2();
};
