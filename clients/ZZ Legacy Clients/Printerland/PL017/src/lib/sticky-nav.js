/**
 * @desc Sticky nav
 *
 * Wrapper allowus us to position child container however we like
 * while the wrapper retains the existing site structure
 *
 * @param {HTMLElement} containerColumn
 * @param {String} classPrefix
 * @param {Number} footerOffset Footer offset top
 * @param {Function} callback Called when stick initiated or uninitiated
 */
const stickyNav = (containerColumn, footerOffset = null) => {
  console.log('----inside sticky nav function');
  /**
   * Helper calculate offset
   */
  const calculateOffset = (el) => {
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return { 
      top: rect.top + scrollTop, 
      left: rect.left + scrollLeft 
    }
  }

  // Wrap the existing container in wrapper div
  const wrapper = document.createElement('div');
  wrapper.classList.add(`PL017-sticky-container`);
  containerColumn.parentNode.insertBefore(wrapper, containerColumn);
  wrapper.appendChild(containerColumn);

  const wrapperOffsetY = (calculateOffset(wrapper)).top;
  
  let didFireCallback = false;

  // On scroll sticky
  window.addEventListener('scroll', (e) => {
    const curScroll = window.scrollY;
    
    // If we're scrolling sticky into view, sticky
    if(curScroll >= wrapperOffsetY) {
      containerColumn.classList.add(`PL017-sticky`);
      
      if(!didFireCallback) {
        didFireCallback = true;
      }
    } else {
      containerColumn.classList.remove(`PL017-sticky`);
    }
    // console.log(containerColumn);
    // console.log(Math.min(0, (footerOffset - (curScroll + window.innerHeight))));
    // console.log(footerOffset);
    // If exceeding footer height, adjust accordingly w/ negative offset
    containerColumn.style.top = Math.min(0, (footerOffset - (curScroll + window.innerHeight ))) + 'px';
  });
};

export default stickyNav;
