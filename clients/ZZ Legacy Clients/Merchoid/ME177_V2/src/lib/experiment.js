import { setup } from './services';
import { viewabilityTracker } from '../../../../../lib/utils';

/**
 * {{ME177}} - {{Product Imagery Messaging V2}}
 */

const Run = () => {
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      // Hide carousel on load
      bodyVar.classList.add('ME177_Active');
      const productGallery = bodyVar.querySelector('.product-gallery');
      const brandingLogo = bodyVar.querySelector('.product-image-assoc-brand');
      let messageArray;
      // Reassigned in services
      let retrievedData;
      // Reassigned when rendering slideshow
      let ME177Img;
      let ME177BGImg;
      let ME177Container;
      let ME177Message;
      // Reassigned in bindExperimentEvents
      // eslint-disable-next-line
      let transitionCounter = 0;
      return {
        docVar,
        bodyVar,
        productGallery,
        retrievedData,
        ME177Img,
        ME177BGImg,
        ME177Container,
        transitionCounter,
        messageArray,
        ME177Message,
        brandingLogo,
      };
    })(),
    init: () => {
      // Determine product page, get relevant data
      Exp.services.getImages();
      viewabilityTracker(Exp.cache.brandingLogo, () => {
        // Hide carousel on load
        Exp.cache.bodyVar.classList.add('ME177_Active');
        setup();
        Exp.render.slideShowContainer();
      });
    },
    services: {
      getImages: () => {
        const pathName = window.location.pathname;
        const pageData = {
          '/product/jurassic-park-knitted-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/jurassicpark.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/Jurassic_Park_Xmas_17.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/Jurassic_Park_Xmas_4.jpeg'], brand: 'Universal' },
          '/product/wonder-woman-winter-wonder-land-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/07/Wonder-Woman-Christmas-Sweater-Jumper.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/10/WWoman_Jumper_ManQ_5.jpg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/10/Wonderwoman_Jumper_model_2.jpg'], brand: 'DC' },
          '/product/star-wars-happy-hoth-idays-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/09/hothfront.jpg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/07/IMG_0452.jpg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/09/Happy_Hoth_Xmas_Jumper_1.jpeg'], brand: 'Disney' },
          '/product/spider-man-knitted-unisex-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/spidermannew.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/Spiderman_Xmas_Jumper_8.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/Spiderman_Xmas_Jumper_16.jpeg'], brand: 'Marvel' },
          '/product/captain-america-knitted-christmas-jumper-sweater/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/capusajumper-.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/CaptainAmerica_Xmas_Jumper_18.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/CaptainAmerica_Xmas_Jumper_27.jpeg'], brand: 'Marvel' },
          '/product/star-wars-x-wing-vs-tie-fighter-unisex-knitted-christmas-sweaterjumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/09/XWingVsTIEFighter.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/09/Starwars_XWing_Xmas_Jumper_2.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/09/Starwars_XWing_Xmas_Jumper_14.jpeg'], brand: 'Disney' },
          '/product/star-wars-the-season-to-be-jolly-it-is-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/SeasonToBeJollyItIs.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/Starwars_Yoda_Jumper_11.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/Starwars_Yoda_Jumper_21.jpeg'], brand: 'Disney' },
          '/product/lion-king-hakuna-holidays-knitted-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/front.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/LionKing_Xmas_Jumper_5.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/LionKing_Xmas_Jumper_4.jpeg'], brand: 'Disney' },
          '/product/rick-and-morty-get-schwifty-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/10/Rick-and-Morty-Get-Schwifty-Christmas-SweaterJumper.jpg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/10/Rick-and-Morty-Get-Schwifty-Christmas-SweaterJumper1.jpg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/10/Rick-and-Morty-Get-Schwifty-Christmas-SweaterJumper.jpg'], brand: 'Rick and Morty' },
          '/product/batman-christmas-jumpersweater/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/09/batman-dark-jumper-V5.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/09/Batman_2018_New_Xmas_1.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/09/Batman_2018_New_Xmas_19.jpeg'], brand: 'DC' },
          '/product/superman-kryptonian-khristmas-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/07/Superman-Super-Christmas-Sweater-Jumper.jpg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/09/IMG_0666a.jpg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/09/IMG_0667.jpg'], brand: 'DC' },
          '/product/harry-potter-slytherin-knitted-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/HP-Slytherin-xmas-jumper.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/HarryPotter_Slytherin_Xmas_6.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/HarryPotter_Slytherin_Xmas_2.jpeg'], brand: 'Warner Bros' },
          '/product/beauty-and-the-beast-merry-beastmas-knitted-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/BB-xmas-jumper.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/Beauty_Beast_Xmas_Jumper_2.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/Beauty_Beast_Xmas_Jumper_18.jpeg'], brand: 'Disney' },
          '/product/marvel-avengers-knitted-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/avengers-front-xmas-jumper-v12.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/Avengers_Xmas_Jumper_6.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/Avengers_Xmas_Jumper_4.jpeg'], brand: 'Marvel' },
          '/product/aladdin-we-wish-you-a-merry-christmas-knitted-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/aladdin_main.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/Aladdin_Xmas_Jumper_4.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/05/Aladdin_Xmas_Jumper_16-1.jpeg'], brand: 'Disney' },
          '/product/harry-potter-ravenclaw-knitted-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/HP-ravenclaw-xmas-jumper-v2.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/HarryPotter_Ravenclaw_Xmas_Jumper_13.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/HarryPotter_Ravenclaw_Xmas_Jumper_15.jpeg'], brand: 'Warner Bros' },
          '/product/harry-potter-hufflepuff-knitted-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/HP-hufflrpuff-xmas-jumper-2.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/HarryPotter_Hufflepuff_Xmas_7.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/HarryPotter_Hufflepuff_Xmas_6.jpeg'], brand: 'Warner Bros' },
          '/product/deadpool-merry-foodfest-knitted-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/07/Deadpool_Xmas_Jumper_16-1.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/07/Deadpool_Xmas_Jumper_2.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/07/Deadpool_Xmas_Jumper_18-1.jpeg'], brand: 'Marvel' },
          '/product/harry-potter-gryffindor-knitted-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/HP-gryffindor-xmas-jumper-v3-4.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/HarryPotter_Gryffindor_Xmas_5.jpeg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/08/HarryPotter_Gryffindor_Xmas_2.jpeg'], brand: 'Warner Bros' },
          '/product/star-wars-vader-s-vacation-christmas-sweater-jumper/': { img: ['https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/10/jollyface.jpg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/10/IMG_0711.jpg', 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2017/10/IMG_0795.jpg'], brand: 'Disney' },
        };
        // Make product data available
        const retrievedObject = pageData[pathName];
        Exp.cache.retrievedData = retrievedObject.img;
        const brandName = retrievedObject.brand;
        const locationFlag = Exp.cache.bodyVar.querySelector('.flag-flag');
        let productTypeText = 'Christmas Sweater';
        if (locationFlag.classList.contains('flag-flaguk')) {
          productTypeText = 'Christmas Jumper';
        }
        Exp.cache.messageArray = [`Premium ${brandName} ${productTypeText}`, `Every Stitch Approved By ${brandName}`, 'Don\'t Miss Out. Buy Yours Now'];
        // Cache images
        const cachedImage = new Image();
        for (let i = 0; i < 3; i += 1) {
          cachedImage.src = Exp.cache.retrievedData[i];
        }
      },
    },
    render: {
      slideShowContainer: () => {
        // Insert slider container
        Exp.cache.productGallery.insertAdjacentHTML('afterend', `
        <div class="ME177_SlideShow_Container">
          <div class="ME177_Image_Container" style="background-image: url(${Exp.cache.retrievedData[0]});">
            <span class="ME177_Transition_Element_Container"></span>
            <img src="${Exp.cache.retrievedData[0]}" class="ME177_Image" />
          </div>
          <div class="ME177_Message_Container">
            <span class="ME177_Message">${Exp.cache.messageArray[0]}</span>
          </div>
        </div>
        `);
        // Store Selectors
        Exp.cache.ME177Img = Exp.cache.bodyVar.querySelector('.ME177_Image');
        Exp.cache.ME177BGImg = Exp.cache.bodyVar.querySelector('.ME177_Image_Container');
        Exp.cache.ME177Container = Exp.cache.bodyVar.querySelector('.ME177_SlideShow_Container');
        Exp.cache.ME177Message = Exp.cache.bodyVar.querySelector('.ME177_Message');
        // Start timer
        Exp.bindExperimentEvents.recursiveTimer();
      },
    },
    bindExperimentEvents: {
      recursiveTimer() {
        setTimeout(() => {
          // Only execute code if number of transitions is less than two
          if (Exp.cache.transitionCounter < 2) {
            // Start transition
            Exp.bindExperimentEvents.handleTransition();
            // Update image
            Exp.cache.ME177Img.setAttribute('src', Exp.cache.retrievedData[Exp.cache.transitionCounter + 1]);
            // Increment couter for recrusive condition and content rloading
            Exp.cache.transitionCounter += 1;
            // Call timer again
            Exp.bindExperimentEvents.recursiveTimer();
          } else {
            Exp.bindExperimentEvents.endTimer();
          }
        }, 4000);
      },
      endTimer: () => {
        // Remove test content and styling class to reveal product carousel
        Exp.cache.bodyVar.classList.remove('ME177_Active');
        Exp.cache.ME177Container.remove();
      },
      handleTransition: () => {
        // Add styling class to activate transition
        Exp.cache.ME177Container.classList.add('ME177_Transition');
        // Next line exceeds length
        // Update message
        // eslint-disable-next-line
        Exp.cache.ME177Message.textContent = Exp.cache.messageArray[Exp.cache.transitionCounter + 1];
        setTimeout(() => {
          // Reset for next transition
          Exp.cache.ME177Container.classList.remove('ME177_Transition');
          // Hide elements, update background image for CSS pseudoelements to inherit
          Exp.cache.ME177BGImg.style.backgroundImage = `url(${Exp.cache.retrievedData[Exp.cache.transitionCounter]})`;
        }, 1000);
      },
    },
  };

  Exp.init();
};

export default Run;
