import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ032',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    if (window.innerWidth > 767) {
      components.headerChanges();
      components.noStore();
      /* eslint-disable */ 
      window.prm.add_pageLoaded(function (sender, error) {
        try {
          components.noStore();
        } catch (e) {
        } 
      });
      /* eslint-enable */
    }
    if (window.location.pathname.indexOf('/paparewards/') > -1) {
      pollerLite([
        '.prPromoTopBanner.prNewPage',
        '.prIconsContainer',
        '.memberPRTitle',
      ], () => {
        components.loginRegisterButtons();
        components.nowMoreRewardingSection();
        components.loginRegister();
        components.productPoints();
        components.rewardsCarousel();
        /* eslint-disable */ 
        window.prm.add_pageLoaded(function (sender, error) {
          try {
            components.rewardsCarousel();
          } catch (e) {
          } 
        });
      });
    }
    /* eslint-enable */
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
     * @desc Show the pizza slice if there are no points
     */
    headerChanges: () => {
      const pointsDiv = document.querySelector('#ctl00__objHeader_hypMenuPapaRewards .prPoints');
      if (pointsDiv) {
        const rewardsPointsAccount = parseFloat(pointsDiv.textContent);
        if (rewardsPointsAccount === 0) {
          pointsDiv.classList.add('PJ032-no_points');
        } else {
          pointsDiv.classList.add('PJ032-no_points');
        }
      }
    },
    /**
     * @desc when a store has not been chosen move the papa rewards to the right
     */
    noStore: () => {
      const noStoreChosen = document.querySelector('#ctl00__objHeader_pnlStoreMenuNoStore');
      const pointsLink = document.querySelector('#ctl00__objHeader_hypGenericPapaRewards');
      if (noStoreChosen && pointsLink) {
        pointsLink.classList.add('PJ032-noStore');
      }
    },
    /**
     * @desc Functionality of the register/login buttons
     */
    loginRegisterButtons: () => {
      const newButtons = document.createElement('div');
      newButtons.classList.add('PJ032-buttons');
      newButtons.innerHTML = '<a href="/register.aspx" class="PJ032-register"><span>Register Now</span></a><div class="PJ032-login"><span>Log in</span></div>';

      const banner = document.getElementById('ctl00_cphBody_pnlNotLoggedTop');
      // if screen is mobile inster below header
      // if screen is desktop put inside header
      if (window.innerWidth > 767) {
        document.querySelector('.prPromoTopBanner.prNewPage').appendChild(newButtons);
      } else {
        banner.insertAdjacentElement('afterend', newButtons);
      }
    },
    nowMoreRewardingSection: () => {
      const points = ['For every £4 you spend you\'ll earn 1 point', '25 points gives you a Free Large Pizza', 'Points can able be used for sides, drinks and desserts'];
      const rewardContent = document.createElement('div');
      rewardContent.classList.add('PJ032-benefits');
      rewardContent.innerHTML = '<div class="PJ032-benefits_content"><div class="PJ032-points"></div><span class="PJ032-smallPrint">Points are valid for 3 months from the date of your last order - Non cash orders only</span></div>';

      document.querySelector('.prIconsContainer').insertAdjacentElement('afterend', rewardContent);

      [].forEach.call(points, (element) => {
        const bulletPoint = document.createElement('span');
        bulletPoint.innerHTML = element;
        document.querySelector('.PJ032-points').appendChild(bulletPoint);
      });

      const buttons = document.querySelector('.PJ032-buttons').cloneNode(true);
      document.querySelector('.PJ032-benefits_content').appendChild(buttons);
    },
    /**
    * @desc get the points and add to the product images
    */
    productPoints: () => {
      // change title
      const rewardsTitle = document.querySelector('.memberPRTitle .pjRed');
      rewardsTitle.textContent = 'What can Reward Points get you?';

      // get the points out of the text and add to item
      const item = document.querySelectorAll('.menuList');
      for (let x = 0; x < item.length; x += 1) {
        const element = item[x];
        const title = element.querySelector('h3');
        const noOfPoints = title.textContent.substr(title.textContent.indexOf('|') + 1);

        const pointsCircle = document.createElement('div');
        pointsCircle.classList.add('PJ032-points');
        pointsCircle.innerHTML = `<span>${noOfPoints}</span>`;
        element.appendChild(pointsCircle);

        const newTitle = title.textContent.replace(/[^|]*$/g, '').replace('|', '');
        title.innerText = newTitle;
      }
    },
    /**
    * @desc Carousel uses tinySlider
    */
    rewardsCarousel: () => {
      const tinySlider = document.createElement('script');
      tinySlider.type = 'text/javascript';
      tinySlider.src = 'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.8.2/min/tiny-slider.js';
      tinySlider.async = true;
      document.getElementsByTagName('head')[0].appendChild(tinySlider);

      /* eslint-disable */
      pollerLite([
        () => {
          return window.tns;
        },
      ], () => {
        const slider = tns({
          container: '.menuItems',
          items: 1.5,
          mouseDrag: true,
          nav: true,
          disable: false,
          responsive: {
            600: {
              disable: true,
            }
          }
        });
      });
      /* eslint-enable */
    },
    /**
     * @desc When the login/register buttons are clicked, click login/register link
     */
    loginRegister: () => {
      const buttons = document.querySelectorAll('.PJ032-buttons .PJ032-login');
      for (let index = 0; index < buttons.length; index += 1) {
        const element = buttons[index];
        element.addEventListener('click', () => {
          if (window.innerWidth > 767) {
            document.getElementById('ctl00__objHeader_lbLoginRegisterItem').click();
          } else {
            document.getElementById('ctl00__objHeader_lbMobileAsideProfile').click();
          }
        });
      }
    },
  },
};

export default Experiment;
