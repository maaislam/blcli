/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import {
  init
} from './lib/experiment';


/**
 * Doesn't need to be changed
 */
function poll(fn, timeout, interval) {
  var endTime = Number(new Date()) + (timeout || 2000);
  interval = interval || 100;

  var checkCondition = function (resolve, reject) {
    // If the condition is met, we're done! 
    var result = fn();
    if (result) {
      resolve(result);
    }
    // If the condition isn't met but the timeout hasn't elapsed, go again
    else if (Number(new Date()) < endTime) {
      setTimeout(checkCondition, interval, resolve, reject);
    }
    // Didn't match and too much time, reject!
    else {
      reject(new Error('timed out for ' + fn + ': ' + arguments));
    }
  };

  return new Promise(checkCondition);
}

/**
 * Poller that waits for elements that are being used within the test to exist 
 * before trying to run the test to avoid any errors or issues with the test firing
 */
poll(function () {

  if(document.querySelector('.uspbar')) {
    return false
  } else // if elements exist, return true
  if (window.jQuery && document.querySelector('#header-promo-banner')) {
    return true
  }

}, 8000, 50).then(function () {

  // BUILD EXPERIMENT HERE

  /* --------------
  *  Create new USP bar
  ------------------*/
  var uspBar =
    `<div class="uspbar">
    <ul class="usps">
      <li>
        <a href="https://www.hotelchocolat.com/uk/help/our-guarantee.html">
          <span><img src="https://editor-assets.abtasty.com/48343/607ef7a8805781618933672.png"/></span>
          <p>OUR 100% HAPPINESS PROMISE</p>
        </a>
      </li>
      <li>
        <a href="https://www.hotelchocolat.com/uk/engaged-ethics/our-people/Our-Story.html">
        <span><img src="https://editor-assets.abtasty.com/48343/607ef798bfe8e1618933656.png"/></span>
        <p>REAL, NATURAL INGREDIENTS</p>
        </a>
      </li>
      <li>
        <a href="https://www.hotelchocolat.com/uk/engaged-ethics.html">
        <span><img src="https://editor-assets.abtasty.com/48343/607ef77325d201618933619.png"/></span>
        <p>100% ETHICAL CACAO</p>
        </a>
      </li>
    <ul>
  </div>`

  // insert HTML before the header banner
  document.querySelector('#header-promo-banner').insertAdjacentHTML('beforebegin', uspBar);


  /* --------------
  *  Add Carousel
  ------------------*/

  // if the window is less than 768 (mobile devices) use slick to put in a carousel
  if (window.innerWidth < 768) {

    // slick carousel, options inside
    var init = () => {
      window.jQuery(`.uspbar .usps`).slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        rows: 0,
        slide: 'li' // stops slick adding a blank slide
      });
    }

    // check to see if slick exists on the page, if not we load it in from elsewhere
    if (window.jQuery && window.jQuery.fn.slick) {
      init();
    } else {
      // adds a class to the body so we can only add the slick styling if it doesn't already exist
      document.body.classList.add('noslick');

      window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
        init();
      });
    }

  }


}).catch(function () {
  // UNABLE TO BUILD EXPERIMENT
});
