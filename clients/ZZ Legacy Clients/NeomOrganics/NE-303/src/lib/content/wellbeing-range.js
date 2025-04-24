import shared from '../../../../../../core-files/shared';

const ref = 'https://blcro.fra1.digitaloceanspaces.com/ne303/';

const html = `
  <div class="${shared.ID}-col">
    <a class="${shared.ID}-card" href="/collections/scent-to-sleep">
      <h2 class="${shared.ID}-card__title">Better sleep?</h2>
      <p class="${shared.ID}-card__subtitle">Tired of being tired?</p>

      <p class="${shared.ID}-card__cta-wrapper">
        <span class="${shared.ID}-card__cta">Shop Now</span>
      </p>

      <img src="${ref}c01.jpg">

    </a>
  </div>

  <div class="${shared.ID}-col">
    <a class="${shared.ID}-card" href="/collections/scent-to-de-stress">
      <h2 class="${shared.ID}-card__title">Less Stress?</h2>
      <p class="${shared.ID}-card__subtitle">Stressed about being stressed?</p>

      <p class="${shared.ID}-card__cta-wrapper">
        <span class="${shared.ID}-card__cta">Shop Now</span>
      </p>

      <img src="${ref}c02.jpg">

    </a>
  </div>

  <div class="${shared.ID}-col">
    <a class="${shared.ID}-card" href="/collections/scent-to-make-you-happy">
      <h2 class="${shared.ID}-card__title">Mood Boost?</h2>
      <p class="${shared.ID}-card__subtitle">In need of a mood boost?</p>

      <p class="${shared.ID}-card__cta-wrapper">
        <span class="${shared.ID}-card__cta">Shop Now</span>
      </p>

      <img src="${ref}c03.jpg">

    </a>
  </div>

  <div class="${shared.ID}-col">
    <a class="${shared.ID}-card" href="/collections/scent-to-boost-your-energy">
      <h2 class="${shared.ID}-card__title">More Energy?</h2>
      <p class="${shared.ID}-card__subtitle">Running on empty?</p>

      <p class="${shared.ID}-card__cta-wrapper">
        <span class="${shared.ID}-card__cta">Shop Now</span>
      </p>

      <img src="${ref}c04.jpg">

    </a>
  </div>
`;

export default html;
