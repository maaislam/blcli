import { fullStoryMap, eventsMap, viewabilityTracker } from '../../../../../lib/utils';

/**
 * {{ME173}} - {{Barrys Mad Jumpers}}
 */
const Run = (cache) => {
  const doc = document;
  const bodyVar = doc.body;
  const Exp = {
    settings: {
      ID: 'ME173',
      VARIATION: '3',
    },
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      bodyVar.classList.add(settings.ID);
      components.whichReview();
      services.tracking();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStoryMap(settings.ID, `Variation ${settings.VARIATION}`);
        eventsMap.send(settings.ID + 'V' + settings.VARIATION, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        eventsMap.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      whichReview() {
        const path = window.location.pathname;
        let usedReviews = localStorage.getItem('ME173_urls');
        let charToUse = 1;
        const brand = cache.get('brand').value;
        const title = cache.get('prodTitle').textContent.trim();
        const reviews = {
          1: {
            name: 'Adam',
            title: 'I am the Warehouse Manager...',
            img: 'https://cdn.optimizely.com/img/6087172626/d433ab51c198488e833b8f53c091540a.png',
            msg: `Avid ${brand} fan Adam picks the ${title} as his favourite this year`
          },
          2: {
            name: 'Dan',
            title: 'I am the Brand Manager...',
            img: 'https://cdn.optimizely.com/img/6087172626/d3f747a538a346818146a7c7e6917fec.png',
            msg: `Dan is a huge ${brand} fan, so the ${title} is the perfect one for him`
          },
          3: {
            name: 'Jon',
            title: 'I am the Graphic Designer...',
            img: 'https://cdn.optimizely.com/img/6087172626/585c0426d56243dbbf12c272543a2cf0.png',
            msg: `You'll never meet a bigger ${brand} fan than Jon, so this ${title} is already his favourite one`
          },
        };

        if (usedReviews) {
          usedReviews = JSON.parse(usedReviews);
          const revLength = usedReviews.length;
          let foundURL = false;

          for (let i = 0; i < revLength; i += 1) {
            const curr = usedReviews[i];

            if (path.indexOf(curr.url) > -1) {
              charToUse = i + 1;
              foundURL = true;
            } 
          }

          if (foundURL === false && revLength < 3) {
            charToUse = revLength + 1;
            usedReviews.push({ name: revLength + 1, url: path });
            localStorage.setItem('ME173_urls', JSON.stringify(usedReviews));
            Exp.components.render(reviews[charToUse].name, reviews[charToUse].title, reviews[charToUse].img, reviews[charToUse].msg);
          } else if (foundURL === true) {
            Exp.components.render(reviews[charToUse].name, reviews[charToUse].title, reviews[charToUse].img, reviews[charToUse].msg);
          }
        } else {
          usedReviews = [{ name: 1, url: path }];
          localStorage.setItem('ME173_urls', JSON.stringify(usedReviews));
          Exp.components.render(reviews[charToUse].name, reviews[charToUse].title, reviews[charToUse].img, reviews[charToUse].msg);
        }
      },
      render(name, title, img, msg) {
        const content = `
          <div class="ME173_review-wrap clear">
            <div class="ME173_block ME173_img">
              <img class="ME173_globe" src="https://cdn.optimizely.com/img/6087172626/56de61e453d946deaced6f711c5d268a.png" />
              <img class="ME173_char" src="${img}" />
              <span class="ME173_char-name">${name}'s<br /> favourite<br /> jumper <span>${name}'s<br /> favourite<br /> jumper</span></span>
            </div>
            <div class="ME173_block ME173_content">
              <h3>${title} <span>${title}</span></h3>
              <p>${msg}</p>
            </div>
          </div>
        `;

        cache.get('deliveryWrap').insertAdjacentHTML('afterend', content);

        viewabilityTracker(bodyVar.querySelector('.ME173_review-wrap'), () => {
          eventsMap.send(`${Exp.settings.ID}V${Exp.settings.VARIATION}`, 'User saw', 'User has seen the review banner', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
