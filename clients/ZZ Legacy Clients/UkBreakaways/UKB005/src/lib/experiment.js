/**
 * UKB005 - Mobile destination pages
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import initiateSlick from './initiateSlick';
import createDestinationCards from './createDestinationCards';
import addUpcomingBreaksHeader from './addUpcomingBreaksHeader';
import readMoreLess from './readMoreLess';

const activate = () => {
  // Experiment code
  // Check if page is not one of the exceptions
  const exceptions = ["/destination/london", "/destination/tribute-weekends", "/destination/isle-of-wight"];
  const pathname = window.location.pathname;

  if (exceptions.indexOf(pathname) === -1) {
    setup();
    const destinationTitle = document.querySelector('h1');
    if (destinationTitle) {
      const destinationDetailsContainer = destinationTitle.parentNode;
      destinationDetailsContainer.classList.add('UKB005-destinationDetails__wrapper');
      // Add 'Read More' link
      const readMoreLinkContainer = `<div class="UKB005-readMore__wrapper">
        <div class="UKB005-readMore">read more</div>
      </div>`;
      if (!document.querySelector('.UKB005-readMore__wrapper')) {
        destinationDetailsContainer.insertAdjacentHTML('afterend', readMoreLinkContainer);

        // Read More link - click
        const readMoreLink = document.querySelector('.UKB005-readMore');
        readMoreLink.addEventListener('click', () => {
          readMoreLess(readMoreLink);
        });
      }
      // Add class name to all H3 headers
      const destinationPageHeaders = document.querySelectorAll('h3');
      [].forEach.call(destinationPageHeaders, (header) => {
        header.classList.add('UKB005-destinationPage__header');
        const text = header.innerText.trim();
        if (text.indexOf('View') === -1) {
          header.innerText = `View ${text}`;
        } 
      });

      // Wrap Hotels in Wrapper
      const hotelEl = document.querySelector('.hotelbox');
      if (hotelEl) {
        const hotelsContainer = hotelEl.parentNode;
        hotelsContainer.classList.add('UKB005-hotelOptions__wrapper');
        const hotelsTitle = hotelsContainer.querySelector('h3');

        hotelsContainer.insertAdjacentElement('beforebegin', hotelsTitle);

        // Hotel Options - click
        hotelsTitle.addEventListener('click', () => {
          document.querySelector('.UKB005-hotelOptions__wrapper').classList.toggle('show');
        });
      }
      
      // Add "Upcoming Breaks" header
      addUpcomingBreaksHeader();

      // Extra pages
      if (pathname === "/destination/city-breaks") {
        const destinationsContainer = document.querySelector('div[data-mid="4510"]');
        if (destinationsContainer) {
          createDestinationCards(pathname, destinationsContainer);
        }
      } else if (pathname === "/destination/comedy") {
        const destinationsContainer = document.querySelector('div[data-mid="5577"]');
        if (destinationsContainer) {
          createDestinationCards(pathname, destinationsContainer);
        }
      } else if (pathname === "/destination/family-breaks") {
        const destinationsContainer = document.querySelector('div[data-mid="5437"]');
        if (destinationsContainer) {
          createDestinationCards(pathname, destinationsContainer);
        }
      } else if (pathname === "/destination/special-events") {
        const destinationsContainer = document.querySelector('div[data-mid="4600"]');
        if (destinationsContainer) {
          createDestinationCards(pathname, destinationsContainer);
        }
      } else if (pathname === "/destination/sporting-events") {
        const destinationsContainer = document.querySelector('div[data-mid="4594"]');
        createDestinationCards(pathname, destinationsContainer);
      } else if (pathname === "/destination/london-theatre") {
        const destinationsContainer = document.querySelector('div[data-mid="9773"]');
        if (destinationsContainer) {
          createDestinationCards(pathname, destinationsContainer);
        }
      } else if (pathname === "/destination/theatre") {
        const destinationsContainer = document.querySelector('div[data-mid="7741"]');
        if (destinationsContainer) {
          createDestinationCards(pathname, destinationsContainer);
        }
      }
    }
  } else if (pathname === "/destination/tribute-weekends") {
    setup();
    const destinationTitle = document.querySelector('h1');
    if (destinationTitle) {
      const destinationDetailsContainer = destinationTitle.parentNode;
      destinationDetailsContainer.classList.add('UKB005-destinationDetails__wrapper');
      // Add 'Read More' link
      const readMoreLinkContainer = `<div class="UKB005-readMore__wrapper">
        <div class="UKB005-readMore">read more</div>
      </div>`;
      if (!document.querySelector('.UKB005-readMore__wrapper')) {
        document.querySelector('.UKB005-destinationDetails__wrapper br').insertAdjacentHTML('afterend', readMoreLinkContainer);

        // Read More link - click
        const readMoreLink = document.querySelector('.UKB005-readMore');
        readMoreLink.addEventListener('click', () => {
          readMoreLess(readMoreLink);
        });
      }
    }
      
    // -------- Tributes ---------
    const tributesContainer = document.querySelector('div[data-mid="9566"]');
    if (tributesContainer) {
      tributesContainer.classList.add('UKB005-tributeOptions__wrapper');
      tributesContainer.insertAdjacentHTML('beforebegin', `<h3 id='UKB005-tributes' class='UKB005-destinationPage__header'>View tribute acts</h3>`);
      tributesContainer.insertAdjacentHTML('afterbegin', `<span class='UKB005-subTitle'>Choose your favourite act:</span>`);
      const tributesTitle = document.querySelector('#UKB005-tributes'); 
      // Hotel Options - click
      tributesTitle.addEventListener('click', () => {
        document.querySelector('.UKB005-tributeOptions__wrapper').classList.toggle('show');
      });
    }

    // -------- Destinations ---------
    const destinationsContainer = document.querySelector('div[data-mid="4486"]');
    if (destinationsContainer) {
      destinationsContainer.classList.add('UKB005-destinationOptions__wrapper');
      destinationsContainer.insertAdjacentHTML('beforebegin', `<h3 id='UKB005-destinations' class='UKB005-destinationPage__header'>View destinations</h3>`);
      destinationsContainer.insertAdjacentHTML('afterbegin', `<span class='UKB005-subTitle'>Choose a destination:</span>`);
      const destinationsTitle = document.querySelector('#UKB005-destinations'); 
      // Hotel Options - click
      destinationsTitle.addEventListener('click', () => {
        document.querySelector('.UKB005-destinationOptions__wrapper').classList.toggle('show');
      });
    }

    // Add "Upcoming Breaks" header
    addUpcomingBreaksHeader();
  } else if (pathname === "/destination/london") {
    console.log('THIS   IS   THE   LONDON    PAGE');
    setup();
    const destinationDetailsContainer = document.querySelector('div[data-mid="4609"]');
    if (destinationDetailsContainer) {
      destinationDetailsContainer.classList.add('UKB005-londonDestinationDetails__wrapper');

      // Add 'Read More' link
      const readMoreLinkContainer = `<div class="UKB005-readMore__wrapper">
        <div class="UKB005-readMore">read more</div>
      </div>`;
      if (!document.querySelector('.UKB005-readMore__wrapper')) {
        destinationDetailsContainer.querySelectorAll('p')[1].insertAdjacentHTML('afterend', readMoreLinkContainer);

        // Read More link - click
        const readMoreLink = document.querySelector('.UKB005-readMore');
        
        readMoreLink.addEventListener('click', () => {
          readMoreLess(readMoreLink);
        });
      }

      // Wrap Hotel items
      $( '.UKB005-londonDestinationDetails__wrapper .hotelbox' ).wrapAll( "<div class='UKB005-hotelOptions__wrapper'></div>" );
      // Add class name to Hotel H3 header
      const hotelsTitle = document.querySelector('.UKB005-hotelOptions__wrapper').previousElementSibling;
      if (hotelsTitle) {
        hotelsTitle.classList.add('UKB005-destinationPage__header');
        const text = hotelsTitle.innerText.trim();
        if (text.indexOf('View') === -1) {
          hotelsTitle.innerText = `View ${text}`;
        }

        // Hotel Options - click
        hotelsTitle.addEventListener('click', () => {
          document.querySelector('.UKB005-hotelOptions__wrapper').classList.toggle('show');
        });
      }

      // Add "Upcoming Breaks" header
      addUpcomingBreaksHeader();
    }
    
  } else if (pathname === "/destination/isle-of-wight") {
    pollerLite(['div[data-mid="4324"]', 'h3', '.hotelbox'], () => {
      setup();
      const destinationDetailsContainer = document.querySelector('div[data-mid="4324"]');
      if (destinationDetailsContainer) {
        destinationDetailsContainer.classList.add('UKB005-destinationDetails__wrapper');

        // Add 'Read More' link
        const readMoreLinkContainer = `<div class="UKB005-readMore__wrapper">
          <div class="UKB005-readMore">read more</div>
        </div>`;
        if (!document.querySelector('.UKB005-readMore__wrapper')) {
          destinationDetailsContainer.insertAdjacentHTML('afterend', readMoreLinkContainer);

          // Read More link - click
          const readMoreLink = document.querySelector('.UKB005-readMore');
          readMoreLink.addEventListener('click', () => {
            const paragraphs = document.querySelectorAll('.UKB005-destinationDetails__wrapper p');
            
            let count = 1;
            [].forEach.call(paragraphs, (el) => {
              if (count === 1) {
                el.setAttribute('style', 'display: block !important; overlow: auto !important; max-height: none !important');
              } else {
                el.setAttribute('style', 'display: block !important;');
              }
              count += 1;
            });

            // Hide Read More
            readMoreLink.setAttribute('style', 'display: none !important;');
          });
        }

        // Add destination boxes in Carousel
        const container = document.querySelector('div[data-mid="7744"]');
        $( 'div[data-mid="7744"] .destination-box' ).wrapAll( "<div class='UKB005-destinationBox__wrapper'></div>" );
        initiateSlick();

        // function wrap(el, wrapper) {
        //     el.parentNode.insertBefore(wrapper, el);
        //     wrapper.appendChild(el);
        // }
        
        // // example: wrapping an anchor with class "wrap_me" into a new div element
        // wrap(document.querySelectorAll('a.wrap_me'), document.createElement('div'));
        
        // Hide split row dots
        const lineDots = container.querySelector('hr');
        if (lineDots) {
          lineDots.setAttribute('style', 'display: none !important;');
        }

        const hotelsHeader = document.querySelector('div[data-mid="7744"] h3');
        if (hotelsHeader) {
          // Wrap Hotels in Wrapper
          const hotelEl = document.querySelector('.hotelbox');
          if (hotelEl) {
            const hotelsContainer = hotelEl.parentNode;
            hotelsContainer.classList.add('UKB005-hotelOptions__wrapper');
            const hotelsTitle = hotelsContainer.querySelector('h3');
            hotelsTitle.classList.add('UKB005-destinationPage__header');
            const text = hotelsTitle.innerText.trim();
            if (text.indexOf('View') === -1) {
              hotelsTitle.innerText = `View ${text}`;
            }

            hotelsContainer.insertAdjacentElement('beforebegin', hotelsTitle);

            // Hotel Options - click
            hotelsTitle.addEventListener('click', () => {
              document.querySelector('.UKB005-hotelOptions__wrapper').classList.toggle('show');
            });
          }
        }

        // Add "Upcoming Breaks" header
        addUpcomingBreaksHeader();
      }
    });
  }
  
};

export default activate;
