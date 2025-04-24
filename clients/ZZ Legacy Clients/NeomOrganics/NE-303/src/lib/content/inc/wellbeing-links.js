import shared from '../../../../../../../core-files/shared';

const ref = 'https://blcro.fra1.digitaloceanspaces.com/ne303/';

export default `
  <div class="${shared.ID}-col">
    <h2 class="${shared.ID}-col-heading">
      Shop by Wellbeing Need
    </h2>

    <ul class="${shared.ID}-linklist">
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/scent-to-sleep">
          <img class="${shared.ID}-linklist__img" src="${ref}sleepci.png">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Better Sleep?</span>
            <span class="${shared.ID}-linklist__subtitle">Stop. Breathe. Sleep.</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/scent-to-de-stress">
          <img class="${shared.ID}-linklist__img" src="${ref}destress.png">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Less Stress?</span>
            <span class="${shared.ID}-linklist__subtitle">Feel the tension lift</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/scent-to-make-you-happy">
          <img class="${shared.ID}-linklist__img" src="${ref}happyci.png">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Mood Boost?</span>
            <span class="${shared.ID}-linklist__subtitle">Kickstart happy vibes</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/scent-to-boost-your-energy">
          <img class="${shared.ID}-linklist__img" src="${ref}energyci.png">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">More Energy?</span>
            <span class="${shared.ID}-linklist__subtitle">Supercharged you</span>
          </div>
        </a>
      </li>
    </ul>
  </div>
`;
