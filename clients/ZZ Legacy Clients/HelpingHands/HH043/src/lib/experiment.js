/**
 * HH043 - USP Bar (Iteration of HH005)
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import shared from './shared';
import { events, fullStory, pollerLite } from '../../../../../lib/utils';

export default () => {
  const $ = window.jQuery;

  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: shared.ID,
      VARIATION: shared.VARIATION,
    },

    cache: (() => {
      const pageContainer = document.querySelector('#hero');

      return {
        pageContainer,
      };
    })(),

    init: () => {
      // Default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);

      if (Exp.settings.VARIATION === 'Control') {
        return false;
      }

      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      document.body.classList.add(settings.ID);
      if (settings.VARIATION > 1) document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
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
        // Render USP carousel
        Exp.render.slickSlider();
      },
    },

    render: {
      slickSlider() {
        const USPCarousel = () => {
          Exp.cache.pageContainer.insertAdjacentHTML('beforebegin', `
          <div class="HH005_Wrap">
            <section class="HH005_landing_wrap HH005_Content_Carousel">
              <div class="HH005_Content_Wrap container">
                  <a href="/about-us/why-choose-helping-hands/" class="HH005_USP_Link" data-hh005="USP 1">
                    <svg class="HH005_USP_Image" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                    <title>We invest in our carers: family-run home care that is local to you</title>
                    <path d="M39.16,48.95c-3.587,0-6.505-2.918-6.505-6.505c0-3.587,2.918-6.506,6.505-6.506c3.587,0,6.506,2.919,6.506,6.506  C45.666,46.032,42.747,48.95,39.16,48.95z M39.16,38.939c-1.933,0-3.505,1.573-3.505,3.506c0,1.933,1.572,3.505,3.505,3.505  s3.506-1.572,3.506-3.505C42.666,40.512,41.093,38.939,39.16,38.939z"></path><path d="M60,48.95c-3.587,0-6.505-2.918-6.505-6.505c0-3.587,2.918-6.506,6.505-6.506c3.588,0,6.507,2.919,6.507,6.506  C66.507,46.032,63.588,48.95,60,48.95z M60,38.939c-1.933,0-3.505,1.573-3.505,3.506c0,1.933,1.572,3.505,3.505,3.505  c1.934,0,3.507-1.572,3.507-3.505C63.507,40.512,61.934,38.939,60,38.939z"></path><path d="M39,92.235c-2.804,0-5-2.274-5-5.178V71.063c-2.622-1.461-4-3.965-4-7.299v-4.902c0-4.884,4.038-8.856,9-8.856  s9,3.973,9,8.856v4.902c0,3.074-1.957,5.616-4,7.147v16.146C44,89.961,41.804,92.235,39,92.235z M39,53.006  c-3.252,0-6,2.682-6,5.856v4.902c0,2.506,0.98,4.09,3.086,4.982L37,69.135v17.923c0,1.262,0.841,2.178,2,2.178s2-0.916,2-2.178  V69.305l0.695-0.442C43.22,67.893,45,65.976,45,63.765v-4.902C45,55.688,42.252,53.006,39,53.006z"></path><path d="M72.536,92h-25.1l7.597-20.871C52.515,69.546,51,66.833,51,63.765v-4.902c0-4.884,4.037-8.856,9-8.856s9,3.973,9,8.856  v4.902c0,2.746-1.445,5.347-3.844,7.035L72.536,92z M51.721,89h16.595l-6.813-19.572l1.142-0.602C64.267,67.972,66,66.193,66,63.765  v-4.902c0-3.175-2.748-5.856-6-5.856s-6,2.682-6,5.856v4.902c0,2.332,1.333,4.352,3.479,5.27l1.306,0.558L51.721,89z"></path><path d="M89,83H73c-0.828,0-1.5-0.672-1.5-1.5S72.172,80,73,80h13V27.095l-11-4.63V14h-8v5.098l-17.138-7.214L13,27.103V80h17  c0.829,0,1.5,0.672,1.5,1.5S30.829,83,30,83H10V25.096L49.873,8.634L64,14.581V11h14v9.473l11,4.63V83z"></path></svg>
                    <span class="HH005_USP_Text">We invest in our carers: <em>family-run home care</em> that is local to <br />you</span>
                  </a>
                  <a href="/home-care-services/" class="HH005_USP_Link" data-hh005="USP 2">
                    <svg class="HH005_USP_Image" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
                    <title>Fast-response support: from 30-min visits to 24hr live-in care</title>
                    <g><path d="M80.341,37.902L83.243,35L79,30.757l-3.009,3.009c-3.967-3.039-8.765-5.044-13.991-5.603v-1.979   c1.838-1.065,3-3.027,3-5.184c0-3.309-2.691-6-6-6s-6,2.691-6,6c0,2.157,1.162,4.119,3,5.184v1.979   c-5.226,0.559-10.024,2.564-13.991,5.603L39,30.757L34.757,35l2.902,2.902C33.511,42.787,31,49.104,31,56c0,15.439,12.561,28,28,28   s28-12.561,28-28C87,49.104,84.489,42.787,80.341,37.902z M79,33.585L80.415,35L79,36.415L77.585,35L79,33.585z M55,21   c0-2.206,1.794-4,4-4s4,1.794,4,4c0,0.994-0.368,1.929-1,2.647V22h-6v1.646C55.368,22.929,55,21.994,55,21z M58,28v-4h2v4H58z    M39,33.585L40.415,35L39,36.415L37.585,35L39,33.585z M59,82c-14.336,0-26-11.664-26-26s11.664-26,26-26s26,11.664,26,26   S73.336,82,59,82z"></path><path d="M59,32c-13.233,0-24,10.767-24,24c0,13.233,10.767,24,24,24c13.233,0,24-10.767,24-24C83,42.767,72.233,32,59,32z M59,78   c-12.131,0-22-9.869-22-22s9.869-22,22-22s22,9.869,22,22S71.131,78,59,78z"></path><path d="M59,52c-2.206,0-4,1.794-4,4c0,1.046,0.412,1.991,1.072,2.705L49.159,69.46l1.682,1.081l6.916-10.759   C58.15,59.912,58.563,60,59,60c2.206,0,4-1.794,4-4S61.206,52,59,52z M59,58c-1.103,0-2-0.897-2-2s0.897-2,2-2s2,0.897,2,2   S60.103,58,59,58z"></path><polygon points="60,46 58,46 58,52 59,52 60,52  "></polygon><rect x="58" y="36" width="2" height="4"></rect><rect x="75" y="55" width="4" height="2"></rect><rect x="39" y="55" width="4" height="2"></rect><rect x="58" y="72" width="2" height="4"></rect><rect x="17" y="33" width="11" height="2"></rect><rect x="11" y="44" width="7" height="2"></rect><rect x="22" y="44" width="4" height="2"></rect><rect x="15" y="55" width="9" height="2"></rect><rect x="12" y="66" width="14" height="2"></rect><rect x="16" y="77" width="4" height="2"></rect><rect x="24" y="77" width="11" height="2"></rect></g></svg>
                    <span class="HH005_USP_Text"><em>Fast-response</em> support: from 30-min visits to 24hr live-in <br /> care</span>
                  </a>
                  <a href="/about-us/cqc-regulated-service/" class="HH005_USP_Link" data-hh005="USP 3">
                    <svg class="HH005_USP_Image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" x="0px" y="0px"><title>Homecare’s only Centre of Excellence, regulated by CQC & CIW</title><g data-name="10-Wishlist"><path d="M10,48a9.01,9.01,0,0,1-9-9V3A2.916,2.916,0,0,1,4,0H32a2.916,2.916,0,0,1,3,3V18a1,1,0,0,1-2,0V3a.919.919,0,0,0-1.012-1H4A.918.918,0,0,0,3,3.012V39a7,7,0,1,0,7-7,1,1,0,0,1,0-2,9,9,0,0,1,0,18Z"></path><path d="M36,48H10a1,1,0,0,1,0-2H36a7,7,0,0,0,0-14H11a1,1,0,0,1,0-2H36a9,9,0,0,1,0,18Z"></path><path d="M45,27H21a1,1,0,0,1-.447-.105l-4-2a1,1,0,0,1,0-1.79l4-2A1,1,0,0,1,21,21H45a2,2,0,0,1,2,2v2A2,2,0,0,1,45,27ZM21.236,25H45V23H21.236l-2,1Z"></path><path d="M41,27a1,1,0,0,1-1-1V22a1,1,0,0,1,2,0v4A1,1,0,0,1,41,27Z"></path><path d="M12,13H8a2,2,0,0,1-2-2V7A2,2,0,0,1,8,5h4a2,2,0,0,1,2,2v4A2,2,0,0,1,12,13ZM8,7v4h4V7Z"></path><path d="M12,24H8a2,2,0,0,1-2-2V18a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v4A2,2,0,0,1,12,24ZM8,18v4h4V18Z"></path><path d="M19,8H17a1,1,0,0,1,0-2h2a1,1,0,0,1,0,2Z"></path><path d="M25,8H23a1,1,0,0,1,0-2h2a1,1,0,0,1,0,2Z"></path><path d="M19,18H17a1,1,0,0,1,0-2h2a1,1,0,0,1,0,2Z"></path><path d="M25,18H23a1,1,0,0,1,0-2h2a1,1,0,0,1,0,2Z"></path><path d="M29,12H17a1,1,0,0,1,0-2H29a1,1,0,0,1,0,2Z"></path></g></svg>
                    <span class="HH005_USP_Text">Homecare’s only Centre of Excellence, <em>regulated by CQC & CIW</em></span>
                  </a>
              </div>
            </section>
          </div>
        `);

          pollerLite(['.HH041-hero'], () => {
            // HH041 is running so move USP bar
            $('#hero').prev('.HH005_Wrap').insertBefore('.HH041-hero');
          });

          // Configure Slick
          $('.HH005_Wrap > section > .HH005_Content_Wrap').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            dots: false,
            responsive: [
              {
                breakpoint: 992, // Next settings are for mobile/tablet
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                  infinite: true,
                  autoplaySpeed: 4000,
                },
              },
            ],
          });
          // Slider ready, add tracking
          Exp.bindExperimentEvents.trackUSP();
        };
        // Initialise Slick slider
        if ($.fn.slick) {
          USPCarousel();
        } else {
          $.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
            USPCarousel();
          });
        }
      },
    },

    bindExperimentEvents: {
      USPTrackingCode(e) {
        let HH005USP = e.target;
        // Check if link's elements are clicked
        if (HH005USP.classList.contains('HH005_USP_Text') || HH005USP.classList.contains('HH005_USP_Image')) {
          HH005USP = HH005USP.parentNode.getAttribute('data-hh005');
        } else {
          HH005USP = HH005USP.getAttribute('data-hh005');
        }
        if (HH005USP) {
        // Send Event
          events.send(`${Exp.settings.ID}`, 'Clicked', `${HH005USP}`, { sendOnce: true });
        }
      },
      trackUSP() {
        const USPS = document.querySelectorAll('.HH005_USP_Link');
        for (let i = 0, n = USPS.length; i < n; i += 1) {
          USPS[i].addEventListener('click', Exp.bindExperimentEvents.USPTrackingCode);
        }
      },
    },
  };

  Exp.init();
};
