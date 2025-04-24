import { fullStory, events, viewabilityTracker } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import eventDetails from './lib/NH051content';

/**
 * {{NH051}} - {{Landing page optimisation - V1}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH051',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    // eslint-disable-next-line
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // Create New Top Content
    const pageUrl = window.location.pathname;
    const data = eventDetails[`${pageUrl}`];
    components.createNewTopContent(data);

    // Get Event Data
    /**
     * @desc Makes a GET request to a category URL and retrieves the product count
     * @param {String} url URL to retrieve the product count from
     * @param {Function} callback Function to run when the request was successful
     */
    const getCardDetailsText = (url, callback) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('html');
          temp.innerHTML = request.responseText;
          const cardText = temp.querySelector('.main-content .tab-area .content-block.active .text p').innerText.trim().substring(0, 100);
          const paragraphs = temp.querySelectorAll('.main-content .tab-area .content-block.active .text p');
          let cardBulletsContainer = null;
          [].forEach.call(paragraphs, (p) => {
            if(p.innerText.trim().match(/●|•/)) {
              cardBulletsContainer = p;
            }
          });

          let bullets = [];
          if(cardBulletsContainer) {
            [].forEach.call(cardBulletsContainer.querySelectorAll('br'), (br) => br.remove());

            const children = cardBulletsContainer.childNodes;
            [].forEach.call(children, (child) => {
              if(child.nodeType == 3) {
                bullets.push(child.textContent.replace('•', '●'));
              }
            });
          }

          bullets = bullets.slice(0,4);

          callback(bullets);
        }
      };
      request.send();
    };

    pollerLite([
      'section.blue .slider-wrap a.item', 
      'section.blue .slider-wrap a.item div.img-wrap', 
      'section.blue .slider-wrap a.item div.content',
      () => {
        // ---------------------------------------
        // Knockout has to have made the bindings, check values exist:
        // ---------------------------------------
        const firstItem = document.querySelector('section.blue .slider-wrap a.item');
        const image = firstItem.querySelector('.img-wrap > img');

        if(!firstItem || !image) {
          return false;
        }

        if(!firstItem.href) {
          return false;
        }

        if(!image.getAttribute('src')) {
          return false;
        }

        return true;
      }
    ], () => {
      // Create Event Cards
      components.createEventCards(getCardDetailsText);
      // Send GA Event when element is in viewport
      pollerLite(['.NH051-eventCardContainer'], () => {
        /*eslint-disable */
        viewabilityTracker(document.querySelector('.NH051-eventCardContainer'), () => {
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `User Scrolled - ‘Explore our upcoming breaks’ is in viewport`, { sendOnce: true });
        }, {removeOnView: true});
        /* eslint-enable */
      });

      // Hide the upcoming breaks and holidays if < 4
      const sliderWrap = document.querySelector('section.blue .slider-wrap');
      if(sliderWrap) {
        const events = sliderWrap.querySelectorAll('a.item:not(.slick-cloned)');
        if(events.length <= 4) {
          sliderWrap.parentNode.parentNode.classList.add('NH051-hide');

          events.send(settings.ID, `Variation ${settings.VARIATION}`, 'upcoming-breaks-hidden', { sendOnce: true });
        } else {
          const title = sliderWrap.parentNode.querySelector('h2');
          if(title) {
            title.innerHTML = 'Scroll to see more upcoming breaks';
            events.send(settings.ID, `Variation ${settings.VARIATION}`, 'scroll-text-added', { sendOnce: true });
          }
        }
      }
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.setTrackerName('tracker2');
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Create New Top Content
     */
    createNewTopContent(data) {
      // eslint-disable-next-line
      const details = data['details'];
      // eslint-disable-next-line
      const sideDetails = data['side-details'];
      const newTopContainer = `<div class='NH051-topContentWrapper'>
        <div class='NH051-details_left'>
          <div class='NH051-detailsTitle'>
            <h2>Trip Details</h2>
          </div>
          ${details}
        </div>
        <div class='NH051-details_right'>
          <div class='NH051-detailsTitle'>
            <h2>Our promise to you</h2>
          </div>
          ${sideDetails}
        </div>
      </div>`;
      let innerContent = document.querySelector('.inner-content.landing-item');
      if (!innerContent) {
        // eslint-disable-next-line
        innerContent = document.querySelectorAll('.inner-content')[1];
      }
      innerContent.insertAdjacentHTML('beforebegin', newTopContainer);
    },
    /**
     * @desc Create Event Cards
     */
    createEventCards(getCardDetailsText) {
      const { components } = Experiment;
      let cardsCount = 0;
      let cardsContent = '';
      /*eslint-disable */
      setTimeout(function(){
      // eslint-disable-next-line
        const events = document.querySelectorAll('section.blue .slider-wrap a.item:not(.slick-cloned)');
        [].forEach.call(events, (event) => {
          if (cardsCount < 4) {
            // eslint-disable-next-line
            let details = '';
            let href = '';
            let imageUrl = '';
            let eventTitle = '';
            let days = '';
            let date = '';
            let price = '';
            // eslint-disable-next-line
            href = event.href;
            if (event.querySelector('.img-wrap > img')) {
              imageUrl = event.querySelector('.img-wrap > img').getAttribute('src');
            }
            if (event.querySelector('.content > h3')) {
              eventTitle = event.querySelector('.content > h3').innerText.trim();
            }
            if (event.querySelectorAll('.text-area > .dates span')[0]) {
              days = event.querySelectorAll('.text-area > .dates span')[0].innerText.trim();
            }
            if (event.querySelectorAll('.text-area > .dates span')[1]) {
              date = event.querySelectorAll('.text-area > .dates span')[1].innerText.trim();
              if (date === 'See more dates') {
                date = `<a href='${href}'>See more dates</a>`;
              }
            }
            if (event.querySelector('.orange-btn strong')) {
              price = event.querySelector('.orange-btn strong').innerText.trim();
            }
            let wasPrice = '';
            let wasPriceHtml = '';
            if (event.querySelector('.was-price strong')) {
              wasPrice = event.querySelector('.was-price strong').innerText.trim();
              if (wasPrice !== '' && (price && wasPrice !== `${price}.00`)) {
                wasPriceHtml = `<div class='NH051-event__was-price'>Was ${wasPrice}</div>`;
              }
            }
            if (href !== '' && imageUrl !== '' && eventTitle !== '' && days !== '' && date !== '') {
              const newCard = `<div class='NH051-eventCard'>
                <div class='NH051-eventCardContainer'>
                  <div class='NH051-eventImage'><div class='image' style="background-image:url('${imageUrl}')"></div></div>
                  <div class='NH051-eventDetails'>
                    <div class='NH051-event__title'>${eventTitle}</div>
                    <div class='NH051-event__details' id='card-details-${cardsCount}'>${details}... <a href='${href}'>read more</a></div>
                    <div class='NH051-event__bottom-info'>
                      <div class='NH051-event__dates'><span>${days}</span> |<span>${date}<span></div>
                      <div class='NH051-event__button'>
                        ${wasPriceHtml}
                        <div class='NH051-event__priceText'>Today's Web Price</div>
                        <a href='${href}'>from only <span class='NH051-event__price'>${price}</span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
              cardsContent += newCard;
              cardsCount += 1;
            }
          }
        });
        // Event Cards Container
        const eventCardsContainer = `<div class='NH051-eventCardsWrapper'>
          <h2 class="NH051-eventCardsHeading">Upcoming breaks &amp; holidays</h2>
          <div class='NH051-eventCardsContainer'>
            ${cardsContent}
          </div>
          <p class="NH051-eventCardsExtra">Like what you see? We have even more. Use the search
            form to find your next break.</p>
        </div>`;
        const topContainer = document.querySelector('.NH051-topContentWrapper');
        topContainer.insertAdjacentHTML('afterend', eventCardsContainer);
        components.addCardDetails(getCardDetailsText);
      }, 1500);
      /* eslint-enable */
    },
    /**
     * @desc Add Card Details
     */
    addCardDetails(getCardDetailsText) {
      const cards = document.querySelectorAll('.NH051-eventCard');
      [].forEach.call(cards, (card) => {
        // eslint-disable-next-line
        const href = card.querySelector('.NH051-event__button > a').href;
        const cardId = card.querySelector('.NH051-event__details').id;

        getCardDetailsText(`${href}`, (cardBullets) => {
          const cardText = cardBullets.join('<br>');
          document.querySelector(`#${cardId}`).innerHTML = `${cardText} <p class="NH051-and-more">● <a href='${href}'>...and more</a></p>`;
        });
      });
    },
  },

};

export default Experiment;
