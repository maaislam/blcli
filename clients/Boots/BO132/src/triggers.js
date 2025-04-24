/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite, observer } from '../../../../lib/utils';
import expData from './lib/expData';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    let windowSize = window.innerWidth;

    pollerLite(['body','.product_listing_container .grid_mode li', '.row.facetContainer', '#price_range_input #price_range_go',
    () => {
        return !!window.jQuery;
    },
    () => {
        return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
    },
    () => {
      let runExperiment = false;
      let pageUrl = window.location.pathname;

      if (pageUrl.indexOf(`/fragrance/fragrance-offers`) > -1) {
        pageUrl = '/fragrance/fragrance-offers';
      } else {
        pageUrl = window.location.pathname;
      }

      if (!!expData[`${pageUrl}`]) {
        runExperiment = true;
      }

      return runExperiment;
    },
    ], () =>{
        setTimeout(()=> {
            activate();
        }, 1000);
    });

    pollerLite(['body','.product_listing_container .grid_mode li', '.row.facetContainer', '#price_range_input #price_range_go',
      () => {
          return !!window.jQuery;
      },
      () => {
          return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
      },
      () => {
        let runExperiment = false;
        let pageUrl = window.location.pathname;

        if (pageUrl.indexOf(`/fragrance/fragrance-offers`) > -1) {
          pageUrl = '/fragrance/fragrance-offers';
        } else {
          pageUrl = window.location.pathname;
        }

        if (!!expData[`${pageUrl}`]) {
          runExperiment = true;
        }

        return runExperiment;
      },
    ], () => {

      // for observer
      let oldHref = document.location.href;
      let bodyList = document.querySelector("body");
      const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                  if (oldHref != document.location.href) {
                      oldHref = document.location.href;
                      document.body.classList.remove('BO132');
                      document.body.classList.remove('BO132-1');
                      document.body.classList.remove('BO132-2');
                        const filterBlock = document.querySelector('.BO132-heroFilters');
                        if(filterBlock) {
                            filterBlock.remove();
                        }

                        pollerLite(['body','.product_listing_container .grid_mode li', '.row.facetContainer', '#price_range_input #price_range_go',
                        () => {
                            return !!window.jQuery;
                        },
                        () => {
                            return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
                        },
                        () => {
                          let runExperiment = false;
                          let pageUrl = window.location.pathname;
                  
                          if (pageUrl.indexOf(`/fragrance/fragrance-offers`) > -1) {
                            pageUrl = '/fragrance/fragrance-offers';
                          } else {
                            pageUrl = window.location.pathname;
                          }
                  
                          if (!!expData[`${pageUrl}`]) {
                            runExperiment = true;
                          }
                  
                          return runExperiment;
                        },
                      ], () => {
                            setTimeout(()=> {
                                activate();
                            }, 1000);
                                  
                        });
                  }
              });
          });
      const config = {
          childList: true,
          subtree: true
      };
      
      observer.observe(bodyList, config);
    });

    /**
     * @desc Observing any URL changes
    
    pollerLite(['body','.product_listing_container .grid_mode li', '.row.facetContainer', '#price_range_input #price_range_go',
    () => {
        return !!window.jQuery;
    },
    () => {
        return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
    },
    () => {
      let runExperiment = false;
      let pageUrl = window.location.pathname;

      if (pageUrl.indexOf(`/fragrance/fragrance-offers`) > -1) {
        pageUrl = '/fragrance/fragrance-offers';
      } else {
        pageUrl = window.location.pathname;
      }

      if (!!expData[`${pageUrl}`]) {
        runExperiment = true;
      }

      return runExperiment;
    },
    ], () => {

        // --- Observe change in URL
        let oldHref = document.location.href;
        let bodyList = document.querySelector("body");
        const urlObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (oldHref != document.location.href) {
                        oldHref = document.location.href;
                        document.body.classList.remove('BO132');
                        const filterBlock = document.querySelector('.BO132-heroFilters');
                        if(filterBlock) {
                            filterBlock.remove();
                        }

                        pollerLite([
                        'body','.product_listing_container .grid_mode li', '.plp_gridView_redesign', '.row.facetContainer', '#price_range_input #price_range_go',
                        ], () =>{
                          setTimeout(()=> {
                              activate();
                          }, 500);
                                
                       });
        const config = {
            childList: true,
            subtree: true
        };
        
        urlObserver.observe(bodyList, config);
    });
 */
    /**
     * @desc Observing window re-size
     */
    pollerLite(['body','.product_listing_container .grid_mode li', '.row.facetContainer', '#price_range_input #price_range_go',
    () => {
        return !!window.jQuery;
    },
    () => {
        return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
    },
    () => {
      let runExperiment = false;
      let pageUrl = window.location.pathname;

      if (pageUrl.indexOf(`/fragrance/fragrance-offers`) > -1) {
        pageUrl = '/fragrance/fragrance-offers';
      } else {
        pageUrl = window.location.pathname;
      }

      if (!!expData[`${pageUrl}`]) {
        runExperiment = true;
      }

      return runExperiment;
    },
    ], () => {

        // --- Observe window change
        let windowWidth = document.body.clientWidth;
        let device = '';
        if (windowWidth > 768) {
          device = 'desktop';
        } else {
          device = 'mobile';
        }
        window.addEventListener("resize", function(event) {
          if (document.body.clientWidth > 767 && device == 'mobile') {
            device = 'desktop';
            // --- Window re-size - From MOBILE to DESKTOP
            // -- Remove component and re-run
            document.body.classList.remove('BO132');
            const filterBlock = document.querySelector('.BO132-heroFilters');
            if(filterBlock) {
                filterBlock.remove();
            }
            activate();
          } else if (document.body.clientWidth <= 767 && device == 'desktop') {
            device = 'mobile';
            // --- Window re-size - From DESKTOP to MOBILE
            // -- Remove component and re-run
            document.body.classList.remove('BO132');
            const filterBlock = document.querySelector('.BO132-heroFilters');
            if(filterBlock) {
                filterBlock.remove();
            }
            activate();
          }
        });
    });

    /**
     * @desc Observing device orientation change
     */
    window.addEventListener("orientationchange", function() {
      // -- Remove component and re-run
      document.body.classList.remove('BO132');
      const filterBlock = document.querySelector('.BO132-heroFilters');
      if(filterBlock) {
          filterBlock.remove();
      }
      activate();
    }, false);
    
  }
}
