
/* Rebuild the slider */
import flickityHeight from "./flickityHeight";

export default () => {
  const rebuildSlider = () => {
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
        pageDots: true,
        selectedAttraction: 0.1,
        friction: 0.6,
        rightToLeft: false,
        adaptiveHeight: true,
        dragThreshold: 10,
      });
      setTimeout(() => {
        gallery.flickity('resize');
      }, 1000);

      /* gallery.on('dragStart.flickity', function( event, pointer ) {
        document.ontouchmove = function (e) {
            e.preventDefault();
        }
      });
      gallery.on('dragEnd.flickity', function( event, pointer ) {
          document.ontouchmove = function (e) {
              return true;
          }
      }); */

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
    };


    removeGalleryEvents();
    reinitPlugins();
  };

  rebuildSlider();
  flickityHeight();
};
