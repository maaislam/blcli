import { fullStoryMap, eventsMap, viewabilityTracker } from '../../../../../lib/utils';

/**
 * {{ME173}} - {{Barrys Mad Jumpers}}
 */
const Run = (cache) => {
  const doc = document;
  const bodyVar = doc.body;
  console.log('test');
  const Exp = {
    settings: {
      ID: 'ME173',
      VARIATION: '4',
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
            name: 'Emma',
            title: 'I am the HR Assistant...',
            img: 'https://cdn.optimizely.com/img/6087172626/a069f3fbc8294862902e4e7e01c086ac.png',
            msg: `Emma has loved ${brand} since she was a kid, so of course his favourite jumper is ${title}`
          },
          2: {
            name: 'Jessica',
            title: 'I am the Head of Marketing...',
            img: 'https://cdn.optimizely.com/img/6087172626/667f90a344ac412bbd3c451cb5c35e0e.png',
            msg: `Jessica is the office ${brand} geek, so she'll be wearing the ${title} this Christmas`
          },
          3: {
            name: 'Lauren',
            title: 'I am the Brand Manager...',
            img: 'https://cdn.optimizely.com/img/6087172626/f9ca3ce7021b4449be39159fabd625d7.png',
            msg: `Lauren thinks there ain't no Christmas like a ${brand} Christmas, so the ${title} is her favourite`
          }
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
