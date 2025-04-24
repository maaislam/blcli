import shared from '../../../../../../core-files/shared';

const ref = 'https://blcro.fra1.digitaloceanspaces.com/ne303/';

const html = `
  <div class="${shared.ID}-col">
    <a class="${shared.ID}-card" href="/pages/wellbeing-pod-luxe">
      <h2 class="${shared.ID}-card__title">Wellbeing Pod Luxe</h2>
      <p class="${shared.ID}-card__subtitle">To scent <strong>large</strong> spaces</p>

      <p class="${shared.ID}-card__cta-wrapper">
        <span class="${shared.ID}-card__cta">Shop Pod Luxe</span>
      </p>

      <img src="${ref}n-pl.jpg">

    </a>
  </div>

  <div class="${shared.ID}-col">
    <a class="${shared.ID}-card" href="/pages/wellbeing-pod">
      <h2 class="${shared.ID}-card__title">Wellbeing Pod</h2>
      <p class="${shared.ID}-card__subtitle">To scent <strong>medium</strong> spaces</p>

      <p class="${shared.ID}-card__cta-wrapper">
        <span class="${shared.ID}-card__cta">Shop Pod</span>
      </p>

      <img src="${ref}Mask%20Group%20(2).jpg">

    </a>
  </div>

  <div class="${shared.ID}-col">
    <a class="${shared.ID}-card" href="/pages/wellbeing-pod-mini">
      <h2 class="${shared.ID}-card__title">Wellbeing Pod Mini</h2>
      <p class="${shared.ID}-card__subtitle">To scent <strong>small</strong> spaces</p>

      <p class="${shared.ID}-card__cta-wrapper">
        <span class="${shared.ID}-card__cta">Shop Pod Mini</span>
      </p>

      <img src="${ref}Mask%20Group%20(3).jpg">

    </a>
  </div>

  <div class="${shared.ID}-col">
    <a class="${shared.ID}-card" href="/pages/essential-oil-blends">
      <h2 class="${shared.ID}-card__title">Essential Oil Blends</h2>
      <p class="${shared.ID}-card__subtitle">Premium essential oils</p>

      <p class="${shared.ID}-card__cta-wrapper">
        <span class="${shared.ID}-card__cta">Shop Oils</span>
      </p>

      <img src="${ref}Mask%20Group%20(4).jpg">

    </a>
  </div>
`;

export default html;
