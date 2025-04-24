import { setup } from './services';
import { pollerLite } from '../../../../../../../lib/uc-lib';

/**
 * {{GD034}} - {{Trustpilot}}
 */

const Run = () => {
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const desktopTabletLocation = docVar.getElementById('');
      const mobileLocation = bodyVar.querySelector('.site-review-badge__score');
      const trustPilotScore = JSON.parse(docVar.querySelector('script[type="application/ld+json"]').innerHTML).aggregateRating.ratingValue;

      return {
        docVar,
        bodyVar,
        desktopTabletLocation,
        mobileLocation,
        trustPilotScore,
      };
    })(),
    init: () => {
      setup();
      Exp.render.trustPilotInformation();
    },
    render: {
      trustPilotInformation() {
        // Render mobile
        if (window.mobileSite) {
          Exp.cache.mobileLocation.insertAdjacentHTML('beforeend', `
            <span class="GD034_Rating">${Exp.cache.trustPilotScore}</span>
          `);
          // Render Desktop/Tablet poll for elements beforehand
        } else {
          pollerLite([
            '#header-primary', // Render location
            '.site-review-badge__score', // Rating Text
          ], () => {
            const renderLocation = Exp.cache.docVar.getElementById('header-primary');
            const ratingText = Exp.cache.bodyVar.querySelector('.site-review-badge__score').textContent;
            renderLocation.insertAdjacentHTML('beforeend', `
              <div class="GD034_Container">
                <div class="GD034_Image_Container">
                  <img class="GD034_Image_Logo" src="//assets.glassesdirect.co.uk/assets/gduk/trustpilot/trust-pilot-logo.1c7311306a87.svg" alt="Trustpilot" />
                  <img class="GD034_Image_Stars" src="//assets.glassesdirect.co.uk/assets/gduk/trustpilot/trustpilot_ratings_5.cb9d2c37135d.svg" alt="Trustpilot Rating" />
                </div>
                <div class="GD034_Text_Conatiner">
                  <span class="GD034_Rating_Text">${ratingText}</span>
                  <span class="GD034_Rating">${Exp.cache.trustPilotScore}</span>
                </div>
              </div>
            `);
          });
        }
      },
    },
  };

  Exp.init();
};

export default Run;
