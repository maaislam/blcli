import lastSlideMarkup from './lastSlide';
import flickityHeight from './flickityHeight';

export default () => {
  /**
 * Adds a new slide to the product image slider
 * @param {HTMLElement|string} slideEl Element or markup for new slide to be added
 */
  const addNewSlideToGallery = (slideEl) => {
    const getImageSlider = () => document.querySelector('.product-gallery .images .product-gallery-slider');

    /** Clone and replace product gallery to remove slider and popup events */
    const removeGalleryEvents = () => {
      const imageSlider = getImageSlider();

      // "Cleanse" markup by destroying Flickity slider before cloning
      jQuery(imageSlider).flickity('destroy');

      // Clone and replace markup to remove Magnific Popup events
      const imageGallery = document.querySelector('.product-gallery .images');
      imageGallery.outerHTML = imageGallery.outerHTML;
    };


    /** Add new slide */
    const addNewSlide = () => {
      const imageSlider = getImageSlider();
      const slide = document.createElement('div');
      slide.className = 'slide easyzoom';

      // Add slideEl param to slide element wrap
      if (typeof slideEl === 'string') {
        slide.innerHTML = slideEl;
      } else if (typeof slideEl === 'object') {
        slide.appendChild(slideEl);
      }

      // Add slide element to slider
      imageSlider.appendChild(slide);
    };


    /** Reinitialise slider and popup plugins */
    const reinitPlugins = () => {
      // hack to add adaptive height on V1

      const gallery = jQuery(getImageSlider());
      gallery.flickity({
        cellAlign: 'center',
        wrapAround: true,
        autoPlay: false,
        prevNextButtons: true,
        percentPosition: true,
        imagesLoaded: true,
        lazyLoad: 1,
        pageDots: false,
        selectedAttraction: 0.1,
        friction: 0.6,
        rightToLeft: false,
        adaptiveHeight: true,
      });
      setTimeout(() => {
        gallery.flickity('resize');
      }, 1000);

      function updateStatus() {
        const scarcity = document.querySelector('#merchoid-scarcity-message');
        const flkty = gallery.data('flickity');
        const numberOfSlides = flkty.cells.length;
        const cellNumber = flkty.selectedIndex + 1;
        if (scarcity) {
          if (cellNumber === numberOfSlides) {
            scarcity.style.display = 'none';
          } else {
            scarcity.style.display = 'block';
          }
        }
      }

      gallery.on('cellSelect', updateStatus);


      /* function updateStatus() {
        const flkty = gallery.data('flickity');
        const cellNumber = flkty.selectedIndex + 1;
        console.log(cellNumber);
      }
      updateStatus();
      gallery.on('settle', updateStatus); */

      const thumbnails = () => document.querySelector('.ME169-thumbnails.product-thumbnails');
      jQuery(thumbnails()).flickity({
        cellAlign: 'left',
        wrapAround: false,
        autoPlay: false,
        prevNextButtons: true,
        asNavFor: '.product-gallery-slider',
        percentPosition: true,
        imagesLoaded: true,
        pageDots: false,
        selectedAttraction: 0.1,
        friction: 0.6,
        rightToLeft: false,
        contain: true,
      });
    };


    removeGalleryEvents();
    addNewSlide();
    reinitPlugins();
  };

  addNewSlideToGallery(lastSlideMarkup);
};
