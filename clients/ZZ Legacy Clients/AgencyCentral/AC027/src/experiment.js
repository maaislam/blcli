import { fullStory, events } from '../../../../lib/utils';


/**
 * {{AC027}} - {{Promote live chat}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'AC027',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      // Finds the 6th agency, insert content under this agency
      const agencyListing = bodyVar.querySelectorAll('#search-results-container .agency-result.row ')[5];
      const promoteLiveChatMarkup = `
      <div class="AC027-Wrap">
        <p class="AC027-Title">3 ways to find the agency for you…</p>
        <section class="landing_wrap AC027-Slider">
          <div class="AC027-Content-Wrap">
            <div class="AC027-Call-Us AC027-Contact-Block">
              <div class="AC027-Header-Wrapper"> 
                <span class="AC027-Header"><span class="AC027-Number">1. </span>Call us</span>
                <img class="AC027-Image" src="//useruploads.visualwebsiteoptimizer.com/useruploads/328729/images/24c2f0af4c1e74bdc93b623a4bd3117d_call_us.png" alt="Call Us">
              </div>
              <div class="AC027-Text-Wrapper">
                <span class="AC027-Text">We offer a free assisted search service on <span class="AC027-Phone-Number AC027-Mobile-Hide">0330 380 0648</span><a href="tel:0330 380 0648" class="AC027-Mobile-Show AC027-Phone-Number AC027-Tel-Link">0330 380 0648</a></span>
              </div>
            </div>

            <div class="AC027-Live-Chat AC027-Contact-Block">
              <div class="AC027-Header-Wrapper">
                <span class="AC027-Header"><span class="AC027-Number">2. </span>Live chat</span>
                <img class="AC027-Image" src="//useruploads.visualwebsiteoptimizer.com/useruploads/328729/images/885dcf517d1f516720dfcf2e640637bf_message.png" alt="Live Chat">
              </div>
              <div class="AC027-Text-Wrapper">
                <span class="AC027-Text">If you don’t want to phone, we have dedicated staff available to help find the perfect agency <span class="AC027-Live-Chat-Sub-text">(look for the icon in the bottom right corner of the screen).</span></span>
              </div>
            </div>

            <div class="AC027-Searching AC027-Contact-Block">
              <div class="AC027-Header-Wrapper">
                <span class="AC027-Header"><span class="AC027-Number">3. </span>Keep searching</span>
                <img class="AC027-Image" src="//useruploads.visualwebsiteoptimizer.com/useruploads/328729/images/5518bab88ca10f6368f7969f26726b83_search.png" alt="Search Icon">
              </div>
              <div class="AC027-Text-Wrapper">
                <span class="AC027-Text">We have over 7,000 agencies on our website so we’re confident you’ll find the right one for you on our website</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      `;
      let AC027SlickParent;
      return {
        bodyVar,
        agencyListing,
        promoteLiveChatMarkup,
        AC027SlickParent,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
        // get slick slider
        const liveChatCarousel = () => {
          Exp.cache.agencyListing.insertAdjacentHTML('afterend', Exp.cache.promoteLiveChatMarkup);
          // Assign Selectors
          Exp.cache.AC027SlickParent = $('.AC027-Wrap > section > .AC027-Content-Wrap');
          Exp.cache.bodyVar.querySelector('.landing_wrap.AC027-Slider').className = 'AC027_landing_wrap AC027_Content_Carousel';
          Exp.cache.AC027SlickParent.addClass('AC027_landing_slider');
          Exp.cache.AC027SlickParent.removeClass('landing_slider');
          // Configure Slick
          Exp.cache.AC027SlickParent.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            dots: false,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                  infinite: true,
                },
              },
            ],
          });
          // Elements ready, build tracking
          this.eventTracking();
        };
        if ($.fn.slick) {
          liveChatCarousel();
        } else {
          $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', liveChatCarousel);
        }
      },
      eventTracking() {
        // Mobile Telephone Link
        Exp.cache.bodyVar.querySelector('.AC027-Tel-Link').addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Mobile Telephone Number', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
