import settings from './settings';
import pubSub from './PublishSubscribe';

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
 * Get regex matching path
 *
 * @param {String} urlPath
 * @param {Array} stats
 * @return {String}
 */
const statMatchingPath = (urlPath, stats) => {
  let result = '';

  stats.forEach((stat) => {
    if((new RegExp(stat.regex)).test(urlPath)) {
      result = stat.text;
    }
  });

  return result;
};

/**
 * Build did you know
 *
 * @param {String} stat
 */
const buildDidYouKnow = (stat) => {
  const rightBar = document.querySelector('.main-content > .container > .content > .right');
  if(rightBar) {
    rightBar.insertAdjacentHTML('beforeend', `
      <div class="box-with-border white nh33-stat-box">
        <h3>Did you know?</h3>
        <p class="nh33-stat-box__text">
          ${stat}
        </p>
      </div>
    `);
  }
};

/**
 * Check in view
 *
 * @return {Boolean}
 */
const isInView = () => {
  const box = document.querySelector('.nh33-stat-box');
  const boxBounds = box.getBoundingClientRect();

  let isInView = false;
  if(boxBounds && boxBounds.y > 0 && boxBounds.y < window.innerHeight) {
    isInView = true;
  }
  if(boxBounds && boxBounds.y < 0 && (boxBounds.y + boxBounds.height) > 0) {
    isInView = true;
  }

  return isInView;
};

/**
 * Entry point for running experiment
 *
 * @access public
 */
export default () => {
  // --------------------------------------------
  // Init on matching stat
  // --------------------------------------------
  const matchingStat = statMatchingPath(window.location.pathname, settings.STATS);
  if(matchingStat) {
    // --------------------------------------------
    // Experiment is running
    // --------------------------------------------
    pubSub.publish('experiment-init');

    // --------------------------------------------
    // Add classes to body
    // --------------------------------------------
    addBodyClasses();

    // --------------------------------------------
    // Build Did You Know Region
    // --------------------------------------------
    buildDidYouKnow(matchingStat);
    
    // --------------------------------------------
    // Check if did you know in view
    // --------------------------------------------
    if(isInView()) {
      pubSub.publish('box-in-view');
    }

    let scrollTimeout = null;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if(isInView()) {
          pubSub.publish('box-in-view');
        }
      }, 50);
    });
  }
};
