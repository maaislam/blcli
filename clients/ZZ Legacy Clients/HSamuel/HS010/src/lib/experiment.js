import settings from './settings';
import pubSub from './PublishSubscribe';
import { observer } from '../../../../../lib/uc-lib';
import { initVideoSubscribers, videoIsReady, createVideo, muteVideo, setAutoplay, showControls, playVideo } from './video';
import { getProductItems } from './products';
import { getQuotePositions, countQuotes, getQuote, decorateQuote, decorateProductItem } from './quotes';
import { cacheDecorator } from './cache';
import { killScrollListeners, checkItemsInViewOnScroll } from './scrolling';


/**
 * Add body classes
 *
 * @access private
 */
const addBodyClasses = () => {
  document.body.classList.add(settings.ID);

  if (settings.VARIATION > 1) {
    document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
  }
};

/**
 * @access private
 */
const getBreakpoint = () => window.innerWidth < 640 ? 'mobile' : 'desktop';

/**
 * Helper render actions - this is called every time the dom is rebuilt
 *
 * @access private
 */
const render = () => {
  // --------------------------------------------
  // Add video
  // --------------------------------------------
  const existingBanner = document.querySelector('.browse__main-content .browse__banner');
  if(existingBanner) {
    const video = createVideo(settings.VIDEO_URL);

    muteVideo(video);
    setAutoplay(video);
    showControls(video);

    initVideoSubscribers(video);

    videoIsReady(video).then(() => {
      playVideo(video);
    });

    existingBanner.innerHTML = '';
    existingBanner.href = '';
    existingBanner.appendChild(video);
  }
  
  // --------------------------------------------
  // Add styled quotes to product listing
  // --------------------------------------------
  getQuotePositions(getBreakpoint()).map((position, idx) => {
    const getDecoratedQuote = decorateQuote(getQuote);
    const getDecoratedProductItem = decorateProductItem(getDecoratedQuote);
    const getProductItemsFromCache = cacheDecorator(getProductItems);

    const productItems = getProductItemsFromCache();
    const html = getDecoratedProductItem(idx);

    if(productItems[position]) {
      productItems[position].insertAdjacentHTML('afterend', html);
    } else if(productItems[productItems.length - 1]) {
      productItems[productItems.length - 1].insertAdjacentHTML('afterend', html);
    }

  });
  
  // --------------------------------------------
  // Did Items get seen?
  // --------------------------------------------
  const itemsInView = checkItemsInViewOnScroll();
  itemsInView.then(() => {
    pubSub.publish('items-in-view-on-scroll');
    killScrollListeners();
  });
  
};

/**
 * Cleanup - clean up / remove event listeners / remove dom elements
 *
 * @access private
 */
const cleanup = () => {

  killScrollListeners(); // Prevent re-bind to window

  [].forEach.call(document.querySelectorAll(`.${settings.ID}-list-item`), (item) => {
    item.remove();
  });

};

/**
 * Entry point for running experiment
 *
 * @access public
 */
export default () => {
  // --------------------------------------------
  // Experiment is running
  // --------------------------------------------
  pubSub.publish('experiment-init');

  // --------------------------------------------
  // Add classes to body
  // --------------------------------------------
  addBodyClasses();

  // --------------------------------------------
  // Run
  // --------------------------------------------
  cleanup();
  render();
  
  // --------------------------------------------
  // Mutation observer for async page changes
  // --------------------------------------------
  observer.connect(document.querySelector('.browse__main-content'), () => {
    cleanup();
    render();
  }, {
    childList: true,
    attributes: false  
  })
};
