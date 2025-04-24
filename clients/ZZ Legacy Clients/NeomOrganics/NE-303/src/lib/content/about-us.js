import shared from '../../../../../../core-files/shared';

const ref = 'https://blcro.fra1.digitaloceanspaces.com/ne303/';

const html = `
  <div class="${shared.ID}-col">
    <h2 class="${shared.ID}-col-heading">
      Shop by Product
    </h2>

    <ul class="${shared.ID}-linklist ${shared.ID}-linklist--noimages">
      <li>
        <a class="${shared.ID}-linklist__link" href="/pages/neom-is-here-for-you">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Watch Our Story</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/pages/sustainability">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Sustainability</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/pages/mental-health-foundation">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Charity Partnership</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/pages/neom-2020-tribe">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Neom Gang</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/pages/refer-a-friend">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Refer A Friend</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/pages/postage">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Delivery & Returns</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="https://support.neomorganics.com/hc/en-gb">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Help & FAQs</span>
          </div>
        </a>
      </li>
    </ul>
  </div>

  <div class="${shared.ID}-col">
    <a class="${shared.ID}-imgcta" href="/pages/our-locations">
      <img class="${shared.ID}-imgcta__img" src="${ref}Mask%20Group%20(8).jpg">
      <span class="${shared.ID}-imgcta__text ${shared.ID}-imgcta__text--white">Find Your Nearest Neom</span>
    </a>
  </div>

  <div class="${shared.ID}-col">
    <a class="${shared.ID}-imgcta" href="/blogs/wellbeing/six-ways-to-use-our-much-loved-body-scrub">
      <img class="${shared.ID}-imgcta__img" src="${ref}six.jpg">
      <span class="${shared.ID}-imgcta__text ${shared.ID}-imgcta__text--multi"
        >Six ways to use our much-loved body scrub</span>
    </a>
  </div>
`;

export default html;
