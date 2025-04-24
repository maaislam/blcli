import { cacheDom } from '../../../../lib/cache-dom';
import { fullStory } from '../../../../lib/utils';

/**
 * {{HD006}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'HD006',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings } = Experiment;
    const { services } = Experiment;
    // const { components } = Experiment; 
    services.tracking();
    cacheDom.get('body').classList.add(settings.ID);

    // Store and move contact information
    const cacheElements = (() => {
      const call = cacheDom.get('.account-nav p.number');
      const times = cacheDom.get('.account-nav p:nth-of-type(2)');
      const topNav = cacheDom.get('.account-nav > ul');

      return {call, times, topNav}
    })();

    // Append elements
    const appendElm = (() => {
      const ref = cacheDom.get('.page-header-container > .logo');

      let call, times, topNav = null;
      if (cacheElements.call) {
        call = cacheElements.call.outerHTML;
      } else {
        call = '';
      }
      if (cacheElements.times) {
        times = cacheElements.times.outerHTML;
      } else {
        times = '';
      }
      if (cacheElements.topNav) {
        topNav = cacheElements.topNav.outerHTML;
      } else {
        topNav = '';
      }

      const topRightDiv = `
        <div class="hd06-topright">
          ${call}
          ${times}
          ${topNav}
        </div>
      `;

      ref.insertAdjacentHTML('beforeend', topRightDiv);
    })();

    // Toggle countries list
    const countries = (() => {
      const countryToggle = document.querySelector('.logo .hd06-topright > ul > li.currency-switcher a.currency-switcher__trigger');
      const countryList = document.querySelector('.logo .hd06-topright > ul > li.currency-switcher > div > ul');
      countryToggle.addEventListener('click', function(e) {
        e.preventDefault();
        countryList.classList.toggle('hd06-show');
      });
    })();

    
    // USP Banner
    const uspBanner = (() => {
      const bannerHTML = `
        <div class="hd06-uspBanner">
          <div class="cycle-slideshow">
            <p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJRSURBVEiJndW9S1dhFAfwz1UQfy69SdBaiEhvhBm0GlK4VrQ1if4DuQQNCU2tNbQ6ahRBTtJvcQgSHbQXKoQGQSoaWspKfBruuXn9ddVbDxy455zv+Z7znPM8z5VSUkfQj3ch/bXjapIfxRpSyBqO/ncCZGjgSFS+UiIvZCV8RwKbVXFlQfhnZVl2BZMRVKyveI750AdwHvtKmO+4nlJ6uI2wovqllkoncQA9uBbSE7bJFuzSni3C01LAOA7jUUWLHoVvvGR7WifB3QDPoQtvKsgLeROYudDv1kkwFuBBTOxCXshEYBPG6iSYxWYMcLGC8Cdu4Hboi4HdxOyuCTAaQavyo/oj9AUM4xXO4jhehu9HYFdDH61MgD58C9BG9PZ16N/Qi7YoosClwHRFTIHtK3jbbK1eW2e/HafQDL2BJ/IT9sD2O9IMbHsJ2/vHW9pBQ36RisqmcND2J6JV1gIzVbLNo7HbkC/jQ4Cv4mTMoJV8IXxXQ/+Ay3XfogaWY4A30YmLuBVyMWw3A7Ncrros5RmU2/Yd0+jAnaj2kvyBW4nvhfB1YDpiKsl22sWZXXrfKmf++X8gP5Jvg+AXHsvvwnB8/wrfW7TtxPPXc12sLMuG5CdiCC9wCJ/CfRhfcE5+8wdSSrOVPFUJsiwbxLMIXpY/z8dwIiAvYxbv5SdpCBdSSs2/yHZoz0xFn0dK/pEK/0ytGcifjE1bVz/hIzpLmM6wFf6NiOlr5as6pp9xGvtxL2z3U0rrpV2v436o9wJ7OmL3blHLjprorrB3o7lX/G9BXxg1IBkLGQAAAABJRU5ErkJggg=="> No quibble, 30 day money back guarantee</p>
            <p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAwAAAAMABMHffXgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAITSURBVEiJrdVNiI5RFAfw3+trhslC+W4kpUiymKQUuwmNjYUV5WOhsLSxYWMnG2ShmGIrFqNISmExZkppskDsWPlKFqRhrsV7npkzb+87M95x63bv8z/n/P/nOee591FKkSdW4i4WN9oa/BZNZR/3axJ4FwUPGvBunMcjfMUY3uEWjmPutAI4HOQFhxN+BN+SrdkcwsaWApFhRTKQ8CuJ5DMuRSK7cAp3kv0ndrQSuJBIVgS2OwUPVHiTsvbiffi9zf3JTq/D4Vo8L05BQ61qnOJ7MBr+FycJYE3K9HhgffE8ig2JaEOUaRgn0JVs5yPmY6PAziSwNbAz8TySCDrwqaG5l5N9W8K7SynmqI/uWEfxMvY9sb4wMfZjqcnjUK1W64r9SHCMx8/TenTG2pWw0sSvylgp5RcWZGP1Bh9inY8tsX8Xa2+tVpsb+9v42CBws5Tyo2WaUzT5YMK2pzqvU2/mExzFwhldFXgVZNebNPTqTO6d6QSqT+wrVgd2Nr3FvtkKrMKXILsf2DwMBvYde9oWCMIDKeNjga1NpfqNk20LBGF1ed1L2HoTV0nBudkILFe/47sa8CV4HAJj4sT/s8CUzvVDVH1tT/+7QIj0pVL1Ntg60Y8b2NaWQBANh8AgOhJ+NIlvno3A3kT0TP2X2q/+Ryt4jjltC4TIafxJQtX8hE1t96BJPx7G6X+Dq1iWff4CUo4EH2gDTlUAAAAASUVORK5CYII="> We sell over 1000 hearing aid products</p>
            <p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAMxwAADMcBrInqMQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFjSURBVEiJtda/Sh1BFMfxz1HQwkpMEYtbqI2NVnZ2prIUbLQUrHwBn0H0CQRfIIV1mpAqRVIEAjYqaOEtLCwEQUTunRTZyDLs3j9x98BpZn7z/Z3ZObNMpJS0GROt0tsyiIj5iJhqxSAiDtDFz4iYk1JqLLGHPlKR3xrbQUTs4BRRGu41VfkWXkuVJ/zCbBPwTbxk8At8SCl5L3wDzxn8CvNvmnfA1/GUwW/RyXQCR/iBhRHha3jM4F0sVWidlETX+DgEvoqHDH6P5Rq9m0z8G7M14uUCVtY/YHVAQT5VdMF3zGTCRdxlukesDdxxsXgbvWzxF0wV853iAMvzT1gfel6lCvczQMJnrOAyG3/GxkgNkX2GwwqTPF+wOXI7VxzK8QD4K7bGui8VBoGzCngPu2NfyJrWmsR5Cd7H3rjwWoPCZBpfC4OD/4GnlMS/y1AVETHp74/rrlY0JAYaNBGtvyr+APvwQRR4lpK3AAAAAElFTkSuQmCC"> 4.7 / 5 with over 2,373 reviews on Google</p>
          </div>
        </div>
      `;

      const headerRef = document.querySelector('.wrapper .page .header-wrap');
      headerRef.insertAdjacentHTML('afterend', bannerHTML);

      
    })();

    const trackIt = (() => {
      let navigationElements = document.querySelectorAll('.hd06-topright > ul > li > a');
      for (let i = 0; navigationElements.length > i; i++) {
        navigationElements[i].addEventListener('click', function() {
           _gaq.push(['_trackEvent', 'HD006', 'Click', 'User clicked on a navigation item', null, true]);
        });
      }
    })();

    // USP Banner
    window.jQuery('.hd06-uspBanner .cycle-slideshow').cycle({
      slides: '> p',
    });
  
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {
    
  },
};

export default Experiment;
