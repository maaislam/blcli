import { fullStory, events, scrollTo } from '../../../../lib/utils';
import { allVideos } from './lib/TG060-videos';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TG060',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);
    if (settings.VARIATION === '2') {
      components.moveFeatures();
    }

    components.moveNavigation();
    components.topImageSection();
    pollerLite(['.addition-info figcaption'], () => {
      components.bottomButtons();
    });

    components.playTheVideo();
    components.removeTheVideo();

    components.pageAnchor();
    components.videoEnded();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc rearrange the current navigation
     */
    moveNavigation: () => {
      const navigation = document.querySelector('.top-menu');
      const logo = document.querySelector('.no-std-link.logo.navbar-brand');
      logo.insertAdjacentElement('afterend', navigation);
    },
    /**
     * @desc Create the new top image container
     */
    topImageSection: () => {
      const topContainer = document.querySelector('.content-container.container-fluid');
      const topImage = document.createElement('div');
      topImage.classList.add('TG060-topImage');
      topContainer.insertAdjacentElement('beforebegin', topImage);

      const topImageHtml = [
        `<div class="TG060-image"></div>
        <div class="TG060-video"></div>
        <div class="TG060-lines"></div>
        <div class="TG060-textContent">
          <h1>THE START OF <span> A BETTER YOU</span></h1>
          <div class="TG060-buttons">
            <div class="TG060-button TG060-play_video">Play video</div>
            <div class="TG060-button TG060-learn_more">Learn more</div>
          </div>
        </div>
        <div class="TG060-bottomCTAs">
          <div class="TG060-bottomCTA"><a href="#" target="_blank">Download Catalogue</a></div>
          <div class="TG060-bottomCTA">Buy <span></span></div>
        </div>
        <div class="TG060-bottomArrow"></div>`,
      ].join();

      topImage.innerHTML = topImageHtml;

      if (window.location.pathname === '/gb/treadmill-myrun.html') {
        document.querySelector('.TG060-image').classList.add('TG060-myrun');
      } else {
        document.querySelector('.TG060-image').classList.remove('TG060-myrun');
      }
    },
    /**
     * @desc Create the video container which is shown when play video is clicked
     */
    createVideo: () => {
      // create the video
      const productVideo = document.createElement('video');
      productVideo.id = 'TG060-videoPlayer';
      productVideo.setAttribute('type', 'video/mp4');

      // add the video link
      const productName = document.querySelector('.product-name h1').textContent;
      for (let i = 0; i < Object.keys(allVideos).length; i += 1) {
        const data = Object.entries(allVideos)[i];
        const category = data[1];
        if (data[0] === productName) {
          productVideo.setAttribute('src', category);
        }
      }

      // add video the page
      document.querySelector('.TG060-video').appendChild(productVideo);
    },

    /**
     * @desc Append and play the video
     */
    playTheVideo: () => {
      const { components } = Experiment;
      const tileText = document.querySelector('.TG060-textContent');
      // what to do when video is played
      const playVideo = function playTheVideo() {
        tileText.classList.add('TG060-hide_text');
      };

      document.querySelector('.TG060-play_video').addEventListener('click', () => {
        components.createVideo();
        pollerLite(['.TG060-video video', '.TG060-bottomCTAs'], () => {
          const video = document.querySelector('.TG060-video video');
          // const bottomRightButtons =
          // document.querySelector('.TG060-bottomCTAs');
          video.play();
          playVideo();

          // bottomRightButtons.classList.add('TG060-buttons_hide');
        });
      });
    },

    /**
     * @desc Remove the video on the arrow click
     */
    removeTheVideo: () => {
      pollerLite(['.TG060-bottomArrow', '#TG060-videoPlayer'], () => {
        const arrow = document.querySelector('.TG060-bottomArrow');
        arrow.addEventListener('click', () => {
          document.querySelector('.TG060-textContent').classList.remove('TG060-hide_text');
          document.querySelector('#TG060-videoPlayer').remove();
        });
      });
    },
    /**
     * @desc create the bottom right buttons
     */
    bottomButtons: () => {
      const productName = document.querySelector('.product-name h1').textContent;
      document.querySelector('.TG060-bottomCTA span').textContent = productName;

      // Change the download button
      const downloadForm = document.querySelector('.addition-info figcaption a').getAttribute('href');
      const downloadButton = document.querySelector('.TG060-bottomCTA:first-child a');
      downloadButton.setAttribute('href', downloadForm);
    },
    /**
     * @desc Anchor the page on button clicks
     */
    pageAnchor: () => {
      const $ = window.jQuery;
      pollerLite(['.TG060-bottomArrow', '.TG060-learn_more'], () => {
        const arrow = document.querySelector('.TG060-bottomArrow');
        // const bottomRightButtons = document.querySelector('.TG060-bottomCTAs');

        // product shop function
        const productShopScroll = () => {
          const mainPageOffset = $('.product-shop').offset().top;
          pollerLite([mainPageOffset], () => {
            $('html, body').animate({
              scrollTop: mainPageOffset,
            }, 500);
            // bottomRightButtons.classList.remove('TG060-buttons_hide');
          });
        };

        // arrow click
        arrow.addEventListener('click', () => {
          if (window.location.href.indexOf('mycycling.html') > -1) {
            productShopScroll();
          } else {
            pollerLite(['.feature-secondary-container'], () => {
              productShopScroll();
            });
          }
        });

        // learn more
        document.querySelector('.TG060-learn_more').addEventListener('click', () => {
          if (window.location.href.indexOf('mycycling.html') > -1) {
            productShopScroll();
          } else {
            pollerLite(['.feature-secondary-container'], () => {
              productShopScroll();
            });
          }
        });
        // buy product
        document.querySelector('.TG060-bottomCTA:last-child').addEventListener('click', () => {
          productShopScroll();
        });
      });
    },
    /**
     * @desc Check when the video ends and anchor the page
     */
    videoEnded: () => {
      pollerLite(['#TG060-videoPlayer'], () => {
        const mainPage = document.querySelector('.product-shop').getBoundingClientRect().y + window.scrollY;
        document.querySelector('#TG060-videoPlayer').addEventListener('ended', () => {
          scrollTo(mainPage);
          // const bottomRightButtons = document.querySelector('.TG060-bottomCTAs');
          // bottomRightButtons.classList.remove('TG060-buttons_hide');
          document.querySelector('.TG060-textContent').classList.remove('TG060-hide_text');
          document.querySelector('#TG060-videoPlayer').remove();
        });
      });
    },
    moveFeatures: () => {
      const addToCartForm = document.querySelector('#product_addtocart_form');
      let features;
      if (window.location.href.indexOf('mycycling.html') > -1) {
        /* eslint-disable */
        features = document.querySelectorAll('.wrapper_container')[24];
        features.insertAdjacentElement('beforebegin', document.querySelector('#product-info'));
       
      } else {
        pollerLite(['.feature-secondary-container'], () => {
          features = document.querySelector('.feature-secondary-container');
          addToCartForm.insertAdjacentElement('beforebegin', features);
       });
      }
    },
  },
};

export default Experiment;
