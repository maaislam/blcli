/**
 * @type {Number}
 */
const RUN_BREAKPOINT = 850;

/**
 * @type {HTMLElement}
 */
let cachedContainer = null;

/**
 * @type {Number}
 */
let cachedCeiling = null;

/**
 * @type {Number}
 */
let cachedFloor = null;

/**
 * Helper get gallery container div which contains all relevant elements
 *
 * @access private
 */
const getProductContainer = () => {
  if(cachedContainer === null) {
    cachedContainer = document.querySelector('form[name=productView] > .pos-relative > .c-8');
  }

  return cachedContainer;
};

/**
 * Get ceiling start point for scroll
 *
 * @param {HTMLElement} container
 * @access private
 */
const getCeiling = (container, reset = false) => {
  if(cachedCeiling == null || reset) {
    const boundingRect = container.getBoundingClientRect();
    if(!boundingRect) {
      return 0;
    }

    const realTopOffset = boundingRect.top + window.scrollY;

    cachedCeiling = realTopOffset;
  }

  return cachedCeiling;
};

/**
 * Get floor max scroll point
 *
 * @param {HTMLElement} container
 * @access private
 */
const getFloor = (container, reset = false) => {
  if(cachedFloor == null || reset) {
    if(!container.parentNode) {
      return 0;
    }

    const boundingRect = container.parentNode.getBoundingClientRect();
    if(!boundingRect) {
      return 0;
    }

    const realTopOffset = boundingRect.top + window.scrollY;
    const floor = realTopOffset + boundingRect.height;

    cachedFloor = floor;
  }

  return cachedFloor;
};

/**
 * Is runanble
 *
 * @access private
 */
const canRun = () => window.innerWidth >= RUN_BREAKPOINT;

/**
 * Set container max height
 *
 * @param {HTMLElement} container
 * @access private
 */
const setContainerMaxHeight = (container) => {
  container.style.maxHeight = window.innerHeight + 'px';
};

/**
 * Handle Window Scroll
 *
 * @param {EventObject} e
 */
const onScroll = (e) => {
  const container = getProductContainer();
  const ceiling = getCeiling(container);
  const floor = getFloor(container);

  if(window.innerHeight + window.scrollY > floor) {
    return;
  } else if(ceiling < window.scrollY) {
    container.style.transform = 'translateY(' + (window.scrollY - ceiling) + 'px)';
  } else {
    container.style.transform = 'translateY(0)';
  }
};

/**
 * @access public
 * @param {Function} addEventListener
 */
export default () => {
  if(canRun()) {
    const container = getProductContainer();

    container.classList.add('bi29-scroller-initialised');

    setContainerMaxHeight(container);

    return onScroll;
  }

  return null;
};
