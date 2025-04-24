/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { getPageName, setup } from './services';
import StickyCartHeader from './StickyCartHeader/StickyCartHeader';
import PDPCtas from './PDPCtas/PDPCtas';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import { throttle } from '../../../../../lib/uc-lib';

export default () => {
  setup();
  const { ID, VARIATION } = shared;
  const $window = $(window);

  const pageContent = {
    skinSoSoft: {
      parallax1: {
        bgImage: 'https://service.maxymiser.net/cm/images-eu/avon-mas/20E318C94FE5125D499A3192D4922F08701CB42A3D6EC45BF9491C4000054FBE.png?meta=/AV055---Avon-Hero-PDP/skinsosoft_parallax1_bg.png',
        title: 'Bestselling Dry Oil Spray',
        text: 'Our gorgeously scented original, quick-drying dry oil spray has been a firm favourite since the 1960s.',
      },
      textImage1: {
        bgColor: 'DFECF8',
        image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/150C554EFA6411A620E9B6EAAF7138E09E04EF31B29DAC99577B7E3CCBD9303A.png?meta=/AV055---Avon-Hero-PDP/skinsosoft_image1.png',
        title: 'Silky-Soft Skin',
        text: 'Infused with jojoba oil and vitamin E to lock-in moisture, so you’re left with skin that feels deeply hydrated'
      },
      textImage2: {
        bgColor: 'F0F8FF',
        image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/ABBF3C552855C1CCD8BD884657D4607DB9042593A5A25E62B88B172417228725.png?meta=/AV055---Avon-Hero-PDP/skinsosoft_image2.png',
        title: 'Quick Dry',
        text: 'In a rush? No problem. Our quick-dry formula leaves your skin super-soft, touch-dry and never greasy'
      },
      parallax2: {
        bgImage: 'https://service.maxymiser.net/cm/images-eu/avon-mas/558973E55CE78230591D1C3BD7BDE45B65B0B970D3538403848D4232F55A20FA.png?meta=/AV055---Avon-Hero-PDP/skinsosoft_parallax2_bg.png',
        title: '“Best Moisture Spray”',
        text: "The Skin So Soft Original Dry Oil Spray is the best I have used […] I haven't felt my skin feel this moisturised in ages.” - Shopwithemma23"
      },
      textImage3: {
        bgColor: 'DFECF8',
        image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/248B558456F67822E4906BA44AA3CF6D51D37DB50F0C206E110A4B6B550F2F79.png?meta=/AV055---Avon-Hero-PDP/skinsosoft_image3.png',
        title: 'Your Everyday Essential',
        text: 'For your best skin, every day, simply spritz the dry oil spray straight out of the shower to help lock-in extra moisture',
      },
    },
    foundation: {
      parallax1: {
        bgImage: 'https://service.maxymiser.net/cm/images-eu/avon-mas/5FED7E5251FA4C4827F36C2E2DF8C3B0A913C79CF48B54FCA6C759BFD2A0E97B.png?meta=/AV055---Avon-Hero-PDP/foundation_parallax1_bg.png',
        title: 'Enhance Your Natural Beauty',
        text: 'Zero caking, breathable coverage and dermatologist-tested, our Flawless Foundation is all about enhancing your natural beauty - not covering it up.',
      },
      textImage1: {
        bgColor: 'F2DBCA',
        image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/ED8D67FE0A24A9A99A8D75A82467285D4F5F8CEB1FDEF47AA431CF8A738B5C60.png?meta=/AV055---Avon-Hero-PDP/foundation_image1.png',
        title: 'Find Your Perfect Match',
        text: 'Powered by Blue Colour IQ Technology, choose from 17 lightweight shades that blend beautifully for a natural finish.'
      },
      textImage2: {
        bgColor: 'FFEFE3',
        image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/141F9B62CD21ABBFC5BB847145920BE94014AADF7BF9645FA801B50C13D720C5.png?meta=/AV055---Avon-Hero-PDP/foundation_image2.png',
        title: 'SPF15 Protection',
        text: 'Summer or winter, this SPF15 foundation will help protect your skin from harmful UV rays while you’re out and about. '
      },
      parallax2: {
        bgImage: 'https://service.maxymiser.net/cm/images-eu/avon-mas/3F97494533083FF795D6A9208A1EC7D100A3EF1FF9074C48BB8619255373ED4C.png?meta=/AV055---Avon-Hero-PDP/foundation_parallax2_bg.png',
        title: '“Best Out There!”',
        text: "“I love this - makes me feel like a million dollars...goes on like a dream and stays put. I look flawless and younger.” - Lauraashley"
      },
      textImage3: {
        bgColor: 'FFEFE3',
        image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/2FDA42E45CE7323C476BC95A0748C0BCDF379334D3519B716868415107315B80.png?meta=/AV055---Avon-Hero-PDP/foundation_image3.png',
        title: 'Choose Your Coverage',
        text: 'Our buildable, non-caking formula allows you to dictate the level of coverage you want. From medium  for everyday confidence to full coverage for special occasions.',
      },
    },
    gelShine: {
      parallax1: {
        bgImage: 'https://service.maxymiser.net/cm/images-eu/avon-mas/8679DD0A292674970B9DB6292B349797D245297AB1B75EA19F8A4452CCBB89A9.png?meta=/AV055---Avon-Hero-PDP/nail_parallax1_bg.png',
        title: 'Salon Gel Shine',
        text: 'With high-shine, salon-style gel colour, you can nail your at-home mani with our gel-based formula.',
      },
      textImage1: {
        bgColor: 'FFFFFF',
        image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/6066B6BC173D648449413C9CD2646CEFC02D5103C7FF4DE17248D531984FCA6B.png?meta=/AV055---Avon-Hero-PDP/nail_image1.png',
        title: 'Healthier Nails',
        text: 'Infused with avocado oil and omega oil extracts so your nails look and feel healthier with every coat. '
      },
      textImage2: {
        bgColor: 'F2F2F2',
        image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/171183E5EE882450A0DE27D3783D3D5E150BAF5B79A1293F9FE4D4D6BAAA0F72.png?meta=/AV055---Avon-Hero-PDP/nail_image2.png',
        title: 'No UV Lamp',
        text: 'Proven to strengthen nails by 42%, our Gel Shine delivers a hard, gel-like finish without the hassle of a harmful UV lamp.'
      },
      parallax2: {
        bgImage: 'https://service.maxymiser.net/cm/images-eu/avon-mas/302FF95121EE015F8DEF900E251A020D33A651100A7B7510B06BA0E6E16666C4.png?meta=/AV055---Avon-Hero-PDP/nail_parallax2_bg.png',
        title: '“One of the Best”',
        text: "“It lasts for ages and people always comment on my nails when I’m wearing it.... love it love it love it... thanks Avon 💕” - Rebecca O"
      },
      textImage3: {
        bgColor: 'F2F2F2',
        image: 'https://service.maxymiser.net/cm/images-eu/avon-mas/46A85F685D98692C1E605BC2090CD9B1741DCFB84A592FEA65197C7C1439E9D8.png?meta=/AV055---Avon-Hero-PDP/nail_image3.png',
        title: 'Easy To Remove',
        text: 'Unlike salon gels, our Gel Shine polishes are super-easy to remove and won’t damage or stain your nails.',
      },
    },
  };


  const stickyNav = () => {
    if ($(`.${ID}_StickyCartHeader`).length) return;
    new StickyCartHeader();
    new PDPCtas();
  };


  // Replace the return value once uploaded to Maximyser @TODO
  const makeImagePath = (imageName) => {
    // return `https://service.maxymiser.net/cm/images-eu/avon-mas/2FDA42E45CE7323C476BC95A0748C0BCDF379334D3519B716868415107315B80.png?meta=/AV055---Avon-Hero-PDP/${ID}-${imageName}`;
    //return `https://ab-test-sandbox.userconversion.com/experiments/${ID}-${imageName}`;
    //return '#'+ ''.concat('$') + '(ContentManager:' + `${imageName})!`;
    return imageName;
  }

  const starsImage = (type) => {
    if (type === 'light') return 'https://service.maxymiser.net/cm/images-eu/avon-mas/57F1838471EDC7EF2B524DF888D2DB39B53D73613EE9F6B777E1EDDF60556D4E.svg?meta=/AV055---Avon-Hero-PDP/stars.svg';
    return 'https://service.maxymiser.net/cm/images-eu/avon-mas/5468356A056185981FBED25A9A72DC441E3203BCFD7F8A610BB7F39640D41099.svg?meta=/AV055---Avon-Hero-PDP/stars_dark.svg';
  };

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {

    // Match page.
    const thisPage = getPageName();
    if (!thisPage) return;
    const content = pageContent[thisPage];

    // Inject new panels wrapper after product details panel.
    // let $topPanel = $('.ProductDetail').find('.TopPanel.ng-scope');
    // if ($topPanel.length === 0) $topPanel = $('.AddToCart');
    // if ($topPanel.length === 0) return; // Nowhere to add the panels.

    // Prevent duplicates.
    if ($(`.${ID}_wrapper`).length) return;

    $('.ProductDescription').before(`
      <div class="${ID}_wrapper ${ID}_${thisPage}">
        <div class="${ID}_parallaxWrapper" id="${ID}_parallaxWrapper1" style="background-image: url('${makeImagePath(content.parallax1.bgImage)}')">
          <div class="${ID}_parallaxContent">
            <h2>${content.parallax1.title}</h2>
            <p>${content.parallax1.text}</p>
          </div>
        </div>
        <div class="${ID}_textImageWrapper" style="background-color: #${content.textImage1.bgColor}">
          <div class="${ID}_content">
            <div class="${ID}_imageWrapper">
              <img class="${ID}_slide" src="${makeImagePath(content.textImage1.image)}" />
            </div>
            <div class="${ID}_textWrapper">
              <h3>${content.textImage1.title}</h3>
              <p>${content.textImage1.text}</p>
            </div>
          </div>
        </div>
        <div class="${ID}_textImageWrapper" style="background-color: #${content.textImage2.bgColor}">
          <div class="${ID}_content">
            <div class="${ID}_textWrapper ${ID}_textRight">
              <h3>${content.textImage2.title}</h3>
              <p>${content.textImage2.text}</p>
            </div>
            <div class="${ID}_imageWrapper">
              <img class="${ID}_slide ${ID}_slide_right" src="${makeImagePath(content.textImage2.image)}" />
            </div>
          </div>
        </div>
        <div class="${ID}_parallaxWrapper ${ID}_parallaxWrapperBottom" style="background-image: url('${makeImagePath(content.parallax2.bgImage)}')">
            <h2>${content.parallax2.title}</h2>
            <p>${content.parallax2.text}</p>
            <div class="${ID}_starsWrapper">
              <img src="${(thisPage === 'gelShine' ? starsImage('dark') : starsImage('light'))}" />
            </div>
        </div>
        <div class="${ID}_textImageWrapper" style="background-color: #${content.textImage3.bgColor}">
          <div class="${ID}_content">
            <div class="${ID}_imageWrapper">
              <img class="${ID}_slide" src="${makeImagePath(content.textImage3.image)}" />
            </div>
            <div class="${ID}_textWrapper">
              <h3>${content.textImage3.title}</h3>
              <p>${content.textImage3.text}</p>
            </div>
          </div>
        </div>
      </div>`
    );

    // Create a sticky nav which shows on scroll.
    stickyNav();

    let loggedParallaxView = false;

    // First time parallax panel 1 is seen, fire an event.
    $window.scroll(() => {
      const wrapper = $(`#${ID}_parallaxWrapper1`);
      if (!loggedParallaxView && wrapper.length) {
        const topOfElement = wrapper.offset().top;
        const bottomOfElement = wrapper.offset().top + wrapper.outerHeight();
        const bottomOfScreen = $window.scrollTop() + $window.innerHeight();
        const topOfScreen = $window.scrollTop();

        if ((bottomOfScreen > topOfElement) && (topOfScreen < bottomOfElement)) {
          loggedParallaxView = true;
          events.send(`${ID}-${VARIATION}`, 'first-parallax-seen');
        }
      }
    });

    // Slide in image on scroll into view.
    const $animationElements = $(`.${ID}_slide`);
    const checkInView = () => {
      const windowHeight = $window.height();
      const windowTopPos = $window.scrollTop();
      const windowBotPos = (windowTopPos + windowHeight);

      $.each($animationElements, function () {
        const $element = $(this);
        const elementHeight = $element.outerHeight();
        const elementTopPos = $element.offset().top;
        const elementBotPos = (elementTopPos + elementHeight);
        if ((elementBotPos >= windowTopPos) && (elementTopPos <= windowBotPos)) $element.addClass(`${ID}_hasSlid`);
      });
    };
    $window.on('scroll resize', checkInView);
  };

  /*
    Re-run this when browser is resized to simulate layout change check.
  */
  const throttledInit = throttle(init, 1500);
  $window.resize(throttledInit);

  init();
};
