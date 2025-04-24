import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'HD020',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.moveText();
    components.addUsps();
    events.useLegacyTracker();

    /* eslint-disable */
    poller([
      () => {
        return !!window.jQuery;
      }
    ], () => {
     components.addLiveChat();
    });
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
     * @desc Move text from the bottom of the page to the top
     */
    moveText: function moveText() {
      const newTopText = document.createElement('div');
      newTopText.classList.add('HD020-top_text');
      document.querySelector('.product-info__name').insertAdjacentElement('afterend', newTopText);

      const allDesc = document.querySelector('.category-description.std');

      const topDesc = allDesc.cloneNode(true);

      [].forEach.call(topDesc.children, (element) => {
        if (element.nodeName.toLowerCase() !== 'p') {
          element.remove();
        }
      });
      const strippedText = topDesc.textContent.trim().substring(0, 350);

      newTopText.innerHTML = `<p>${strippedText}...<span class="HD020-readMore">Read More</span></p>`;
    },
    /**
     * @desc Add the top USP
     */
    addUsps: function addUsps() {
      const title = document.querySelector('.product-info__name').textContent;

      let usps;

      if (window.location.href.indexOf('/us/') > -1) {
        usps = {
          HearingAids: ['<span class="HD020-sold"></span><p>Since selling our first hearing aid in 2010, we have delivered over 28,000 of them all over the world.</p>', '<span class="HD020-rating"></span><p>Those who’ve used us, seem to like us! 4.6 ***** 92% Positive (2,256 reviews)</p>'],
          PhonesOtherAll: ['<span class="HD020-rating"></span><p>Those who’ve used us, seem to like us! 4.6 ***** 92% Positive (2,256 reviews)</p>'],
          Batteries: ['<span class="HD020-sold"></span><p>We’ve sold over 50,000,000 Hearing Aid Batteries since 2010</p>', '<span class="HD020-batteries"></span><p>A pack of 60 of our hearing aid batteries last, on average, between 10  and 12 months. Our shelf life on batteries is normally 3 years minimum</p>'],
        };
      } else {
        usps = {
          HearingAids: ['<span class="HD020-sold"></span><p>Since selling our first hearing aid in 2010, we have delivered over 28,000 of them all over the world.</p>', '<span class="HD020-rating"></span><p>Those who’ve used us, seem to like us! 4.6 ***** 92% Positive (2,256 reviews)</p>', '<span class="HD020-moneyBack"></span><p>30 Day Money Back Guarantee - all returns are free</p>'],
          PhonesOtherAll: ['<span class="HD020-rating"></span><p>Those who’ve used us, seem to like us! 4.6 ***** 92% Positive (2,256 reviews)</p>', '<span class="HD020-moneyBack"></span><p>30 Day Money Back Guarantee - all returns are free</p>'],
          Batteries: ['<span class="HD020-sold"></span><p>We’ve sold over 50,000,000 Hearing Aid Batteries since 2010</p>', '<span class="HD020-batteries"></span><p>A pack of 60 of our hearing aid batteries last, on average, between 10  and 12 months. Our shelf life on batteries is normally 3 years minimum</p>'],
        };
      }

      let categoryUSPs;

      switch (true) {
        case (title.indexOf('Hearing Aid') > -1):
          categoryUSPs = usps.HearingAids;
          break;
        case (title.indexOf('Phone') > -1):
          categoryUSPs = usps.PhonesOtherAll;
          break;
        case (title.indexOf('Batteries') > -1):
          categoryUSPs = usps.Batteries;
          break;
        default:
          categoryUSPs = usps.PhonesOtherAll;
          break;
      }
      // loop through all the items to add the class

      const allProducts = document.querySelectorAll('.products-grid .item');
      for (let i = 0; i < allProducts.length; i += 1) {
        const product = allProducts[i];
        if (i % 4 === 0) { // if the product is the fourth one
          if (categoryUSPs.length === 0) {
            break; // if no usps left, break out
          }
          const element = categoryUSPs[0]; // always get the first one in the array
          const newUsp = document.createElement('div'); // create the new usp
          newUsp.classList.add('HD020-usp');
          newUsp.innerHTML = `${element}`;
          categoryUSPs.shift(); // Get rid of the first element in the array as we've used it up
          product.insertAdjacentElement('beforebegin', newUsp);
        }
      }
    },
    /**
     * @desc Add the live chat from HD012
     */
    addLiveChat: function addLiveChat() {
      /* eslint-disable */

        if(jQuery('.customTopText').length === 0){
          jQuery('.HD020-readMore').click(function () {
              jQuery('html, body').animate({
                  scrollTop: jQuery(".category-description.std").offset().top
              }, 2000);
          });
        }
    
        jQuery('#Uad6KrI-1531489630418').css({'display':'none'});
        //for US
        jQuery('#tawkchat-container > iframe:nth-child(1)').wrap('<div class="tawkChatDisplayNone"></div>');
        jQuery('section.user-nav').before('<div class="custom-help-bottom-sticky"> <div class="need-help-cta"><a class="Need-advice"> Need advice? </a></div> <div class="stickybar"> <img src="//cdn-3.convertexperiments.com/uf/1002628/10021290/1528269653Untitled-2.jpg"> <span>Chat to us now on our 24hr live chat support or call us on <b>1-800-216-2331</b> (Monday to Friday 9 until 5)</span> <div class="chatIconClick"><img src="//useruploads.visualwebsiteoptimizer.com/useruploads/332107/images/b8945282bc8a48a9ea03bb9a08a90df2_untitled-3.png"></div></div> </div>');
      // for UK
        jQuery('.chatIconClick').click(function () {
          if(typeof Tawk_API == "object"){
              Tawk_API.maximize();
          }
      });
      if(window.location.href.indexOf('/us/') > -1){
        jQuery('.stickybar b').text('1-800-216-2331');
      } else {
        jQuery('.stickybar b').text('0800 032 1301');
      }

    }
  },
};

export default Experiment;
